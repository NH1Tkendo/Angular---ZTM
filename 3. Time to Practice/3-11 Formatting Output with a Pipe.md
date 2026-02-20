## Định dạng Dữ liệu bằng Ống dẫn (Pipes)

### Khái niệm cơ bản

- Trong Angular, **ống dẫn (pipe)** là một tính năng mạnh mẽ giúp bạn định dạng dữ liệu ngay trên giao diện (template) trước khi hiển thị ra màn hình cho người dùng.
    
- **Cú pháp sử dụng**: Thêm một dấu gạch đứng `|` (pipe symbol) ngay sau giá trị cần định dạng, theo sau là tên của ống dẫn.
    
- Trong bài học này, chúng ta sử dụng ống dẫn **tiền tệ (currency pipe)** — một công cụ đã được Angular tích hợp sẵn để tự động chuyển đổi các con số thô thành định dạng tiền tệ đẹp mắt.
    

---

### Hướng dẫn Cấu hình & Mã nguồn (Code)

#### 1. Khai báo trong TypeScript (`.ts`)

Để kích hoạt và sử dụng ống dẫn này trong một _thành phần độc lập (standalone component)_, bạn bắt buộc phải import nó từ gói thư viện chung của Angular và thêm vào mảng `imports`.

TypeScript

```
// investment-results.component.ts

import { Component, Input } from '@angular/core';
// Import CurrencyPipe từ thư viện common
import { CurrencyPipe } from '@angular/common'; 

@Component({
  selector: 'app-investment-results',
  // Thêm CurrencyPipe vào mảng imports
  imports: [CurrencyPipe], 
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  // ... (đoạn mã nhận @Input đã cấu hình từ bài trước)
}
```

#### 2. Áp dụng trên giao diện HTML (`.html`)

Thêm `| currency` vào sau các giá trị nội suy cần định dạng. Lưu ý: Không áp dụng cho cột "Năm" (`year`) vì đây là số thứ tự thời gian, không phải là tiền.

HTML

```
<tbody>
  @for (result of results; track result.year) {
    <tr>
      <td>{{ result.year }}</td>
      <td>{{ result.valueEndOfYear | currency }}</td>
      <td>{{ result.interest | currency }}</td>
      <td>{{ result.totalInterest | currency }}</td>
      <td>{{ result.totalAmountInvested | currency }}</td>
    </tr>
  }
</tbody>
```

### Tùy chỉnh Ống dẫn (Configuration)

Mặc định, `currency pipe` sẽ định dạng con số thành Đô la Mỹ (`$`). Tuy nhiên, bạn có thể dễ dàng cấu hình lại bằng cách truyền **tham số (parameters)** thông qua dấu hai chấm `:`.

- **Ví dụ thay đổi loại tiền**: Nếu muốn hiển thị bằng đồng Euro thay vì USD, bạn viết cú pháp như sau: `{{ result.interest | currency:'EUR' }}`. Bạn có thể tham khảo thêm tài liệu chính thức của Angular để biết đầy đủ các mã tiền tệ và tùy chọn cấu hình khác.
    

### Kết quả (Behavior)

Sau khi lưu và chạy lại ứng dụng:

1. Nhập các giá trị vào form và nhấn Calculate.
    
2. Các con số trong bảng giờ đây sẽ hiển thị kèm theo ký hiệu tiền tệ (ví dụ: `$10,000.00` thay vì `10000`), giúp giao diện trở nên chuyên nghiệp và dễ đọc hơn rất nhiều.