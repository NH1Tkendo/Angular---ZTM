## Thực hành: Xây dựng Thành phần Tiêu đề (Header Component)

Đừng lo lắng nếu bạn chưa thể tự hoàn thành bài tập này từ đầu. Đây mới chỉ là ứng dụng thứ hai bạn xây dựng trong khóa học nên việc gặp khó khăn là hoàn toàn bình thường. Chúng ta sẽ cùng nhau giải quyết từng bước một, bắt đầu từ phần Tiêu đề.

### Khởi tạo Thành phần (Component)

Thay vì tạo thư mục và tệp tin thủ công, cách tốt nhất và nhanh nhất là sử dụng Giao diện dòng lệnh Angular (Angular CLI).

- Mở terminal và chạy lệnh sau để tạo một Thành phần Tiêu đề (Header component):
    
    Bash
    
    ```
    ng g c header --skip-tests
    ```
    
- **Giải thích lệnh**:
    
    - `ng g c`: Lệnh viết tắt của `ng generate component`.
        
    - `--skip-tests`: Cờ (flag) này giúp bỏ qua việc tạo tệp kiểm thử (testing file) không cần thiết cho dự án hiện tại.
        
- Lệnh này sẽ tự động tạo thư mục `header` chứa các tệp tin cần thiết. Mặc định, Angular sẽ tạo một **Thành phần độc lập (Standalone component)** (việc sử dụng _Thành phần dựa trên mô-đun (Module-based component)_ sẽ được hướng dẫn sau).
    

### Xây dựng Cấu trúc Giao diện (HTML Markup)

Mở tệp `header.component.html` và thiết lập cấu trúc với thẻ `<header>`, hình ảnh logo và tiêu đề `<h1>`:

HTML

```
<header>
  <img src="investment-calculator-logo.png" alt="money bag" />
  <h1>Investment Calculator</h1>
</header>
```

- **Lưu ý quan trọng về đường dẫn ảnh**: Vì hình ảnh nằm trong thư mục `public`, bạn chỉ cần gọi trực tiếp tên tệp (`investment-calculator-logo.png`) mà **không cần** thêm tiền tố `public/` hay `assets/`.
    

### Thêm Định dạng Kiểu (Styling)

Phần TypeScript (`header.component.ts`) hiện tại không cần thay đổi logic. Đối với CSS:

- Mở tệp `header.component.css`.
    
- Thay thế toàn bộ nội dung bên trong bằng đoạn mã CSS đã được cung cấp trong tài liệu đính kèm của bài học để tiết kiệm thời gian.
    

### Tích hợp vào Ứng dụng Chính (Integration)

Để hiển thị Header lên giao diện, bạn cần nhúng nó vào Thành phần gốc (App Component).

1. **Cập nhật giao diện App Component**: Mở `app.component.html` và thay thế thẻ `<h1>` cũ bằng thẻ tự đóng của header:
    
    HTML
    
    ```
    <app-header />
    ```
    
2. **Khai báo Component**: Khi thêm thẻ `<app-header />`, bạn sẽ gặp lỗi _“not a known element”_ do Angular mặc định không tự động quét các component mới.
    
    - Mở tệp `app.component.ts`.
        
    - Nhập (Import) `HeaderComponent`.
        
    - Thêm `HeaderComponent` vào mảng nhập `(imports array)` bên trong decorator `@Component`.
        
    
    TypeScript
    
    ```
    import { HeaderComponent } from './header/header.component';
    
    @Component({
      selector: 'app-root',
      standalone: true,
      imports: [HeaderComponent], // Khai báo HeaderComponent tại đây
      templateUrl: './app.component.html',
    })
    export class AppComponent {}
    ```
    
    _Mẹo:_ Bạn có thể sử dụng tính năng Sửa lỗi nhanh (Quick Fix) của các IDE (như Visual Studio Code) để IDE tự động import và thêm vào mảng giúp bạn.
    

### Kiểm tra Kết quả

Sau khi lưu các tệp, hãy mở trình duyệt và truy cập `localhost:4200`. Bạn sẽ thấy tiêu đề và logo của ứng dụng Máy tính Đầu tư xuất hiện trên màn hình.

---

Bước tiếp theo trong dự án là thu thập dữ liệu người dùng. Bạn có muốn tôi tiếp tục tóm tắt nội dung bài học về cách xây dựng **Thành phần Đầu vào (User Input Component)** với cơ chế ràng buộc dữ liệu hai chiều (two-way binding) không?