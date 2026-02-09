## Tạo và Xử lý Sự kiện Tùy chỉnh (Custom Events with @Output)

Để component con có thể gửi thông báo hoặc dữ liệu ra component cha (ví dụ: thông báo người dùng đã được chọn), Angular sử dụng cơ chế **Output properties** kết hợp với **EventEmitter**.

### 1. Khai báo Output trong Component con

Để tạo một sự kiện tùy chỉnh, cần thực hiện các bước sau trong class của component con (ví dụ: `UserComponent`):

1. **Import:** Nhập `Output` và `EventEmitter` từ gói `@angular/core`.
    
2. **Khai báo thuộc tính:** Tạo một thuộc tính (ví dụ: `select`) và gắn decorator `@Output()`.
    
3. **Khởi tạo:** Gán giá trị cho thuộc tính bằng một đối tượng `new EventEmitter()`.
    

TypeScript

```
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({ ... })
export class UserComponent {
  @Input({ required: true }) id!: string; // Input nhận ID người dùng
  
  // Khai báo sự kiện tùy chỉnh tên là 'select'
  @Output() select = new EventEmitter(); 

  onSelectUser() {
    // Phát sự kiện và gửi kèm dữ liệu (payload) là ID người dùng
    this.select.emit(this.id);
  }
}
```

_Lưu ý: `emit()` là phương thức của `EventEmitter` dùng để kích hoạt sự kiện và gửi dữ liệu đi._

### 2. Lắng nghe sự kiện ở Component cha

Tại component cha (ví dụ: `AppComponent`), chúng ta lắng nghe sự kiện tùy chỉnh giống như các sự kiện DOM thông thường (như `click`, `input`).

#### Trong Template (HTML)

- Sử dụng cú pháp **Event Binding** `(eventName)`.
    
- Sử dụng biến đặc biệt `$event` để nhận dữ liệu được gửi từ component con (trong trường hợp này là `id`).
    

HTML

```
<app-user 
  [avatar]="user.avatar" 
  [name]="user.name" 
  [id]="user.id"
  (select)="onSelectUser($event)">
</app-user>
```

#### Trong Logic (TypeScript)

Định nghĩa phương thức xử lý sự kiện, đảm bảo tham số đầu vào có kiểu dữ liệu khớp với dữ liệu được emit.

TypeScript

```
export class AppComponent {
  // ... code khác

  // Hàm xử lý khi nhận được sự kiện
  onSelectUser(id: string) {
    console.log('Selected user with id:', id);
  }
}
```

### Tóm tắt quy trình luồng dữ liệu

1. **Child Component:** Người dùng click nút → Gọi hàm `onSelectUser()` → Gọi `this.select.emit(id)`.
    
2. **Angular:** Bắt được sự kiện `select` trên thẻ `<app-user>`.
    
3. **Parent Component:** Thực thi hàm `onSelectUser($event)` với `$event` chính là `id` được gửi lên.