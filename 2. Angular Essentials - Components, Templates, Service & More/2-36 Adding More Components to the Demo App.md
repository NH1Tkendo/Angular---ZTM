## Xây dựng và Cấu trúc Component Tasks

### 1. Cập nhật Template cho Tasks Component

Mục tiêu là chuyển đổi từ việc chỉ hiển thị tên người dùng đơn giản sang một giao diện quản lý tác vụ hoàn chỉnh hơn.

**Các thay đổi trong `tasks.component.html`:**

- **Container**: Sử dụng thẻ `<section>` với `id="tasks"` để bao bọc nội dung.
    
- **Header**:
    
    - Thêm thẻ `<header>`.
        
    - Di chuyển thẻ `<h2>` vào trong header và cập nhật nội dung động: `{{ name }}'s Tasks` (Hiển thị tên người dùng sở hữu danh sách).
        
- **Menu điều khiển**:
    
    - Thêm thẻ `<menu>`.
        
    - Thêm nút `<button>` với nội dung "Add Task" (Chưa có logic xử lý, chỉ hiển thị giao diện).
        
- **Danh sách tác vụ**:
    
    - Sử dụng thẻ `<ul>` để chứa danh sách các tác vụ.
        
    - Dự kiến sẽ sử dụng một component con tùy chỉnh (`custom component`) cho từng mục trong danh sách.
        

**Mã nguồn minh họa:**

HTML

```
<section id="tasks">
  <header>
    <h2>{{ name }}'s Tasks</h2>
    <menu>
      <button>Add Task</button>
    </menu>
  </header>

  <ul>
    </ul>
</section>
```

### 2. Tạo Component Task riêng biệt (Reusable Task Component)

Để hiển thị danh sách nhiều tác vụ, cần tạo một component con đại diện cho một tác vụ đơn lẻ. Điều này giúp code có thể tái sử dụng (reusable).

**Sử dụng Angular CLI:** Lệnh tạo component mới nằm bên trong thư mục `tasks`:

Bash

```
ng g c tasks/task --skip-tests
```

_Giải thích:_

- `tasks/task`: Tạo component tên là `task` nằm trong thư mục `tasks`.
    
- `--skip-tests`: Bỏ qua việc tạo file kiểm thử tự động.
    

### 3. Tích hợp Component con vào Component cha

Sau khi tạo `TaskComponent`, cần khai báo và sử dụng nó bên trong `TasksComponent`.

**Các bước thực hiện:**

1. **Import**: Mở file `tasks.component.ts` và thêm `TaskComponent` vào mảng `imports`.
    
2. **Sử dụng trong Template**: Mở file `tasks.component.html` và thêm thẻ selector `<app-task>` vào trong thẻ `<ul>`.
    

**Lưu ý:** Hiện tại chưa có dữ liệu danh sách động, nên tạm thời hardcode (viết cứng) thẻ `<app-task>` nhiều lần để kiểm tra giao diện. Chúng ta chưa thể dùng `@for` vì chưa có mảng dữ liệu thực tế.

HTML

```
<ul>
  <li><app-task /></li>
  <li><app-task /></li>
  <li><app-task /></li>
</ul>
```

### 4. Cấu trúc Template cho Task Component

Cập nhật file `task.component.html` để định hình cấu trúc hiển thị cho một tác vụ cụ thể.

**Cấu trúc HTML:**

- Sử dụng thẻ `<article>` bao quanh.
    
- `<h2>`: Tiêu đề tác vụ (hiện tại là dữ liệu giả).
    
- `<time>`: Thời gian thực hiện.
    
- `<p>`: Tóm tắt nội dung tác vụ.
    
- `<p class="actions">`: Chứa nút `<button>` để đánh dấu hoàn thành ("Complete").
    

**Mã nguồn minh họa:**

HTML

```
<article>
  <h2>Task Title</h2>
  <time>2024-12-31</time>
  <p>Task summary goes here...</p>
  <p class="actions">
    <button>Complete</button>
  </p>
</article>
```

### 5. Áp dụng CSS (Styling)

Để giao diện hiển thị đẹp mắt và đúng bố cục:

- **Tasks Component**: Sử dụng file CSS đã chuẩn bị sẵn (`tasks.component.css`) để style cho section, header và menu.
    
- **Task Component**: Sử dụng file CSS đã chuẩn bị sẵn (`task.component.css`) để style cho thẻ article, tiêu đề, thời gian và nút bấm.
    

> **Kết quả:** Khi chọn một người dùng, hệ thống sẽ hiển thị danh sách các tác vụ với giao diện hoàn chỉnh (tiêu đề, thời gian, nút thao tác) thay vì chỉ hiện văn bản thô.