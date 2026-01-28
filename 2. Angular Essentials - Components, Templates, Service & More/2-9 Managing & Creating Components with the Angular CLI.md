## Quản lý và Tạo Component trong Angular

### 1. Tổ chức Cấu trúc Thư mục (Folder Structure)

Khi ứng dụng phát triển, số lượng **thành phần** (Components) sẽ tăng lên nhanh chóng. Việc để tất cả các tệp tin trong thư mục gốc `src/app` sẽ gây khó khăn cho việc quản lý.

- **Quy tắc (Convention):** Mỗi Component nên được đặt trong một thư mục con riêng biệt nằm trong `src/app`.
    
- **Cách đặt tên:** Tên thư mục nên phản ánh chức năng hoặc tính năng (feature) mà Component đó đảm nhiệm.
    
- **Ví dụ:** Tạo thư mục `header` để chứa các tệp:
    
    - `header.component.ts`
        
    - `header.component.html`
        
    - `header.component.css`
        

> [!IMPORTANT] Lưu ý khi di chuyển tệp
> 
> Khi di chuyển các tệp Component vào thư mục con, hãy đảm bảo cập nhật lại đường dẫn **nhập vào** (import path) trong tệp `app.component.ts`. Hầu hết các IDE (như VS Code) sẽ tự động cập nhật, nhưng bạn nên kiểm tra lại để tránh lỗi.

---

### 2. Sử dụng Angular CLI để Tạo Component

Thay vì tạo thủ công từng tệp, bạn có thể sử dụng **Giao diện dòng lệnh Angular** (Angular CLI) để tăng hiệu suất và đảm bảo tính nhất quán.

#### Câu lệnh thực hiện:

Để tạo một Component mới (ví dụ tên là `user`), bạn mở terminal và chạy:

Bash

```
ng generate component user
```

Hoặc sử dụng cách viết tắt:

Bash

```
ng g c user
```

#### Kết quả sau khi chạy lệnh:

Angular CLI sẽ tự động tạo một thư mục mang tên component và 4 tệp tin tiêu chuẩn bên trong:

1. `user.component.ts`: Tệp logic chính.
    
2. `user.component.html`: Tệp giao diện.
    
3. `user.component.css`: Tệp định dạng phong cách.
    
4. `user.component.spec.ts`: Tệp dành cho **kiểm thử tự động** (automated testing). _Có thể xóa nếu chưa cần dùng tới._
    

---

### 3. Cấu trúc mặc định của Component do CLI tạo ra

Khi dùng CLI, Angular sẽ tự động thiết lập các cấu hình quan trọng trong tệp TypeScript:

- **Bộ chọn (Selector):** Tự động đặt tên theo quy chuẩn (ví dụ: `app-user`).
    
- **Liên kết tệp ngoại vi:** Tự động kết nối với các tệp HTML và CSS tương ứng thông qua `templateUrl` và `styleUrl`.
    
- **Thành phần độc lập (Standalone Component):** CLI mặc định đặt thuộc tính `standalone: true`. Đây là phương pháp được khuyến nghị hiện nay trong Angular.
    
- **Mảng nhập (Imports Array):** Sẵn sàng để bạn thêm các Component khác nếu cần sử dụng lồng nhau.
    

---

### 4. Công thức tổng quát về số lượng tệp

Nếu một ứng dụng có $n$ components, và mỗi component bao gồm các thành phần cơ bản (Logic, Template, Style, Test), tổng số tệp tin $T$ cần quản lý sẽ là:

$$T = n \times 4$$

Việc sử dụng thư mục con giúp giảm độ phức tạp quản lý từ $O(T)$ xuống $O(n)$ trong cấu trúc cây thư mục.