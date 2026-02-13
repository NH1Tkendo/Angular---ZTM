## Xử lý Gửi Form và Truyền Dữ liệu (Form Submission & Data Passing)

Sau khi đã thu thập dữ liệu từ người dùng thông qua "ràng buộc hai chiều" (two-way binding), bước tiếp theo là đóng gói dữ liệu này và gửi từ thành phần con (`NewTaskComponent`) lên thành phần cha (`TasksComponent`) để cập nhật danh sách và đóng hộp thoại.

---

### 1. Định nghĩa Mô hình Dữ liệu (Data Model)

Để đảm bảo tính nhất quán về kiểu dữ liệu giữa các thành phần, chúng ta nên định nghĩa một `interface` cho dữ liệu của nhiệm vụ mới.

**File `task.model.ts`:**

TypeScript

```
export interface NewTaskData {
  title: string;
  summary: string;
  date: string;
}
```

---

### 2. Tại Thành phần Con (`NewTaskComponent`)

Thành phần này chịu trách nhiệm phát ra sự kiện kèm theo dữ liệu khi người dùng nhấn "Submit".

#### Cấu hình Output

Sử dụng `EventEmitter` với kiểu dữ liệu `NewTaskData` đã định nghĩa.

**File `new-task.component.ts`:**

TypeScript

```
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { type NewTaskData } from './task.model'; // Import model

export class NewTaskComponent {
  // Các thuộc tính lưu dữ liệu nhập (dùng với ngModel)
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  // 1. Tạo Output event để gửi dữ liệu ra ngoài
  @Output() add = new EventEmitter<NewTaskData>();

  // 2. Phương thức xử lý khi submit form
  onSubmit() {
    // Phát sự kiện kèm theo object dữ liệu
    this.add.emit({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      date: this.enteredDate
    });
  }
}
```

---

### 3. Tại Thành phần Cha (`TasksComponent`)

Thành phần cha sẽ lắng nghe sự kiện, nhận dữ liệu, tạo một đối tượng Task hoàn chỉnh và cập nhật mảng dữ liệu.

#### Xử lý Logic Thêm mới

**File `tasks.component.ts`:**

TypeScript

```
import { type NewTaskData } from './task.model';

export class TasksComponent {
  // ... các thuộc tính khác
  @Input() userId!: string; // ID của user hiện tại
  isAddingTask = false;

  onAddTask(taskData: NewTaskData) {
    // 1. Tạo đối tượng Task mới (cần thêm id và userId)
    this.tasks.unshift({
      id: new Date().getTime().toString(), // Tạo ID đơn giản dựa trên thời gian
      userId: this.userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date
    });

    // 2. Đóng hộp thoại
    this.isAddingTask = false;
  }
}
```

> **Ghi chú**:
> 
> - Phương thức `unshift()`: Thêm phần tử vào **đầu** mảng (thay vì `push()` thêm vào cuối).
>     
> - `id`: Sử dụng `new Date().getTime().toString()` để tạo ID tạm thời (không hoàn toàn duy nhất nhưng đủ cho demo).
>     

---

### 4. Cập nhật Template (Kết nối Cha và Con)

Cuối cùng, cần liên kết sự kiện `add` từ con vào phương thức `onAddTask` của cha trong template.

**File `tasks.component.html`:**

HTML

```
@if (isAddingTask) {
  <app-new-task 
    (cancel)="onCancelAddTask()" 
    (add)="onAddTask($event)" 
  />
}
```

### Tổng kết luồng dữ liệu:

1. Người dùng nhập liệu $\rightarrow$ Cập nhật vào biến trong `NewTaskComponent`.
    
2. Nhấn Submit $\rightarrow$ Gọi `onSubmit()`.
    
3. `onSubmit()` $\rightarrow$ Phát sự kiện `add` kèm object `NewTaskData`.
    
4. `TasksComponent` bắt sự kiện `add` $\rightarrow$ Gọi `onAddTask($event)`.
    
5. `onAddTask()` $\rightarrow$ Tạo task mới, thêm vào mảng `tasks`, và đóng hộp thoại.