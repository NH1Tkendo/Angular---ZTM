## Tối ưu hóa Mã nguồn: Khởi tạo tệp Mô hình (Model)

### Mục đích và Lợi ích

Trước khi tiến hành hiển thị dữ liệu ra màn hình, chúng ta cần tối ưu hóa lại đoạn mã hiện tại. Thay vì viết lặp đi lặp lại một cấu trúc đối tượng dữ liệu ở nhiều nơi, chúng ta sẽ tách _định nghĩa kiểu (Type definition)_ này ra một tệp riêng biệt gọi là _mô hình (Model)_.

Việc này mang lại các lợi ích:

- Giúp mã nguồn gọn gàng (leaner) và sạch sẽ hơn.
    
- Dễ dàng tái sử dụng (reuse) ở bất kỳ đâu trong dự án mà không cần viết lại toàn bộ cấu trúc.
    

### Hướng dẫn Thao tác & Mã nguồn (Code)

#### 1. Tạo tệp Mô hình (Model file)

- Tạo một tệp mới trong thư mục `app` và đặt tên là `investment-input.model.ts`.
    
- **Quy ước đặt tên**: Tên tệp nên mô tả rõ nội dung bên trong và tuân theo quy ước cấu trúc của Angular: `[tên-chức-năng].[loại-tệp].ts` (ví dụ: component, service, hoặc model).
    
- Định nghĩa kiểu dữ liệu bằng từ khóa `interface` (hoặc `type`, nhưng `interface` được sử dụng phổ biến hơn trong các dự án Angular).
    
- Bắt buộc phải có từ khóa `export` để các tệp khác có thể gọi và sử dụng định nghĩa này.
    

TypeScript

```
// investment-input.model.ts

export interface InvestmentInput {
  initialInvestment: number;
  duration: number;
  expectedReturn: number;
  annualInvestment: number;
}
```

#### 2. Áp dụng Mô hình vào các Thành phần (Components)

Bây giờ, chúng ta sẽ thay thế cấu trúc đối tượng dài dòng trước đó bằng `InvestmentInput` vừa tạo.

**Tại `app.component.ts`:** Import mô hình vào tệp. Bạn nên thêm từ khóa `type` trong cú pháp import để chỉ rõ đây chỉ là định nghĩa kiểu.

TypeScript

```
// Thêm import ở đầu tệp
import { type InvestmentInput } from './investment-input.model';

export class AppComponent {
  // Thay thế cấu trúc object cũ bằng interface InvestmentInput
  onCalculateInvestmentResults(data: InvestmentInput) {
    const { initialInvestment, annualInvestment, expectedReturn, duration } = data;
    // ... logic tính toán giữ nguyên
  }
}
```

**Tại `user-input.component.ts`:** Cập nhật lại định nghĩa kiểu cho _bộ phát sự kiện (Event Emitter)_.

TypeScript

```
import { Component, Output, EventEmitter } from '@angular/core';
// Thêm import ở đầu tệp
import { type InvestmentInput } from '../investment-input.model';

export class UserInputComponent {
  // Cập nhật kiểu dữ liệu cho EventEmitter
  @Output() calculate = new EventEmitter<InvestmentInput>();

  // ... các đoạn mã khác giữ nguyên
}
```

### Kết quả (Behavior)

Sau bước tái cấu trúc (refactoring) này, chương trình vẫn hoạt động hoàn toàn bình thường như trước, nhưng cấu trúc mã (codebase) đã trở nên chuyên nghiệp, gọn gàng và dễ bảo trì hơn rất nhiều.