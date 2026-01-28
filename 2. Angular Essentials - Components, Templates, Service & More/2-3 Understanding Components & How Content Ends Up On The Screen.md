## Cơ chế hiển thị của Angular (How Angular Renders)

Làm thế nào để một thẻ lạ lẫm như `<app-root>` trong `index.html` biến thành giao diện người dùng hoàn chỉnh? Quá trình này diễn ra qua các bước kết nối giữa trình duyệt, `main.ts` và Component.

### 1. Điểm khởi đầu: `index.html`

- Khi truy cập trang web, trình duyệt tải tệp `index.html` đầu tiên.
    
- Bên trong `<body>`, chỉ có thẻ `<app-root></app-root>`.
    
    - Đây **không** phải thẻ HTML chuẩn. Trình duyệt không hiểu nó.
        
    - Angular sẽ chịu trách nhiệm xử lý thẻ này.
        
- **Cơ chế tiêm Script (Script Injection):**
    
    - Trong mã nguồn tệp `index.html` gốc, không có thẻ `<script>` nào liên kết đến logic ứng dụng.
        
    - Khi chạy lệnh `ng serve` (hoặc `npm start`), Angular CLI sẽ tự động biên dịch mã TypeScript thành JavaScript và **tiêm (inject)** các thẻ script cần thiết vào `index.html` trước khi gửi xuống trình duyệt.
        

### 2. Quy trình khởi động: `main.ts`

Sau khi các script được tải, trình duyệt sẽ thực thi mã trong tệp `main.ts`. Đây là điểm nhập (entry point) logic của ứng dụng.

- **Chức năng:** Khởi động ứng dụng Angular bằng hàm `bootstrapApplication`.
    
- **Tham số:** Hàm này yêu cầu một **Component** làm đối số để bắt đầu (thường là `AppComponent`).
    

TypeScript

```
// Ví dụ logic trong main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

### 3. Cấu tạo của Component (`app.component.ts`)

`AppComponent` là thành phần được `main.ts` gọi đến. Bản chất nó là một lớp (Class) TypeScript được gắn thêm siêu dữ liệu (metadata).

#### a. Decorator `@Component`

Để biến một class thông thường thành Angular Component, ta sử dụng **Decorator** (Bộ trang trí).

- Cú pháp: `@Component({ ... })`
    
- Được nhập từ gói `@angular/core`.
    
- Chức năng: Cung cấp cấu hình metadata cho class ngay bên dưới nó.
    

#### b. Các thuộc tính quan trọng trong Decorator

TypeScript

```
@Component({
  selector: 'app-root',           // 1. Bộ chọn
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html', // 2. Đường dẫn HTML
  styleUrl: './app.component.css'      // 3. Đường dẫn CSS
})
export class AppComponent {
  title = 'first-angular-app';
}
```

1. **`selector: 'app-root'`**:
    
    - Định nghĩa tên thẻ HTML tùy chỉnh cho Component này.
        
    - Angular sẽ tìm thẻ `<app-root>` trong `index.html` để thay thế/quản lý.
        
2. **`templateUrl`**:
    
    - Trỏ đến tệp HTML chứa mã đánh dấu (markup) của Component (ví dụ: `app.component.html`).
        
    - Đây là nội dung thực tế sẽ được hiển thị lên màn hình.
        
3. **`styleUrl`**:
    
    - Trỏ đến tệp CSS chứa các quy tắc định dạng riêng cho Component này (không ảnh hưởng đến Component khác).
        

### 4. Kết nối và Hiển thị

Quá trình hiển thị diễn ra như sau:

1. `main.ts` gọi `AppComponent`.
    
2. Angular đọc metadata của `AppComponent` và thấy `selector` là `app-root`.
    
3. Angular quét `index.html`, tìm thấy thẻ `<app-root>`.
    
4. Angular lấy nội dung từ `templateUrl` (`app.component.html`) và chèn vào vị trí của `<app-root>`.
    
5. Kết quả: Người dùng nhìn thấy tiêu đề, hình ảnh và nội dung từ `app.component.html` thay vì thẻ rỗng ban đầu.