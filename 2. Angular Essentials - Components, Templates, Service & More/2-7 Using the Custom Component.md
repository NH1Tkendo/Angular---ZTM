### 1. Tại sao Angular không tự động nhận diện Component?

Mặc dù bạn đã định nghĩa `selector: 'app-header'`, nhưng nếu bạn chỉ thêm thẻ `<app-header>` vào `index.html`, trình duyệt sẽ coi đó là một thẻ HTML trống và vô nghĩa.

- **Nguyên lý:** Angular **không** tự động quét toàn bộ thư mục dự án để tìm Component.
    
- **Cơ chế:** Bạn phải khai báo tường minh để Angular biết Component nào đang tồn tại và cần được render.
    

### 2. Kiến trúc Cây Component (Component Tree)

![[Component-Tree.png]]
Trong Angular, chúng ta không khởi tạo mọi Component bằng hàm `bootstrapApplication`. Thay vào đó, chúng ta xây dựng một cấu trúc phân cấp.

- **Root Component (Component Gốc):** Thường là `AppComponent`. Đây là Component duy nhất được gọi trong `main.ts` thông qua `bootstrapApplication`.
    
- **Child Components (Component Con):** Các Component khác (như `HeaderComponent`) sẽ được lồng bên trong Template của Root Component hoặc các Component con khác.
    
- **Lợi ích:** Các Component trong cùng một cây có thể dễ dàng giao tiếp, chia sẻ dữ liệu và làm việc cùng nhau như một ứng dụng thống nhất.
    

---

### 3. Cách nhúng một Component vào Component khác

Để sử dụng `HeaderComponent` bên trong `AppComponent`, bạn cần thực hiện 2 bước quan trọng tại file TypeScript của Component cha:

#### Bước 1: Import Class của Component con

Sử dụng câu lệnh `import` để trỏ tới file định nghĩa Component con.

#### Bước 2: Đăng ký trong mảng `imports`

Vì chúng ta đang dùng **Standalone Component**, bạn phải thêm tên Class vào thuộc tính `imports` trong decorator `@Component`.

---

### 4. Ví dụ thực hiện cụ thể

#### File: `app.component.ts` (Component Cha)

TypeScript

```
import { Component } from '@angular/core';
// Bước 1: Import Component con
import { HeaderComponent } from './header/header.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // Bước 2: Đăng ký để Angular nhận diện được thẻ <app-header>
  imports: [HeaderComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
```

#### File: `app.component.html`

Bây giờ bạn có thể sử dụng selector của Component con như một thẻ HTML tùy chỉnh:

HTML

```
<app-header></app-header>

<main>
  <p>Nội dung chính của ứng dụng...</p>
</main>
```

---

### 5. Xử lý lỗi thường gặp

> **Lỗi:** `app-header is not a known element`

- **Nguyên nhân:** Bạn đã sử dụng thẻ `<app-header>` trong HTML nhưng chưa thêm `HeaderComponent` vào mảng `imports` trong file TypeScript tương ứng.
    
- **Giải pháp:** Kiểm tra lại thuộc tính `imports: [HeaderComponent]` trong decorator `@Component` của Component cha.