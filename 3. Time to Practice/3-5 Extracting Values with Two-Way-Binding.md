## Thiết lập Liên kết hai chiều (Two-Way Binding) cho Input

### Khái niệm cơ bản

- **Liên kết hai chiều (Two-Way Binding)** là sự kết hợp giữa **liên kết thuộc tính (Property Binding)** và **liên kết sự kiện (Event Binding)**.
    
- **Mục đích**: Cho phép đồng bộ dữ liệu theo hai hướng:
    
    - Gửi dữ liệu từ mã nguồn (code) vào phần tử hiển thị (element).
        
    - Lấy giá trị từ phần tử đó ra ngoài mã nguồn ngay khi có sự thay đổi (ví dụ: người dùng nhập liệu).
        
- Trình duyệt web mặc định không có sẵn thuộc tính hỗ trợ liên kết hai chiều cho các phần tử tiêu chuẩn. Bạn phải tự xây dựng cơ chế này cho các **thành phần (components)** tự tạo, hoặc sử dụng các công cụ có sẵn của khung làm việc (framework).
    

### Chỉ thị ngModel (ngModel Directive)

- Để mở khóa tính năng liên kết hai chiều cho các phần tử HTML có sẵn như `<input>` hoặc `<textarea>`, Angular cung cấp **chỉ thị (directive)** `ngModel`.
    
- **Điều kiện sử dụng**: `ngModel` chỉ khả dụng khi bạn đã import `FormsModule` vào ứng dụng.
    
- **Cú pháp**: Sử dụng cặp ngoặc vuông bọc ngoài cặp ngoặc đơn `[(ngModel)]="tên_thuộc_tính"`. Cú pháp này sẽ lắng nghe sự thay đổi giá trị của ô input để cập nhật thuộc tính, đồng thời nếu thuộc tính bị thay đổi từ nơi khác trong mã, ô input cũng sẽ được cập nhật tương ứng.
    

---

### Hướng dẫn thao tác & Mã nguồn (Code)

#### 1. Khai báo thuộc tính trong tệp TypeScript (`.ts`)

Tạo các thuộc tính bên trong lớp (class) của **thành phần người dùng nhập liệu (User Input Component)** để lưu trữ dữ liệu.

_Lưu ý quan trọng về kiểu dữ liệu_: Giá trị nhận được từ thẻ `<input>` luôn luôn là **chuỗi (string)**, ngay cả khi người dùng nhập số. Do đó, các giá trị khởi tạo cũng nên được đặt dưới dạng chuỗi chứa các con số trước khi được chuyển đổi thành số thực tế (number) cho việc tính toán sau này. Đoạn mã này hiện không sử dụng **Tín hiệu (Signals)**.

TypeScript

```
export class UserInputComponent {
  // Khởi tạo các giá trị mặc định bằng chuỗi (string)
  enteredInitialInvestment = '0';
  enteredAnnualInvestment = '0';
  enteredExpectedReturn = '5'; // Mặc định tỷ suất lợi nhuận kỳ vọng là 5%
  enteredDuration = '10';      // Mặc định thời gian là 10
  
  // Hàm kiểm tra khi người dùng bấm nút tính toán
  onCalculate() {
    console.log(this.enteredInitialInvestment);
    console.log(this.enteredAnnualInvestment);
    console.log(this.enteredExpectedReturn);
    console.log(this.enteredDuration);
  }
}
```

#### 2. Cấu hình giao diện trong tệp HTML (`.html`)

Sử dụng cú pháp `[(ngModel)]` để liên kết các thuộc tính vừa tạo với thẻ `<input>`.

**Lỗi thường gặp (Error)**: Nếu sử dụng `ngModel` bên trong thẻ `<form>`, Angular bắt buộc thẻ `<input>` đó phải có **thuộc tính tên (name attribute)**. Nếu thiếu, console sẽ báo lỗi. Cách giải quyết đơn giản nhất là đặt giá trị của `name` giống với `id`.

HTML

```
<input 
  id="initial-investment" 
  name="initial-investment" 
  [(ngModel)]="enteredInitialInvestment" 
/>

<input 
  id="annual-investment" 
  name="annual-investment" 
  [(ngModel)]="enteredAnnualInvestment" 
/>

<input 
  id="expected-return" 
  name="expected-return" 
  [(ngModel)]="enteredExpectedReturn" 
/>

<input 
  id="duration" 
  name="duration" 
  [(ngModel)]="enteredDuration" 
/>
```

### Kết quả (Behavior)

Sau khi thiết lập và lưu lại:

1. Giao diện web sẽ tự động điền (pre-populate) các giá trị mặc định (`5`, `10`) vào các ô input tương ứng nhờ dữ liệu được đẩy từ TypeScript ra HTML.
    
2. Khi người dùng thay đổi các con số trên giao diện và thực hiện hành động (nhấn nút Calculate), dữ liệu mới sẽ được cập nhật ngược lại vào các biến trong mã TS, có thể kiểm chứng thông qua `console.log`.