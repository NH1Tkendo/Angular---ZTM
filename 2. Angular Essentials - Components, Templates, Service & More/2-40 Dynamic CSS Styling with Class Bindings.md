## Hiển thị Trạng thái Active & Binding Class có Điều kiện (Conditional Class Binding)

Bài học này hướng dẫn cách làm nổi bật (highlight) người dùng đang được chọn trên giao diện bằng cách sử dụng **ràng buộc lớp CSS (Class Binding)** dựa trên điều kiện logic.

### 1. Cập nhật Logic Component Con (Child Component)

Đầu tiên, component con (`UserComponent`) cần biết liệu nó có đang được chọn hay không. Ta thực hiện điều này bằng cách thêm một thuộc tính đầu vào (Input property) mới.

- **File**: `user.component.ts`
    
- **Thao tác**: Thêm property `selected` với kiểu dữ liệu `boolean`.
    
- **Lưu ý**: Đánh dấu là `required: true` để đảm bảo giá trị này luôn được truyền vào.
    

TypeScript

```
import { Component, Input } from '@angular/core';

@Component({ ... })
export class UserComponent {
  // ... các input khác
  
  // Nhận trạng thái true/false từ cha
  @Input({ required: true }) selected!: boolean; 
}
```

### 2. Xác định Trạng thái từ Component Cha (Parent Component)

Component cha (`AppComponent`) nắm giữ thông tin về người dùng đang được chọn (`selectedUserId`). Ta cần so sánh ID của người dùng hiện tại trong vòng lặp với ID đang được chọn để xác định giá trị `true` hoặc `false`.

- **File**: `app.component.html`
    
- **Logic**: `selected = (user.id === selectedUserId)`
    

HTML

```
<app-user 
  [user]="user"
  [selected]="user.id === selectedUserId" 
  (select)="onSelectUser($event)"
/>
```

### 3. Binding Class trong Template (Template Syntax)

Angular cung cấp một cú pháp đặc biệt để thêm hoặc gỡ bỏ một lớp CSS dựa trên giá trị boolean.

- **Cú pháp**: `[class.ten-class]="bieu-thuc-boolean"`
    
- **File**: `user.component.html`
    
- **Ứng dụng**: Thêm class `active` (đã được định nghĩa sẵn CSS để làm nổi bật) nếu thuộc tính `selected` là `true`.
    

HTML

```
<button [class.active]="selected" (click)="onSelectUser()">
  </button>
```

### 📝 Tóm tắt quy trình

1. **UserComponent**: Chờ nhận tín hiệu `selected` (true/false).
    
2. **AppComponent**: Tính toán logic `user.id === selectedUserId` và gửi kết quả vào `UserComponent`.
    
3. **Template User**: Nếu `selected` là `true`, Angular tự động thêm class CSS `active` vào phần tử HTML; nếu `false`, class này sẽ bị gỡ bỏ.