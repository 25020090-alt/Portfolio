# 🚀 Hiệu Ứng Công Nghệ Cao - Portfolio Triệu Văn Duy

## 📋 Tổng Quan

Portfolio đã được nâng cấp với các hiệu ứng công nghệ cao độc đáo, mang đậm chất "CÔNG NGHỆ" để phân biệt với các portfolio khác.

## ✨ Các Hiệu Ứng Đã Thêm

### 1. **Particle System** (`js/particles.js`)
- **Mô tả**: Hệ thống hạt chuyển động kết nối với nhau tạo thành mạng lưới
- **Tương tác**: Hạt tránh con trỏ chuột, tạo hiệu ứng tương tác
- **Màu sắc**: Hot Pink (#ff007f) và Neon Cyan (#00f0ff)
- **Vị trí**: Toàn màn hình, phía sau nội dung

### 2. **Circuit Board Pattern** (CSS)
- **Mô tả**: Họa tiết mạch điện tử dạng lưới
- **Hiệu ứng**: Pulsing animation tạo cảm giác "sống"
- **Vị trí**: Overlay toàn trang

### 3. **Hexagonal Pattern** (CSS)
- **Mô tả**: Họa tiết tổ ong công nghệ
- **Độ trong suốt**: 2% opacity để không làm rối mắt
- **Vị trí**: Lớp phủ toàn trang

### 4. **Glitch Text Effect** (CSS)
- **Mô tả**: Hiệu ứng nhiễu kỹ thuật số cho text
- **Màu sắc**: Hot Pink và Neon Cyan
- **Ứng dụng**: Có thể áp dụng cho tiêu đề chính

### 5. **Holographic Shimmer** (CSS + JS)
- **Mô tả**: Hiệu ứng ánh sáng hologram quét qua cards
- **Tần suất**: 6 giây/lần
- **Vị trí**: Tất cả các card

### 6. **Data Stream** (JS)
- **Mô tả**: Dòng dữ liệu rơi từ trên xuống
- **Số lượng**: 5 dòng ngẫu nhiên
- **Màu sắc**: Neon Cyan với opacity thấp

### 7. **Scan Line** (JS)
- **Mô tả**: Đường scan quét ngang màn hình
- **Chu kỳ**: 4 giây
- **Màu sắc**: Neon Cyan với glow effect

### 8. **Tech-Enhanced Cards** (CSS)
- **Mô tả**: Cards với hover effect đặc biệt
- **Hiệu ứng**: 
  - Border phát sáng khi hover
  - Glow nội bộ (inset glow)
  - Transform 3D khi hover
  - Bóng đổ nhiều lớp

### 9. **Animated Border Gradient** (CSS)
- **Mô tả**: Border gradient xoay liên tục
- **Màu sắc**: Chuyển từ Hot Pink sang Neon Cyan
- **Tốc độ**: 3 giây/chu kỳ

### 10. **Hero Grid Animation** (CSS)
- **Mô tả**: Lưới 3D perspective với animation
- **Hiệu ứng**: Grid di chuyển vô tận tạo chiều sâu

## 🎨 Màu Sắc Chủ Đạo

- **Primary (Hot Pink)**: #ff007f
- **Accent (Neon Cyan)**: #00f0ff
- **Background**: Deep Slate (#020617)

## 🔧 Cách Sử Dụng

### Áp dụng class cho elements:

```css
/* Card với hiệu ứng tech */
.card.tech-enhanced {
  /* Hiệu ứng đã được định nghĩa trong style.css */
}

/* Text với glitch effect */
.glitch-text {
  /* Thêm data-text attribute */
}

/* Card với holographic effect */
.holo-card {
  /* Hiệu ứng shimmer */
}

/* Border với animated gradient */
.animated-border::before {
  /* Border xoay */
}
```

### Trong JavaScript:

```javascript
// Tự động áp dụng tech-enhanced cho tất cả cards
document.querySelectorAll('.card').forEach(card => {
  card.classList.add('tech-enhanced');
});

// Áp dụng holographic effect
applyHolographicEffect(element);

// Áp dụng glitch effect
applyGlitchEffect(titleElement, 5000);
```

## 🎯 Điểm Độc Đáo

1. **Không trùng lặp**: Các hiệu ứng được thiết kế riêng, không dùng template có sẵn
2. **Tương tác cao**: Particle system phản ứng với chuột
3. **Đa lớp hiệu ứng**: Nhiều lớp overlay tạo chiều sâu
4. **Màu sắc nổi bật**: Hot Pink + Neon Cyan tạo điểm nhấn
5. **Performance**: Tối ưu hóa để không làm chậm trang

## 📱 Responsive

Tất cả hiệu ứng đều:
- Tự động điều chỉnh theo kích thước màn hình
- Tắt trên thiết bị cảm ứng (coarse pointer)
- Giảm số lượng particle trên mobile

## 🚫 Lưu Ý

- Không nên thêm quá nhiều hiệu ứng cùng lúc
- Giữ nguyên thứ tự load scripts: `particles.js` trước `app.js`
- Test trên nhiều trình duyệt để đảm bảo hiệu năng

## 🔧 Tùy Chỉnh

Để điều chỉnh hiệu ứng, sửa các biến CSS trong `style.css`:

```css
:root {
  --primary: #ff007f;      /* Đổi màu primary */
  --accent: #00f0ff;       /* Đổi màu accent */
  --duration-fast: 200ms;  /* Tốc độ animation */
}
```

Để thay đổi số lượng particle, sửa trong `particles.js`:

```javascript
const particleCount = Math.min(Math.floor(window.innerWidth / 12), 100);
// Giảm số 12 để tăng particle, tăng để giảm
```

---

**Phiên bản**: 1.0  
**Ngày cập nhật**: 02/06/2026  
**Tác giả**: Triệu Văn Duy - 25020090