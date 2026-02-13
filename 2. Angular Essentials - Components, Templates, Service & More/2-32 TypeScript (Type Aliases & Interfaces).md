## Tối ưu hóa Mã nguồn: Tách biệt Định nghĩa Kiểu (Type Definitions)

Khi làm việc với các kiểu dữ liệu phức tạp (như đối tượng có nhiều thuộc tính), việc định nghĩa trực tiếp (inline) sẽ khiến mã nguồn trở nên dài dòng và khó đọc. TypeScript cung cấp hai giải pháp chính để tách biệt và tái sử dụng các định nghĩa này: **Type Alias** và **Interface**.

### 1. Type Alias (Bí danh kiểu)

Đây là cách đặt một tên riêng cho một kiểu dữ liệu bất kỳ (đối tượng, hợp, nguyên thủy...).

- **Từ khóa**: `type`
    
- **Quy tắc đặt tên**: Viết hoa chữ cái đầu (PascalCase) theo quy ước.
    
- **Cú pháp**: Sử dụng dấu bằng `=` để gán định nghĩa kiểu cho tên bí danh.
    

TypeScript

```
// Định nghĩa một Type Alias tên là User
type User = {
  id: string;
  avatar: string;
  name: string;
};

// Sử dụng Type Alias trong Component
@Input({ required: true }) user!: User;
```

### 2. Interface (Giao diện)

Interface là một tính năng đặc thù của TypeScript dùng để mô tả hình dạng (shape) của một **đối tượng**.

- **Từ khóa**: `interface`
    
- **Cú pháp**: Không sử dụng dấu bằng `=`, mở ngoặc nhọn `{ }` trực tiếp sau tên interface.
    

TypeScript

```
// Định nghĩa một Interface tên là User
interface User {
  id: string;
  avatar: string;
  name: string;
}

// Cách sử dụng tương tự như Type Alias
@Input({ required: true }) user!: User;
```

### 3. So sánh Type Alias và Interface

Việc lựa chọn giữa `type` và `interface` thường phụ thuộc vào sở thích cá nhân hoặc quy định của dự án, nhưng có một số điểm khác biệt cần lưu ý:

|**Đặc điểm**|**Type Alias (type)**|**Interface (interface)**|
|---|---|---|
|**Phạm vi sử dụng**|Linh hoạt (Object, Union types, Primitive types, Tuples...)|**Chỉ dùng cho Object**|
|**Cú pháp gán**|Cần dấu bằng (`=`)|Không cần dấu bằng|
|**Trong Angular**|Phổ biến, nhưng ít hơn Interface|**Rất phổ biến và được ưu tiên**|

> [!NOTE] Ghi chú
> 
> - Mặc dù có sự khác biệt về kỹ thuật sâu bên trong (như khả năng _merging_ của interface), ở mức độ cơ bản, cả hai đều giải quyết tốt việc định nghĩa cấu trúc đối tượng (Object Types).
>     
> - Trong khóa học này và các dự án Angular thực tế, bạn sẽ thấy **Interface** xuất hiện thường xuyên hơn.
>