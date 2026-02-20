## Tái cấu trúc Ứng dụng bằng Tín hiệu (Signals) và Cú pháp Hiện đại

### Tổng quan

Mặc dù ứng dụng đã hoạt động hoàn hảo với các tính năng tiêu chuẩn, Angular hiện đại cung cấp các cách tiếp cận mới để tối ưu hóa hiệu suất và làm cho mã nguồn gọn gàng hơn. Phần này sẽ hướng dẫn cách di chuyển (migrate) trạng thái của ứng dụng sang sử dụng **Tín hiệu (Signals)**, cùng với các hàm `input()` và `output()` mới.

---

### 1. Quản lý trạng thái với Tín hiệu trong AppComponent

Thay vì lưu trữ dữ liệu tính toán bằng một thuộc tính thông thường, chúng ta sẽ chuyển nó thành một Tín hiệu (Signal) vì đây là dữ liệu có trạng thái (stateful data) ảnh hưởng trực tiếp đến giao diện người dùng (UI) khi thay đổi.

**Trong tệp `app.component.ts`:**

- Import hàm `signal` từ `@angular/core`.
    
- Khởi tạo giá trị bằng hàm `signal()`. Vì giá trị ban đầu là `undefined`, chúng ta cần khai báo rõ kiểu dữ liệu (bằng toán tử pipe `|` của TypeScript) để Angular biết Tín hiệu này sẽ chứa một mảng đối tượng hoặc `undefined`.
    
- Để cập nhật dữ liệu, ta dùng phương thức `.set()`.
    

TypeScript

```
import { Component, signal } from '@angular/core';
import { type InvestmentInput } from './investment-input.model';

export class AppComponent {
  // Khởi tạo Tín hiệu (Signal) với kiểu dữ liệu rõ ràng
  resultsData = signal<InvestmentInput[] | undefined>(undefined);

  onCalculateInvestmentResults(data: InvestmentInput) {
    // ... logic tính toán mảng annualData

    // Cập nhật giá trị mới cho Tín hiệu bằng phương thức set()
    this.resultsData.set(annualData);
  }
}
```

**Trong tệp mẫu `app.component.html`:** Khi truyền Tín hiệu xuống thành phần con, bạn phải thêm cặp ngoặc đơn `()` để đọc dữ liệu bên trong Tín hiệu đó.

HTML

```
<app-investment-results [results]="resultsData()"></app-investment-results>
```

---

### 2. Sử dụng Tín hiệu trong UserInputComponent

Các biến lưu trữ dữ liệu nhập từ người dùng cũng có thể chuyển sang Tín hiệu.

**Cập nhật TypeScript (`.ts`):** Ở đây, TypeScript tự động **suy luận kiểu dữ liệu (type inference)** từ giá trị khởi tạo, nên bạn không cần khai báo kiểu rõ ràng trong ngoặc nhọn `< >`. Để lấy giá trị khi nhấn "Calculate", bạn cần gọi Tín hiệu kèm dấu `()`.

TypeScript

```
import { Component, signal } from '@angular/core';

export class UserInputComponent {
  // Biến thành tín hiệu, tự động suy luận kiểu là string
  enteredInitialInvestment = signal('0');
  enteredAnnualInvestment = signal('0');
  enteredExpectedReturn = signal('5');
  enteredDuration = signal('10');

  onSubmit() {
    this.calculate.emit({
      // Đọc giá trị tín hiệu bằng cách thêm ()
      initialInvestment: +this.enteredInitialInvestment(),
      duration: +this.enteredDuration(),
      expectedReturn: +this.enteredExpectedReturn(),
      annualInvestment: +this.enteredAnnualInvestment()
    });

    // Tùy chọn: Đặt lại biểu mẫu (Reset form) sau khi gửi
    this.enteredInitialInvestment.set('0');
    this.enteredAnnualInvestment.set('0');
    this.enteredExpectedReturn.set('5');
    this.enteredDuration.set('10');
  }
}
```

**Cập nhật HTML (`.html`):** Thật tuyệt vời là chỉ thị `ngModel` đã được Angular thiết kế để **tự động hỗ trợ Tín hiệu**. Bạn **không cần** và không nên thay đổi bất cứ điều gì trong tệp HTML đối với cú pháp `[(ngModel)]`.

---

### 3. Nâng cấp lên Cú pháp Hàm output() và input()

Trong Angular hiện đại, bạn có thể thay thế các **trình trang trí (decorators)** `@Input()` và `@Output()` bằng các hàm tiêu chuẩn. Điều này giúp loại bỏ sự phụ thuộc vào `EventEmitter`.

**Cập nhật Output tại UserInputComponent:** Dùng hàm `output()` thay vì `@Output` và `EventEmitter`. Cú pháp phát sự kiện (emit) vẫn giữ nguyên.

TypeScript

```
import { Component, output } from '@angular/core';

export class UserInputComponent {
  // Thay thế @Output() và EventEmitter
  calculate = output<InvestmentInput>();
  
  // ... bên trong onSubmit: this.calculate.emit(data);
}
```

**Cập nhật Input tại InvestmentResultsComponent:** Dùng hàm `input()`. Việc này sẽ tạo ra một **Tín hiệu đầu vào (Input Signal)**, giúp Angular tối ưu quá trình cập nhật giao diện cực kỳ hiệu quả.

TypeScript

```
import { Component, input } from '@angular/core';

export class InvestmentResultsComponent {
  // Thay thế @Input()
  results = input<InvestmentInput[]>();
}
```

_Lưu ý quan trọng cho tệp HTML của `InvestmentResultsComponent`:_ Vì `results` giờ đây là một Tín hiệu đầu vào, bạn phải cập nhật lại tệp HTML để gọi nó bằng dấu `()` trong các lệnh `@if` và `@for`.

HTML

```
@if (!results()) {
  <p class="center">Please enter some values...</p>
} @else {
  <table>
    <tbody>
      @for (result of results(); track result.year) {
        }
    </tbody>
  </table>
}
```