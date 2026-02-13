## Tạo và Hiển thị Component Theo Điều Kiện (Creating and Conditionally Rendering Components)

Bài học này hướng dẫn quy trình tạo một component mới ("New Task") và hiển thị nó một cách có điều kiện khi người dùng nhấn nút "Add Task".

### 1. Tạo Component bằng CLI (Component Generation)

Sử dụng Angular CLI để tạo component mới bên trong thư mục `tasks`.

- **Lệnh thực hiện**:
    
    Bash
    
    ```
    ng g c tasks/new-task --skip-tests
    ```
    
- **Lưu ý**: Tên component nên sử dụng dấu gạch ngang (`-`) để phân cách các từ (kebab-case).
    

### 2. Thiết lập Trạng thái Hiển thị (Managing Visibility State)

Tại component cha (`TasksComponent`), cần khai báo biến và phương thức để theo dõi xem người dùng có đang muốn thêm task mới hay không.

**File:** `tasks.component.ts`

1. **Khai báo thuộc tính (Property)**: Tạo biến `isAddingTask` để lưu trạng thái.
    
    - TypeScript tự động suy luận kiểu dữ liệu (`Type Inference`) là `boolean` dựa trên giá trị khởi tạo `false`.
        
2. **Khai báo phương thức (Method)**: Tạo hàm `onStartAddTask` để chuyển trạng thái sang `true`.
    

TypeScript

```
export class TasksComponent {
  // Biến cờ kiểm soát việc hiển thị form thêm mới
  isAddingTask = false; 

  // Hàm được gọi khi nhấn nút "Add Task"
  onStartAddTask() {
    this.isAddingTask = true;
  }
}
```

### 3. Cập nhật Template và Ràng buộc Sự kiện (Template & Event Binding)

Trong file HTML của component cha, thực hiện 2 việc:

1. Gắn sự kiện `(click)` vào nút "Add Task".
    
2. Sử dụng khối điều kiện `@if` để hiển thị component con `<app-new-task>` chỉ khi `isAddingTask` là `true`.
    

**File:** `tasks.component.html`

HTML

```
<button (click)="onStartAddTask()">Add Task</button>

@if (isAddingTask) {
  <app-new-task />
}
```

### 4. Đăng ký Component (Component Registration)

Để sử dụng thẻ `<app-new-task>` trong template của `TasksComponent`, bạn bắt buộc phải import component này vào mảng `imports`.

**File:** `tasks.component.ts`

TypeScript

```
import { NewTaskComponent } from './new-task/new-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NewTaskComponent, ...], // Thêm NewTaskComponent vào đây
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent { ... }
```

### 📝 Tổng kết quy trình

1. **Generate**: Tạo component `new-task`.
    
2. **Logic**: Thêm biến `isAddingTask` (false) và hàm `onStartAddTask` (set true) ở cha.
    
3. **Template**: Bind nút bấm với hàm và dùng `@if` để render `<app-new-task>`.
    
4. **Import**: Khai báo `NewTaskComponent` trong `imports` của cha.