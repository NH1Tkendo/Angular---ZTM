## Cơ chế Phát hiện Thay đổi (Change Detection) trong Angular

### Nguyên lý hoạt động

Trong Angular, việc cập nhật giao diện người dùng (UI) dựa trên sự thay đổi của dữ liệu (State) diễn ra hoàn toàn tự động nhờ vào cơ chế **Phát hiện thay đổi** (Change Detection).
![[Change-Detection-Mechanism.png]]
Quy trình diễn ra như sau:

1. **Phát hiện thay đổi**: Angular nhận biết khi dữ liệu trong Component thay đổi.
    
2. **Kiểm tra Template**: Hệ thống xem xét Template của Component tương ứng với dữ liệu mới.
    
3. **So sánh và Cập nhật**: Angular xác định xem trạng thái mới của dữ liệu có tạo ra sự khác biệt nào trong cấu trúc DOM (Document Object Model) hay không. Nếu có, nó sẽ cập nhật phần giao diện đó.
    

### Vai trò của `zone.js`

Để "phép màu" tự động này xảy ra, Angular sử dụng một thư viện lõi bên dưới gọi là **`zone.js`**.

- **Chức năng**: `zone.js` tự động lắng nghe và theo dõi các sự kiện bất đồng bộ (asynchronous events) có thể xảy ra trong ứng dụng, bao gồm:
    
    - Sự kiện người dùng (Click, Input, Scroll...)
        
    - Bộ định thời gian (Timers: `setTimeout`, `setInterval`)
        
    - Các tác vụ HTTP request
        
- **Cơ chế kích hoạt**: Khi một trong các sự kiện này xảy ra, `zone.js` sẽ thông báo cho Angular biết để kích hoạt quy trình _Change Detection_ quét toàn bộ ứng dụng nhằm tìm kiếm các thay đổi dữ liệu.
    

### Ghi chú cho Lập trình viên

> Bạn **không cần** tương tác trực tiếp hay viết mã cho `zone.js`. Đây là một phần nền tảng của framework giúp bạn tập trung vào việc xử lý logic dữ liệu (State), còn việc đồng bộ hóa dữ liệu đó lên giao diện (UI) sẽ do Angular tự động xử lý.