## Khai báo Thuộc tính và Xử lý Logic trong Component

### 1. Thêm Thuộc tính vào Class (Component Property)

Trong Angular, tất cả các biến (được gọi là **thuộc tính - properties**) mà bạn khai báo bên trong Class của Component sẽ tự động có quyền truy cập được từ tệp Template (HTML) tương ứng.

- **Cách khai báo**: Trong thân Class, bạn viết tên biến và gán giá trị mà không cần dùng từ khóa `let` hoặc `const`.
    
- **Mục đích**: Lưu trữ dữ liệu để hiển thị lên giao diện hoặc xử lý logic.
    

---

### 2. Thực hiện Logic lấy dữ liệu ngẫu nhiên

Để lấy một người dùng ngẫu nhiên từ danh sách dữ liệu mẫu, chúng ta thực hiện các bước sau trong tệp `user.component.ts`:

**Bước 1: Import dữ liệu**

Cần đi ngược ra ngoài một cấp thư mục để truy cập tệp dữ liệu:

TypeScript

```
import { DUMMY_USERS } from '../dummy-users';
```

**Bước 2: Tính toán chỉ số ngẫu nhiên**

Tạo một hằng số hỗ trợ bên ngoài Class để tính toán vị trí:

TypeScript

```
const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
```

**Bước 3: Gán giá trị cho thuộc tính của Class**

Sử dụng chỉ số vừa tính được để chọn ra người dùng:

TypeScript

```
export class UserComponent {
  selectedUser = DUMMY_USERS[randomIndex]; 
}
```

---

### 3. Cơ chế kết nối Dữ liệu (Data Connection)

Angular thiết lập một cầu nối giữa Class và Template. Bất cứ khi nào bạn định nghĩa một thuộc tính như `selectedUser`, Angular sẽ cho phép Template "nhìn thấy" đối tượng đó.

- **Phạm vi (Scope)**: Chỉ những thuộc tính khai báo trong `UserComponent` mới được sử dụng trong `user.component.html`.
    
- **Dữ liệu khả dụng**: Hiện tại, `selectedUser` là một đối tượng chứa các thông tin: `id`, `name`, và `avatar`.
    

---

### 4. Công thức tính chỉ số mảng ngẫu nhiên

Để đảm bảo chỉ số luôn nằm trong phạm vi của mảng, chúng ta sử dụng công thức:

$$I = \lfloor R \times L \rfloor$$

Trong đó:

- $I$: Chỉ số ngẫu nhiên (`randomIndex`).
    
- $R$: Giá trị ngẫu nhiên từ $0$ đến sát $1$ (`Math.random()`).
    
- $L$: Độ dài của mảng dữ liệu (`DUMMY_USERS.length`).
    

---

### 5. Preview: Hiển thị dữ liệu ra HTML

Ở bước tiếp theo, chúng ta sẽ sử dụng cú pháp **Interpolation** (Nội suy) để đưa tên người dùng vào thẻ `<span>`. Cú pháp này có dạng:

`{{ selectedUser.name }}`