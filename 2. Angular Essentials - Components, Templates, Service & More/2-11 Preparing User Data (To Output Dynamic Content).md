## Làm việc với Dữ liệu động (Dynamic Data)

### 1. Chuẩn bị Dữ liệu và Tài nguyên

Để chuẩn bị cho việc hiển thị dữ liệu thực tế, bạn cần thiết lập hai thành phần quan trọng:

- **Dữ liệu giả (Dummy Data):** Sao chép tệp `dummy-users.ts` vào thư mục `src/app`. Tệp này chứa một mảng các đối tượng người dùng, ví dụ:
    
    TypeScript
    
    ```
    {
      id: 'u1',
      name: 'Jasmine Washington',
      avatar: 'user-1.jpg'
    }
    ```
    
- **Hình ảnh (Assets):** Tải và giải nén các tệp ảnh vào thư mục `src/assets/users`. Tên tệp ảnh phải khớp với định danh `avatar` trong tệp dữ liệu giả.
    

---

### 2. Khái niệm về Nội dung động trong Angular

Từ trước đến nay, chúng ta chỉ viết **Markup tĩnh** (Markup không thay đổi). Để ứng dụng có thể hiển thị các người dùng khác nhau với cùng một bộ khung HTML, chúng ta cần sử dụng các tính năng của Angular để:

- Lưu trữ trạng thái (State) của dữ liệu trong tệp TypeScript.
    
- Liên kết dữ liệu đó với tệp HTML.
    

---

### 3. Logic lấy người dùng ngẫu nhiên

Trong tệp `user.component.ts`, chúng ta sẽ cần thực hiện logic để chọn ra một người dùng ngẫu nhiên từ danh sách `DUMMY_USERS`.

**Ví dụ về logic xử lý:**

Giả sử ta có mảng người dùng, chỉ số ngẫu nhiên $i$ sẽ được tính toán dựa trên độ dài của mảng $n$:

$$i = \lfloor \text{Math.random()} \times n \rfloor$$

Trong đó:

- $n$: Tổng số người dùng trong danh sách.
    
- $i$: Vị trí của người dùng được chọn trong mảng (bắt đầu từ 0).
    

---

### 4. Cấu trúc Component sẵn sàng cho dữ liệu

Chúng ta sẽ thay đổi tệp `user.component.ts` để nạp dữ liệu:

TypeScript

```
import { Component } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';

const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  selectedUser = DUMMY_USERS[randomIndex]; // Lấy ngẫu nhiên 1 user
}
```

---

### 5. Dự kiến về thay đổi Markup

Ở bài học tiếp theo, chúng ta sẽ thay thế các thuộc tính tĩnh bằng các cú pháp đặc biệt của Angular:

- Thay `src="..."` bằng **Property Binding** `[src]="..."`.
    
- Thay `Tên người dùng` bằng **Interpolation** `{{ ... }}`.