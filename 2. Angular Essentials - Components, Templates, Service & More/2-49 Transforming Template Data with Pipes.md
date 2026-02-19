## Angular Pipes: Bộ chuyển đổi dữ liệu đầu ra

Bài học này giới thiệu về **Pipes** - một tính năng quan trọng trong Angular giúp chuyển đổi và định dạng dữ liệu ngay trong template (giao diện) để hiển thị thân thiện hơn với người dùng.

### Khái niệm

- **Pipes** đóng vai trò là các "bộ chuyển đổi đầu ra" (output transformers).
    
- Chúng nhận dữ liệu đầu vào, xử lý và trả về định dạng hiển thị mong muốn mà không làm thay đổi dữ liệu gốc.
    
- Cú pháp sử dụng: Ký tự gạch đứng `|` theo sau là tên của Pipe.
    
    $$Value \ | \ PipeName$$
    

### Sử dụng DatePipe (Pipe tích hợp sẵn)

Trong ví dụ về `TaskComponent`, ngày hết hạn (`dueDate`) hiển thị mặc định dưới dạng chuỗi thô khó đọc. Để khắc phục, ta sử dụng `DatePipe`.

#### 1. Cài đặt và Import

Trước khi sử dụng `DatePipe` trong Standalone Component, cần import thủ công (vì IDE có thể không tự gợi ý).

- **Lưu ý quan trọng**: `DatePipe` được import từ `@angular/common`, không phải `@angular/core`.
    

TypeScript

```
// task.component.ts
import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common'; // 1. Import từ common
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe], // 2. Thêm vào mảng imports
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
}
```

#### 2. Áp dụng trong Template

Sử dụng ký tự `|` để "truyền" dữ liệu qua pipe.

HTML

```
<time>{{ task.dueDate | date }}</time>
```

### Cấu hình tham số cho Pipe

Pipes có thể nhận các tham số (parameters) để tùy chỉnh đầu ra.

- **Cú pháp**: Thêm dấu hai chấm `:` sau tên Pipe, tiếp theo là giá trị cấu hình.
    
    $$Value \ | \ PipeName : 'Argument'$$
    

**Các ví dụ định dạng ngày tháng:**

- **Định dạng ngắn (`short`):**
    
    HTML
    
    ```
    {{ task.dueDate | date:'short' }}
    ```
    
- **Định dạng đầy đủ (`fullDate`)** (Được sử dụng trong bài):
    
    HTML
    
    ```
    {{ task.dueDate | date:'fullDate' }}
    ```
    

### Tổng kết

- Pipes giúp mã nguồn gọn gàng bằng cách xử lý logic hiển thị ngay tại template.
    
- Angular cung cấp nhiều Pipes tích hợp sẵn (như `DatePipe`).
    
- Có thể tạo Custom Pipes (sẽ học ở các bài sau).
    
- Tham khảo tài liệu chính thức của Angular để biết thêm các tham số cấu hình chi tiết cho từng loại Pipe.