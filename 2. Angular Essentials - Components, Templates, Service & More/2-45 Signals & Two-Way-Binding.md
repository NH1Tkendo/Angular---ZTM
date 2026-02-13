## Sử dụng Signals trong Two-Way Binding

Ngoài việc sử dụng các thuộc tính thông thường, Angular còn cho phép sử dụng **Signals** kết hợp với cơ chế **Ràng buộc hai chiều (Two-Way Binding)** để quản lý trạng thái form. Việc này giúp tận dụng cơ chế phản ứng (reactivity) hiện đại của Angular.

### 1. Cách triển khai trong TypeScript

Để chuyển đổi từ thuộc tính thường sang Signal, cần thực hiện các bước sau trong `component class`:

1. **Import**: Nhập hàm `signal` từ `@angular/core`.
    
2. **Khởi tạo**: Bọc giá trị khởi tạo bên trong hàm `signal()`.
    

TypeScript

```
import { signal } from '@angular/core';

export class NewTaskComponent {
  // Thay vì: enteredTitle = '';
  // Sử dụng Signal:
  enteredTitle = signal(''); 
  enteredSummary = signal('');
  enteredDate = signal('');
}
```

### 2. Cấu hình trong Template (HTML)

Một điểm mạnh của Angular là cú pháp trong template **không thay đổi** khi chuyển sang dùng Signals với `ngModel`.

- **Cú pháp**: Vẫn sử dụng `[(ngModel)]="tên_biến_signal"`.
    
- **Cơ chế**: Angular tự động phát hiện biến được truyền vào là một Signal. Nó sẽ tự động:
    
    - Đọc giá trị Signal để hiển thị lên input.
        
    - Cập nhật giá trị mới cho Signal khi người dùng nhập liệu.
        

HTML

```
<input type="text" [(ngModel)]="enteredTitle" />
```

### 3. Lưu ý quan trọng

Khi sử dụng Two-Way Binding với Signal, **tuyệt đối không** gọi hàm thực thi của Signal (ví dụ: `enteredTitle()`) trong biểu thức `ngModel`.

- **Sai**: `[(ngModel)]="enteredTitle()"` $\rightarrow$ Sẽ gây lỗi "unsupported expression" (biểu thức không được hỗ trợ).
    
- **Đúng**: `[(ngModel)]="enteredTitle"` $\rightarrow$ Angular sẽ tự xử lý việc đọc và ghi đè giá trị.
    

> **Tổng kết**: Mặc dù trong bài học này tác giả quay lại sử dụng thuộc tính thường (để đơn giản hóa), việc biết cách tích hợp Signals với `ngModel` là rất quan trọng cho các ứng dụng Angular hiện đại.