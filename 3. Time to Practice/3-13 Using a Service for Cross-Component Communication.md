## Tối ưu hóa Ứng dụng bằng Dịch vụ (Services)

### Vấn đề của Cách tiếp cận hiện tại

Trong các phần trước, chúng ta đã xây dựng luồng dữ liệu đi từ `UserInputComponent` lên `AppComponent` qua `@Output` (hoặc `output()`), sau đó truyền từ `AppComponent` xuống `InvestmentResultsComponent` thông qua `@Input` (hoặc `input()`).

Dù cách này hoàn toàn hợp lệ, nó đòi hỏi nhiều mã nguồn dư thừa (boilerplate code) ở `AppComponent` chỉ để làm nhiệm vụ "trung chuyển" dữ liệu.

### Giải pháp: Sử dụng Service (Dịch vụ)

Sử dụng **Service** giúp chúng ta tạo ra một nơi tập trung để quản lý logic nghiệp vụ và trạng thái (state). Các thành phần (components) cần dữ liệu hoặc cần thực hiện tính toán chỉ cần "tiêm" (inject) Service này vào để sử dụng trực tiếp, bỏ qua việc truyền dữ liệu cồng kềnh qua nhiều tầng component.

---

### Bước 1: Khởi tạo và Thiết lập `InvestmentService`

1. Tạo tệp mới tên là `investment.service.ts` (có thể đặt cùng cấp với `app.component`).
    
2. Định nghĩa một lớp (class) và thêm **trình trang trí (decorator)** `@Injectable({ providedIn: 'root' })`. Điều này báo cho Angular biết rằng Service này có thể được tiêm vào bất kỳ đâu trong ứng dụng và chỉ có một bản thể (singleton instance) duy nhất tồn tại.
    
3. Di chuyển toàn bộ logic tính toán từ `AppComponent` sang Service này.
    
4. Tạo một thuộc tính `resultData` để lưu trữ kết quả tính toán. (Trong ví dụ này, chúng ta sẽ bắt đầu bằng thuộc tính thông thường, chưa dùng Tín hiệu).
    

TypeScript

```
// investment.service.ts
import { Injectable } from '@angular/core';
import { type InvestmentInput } from './investment-input.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  // Lưu trữ kết quả tính toán
  resultData?: {
    year: number;
    interest: number;
    valueEndOfYear: number;
    annualInvestment: number;
    totalInterest: number;
    totalAmountInvested: number;
  }[];

  calculateInvestmentResults(data: InvestmentInput) {
    // ... (Toàn bộ logic vòng lặp tính toán annualData ở đây) ...
    
    // Gán kết quả vào thuộc tính của Service
    this.resultData = annualData;
  }
}
```

---

### Bước 2: Dọn dẹp `AppComponent`

Bây giờ `AppComponent` không còn phải gánh vác việc tính toán và truyền dữ liệu nữa.

**Tại `app.component.ts`:**

- Xóa bỏ thuộc tính `resultsData`.
    
- Xóa phương thức `onCalculateInvestmentResults`.
    
- Xóa các dòng import không cần thiết.
    

**Tại `app.component.html`:**

- Xóa liên kết sự kiện `(calculate)` ở thẻ `<app-user-input>`.
    
- Xóa ràng buộc thuộc tính `[results]` ở thẻ `<app-investment-results>`.
    

Mã của bạn giờ đây cực kỳ gọn nhẹ!

---

### Bước 3: Gửi Dữ liệu từ `UserInputComponent` qua Service

Thay vì phát sự kiện (emit event), thành phần nhập liệu sẽ gọi trực tiếp phương thức tính toán của Service.

**Tại `user-input.component.ts`:**

- Xóa thuộc tính `calculate = output()`.
    
- Tiêm (Inject) `InvestmentService` vào thông qua **Hàm tạo (Constructor)**. Việc thêm từ khóa `private` trước tham số sẽ yêu cầu TypeScript tự động tạo một thuộc tính ẩn cho lớp này.
    
- Trong hàm `onSubmit()`, gọi phương thức `calculateInvestmentResults` của Service và truyền dữ liệu người dùng nhập vào.
    

TypeScript

```
import { Component, signal } from '@angular/core';
import { InvestmentService } from '../investment.service';

export class UserInputComponent {
  // ... (Khai báo các tín hiệu nhập liệu)

  // Tiêm Service thông qua Constructor
  constructor(private investmentService: InvestmentService) {}

  onSubmit() {
    // Gọi trực tiếp hàm của Service thay vì emit event
    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.enteredInitialInvestment(),
      duration: +this.enteredDuration(),
      expectedReturn: +this.enteredExpectedReturn(),
      annualInvestment: +this.enteredAnnualInvestment()
    });

    // ... (Logic reset form)
  }
}
```

---

### Bước 4: Nhận Dữ liệu tại `InvestmentResultsComponent`

Thành phần kết quả giờ đây sẽ lấy dữ liệu trực tiếp từ Service thay vì chờ `AppComponent` truyền xuống.

**Tại `investment-results.component.ts`:**

- Xóa thuộc tính `results = input()`.
    
- Lần này, sử dụng hàm `inject()` của Angular (một cách tiêm phụ thuộc hiện đại hơn so với dùng constructor) để lấy `InvestmentService`.
    
- Tạo một **Getter** tên là `results` để lấy dữ liệu từ `resultData` của Service và phơi bày (expose) nó ra cho tệp HTML.
    

TypeScript

```
import { Component, inject } from '@angular/core';
import { InvestmentService } from '../investment.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-investment-results',
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  // Tiêm Service bằng hàm inject()
  private investmentService = inject(InvestmentService);

  // Khai báo Getter để template có thể đọc dữ liệu
  get results() {
    return this.investmentService.resultData;
  }
}
```

**Tại `investment-results.component.html`:**

- Khôi phục lại cú pháp đọc dữ liệu cũ: xóa các cặp ngoặc đơn `()` ở các câu lệnh `@if` và `@for` vì `results` lúc này là một Getter lấy giá trị thuộc tính bình thường, không còn là một Tín hiệu (Signal) nữa.
    

HTML

```
@if (!results) { ... }
@else {
  @for (result of results; track result.year) { ... }
}
```

### Kết quả

Giao diện ứng dụng vẫn hoạt động giống hệt như trước, nhưng kiến trúc bên dưới đã thay đổi hoàn toàn. Mã nguồn trở nên module hóa hơn, dễ bảo trì và dễ dàng mở rộng chức năng sau này nhờ sức mạnh của Dependency Injection trong Angular.