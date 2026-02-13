## TypeScript trong Phát triển Ứng dụng: Xử lý Dữ liệu Không xác định

### 1. Vai trò của Typing trong TypeScript

Lợi ích cốt lõi của TypeScript là áp dụng **Kiểu dữ liệu tĩnh và mạnh** _(Strong and Static Typing)_. Điều này buộc người phát triển phải minh bạch về loại giá trị được sử dụng ở mọi vị trí trong mã nguồn.

- **Mục tiêu**: Ngăn ngừa lỗi thực thi _(Runtime errors)_ trước khi ứng dụng được triển khai.
    
- **Cơ chế**: TypeScript cảnh báo nếu một biến có khả năng mang giá trị không mong muốn (ví dụ: `undefined`) trước khi bạn truy cập vào thuộc tính của nó.
    

---

### 2. Xử lý giá trị có thể bị Undefined

Khi sử dụng các hàm như `.find()`, kết quả trả về có thể là một đối tượng hoặc `undefined` nếu không tìm thấy phần tử thỏa mãn điều kiện.

#### a. Toán tử khẳng định không null (Non-null Assertion Operator - `!`)

- **Cách dùng**: Thêm dấu chấm than `!` sau một biến.
    
- **Ý nghĩa**: Thông báo với TypeScript rằng: _"Tôi (lập trình viên) chắc chắn giá trị này sẽ không bao giờ là null hoặc undefined tại đây"_.
    
- **Rủi ro**: Đây không phải là cách giải quyết triệt để. Nếu thực tế giá trị vẫn bị `undefined` lúc chạy, ứng dụng sẽ bị sập _(crash)_.
    
- **Trường hợp sử dụng an toàn**: Khi thuộc tính đã được đánh dấu là `required` (bắt buộc) trong cấu hình Input của Component.
    

#### b. Thuộc tính tùy chọn (Optional Properties - `?`)

- **Cách dùng**: Thêm dấu hỏi chấm `?` sau tên biến khi khai báo hoặc khi truy cập.
    
- **Ý nghĩa**:
    
    - Trong khai báo: Báo cho TypeScript rằng biến này có thể chưa được khởi tạo hoặc không có giá trị.
        
    - Trong truy cập (Optional Chaining): Nếu đối tượng tồn tại thì truy cập thuộc tính, nếu không sẽ trả về `undefined` thay vì gây lỗi.
        

---

### 3. Kiểu dữ liệu hợp (Union Types)

Đây là một tính năng quan trọng để xử lý nhiều loại giá trị cho một biến.

- **Ký hiệu**: Sử dụng dấu gạch đứng `|` (pipe symbol).
    
- **Cú pháp**:
    
    TypeScript
    
    ```
    // Ví dụ: name có thể là chuỗi hoặc không xác định
    let name: string | undefined;
    ```
    
- **Tác dụng**: Tạo ra một kiểu dữ liệu mới chấp nhận nhiều hình thái giá trị khác nhau. Đây là cách tường minh hơn thay vì chỉ dùng dấu `?`.
    

---

### 4. Các phương pháp thay thế an toàn (Fallback)

Thay vì dùng `!`, ta nên sử dụng các phương pháp dự phòng để mã nguồn bền vững hơn:

- **Sử dụng Toán tử ba ngôi (Ternary Expression)**:
    
    TypeScript
    
    ```
    // Kiểm tra nếu có user thì lấy tên, không thì trả về chuỗi rỗng
    const userName = selectedUser ? selectedUser.name : '';
    ```
    
- **Sử dụng Optional Chaining kết hợp với hiển thị**: Khi dùng trong template (như Angular/React), việc để giá trị là `undefined` đôi khi không gây lỗi giao diện mà chỉ đơn giản là không hiển thị gì, điều này an toàn hơn là sập ứng dụng.
    

---

### Ghi chú quan trọng

> [!IMPORTANT]
> 
> - Hãy thận trọng với dấu `!`. Chỉ sử dụng khi bạn hoàn toàn kiểm soát được luồng dữ liệu.
>     
> - Ưu tiên sử dụng **Union Types** hoặc **Optional Chaining** để xử lý các tình huống dữ liệu không chắc chắn (ví dụ: kết quả tìm kiếm, dữ liệu từ API).
>