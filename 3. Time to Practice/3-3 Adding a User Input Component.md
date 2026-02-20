## Thực hành: Xây dựng Thành phần Đầu vào (User Input Component)

### Mục tiêu bài học

- Tạo một **Thành phần đầu vào (User Input Component)** để thu thập thông tin từ người dùng.
    
- Chuẩn bị nền tảng để áp dụng **Ràng buộc dữ liệu hai chiều (Two-way binding)**.
    
- Xây dựng một **Biểu mẫu (Form)** chứa các trường nhập liệu số lượng và một nút để tính toán. Tạm thời, mục tiêu chỉ là thu thập dữ liệu và in ra bảng điều khiển (console) chứ chưa xử lý logic tính toán.
    

### Khởi tạo Thành phần (Component)

Tương tự như phần trước, chúng ta sẽ sử dụng Giao diện dòng lệnh Angular (Angular CLI) để tạo thành phần mới.

- Mở terminal và chạy lệnh:
    
    Bash
    
    ```
    ng g c user-input --skip-tests
    ```
    
- Lệnh này sẽ tạo một thư mục `user-input` nằm cùng cấp với thư mục `header`.
    
- **Lưu ý về CSS:** Hãy sao chép và ghi đè nội dung tệp `user-input.component.css` bằng đoạn mã CSS đã được cung cấp trong tài nguyên đính kèm của khóa học để có sẵn định dạng đẹp mắt.
    

### Xây dựng Cấu trúc Giao diện (HTML Markup)

Mở tệp `user-input.component.html` và xây dựng cấu trúc biểu mẫu. Dựa vào CSS đã cung cấp, chúng ta sẽ nhóm các trường nhập liệu (inputs) lại với nhau bằng thẻ `<div>` có lớp `input-group`.

Dưới đây là cấu trúc Mã đánh dấu (Markup) dựa trên hướng dẫn:

HTML

```
<form>
  <div class="input-group">
    <p>
      <label for="initial-investment">Initial Investment</label>
      <input type="number" id="initial-investment" />
    </p>
    <p>
      <label for="annual-investment">Annual Investment</label>
      <input type="number" id="annual-investment" />
    </p>
  </div>

  <div class="input-group">
    <p>
      <label for="expected-return">Expected Return</label>
      <input type="number" id="expected-return" />
    </p>
    <p>
      <label for="duration">Duration</label>
      <input type="number" id="duration" />
    </p>
  </div>

  <p>
    <button>Calculate</button>
  </p>
</form>
```

> **Ghi chú thêm về HTML:** > - Thuộc tính `for` trong `<label>` phải khớp chính xác với `id` của `<input>` tương ứng để đảm bảo **Khả năng tiếp cận (Accessibility)**.
> 
> - Việc sử dụng `type="number"` giúp hiển thị bàn phím số trên thiết bị di động, mang lại trải nghiệm nhập liệu tốt hơn cho người dùng (dù trong TypeScript, dữ liệu nhận được vẫn có thể ở dạng chuỗi).
>     

### Tích hợp vào Ứng dụng Chính (Integration)

Giống như `HeaderComponent`, bạn cần khai báo và gọi `UserInputComponent` bên trong Thành phần gốc (App Component).

1. **Hiển thị giao diện:** Mở `app.component.html` và thêm thẻ `<app-user-input>` ngay bên dưới `<app-header />`:
    
    HTML
    
    ```
    <app-header />
    <app-user-input />
    ```
    
2. **Khai báo Component:** Mở `app.component.ts`, nhập (import) `UserInputComponent` và thêm nó vào mảng `imports`. (Bạn có thể dùng tính năng Sửa lỗi nhanh - Quick Fix của IDE để làm điều này tự động).
    

### Vấn đề cần giải quyết tiếp theo

Nếu bạn lưu lại và kiểm tra trên trình duyệt, giao diện biểu mẫu đã xuất hiện và bạn có thể nhập số. Tuy nhiên, khi bạn nhấn nút **Calculate**, trình duyệt sẽ tải lại trang. Đây là **hành vi mặc định của trình duyệt (browser default)**: nó cố gắng gửi dữ liệu biểu mẫu lên một máy chủ. Trong ứng dụng web một trang (SPA) như Angular, chúng ta không muốn điều này xảy ra.