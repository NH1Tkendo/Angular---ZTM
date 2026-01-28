### 1. Định nghĩa Selector (Bộ chọn)

Để Angular biết vị trí cần hiển thị Component trên giao diện, chúng ta sử dụng thuộc tính `selector`.

- **Quy tắc đặt tên:** Phải bao gồm ít nhất hai từ cách nhau bởi dấu gạch ngang (dash).
    
    - Ví dụ: `app-header`.
        
- **Lý do:** Tránh xung đột với các thẻ HTML mặc định của trình duyệt (như thẻ `<header>`, `<footer>`). Nếu chỉ đặt là `header`, Angular sẽ ghi đè lên thẻ chuẩn của HTML, gây lỗi hiển thị không mong muốn.
    
- **Tiền tố (Prefix):** Thường dùng `app-` (ví dụ: `app-header`, `app-user-profile`). Bạn có thể thay đổi tùy ý nhưng `app-` là lựa chọn phổ biến nhất.
    

### 2. Quản lý Template (Giao diện)

Có hai cách để định nghĩa phần mã HTML cho một Component:

- **Inline Template (Giao diện nội khối):** Dùng thuộc tính `template` để viết HTML trực tiếp trong file TypeScript.
    
    - _Chỉ dùng khi:_ Template rất ngắn (1-3 dòng).
        
- **External Template (Giao diện bên ngoài - Khuyên dùng):** Dùng thuộc tính `templateUrl` để trỏ đến một file HTML riêng biệt.
    
    - **Cú pháp:** `templateUrl: './header.component.html'`
        
    - **Lợi ích:** Giúp mã nguồn sạch sẽ, dễ bảo trì khi giao diện phức tạp.
        
    - **Quy ước:** Tên file HTML nên trùng với tên file TypeScript (ví dụ: `header.component.ts` đi kèm với `header.component.html`).
        

### 3. Thuộc tính Standalone (Thành phần độc lập)

Đây là cách tiếp cận hiện đại để xây dựng Angular Component, giúp giảm bớt sự phụ thuộc vào các Module phức tạp.

- **Cấu hình:** `standalone: true`.
    
- **Lưu ý về phiên bản:**
    
    - **Angular 19 trở lên:** Giá trị này được mặc định là `true`. Bạn có thể bỏ qua không cần khai báo.
        
    - **Angular 18 trở xuống:** Mặc định là `false`. Bạn **bắt buộc** phải set thành `true` để sử dụng tính năng Standalone Component.
        
- **Phân loại:**
    
    - **Standalone Components:** Dễ sử dụng, giảm thiểu mã mẫu (boilerplate).
        
    - **Module-based Components:** Cách tiếp cận cũ (legacy), thường gặp trong các dự án lâu đời.
        

---

### 4. Mã nguồn ví dụ

#### File: `header.component.ts`

TypeScript

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-header', // Bộ chọn tùy chỉnh
  standalone: true,      // Đánh dấu là Standalone Component
  templateUrl: './header.component.html', // Trỏ đến file HTML bên ngoài
})
export class HeaderComponent {}
```

#### File: `header.component.html`

HTML

```
<header>
  <h1>Easy Task</h1>
</header>
```

---

### 5. Ghi chú bổ sung

- **Vị trí file:** Khi dùng đường dẫn `./`, Angular sẽ tìm file HTML trong cùng thư mục với file TypeScript.
    
- **Kiểm tra phiên bản:** Luôn kiểm tra file `package.json` để biết phiên bản Angular hiện tại, từ đó quyết định có cần khai báo thuộc tính `standalone` hay không.