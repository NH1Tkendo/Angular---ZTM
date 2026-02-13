## Quản lý và Lọc Dữ liệu Tác vụ (Tasks)

### 1. Khởi tạo Dữ liệu Mẫu (Dummy Data)

Để thay thế nội dung tĩnh (hardcoded), ta cần tạo một mảng dữ liệu chứa các đối tượng tác vụ bên trong `TasksComponent`.

**Cấu trúc đối tượng Task:** Mỗi tác vụ cần có các thuộc tính cơ bản và đặc biệt là `userId` để liên kết với người dùng sở hữu nó (tương tự khóa ngoại trong cơ sở dữ liệu).

TypeScript

```
// tasks.component.ts
tasks = [
  {
    id: 't1',
    userId: 'u1', // Định danh người dùng sở hữu task này
    title: 'Master Angular',
    summary: 'Learn all the basic and advanced features of Angular & how to apply them.',
    dueDate: '2025-12-31',
  },
  {
    id: 't2',
    userId: 'u3',
    title: 'Build first prototype',
    summary: 'Build a first prototype of the online shop website',
    dueDate: '2024-05-31',
  },
  {
    id: 't3',
    userId: 'u3',
    title: 'Prepare issue template',
    summary: 'Prepare and describe an issue template which will help with project management',
    dueDate: '2024-06-15',
  },
];
```

### 2. Tiếp nhận ID Người dùng (Input Binding)

Để biết cần hiển thị tác vụ cho người dùng nào, component cần nhận `userId` từ component cha.

**Thực hiện:**

- Thêm thuộc tính `@Input` mới tên là `userId`.
    
- Đánh dấu là `required: true` để đảm bảo component luôn nhận được dữ liệu này khi khởi tạo.
    

TypeScript

```
// tasks.component.ts
@Input({ required: true }) userId!: string;
// Hoặc có thể đặt tên là id, nhưng userId sẽ rõ nghĩa hơn
```

### 3. Logic Lọc Dữ liệu (Filtering Logic)

Thay vì hiển thị toàn bộ mảng `tasks`, ta cần lọc ra các tác vụ thuộc về người dùng đang được chọn.

**Sử dụng Getter (Computed Property):** Tạo một phương thức `get` để tính toán danh sách tác vụ động dựa trên `userId` hiện tại.

TypeScript

```
// tasks.component.ts
get selectedUserTasks() {
  // Sử dụng hàm filter của JavaScript
  return this.tasks.filter((task) => task.userId === this.userId);
}
```

_Giải thích:_ Hàm `filter` sẽ duyệt qua từng phần tử trong mảng `tasks`. Nếu điều kiện `task.userId === this.userId` trả về `true`, phần tử đó sẽ được giữ lại trong mảng kết quả.

### 4. Cập nhật Template (Rendering)

Sử dụng cú pháp `@for` để hiển thị danh sách đã được lọc (`selectedUserTasks`) thay vì danh sách gốc.

HTML

```
<ul>
  @for (task of selectedUserTasks; track task.id) {
    <li>
      <app-task />
    </li>
  }
</ul>
```

### 5. Kết nối với Component Cha

Cập nhật `app.component.html` để truyền `userId` vào `TasksComponent` thông qua cơ chế Property Binding.

HTML

```
<app-tasks 
  [userId]="selectedUser.id" 
  [name]="selectedUser.name" 
/>
```

### 6. Kết quả

- Mỗi khi chọn một người dùng khác nhau (thay đổi `selectedUser`), `userId` truyền vào `TasksComponent` sẽ thay đổi.
    
- Getter `selectedUserTasks` sẽ tự động tính toán lại.
    
- Danh sách hiển thị trên giao diện sẽ chỉ bao gồm các tác vụ tương ứng với người dùng đó.