## Định nghĩa Kiểu Đối tượng (Object Types) trong TypeScript

Ngoài các kiểu dữ liệu cơ bản như `string` hay `number`, TypeScript cho phép định nghĩa cấu trúc cho các đối tượng phức tạp hơn. Việc này giúp nhóm các dữ liệu liên quan lại với nhau thay vì xử lý từng biến rời rạc.

### 1. Khái niệm và Cú pháp

Khi một thành phần cần nhận vào một đối tượng chứa nhiều thông tin (ví dụ: thông tin người dùng gồm ID, tên, avatar), ta có thể định nghĩa **Kiểu đối tượng** _(Object Type)_ ngay tại nơi khai báo biến.

- **Cú pháp**: Sử dụng cặp ngoặc nhọn `{ }` tương tự như khi tạo một đối tượng thuần _(object literal)_, nhưng mục đích ở đây là mô tả kiểu dữ liệu.
    
- **Cấu trúc**: Liệt kê các thuộc tính kèm theo kiểu dữ liệu của chúng, ngăn cách bằng dấu chấm phẩy `;`.
    

TypeScript

```
// Ví dụ cú pháp tổng quát
property!: {
  key1: type;
  key2: type;
};
```

> [!NOTE] Lưu ý quan trọng
> 
> Việc sử dụng `{ }` ở đây **không phải** là tạo ra một đối tượng mới, mà là **định nghĩa khuôn mẫu** (type definition) cho giá trị sẽ được lưu trữ.

---

### 2. Ví dụ thực tế: Tái cấu trúc Component

Trong ví dụ về `UserComponent`, thay vì nhận 3 đầu vào riêng biệt (`id`, `avatar`, `name`), ta gộp chúng thành một đối tượng `user` duy nhất.

#### Bước 1: Cập nhật file TypeScript của Component

Thay thế các `@Input` rời rạc bằng một `@Input` nhận kiểu đối tượng.

TypeScript

```
// Trước khi thay đổi: 3 inputs riêng biệt
// @Input() id!: string;
// @Input() avatar!: string;
// @Input() name!: string;

// Sau khi thay đổi: 1 input object
@Input({ required: true }) user!: {
  id: string;
  avatar: string;
  name: string;
};
```

_Ghi chú_: Vẫn cần sử dụng dấu chấm than `!` để báo cho TypeScript biết giá trị này chắc chắn sẽ được khởi tạo (do `required: true`).

#### Bước 2: Cập nhật logic truy cập dữ liệu

Khi dữ liệu đã được gom nhóm, cần thay đổi cách truy cập trong code logic:

- `this.avatar` $\rightarrow$ `this.user.avatar`
    
- `this.id` $\rightarrow$ `this.user.id`
    

#### Bước 3: Cập nhật Template (HTML)

Cập nhật đường dẫn truy cập dữ liệu trong file HTML của component:

HTML

```
<img [src]="user.avatar" [alt]="user.name" />
<span>{{ user.name }}</span>
```

#### Bước 4: Cập nhật Component cha (Parent Component)

Tại `AppComponent`, thay vì truyền từng thuộc tính lẻ tẻ, ta truyền nguyên đối tượng `user` từ mảng dữ liệu.

HTML

```
<app-user [user]="users[0]" />
<app-user [user]="users[1]" />
<app-user [user]="users[2]" />
```

### 3. Lợi ích

- **Code gọn gàng hơn**: Giảm số lượng dòng code khai báo Input.
    
- **Dễ quản lý**: Dữ liệu liên quan được đi kèm với nhau, mô phỏng đúng cấu trúc dữ liệu thực tế.
    
- **Tăng tính đọc hiểu**: Làm rõ rằng component này cần một "User" hoàn chỉnh để hoạt động.