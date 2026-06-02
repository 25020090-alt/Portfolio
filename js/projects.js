/* ============================================
   ✏️ PROJECTS DATA — js/projects.js
   Cấu hình 6 bài tập tại đây
   
   Mỗi bài hỗ trợ 3 loại (type):
   - 'iframe'    → nhúng file projects/baiX/index.html
   - 'external'  → mở link ngoài (Google Docs, Notion...)
   - 'html'      → hiển thị HTML trực tiếp
   ============================================ */

const PROJECTS = [
  // ✏️ Bài tập 1
  {
    id: 1,
    title: 'Quản lý Tệp tin & Thư mục',
    icon: '🗂️',
    description: 'Thực hành tạo, tổ chức và quản lý hệ thống tệp tin, thư mục trên máy tính. Hiểu cấu trúc cây thư mục và các thao tác cơ bản.',
    category: 'basic',            // ✏️ Danh mục: 'basic', 'intermediate', 'advanced'
    type: 'iframe',               // ✏️ Đổi thành 'external' hoặc 'html'
    src: 'projects/bai1/index.html',
    url: 'projects/bai1/index.html',
    tags: ['File System', 'Windows'],
    date: '08/03/2026 23:43',
    info: 'Bài tập thực hành thao tác với hệ thống tệp tin trên Windows. Bao gồm tạo, đổi tên, di chuyển, sao chép và xóa tệp/thư mục.'
  },

  // ✏️ Bài tập 2
  {
    id: 2,
    title: 'Soạn thảo Văn bản Số',
    icon: '📝',
    description: 'Sử dụng công cụ soạn thảo văn bản trực tuyến, định dạng tài liệu, bảng biểu và liên kết.',
    category: 'basic',
    type: 'iframe',
    src: 'projects/bai2/index.html',
    url: 'projects/bai2/index.html',
    tags: ['Google Docs', 'Văn bản'],
    date: '19/03/2026 23:45',
    info: 'Thực hành soạn thảo văn bản chuyên nghiệp với Google Docs, bao gồm định dạng, header/footer, mục lục tự động.'
  },

  // ✏️ Bài tập 3
  {
    id: 3,
    title: 'Ứng dụng Kỹ thuật Prompt Engineering',
    icon: '🤖',
    description: 'Thực hành kỹ năng thiết kế và tinh chỉnh Prompt để tương tác hiệu quả với các mô hình AI.',
    category: 'advanced',
    type: 'iframe',
    src: 'projects/bai3/index.html',
    url: 'projects/bai3/index.html',
    tags: ['AI', 'Prompt Engineering'],
    date: '04/04/2026 14:30',
    info: 'Phân tích các cấp độ Prompt (Cơ bản, Cải tiến, Nâng cao) và ứng dụng thực tiễn trong học thuật, DSA và đại số tuyến tính.'
  },

  // ✏️ Bài tập 4
  {
    id: 4,
    title: 'Hợp tác & Quản lý Dự án Số',
    icon: '🤝',
    description: 'Thực hành các kỹ năng làm việc nhóm trực tuyến thông qua Trello, Google Docs và quản lý tệp tin.',
    category: 'intermediate',
    type: 'iframe',
    src: 'projects/bai4/index.html',
    url: 'projects/bai4/index.html',
    tags: ['Teamwork', 'Trello', 'Management'],
    date: '19/04/2026 17:14',
    info: 'Lựa chọn công cụ, quy trình tương tác nhóm và phân tích các giải pháp vượt qua thách thức trong môi trường số.'
  },

  // ✏️ Bài tập 5
  {
    id: 5,
    title: 'Ứng dụng AI Thiết kế Infographic',
    icon: '🎨',
    description: 'Sử dụng AI để lên ý tưởng nội dung và tạo prompt hình ảnh minh họa cho Infographic.',
    category: 'advanced',
    type: 'iframe',
    src: 'projects/bai5/index.html',
    url: 'projects/bai5/index.html',
    tags: ['AI Tools', 'Prompt', 'Design'],
    date: '26/04/2026 22:23',
    info: 'Trải nghiệm sử dụng AI để xây dựng nội dung OOP và tạo prompt cho các công cụ thiết kế hình ảnh 3D.'
  },

  // ✏️ Bài tập 6
  {
    id: 6,
    title: 'Đạo đức & Trách nhiệm khi sử dụng AI',
    icon: '⚖️',
    description: 'Phân tích ranh giới giữa hỗ trợ hợp lý và gian lận học thuật, thiết lập bộ nguyên tắc sử dụng AI có trách nhiệm.',
    category: 'advanced',
    type: 'iframe',
    src: 'projects/bai6/index.html',
    url: 'projects/bai6/index.html',
    tags: ['AI Ethics', 'Responsibility'],
    date: '14/05/2026 00:28',
    info: 'Nghiên cứu các quy định về AI trong học thuật, phương pháp thẩm định kết quả và quy tắc 15 phút bế tắc.'
  }
];

