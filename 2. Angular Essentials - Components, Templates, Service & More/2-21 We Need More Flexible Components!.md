## Tái sử dụng Component (Component Reusability)

### Khái niệm và Mục tiêu

Một trong những lợi ích lớn nhất của việc chia nhỏ giao diện thành các **Thành phần** (Components) là khả năng tái sử dụng.

- **Mục tiêu**: Thay vì chỉ hiển thị một người dùng ngẫu nhiên duy nhất, chúng ta muốn hiển thị một danh sách các người dùng khác nhau.
    
- **Cơ chế**: Một Component (`UserComponent`) có thể được sử dụng nhiều lần ở nhiều nơi, nhưng mỗi lần sử dụng sẽ hiển thị **dữ liệu khác nhau**.
    
- **Tương đồng**: Hãy tưởng tượng Component giống như thẻ HTML tiêu chuẩn (ví dụ: thẻ `<img />`). Bạn dùng cùng một thẻ `img` nhưng cấu hình các thuộc tính (`src`, `alt`) khác nhau để hiển thị các ảnh khác nhau. Chúng ta muốn `UserComponent` cũng hoạt động tương tự: có thể nhận cấu hình từ bên ngoài.
    

### Tinh gọn Component (Refactoring)

Để đạt được khả năng tái sử dụng và nhận dữ liệu từ bên ngoài (Parent Component), chúng ta cần loại bỏ logic tự sinh dữ liệu bên trong Component con.

**Các bước dọn dẹp `UserComponent`:**

1. **Loại bỏ logic ngẫu nhiên**: Xóa bỏ việc tính toán `randomIndex` để chọn user. Component không nên tự quyết định nó hiển thị ai.
    
2. **Loại bỏ State nội bộ**: Xóa các biến hoặc Signals (`selectedUser`, `computed`) đang lưu trữ dữ liệu cục bộ.
    
3. **Mục đích**: Chuyển Component về trạng thái "chờ nhận dữ liệu" thay vì "tự tạo dữ liệu".
    

### Mã nguồn minh họa (Trước và Sau khi dọn dẹp)

**Trước khi dọn dẹp (Tự quản lý dữ liệu):**

TypeScript

```
// UserComponent cũ (Tự tính toán)
export class UserComponent {
  // Logic này sẽ bị loại bỏ vì nó tạo ra dữ liệu ngẫu nhiên cố định
  selectedUser = signal(DUMMY_USERS[randomIndex]);
  imagePath = computed(() => 'assets/users/' + this.selectedUser().avatar);

  onSelectUser() {
     // Logic đổi user ngẫu nhiên cũng bị loại bỏ
  }
}
```

**Mục tiêu hướng tới (Component có thể cấu hình):** Component sẽ trở nên đơn giản hơn, chỉ tập trung vào việc hiển thị dữ liệu được truyền vào (sẽ được học ở bài kế tiếp về `@Input`).

---

**Ghi chú**:

> Việc sao chép thủ công thẻ `<app-user>` nhiều lần trong `AppComponent` (như đoạn code dưới) hiện tại sẽ chỉ hiển thị cùng một nội dung giống hệt nhau. Đây là lý do chúng ta cần cơ chế truyền dữ liệu động vào từng thẻ.

HTML

```
<ul>
  <li><app-user /></li>
  <li><app-user /></li> <li><app-user /></li>
</ul>
```