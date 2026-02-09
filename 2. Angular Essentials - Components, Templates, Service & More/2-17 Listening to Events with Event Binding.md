## Ràng buộc Sự kiện (Event Binding) trong Angular

### Khái niệm

Để tương tác với người dùng (như click chuột, nhập liệu), Angular cung cấp cơ chế **Ràng buộc sự kiện** (Event Binding). Cơ chế này cho phép ứng dụng lắng nghe các sự kiện từ phía người dùng và thực thi logic tương ứng.

### Cú pháp

Trong Angular, để lắng nghe một sự kiện, bạn bao quanh tên sự kiện đó bằng **dấu ngoặc đơn** `( )` trong thẻ HTML.

- **Cấu trúc**: `(tên_sự_kiện)="phương_thức_xử_lý()"`
    
- **Ví dụ phổ biến**: `(click)`, `(input)`, `(submit)`, v.v.
    

### Các bước thực hiện

#### 1. Định nghĩa trong Template (HTML)

Gán trình lắng nghe sự kiện vào phần tử HTML mong muốn.

- Sử dụng cặp ngoặc đơn `( )` bao quanh tên sự kiện (ví dụ: `click`).
    
- Gán nó bằng tên phương thức sẽ được gọi, kèm theo dấu ngoặc đơn `()` để thực thi phương thức đó khi sự kiện xảy ra.
    

HTML

```
<button (click)="onSelectUser()">Click me</button>
```

#### 2. Định nghĩa trong Component (TypeScript)

Tạo phương thức xử lý sự kiện bên trong class của component.

- **Quy tắc đặt tên (Convention)**: Thường bắt đầu bằng tiền tố `on` (ví dụ: `onSelectUser`, `onSubmit`) để dễ dàng nhận biết đây là hàm xử lý sự kiện, dù điều này không bắt buộc.
    

TypeScript

```
export class UserComponent {
  // Phương thức này sẽ được gọi khi sự kiện click xảy ra
  onSelectUser() {
    console.log('Clicked'); 
  }
}
```

### Lưu ý quan trọng

- **Gợi ý mã (IntelliSense)**: Trong hầu hết các IDE (như VS Code), bạn có thể gõ dấu ngoặc đơn `( )` và nhấn `Ctrl + Space` để xem danh sách các sự kiện được hỗ trợ.
    
- **Thực thi**: Phương thức chỉ được thực thi khi sự kiện thực sự xảy ra (người dùng click), không phải lúc trình duyệt phân tích mã HTML.
    
- **Dấu ngoặc đơn trong HTML**: Khác với Property Binding (chỉ truyền tham chiếu), Event Binding yêu cầu dấu ngoặc đơn `()` sau tên hàm (ví dụ: `onSelectUser()`) để báo hiệu lệnh gọi hàm.