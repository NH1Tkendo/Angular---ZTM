## Tín hiệu (Signals) trong Angular

### Giới thiệu

![[Zone-Singal.png]]
Bên cạnh cơ chế quản lý trạng thái (State) truyền thống dựa trên `Zone.js` (tự động phát hiện thay đổi trên toàn bộ ứng dụng), Angular giới thiệu một cơ chế mới hiện đại và hiệu quả hơn gọi là **Signals** (bắt đầu từ Angular 16).

### Khái niệm cốt lõi
![[Signal.png]]
- **Signals**: Là một lớp vỏ bọc (wrapper) hoặc "thùng chứa" giá trị.
    
- **Cơ chế**: Khi giá trị bên trong thay đổi, Signal sẽ chủ động "thông báo" cho Angular biết.
    
- **Phản ứng**: Angular nhận được thông báo và chỉ cập nhật chính xác những vị trí đang sử dụng giá trị đó trong Template, thay vì phải quét lại toàn bộ cây component như cơ chế cũ.
    

### So sánh cơ bản

|**Đặc điểm**|**Cơ chế cũ (Zone.js)**|**Signals (Mới)**|
|---|---|---|
|**Cách hoạt động**|Tự động quét toàn bộ cây Component khi có sự kiện (click, timer...)|Chỉ cập nhật những nơi đăng ký theo dõi giá trị thay đổi|
|**Hiệu năng**|Có thể chậm hơn với ứng dụng lớn|Tối ưu hóa cao (Fine-grained reactivity)|
|**Cú pháp**|`biến = giá trị`|`biến = signal(giá trị)`|

### Cách sử dụng Signals

#### 1. Khởi tạo Signal

Đầu tiên, cần import `signal` từ `@angular/core` và khởi tạo nó như một thuộc tính trong class.

TypeScript

```
import { Component, signal } from '@angular/core';
import { DUMMY_USERS } from './dummy-users';

export class UserComponent {
  // Khởi tạo signal với giá trị ban đầu là người dùng đầu tiên
  // selectedUser không còn là biến thường, mà là một Signal object
  selectedUser = signal(DUMMY_USERS[randomIndex]);
}
```

#### 2. Cập nhật giá trị (Set)

Để thay đổi giá trị, bạn không gán trực tiếp bằng dấu bằng `=`, mà sử dụng phương thức `.set()`.

TypeScript

```
onSelectUser() {
  const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
  
  // Cập nhật giá trị mới cho Signal
  this.selectedUser.set(DUMMY_USERS[randomIndex]); 
}
```

#### 3. Đọc giá trị trong Template

Vì `selectedUser` là một Signal (một hàm), bạn phải **gọi nó như một hàm** bằng cách thêm dấu ngoặc đơn `()` để lấy giá trị thực tế.

HTML

```
<p>Tên: {{ selectedUser().name }}</p>
```

> **Lưu ý**: Việc gọi `()` giúp Angular thiết lập cơ chế theo dõi (subscription). Khi giá trị thay đổi, Angular biết chính xác cần cập nhật đoạn HTML này.

### Giá trị được tính toán (Computed Values)

Nếu bạn có một giá trị phụ thuộc vào một Signal khác (ví dụ: đường dẫn ảnh phụ thuộc vào `selectedUser`), hãy sử dụng hàm `computed`.

- **Mục đích**: Tạo ra một Signal mới, tự động tính toán lại **chỉ khi** Signal gốc thay đổi.
    
- **Hiệu quả**: Tránh việc tính toán lại không cần thiết mỗi khi Component re-render.
    

TypeScript

```
import { computed } from '@angular/core';

// ... trong class Component
// imagePath là một Signal được tính toán từ selectedUser
imagePath = computed(() => {
  // Phải gọi selectedUser() để lấy giá trị hiện tại
  return 'assets/users/' + this.selectedUser().avatar;
});
```

Trong Template, bạn cũng gọi `imagePath` như một hàm:

HTML

```
<img [src]="imagePath()" [alt]="selectedUser().name" />
```

---

**Tổng kết**:

> Signals giúp Angular quản lý State tinh gọn và hiệu suất cao hơn ("fine-grained reactivity"). Tuy nhiên, vì đây là tính năng mới, bạn vẫn cần nắm vững cơ chế cũ (Zone.js) để làm việc với các dự án Angular hiện tại hoặc các phiên bản cũ hơn.