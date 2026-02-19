## Cải tiến ứng dụng: Lưu trữ dữ liệu tĩnh với Bộ nhớ cục bộ (Local Storage)

### Vấn đề hiện tại

- Ứng dụng đang sử dụng _dữ liệu giả (dummy data)_ được lưu trữ tạm thời trong bộ nhớ RAM.
    
- **Hậu quả:** Mọi thay đổi (thêm mới, đánh dấu hoàn thành/xóa công việc) đều bị mất đi và khôi phục về trạng thái ban đầu mỗi khi tải lại trang * (reload)*.
    

### Giải pháp

- Tận dụng _Bộ nhớ cục bộ của trình duyệt (Browser Local Storage)_ để lưu trữ dữ liệu công việc.
    
- Mặc dù trong thực tế, các ứng dụng Angular sẽ kết nối với một _máy chủ (backend)_ và cơ sở dữ liệu thực, việc dùng `localStorage` ở giai đoạn này là một bước đệm hoàn hảo để thực hành việc duy trì trạng thái dữ liệu.
    

### Cách thực hiện chi tiết

- **Bước 1: Khởi tạo và tải dữ liệu từ bộ nhớ**
    
    - Thêm một _hàm khởi tạo (constructor)_ vào lớp `TasksService`. Hàm này sẽ tự động chạy khi ứng dụng khởi động.
        
    - Sử dụng `localStorage.getItem('tasks')` để tìm dữ liệu đã lưu.
        
    - Vì `localStorage` chỉ lưu trữ _chuỗi (string)_, bạn cần sử dụng `JSON.parse()` để chuyển đổi dữ liệu từ định dạng JSON về lại _mảng (array)_ và ghi đè lên mảng `tasks` mặc định.
        
    - Nếu không tìm thấy dữ liệu (lần chạy đầu tiên), ứng dụng vẫn sẽ giữ nguyên dữ liệu giả ban đầu.
        
- **Bước 2: Tạo phương thức lưu dữ liệu**
    
    - Tạo một _phương thức nội bộ (private method)_ tên là `saveTasks()` bên trong `TasksService`. Phương thức này chỉ được gọi từ bên trong lớp này.
        
    - Sử dụng `JSON.stringify()` để chuyển đổi mảng `tasks` hiện tại thành chuỗi JSON.
        
    - Dùng `localStorage.setItem('tasks', ...)` để lưu chuỗi này vào bộ nhớ trình duyệt với từ khóa là `tasks`.
        
- **Bước 3: Cập nhật dữ liệu khi có thay đổi**
    
    - Gọi phương thức `this.saveTasks()` ngay sau khi thực hiện thao tác thêm công việc (add task) hoặc xóa công việc (remove task).
        

### Mã nguồn minh họa (TasksService)

TypeScript

```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  // Dữ liệu giả mặc định
  private tasks = [
    // ... các công việc khởi tạo
  ];

  constructor() {
    // Tải dữ liệu từ Local Storage khi ứng dụng bắt đầu
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  // Hàm nội bộ để lưu dữ liệu hiện tại vào Local Storage
  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTask(taskData: any) {
    // Logic thêm công việc mới...
    
    // Lưu lại trạng thái mới
    this.saveTasks(); 
  }

  removeTask(id: string) {
    // Logic xóa công việc...
    
    // Lưu lại trạng thái mới
    this.saveTasks(); 
  }
}
```

### Cách kiểm tra kết quả (Debugging)

- Lưu mã nguồn và tải lại ứng dụng.
    
- Thử thêm hoặc hoàn thành một công việc.
    
- Mở _Công cụ dành cho nhà phát triển (Browser Developer Tools)_, chuyển sang thẻ **Application**.
    
- Tìm mục **Local Storage** ở thanh bên trái, bạn sẽ thấy từ khóa `tasks` chứa giá trị là một chuỗi văn bản theo định dạng JSON lưu trữ danh sách công việc của bạn. Tải lại trang và dữ liệu vẫn sẽ được giữ nguyên!