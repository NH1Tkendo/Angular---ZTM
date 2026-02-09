## Bài tập: Tạo Component Tác vụ và Truyền Dữ liệu (Tasks Component Exercise)

Mục tiêu của bài tập này là thực hành tạo một component mới (`TasksComponent`) để hiển thị tên của người dùng đang được chọn. Dữ liệu này được quản lý tại component cha (`AppComponent`) và truyền xuống component con.

### 1. Khởi tạo Component

Sử dụng Angular CLI để tạo nhanh component và bỏ qua file kiểm thử (test file) nếu không cần thiết.

- **Lệnh CLI:**
    
    Bash
    
    ```
    ng g c tasks --skip-tests
    ```
    
    - `g`: generate
        
    - `c`: component
        
    - `--skip-tests`: Không tạo file `spec.ts`
        

### 2. Cấu hình Component Con (`TasksComponent`)

Component này có nhiệm vụ nhận tên người dùng từ cha và hiển thị nó.

#### Logic (TypeScript)

Sử dụng `@Input` để nhận dữ liệu. Cấu hình `required: true` để đảm bảo luôn có dữ liệu đầu vào.

TypeScript

```
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tasks',
  // ...
})
export class TasksComponent {
  // Nhận tên người dùng, bắt buộc phải có
  @Input({ required: true }) name!: string;
}
```

#### Giao diện (HTML)

Hiển thị tên người dùng bằng cách sử dụng **nội suy chuỗi** (string interpolation).

HTML

```
<h2>Tasks for {{ name }}</h2>
```

### 3. Cấu hình Component Cha (`AppComponent`)

Component cha cần theo dõi người dùng nào đang được chọn và tính toán thông tin chi tiết của người dùng đó để truyền xuống con.

#### Quản lý trạng thái (State Management)

Cần lưu trữ ID của người dùng đang được chọn thay vì chỉ `console.log`.

TypeScript

```
export class AppComponent {
  // ... khai báo users ...
  
  // Trạng thái lưu ID người dùng được chọn (khởi tạo mặc định u1)
  selectedUserId = 'u1'; 

  // Hàm cập nhật trạng thái khi click
  onSelectUser(id: string) {
    this.selectedUserId = id;
  }
}
```

#### Tính toán dữ liệu (Computed Values)

Sử dụng **Getter** để tự động tìm đối tượng `user` đầy đủ dựa trên `selectedUserId` hiện tại.

Phương thức `Array.prototype.find()` được sử dụng để tìm phần tử trong mảng thỏa mãn điều kiện:

$$u \in Users \mid u.id \equiv selectedUserId$$

TypeScript

```
get selectedUser() {
  // Tìm user có id trùng với selectedUserId
  return this.users.find((user) => user.id === this.selectedUserId)!;
}
```

> **Lưu ý về TypeScript (`!`):**
> 
> Hàm `.find()` có thể trả về `undefined` nếu không tìm thấy phần tử. Vì `TasksComponent` yêu cầu `name` phải là `string` (không được `undefined`), ta dùng **toán tử khẳng định không null** (`!`) ở cuối dòng lệnh `.find()!` để cam kết với TypeScript rằng kết quả sẽ luôn tồn tại.

### 4. Kết nối trong Template (`app.component.html`)

Sử dụng component mới tạo và truyền dữ liệu thông qua **ràng buộc thuộc tính** (property binding).

1. **Import:** Đảm bảo `TasksComponent` đã được thêm vào mảng `imports` của `AppComponent`.
    
2. **Sử dụng thẻ:**
    
    HTML
    
    ```
    <app-tasks [name]="selectedUser.name"></app-tasks>
    ```
    

### Kết quả

Khi người dùng nhấp vào danh sách người dùng bên trái (`onSelectUser` kích hoạt), `selectedUserId` thay đổi. Getter `selectedUser` tự động tính toán lại, cập nhật `name` và truyền xuống `<app-tasks>`, làm thay đổi nội dung hiển thị trên giao diện ngay lập tứ