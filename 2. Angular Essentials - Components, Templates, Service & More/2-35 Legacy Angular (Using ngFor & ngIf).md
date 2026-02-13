## Cú pháp cũ: Chỉ thị Cấu trúc (Structural Directives)

### 1. Bối cảnh

- Các cú pháp `@for` và `@if` mới chỉ được giới thiệu từ **Angular 17**.
    
- Các phiên bản cũ hơn sử dụng **chỉ thị cấu trúc (structural directives)**: `*ngFor` và `*ngIf`.
    
- Kiến thức này cần thiết khi làm việc với các dự án cũ hoặc bảo trì mã nguồn hiện có.
    

### 2. Khái niệm Chỉ thị Cấu trúc

- Là các chỉ thị thay đổi cấu trúc DOM bằng cách thêm hoặc xóa các phần tử HTML.
    
- Luôn bắt đầu bằng dấu sao `*` (ví dụ: `*ngFor`, `*ngIf`).
    
- **Yêu cầu quan trọng**: Để sử dụng, phải import `NgFor` và `NgIf` từ gói `@angular/common` và thêm vào mảng `imports` của Component (đối với Standalone Components).
    

TypeScript

```
import { NgFor, NgIf } from '@angular/common';

@Component({
  // ...
  imports: [NgFor, NgIf] // Bắt buộc phải import để sử dụng
})
export class AppComponent { ... }
```

### 3. Vòng lặp với `*ngFor`

Thay vì `@for`, phiên bản cũ sử dụng `*ngFor` gắn trực tiếp lên thẻ HTML cần lặp.

**Cú pháp:**

HTML

```
<ul>
  <li *ngFor="let user of users">
    {{ user.name }}
  </li>
</ul>
```

### 4. Điều kiện với `*ngIf` và `ng-template`

Thay vì `@if` và `@else`, phiên bản cũ sử dụng `*ngIf` kết hợp với thẻ `<ng-template>` cho trường hợp `else`.

**Cú pháp cơ bản:**

HTML

```
<div *ngIf="selectedUser">
  {{ selectedUser!.name }}
</div>
```

**Cú pháp `else` (Phức tạp hơn):**

Để xử lý trường hợp `else`, cần sử dụng tham chiếu mẫu (template reference variable) và thẻ `<ng-template>`.

HTML

```
<div *ngIf="selectedUser; else fallback">
  {{ selectedUser!.name }}
</div>

<ng-template #fallback>
  <p>Select a user to see their tasks</p>
</ng-template>
```

### 5. So sánh: Cú pháp Mới vs Cũ

|**Đặc điểm**|**Cú pháp Mới (@if, @for)**|**Cú pháp Cũ (*ngIf, *ngFor)**|
|---|---|---|
|**Phiên bản**|Angular 17+|Các phiên bản cũ hơn|
|**Cài đặt**|Có sẵn (Built-in), không cần import|Phải import `NgIf`, `NgFor` từ `@angular/common`|
|**Độ dài mã**|Ngắn gọn, trực quan|Dài dòng, đặc biệt là `else` block|
|**Kiểu dữ liệu**|TypeScript tự động hiểu (Type narrowing tốt)|Thường cần dùng `!` (non-null assertion)|
|**Hiệu suất**|Tối ưu hơn|Cơ chế cũ|

### 6. Kết luận

- **Khuyến nghị**: Luôn ưu tiên dùng `@if` và `@for` cho các dự án mới (Angular 17+).
    
- **Lưu ý**: Cú pháp `*ngIf` và `*ngFor` vẫn được hỗ trợ nhưng rườm rà hơn do yêu cầu import và cấu trúc phức tạp.