## Tạo Thành phần Hiển thị Kết quả (Investment Results Component)

### Khởi tạo Component và Thiết lập Giao diện

Để hiển thị mảng dữ liệu đầu tư ra màn hình dưới dạng bảng, bước đầu tiên là tạo một **thành phần (component)** mới chuyên xử lý việc này.

- **Lệnh tạo Component**: Sử dụng Angular CLI với lệnh `ng g c investment-results` (có thể bỏ qua các tệp phục vụ kiểm thử - testing files).
    
- **Yêu cầu về Giao diện (Markup)**:
    
    - **Văn bản dự phòng (Fallback text)**: Hiển thị câu thông báo (ví dụ: "Vui lòng nhập giá trị và nhấn Calculate") theo điều kiện nếu người dùng chưa bấm nút tính toán.
        
    - **Bảng dữ liệu (Table)**: Nếu đã có dữ liệu, hiển thị một thẻ `<table>` bao gồm phần đầu bảng (`<thead>`) với các cột: Năm (Year), Giá trị đầu tư (Investment Value), Lãi suất năm (Interest), Tổng lãi (Total Interest), và Vốn đầu tư (Invested Capital).
        
    - Phần thân bảng (`<tbody>`) sẽ chứa các hàng (`<tr>`) được tạo động dựa trên số năm mà người dùng nhập.
        

---

### Thiết lập Đầu vào (@Input) cho Component Kết quả

Để `InvestmentResultsComponent` có thể hiển thị dữ liệu, nó cần nhận dữ liệu từ **thành phần cha (Parent component)** là `AppComponent`.

Có hai cách để nhận dữ liệu đầu vào:

1. Sử dụng hàm `input()` (Tín hiệu - Signals).
    
2. Sử dụng **trình trang trí (decorator)** `@Input()` truyền thống. Bài học này sử dụng cách thứ hai vì nó vẫn rất phổ biến.
    

**Định nghĩa kiểu dữ liệu và Khai báo TS:** Dữ liệu nhận vào sẽ là một **mảng các đối tượng (array of objects)**. Chúng ta sử dụng dấu `?` ngay sau tên thuộc tính để báo cho TypeScript biết rằng đây là một thuộc tính **tùy chọn (optional)** — nghĩa là ban đầu nó có thể có giá trị `undefined` (khi người dùng chưa tính toán).

TypeScript

```
import { Component, Input } from '@angular/core';

export class InvestmentResultsComponent {
  // Định nghĩa Input nhận một mảng các đối tượng chứa kết quả hàng năm
  @Input() results?: {
    year: number;
    interest: number;
    valueEndOfYear: number;
    annualInvestment: number;
    totalInterest: number;
    totalAmountInvested: number;
  }[];
}
```

---

### Lưu trữ và Truyền Dữ liệu từ Thành phần Cha (AppComponent)

Hiện tại, `AppComponent` đang tính toán dữ liệu nhưng chỉ in ra bảng điều khiển (console.log). Chúng ta cần lưu trữ dữ liệu này vào một thuộc tính để truyền xuống thành phần kết quả.

#### 1. Cập nhật mã nguồn TS của AppComponent

Tạo một thuộc tính `resultsData` với cấu trúc kiểu dữ liệu giống hệt với `@Input` bên dưới. Thay vì `console.log`, hãy gán kết quả tính toán vào thuộc tính này.

TypeScript

```
export class AppComponent {
  // Khởi tạo thuộc tính lưu trữ kết quả, cho phép undefined ban đầu
  resultsData?: {
    year: number;
    interest: number;
    valueEndOfYear: number;
    annualInvestment: number;
    totalInterest: number;
    totalAmountInvested: number;
  }[];

  onCalculateInvestmentResults(data: InvestmentInput) {
    // ... logic tính toán (tạo ra mảng annualData)

    // Gán dữ liệu vào thuộc tính thay vì in ra console
    this.resultsData = annualData; 
  }
}
```

#### 2. Ràng buộc Thuộc tính (Property Binding) trên HTML

Trong tệp `app.component.html`, gọi thẻ của thành phần kết quả và sử dụng cú pháp **ràng buộc thuộc tính (property binding)** bằng cặp ngoặc vuông `[ ]` để truyền dữ liệu `resultsData` vào thuộc tính `results`.

HTML

```
<app-investment-results [results]="resultsData"></app-investment-results>
```

---

### Mô hình Luồng Dữ liệu Phổ biến (Common Data Flow Pattern)

Thông qua các bước trên, bạn đã thực hiện một **mẫu thiết kế (pattern)** cực kỳ phổ biến trong Angular để giao tiếp giữa các thành phần:

1. **Thành phần A (UserInput)**: Thu thập dữ liệu và phát ra một **sự kiện tùy chỉnh (custom event / @Output)**.
    
2. **Thành phần Cha (App)**: Lắng nghe sự kiện đó, xử lý/tính toán dữ liệu và lưu vào trạng thái (state) của nó.
    
3. **Thành phần B (InvestmentResults)**: Nhận dữ liệu đã xử lý từ Thành phần Cha thông qua **đầu vào (@Input)** để hiển thị lên màn hình.