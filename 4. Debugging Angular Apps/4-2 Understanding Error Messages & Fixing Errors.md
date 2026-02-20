## Phân tích và Xử lý Lỗi Biên dịch (Compilation Errors)

### Đọc hiểu Thông báo lỗi trên Terminal

Khi bạn chạy lệnh khởi động dự án và gặp lỗi, điều quan trọng nhất là **đừng hoảng sợ**. Hầu hết các thông báo lỗi của Angular đều được thiết kế rất chi tiết và dễ hiểu, giúp bạn nhanh chóng xác định vấn đề thay vì phải tìm kiếm sự trợ giúp ngay lập tức.

- **Nội dung lỗi (Error Message)**: Trong trường hợp này, terminal báo lỗi: _"Object type is not assignable to type string"_ (Kiểu đối tượng không thể gán cho kiểu chuỗi). Nghĩa là bạn đang truyền một đối tượng (object) vào một nơi đang yêu cầu dữ liệu dạng chuỗi (string).
    
- **Vị trí lỗi (Location)**: Angular không chỉ báo lỗi mà còn chỉ đích danh vị trí gây ra lỗi. Ở đây, nó chỉ rõ tệp `app.component.html` tại dòng số 13. Nó thậm chí còn trích xuất và làm nổi bật phần mã có vấn đề (liên quan đến việc gán giá trị đầu vào - _input assignment_).
    

---

### Tận dụng Môi trường Phát triển Tích hợp (IDE)

Một trong những điểm mạnh khi lập trình Angular là sự hỗ trợ tuyệt vời từ các trình soạn thảo mã (như Visual Studio Code).

- **Tiện ích mở rộng (Extension)**: Nếu bạn cài đặt tiện ích _Angular Language Server_, IDE sẽ tự động bắt lỗi ngay trong lúc bạn đang viết mã, thậm chí trước cả khi bạn chạy dự án.
    
- **Nhận diện trực quan**: Các đoạn mã có vấn đề sẽ được gạch chân bằng **đường lượn sóng màu đỏ (red squiggly lines)**.
    
- **Xem lỗi trực tiếp**: Bạn chỉ cần di chuột (hover) lên phần bị gạch đỏ, IDE sẽ hiển thị thông báo lỗi giống hệt như trên terminal.
    

---

### Hướng dẫn Khắc phục (The Fix)

Dựa vào các phân tích trên, vấn đề nằm ở việc chúng ta đang truyền toàn bộ đối tượng `selectedUser` vào thuộc tính `userId` (vốn dĩ chỉ nhận một chuỗi ID).

Để sửa lỗi, bạn chỉ cần truy cập vào thuộc tính `id` của đối tượng `selectedUser` để lấy ra giá trị chuỗi và truyền nó vào.

**Mã nguồn sửa lỗi tại `app.component.html`:**

HTML

```
<app-user [userId]="selectedUser.id"></app-user>
```

Sau khi sửa đoạn mã này và lưu lại, ứng dụng của bạn sẽ biên dịch thành công.