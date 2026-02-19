## Bài tập: Cập nhật tính năng hoàn thành công việc thông qua Dịch vụ (Service)

### Mục tiêu

- Sửa đổi mã nguồn để khi nhấn nút **Hoàn thành (Complete)**, hệ thống sẽ xóa công việc (task) tương ứng.
    
- Đưa logic xử lý này vào _Dịch vụ (Service)_ thay vì xử lý trực tiếp tại _Thành phần danh sách công việc (TasksComponent)_.
    
- Việc lấy dữ liệu công việc vẫn giữ ở `TasksComponent`, nhưng thao tác đánh dấu hoàn thành sẽ được chuyển sang _Thành phần công việc đơn lẻ (TaskComponent)_.
    

### Các bước thực hiện

- **Bước 1: Xóa phương thức cũ tại `TasksComponent`**
    
    - Xóa phương thức `onCompleteTask` bên trong `TasksComponent`.
        
    - _Mục đích:_ Dành không gian để thực hành việc thao tác với _Dịch vụ (Service)_ trực tiếp từ component con, giảm bớt sự phụ thuộc của component cha.
        
- **Bước 2: Tiêm (Inject) Service vào `TaskComponent`**
    
    - Chuyển sang `TaskComponent` (nơi quản lý từng công việc riêng lẻ).
        
    - Khai báo và tiêm `TasksService` vào component này. Bạn có thể dùng _hàm tiêm (inject function)_ hoặc _hàm khởi tạo (constructor)_.
        
    - Nếu sử dụng hàm `inject`, hãy đảm bảo nó được nhập (import) từ thư viện `@angular/core`.
        
- **Bước 3: Cập nhật logic xử lý sự kiện hoàn thành**
    
    - Trong phương thức `onCompleteTask` của `TaskComponent`, ngừng phát ra (emit) sự kiện.
        
    - Thay vào đó, gọi phương thức `removeTask` từ `tasksService` vừa được tiêm, truyền vào ID của công việc hiện tại: `this.tasksService.removeTask(this.task.id)`.
        
- **Bước 4: Dọn dẹp mã nguồn thừa (Refactoring)**
    
    - Xóa toàn bộ các khai báo liên quan đến việc phát sự kiện `complete`.
        
    - Xóa các lệnh nhập (import) `EventEmitter` và `Output` ở đầu tệp vì `TaskComponent` không còn nhiệm vụ đẩy dữ liệu lên component cha.
        
- **Bước 5: Cập nhật tệp giao diện (Template) của `TasksComponent`**
    
    - Mở tệp HTML của `TasksComponent`.
        
    - Gỡ bỏ đoạn mã đang lắng nghe sự kiện `complete` (ví dụ: `(complete)="..."`), vì component con giờ đây đã tự xử lý việc này thông qua _Dịch vụ (Service)_.
        

### Mã nguồn minh họa (TaskComponent)

TypeScript

```
import { Component, Input, inject } from '@angular/core'; 
// Đã xóa import của EventEmitter và Output

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: any; // Object chứa thông tin công việc hiện tại
  
  // Tiêm TasksService bằng hàm inject
  private tasksService = inject(TasksService);

  onCompleteTask() {
    // Gọi trực tiếp Service thay vì dùng EventEmitter để báo lên component cha
    this.tasksService.removeTask(this.task.id);
  }
}
```

### Kết quả mong đợi

Sau khi lưu lại toàn bộ thay đổi, bạn có thể chọn người dùng, nhấn đánh dấu hoàn thành công việc và công việc đó sẽ ngay lập tức bị xóa khỏi danh sách giao diện.