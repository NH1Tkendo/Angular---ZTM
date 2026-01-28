### 1. Định kiểu cho Component (Component Styling)

Tương tự như giao diện (template), Angular cung cấp nhiều cách để thêm CSS vào Component:

- **`styleUrl`:** Dùng để liên kết với **một** file CSS bên ngoài (Phổ biến nhất).
    
    - Ví dụ: `styleUrl: './header.component.css'`
        
- **`styleUrls`:** Dùng khi muốn liên kết với **nhiều** file CSS (truyền vào một mảng).
    
- **`styles`:** Định nghĩa CSS trực tiếp (inline) trong file TypeScript dưới dạng mảng các chuỗi.
    
    - _Lưu ý:_ Không khuyến khích dùng cho các đoạn mã CSS dài hoặc phức tạp.
        

> [!IMPORTANT] **Tính đóng gói (Style Encapsulation):** Các kiểu dữ liệu được định nghĩa trong file CSS của Component sẽ chỉ áp dụng cho riêng Component đó, không gây xung đột với các thành phần khác trong ứng dụng.

---
### 2. Quản lý Tài nguyên Toàn cục (Global Assets)

Ngoài CSS riêng của từng Component, ứng dụng cần các thiết lập chung:

- **`styles.css` (trong thư mục `src`):** Chứa các quy tắc CSS toàn cục tác động đến toàn bộ ứng dụng.
    
- **`index.html`:** Nơi nhúng các tài nguyên bên ngoài như **Google Fonts**.
    
- **Thư mục `assets`:** Nơi lưu trữ hình ảnh, icon (ví dụ: `task-management-logo.png`).
    

---

### 3. Cấu hình hệ thống (angular.json)

Để Angular có thể nhận diện và tải các tệp tin trong thư mục `assets`, bạn cần kiểm tra file cấu hình `angular.json` tại gốc dự án:

- Tìm đến mục `assets`.
    
- Đảm bảo đường dẫn `"src/assets"` đã tồn tại trong mảng cấu hình.
    

JSON

```
"assets": [
  "src/favicon.ico",
  "src/assets"
],
```

---

### 4. Hoàn thiện Markup cho Header

Cập nhật file `header.component.html` để hiển thị logo và thông tin mô tả:

HTML

```
<header>
  <div>
    <img src="assets/task-management-logo.png" alt="A todo list" />
    <h1>Easy Task</h1>
    <p>Enterprise-level task management without friction.</p>
  </div>
</header>
```

---

### 5. Cấu trúc mã nguồn sau khi hoàn thiện

#### File: `header.component.ts`

TypeScript

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css' // Liên kết file CSS riêng
})
export class HeaderComponent {}
```

---

### 💡 Tóm tắt quy trình:

1. **Tạo file CSS** riêng cho component để đảm bảo tính đóng gói.
    
2. **Cập nhật `index.html`** nếu cần thêm font hoặc thư viện bên ngoài.
    
3. **Đặt hình ảnh vào thư mục `assets`** và kiểm tra cấu hình trong `angular.json`.
    
4. **Sử dụng đường dẫn tương đối** trong HTML để hiển thị tài nguyên.