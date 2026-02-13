## Truyền Dữ Liệu Đối Tượng Vào Component (Passing Object Data to Component)

Bài học này hướng dẫn cách truyền toàn bộ đối tượng dữ liệu (object data) từ component cha vào component con thông qua `@Input`, thay vì truyền từng thuộc tính riêng lẻ, và cách định nghĩa kiểu dữ liệu (type definition) để đảm bảo tính an toàn (type safety).

### 1. Định nghĩa Cấu trúc Dữ liệu (Interface Definition)

Thay vì truyền rời rạc từng thông tin (tiêu đề, thời gian, tóm tắt...), chúng ta nên truyền cả đối tượng nhiệm vụ (task object). Đầu tiên, cần định nghĩa một **giao diện (interface)** hoặc **kiểu (type)** để mô tả hình dạng của đối tượng này.

- **Mục đích**: Đảm bảo tính nhất quán của dữ liệu và hỗ trợ gợi ý code (IntelliSense).
    
- **Các thuộc tính (Properties)**: Tất cả đều có kiểu dữ liệu là chuỗi (`string`).
    

TypeScript

```
// Định nghĩa interface (thường đặt trong file component hoặc file model riêng)
interface Task {
  id: string;
  userId: string;
  title: string;
  summary: string;
  dueDate: string;
}
```

### 2. Cấu hình Input trong Component Con (Child Component)

Trong file TypeScript của component con (ví dụ: `task.component.ts`), sử dụng bộ trang trí `@Input` để nhận dữ liệu.

- **Cách tiếp cận**: Nhận toàn bộ đối tượng `Task` thay vì nhiều biến input nhỏ lẻ.
    
- **Cú pháp**:
    
    - Sử dụng interface `Task` vừa tạo làm kiểu dữ liệu.
        
    - Dùng **dấu chấm than (exclamation mark `!`)** để báo cho TypeScript biết giá trị này sẽ không bao giờ là `null` (vì ta sẽ đánh dấu nó là bắt buộc).
        
    - Đánh dấu `required: true` trong cấu hình `@Input`.
        

TypeScript

```
import { Component, Input } from '@angular/core';

@Component({ ... })
export class TaskComponent {
  // Nhận vào một đối tượng task tuân theo interface Task
  @Input({ required: true }) task!: Task; 
}
```

### 3. Ràng buộc Dữ liệu ở Component Cha (Parent Component Binding)

Tại template HTML của component cha (nơi sử dụng thẻ `<app-task>`), thực hiện ràng buộc thuộc tính (property binding) để truyền đối tượng `task` hiện tại từ vòng lặp vào thuộc tính `task` của component con.

HTML

```
<app-task [task]="task" />
```

### 4. Hiển thị Dữ liệu trong Template (Template Output)

Cuối cùng, cập nhật template của component con để hiển thị dữ liệu thực tế thay vì dữ liệu giả (dummy text). Sử dụng **nội suy chuỗi (string interpolation)** để truy cập các thuộc tính bên trong đối tượng `task`.

HTML

```
<article>
  <h2>{{ task.title }}</h2>
  
  <time>{{ task.dueDate }}</time>
  
  <p>{{ task.summary }}</p>
</article>
```

### 📝 Ghi chú quan trọng

- **Type Safety**: Việc định nghĩa `interface` giúp TypeScript phát hiện lỗi ngay khi code nếu cấu trúc dữ liệu truyền vào không khớp.
    
- **Clean Code**: Truyền một đối tượng (object) gọn gàng hơn nhiều so với việc phải khai báo 3-4 dòng `@Input` cho từng thuộc tính riêng lẻ (title, date, summary...).