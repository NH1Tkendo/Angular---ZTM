## Cập nhật Giao diện (UI) thông qua Quản lý Trạng thái (State)

### Khái niệm về State

Trong phát triển ứng dụng web, **State** (trạng thái) là dữ liệu quyết định những gì sẽ hiển thị trên giao diện người dùng (UI). Khi dữ liệu này thay đổi, giao diện cũng cần thay đổi theo.

Khác với một số thư viện hay framework khác đòi hỏi cấu hình phức tạp để quản lý state, Angular cho phép thực hiện điều này rất trực quan:

- Bạn chỉ cần thay đổi giá trị của các thuộc tính (properties) trong class Component.
    
- Angular sẽ tự động phát hiện sự thay đổi và cập nhật lại Template tương ứng.
    

### Quy trình thực hiện

Để cập nhật UI khi người dùng tương tác (ví dụ: click nút để đổi người dùng):

1. **Lắng nghe sự kiện**: Gắn sự kiện (như `click`) vào một phương thức trong Component (đã học ở bài trước).
    
2. **Cập nhật dữ liệu**: Trong phương thức đó, viết logic để thay đổi giá trị của thuộc tính đang được binding với Template.
    
3. **Tự động Render**: Angular nhận thấy thuộc tính đã thay đổi và tự động làm mới phần giao diện liên quan.
    

### Mã nguồn minh họa

Dưới đây là ví dụ về cách thay đổi người dùng ngẫu nhiên khi click nút:

TypeScript

```
export class UserComponent {
  // Thuộc tính lưu trữ dữ liệu hiển thị hiện tại
  selectedUser = DUMMY_USERS[randomIndex];

  // Phương thức xử lý sự kiện click
  onSelectUser() {
    // 1. Tính toán lại chỉ số ngẫu nhiên mới (Local scope)
    // Cần thực hiện bước này bên trong hàm để đảm bảo giá trị thay đổi mỗi lần click
    const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

    // 2. Cập nhật State (Gán người dùng mới cho thuộc tính selectedUser)
    this.selectedUser = DUMMY_USERS[randomIndex];
    
    // -> Sau dòng này, UI sẽ tự động cập nhật hình ảnh và tên người dùng mới
  }
}
```

### Lưu ý quan trọng

- **Phạm vi biến (Scope)**: Để dữ liệu thay đổi ngẫu nhiên mỗi lần click, logic tính toán (ví dụ: `Math.random()`) phải được đặt **bên trong** phương thức xử lý sự kiện (`onSelectUser`). Nếu đặt bên ngoài (toàn cục), nó chỉ chạy một lần duy nhất khi khởi tạo component và giá trị sẽ không đổi.
    
- **Tính phản ứng (Reactivity)**: Bạn không cần gọi bất kỳ hàm "refresh" hay "render" nào thủ công. Việc gán lại giá trị `this.selectedUser = ...` là đủ để kích hoạt cơ chế cập nhật của Angular.