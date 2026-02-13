## Xử lý Gửi Biểu mẫu (Handling Form Submission)

Trong các ứng dụng trang đơn (SPA) như Angular, việc xử lý gửi biểu mẫu cần khác biệt so với HTML truyền thống để tránh việc tải lại trang làm gián đoạn trải nghiệm người dùng.

### 1. Cơ chế hoạt động của `FormsModule`

- **Vấn đề của HTML thuần**: Theo mặc định, khi nhấn nút `submit` trong một thẻ `<form>`, trình duyệt sẽ gửi yêu cầu HTTP (request) kèm dữ liệu lên máy chủ và tải lại trang web. Máy chủ phát triển (development server) của Angular thường không hỗ trợ xử lý luồng dữ liệu này.
    
- **Giải pháp từ Angular**:
    
    - Khi bạn import `FormsModule`, Angular sẽ tự động kích hoạt một **thành phần (component)** đặc biệt để kiểm soát tất cả các thẻ `<form>` tiêu chuẩn.
        
    - Thành phần này tự động **ngăn chặn hành vi mặc định** (prevent default) của trình duyệt.
        
    - **Kết quả**: Trang web sẽ không bị tải lại khi nhấn Submit, và bạn không cần phải viết mã thủ công để chặn hành vi này.
        

### 2. Sự kiện `ngSubmit`

Để thực thi logic riêng (như lưu dữ liệu, đóng hộp thoại) khi biểu mẫu được gửi, Angular cung cấp sự kiện `ngSubmit`.

- **Định nghĩa**: Đây là sự kiện đầu ra (output event) được phát ra bởi `FormsModule` ngay khi hành động submit xảy ra (và sau khi đã chặn hành vi mặc định của trình duyệt).
    
- **Cách sử dụng**: Sử dụng liên kết sự kiện (Event Binding) để lắng nghe `ngSubmit` ngay trên thẻ mở `<form>`.
    

### 3. Triển khai Mã nguồn

**Trong Template (`new-task.component.html`):** Liên kết sự kiện `ngSubmit` với phương thức xử lý:

HTML

```
<form (ngSubmit)="onSubmit()">
  <p class="actions">
    <button type="button" (click)="onCancel()">Cancel</button>
    <button type="submit">Create</button>
  </p>
</form>
```

**Trong Component Class (`new-task.component.ts`):** Khai báo phương thức `onSubmit` để xử lý logic:

TypeScript

```
onSubmit() {
  // Logic xử lý dữ liệu sẽ được viết tại đây
  console.log("Form submitted!"); 
}
```