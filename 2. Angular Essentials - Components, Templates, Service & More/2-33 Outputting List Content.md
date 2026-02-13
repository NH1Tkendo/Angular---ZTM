## Hiển thị Danh sách Động (Dynamic List Rendering) với @for

### 1. Tổng quan vấn đề

Việc hiển thị danh sách bằng cách sao chép thủ công các phần tử HTML (hardcoding) có nhiều hạn chế:

- **Không linh hoạt**: Không xử lý được khi dữ liệu thay đổi (thêm/xóa phần tử).
    
- **Khó bảo trì**: Mã nguồn dài dòng và lặp lại không cần thiết.
    
- **Không thực tế**: Dữ liệu thực tế thường là danh sách động với số lượng không cố định.
    

### 2. Giải pháp: Cú pháp @for

Angular cung cấp cú pháp điều khiển luồng (control flow syntax) đặc biệt là `@for` để render danh sách dựa trên dữ liệu từ mảng.

**Cấu trúc cơ bản:**

- Sử dụng ký tự `@` để Angular nhận diện trong mẫu (template).
    
- Tương tự vòng lặp `for` trong JavaScript.
    

### 3. Cách thực hiện

Để hiển thị danh sách người dùng từ một mảng dữ liệu trong lớp thành phần (component class), ta sử dụng cú pháp sau trong HTML template:

HTML

```
<ul>
  @for (user of users; track user.id) {
    <li>
      <app-user [user]="user" />
    </li>
  }
</ul>
```

**Giải thích các thành phần:**

- `users`: Tên thuộc tính trong component class chứa mảng dữ liệu cần lặp.
    
- `user`: Tên biến cục bộ (do lập trình viên tự đặt) đại diện cho từng phần tử trong mỗi vòng lặp.
    
- `track user.id`: Biểu thức bắt buộc để định danh duy nhất cho mỗi phần tử (xem chi tiết mục 4).
    
- `{ ... }`: Khối nội dung sẽ được lặp lại và render cho mỗi phần tử.
    

### 4. Biểu thức theo dõi (Track Expression)

Angular bắt buộc phải có biểu thức `track` khi sử dụng `@for`.

**Cú pháp:** Thêm dấu chấm phẩy `;` sau phần khai báo vòng lặp, theo sau là từ khóa `track` và một thuộc tính định danh duy nhất (ví dụ: `user.id`).

**Tại sao cần `track`?**

- **Tối ưu hiệu suất (Performance Optimization)**: Giúp Angular theo dõi (keep track) từng mục đang được render.
    
- **Cơ chế hoạt động**: Khi dữ liệu danh sách thay đổi (xáo trộn, thêm, xóa), Angular sử dụng ID này để xác định phần tử nào có thể tái sử dụng thay vì hủy bỏ và tạo lại toàn bộ danh sách (recreate the entire list).
    
- **Yêu cầu bắt buộc**: Ngay cả khi dữ liệu danh sách không bao giờ thay đổi, Angular vẫn yêu cầu khai báo `track`.
    

### 5. Kết quả

- Mã nguồn trở nên ngắn gọn và sạch sẽ hơn.
    
- Danh sách được render động dựa trên độ dài thực tế của mảng dữ liệu.
    
- Tối ưu hóa việc cập nhật giao diện người dùng (UI) khi dữ liệu thay đổi.