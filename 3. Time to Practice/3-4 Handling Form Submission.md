## Thực hành: Xử lý Sự kiện Gửi biểu mẫu (Form Submission)

Chúng ta đã tạo xong giao diện, bây giờ là lúc xử lý hành động khi người dùng nhấn nút "Calculate". Mục tiêu của bước này là ngăn chặn hành vi tải lại trang mặc định của trình duyệt và bắt được sự kiện gửi biểu mẫu để xử lý bằng Angular.

### Kích hoạt Mô-đun Biểu mẫu (FormsModule)

Trong Angular, để bắt được sự kiện gửi biểu mẫu một cách tối ưu nhất, chúng ta không dùng các sự kiện mặc định của trình duyệt. Thay vào đó, chúng ta sẽ sử dụng một sự kiện đặc biệt do Angular cung cấp là `ngSubmit`. Tuy nhiên, tính năng này không có sẵn ngay từ đầu mà cần được "mở khóa".

Để kích hoạt tính năng này:

- Mở tệp TypeScript của thành phần (`user-input.component.ts`).
    
- Nhập (Import) `FormsModule` từ gói `@angular/forms`.
    
- Thêm `FormsModule` vào Mảng nhập (`imports array`) của Thành phần (Component).
    

TypeScript

```
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 1. Import FormsModule

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule], // 2. Thêm vào mảng imports
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {
}
```

### Định nghĩa Phương thức Xử lý

Tiếp theo, bạn cần tạo một phương thức (method) bên trong Lớp thành phần (Component class) để định nghĩa chính xác hệ thống cần làm gì khi sự kiện gửi biểu mẫu xảy ra.

- Tạo một hàm tên là `onSubmit()` (bạn có thể đặt tên bất kỳ, nhưng `onSubmit` là quy ước phổ biến và dễ hiểu).
    
- Tạm thời, chúng ta sẽ chỉ in ra một thông báo trên bảng điều khiển để kiểm tra xem nút bấm đã hoạt động hay chưa.
    

TypeScript

```
export class UserInputComponent {
  // Phương thức xử lý sự kiện
  onSubmit() {
    console.log('submitted!');
  }
}
```

### Lắng nghe Sự kiện ngSubmit

Bước cuối cùng để hoàn thiện luồng xử lý là kết nối giao diện HTML với phương thức TypeScript vừa tạo bằng Cú pháp ràng buộc sự kiện (Event binding syntax).

- Mở tệp `user-input.component.html`.
    
- Thêm bộ lắng nghe sự kiện `(ngSubmit)` vào trực tiếp thẻ `<form>` và gọi hàm `onSubmit()`.
    

HTML

```
<form (ngSubmit)="onSubmit()">
  
  </form>
```

### Kiểm tra kết quả

- Lưu lại toàn bộ dự án và mở trang web trên trình duyệt.
    
- Mở Công cụ dành cho nhà phát triển (Developer tools) và chuyển sang tab Bảng điều khiển JavaScript (JavaScript console).
    
- Nhập thử vài con số và nhấn nút **Calculate**.
    
- Nếu bạn thấy dòng chữ `submitted!` hiện ra trên bảng điều khiển và trang web **không** bị tải lại, bạn đã thiết lập thành công!