## Lịch sử phiên bản và Sự ổn định của Angular

Angular là một khuôn khổ (framework) phát triển liên tục nhưng luôn đề cao tính ổn định và khả năng **tương thích ngược** (backward-compatible). Điều này đảm bảo kiến thức của lập trình viên không bị lỗi thời sau mỗi bản cập nhật.

### 1. Phân biệt AngularJS và Angular

- **AngularJS (Angular 1):** Là phiên bản đầu tiên, nhưng về mặt kỹ thuật là một framework hoàn toàn khác biệt.
    
- **Angular 2 (Ra mắt 2016):** Là bản viết lại hoàn toàn (total rewrite), đánh dấu sự khởi đầu của Angular hiện đại.
    
- **Các phiên bản sau này:** Từ Angular 2 trở đi, các phiên bản mới là sự kế thừa và nâng cấp, không phải là sự thay đổi hoàn toàn cấu trúc như từ v1 lên v2.
    

### 2. Chu kỳ phát hành và Sự ổn định

- **Chu kỳ cập nhật:** Nhóm phát triển Angular duy trì chính sách phát hành phiên bản chính (major version) mới **mỗi 6 tháng**.
    
- **Tính ổn định cao:**
    
    - Việc ra mắt phiên bản mới thường xuyên **không** có nghĩa là phiên bản cũ bị lỗi thời ngay lập tức.
        
    - Mã nguồn viết cho Angular 2 phần lớn vẫn hoạt động tốt trên các phiên bản mới nhất hiện nay.
        
    - Các thay đổi chủ yếu là thêm tính năng mới hoặc tối ưu hóa theo cách tương thích ngược.
        

### 3. Thực tế sử dụng và Các tính năng quan trọng

Trong thực tế, nhiều đội ngũ và công ty vẫn đang duy trì các dự án sử dụng phiên bản Angular cũ. Do đó, việc nắm bắt sự khác biệt giữa các phiên bản là rất quan trọng.

- **Lưu ý về phiên bản:** Một số tính năng hiện đại chỉ khả dụng từ một phiên bản cụ thể trở đi.
    
- **Các cột mốc quan trọng (Ví dụ):**
    
    - **Angular 14 & 16:** Giới thiệu các khái niệm mới mang tính đột phá như **Thành phần độc lập** (Standalone Components) và **Tín hiệu** (Signals).
        
    - Đây là các tính năng tùy chọn (optional), cho phép lập trình viên áp dụng cách viết code mới hiện đại hơn, nhưng vẫn hỗ trợ cách viết truyền thống.
        

> **Ghi chú học tập:** Khi làm việc với Angular, cần xác định phiên bản dự án đang sử dụng để áp dụng cú pháp phù hợp. Khóa học này sẽ bao gồm cả kiến thức nền tảng tương thích với bản cũ và các tính năng hiện đại (future-proof), đồng thời chú thích rõ yêu cầu phiên bản tối thiểu cho từng tính năng.