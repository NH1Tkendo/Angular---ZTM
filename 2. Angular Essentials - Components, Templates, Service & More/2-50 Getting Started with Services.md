## Tối ưu hóa Code và Quản lý dữ liệu với Services

Đoạn nội dung này tập trung vào việc tái cấu trúc (refactoring) mã nguồn bằng cách tách biệt logic quản lý dữ liệu ra khỏi Thành phần (Component) và đưa vào **Dịch vụ (Service)**. Đây là một thực hành tốt (best practice) quan trọng trong Angular.

### 1. Tại sao cần sử dụng Service?

- **Vấn đề hiện tại**: `TasksComponent` đang ôm đồm quá nhiều trách nhiệm: vừa quản lý giao diện, vừa quản lý logic thao tác dữ liệu (thêm, xóa, lọc tasks).
    
- **Nguyên tắc thiết kế**: Các Thành phần (Components) và lớp (class) của chúng nên được giữ ở mức "tinh gọn" (lean) nhất có thể.
    
- **Giải pháp**: Khi logic quản lý dữ liệu phức tạp hoặc cần được chia sẻ giữa nhiều thành phần (ví dụ: `NewTaskComponent` thêm task, `TaskComponent` xóa task), ta nên sử dụng một **Service** để quản lý dữ liệu tập trung.
    

### 2. Cách tạo một Service

Quy trình tạo một Service tiêu chuẩn trong Angular:

1. **Tạo file mới**:
    
    - Tên file: `tasks.service.ts` (tuân theo quy tắc đặt tên: `tên-chức-năng.loại-file.ts`).
        
    - Vị trí: Đặt cùng thư mục với tính năng tương ứng (ví dụ: thư mục `tasks`).
        
2. **Định nghĩa Class**:
    
    - Service bản chất là một lớp (class) thông thường.
        
    - Tên class: `TasksService` (Sử dụng hậu tố "Service" để phân biệt với Component).
        

### 3. Di chuyển Logic từ Component sang Service

Chúng ta sẽ chuyển toàn bộ mảng dữ liệu và các phương thức thao tác từ `TasksComponent` sang `TasksService`.

#### A. Quản lý dữ liệu (State)

- Chuyển mảng `tasks` sang Service.
    
- Đặt ở chế độ `private` để đảm bảo mảng này chỉ có thể được thao tác từ bên trong Service, không bị can thiệp trực tiếp từ bên ngoài.
    

TypeScript

```
export class TasksService {
  // Dữ liệu dummy tasks
  private tasks = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary: 'Learn all the basics and advanced features of Angular',
      dueDate: '2025-12-31',
    },
    // ... các task khác
  ];

  // Các phương thức sẽ được thêm vào bên dưới
}
```

#### B. Các phương thức thao tác (Methods)

Service sẽ cung cấp các phương thức công khai (public methods) để các Component tương tác với dữ liệu.

**1. Lấy danh sách Task theo User (`getUserTasks`)** Thay vì lọc trực tiếp trong Component, ta chuyển logic đó vào đây:

TypeScript

```
getUserTasks(userId: string) {
  return this.tasks.filter((task) => task.userId === userId);
}
```

**2. Thêm Task mới (`addTask`)** Nhận dữ liệu task mới và ID người dùng, sau đó thêm vào đầu mảng:

TypeScript

```
addTask(taskData: NewTaskData, userId: string) {
  this.tasks.unshift({
    id: new Date().getTime().toString(),
    userId: userId,
    title: taskData.title,
    summary: taskData.summary,
    dueDate: taskData.date,
  });
}
```

**3. Xóa Task (`removeTask`)** Nhận ID của task cần xóa và cập nhật lại mảng tasks:

TypeScript

```
removeTask(id: string) {
  this.tasks = this.tasks.filter((task) => task.id !== id);
}
```

### Tổng kết

Việc sử dụng `TasksService` giúp:

- **Tách biệt mối quan tâm (Separation of Concerns):** Component chỉ lo hiển thị, Service lo dữ liệu.
    
- **Dễ bảo trì:** Logic nghiệp vụ nằm gọn trong một nơi.
    
- **Tái sử dụng:** Dữ liệu và logic này có thể được gọi từ bất kỳ Component nào trong ứng dụng.