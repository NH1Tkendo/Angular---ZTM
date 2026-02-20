## Thực hành: Xây dựng Ứng dụng Máy tính Đầu tư (Investment Calculator)

### Mục tiêu bài học

- Vận dụng và thực hành các kiến thức cốt lõi của Angular (Angular Essentials) thông qua việc xây dựng một dự án thực tế.
    
- Ứng dụng demo sẽ cho phép người dùng nhập: số tiền đầu tư ban đầu, tỷ lệ lãi suất hàng năm, lợi nhuận kỳ vọng và thời gian đầu tư để theo dõi sự phát triển của khoản tiền.
    
- Bạn có thể linh hoạt giải quyết bài tập này bằng nhiều cách khác nhau: sử dụng Tín hiệu (Signals) hoặc không, dùng Thành phần độc lập (Standalone Components) hoặc Thành phần dựa trên mô-đun (Module-based Components), và có sử dụng Dịch vụ (Service) hay không.
    

### Cấu trúc ứng dụng

Ứng dụng yêu cầu bạn xây dựng 3 thành phần (Components) chính:

- **Thành phần tiêu đề (Header component)**: Hiển thị tiêu đề và hình ảnh của ứng dụng.
    
- **Thành phần đầu vào của người dùng (User Input component)**: Thu thập dữ liệu từ người dùng thông qua Ràng buộc dữ liệu hai chiều (Two-way-binding).
    
- **Thành phần kết quả đầu tư (Investment Results component)**: Xử lý và hiển thị kết quả đầu ra dưới dạng một bảng dữ liệu.
    

### Ghi chú về Dự án mẫu (Starting Project)

Dự án khởi tạo đã được chuẩn bị sẵn một số tài nguyên để bạn có thể tập trung hoàn toàn vào việc thực hành kỹ thuật Angular thay vì phải tự giải quyết các bài toán logic hay thiết kế giao diện:

- **Tệp logic tính toán (`investment-results.ts`)**: Chứa mã TypeScript hỗ trợ tính toán lãi suất tích lũy. Tệp này có thể cần được tinh chỉnh thêm để lấy dữ liệu đầu vào và xuất ra kết quả hàng năm. Bạn có thể tận dụng nó để bỏ qua việc tự viết công thức toán học.
    
- **Tệp định dạng kiểu (CSS files)**: Đã được đính kèm sẵn để tiết kiệm thời gian. Bạn nên tham khảo mã CSS này để biết cấu trúc các lớp (classes), từ đó xây dựng Mã đánh dấu thành phần (Component markup) / HTML cho chính xác.
    

### Xử lý hình ảnh với thư mục Public

Dự án này có một điểm khác biệt quan trọng về cấu trúc tệp tin: hình ảnh được lưu trong **Thư mục công khai (Public folder)** thay vì thư mục `src/assets`.

- **Lưu ý định tuyến**: Khi gọi hình ảnh từ thư mục `public`, bạn **không** thêm từ khóa `public/` vào đường dẫn.
    
- **Cách thực hiện**: Viết trực tiếp tên tệp hình ảnh.
    
    - _Ví dụ_: Sử dụng đường dẫn là `logo.png` thay vì `public/logo.png`.
        

### Hướng dẫn thao tác cài đặt

Để bắt đầu làm việc với thư mục dự án mẫu, bạn cần thực hiện tuần tự các lệnh sau:

1. Cài đặt các tệp phụ thuộc (dependencies):
    
    Bash
    
    ```
    npm install
    ```
    
2. Khởi động máy chủ phát triển (development server):
    
    Bash
    
    ```
    npm start
    ```