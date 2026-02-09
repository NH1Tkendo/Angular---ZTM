## Output Properties và Sự kiện Tùy chỉnh (Custom Events)

Bên cạnh khả năng nhận dữ liệu đầu vào (Inputs) để tái sử dụng component, một tính năng quan trọng khác trong Angular là khả năng **phát ra (emit)** các sự kiện tùy chỉnh từ component con ra bên ngoài.

### 1. Nhu cầu sử dụng Output

Các component tùy chỉnh (custom components) thường không chỉ hiển thị dữ liệu mà còn cần tương tác với hệ thống. Chúng cần "tạo ra đầu ra" (produce outputs) để thông báo cho các thành phần khác về những hành động đã xảy ra bên trong chúng.

### 2. Phân tích ngữ cảnh (Ví dụ thực tế)

Trong ứng dụng hiện tại:

- **Hành động:** Người dùng nhấp chuột vào một người dùng (`UserComponent`).
    
- **Mong muốn:** Hiển thị danh sách nhiệm vụ (tasks) của người dùng đó ở khu vực bên phải màn hình.
    

**Vấn đề:**

- `UserComponent` chỉ chịu trách nhiệm hiển thị thông tin người dùng (nút bấm, hình ảnh, tên).
    
- Danh sách nhiệm vụ **không** nằm trong `UserComponent`.
    
- `AppComponent` (component cha) mới là nơi quản lý bố cục tổng thể và chịu trách nhiệm hiển thị danh sách nhiệm vụ bên cạnh danh sách người dùng.
    

### 3. Luồng dữ liệu (Data Flow)

Để giải quyết vấn đề trên, luồng thông tin cần đi từ con lên cha:

1. Người dùng click nút trong `UserComponent`.
    
2. `UserComponent` bắt sự kiện click này (đã có listener).
    
3. `UserComponent` cần **chuyển tiếp** thông tin "đã được click" ra ngoài cho `AppComponent`.
    
4. `AppComponent` nhận thông tin và cập nhật giao diện để hiển thị nhiệm vụ tương ứng.
    

### 4. Giải pháp kỹ thuật

Angular cung cấp tính năng **Thuộc tính đầu ra (Output properties)** để thực hiện việc giao tiếp từ component con lên component cha.