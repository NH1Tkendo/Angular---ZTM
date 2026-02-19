## Tổng kết kiến thức cốt lõi về Angular

### 1. Thành phần (Components)

- **Khái niệm:** Là các phần tử HTML tùy chỉnh (custom HTML elements) dùng để xây dựng giao diện người dùng (UI). Các _Thành phần (Components)_ có thể lồng nhau để tạo thành một _Cây thành phần (Component tree)_.
    
- **Cấu hình:** Sử dụng _Trang trí (Decorator)_ `@Component` để định nghĩa bộ nhận diện (selector), tệp giao diện (template) và tệp định dạng (styles).
    

### 2. Giao tiếp giữa các thành phần (Component Communication)

- **Đầu vào (Inputs):** Là các thuộc tính của một _Thành phần (Component)_ cho phép nhận dữ liệu từ _Thành phần cha (Parent Component)_ truyền xuống.
    
- **Đầu ra (Outputs):** Là các sự kiện tùy chỉnh (custom events) có thể chứa dữ liệu, giúp _Thành phần con (Child Component)_ phát tín hiệu thông báo ngược lên _Thành phần cha (Parent Component)_.
    

### 3. Ràng buộc dữ liệu trên giao diện (Template Binding)

- **Nội suy chuỗi (String interpolation):** Xuất trực tiếp giá trị của một thuộc tính từ lớp (class) ra giao diện.
    
- **Ràng buộc thuộc tính (Property binding):** Thiết lập giá trị cho các thuộc tính của phần tử DOM (ví dụ: gán URL cho thuộc tính `src` của thẻ ảnh).
    
- **Ràng buộc sự kiện (Event binding):** Lắng nghe các sự kiện (có sẵn hoặc tùy chỉnh) bằng cú pháp dấu ngoặc đơn `()` bao quanh tên sự kiện để thực thi mã khi sự kiện xảy ra.
    
- **Ràng buộc hai chiều (Two-way binding):** Thường dùng cho các trường nhập liệu (form inputs) thông qua _Chỉ thị (Directive)_ `ngModel` (yêu cầu cấu hình `FormsModule`). Cú pháp này giúp vừa lắng nghe thay đổi từ giao diện vừa cập nhật dữ liệu ngược lại một cách đồng bộ.
    

### 4. Quản lý trạng thái (State Management)

- **Cơ chế mặc định:** Angular tự động theo dõi các sự kiện có thể làm thay đổi dữ liệu thông qua gói nội bộ `zone.js` và tự động cập nhật UI.
    
- **Tín hiệu (Signals):** Giới thiệu từ bản Angular 16. Đây là cơ chế thông báo thay đổi một cách rõ ràng (ví dụ gọi hàm `set()`). Angular sẽ tạo _Đăng ký (Subscription)_ để chỉ cập nhật những nơi cần thiết, giúp tối ưu hóa hiệu suất tốt hơn so với cơ chế mặc định.
    

### 5. Cú pháp luồng điều khiển (Control Flow Syntax)

- **Điều kiện:** Sử dụng cú pháp `@if` (có từ Angular 17) để hiển thị nội dung có điều kiện. Cú pháp này gọn gàng và dễ xử lý các trường hợp `else`/`else if` hơn so với _Chỉ thị (Directive)_ `ngIf` cũ.
    
- **Vòng lặp:** Sử dụng cú pháp `@for` (từ Angular 17) để lặp qua một mảng và hiển thị mã HTML cho từng phần tử, thay thế cho _Chỉ thị (Directive)_ `ngFor` ở các phiên bản trước.
    

### 6. Các tính năng giao diện và định dạng khác

- **Ràng buộc lớp (Class binding):** Thêm hoặc xóa linh hoạt các lớp CSS trên một phần tử.
    
- **Chiếu nội dung (Content projection):** Sử dụng thẻ `ng-content` để tạo các vị trí trống (slots) trong giao diện, cho phép truyền nội dung HTML vào giữa các thẻ mở và đóng của _Thành phần (Component)_.
    
- **Ống dẫn (Pipes):** Chuyển đổi và định dạng dữ liệu ngay trên giao diện (ví dụ: _Date pipe_ để định dạng ngày tháng).
    

### 7. Xử lý biểu mẫu (Form Submission)

- **Sự kiện ngSubmit:** Khi sử dụng _Mô-đun biểu mẫu (Forms module)_, `ngSubmit` tự động ngăn chặn hành vi gửi yêu cầu HTTP mặc định của trình duyệt, cho phép bạn toàn quyền xử lý dữ liệu biểu mẫu (form) bằng mã logic phía máy khách (client-side).
    

### 8. Dịch vụ và Tiêm phụ thuộc (Services & Dependency Injection)

- **Khái niệm:** Cơ chế tách biệt dữ liệu và logic ra khỏi _Thành phần (Component)_ để đưa vào một _Dịch vụ (Service)_, giúp tái sử dụng và chia sẻ mã dễ dàng.
    
- **Cách cấu hình:** Đánh dấu lớp dịch vụ bằng _Trang trí (Decorator)_ `@Injectable` để thông báo cho Angular biết đây là một lớp có thể tiêm được.
    
- **Cách tiêm (Injection methods):** Có thể tiêm _Dịch vụ (Service)_ vào _Thành phần (Component)_ thông qua _Hàm khởi tạo (Constructor)_ kèm kiểu dữ liệu (type annotation), hoặc dùng hàm `inject()`.