## Tạo và Xử lý Giao diện Thêm Nhiệm vụ mới (New Task Component)

Ghi chú này tập trung vào việc thiết lập giao diện người dùng (UI) cho thành phần thêm nhiệm vụ và cách xử lý logic đóng hộp thoại (dialog) bằng cách sử dụng truyền tin giữa các thành phần (Component Communication) trong Angular.

---

### 1. Thiết lập Giao diện và Định dạng (Template & Styling)

Để tiết kiệm thời gian, cấu hình giao diện sử dụng các thành phần HTML chuẩn và CSS có sẵn:

- **Cấu trúc HTML**: Sử dụng thẻ `<dialog>` tích hợp sẵn của trình duyệt để tạo một lớp phủ (overlay) trên màn hình.
    
- **Thành phần chính**: Bao gồm một lớp nền (backdrop), một biểu mẫu (form) với các trường nhập liệu (input) và các nút điều hướng.
    
- **Lưu ý quan trọng về HTML**: Nút "Hủy" (Cancel) nên được đặt `type="button"`.
    
    - _Lý do_: Tránh việc trình duyệt hiểu lầm là nút gửi biểu mẫu `type="submit"`, gây ra các tác dụng phụ không mong muốn (như tải lại trang) khi nhấn vào.
        

---

### 2. Logic Đóng Hộp thoại (Close Dialog Logic)

Mục tiêu là xóa bỏ thành phần `new-task.component` khỏi DOM khi người dùng không muốn thêm nhiệm vụ nữa.

### 2.1. Tại Thành phần Cha (Tasks Component)

Thành phần cha quản lý việc hiển thị hay ẩn hộp thoại thông qua một biến trạng thái.

- **Thuộc tính**: `isAddingTask` (Kiểu boolean).
    
- **Phương thức mới**: `onCancelAddTask()`
    
    - Nhiệm vụ: Thiết lập `isAddingTask = false`.
        
    - Cơ chế: Khi giá trị này là `false`, chỉ thị `@if` trong template của cha sẽ tự động gỡ bỏ `new-task.component` khỏi cây DOM.
        

### 2.2. Tại Thành phần Con (New Task Component)

Thành phần con cần thông báo cho cha biết khi nào người dùng nhấn vào nút "Hủy" hoặc lớp nền.

- **Phát sự kiện (Emit Event)**: Sử dụng decorator `@Output` và lớp `EventEmitter`.
    
- **Khai báo**:
    
    TypeScript
    
    ```
    @Output() cancel = new EventEmitter<void>();
    ```
    
    - _Ghi chú_: Kiểu dữ liệu `void` (rỗng) được dùng khi sự kiện phát đi không kèm theo bất kỳ dữ liệu nào.
        
- **Phương thức xử lý**: `onCancel()`
    
    - Nội dung: Gọi `this.cancel.emit();` để phát tín hiệu ra bên ngoài.
        

---

### 3. Liên kết Sự kiện (Event Binding)

Để hệ thống hoạt động đồng bộ, cần thực hiện các bước liên kết sau:

1. **Trong Template của Con (`new-task.component.html`)**:
    
    - Gắn sự kiện `(click)` vào lớp nền (backdrop) và nút Cancel để gọi hàm `onCancel()`.
        
2. **Trong Template của Cha (`tasks.component.html`)**:
    
    - Lắng nghe sự kiện tùy chỉnh từ thành phần con:
        
    
    HTML
    
    ```
    <app-new-task (cancel)="onCancelAddTask()" />
    ```
    

---

### 4. Quy trình hoạt động (Workflow)

1. Người dùng nhấn **Cancel** hoặc **Backdrop** tại `NewTaskComponent`.
    
2. Hàm `onCancel()` được kích hoạt, phát ra sự kiện `cancel`.
    
3. `TasksComponent` nhận được sự kiện `cancel` và chạy hàm `onCancelAddTask()`.
    
4. Biến `isAddingTask` chuyển sang `false`.
    
5. Angular tự động cập nhật UI và ẩn hộp thoại nhờ vào cơ chế lập trình khai báo (Declarative programming).