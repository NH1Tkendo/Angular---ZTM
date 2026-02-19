## Thành phần giao diện dùng chung & Chiếu nội dung (Content Projection) trong Angular

Bài học này tập trung vào việc tạo các thành phần giao diện người dùng (UI components) có thể tái sử dụng để tránh lặp lại mã CSS và giới thiệu tính năng **ng-content** để xây dựng các thành phần bao bọc (wrapper components) linh hoạt.

### 1. Vấn đề và Giải pháp

- **Vấn đề:** Các thành phần khác nhau (ví dụ: `UserComponent` và `TaskComponent`) cần có cùng một kiểu dáng giao diện (bo góc, đổ bóng - drop shadow).
    
- **Cách tiếp cận thông thường:** Sao chép mã CSS hoặc tạo class CSS toàn cục (global CSS).
    
- **Cách tiếp cận tối ưu trong Angular:** Tạo một thành phần UI riêng biệt đóng vai trò là "lớp vỏ" (wrapper) để tái sử dụng cấu trúc và kiểu dáng.
    

### 2. Tạo thành phần Card (Card Component)

Chúng ta sẽ tạo một thành phần tên là `Card` nằm trong thư mục `shared` (dùng chung), vì nó là thành phần UI không thuộc về một tính năng cụ thể nào (như User hay Task).

**Các bước thực hiện:**

1. **Tạo component bằng Angular CLI:** Sử dụng lệnh sau để tạo component trong thư mục `shared` và bỏ qua file test:
    
    Bash
    
    ```
    ng generate component shared/card --skip-tests
    # Hoặc viết tắt:
    ng g c shared/card --skip-tests
    ```
    
2. **Thiết lập kiểu dáng (Styling):** Di chuyển các thuộc tính CSS (border-radius, box-shadow...) từ component cũ sang file `card.component.css`.
    
3. **Cấu trúc Template ban đầu:** Trong `card.component.html`, tạo một thẻ `<div>` để nhận các style này.
    

### 3. Cơ chế `ng-content` (Quan trọng)

Khi sử dụng một component làm lớp bao bọc (wrapper), ví dụ:

HTML

```
<app-card>
  <button>Nội dung bên trong</button>
</app-card>
```

Theo mặc định, Angular sẽ **loại bỏ** nội dung bên trong (`<button>...`) và thay thế hoàn toàn bằng template của `CardComponent`. Để giữ lại nội dung được bao bọc, ta cần sử dụng `ng-content`.

- **Khái niệm:** `ng-content` là một phần tử đặc biệt của Angular, hoạt động như một "chỗ giữ chỗ" (placeholder).
    
- **Cách hoạt động:** Nó đánh dấu vị trí mà nội dung được bao bọc sẽ được chèn vào trong template của component cha.
    

**Cập nhật `card.component.html`:**

HTML

```
<div class="card">
  <ng-content></ng-content>
</div>
```

### 4. Triển khai vào ứng dụng

Sau khi đã thiết lập `ng-content`, ta áp dụng `CardComponent` vào các nơi cần thiết.

**Các bước cập nhật:**

1. **Import Component:** Đảm bảo `CardComponent` được import vào danh sách `imports` của `UserComponent` và `TaskComponent` (nếu dùng Standalone Components) hoặc Module tương ứng.
    
2. **Sử dụng trong Template:** Thay thế các thẻ `div` hoặc `article` cũ bằng thẻ `<app-card>`.
    
    _Ví dụ trong `user.component.html`:_
    
    HTML
    
    ```
    <app-card>
        <button>...</button> </app-card>
    ```
    
    _Ví dụ trong `task.component.html`:_
    
    HTML
    
    ```
    <app-card>
        <article>...</article> </app-card>
    ```
    

### Tổng kết

- Sử dụng **thư mục shared** cho các thành phần UI chung.
    
- **`ng-content`** là chìa khóa để tạo các thành phần bao bọc linh hoạt, cho phép kết hợp template của component cha và nội dung được truyền vào từ bên ngoài.
    
- Giúp đồng bộ hóa giao diện (UI) trên toàn ứng dụng mà không cần lặp lại mã CSS.