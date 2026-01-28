## Cấu trúc Dự án & Khởi tạo (Project Structure & Setup)

Để đảm bảo đồng bộ trong quá trình học, giảng viên cung cấp một dự án khởi đầu (starting project) được tạo bằng Angular CLI. Dưới đây là phân tích chi tiết về các tệp tin và cách vận hành dự án này.

### 1. Lưu ý về Phiên bản CLI & Quy ước đặt tên

Các phiên bản Angular CLI khác nhau có thể tạo ra cấu trúc thư mục hơi khác nhau, nhưng mã nguồn cốt lõi vẫn hoạt động giống nhau.

- **Vị trí tệp:** Ví dụ, tệp `favicon.ico` có thể nằm trong thư mục `src` (bản cũ) hoặc `public` (bản mới).
    
- **Tên tệp Component:**
    
    - Theo truyền thống (Angular 2+): `app.component.ts`.
        
    - Các phiên bản mới hơn (Angular 20+): Có thể rút gọn thành `app.ts`.
        
    - _Lưu ý:_ Việc đặt tên không ảnh hưởng đến hành vi code, nhưng khóa học sẽ tuân theo quy ước `.component.ts` để dễ nhận biết.
        

### 2. Phân tích Cấu trúc Tệp tin (File Structure)

#### A. Thư mục gốc (Root Level) - Cấu hình

Các tệp ở thư mục gốc chủ yếu phục vụ việc cấu hình và quản lý dự án, thường không cần chỉnh sửa trừ khi có nhu cầu chuyên sâu.

- **Tệp cấu hình TypeScript (`tsconfig...json`):** Kiểm soát cách trình biên dịch chuyển đổi mã TypeScript sang JavaScript và mức độ nghiêm ngặt (strictness) khi kiểm tra lỗi.
    
- **`package.json`:** Quản lý các thư viện phụ thuộc (dependencies) và các gói Angular cần thiết cho dự án.
    
- **`angular.json`:** Chứa cấu hình cho **Angular CLI** và các công cụ liên quan.
    
- **Các tệp khác:**
    
    - `.editorconfig`: Quy định định dạng code cho trình soạn thảo.
        
    - `.gitignore`: Quy định các tệp bị bỏ qua khi sử dụng Git.
        

#### B. Thư mục `src` - Mã nguồn Ứng dụng

Đây là nơi bạn làm việc chính.

- **`main.ts`:**
    
    - Là điểm khởi đầu (Entry point) của ứng dụng.
        
    - Chứa đoạn mã đầu tiên được thực thi khi trình duyệt tải trang.
        
- **`index.html`:**
    
    - Tệp HTML chính được trình duyệt tải về đầu tiên.
        
    - Là nơi chứa ứng dụng Angular (chúng ta sẽ tìm hiểu cách Angular "nhúng" vào đây ở bài sau).
        
- **`styles.css`:** Chứa các định dạng (CSS) toàn cục, áp dụng cho toàn bộ ứng dụng.
    
- **`assets/`:** Thư mục chứa tài nguyên tĩnh như hình ảnh, logo.
    
- **`app/`:** **Quan trọng nhất.** Chứa các **Components** và logic của ứng dụng. Bạn sẽ dành phần lớn thời gian làm việc tại đây.
    

### 3. Quy trình Cài đặt & Chạy dự án

Khi mới tải dự án về (hoặc clone từ git), mã nguồn chưa có sẵn các thư viện trong `node_modules`, do đó file `main.ts` có thể báo lỗi.

**Bước 1: Cài đặt Dependencies** Chạy lệnh sau trong Terminal (tại thư mục dự án) để tải tất cả thư viện được liệt kê trong `package.json`. Chỉ cần làm một lần.

Bash

```
npm install
```

**Bước 2: Khởi chạy Server** Để xem trước ứng dụng, chạy lệnh:

Bash

```
npm start
```

- Lệnh này thực thi `ng serve` của Angular CLI dưới nền.
    
- Truy cập địa chỉ hiển thị trên terminal (thường là `http://localhost:4200`) để xem kết quả.