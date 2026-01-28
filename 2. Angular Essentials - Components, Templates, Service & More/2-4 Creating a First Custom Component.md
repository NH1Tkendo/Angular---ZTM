## Thiết kế và Khởi tạo Component Mới

Trong quá trình xây dựng ứng dụng, bước đầu tiên là phân tích giao diện người dùng (UI) và chia nhỏ nó thành các khối xây dựng riêng biệt.

### 1. Tư duy phân tách Component

Thay vì viết toàn bộ mã nguồn trong một tệp duy nhất, Angular khuyến khích chia nhỏ giao diện thành các **Thành phần** (Components) để dễ quản lý và lắp ghép.

- **Phân tích ứng dụng Demo:**
    
    - **Header:** Thanh tiêu đề phía trên.
        
    - **Sidebar:** Thanh bên chứa danh sách người dùng.
        
    - **Task Area:** Khu vực hiển thị nội dung chính.
        
    - **Modal/Dialog:** Cửa sổ bật lên để thêm tác vụ.
        
- **Chiến lược:** Xây dựng từng khối (Header, Sidebar...) thành các Component riêng biệt, sau đó kết hợp chúng lại trong `AppComponent`.
    

### 2. Quy ước đặt tên tệp (Naming Convention)

Khi tạo một file component mới, cần tuân thủ quy tắc đặt tên để đảm bảo sự thống nhất và dễ nhận biết.

- **Cấu trúc tiêu chuẩn (Standard/Legacy):** `[tên-tính-năng].[loại-file].[đuôi-file]`
    
    - Ví dụ: `header.component.ts`
        
    - _Giải thích:_
        
        - `header`: Tên chức năng/nhiệm vụ của component.
            
        - `component`: Loại thành phần trong Angular (phân biệt với `service`, `directive`...).
            
        - `ts`: Định dạng tệp TypeScript.
            

> **Lưu ý về Angular 20+:** Từ phiên bản Angular 20, quy ước đặt tên mặc định đã được đơn giản hóa thành `header.ts`. Tuy nhiên, khóa học và hầu hết các dự án hiện tại vẫn sử dụng quy ước đầy đủ `header.component.ts` để rõ ràng hơn. Tên file không ảnh hưởng đến việc thực thi mã.

### 3. Các bước khởi tạo Class Component

Một Component trong Angular thực chất là một lớp (Class) TypeScript được gắn thêm siêu dữ liệu (metadata).

#### Bước 1: Tạo tệp và định nghĩa Class

Trong tệp `header.component.ts`:

- Sử dụng từ khóa `export` để class có thể được sử dụng ở các tệp khác.
    
- Tên class viết theo kiểu **PascalCase** (Viết hoa chữ cái đầu mỗi từ).
    
- Ví dụ: `HeaderComponent`.
    

#### Bước 2: Thêm Decorator `@Component`

Để biến class thông thường thành Angular Component, cần sử dụng **Decorator** (Bộ trang trí).

- Nhập (Import) `Component` từ thư viện `@angular/core`.
    
- Đặt `@Component({})` ngay phía trên tên class.
    

### 4. Mã nguồn minh họa

Dưới đây là nội dung cơ bản của tệp `header.component.ts` sau khi khởi tạo:

TypeScript

```
// 1. Import Decorator từ Angular Core
import { Component } from '@angular/core';

// 2. Sử dụng Decorator để đánh dấu đây là Component
// (Hiện tại để trống cấu hình, sẽ bổ sung sau)
@Component({
  // Configuration options will go here
})

// 3. Định nghĩa và Export class
export class HeaderComponent {
    // Logic của component sẽ nằm ở đây
}
```