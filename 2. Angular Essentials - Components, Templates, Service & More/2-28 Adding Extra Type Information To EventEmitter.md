## Tăng cường An toàn Kiểu cho @Output (Type Safety for Output)

Khi sử dụng decorator `@Output` và tự khởi tạo đối tượng `EventEmitter` thủ công, Angular cho phép bạn định nghĩa rõ ràng kiểu dữ liệu sẽ được phát ra (emit). Điều này giúp mã nguồn chặt chẽ và ít lỗi hơn.

### Vấn đề với khai báo mặc định

Nếu chỉ khai báo `new EventEmitter()` mà không định nghĩa kiểu:

- TypeScript có thể ngầm hiểu là kiểu `any` hoặc không kiểm soát chặt chẽ dữ liệu đầu ra.
    
- **Rủi ro:** Bạn có thể vô tình `emit` một số (`number`) trong khi component cha đang mong đợi nhận một chuỗi (`string`). Lỗi này có thể không bị phát hiện cho đến khi chạy ứng dụng (runtime).
    

### Giải pháp: Sử dụng Generics

Tương tự như cách dùng với hàm `input()` hay `output()` hiện đại, bạn có thể thêm cú pháp ngoặc nhọn `<Type>` (Generics) ngay sau `EventEmitter` để báo cho TypeScript biết chính xác kiểu dữ liệu sẽ được gửi đi.

#### Cú pháp thực hiện

TypeScript

```
import { Component, Output, EventEmitter } from '@angular/core';

@Component({ ... })
export class UserComponent {
  // CÁCH 1: Không an toàn (Mặc định)
  // Có thể emit bất kỳ kiểu nào, rủi ro lỗi logic
  // @Output() select = new EventEmitter(); 

  // CÁCH 2: An toàn kiểu (Khuyên dùng)
  // Chỉ cho phép emit dữ liệu kiểu string
  @Output() select = new EventEmitter<string>();

  onSelectUser() {
    // Hợp lệ
    this.select.emit(this.id); 

    // Sẽ báo lỗi ngay lập tức trong IDE vì sai kiểu dữ liệu
    // this.select.emit(123); 
  }
}
```

### Lợi ích

1. **Phát hiện lỗi sớm:** Nếu lập trình viên cố tình hoặc vô ý `emit` sai kiểu dữ liệu, TypeScript sẽ báo lỗi ngay lúc biên soạn (compile-time).
    
2. **Tài liệu hóa mã nguồn:** Giúp đồng nghiệp (hoặc chính bạn trong tương lai) nhìn vào code là biết ngay sự kiện này sẽ trả về dữ liệu gì.
    
3. **Bảo mật logic:** Đảm bảo component cha luôn nhận được đúng loại dữ liệu mà nó mong đợi để xử lý (ví dụ: mong đợi ID là `string` để query database).
    

> **Ghi chú:** Việc thêm `<Type>` là **không bắt buộc** về mặt kỹ thuật (code vẫn chạy nếu thiếu), nhưng là một **thực hành tốt (best practice)** để đảm bảo tính ổn định của ứng dụng.