/* ✏️ Danh mục filter */
const CATEGORIES = {
  all: 'Tất cả',
  basic: 'Cơ bản',
  intermediate: 'Trung cấp',
  advanced: 'Nâng cao'
};

/* ✏️ Thông tin cá nhân */
const PROFILE = {
  name: 'Triệu Văn Duy',              // ✏️ Đổi tên
  studentId: '25020090',            // ✏️ MSSV
  classCode: 'VNU1001_E252015',
  email: '25020090@vnu.edu.vn',    // ✏️ Email
  // Để thêm ảnh thật, hãy thay '<img src="images/avatar.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:50%">' 
  // (nhớ tạo thư mục images và bỏ ảnh avatar.jpg vào đó)
  avatar: '<img src="assets/images/bai6/avatar.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:50%">',                      // ✏️ Emoji avatar hoặc thẻ <img>
  bio: 'Sinh viên năm nhất ngành Công nghệ Thông tin. Đam mê khám phá công nghệ số và ứng dụng trí tuệ nhân tạo vào cuộc sống.',
  university: 'Trường Đại Học Công Nghệ-ĐHQG Hà Nội',   // ✏️ Tên trường
  faculty: 'Khoa Công nghệ Thông tin' // ✏️ Tên khoa
};

/* ✏️ Thông tin môn học */
const COURSE = {
  name: 'Nhập môn Công nghệ số và Ứng dụng Trí tuệ nhân tạo',
  code: 'IT1xxx',                     // ✏️ Mã môn
  semester: 'HK2 2025-2026',
  instructor: 'ThS. Nguyễn Văn B'     // ✏️ Giảng viên
};

/* ✏️ Kỹ năng — tên & phần trăm */
const SKILLS = [
  { name: 'Quản lý tệp tin', percent: 85 },
  { name: 'Soạn thảo văn bản', percent: 80 },
  { name: 'Bảng tính & Dữ liệu', percent: 75 },
  { name: 'Thiết kế trình bày', percent: 70 },
  { name: 'Công cụ AI', percent: 65 },
  { name: 'An toàn thông tin', percent: 60 }
];

/* ✏️ Timeline học tập */
const TIMELINE = [
  { date: '23/02/2026 - 08/03/2026', title: 'Bài 1: Máy tính và các thiết bị ngoại vi', desc: 'Tuần 1, Tuần 2' },
  { date: '09/03/2026 - 22/03/2026', title: 'Bài 2: Khai thác dữ liệu và thông tin', desc: 'Tuần 3, Tuần 4' },
  { date: '23/03/2026 - 05/04/2026', title: 'Bài 3: Tổng quan về trí tuệ nhân tạo', desc: 'Tuần 5, Tuần 6' },
  { date: '06/04/2026 - 19/04/2026', title: 'Bài 4: Giao tiếp và hợp tác trong môi trường số', desc: 'Tuần 7, Tuần 8' },
  { date: '20/04/2026 - 03/05/2026', title: 'Bài 5: Sáng tạo nội dung số', desc: 'Tuần 9, Tuần 10' },
  { date: '04/05/2026 - 17/05/2026', title: 'Bài 6: An toàn và liêm chính học thuật trong môi trường số', desc: 'Tuần 11, Tuần 12' },
  { date: '18/05/2026 - 31/05/2026', title: 'Bài 7A: AI trong Khoa học Tự nhiên & Kỹ thuật - Công nghệ', desc: 'Tuần 13, Tuần 14' }
];

/* ✏️ Mục tiêu portfolio */
const GOALS = [
  { icon: '🎯', title: 'Tổng hợp kiến thức', desc: 'Hệ thống hóa toàn bộ kiến thức đã học trong môn.' },
  { icon: '💡', title: 'Thể hiện kỹ năng', desc: 'Chứng minh năng lực qua các bài tập thực hành.' },
  { icon: '🌱', title: 'Phát triển bản thân', desc: 'Ghi nhận quá trình học tập và trưởng thành.' },
  { icon: '🔗', title: 'Kết nối & Chia sẻ', desc: 'Chia sẻ sản phẩm học tập với cộng đồng.' }
];

/* ✏️ Liên kết mạng xã hội */
const SOCIALS = [
  { icon: '📧', label: 'Email', url: '25020090@vnu.edu.vn' },
  { icon: '🐙', label: 'GitHub', url: 'https://github.com/' },
  { icon: '💼', label: 'LinkedIn', url: 'https://linkedin.com/' },
  { icon: '📘', label: 'Facebook', url: 'https://facebook.com/' }
];
