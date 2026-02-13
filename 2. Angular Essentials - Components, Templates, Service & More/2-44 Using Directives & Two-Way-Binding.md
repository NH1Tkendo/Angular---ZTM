## Xử lý Dữ liệu Nhập với Two-Way Binding

Để thu thập dữ liệu từ các trường nhập liệu (input fields) và vùng văn bản (textarea) khi người dùng thao tác, Angular cung cấp cơ chế **Ràng buộc hai chiều (Two-Way Binding)**. Đây là sự kết hợp giữa ràng buộc thuộc tính (Property Binding) và ràng buộc sự kiện (Event Binding).

### 1. Cơ chế hoạt động

- **Two-Way Binding** cho phép cập nhật dữ liệu đồng thời ở hai nơi:
    
    1. Cập nhật biến trong Component khi người dùng gõ vào ô input (View $\to$ Logic).
        
    2. Cập nhật giá trị hiển thị trên ô input khi biến trong Component thay đổi (Logic $\to$ View).
        
- **Cú pháp**: `[(ngModel)]="tên_biến"`.
    
    - Thường được gọi là cú pháp "Banana in a box" `[()]`.
        

### 2. Các bước thực hiện

#### Bước 1: Khai báo thuộc tính trong Component Class

Trong file TypeScript (ví dụ `new-task.component.ts`), khai báo các thuộc tính để lưu trữ giá trị nhập vào.

TypeScript

```
export class NewTaskComponent {
  // Khởi tạo giá trị mặc định là chuỗi rỗng
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = ''; 
}
```

> **Lưu ý về kiểu dữ liệu**: Dữ liệu từ thẻ `<input type="date">` trong HTML luôn trả về một **chuỗi (string)**, không phải đối tượng Date. Do đó, `enteredDate` nên được khai báo là `string`.

#### Bước 2: Đăng ký FormsModule (Quan trọng)

`ngModel` không phải là thuộc tính có sẵn của HTML mà là một **Chỉ thị (Directive)** của Angular. Để sử dụng, cần import `FormsModule`.

Tại file component (hoặc module tương ứng):

1. Import `FormsModule` từ `@angular/forms`.
    
2. Thêm vào mảng `imports`.
    

TypeScript

```
import { FormsModule } from '@angular/forms'; // 1. Import

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, ...], // 2. Đăng ký module
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent { ... }
```

_Nếu bỏ qua bước này, Angular sẽ báo lỗi: "Can't bind to ngModel since it isn't a known property of input"._

#### Bước 3: Áp dụng trong Template

Sử dụng cú pháp `[(ngModel)]` để liên kết các thẻ input với thuộc tính đã khai báo.

**File `new-task.component.html`**:

HTML

```
<p>
  <label for="title">Title</label>
  <input 
    type="text" 
    id="title" 
    name="title" 
    [(ngModel)]="enteredTitle" />
</p>

<p>
  <label for="summary">Summary</label>
  <textarea 
    id="summary" 
    name="summary" 
    rows="5"
    [(ngModel)]="enteredSummary">
  </textarea>
</p>

<p>
  <label for="date">Due Date</label>
  <input 
    type="date" 
    id="date" 
    name="date" 
    [(ngModel)]="enteredDate" />
</p>
```

### 3. Ghi chú về Chỉ thị (Directives)

Trong quá trình sử dụng `ngModel`, cần hiểu rõ khái niệm **Chỉ thị (Directive)** trong Angular:

- **Định nghĩa**: Directive là các tính năng mở rộng do Angular cung cấp (hoặc tự xây dựng) để thêm hành vi hoặc tính năng cho các phần tử HTML.
    
- **Phân loại cơ bản**:
    
    - **Component**: Thực chất là một directive có template (giao diện).
        
    - **Directive thông thường** (như `ngModel`): Chỉ thêm hành vi/thuộc tính cho phần tử mà không có template riêng.
        
- `ngModel` là một directive có sẵn giúp truy cập và quản lý dữ liệu nhập vào từ form một cách dễ dàng thông qua cơ chế Two-Way Binding.