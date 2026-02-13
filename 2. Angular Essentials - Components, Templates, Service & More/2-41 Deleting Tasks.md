## Chức năng Hoàn thành Nhiệm vụ (Complete Task Functionality)

Bài học này hướng dẫn cách thực hiện chức năng "Hoàn thành" (Complete) cho một nhiệm vụ: khi người dùng nhấn nút, nhiệm vụ đó sẽ bị xóa khỏi danh sách. Quy trình bao gồm việc gửi sự kiện từ component con lên component cha và cập nhật trạng thái mảng dữ liệu.

### 1. Thiết lập tại Component Con (Child Component)

Tại `TaskComponent`, chúng ta cần định nghĩa một sự kiện đầu ra (Output) để thông báo cho cha biết khi nào nút "Complete" được nhấn và gửi kèm ID của nhiệm vụ đó.

- **Bước 1: Định nghĩa Output**: Sử dụng `EventEmitter` với kiểu dữ liệu generic là `<string>` (vì ID là chuỗi).
    
- **Bước 2: Phát sự kiện (Emit)**: Tạo phương thức để kích hoạt sự kiện và gửi ID ra ngoài.
    

**File:** `task.component.ts`

TypeScript

```
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { type Task } from './task.model';

@Component({ ... })
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  
  // Định nghĩa sự kiện custom tên là 'complete'
  // Output gửi đi một dữ liệu kiểu string (ID của task)
  @Output() complete = new EventEmitter<string>();

  onCompleteTask() {
    // Phát sự kiện và gửi kèm ID của task hiện tại
    this.complete.emit(this.task.id);
  }
}
```

**File:** `task.component.html`

- Gắn sự kiện click vào nút bấm để gọi phương thức vừa tạo.
    

HTML

```
<article>
  <p class="actions">
    <button (click)="onCompleteTask()">Complete</button>
  </p>
</article>
```

### 2. Xử lý tại Component Cha (Parent Component)

Tại `TasksComponent` (nơi quản lý danh sách tasks), chúng ta cần lắng nghe sự kiện `complete` và cập nhật lại mảng dữ liệu.

- **Bước 1: Lắng nghe sự kiện**: Trong template, bắt sự kiện `(complete)` và nhận dữ liệu thông qua biến đặc biệt `$event`.
    
- **Bước 2: Cập nhật dữ liệu**: Viết logic để loại bỏ task có ID tương ứng khỏi mảng.
    

**File:** `tasks.component.html`

HTML

```
<ul>
  @for (task of selectedUserTasks; track task.id) {
    <li>
      <app-task [task]="task" (complete)="onCompleteTask($event)" />
    </li>
  }
</ul>
```

**File:** `tasks.component.ts`

- Sử dụng phương thức `.filter()` của mảng để tạo ra một mảng mới không chứa phần tử vừa bị xóa.
    

TypeScript

```
export class TasksComponent {
  // ... (khai báo mảng tasks)

  onCompleteTask(id: string) {
    // Cập nhật lại mảng tasks bằng cách lọc bỏ task có id trùng khớp
    // Logic: Giữ lại tất cả task có id KHÁC với id nhận được
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
```

### 📝 Ghi chú Kỹ thuật

- **Immutability (Tính bất biến)**: Thay vì dùng `splice` để sửa đổi mảng gốc, việc dùng `filter` tạo ra một bản sao mảng mới thường được khuyến khích trong Angular để đảm bảo cơ chế phát hiện thay đổi (change detection) hoạt động hiệu quả.
    
- **Luồng dữ liệu (Data Flow)**:
    
    1. User click nút -> `TaskComponent` gọi `onCompleteTask()`.
        
    2. `EventEmitter` bắn tín hiệu kèm `id` lên cha.
        
    3. `TasksComponent` nhận `id` qua `$event`.
        
    4. `TasksComponent` chạy logic `filter` để xóa task khỏi danh sách.
        
    5. UI tự động cập nhật lại danh sách nhờ cơ chế binding của Angular.