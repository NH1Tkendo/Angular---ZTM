## Cơ chế liên kết dữ liệu: String Interpolation

### 1. Khái niệm String Interpolation

**String Interpolation** là kỹ thuật cho phép bạn chèn các giá trị động từ lớp Component vào trong bản mẫu HTML.

- **Cú pháp:** Sử dụng cặp dấu ngoặc ria đôi `{{ }}`.
    
- **Cách hoạt động:** Angular sẽ tính toán biểu thức nằm giữa `{{` và `}}`, chuyển đổi kết quả thành một chuỗi (string) và hiển thị nó tại vị trí đó trong HTML.
    

---

### 2. Điều kiện để truy cập dữ liệu

Để một thuộc tính (property) từ tệp `.ts` có thể hiển thị trong tệp `.html`, nó phải đáp ứng điều kiện sau:

- **Phạm vi truy cập (Access Modifier):** Thuộc tính phải là **Public** (công khai).
    
- **Lưu ý về từ khóa `private`:** - Nếu bạn khai báo `private selectedUser`, biến này **không thể** truy cập từ Template.
    
    - Trong TypeScript, nếu không ghi gì phía trước, mặc định thuộc tính sẽ là `public`.
        

---

### 3. Cách thực hiện trong Mã nguồn

#### Trong tệp `user.component.ts`:

Đảm bảo thuộc tính được khai báo để lưu trữ đối tượng người dùng:

TypeScript

```
export class UserComponent {
  // Mặc định là public, có thể truy cập từ template
  selectedUser = DUMMY_USERS[randomIndex]; 
}
```

#### Trong tệp `user.component.html`:

Sử dụng toán tử dấu chấm `.` để truy cập vào các thuộc tính bên trong đối tượng `selectedUser`:

HTML

```
<span>{{ selectedUser.name }}</span>
```

---

### 4. Ưu điểm khi dùng IDE (Visual Studio Code)

Nhờ vào các công cụ hỗ trợ của Angular (Angular Language Service), khi bạn gõ bên trong `{{ }}`, IDE sẽ:

- **Gợi ý mã (Auto-completion):** Hiển thị danh sách các thuộc tính có sẵn (`id`, `name`, `avatar`).
    
- **Kiểm tra lỗi:** Cảnh báo ngay nếu bạn truy cập vào một thuộc tính không tồn tại.
    

---

### 5. Kết quả vận hành

Khi bạn lưu tệp và trình duyệt tải lại:

- Mỗi lần **F5 (Reload)**, một chỉ số ngẫu nhiên mới được tạo ra.
    
- Angular sẽ cập nhật giá trị của `selectedUser`.
    
- Cú pháp `{{ selectedUser.name }}` sẽ tự động hiển thị tên tương ứng của người dùng đó.
    

> [!NOTE] Do tính chất ngẫu nhiên, đôi khi bạn sẽ thấy một tên lặp lại hai lần liên tiếp, nhưng về cơ bản giao diện đã trở thành nội dung động.