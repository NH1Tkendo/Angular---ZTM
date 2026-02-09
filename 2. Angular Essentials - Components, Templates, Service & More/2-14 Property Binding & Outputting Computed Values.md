## Ràng buộc Thuộc tính (Property Binding) trong Angular

### Khái niệm

Trong Angular, ngoài việc sử dụng **Nội suy chuỗi** (String Interpolation) với cú pháp `{{ }}`, chúng ta còn một tính năng quan trọng khác để hiển thị dữ liệu động là **Ràng buộc thuộc tính** (Property Binding).

Tính năng này cho phép bạn thiết lập giá trị cho các thuộc tính của các phần tử DOM (như `src`, `alt`, `href`, `disabled`...) một cách trực tiếp từ logic của component.

### Cách thực hiện

Thay vì sử dụng dấu ngoặc kép và cặp dấu ngoặc nhọn, bạn sẽ bao quanh tên thuộc tính của phần tử HTML bằng **dấu ngoặc vuông** `[ ]`.

- **Cú pháp**: `[property]="value"`
    
- **Lưu ý**: Giá trị nằm trong dấu ngoặc kép lúc này sẽ được Angular hiểu là một biểu thức TypeScript (hoặc biến), không phải là một chuỗi văn bản thuần túy.
    

### Ví dụ và Mã nguồn

Dưới đây là cách sử dụng Property Binding để thiết lập đường dẫn ảnh và thuộc tính mô tả (alt) cho người dùng:

HTML

```
<img 
  [src]="'assets/users/' + selectedUser.avatar" 
  [alt]="selectedUser.name" 
/>
```

### Điểm khác biệt giữa Nội suy chuỗi và Ràng buộc thuộc tính

|**Đặc điểm**|**Nội suy chuỗi (String Interpolation)**|**Ràng buộc thuộc tính (Property Binding)**|
|---|---|---|
|**Cú pháp**|`{{ expression }}`|`[property]="expression"`|
|**Vị trí ưu tiên**|Giữa các thẻ HTML (Content)|Trong các thuộc tính của thẻ (Attributes)|
|**Kiểu dữ liệu**|Luôn chuyển đổi kết quả thành chuỗi|Có thể nhận nhiều kiểu dữ liệu (boolean, object, string)|

### Xử lý biểu thức động

Angular cho phép bạn thực thi các biểu thức JavaScript đơn giản ngay trong phần gán giá trị:

- **Nối chuỗi**: `'assets/users/' + selectedUser.avatar` để tạo đường dẫn hoàn chỉnh.
    
- **Tính toán**: Bạn có thể thực hiện các phép tính như $1 + 1$ trực tiếp trong trình bao đóng của Angular.
    
- **Kết hợp**: Xây dựng giá trị "vừa kịp lúc" (just-in-time) bằng cách kết hợp các chuỗi cố định với dữ liệu động từ thuộc tính của component.
    

---

**Ghi chú thêm**:

> Mặc dù bạn _có thể_ dùng Nội suy chuỗi cho thuộc tính (ví dụ: `src="assets/{{ imagePath }}"`), nhưng các chuyên gia Angular khuyến khích sử dụng **Property Binding** `[src]` vì nó sạch sẽ hơn và tuân thủ đúng chuẩn kỹ thuật của framework khi làm việc với các thuộc tính phần tử DOM.