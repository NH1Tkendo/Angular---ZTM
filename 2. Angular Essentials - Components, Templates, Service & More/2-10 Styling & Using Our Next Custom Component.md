## Thiết lập Nội dung và Tích hợp Component

### 1. Cấu trúc HTML cho User Component

Trong tệp `user.component.html`, chúng ta thiết lập cấu trúc cơ bản để hiển thị thông tin người dùng bao gồm hình ảnh và tên:

HTML

```
<div>
  <button>
    <img src="..." alt="User profile" />
    <span>Tên người dùng</span>
  </button>
</div>
```

- **Thẻ `<button>`**: Giúp toàn bộ vùng thông tin người dùng có thể tương tác (click).
    
- **Thẻ `<img>`**: Hiển thị ảnh đại diện.
    
- **Thẻ `<span>`**: Hiển thị tên người dùng trong tương lai.
    

---

### 2. Tích hợp User Component vào App Component

Để sử dụng `UserComponent` bên trong `AppComponent`, chúng ta cần thực hiện các bước sau trong tệp `app.component.ts`:

1. **Import**: Khai báo đường dẫn đến `UserComponent`.
    
2. **Khai báo (Metadata)**: Thêm `UserComponent` vào mảng `imports` của `@Component`.
    

> [!TIP] Mẹo từ IDE Trong Visual Studio Code, bạn có thể nhấn vào biểu tượng bóng đèn (Quick Fix) tại thẻ `<app-user>` để IDE tự động thực hiện việc `import` và thêm vào mảng `imports`.

---

### 3. Tối ưu hóa cú pháp thẻ Component

Nếu một Component không chứa nội dung nào giữa thẻ đóng và thẻ mở, Angular hỗ trợ cú pháp **thẻ tự đóng (Self-closing tags)** để mã nguồn gọn gàng hơn:

- **Cách viết cũ**: `<app-user></app-user>`
    
- **Cách viết rút gọn**: `<app-user />`
    

---

### 4. Cấu trúc lại Layout trong App Component

Để giao diện cân đối và chuyên nghiệp hơn, chúng ta bọc `UserComponent` trong các thẻ HTML tiêu chuẩn và áp dụng CSS.

**Mã nguồn `app.component.html` sau khi chỉnh sửa:**

HTML

```
<app-header />

<main>
  <ul id="users">
    <li>
      <app-user />
    </li>
  </ul>
</main>
```

- **Thẻ `<main>`**: Xác định nội dung chính của trang web.
    
- **Thẻ `<ul>` và `<li>`**: Dùng để quản lý danh sách người dùng, giúp việc áp dụng CSS (như Flexbox hoặc Grid) dễ dàng hơn.
    

---

### 5. Cập nhật Styles (CSS)

Để đảm bảo hiển thị đúng như thiết kế, bạn cần cập nhật nội dung từ các tệp CSS đính kèm vào:

- `user.component.css`: Định dạng riêng cho nút bấm và hình ảnh người dùng.
    
- `app.component.css`: Định dạng bố cục tổng thể, giới hạn độ rộng (width) và căn lề cho danh sách người dùng.