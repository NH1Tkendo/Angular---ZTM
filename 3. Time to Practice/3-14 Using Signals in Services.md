## Quản lý Trạng thái trong Dịch vụ bằng Tín hiệu (Signals)

### Chuyển đổi Thuộc tính thông thường sang Tín hiệu

Thay vì sử dụng một **thuộc tính (property)** bình thường bên trong **Dịch vụ (Service)**, chúng ta có thể tối ưu hóa luồng dữ liệu phản ứng (reactive data flow) bằng cách sử dụng **Tín hiệu (Signal)**.

**Tại `investment.service.ts`:**

- Import hàm `signal` từ `@angular/core`.
    
- Xóa bỏ dấu `?` và thay thế việc khai báo kiểu thông thường bằng cách gán giá trị khởi tạo là `signal()`.
    
- Đừng quên cung cấp định nghĩa kiểu rõ ràng bên trong cặp ngoặc nhọn `< >` (bao gồm cả `undefined` cho trạng thái ban đầu).
    
- Cập nhật giá trị mới cho Tín hiệu bằng phương thức `.set()`.
    

TypeScript

```
import { Injectable, signal } from '@angular/core';
import { type InvestmentInput } from './investment-input.model';

@Injectable({ providedIn: 'root' })
export class InvestmentService {
  // Khởi tạo Tín hiệu chứa mảng dữ liệu hoặc undefined
  resultData = signal<{
    year: number;
    interest: number;
    valueEndOfYear: number;
    annualInvestment: number;
    totalInterest: number;
    totalAmountInvested: number;
  }[] | undefined>(undefined);

  calculateInvestmentResults(data: InvestmentInput) {
    // ... logic tính toán mảng annualData

    // Cập nhật Tín hiệu
    this.resultData.set(annualData);
  }
}
```

---

### Bảo vệ Dữ liệu với Tín hiệu Chỉ đọc (Read-only Signals)

Khi Service quản lý dữ liệu bằng Tín hiệu, việc phơi bày (expose) trực tiếp Tín hiệu đó cho các thành phần khác (như `InvestmentResultsComponent`) có thể dẫn đến rủi ro: thành phần bên ngoài có thể vô tình gọi hàm `.set()` làm thay đổi dữ liệu gốc của Service.

Để ngăn chặn điều này, chúng ta cần cung cấp một **Tín hiệu chỉ đọc (read-only signal)**. Angular cung cấp 2 cách để thực hiện:

- **Cách 1: Sử dụng hàm `computed()`**: Tạo ra một giá trị được tính toán phái sinh từ Tín hiệu gốc. Bất kỳ Tín hiệu nào được tạo ra từ `computed()` đều mặc định là chỉ đọc.
    
- **Cách 2: Sử dụng phương thức `.asReadonly()`**: Gọi trực tiếp phương thức này trên Tín hiệu gốc để trả về một phiên bản không thể sửa đổi.
    

**Tại `investment-results.component.ts`:**

TypeScript

```
import { Component, inject, computed } from '@angular/core';
import { InvestmentService } from '../investment.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-investment-results',
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html'
})
export class InvestmentResultsComponent {
  private investmentService = inject(InvestmentService);

  // Cách 1: Sử dụng computed function (Được khuyên dùng trong bài học)
  results = computed(() => this.investmentService.resultData());

  /* // Cách 2: Sử dụng asReadonly() (Cú pháp ngắn gọn hơn)
  // results = this.investmentService.resultData.asReadonly();
  */
}
```

---

### Cập nhật Giao diện (Template)

Vì thuộc tính `results` trong thành phần kết quả giờ đây lại là một Tín hiệu (thông qua `computed` hoặc `asReadonly`), chúng ta phải khôi phục lại cú pháp gọi hàm `()` trong tệp HTML để đọc (read) và thiết lập theo dõi (subscribe) sự thay đổi của Tín hiệu đó.

**Tại `investment-results.component.html`:**

HTML

```
@if (!results()) {
  <p class="center">Please enter some values and press "Calculate".</p>
} @else {
  <table>
    <tbody>
      @for (result of results(); track result.year) {
        <tr>
          </tr>
      }
    </tbody>
  </table>
}
```

### Tổng kết (Summary)

	Với những thay đổi này, bạn đã hoàn tất việc di chuyển toàn bộ trạng thái (state) sang hệ thống **Signals** kết hợp với **Services**. Ứng dụng hiện tại vừa duy trì được cấu trúc module hóa gọn gàng, vừa đảm bảo tính an toàn dữ liệu thông qua cơ chế chỉ đọc, đồng thời sở hữu khả năng cập nhật giao diện cực kỳ tối ưu của Angular hiện đại.