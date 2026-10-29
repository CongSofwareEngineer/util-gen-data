# Thiệp cưới — template & trang công khai
> Cập nhật: 2026-10-29

## Tổng quan
Render `WeddingData` thành trang thiệp theo 1 trong 7 chủ đề. Layout (thứ tự section) dùng chung, chủ đề chỉ là bộ token. Dùng cả trong preview studio, landing và trang công khai `/thiep/[slug]`.
Sub-logic: §1 JSON schema, §2 7 chủ đề, §3 Các section, §4 Trang công khai.

## Dùng chung
- `components/Invitation/index.tsx` (+ `Ornament.tsx`, `Countdown.tsx`), `constants/themes.ts`, class `.inv-*` trong `app/globals.css`.

## 1. JSON schema — `WeddingData` (`types/index.ts`)
`theme`, `groom`/`bride` (`name`, `father?`, `mother?`), `weddingDate`, `invitation`, `ceremony`/`reception` (`time`, `place`, `address`, `mapUrl?`), `coverImage`, `album[]`, `music?`, `showCountdown`, `showRsvp`, `showWishes`, `wishes[]`, `social` (theo `SOCIAL_FIELD`).

## 2. 7 chủ đề
- `THEMES[THEME_KEY]`: `colors` (background, surface, primary, accent, text, muted), `fonts` (heading, body, names), `radius`, `coverOverlay`.
- `themeCssVars(theme)` → biến `--inv-*` gắn vào gốc thiệp; class `.inv`, `.inv-heading`, `.inv-names`, `.inv-card`, `.inv-btn`, `.inv-field`, `.inv-muted` đọc các biến đó.
- Họa tiết riêng (`Ornament`): cổ điển (khung viền + hoa văn góc), Trung Hoa (chữ 囍 `DOUBLE_HAPPINESS`), công nghệ (lưới + con trỏ nhấp nháy), tương lai (kính mờ + quầng sáng), dễ thương (trái tim), Tây Âu (cành lá), đồng quê (giấy kraft + bông lúa).

## 3. Các section
1. Bìa: ảnh bìa (`next/image`, Cloudinary `f_auto,q_auto`) + overlay + họa tiết + tên + ngày.
2. Lời mời + bố mẹ hai bên. 3. Sự kiện (lễ + tiệc, thứ trong tuần qua `invitation.weekdays.*`, nút bản đồ).
4. Đếm ngược (daisyUI `countdown`, tick `COUNTDOWN_TICK`). 5. Album. 6. RSVP (tên, đến/không, số người ≤ `RSVP_MAX_GUESTS`). 7. Sổ lời chúc. 8. Footer + icon MXH. Nút nhạc nền nếu có `music`.
- `@container` + `@md:` để tự co giãn theo khung preview điện thoại / máy tính.
- `isPreview`: form RSVP / lời chúc không gửi.

## 4. Trang công khai — `/thiep/[slug]`
- `page.tsx` (server): `generateMetadata` tiêu đề "Thiệp cưới {groom} & {bride}", `robots: noindex`. `InvitationView` (client).
- Mock: `het-han` (`EXPIRED_DEMO_SLUG`) → trang "Thiệp đã hết hạn" (dữ liệu giữ `EXPIRED_RETENTION_DAYS` ngày); `mau-<theme>` (`DEMO_SLUG_PREFIX`) → thiệp mẫu theo chủ đề; slug khác → `MOCK_WEDDING`.
- Nút "Báo cáo" (góc phải, ẩn khi in) → modal nhập lý do → gửi admin (xem admin.md §4).

## Translation / Constants
- `invitation.*`, `publicPage.*`, `social.*`; `THEME_KEY`, `THEMES`, `RSVP_MAX_GUESTS`, `COUNTDOWN_TICK`, `DEMO_SLUG_PREFIX`, `EXPIRED_DEMO_SLUG`.

## Liên quan
- docs/instruction/studio.md, docs/instruction/publish.md
