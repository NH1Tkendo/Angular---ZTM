## Thiết lập Môi trường & Tạo Dự án Angular

Để bắt đầu lập trình Angular, bạn không thể chỉ tạo các tệp HTML và JavaScript thủ công như web truyền thống. Bạn cần một môi trường đặc biệt để biên dịch và tối ưu hóa mã nguồn.

### 1. Tại sao cần công cụ hỗ trợ?

Trình duyệt không thể chạy trực tiếp mã nguồn Angular vì:

- **Cú pháp HTML phi chuẩn:** Angular sử dụng các cú pháp mở rộng trong HTML mà trình duyệt chưa hiểu ngay lập tức.
    
- **TypeScript:** Angular sử dụng TypeScript thay vì JavaScript thuần.
    
    - Trình duyệt không hiểu TypeScript.
        
    - Cần công cụ để chuyển đổi (compile) TypeScript sang JavaScript.
        
- **Tối ưu hóa:** Mã nguồn cần được tối ưu hóa trước khi đưa vào môi trường sản xuất (production).
    

$\rightarrow$ **Giải pháp:** Sử dụng **Angular CLI** (Giao diện dòng lệnh Angular) để tự động hóa việc khởi tạo, biên dịch và tối ưu hóa dự án.

### 2. Cài đặt các công cụ tiên quyết

Trước khi cài đặt Angular CLI, bạn cần cài đặt **Node.js**.

- **Vai trò của Node.js:**
    
    - Angular là framework chạy trên trình duyệt (client-side), không phải framework chạy trên Node.js.
        
    - Tuy nhiên, **Angular CLI** cần Node.js để hoạt động (môi trường thực thi cho các công cụ xây dựng).
        
    - Node.js đi kèm với **NPM** (Trình quản lý gói) để tải các thư viện cần thiết.
        
- **Cách cài đặt:**
    
    1. Truy cập [nodejs.org].
        
    2. Tải xuống phiên bản **LTS** (Long Term Support - Hỗ trợ dài hạn).
        
    3. Cài đặt với các thiết lập mặc định.
        

### 3. Cài đặt Angular CLI

Sau khi có Node.js, mở Terminal (macOS/Linux) hoặc Command Prompt (Windows) và chạy lệnh sau để cài đặt CLI trên toàn hệ thống:

Bash

```
npm install -g @angular/cli
```

> **Lưu ý cho macOS/Linux:** Nếu gặp lỗi về quyền truy cập (permissions), hãy thêm `sudo` vào trước câu lệnh và nhập mật khẩu máy tính khi được yêu cầu:
> 
> `sudo npm install -g @angular/cli`

### 4. Tạo dự án Angular mới

Di chuyển đến thư mục bạn muốn lưu dự án và chạy lệnh:

Bash

```
ng new <tên-dự-án>
```

_Ví dụ:_ `ng new first-angular-app`

**Quy tắc đặt tên:**

- Không chứa khoảng trắng.
    
- Sử dụng chữ thường.
    
- Phân cách các từ bằng dấu gạch ngang (`-`).
    

### 5. Các tùy chọn cấu hình (Configuration Prompts)

Khi chạy lệnh `ng new`, CLI sẽ hỏi một số câu hỏi để thiết lập dự án. Dưới đây là các lựa chọn khuyến nghị cho khóa học này:

- **Zoneless Application:** (Có thể xuất hiện ở phiên bản mới)
    
    - Chọn: `No` (hoặc nhấn Enter để chọn mặc định).
        
- **Stylesheet Format (Định dạng kiểu dáng):**
    
    - Chọn: `CSS` (hoặc SCSS nếu bạn muốn, nhưng khóa học dùng CSS).
        
- **Server-Side Rendering (SSR) & Static Site Generation (SSG):**
    
    - Chọn: `N` (No).
        
    - _Giải thích:_ SSR sẽ được đề cập sau, hiện tại chúng ta tập trung vào client-side rendering cơ bản.
        

Sau khi trả lời xong, Angular CLI sẽ tự động tải các gói thư viện cần thiết và khởi tạo cấu trúc dự án cho bạn.