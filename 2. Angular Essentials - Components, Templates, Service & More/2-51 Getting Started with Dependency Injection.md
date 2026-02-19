## Tiêm phụ thuộc (Dependency Injection) trong Angular

Bài học này giải thích cơ chế cốt lõi để kết nối và sử dụng Service trong các Component, đảm bảo dữ liệu được chia sẻ đồng bộ trên toàn ứng dụng.

### 1. Vấn đề của việc khởi tạo thủ công

Khi muốn sử dụng `TasksService` trong `TasksComponent`, cách tiếp cận thông thường trong lập trình hướng đối tượng là tự khởi tạo một đối tượng mới (instance) từ lớp:

TypeScript

```
// CÁCH LÀM SAI TRONG ANGULAR
private tasksService = new TasksService();
```

- **Vấn đề nghiêm trọng**: Mỗi khi Component được sử dụng, một "thể hiện" (instance) hoàn toàn mới và độc lập của Service sẽ được tạo ra.
    
- **Hậu quả**: Dữ liệu không được chia sẻ. Nếu Component A thay đổi dữ liệu trong Service, Component B (dùng một instance khác của Service đó) sẽ không nhận biết được thay đổi này.
    

### 2. Giải pháp: Tiêm phụ thuộc (Dependency Injection - DI)

Angular cung cấp cơ chế **Dependency Injection** để giải quyết vấn đề trên.

- **Nguyên lý**: Thay vì Component tự tạo instance, nó sẽ "yêu cầu" Angular cung cấp instance đó.
    
- **Lợi ích**: Angular sẽ tạo ra **một instance duy nhất** (Singleton) và tái sử dụng nó cho tất cả các Component yêu cầu. Điều này đảm bảo mọi Component đều thao tác trên cùng một vùng nhớ và dữ liệu.
    

### 3. Cách thực hiện

#### Bước 1: Đăng ký Service với `@Injectable`

Để Angular biết một class là Service và có thể được "tiêm" vào nơi khác, ta cần sử dụng Decorator `@Injectable`.

- **Vị trí**: File `tasks.service.ts`.
    
- **Cấu hình**: `providedIn: 'root'`.
    

TypeScript

```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Quan trọng: Đăng ký ở cấp độ gốc
})
export class TasksService {
  // Logic của service...
}
```

> **Lưu ý**: `providedIn: 'root'` báo cho Angular biết Service này nên được tạo một lần duy nhất và có sẵn cho toàn bộ ứng dụng.

#### Bước 2: Tiêm Service vào Component qua Constructor

Sử dụng hàm khởi tạo (Constructor) của Component để khai báo sự phụ thuộc.

**Cú pháp rút gọn của TypeScript (Khuyên dùng):** Thay vì khai báo thuộc tính rồi gán trong constructor, ta có thể thêm từ khóa truy cập (`private` hoặc `public`) trực tiếp vào tham số của constructor. TypeScript sẽ tự động tạo một thuộc tính cùng tên cho class.

- **Vị trí**: File `tasks.component.ts`.
    

TypeScript

```
import { Component } from '@angular/core';
import { TasksService } from './tasks.service'; // Import class Service

@Component({
  // ... metadata của component
})
export class TasksComponent {
  // Cú pháp rút gọn: Tự động tạo thuộc tính this.tasksService
  constructor(private tasksService: TasksService) {}

  // Sử dụng service trong các phương thức khác
  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId);
  }
}
```

### Tổng kết

1. **Không dùng `new`**: Không bao giờ tự khởi tạo Service bằng `new ServiceName()` trong Component.
    
2. **Dùng Constructor Injection**: Khai báo Service cần dùng trong constructor của Component với cú pháp `private serviceName: ServiceType`.
    
3. **Dùng `@Injectable`**: Luôn thêm decorator này vào class Service với cấu hình `providedIn: 'root'` để kích hoạt cơ chế DI và Singleton của Angular.