## Phương thức `inject()` và Tái cấu trúc Component

Bài học này giới thiệu một cách tiếp cận hiện đại hơn để tiêm phụ thuộc (Dependency Injection) trong Angular và quy trình tái cấu trúc (refactoring) mã nguồn để sử dụng Service thay vì truyền dữ liệu qua sự kiện.

### 1. Hàm `inject()`: Giải pháp thay thế cho Constructor Injection

Ngoài cách tiêm phụ thuộc qua **hàm khởi tạo (constructor)** truyền thống, Angular cung cấp hàm `inject()` để thực hiện điều tương tự một cách gọn gàng hơn.

- **Đặc điểm**:
    
    - Cho phép khởi tạo dependency ngay tại dòng khai báo thuộc tính.
        
    - Không cần định nghĩa constructor.
        
    - Cần import từ `@angular/core`.
        
- **Cú pháp thực hiện**: Trong `NewTaskComponent` (hoặc bất kỳ class nào):
    
    TypeScript
    
    ```
    import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
    import { TasksService } from '../tasks.service';
    
    export class NewTaskComponent {
      // Cách cũ: dùng constructor(private tasksService: TasksService) {}
    
      // Cách mới: Dùng hàm inject()
      private tasksService = inject(TasksService);
    
      // ... code khác
    }
    ```
    

### 2. Tái cấu trúc `NewTaskComponent`

Mục tiêu: Chuyển đổi logic từ việc **phát sự kiện (emit event)** chứa dữ liệu sang việc **gọi trực tiếp Service**.

#### Các bước thay đổi:

1. **Thêm Input `userId`**: Service cần biết Task thuộc về User nào. Vì `NewTaskComponent` chưa có thông tin này, ta cần nhận nó từ component cha.
    
    TypeScript
    
    ```
    @Input({ required: true }) userId!: string;
    ```
    
2. **Cập nhật phương thức `onSubmit`**: Thay vì emit dữ liệu task, ta gọi phương thức `addTask` từ Service.
    
    TypeScript
    
    ```
    onSubmit() {
      // Gọi service để thêm task
      this.tasksService.addTask({
        title: this.enteredTitle,
        summary: this.enteredSummary,
        date: this.enteredDate
      }, this.userId); // Truyền thêm userId
    
      // Đóng hộp thoại sau khi lưu
      this.close.emit(); 
    }
    ```
    
3. **Chuẩn hóa sự kiện Đóng (Close Event)**: Thay đổi tên sự kiện từ `cancel` thành `close` để mang nghĩa tổng quát hơn (dùng cho cả việc "Hủy bỏ" và "Hoàn tất thêm mới").
    
    TypeScript
    
    ```
    @Output() close = new EventEmitter<void>();
    
    onCancel() {
      this.close.emit();
    }
    ```
    

### 3. Cập nhật `TasksComponent` (Component cha)

Sau khi sửa đổi `NewTaskComponent`, cần cập nhật component cha để khớp với API mới.

- **Cập nhật Template HTML (`tasks.component.html`)**:
    
    - Truyền `userId` vào component con.
        
    - Lắng nghe sự kiện `(close)` thay vì `(cancel)`.
        
    - Bỏ lắng nghe sự kiện `(add)` (vì việc thêm task đã được xử lý ngầm trong Service).
        
    
    HTML
    
    ```
    <app-new-task 
      [userId]="userId" 
      (close)="onCloseAddTask()"
    ></app-new-task>
    ```
    
- **Cập nhật Class Logic (`tasks.component.ts`)**:
    
    - Đổi tên phương thức `onCancelAddTask` thành `onCloseAddTask`.
        
    - Xóa phương thức `onAddTask` (không còn dùng nữa).
        

### Tổng kết quy trình

1. **Inject Service** vào component con (`NewTaskComponent`) bằng hàm `inject()`.
    
2. **Gọi Service** trực tiếp trong component con để xử lý dữ liệu.
    
3. **Dọn dẹp** các sự kiện Output không còn cần thiết (sự kiện truyền dữ liệu).
    
4. **Cập nhật** component cha để truyền các tham số cần thiết (`userId`) và xử lý đóng giao diện.
    

> **Lưu ý**: Việc lựa chọn giữa **Constructor Injection** và **`inject()` function** phụ thuộc vào sở thích của lập trình viên hoặc quy định của dự án. Cả hai đều hoạt động tốt như nhau.