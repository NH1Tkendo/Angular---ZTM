## Lớp (Classes) trong Angular và TypeScript

Angular sử dụng rất nhiều **Lớp** (Classes) - một tính năng được hỗ trợ bởi cả JavaScript thuần (Vanilla JS) và TypeScript. Tuy nhiên, TypeScript mở rộng và bổ sung thêm các tính năng mạnh mẽ hơn cho Class.

### 1. Khái niệm cơ bản về Class

Một Class về cơ bản là một **bản thiết kế** (blueprint) cho các đối tượng (Objects). Mọi thuộc tính (Properties) và phương thức (Methods) được định nghĩa trong Class sẽ tồn tại trên tất cả các đối tượng được tạo ra từ Class đó.

**Ví dụ trong JavaScript thuần:**

JavaScript

```
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
 
  greet() {
    console.log('Hi, I am ' + this.name);
  }
}

// Khởi tạo đối tượng (Instantiate)
const person1 = new Person('Max', 35);
const person2 = new Person('Anna', 32);

// Truy cập thuộc tính và phương thức
console.log(person1.age);
person2.greet();
```

### 2. Class trong ngữ cảnh Angular

Khi làm việc với Angular, cách sử dụng Class có một sự khác biệt quan trọng so với lập trình thông thường:

- **Vai trò:** Bạn sử dụng Class để tạo bản thiết kế cho các thành phần (ví dụ: các phần tử HTML tùy chỉnh - Components).
    
- **Cơ chế khởi tạo:** Bạn định nghĩa Class, nhưng **Angular là người khởi tạo (instantiates)** chúng.
    
- **Lưu ý:** Bạn sẽ **không bao giờ** tự viết mã lệnh `new SomeComponent()` trong code của mình. Angular sẽ tự động xử lý việc này ngầm bên dưới.
    

### 3. Các tính năng mở rộng của TypeScript

Vì Angular sử dụng TypeScript, bạn sẽ làm việc với các tính năng nâng cao (enhancements) của Class mà JavaScript thuần không có hoặc hỗ trợ hạn chế.

#### A. Bộ trang trí (Decorators)

Decorators được sử dụng để thêm **siêu dữ liệu** (metadata) và cấu hình cho Class.

TypeScript

```
@Component({}) // Đây là Decorator
class SomeComponent {}
```

- `@Component`: Báo cho Angular biết Class này là một Component và cung cấp các cấu hình cần thiết.
    

#### B. Kiểm soát truy cập (Access Modifiers)

TypeScript cho phép kiểm soát quyền truy cập của các thuộc tính và phương thức thông qua các từ khóa:

- `public` (mặc định): Có thể truy cập từ bất cứ đâu.
    
- `private`: Chỉ có thể truy cập từ bên trong Class đó.
    
- `protected`: Có thể truy cập từ bên trong Class và các Class con thừa kế nó.
    

> **Ghi chú:** Bạn không cần phải nghiên cứu quá sâu về lý thuyết Class ngay lúc này. Các tính năng quan trọng sẽ được học thông qua thực hành trong suốt khóa học. Chỉ cần hiểu rằng: Class là bản thiết kế để tạo ra đối tượng.