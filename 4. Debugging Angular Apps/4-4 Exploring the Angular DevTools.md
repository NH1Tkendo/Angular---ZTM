## Công cụ cho Nhà phát triển Angular (Angular DevTools)

### Cài đặt và Kích hoạt

Công cụ cuối cùng và vô cùng hữu ích mà mọi nhà phát triển Angular nên biết là **Công cụ cho Nhà phát triển Angular (Angular DevTools)**.

- **Cách cài đặt**: Đây là một tiện ích mở rộng (browser extension) dành cho trình duyệt (như Google Chrome). Bạn có thể tìm thấy nó trên trang tiện ích mở rộng của trình duyệt và nhấn "Add to Chrome" (Thêm vào Chrome) để cài đặt.
    
- **Cách sử dụng**: Sau khi cài đặt, hãy mở một trang web được viết bằng Angular, nhấn F12 để mở Công cụ dành cho nhà phát triển của trình duyệt (Browser Developer Tools). Lúc này, bạn sẽ thấy xuất hiện thêm một thẻ (tab) mới mang tên **Angular**. Nhấp vào đó để bắt đầu.
    

---

### Khám phá các Tính năng Chính (Main Features)

Khi Angular DevTools được tải lên, giao diện sẽ bao gồm 3 thẻ chính phục vụ cho các mục đích gỡ lỗi và kiểm tra khác nhau:

#### 1. Thẻ Thành phần (Components tab)

Đây là thẻ hữu ích nhất trong quá trình phát triển thông thường, giúp bạn kiểm tra luồng dữ liệu và cấu trúc giao diện.

- **Cây thành phần (Component tree)**: Cung cấp cái nhìn tổng quan về hệ thống phân cấp các thành phần trong ứng dụng của bạn.
    
- **Kiểm tra trực quan**: Khi bạn di chuột (hover) hoặc nhấp vào một thành phần trong danh sách, phần tử tương ứng trên giao diện (UI) sẽ được làm nổi bật.
    
- **Theo dõi và Chỉnh sửa Dữ liệu**: Bạn có thể xem chi tiết các thuộc tính đầu vào (inputs) và đầu ra (outputs) của thành phần đó. Đặc biệt, bạn có thể nhấp đúp (double-click) vào các giá trị input để thay đổi chúng trực tiếp (ví dụ: đổi `selected` thành `true`) và ngay lập tức nhìn thấy giao diện cập nhật theo sự thay đổi đó để phục vụ việc kiểm thử nhanh.
    
- **Biểu tượng Kiểm tra phần tử (Inspect Element icon)**: Cho phép bạn nhấp vào một phần tử bất kỳ trên giao diện web, công cụ sẽ tự động chọn và chỉ ra thành phần tương ứng bên trong Cây thành phần.
    

#### 2. Thẻ Hồ sơ hiệu suất (Profiler tab)

- **Mục đích**: Cho phép bạn phân tích hiệu suất (performance) của ứng dụng Angular.
    
- **Cách hoạt động**: Bạn có thể bắt đầu ghi lại (record) các thao tác trên trang, sau đó dừng lại để xem hệ thống báo cáo. Công cụ sẽ hiển thị trang được cập nhật bao nhiêu lần, thành phần nào xử lý khối lượng công việc lớn nhất, giúp bạn tìm ra và khắc phục các điểm nghẽn hiệu năng (bottlenecks).
    

#### 3. Thẻ Cây tiêm phụ thuộc (Injector Tree tab)

- **Mục đích**: Hỗ trợ theo dõi và hiểu rõ cơ chế **Tiêm phụ thuộc (Dependency Injection)** trong ứng dụng. Đây là một chủ đề nâng cao (advanced topic) và thường được sử dụng khi cấu trúc ứng dụng trở nên phức tạp.
    

### Tổng kết

Trong giai đoạn hiện tại, **Thẻ Thành phần (Components tab)** sẽ là người bạn đồng hành đắc lực nhất của bạn. Khi dự án mở rộng, bạn có thể tham khảo thêm tài liệu chính thức (official documentation) của Angular để khai thác tối đa sức mạnh của Profiler và Injector Tree.