## Giao tiếp giữa các Thành phần: Truyền Dữ liệu từ Con lên Cha (Child to Parent)

### Lý do Đặt Logic Tính toán ở Thành phần Cha (AppComponent)

Mặc dù nút bấm "Calculate" nằm ở **thành phần con (Child component)** là `UserInputComponent`, chúng ta vẫn giữ hàm tính toán ở **thành phần cha (Parent component)** là `AppComponent`.

- **Nguyên nhân**: Sắp tới, ứng dụng sẽ có thêm một thành phần hiển thị kết quả (Results component). Đặt logic ở thành phần cha giúp chúng ta dễ dàng lấy dữ liệu sau khi tính toán và truyền nó xuống thành phần kết quả.
    
- **Giải pháp**: Sử dụng **sự kiện tùy chỉnh (Custom event)** để gửi dữ liệu từ `UserInputComponent` lên `AppComponent`.
    

---

### Khởi tạo Sự kiện Tùy chỉnh với @Output

Để gửi dữ liệu ra bên ngoài thành phần, Angular cung cấp công cụ **Bộ phát sự kiện (Event Emitter)** kết hợp với **Trình trang trí đầu ra (Output decorator)**. _(Lưu ý: Từ Angular 17.3 trở lên, bạn có thể dùng hàm `output()`, nhưng cách dùng `@Output()` và `EventEmitter` vẫn phổ biến và an toàn nhất cho các dự án hiện tại)._

#### 1. Cấu hình tại UserInputComponent (Thành phần Con)

Trong tệp TypeScript của `UserInputComponent`, tạo một thuộc tính mới có gắn `@Output()` và định nghĩa rõ **kiểu dữ liệu (Type definition)** của đối tượng sẽ được phát ra.

TypeScript

```
import { Component, Output, EventEmitter } from '@angular/core';

export class UserInputComponent {
  // Định nghĩa sự kiện tùy chỉnh kèm theo cấu trúc dữ liệu phát ra
  @Output() calculate = new EventEmitter<{
    initialInvestment: number;
    duration: number;
    expectedReturn: number;
    annualInvestment: number;
  }>();

  // Khai báo các thuộc tính nhập liệu (đang ở dạng chuỗi)
  enteredInitialInvestment = '0';
  enteredAnnualInvestment = '0';
  enteredExpectedReturn = '5';
  enteredDuration = '10';

  onSubmit() {
    // Phát ra sự kiện và truyền dữ liệu. 
    // Dấu '+' dùng để chuyển đổi nhanh chuỗi (string) thành số (number)
    this.calculate.emit({
      initialInvestment: +this.enteredInitialInvestment,
      duration: +this.enteredDuration,
      expectedReturn: +this.enteredExpectedReturn,
      annualInvestment: +this.enteredAnnualInvestment
    });
  }
}
```

#### 2. Lắng nghe Sự kiện tại AppComponent (Thành phần Cha)

Khi thành phần con đã phát ra sự kiện `calculate`, thành phần cha cần **liên kết sự kiện (Event binding)** trên giao diện HTML để bắt lấy nó.

Trong tệp mẫu (template HTML) của `AppComponent`:

HTML

```
<app-user-input (calculate)="onCalculateInvestmentResults($event)"></app-user-input>
```

- **Biến `$event`**: Là biến đặc biệt mặc định của Angular, chứa toàn bộ dữ liệu (payload) mà `EventEmitter` từ thành phần con đã đính kèm khi phát ra.
    

#### 3. Xử lý Dữ liệu tại AppComponent

Trong tệp TypeScript của `AppComponent`, đổi tên hàm thành `onCalculateInvestmentResults` (theo quy ước đặt tên cho hàm xử lý sự kiện). Tạm thời chúng ta sẽ in kết quả ra màn hình console thay vì dùng lệnh `return`.

TypeScript

```
export class AppComponent {
  
  onCalculateInvestmentResults(data: {
    initialInvestment: number;
    duration: number;
    expectedReturn: number;
    annualInvestment: number;
  }) {
    const { initialInvestment, annualInvestment, expectedReturn, duration } = data;

    // ... (Thực hiện vòng lặp tính toán lãi kép hàng năm tại đây)
    
    // In mảng dữ liệu tính toán ra Console để kiểm tra
    console.log(annualData); 
  }
}
```

---

### Kiểm tra Kết quả (Testing)

Sau khi lưu và tải lại trang:

1. Nhập số liệu vào form và nhấn Calculate.
    
2. Mở Console của trình duyệt (F12).
    
3. Bạn sẽ thấy một mảng (array) chứa nhiều đối tượng. Nếu bạn nhập thời hạn là 10 năm, mảng sẽ có 10 phần tử.
    
4. Mỗi phần tử chứa dữ liệu chi tiết của một năm: số tiền đầu tư trong năm, tiền lãi đạt được, tổng tiền đầu tư, tổng lãi tích lũy và giá trị cuối cùng của năm đó.
    

Với bước này, dữ liệu đã được tính toán thành công thông qua luồng giao tiếp giữa Component Con và Component Cha.