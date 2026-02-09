## Signal Inputs trong Angular

Bên cạnh cách sử dụng decorator `@Input` truyền thống, Angular hiện đại cung cấp một phương pháp thay thế để quản lý dữ liệu đầu vào thông qua **Tín hiệu (Signals)**. Phương pháp này giúp tăng tính phản ứng (reactivity) và hiệu suất của ứng dụng.

### 1. Khởi tạo Signal Input

Để sử dụng, cần import hàm `input` (viết thường, phân biệt với decorator `@Input`) từ gói `@angular/core`.

#### Cú pháp cơ bản

Thay vì dùng decorator, ta gán giá trị cho thuộc tính bằng kết quả của hàm `input()`.

- **Có giá trị mặc định:**
    
    TypeScript
    
    ```
    import { input } from '@angular/core';
    
    // avatar sẽ là một Signal chứa string
    // Nếu không có input từ cha, giá trị khởi tạo là chuỗi rỗng
    avatar = input(''); 
    ```
    
- **Không có giá trị mặc định (Sử dụng Generic Type):**
    
    Sử dụng cú pháp _kiểu tổng quát (generic type)_ của TypeScript `<...>` để định nghĩa kiểu dữ liệu sẽ nhận được trong tương lai.
    
    TypeScript
    
    ```
    // avatar có giá trị khởi tạo là undefined, nhưng TypeScript hiểu nó sẽ chứa string
    avatar = input<string>(); 
    ```
    
- **Input bắt buộc (Required Input):**
    
    Sử dụng biến thể `input.required`. Khi dùng cách này, không được truyền giá trị khởi tạo vì Angular đảm bảo giá trị sẽ được truyền từ bên ngoài.
    
    TypeScript
    
    ```
    // Bắt buộc phải có giá trị input truyền vào
    name = input.required<string>();
    ```
    

### 2. Ưu điểm so với `@Input` truyền thống

- **An toàn về kiểu (Type Safety):** Không cần sử dụng dấu chấm than khẳng định (non-null assertion operator `!`) như `name!: string`. Về mặt kỹ thuật, `avatar` và `name` luôn có giá trị (là các đối tượng Signal), giúp TypeScript không báo lỗi.
    
- **Tối ưu hóa hiệu suất:** Angular tự động quản lý việc cập nhật UI và tính toán lại các giá trị phụ thuộc một cách hiệu quả hơn thông qua cơ chế Signal.
    

### 3. Cách sử dụng trong Component

Vì `avatar` và `name` hiện tại là **Signals**, cách truy xuất và xử lý dữ liệu sẽ thay đổi:

#### Trong Logic (TypeScript)

- Phải gọi như một hàm để lấy giá trị: `this.avatar()`.
    
- Nên sử dụng kết hợp với `computed` thay vì `getters` để tạo ra các giá trị dẫn xuất (derived values). `computed` chỉ tính toán lại khi Signal phụ thuộc thay đổi.
    
    TypeScript
    
    ```
    import { computed } from '@angular/core';
    
    // imagePath sẽ tự động cập nhật khi avatar thay đổi
    imagePath = computed(() => {
        return 'assets/users/' + this.avatar();
    });
    ```
    

#### Trong Template (HTML)

- Phải thực thi như một hàm để đọc giá trị Signal và thiết lập subscription ngầm định.
    
    HTML
    
    ```
    <img [src]="imagePath()" [alt]="name()" />
    ```
    

### 4. Đặc tính quan trọng: Read-only (Chỉ đọc)

- **Signal Inputs là chỉ đọc (Read-only signals):**
    
    - Bạn **không thể** thay đổi giá trị của chúng từ bên trong Component (ví dụ: gọi `this.avatar.set(...)` sẽ gây lỗi).
        
    - Giá trị chỉ thay đổi khi Component cha truyền vào giá trị mới.
        

### 5. Tương tác với Component cha

Dù thay đổi cách khai báo bên trong Component con, cách sử dụng từ phía Component cha (ví dụ: `app.component`) **không thay đổi**.

- Vẫn sử dụng cú pháp property binding `[]` bình thường.
    
- Giá trị truyền vào **không nhất thiết** phải là Signal (có thể truyền biến thường, hardcoded string, v.v.).
    

HTML

```
<app-user [name]="user.name" [avatar]="user.avatar"></app-user>
```

### Tổng kết

|**Đặc điểm**|**@Input Decorator (Cũ)**|**input() Signal (Mới)**|
|---|---|---|
|**Khai báo**|`@Input() name!: string;`|`name = input.required<string>();`|
|**Truy cập**|`this.name`|`this.name()`|
|**Tính phản ứng**|Cần `ngOnChanges` hoặc Setter|Tự động, tích hợp tốt với `computed`|
|**Thay đổi giá trị**|Có thể gán lại trong component|**Read-only** (Bất biến trong component)|
|**Độ phổ biến**|Rất cao (Legacy code)|Đang tăng dần (Modern Angular)|

> **Lưu ý:** Mặc dù Signal Inputs mạnh mẽ hơn, khóa học vẫn sẽ hướng dẫn song song cả cách dùng `@Input` truyền thống vì phần lớn các dự án hiện tại vẫn đang sử dụng cách này.