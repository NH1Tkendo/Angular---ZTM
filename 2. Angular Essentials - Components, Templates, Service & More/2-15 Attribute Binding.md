## Ràng buộc Thuộc tính HTML (Attribute Binding)

### Phân biệt DOM Property và HTML Attribute

Để sử dụng Angular hiệu quả, cần phân biệt rõ hai khái niệm cốt lõi:

- **HTML Attribute**: Là các thuộc tính được định nghĩa trong mã HTML (ví dụ: `src`, `href` trong thẻ).
    
- **DOM Property**: Là các thuộc tính của đối tượng DOM (Document Object Model) được trình duyệt tạo ra khi phân tích (parse) mã HTML.
    

**Property Binding** (ví dụ: `[src]`) thực chất nhắm vào **DOM Property**, không phải HTML Attribute. Mặc dù tên của chúng thường giống nhau (1:1), nhưng không phải lúc nào cũng vậy.

### Khi nào cần dùng Attribute Binding?

Có những trường hợp bạn muốn thay đổi giá trị của một Attribute nhưng nó **không có DOM Property tương ứng**.

- **Ví dụ điển hình**: Các thuộc tính hỗ trợ tiếp cận (**ARIA attributes**) như `aria-label`, `aria-valuenow`, hoặc các thuộc tính tùy chỉnh (custom attributes).
    
- Nếu dùng cú pháp Property Binding thông thường `[aria-valuenow]="val"`, Angular sẽ báo lỗi vì không tìm thấy property này trên đối tượng DOM.
    

### Cú pháp Attribute Binding

Để giải quyết vấn đề trên, Angular cung cấp cú pháp `attr.`:

- **Cú pháp**: `[attr.tên_attribute]="giá_trị"`
    
- **Cơ chế**: Tiền tố `attr.` báo cho Angular biết rằng bạn muốn thao tác trực tiếp lên HTML Attribute thay vì DOM Property.
    

### Ví dụ và Mã nguồn

Dưới đây là ví dụ về cách thiết lập động các thuộc tính ARIA cho một thanh tiến trình (progress bar):

HTML

```
<div 
  role="progressbar" 
  [attr.aria-valuenow]="currentVal" 
  [attr.aria-valuemax]="maxVal">
  </div>
```

---

**Ghi chú tóm tắt**:

> Hãy nhớ quy tắc chung: Ưu tiên sử dụng **Property Binding** `[property]` cho các thuộc tính tiêu chuẩn. Chỉ chuyển sang **Attribute Binding** `[attr.attribute]` khi Property Binding không hỗ trợ (như ARIA attributes hoặc colspan/rowspan của bảng).