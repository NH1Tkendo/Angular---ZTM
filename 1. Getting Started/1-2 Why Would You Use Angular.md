## Tại sao nên sử dụng Angular?

Angular là một khuôn khổ (framework) mạnh mẽ, đặc biệt hữu ích khi xây dựng các ứng dụng web phức tạp và có tính tương tác cao. Dưới đây là 4 lý do chính khiến Angular vượt trội so với JavaScript thuần (Vanilla JavaScript).

### 1. Mã lệnh Tuyên bố (Declarative Code)

Angular cho phép viết mã theo phong cách tuyên bố thay vì mệnh lệnh (Imperative).

- **JavaScript thuần (Imperative):**
    
    - Bạn phải viết từng bước hướng dẫn cụ thể cho trình duyệt.
        
    - Quy trình thủ công: Truy cập phần tử DOM $\rightarrow$ Kiểm tra điều kiện $\rightarrow$ Cập nhật DOM.
        
    - Phải quản lý rõ ràng mọi thay đổi trạng thái.
        
- **Angular (Declarative):**
    
    - Bạn chỉ cần định nghĩa **trạng thái đích** (target state) mong muốn trong mã đánh dấu (markup).
        
    - Sử dụng các cú pháp đặc biệt của Angular trong HTML để xác định logic hiển thị.
        
    - **Cơ chế hoạt động:** Angular tự động xử lý các bước trung gian để cập nhật giao diện người dùng (UI) khớp với trạng thái đã định nghĩa, loại bỏ việc thao tác DOM thủ công.
        

### 2. Kiến trúc dựa trên Thành phần (Components)

Angular áp dụng nguyên lý **Phân tách các mối quan tâm** (Separation of Concerns) thông qua khái niệm Thành phần (Components).

- **Định nghĩa:** Một Component giống như một thẻ HTML tùy chỉnh, bao gồm sự kết hợp của:
    
    - Mã đánh dấu (Markup - HTML)
        
    - Định dạng (Styling - CSS)
        
    - Logic xử lý (Code)
        
- **Lợi ích:**
    
    - **Giảm độ phức tạp:** Chia nhỏ giao diện phức tạp thành các khối xây dựng (building blocks) đơn giản hơn để dễ quản lý.
        
    - **Tái sử dụng:** Các thành phần có thể được lắp ghép và tái sử dụng ở nhiều nơi.
        
    - **Làm việc nhóm:** Dễ dàng phân chia công việc cho các thành viên trong nhóm dựa trên các thành phần riêng biệt của giao diện.
        

### 3. Hỗ trợ Lập trình Hướng đối tượng (OOP Concepts)

Angular tích hợp các nguyên tắc của **Lập trình hướng đối tượng** (Object Oriented Programming), giúp ứng dụng dễ mở rộng và bảo trì.

- Cung cấp các công cụ mạnh mẽ như:
    
    - **Tiêm phụ thuộc** (Dependency Injection)
        
    - **Lớp** (Classes)
        
- Những tính năng này hỗ trợ xây dựng cấu trúc mã nguồn chặt chẽ, chuyên nghiệp mà không yêu cầu lập trình viên phải là chuyên gia OOP ngay từ đầu.
    

### 4. Sử dụng TypeScript

Angular được xây dựng trên nền tảng **TypeScript** thay vì JavaScript thuần.

- **Đặc điểm của TypeScript:**
    
    - Là phiên bản nâng cấp của JavaScript với **định kiểu mạnh và nghiêm ngặt** (strict and strong typing).
        
    - Ví dụ: Không thể tùy tiện thay đổi kiểu dữ liệu của một biến hoặc truyền sai tham số vào hàm.
        
- **Ưu điểm:**
    
    - **Phát hiện lỗi sớm:** Giúp tìm ra các lỗi đơn giản ngay trong quá trình phát triển (compile-time) thay vì chờ đến khi chạy ứng dụng (runtime) mới phát sinh lỗi.
        
    - **Chất lượng mã nguồn:** Giảm thiểu lỗi crash ứng dụng và hành vi sai lệch, giúp mã nguồn an toàn và dễ bảo trì hơn.
        

> **Ghi chú:** Bạn không cần phải biết trước TypeScript để bắt đầu học Angular. Các kiến thức này sẽ được tích lũy dần trong quá trình học framework.