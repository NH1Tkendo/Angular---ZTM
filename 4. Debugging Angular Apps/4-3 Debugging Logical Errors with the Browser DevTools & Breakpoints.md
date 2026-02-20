## Gỡ Lỗi Logic (Logical Errors) trong Angular

### Vấn đề: Ứng dụng không báo lỗi nhưng hoạt động sai

Sau khi khắc phục các lỗi biên dịch, ứng dụng của bạn có thể tải lên hoàn toàn bình thường mà không có bất kỳ thông báo lỗi màu đỏ nào. Tuy nhiên, một vấn đề mới phát sinh: khi bạn điền thông tin và nhấn nút "Create" để thêm một công việc (task) mới, công việc đó lại không hiển thị trên màn hình.

Đây được gọi là **lỗi logic (logical error)**. Nguyên nhân có thể đến từ nhiều phía: dữ liệu nhập vào không được đọc đúng, công việc không được thêm thành công, hoặc bị gán nhầm cho một người dùng (user) khác. Để giải quyết, thay vì chỉ đọc lại mã nguồn một cách dò dẫm, chúng ta sẽ sử dụng công cụ mạnh mẽ hơn.

---

### Sử dụng Công cụ cho Nhà phát triển (Browser Developer Tools)

Trình duyệt web (như Google Chrome) cung cấp các công cụ tích hợp sẵn giúp bạn phân tích mã nguồn ngay trong lúc ứng dụng đang chạy (runtime).

- **Tab Nguồn (Sources tab)**: Đây là nơi bạn có thể xem và tương tác trực tiếp với mã nguồn TypeScript của mình.
    
- **Sơ đồ Nguồn (Source Maps)**: Mặc dù mã thực thi trên trình duyệt là JavaScript đã được biên dịch, Angular CLI tự động tạo ra các tệp _Sơ đồ Nguồn (Source Maps)_. Nhờ tính năng này, trình duyệt có thể ánh xạ ngược đoạn mã đang chạy về đúng nguyên bản tệp TypeScript (`.ts`) mà bạn đã viết. Bạn có thể dễ dàng điều hướng vào thư mục `src/app/tasks/` ngay trong trình duyệt.
    

---

### Hướng dẫn Gỡ lỗi bằng Điểm dừng (Breakpoints)

Dưới đây là quy trình từng bước để phát hiện nguyên nhân gây lỗi:

1. **Đặt Điểm dừng (Breakpoint)**:
    
    - Mở Developer Tools, chuyển sang tab **Sources**.
        
    - Tìm đến tệp TypeScript đang xử lý logic (ví dụ: `new-task.component.ts`).
        
    - Nhấp chuột vào số dòng bên cạnh hàm `onSubmit` để đặt một _Điểm dừng (Breakpoint)_.
        
2. **Kích hoạt tính năng gỡ lỗi**:
    
    - Quay lại giao diện trang web, nhập dữ liệu vào biểu mẫu và nhấn "Create".
        
    - Trình duyệt sẽ lập tức tạm dừng (pause) quá trình thực thi ngay tại dòng mã bạn đã đánh dấu.
        
3. **Kiểm tra dữ liệu (Hover to inspect)**:
    
    - Di chuột lên các biến (ví dụ: `enteredTitle`) để xem giá trị hiện tại của chúng.
        
    - _Kết quả_: Nếu dữ liệu vẫn hiển thị chính xác, chứng tỏ quá trình trích xuất dữ liệu từ biểu mẫu không có lỗi. Vấn đề nằm ở bước tiếp theo.
        
4. **Đi sâu vào luồng thực thi (Step into)**:
    
    - Sử dụng các nút điều khiển của công cụ gỡ lỗi (phía trên cùng bên phải màn hình DevTools).
        
    - Bấm nút **Đi vào (Step into/Dive into)** để theo dõi luồng mã di chuyển vào bên trong hàm `addTask` (thuộc Service).
        

---

### Phát hiện Nguyên nhân và Khắc phục (The Fix)

Khi đi sâu vào hàm `addTask` thông qua trình gỡ lỗi, bạn sẽ phát hiện ra nguyên nhân gốc rễ: biến `userId` đang bị gán cứng bằng một chuỗi rỗng (`''`), thay vì sử dụng tham số `userId` thực tế được truyền vào hàm. Đây là lý do công việc được tạo ra nhưng không gán cho bất kỳ ai, dẫn đến việc không hiển thị trên giao diện.

**Cách sửa lỗi trong mã nguồn:**

TypeScript

```
// Bên trong tệp xử lý logic thêm Task (Service)

addTask(taskData, userId: string) {
  const newTask = {
    ...taskData,
    // Lỗi cũ: userId: '',
    userId: userId // Sửa lại: Gán đúng tham số userId được truyền vào
  };
  
  // ... logic lưu trữ task
}
```

**Hoàn tất và Kiểm tra lại:**

- Xóa _Điểm dừng (Breakpoint)_ trong trình duyệt (bằng cách nhấp lại vào số dòng đó) để ứng dụng không bị tạm dừng ở các lần chạy sau.
    
- Lưu tệp mã nguồn và thử thêm lại một công việc mới trên giao diện. Bạn sẽ thấy dữ liệu hiển thị đúng vào danh sách của người dùng hiện tại.