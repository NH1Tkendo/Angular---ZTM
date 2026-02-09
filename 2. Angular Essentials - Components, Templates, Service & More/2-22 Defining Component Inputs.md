## Truyền dữ liệu vào Component với @Input

### Khái niệm

Để tái sử dụng một Component với các dữ liệu khác nhau (ví dụ: hiển thị danh sách người dùng với tên và ảnh khác nhau), chúng ta cần cơ chế truyền dữ liệu từ Component cha (`Parent`) vào Component con (`Child`).

Trong Angular, điều này được thực hiện thông qua **Input Properties** (Thuộc tính đầu vào), sử dụng bộ trang trí (decorator) `@Input`.

### Các bước thực hiện

#### 1. Cấu hình Component Con (`UserComponent`)

Cần đánh dấu các thuộc tính trong class là "có thể nhận giá trị từ bên ngoài".

1. **Import**: Thêm `Input` từ gói `@angular/core`.
    
2. **Decorator**: Sử dụng `@Input()` trước tên thuộc tính.
    
3. **Xử lý TypeScript**:
    
    - **Khai báo kiểu (`Type Annotation`)**: Thêm `: string` (hoặc kiểu dữ liệu phù hợp) để tránh lỗi `implicit any`.
        
    - **Khẳng định gán chắc chắn (`Definite Assignment Assertion`)**: Thêm dấu chấm than `!` sau tên thuộc tính. Điều này báo cho TypeScript biết rằng: _"Mặc dù biến này chưa có giá trị khởi tạo ngay lập tức, nhưng tôi đảm bảo nó sẽ nhận được giá trị (từ Angular) khi chạy ứng dụng"_.
        

TypeScript

```
import { Component, Input } from '@angular/core';

@Component({ ... })
export class UserComponent {
  // Sử dụng @Input để nhận dữ liệu từ bên ngoài
  // Dấu ! giúp vượt qua lỗi "Property has no initializer" của TypeScript
  @Input() avatar!: string; 
  @Input() name!: string;

  // Getter tính toán đường dẫn ảnh dựa trên input nhận được
  get imagePath() {
    return 'assets/users/' + this.avatar;
  }
}
```

#### 2. Chuẩn bị dữ liệu ở Component Cha (`AppComponent`)

Component cha cần có dữ liệu để truyền xuống.

TypeScript

```
import { Component } from '@angular/core';
import { DUMMY_USERS } from './dummy-users';

@Component({ ... })
export class AppComponent {
  // Expose dữ liệu ra template của AppComponent
  users = DUMMY_USERS;
}
```

#### 3. Truyền dữ liệu trong Template (`app.component.html`)

Sử dụng **Ràng buộc thuộc tính** (Property Binding) `[ ]` để gán giá trị từ cha vào thuộc tính `@Input` của con.

HTML

```
<app-user 
  [avatar]="users[0].avatar" 
  [name]="users[0].name">
</app-user>

<app-user 
  [avatar]="users[1].avatar" 
  [name]="users[1].name">
</app-user>
```

#### 4. Cập nhật Template Component Con (`user.component.html`)

Vì đã quay lại sử dụng thuộc tính thông thường (không dùng Signals trong bài này), ta bỏ các dấu ngoặc đơn `()` khi gọi biến.

HTML

```
<div>
  <img [src]="imagePath" [alt]="name" />
  <span>{{ name }}</span>
</div>
```

---

**Ghi chú quan trọng**:

- **Khả năng tái sử dụng**: Với `@Input`, thẻ `<app-user>` giờ đây hoạt động giống như thẻ HTML chuẩn (như `<img>`), nơi bạn có thể cấu hình nội dung hiển thị thông qua các thuộc tính.
    
- **Kiểu dữ liệu**: Ngoài `string`, `@Input` có thể nhận bất kỳ kiểu dữ liệu nào (number, boolean, object, array...).