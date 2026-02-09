## Hàm `output()`: Giải pháp hiện đại thay thế @Output

Bên cạnh cách sử dụng decorator `@Output` truyền thống, Angular giới thiệu hàm `output()` như một giải pháp thay thế hiện đại, giúp giảm thiểu việc sử dụng decorator và đồng bộ cú pháp với hàm `input()` (Signals).

### 1. Khái niệm và Cú pháp

Hàm `output()` giúp khai báo một sự kiện đầu ra mà không cần khởi tạo thủ công đối tượng `EventEmitter`.

**Cách thực hiện:**

1. Import `output` từ `@angular/core`.
    
2. Gán kết quả của hàm `output()` cho thuộc tính thay vì dùng decorator.
    
3. Sử dụng Generics `<Type>` để định nghĩa kiểu dữ liệu sẽ được `emit`.
    

**Ví dụ mã nguồn:**

TypeScript

```
import { Component, output } from '@angular/core';

@Component({ ... })
export class UserComponent {
  // Cũ: @Output() select = new EventEmitter<string>();
  
  // Mới: Sử dụng hàm output()
  // <string> báo cho TypeScript biết dữ liệu emit sẽ là chuỗi
  select = output<string>(); 

  onSelectUser() {
    // Cách sử dụng vẫn giữ nguyên
    this.select.emit(this.id); 
  }
}
```

### 2. Đặc điểm kỹ thuật quan trọng

- **Không phải là Signal:** Khác với hàm `input()` tạo ra một Signal, hàm `output()` **không** tạo ra Signal. Cơ chế bên dưới vẫn là `EventEmitter`.
    
- **An toàn kiểu (Type Safety):** Cần khai báo kiểu dữ liệu (ví dụ `<string>`) để tránh lỗi TypeScript (như lỗi: _argument of type string is not assignable to parameter of type void_).
    
- **Tương thích ngược:**
    
    - Cách gọi `.emit()` trong component con không đổi.
        
    - Cách lắng nghe sự kiện `(select)="..."` ở component cha không đổi.
        

### 3. So sánh với `@Output` Decorator

|**Đặc điểm**|**@Output Decorator (Truyền thống)**|**Hàm output() (Hiện đại)**|
|---|---|---|
|**Cú pháp**|`@Output() prop = new EventEmitter();`|`prop = output();`|
|**Độ dài mã**|Dài hơn, cần import `EventEmitter`|Ngắn gọn hơn|
|**Phong cách**|Dùng Decorator|Functional (không dùng Decorator)|
|**Bản chất**|Tạo `EventEmitter`|Tạo `OutputEmitterRef` (tương tự EventEmitter)|
|**Mức độ phổ biến**|Rất cao (Hầu hết dự án hiện tại)|Thấp (Mới xuất hiện)|

### 4. Khi nào nên sử dụng?

- **Lý do sử dụng:** Giúp mã nguồn gọn gàng hơn, loại bỏ bớt decorator trong class, đồng bộ phong cách code nếu dự án đã sử dụng `input()` dạng Signal.
    
- **Thực tế:** Hầu hết các dự án Angular hiện tại và các tài liệu hướng dẫn vẫn sử dụng `@Output` truyền thống. Do đó, người học cần nắm vững cả hai, nhưng `@Output` vẫn là tiêu chuẩn phổ biến nhất hiện nay.