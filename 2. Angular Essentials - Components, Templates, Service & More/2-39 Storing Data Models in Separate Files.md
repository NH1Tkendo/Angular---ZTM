## Tách Biệt Định Nghĩa Kiểu Dữ Liệu (Outsourcing Type Definitions)

Trong Angular, thay vì định nghĩa `interface` hoặc `type` trực tiếp bên trong file component, một quy chuẩn phổ biến (common pattern) là tách chúng ra thành các file riêng biệt. Việc này giúp code gọn gàng, dễ quản lý và dễ tái sử dụng ở nhiều nơi khác nhau.

### 1. Quy trình thực hiện

Việc tách biệt thường được thực hiện theo các bước sau:

1. **Tạo file model**: Tạo một file mới trong cùng thư mục của tính năng đó, thường đặt tên theo quy tắc `tên-tính-năng.model.ts` (ví dụ: `user.model.ts`).
    
2. **Chuyển code**: Cắt (cut) đoạn định nghĩa `interface` từ file component và dán (paste) vào file model mới.
    
3. **Xuất khẩu (Export)**: Thêm từ khóa `export` trước `interface` để các file khác có thể sử dụng được.
    
4. **Nhập khẩu (Import)**: Quay lại file component ban đầu và import kiểu dữ liệu từ file model vừa tạo.
    

### 2. Ví dụ minh họa: User Model

**Bước 1 & 2: Tạo file và định nghĩa Model** Tại thư mục chứa User, tạo file `user.model.ts`:

TypeScript

```
// user.model.ts
// Thêm từ khóa 'export' để khả dụng bên ngoài file này
export interface User {
  id: string;
  avatar: string;
  name: string;
}
```

**Bước 3: Import và sử dụng trong Component** Tại file `user.component.ts`:

TypeScript

```
// user.component.ts
import { Component, Input } from '@angular/core';

// Import interface User từ file model
// Có thể thêm từ khóa 'type' để làm rõ đây là import kiểu dữ liệu (tùy chọn)
import { type User } from './user.model'; 

@Component({ ... })
export class UserComponent {
  @Input({ required: true }) user!: User;
}
```

### 3. Áp dụng tương tự cho Task Model

Thực hiện tương tự cho đối tượng `Task`:

1. Tạo file `task.model.ts` trong thư mục task.
    
2. Chuyển `interface Task` sang file mới và thêm `export`.
    
3. Import lại vào `task.component.ts`.
    

TypeScript

```
// task.component.ts
import { Component, Input } from '@angular/core';
import { type Task } from './task.model'; // Import từ file model

@Component({ ... })
export class TaskComponent {
  @Input({ required: true }) task!: Task;
}
```

### 📝 Ghi chú thêm

- **Tính tái sử dụng (Reusability)**: Nếu mô hình dữ liệu (data model) được sử dụng ở nhiều component khác nhau, việc định nghĩa tập trung tại một file model giúp tránh việc copy-paste code và đảm bảo tính nhất quán.
    
- **Cú pháp `import type`**: Mặc dù không bắt buộc về mặt kỹ thuật, việc sử dụng `import type ...` giúp code rõ ràng hơn, chỉ định rõ rằng chúng ta chỉ đang import một định nghĩa kiểu (type definition) chứ không phải một giá trị logic hay class thực thi.