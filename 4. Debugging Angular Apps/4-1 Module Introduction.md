## Giới thiệu về Gỡ lỗi (Debugging) trong Angular

### Mục tiêu Học tập

Trong quá trình làm việc với Angular, việc đối mặt với lỗi (errors) là điều không thể tránh khỏi. Trọng tâm của phần học này là cung cấp cho bạn các kỹ năng để gỡ lỗi (debug) và khắc phục sự cố một cách hiệu quả:

- **Đọc hiểu thông báo lỗi (Error messages)**: Phân tích ý nghĩa của các thông báo lỗi mà Angular trả về, từ đó tìm ra cách khắc phục nguyên nhân gốc rễ.
    
- **Gỡ lỗi logic (Logical errors)**: Phát hiện và sửa các lỗi tiềm ẩn (bugs) trong mã nguồn — đây là những lỗi nguy hiểm nhất vì chúng không tạo ra thông báo lỗi hệ thống nhưng lại khiến chương trình hoạt động sai hoặc trả về kết quả không mong muốn.
    
- **Công cụ cho Nhà phát triển (Angular Developer Tools)**: Khám phá cách cài đặt và sử dụng tiện ích mở rộng này, cũng như lý do tại sao nó là một trợ thủ đắc lực trong quá trình phát triển dự án.
    

---

### Thiết lập Dự án Thực hành (Project Setup)

Để phục vụ cho phần học này, giảng viên đã chuẩn bị một mã nguồn khởi đầu (starting project) mới. Về cơ bản, đây chính là ứng dụng hoàn thiện từ phần trước nhưng đã được **chủ đích chèn thêm một số lỗi** để bạn thực hành gỡ lỗi.

**Hướng dẫn thao tác:**

1. Tải và mở dự án khởi đầu (được đính kèm trong bài học) bằng trình soạn thảo mã của bạn.
    
2. Mở cửa sổ dòng lệnh (Terminal), đảm bảo bạn đang ở đúng thư mục gốc của dự án và chạy lệnh sau để cài đặt tất cả các **gói phụ thuộc (dependencies)**:
    
    Bash
    
    ```
    npm install
    ```
    
3. Sau khi cài đặt xong, hãy thử khởi chạy **máy chủ phát triển (development server)**:
    
    Bash
    
    ```
    npm start
    ```
    

**Lưu ý quan trọng**: Ngay khi chạy lệnh `npm start`, bạn sẽ lập tức bị "chào đón" bởi một thông báo lỗi khiến ứng dụng không thể biên dịch. Đừng lo lắng! Đó là thiết kế có chủ ý của bài học. Bước tiếp theo của chúng ta chính là đọc hiểu thông báo lỗi này và tìm cách khắc phục nó.