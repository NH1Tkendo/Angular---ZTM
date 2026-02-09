## Cấu hình Bắt buộc cho Input (Required Input Configuration)

Trong Angular, khi xây dựng các thành phần có thể tái sử dụng (reusable components), việc đảm bảo dữ liệu đầu vào (inputs) luôn được cung cấp là rất quan trọng để tránh lỗi trong quá trình phát triển.

### Vấn đề với cách khai báo thông thường

Khi sử dụng `@Input` với TypeScript, chúng ta thường sử dụng **toán tử khẳng định không null** (non-null assertion operator - dấu `!`) để báo cho TypeScript rằng giá trị này chắc chắn sẽ tồn tại.

- **Ví dụ:** `avatar` và `name` được đánh dấu là sẽ luôn có giá trị.
    
- **Hạn chế:** Về mặt kỹ thuật, không có sự đảm bảo nào từ phía Angular rằng component cha sẽ thực sự truyền giá trị vào.
    
    - Nếu lập trình viên quên truyền thuộc tính (property) trong HTML, TypeScript sẽ không báo lỗi (do dấu `!`), nhưng giao diện người dùng sẽ bị thiếu dữ liệu (ví dụ: thiếu `username`).
        
    - Mặc dù lỗi này có thể phát hiện khi kiểm thử (testing), nhưng nó nên được ngăn chặn ngay từ lúc viết mã.
        

### Giải pháp: Tùy chọn `required`

Angular cho phép truyền một **đối tượng cấu hình** (configuration object) vào decorator `@Input`. Tính năng quan trọng nhất để giải quyết vấn đề trên là tùy chọn `required`.

#### Cách thực hiện

Thiết lập thuộc tính `required` thành `true` bên trong cấu hình của `@Input`.

TypeScript

```
// Trước đây (Tiềm ẩn rủi ro)
@Input() name!: string;

// Hiện tại (An toàn hơn)
@Input({ required: true }) name!: string; 
```

### Lợi ích của việc sử dụng `required: true`

1. **Đồng bộ hóa với TypeScript:**
    
    - Khi không có `required: true`, việc dùng dấu `!` thực chất là "nói dối" TypeScript rằng dữ liệu luôn có, trong khi thực tế có thể không.
        
    - Khi có `required: true`, Angular thực thi quy tắc này, làm cho việc khai báo với TypeScript trở nên trung thực và chính xác.
        
2. **Phát hiện lỗi sớm (Compile-time error):**
    
    - Nếu bạn quên truyền một thuộc tính bắt buộc trong HTML (ví dụ: quên `name` cho `UserComponent`), IDE hoặc trình biên dịch sẽ báo lỗi ngay lập tức: _The required input 'name' from component 'UserComponent' must be specified._
        
3. **Dễ dàng sửa lỗi:**
    
    - Giúp phát hiện và sửa lỗi ngay trong quá trình phát triển (development phase) thay vì phải đợi đến khi chạy ứng dụng hoặc kiểm thử.
        

### Kết luận

Việc sử dụng tùy chọn `required: true` là một phương pháp quan trọng (best practice) khi định nghĩa các Inputs không được phép thiếu, giúp mã nguồn chặt chẽ hơn và giảm thiểu lỗi do sơ suất khi sử dụng component.