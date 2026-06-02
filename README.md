# 🎓 Portfolio Môn Học - Nhập môn Công nghệ số & AI

Đây là dự án template Portfolio hoàn chỉnh, thiết kế chuyên nghiệp với các hiệu ứng nâng cao, dành riêng cho việc tổng hợp và nộp bài tập môn học.

## 🚀 Tính năng nổi bật

- Giao diện Dark Mode chuyên nghiệp với Glassmorphism.
- Animation nâng cao: Ambient background, Noise overlay, Custom Cursor, Scroll Reveal.
- Cấu trúc thư mục rõ ràng, dễ bảo trì.
- SPA Routing (Single Page Application) bằng Hash.
- Hỗ trợ 3 phương thức nhúng bài tập: `iframe` (local), `external` (link ngoài), `html` (render trực tiếp).

## 🛠 Hướng dẫn sử dụng & Tùy chỉnh

Tất cả những nơi bạn cần chỉnh sửa đều được đánh dấu bằng icon cây bút ✏️.

### 1. Khởi chạy Local (Kiểm tra trên máy)

Vì dự án không sử dụng module, bạn có thể mở file `index.html` trực tiếp trên trình duyệt bằng cách click đúp vào file.
Tuy nhiên, để các iframe hoạt động tốt nhất mà không bị lỗi CORS (đặc biệt khi bạn code JS trong các bài tập con), bạn nên dùng Live Server:
- Nếu dùng VS Code: Cài extension **Live Server** -> Click chuột phải vào `index.html` -> Chọn `Open with Live Server`.

### 2. Tùy chỉnh Nội dung Cá nhân

Mở file `js/projects.js` và chỉnh sửa các hằng số:
- `PROFILE`: Tên, MSSV, Email, Avatar, Bio...
- `COURSE`: Thông tin môn học, giảng viên.
- `SKILLS`: Danh sách kỹ năng và tỷ lệ %.
- `TIMELINE`: Lộ trình học tập.
- `GOALS`: Mục tiêu của portfolio.
- `SOCIALS`: Các link mạng xã hội (Email, GitHub, LinkedIn...).

### 3. Cấu hình & Nộp Bài tập (6 bài)

Mở file `js/projects.js`, tìm biến `PROJECTS`. Tại mỗi bài tập, bạn có 3 lựa chọn hiển thị (chỉnh thuộc tính `type`):

- **Cách 1 (Mặc định): Nhúng file HTML local**
  - Cấu hình: `type: 'iframe'`, `src: 'projects/bai1/index.html'`
  - Nộp bài: Code bài làm của bạn vào file `projects/bai1/index.html` tương ứng.

- **Cách 2: Mở link bên ngoài (Google Docs, Canva, Notion...)**
  - Cấu hình: `type: 'external'`, `url: 'https://link-cua-ban.com'`
  - Nộp bài: Khi click xem bài, hệ thống sẽ yêu cầu người dùng bấm nút mở tab mới.

- **Cách 3: Hiển thị HTML trực tiếp**
  - Cấu hình: `type: 'html'`, `html: '<h1>Nội dung bài làm</h1><p>...</p>'`
  - Nộp bài: Gõ trực tiếp HTML vào chuỗi string.

### 4. Đổi Màu sắc & Font chữ (Design System)

Mở file `css/style.css`, tìm đến khối `:root`:
- `✏️ Primary Colors`: Đổi màu chủ đạo (Mặc định là Tím - Xanh Cyan).
- `✏️ Google Fonts`: Thay thế link import font và đổi tên font ở biến `--font-heading`, `--font-body`.

### 5. Thêm Trang mới vào Menu

Nếu bạn muốn có thêm trang (VD: Blog, Tài liệu), thực hiện 3 bước:
1. Trong `index.html`: Thêm 1 thẻ `<li><a href="#ten-trang" class="nav-link">...</a></li>` vào thanh navbar.
2. Trong `js/router.js`: Thêm route vào biến `ROUTES` (VD: `'ten-trang': 'ten-trang'`).
3. Trong `js/app.js`: Thêm hàm `renderTenTrang()` để trả về HTML, sau đó gọi nó trong `switch/case` của hàm `renderPage(route)`.

## 🌐 Hướng dẫn Deploy (Đưa web lên mạng)

Bạn có thể deploy dự án này hoàn toàn miễn phí trên các nền tảng sau:

### Netlify (Dễ nhất)
1. Đăng ký tài khoản tại [Netlify](https://www.netlify.com/).
2. Kéo thả toàn bộ thư mục (chứa file `index.html`) vào phần **Sites -> Drag and drop your site output folder here**.
3. Đợi vài giây, bạn sẽ nhận được một đường link public.

### Vercel
1. Đăng ký [Vercel](https://vercel.com/).
2. Chọn **Add New -> Project**.
3. Bạn có thể up code lên GitHub rồi import vào Vercel, hoặc dùng Vercel CLI.

### GitHub Pages
1. Tạo một repository trên GitHub.
2. Push toàn bộ thư mục này lên repo đó.
3. Vào **Settings -> Pages**, chọn nhánh `main` (hoặc `master`), lưu lại và nhận link.

---
*Chúc bạn đạt kết quả cao với môn học Nhập môn Công nghệ số và Ứng dụng Trí tuệ nhân tạo!*
