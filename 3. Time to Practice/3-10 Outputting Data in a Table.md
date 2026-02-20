## Hiển thị Dữ liệu với Câu lệnh Điều kiện và Vòng lặp trong Angular

### Xử lý Hiển thị theo Điều kiện (Conditional Rendering)

- **Mục tiêu**: Xử lý logic giao diện dựa trên trạng thái của dữ liệu. Cụ thể là hiển thị dòng chữ thông báo (fallback text) khi chưa có kết quả tính toán, và chỉ hiển thị bảng dữ liệu khi đã có dữ liệu.
    
- **Cú pháp hiện đại**: Angular cung cấp khối điều khiển (control flow) `@if` và `@else` rất trực quan cho việc này. _(Lưu ý: Trong các dự án Angular sử dụng phiên bản cũ hơn, bạn sẽ thấy người ta dùng chỉ thị `*ngIf`, nhưng với cú pháp mới thì không cần thiết nữa)._
    
- **Tối ưu giao diện**: Bạn có thể thêm lớp `class="center"` vào đoạn văn bản thông báo dự phòng để canh giữa nội dung, giúp giao diện trông gọn gàng hơn.
    

### Tạo các Hàng Dữ liệu Động (Dynamic List Rendering)

- **Mục tiêu**: Lặp qua mảng `results` để tự động tạo ra các hàng dữ liệu (`<tr>`) cho bảng, tương ứng với số năm người dùng muốn đầu tư.
    
- **Cú pháp hiện đại**: Sử dụng khối điều khiển `@for`.
    
- **Cấu trúc vòng lặp**: `@for (result of results; track result.year)`
    
    - `result of results`: Duyệt qua từng phần tử trong mảng `results` và gán nó vào một biến tạm tên là `result`.
        
    - **Từ khóa `track`**: Đây là một thành phần bắt buộc trong Angular vì lý do hiệu suất (performance). Nó giúp khung làm việc theo dõi và nhận diện sự thay đổi của từng mục tĩnh/động trong danh sách một cách chính xác. Tiêu chí nhận diện (ID) phải là duy nhất, ở trường hợp này, `year` (năm) là lựa chọn hoàn hảo.
        
- **Nội suy chuỗi (String Interpolation)**: Bên trong vòng lặp, bạn dùng cú pháp dấu ngoặc nhọn kép `{{ }}` để trích xuất và hiển thị giá trị của các thuộc tính (ví dụ: `{{ result.valueEndOfYear }}`).
    

---

### Mã nguồn (Code)

Áp dụng toàn bộ logic trên vào tệp mẫu HTML của thành phần kết quả (`investment-results.component.html`):

HTML

```
@if (!results) {
  <p class="center">Please enter some values and press "Calculate".</p>
} 
@else {
  <table>
    <thead>
      <tr>
        <th>Year</th>
        <th>Investment Value</th>
        <th>Interest (Year)</th>
        <th>Total Interest</th>
        <th>Invested Capital</th>
      </tr>
    </thead>
    <tbody>
      @for (result of results; track result.year) {
        <tr>
          <td>{{ result.year }}</td>
          <td>{{ result.valueEndOfYear }}</td>
          <td>{{ result.interest }}</td>
          <td>{{ result.totalInterest }}</td>
          <td>{{ result.totalAmountInvested }}</td>
        </tr>
      }
    </tbody>
  </table>
}
```

### Kết quả (Behavior)

Sau khi lưu tệp, giao diện ban đầu sẽ chỉ hiện dòng chữ hướng dẫn. Khi bạn nhập số liệu và bấm nút tính toán, bảng kết quả sẽ lập tức xuất hiện với số lượng hàng tương ứng với "thời hạn đầu tư" (duration) bạn đã chọn.

Tuy nhiên, lúc này các giá trị hiển thị chỉ là những con số thô, có thể dài dòng và chưa giống định dạng tiền tệ thực tế.