## Tính toán Kết quả Đầu tư và Các Phương pháp Triển khai

### Lựa chọn Nơi Đặt Logic Tính toán

Sau khi thu thập được dữ liệu từ người dùng, bước tiếp theo là xử lý và tính toán kết quả (dựa trên tệp `investment-results.ts` đã được cung cấp). Trong Angular, có hai phương pháp chính để quản lý đoạn mã logic này:

- **Phương pháp 1: Tính toán bên trong Thành phần (In-Component Calculation)**: Đặt logic tính toán trực tiếp vào một _thành phần (component)_ (ví dụ: `AppComponent`). Dữ liệu đầu vào sẽ được truyền từ thành phần nhập liệu đến thành phần chứa logic, sau đó kết quả lại được truyền tới thành phần hiển thị (ví dụ: bảng kết quả).
    
- **Phương pháp 2: Sử dụng Dịch vụ (Service)**: Đây là cách tiếp cận được khuyến khích hơn và mang lại nhiều lợi thế trong việc quản lý trạng thái, nhưng sẽ được đề cập chi tiết ở phần sau.
    

Bài học này sẽ bắt đầu bằng việc triển khai **Phương pháp 1** trước để bạn nắm vững các tính năng cơ bản của Angular khi truyền dữ liệu giữa các thành phần.

---

### Cấu hình Logic trong AppComponent

Chúng ta sẽ sao chép đoạn mã tính toán vào tệp TypeScript của `AppComponent` dưới dạng một phương thức (method).

#### 1. Xử lý Tham số Đầu vào

Phương thức này cần nhận 4 giá trị đầu vào: vốn đầu tư ban đầu, thời gian, lợi nhuận kỳ vọng và khoản đầu tư hàng năm.

- **Lưu ý về Kiểu dữ liệu**: Dù dữ liệu lấy từ giao diện (inputs) là chuỗi, chúng ta yêu cầu các tham số ở đây phải là **số (number)**. Việc chuyển đổi kiểu dữ liệu sẽ được thực hiện ở một bước khác.
    
- **Tối ưu hóa Cấu trúc Tham số**: Thay vì truyền 4 tham số riêng lẻ (rất dễ gây lỗi do phải nhớ đúng thứ tự truyền), chúng ta sẽ gộp chúng lại thành một **đối tượng (object)** duy nhất có tên là `data`.
    

#### 2. Định nghĩa Kiểu (Type Definition) và Phân rã (Destructuring)

Khi truyền một đối tượng, chúng ta cần định nghĩa rõ hình dáng (shape) của đối tượng đó. Sau đó, bên trong phương thức, sử dụng _cú pháp phân rã (destructuring syntax)_ của JavaScript để bóc tách các thuộc tính ra thành các hằng số riêng biệt nhằm phục vụ cho việc tính toán.

### Mã nguồn (Code)

Dưới đây là cách triển khai phương thức bên trong tệp TypeScript của `AppComponent`:

TypeScript

```
export class AppComponent {
  
  // Phương thức nhận vào một đối tượng data với định nghĩa kiểu cụ thể
  calculateInvestmentResults(data: {
    initialInvestment: number;
    duration: number;
    expectedReturn: number;
    annualInvestment: number;
  }) {
    // Sử dụng cú pháp phân rã (destructuring syntax) để trích xuất dữ liệu
    const { 
      initialInvestment, 
      annualInvestment, 
      expectedReturn, 
      duration 
    } = data;

    // ... (Đoạn mã vòng lặp tính toán chi tiết hàng năm từ investment-results.ts sẽ được đặt ở đây)
    
    // return annualData;
  }
}
```

### Ghi chú thêm

Hiện tại, phương thức `calculateInvestmentResults` này mới chỉ được định nghĩa cấu trúc nhận dữ liệu đầu vào. Nó chưa được gọi (call) và việc `return` kết quả cũng chưa thực sự có tác động lên giao diện. Đây là bước đệm quan trọng để thiết lập luồng xử lý dữ liệu.