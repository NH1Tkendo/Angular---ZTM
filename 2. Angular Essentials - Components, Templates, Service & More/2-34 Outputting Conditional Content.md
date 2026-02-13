## Hiển thị Nội dung Có điều kiện (Conditional Content Rendering) với @if

### 1. Vấn đề thực tế

Trong ứng dụng thực tế, dữ liệu không phải lúc nào cũng tồn tại (ví dụ: chưa chọn người dùng nào).

- Nếu không xử lý điều kiện, Angular vẫn render các phần tử HTML rỗng (ví dụ: thẻ `<h2>` không có nội dung).
    
- Việc render các phần tử rỗng vào DOM (Document Object Model) là một thực hành không tốt (bad practice).
    

### 2. Cập nhật trạng thái dữ liệu

Để mô phỏng trường hợp chưa có dữ liệu, ta điều chỉnh file TypeScript của component:

- Không gán giá trị khởi tạo cho biến.
    
- Định nghĩa kiểu dữ liệu cho phép giá trị `undefined` (sử dụng `?`).
    

TypeScript

```
// app.component.ts
// selectedUserId có thể là string hoặc undefined
selectedUserId?: string; 
```

Khi `selectedUserId` là `undefined`, biến `selectedUser` cũng sẽ là `undefined`.

### 3. Cấu trúc điều kiện `@if`

Angular cung cấp cú pháp khối điều khiển (control flow) `@if` để chỉ render nội dung khi điều kiện thỏa mãn.

**Cú pháp:**

HTML

```
@if (condition) {
  }
```

**Ưu điểm về suy luận kiểu (Type Inference):** Khi kiểm tra điều kiện tồn tại bên trong `@if`, TypeScript và Angular đủ thông minh để hiểu rằng biến đó chắc chắn đã được định nghĩa bên trong khối lệnh.

- Không cần dùng toán tử `?` (optional chaining) hoặc `!` (non-null assertion) bên trong khối `@if`.
    
- Code trở nên gọn gàng và an toàn hơn.
    

### 4. Xử lý trường hợp còn lại với `@else`

Để hiển thị nội dung dự phòng (fallback content) khi điều kiện không thỏa mãn, sử dụng khối `@else`.

**Cú pháp:**

HTML

```
@else {
  }
```

### 5. Ví dụ tổng hợp

Đoạn mã dưới đây kiểm tra xem `selectedUser` có tồn tại hay không.

- Nếu **có**: Hiển thị component `app-tasks` và truyền dữ liệu user vào.
    
- Nếu **không**: Hiển thị dòng thông báo yêu cầu chọn người dùng.
    

HTML

```
@if (selectedUser) {
  <app-tasks [name]="selectedUser.name" />
} @else {
  <p id="fallback">Select a user to see their tasks</p>
}
```

### 6. Kết quả

- **Ban đầu**: Hiển thị văn bản dự phòng (fallback text) "Select a user...".
    
- **Sau tương tác**: Khi chọn một user, nội dung `app-tasks` sẽ thay thế văn bản dự phòng.
    
- Ngăn chặn việc render các thẻ HTML rỗng vô nghĩa lên giao diện.