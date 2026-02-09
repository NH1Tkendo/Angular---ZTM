## Sử dụng Getter để tính toán giá trị trong Angular

### Mục đích và Lợi ích

Trong quá trình phát triển, việc tính toán hoặc xử lý logic phức tạp (như nối chuỗi đường dẫn ảnh) ngay bên trong **Template** (file HTML) là điều có thể làm được nhưng không được khuyến khích.

- **Vấn đề**: Logic nằm trong HTML làm template trở nên rối rắm, khó đọc và khó bảo trì.
    
- **Giải pháp**: Sử dụng tính năng **Getter** của JavaScript/TypeScript để chuyển phần logic tính toán từ Template vào Class (file `.ts`).
    
- **Lợi ích**: Giữ cho mã nguồn Template đơn giản, sạch sẽ và tách biệt logic xử lý.
    

### Khái niệm Getter

**Getter** là một phương thức trong class nhưng được truy cập giống như một thuộc tính.

- Được định nghĩa bằng từ khóa `get`.
    
- Luôn trả về một giá trị mới.
    
- Khi sử dụng, không cần gọi dấu ngoặc đơn `()`.
    

### Cách thực hiện

#### 1. Định nghĩa trong Component (TypeScript)

Tạo một getter bên trong class component. Lưu ý phải sử dụng từ khóa `this` để truy cập các thuộc tính khác trong cùng một class.

TypeScript

```
// Trong file component.ts
get imagePath() {
  // Sử dụng 'this' để truy cập thuộc tính selectedUser của class
  return 'assets/users/' + this.selectedUser.avatar;
}
```

#### 2. Sử dụng trong Template (HTML)

Gọi tên getter giống như gọi một biến bình thường (không có dấu ngoặc tròn).

HTML

```
<img [src]="imagePath" [alt]="selectedUser.name" />
```

### Lưu ý quan trọng

- **Cú pháp**: `get identifier() { return ... }`
    
- **Phạm vi `this`**: Trong JavaScript/TypeScript, `this` là bắt buộc để tham chiếu đến ngữ cảnh hiện tại của instance class (ví dụ: `this.selectedUser`).
    
- **Cách gọi**: Mặc dù được định nghĩa như một hàm (method), nhưng trong template, nó được đối xử như một thuộc tính (property).
    

---

**Tổng kết**: Việc chuyển đổi từ logic nội tuyến (inline logic) sang sử dụng **Getter** giúp mã nguồn tuân thủ nguyên tắc "Template sạch" và tận dụng sức mạnh của Class để xử lý dữ liệu.