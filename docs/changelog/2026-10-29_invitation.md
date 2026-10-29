# Thiệp cưới — template & trang công khai

- Ngày: 2026-10-29
- Feature: invitation (→ docs/instruction/invitation.md)
- Loại: Added
- File: `components/Invitation/index.tsx`, `components/Invitation/Ornament.tsx`, `components/Invitation/Countdown.tsx`, `constants/themes.ts`, `app/thiep/[slug]/page.tsx`, `app/thiep/[slug]/InvitationView.tsx`, `app/globals.css`, `config/images.ts`

## Thay đổi
- **Template + JSON**: `WeddingData` render thành thiệp với các section bìa, lời mời, sự kiện, đếm ngược, album, RSVP, sổ lời chúc, mạng xã hội, nhạc nền.
- **7 chủ đề**: token màu/font/bo góc + họa tiết SVG riêng, đổi theme không mất nội dung; tự co giãn bằng container query.
- **Trang công khai**: `/thiep/[slug]` noindex, trang mẫu theo chủ đề, trang "Thiệp đã hết hạn", nút báo cáo vi phạm.

## Constants / Translation keys mới
- `THEME_KEY`, `THEMES`, `themeCssVars`, `DOUBLE_HAPPINESS`, `RSVP_MAX_GUESTS`, `COUNTDOWN_TICK`, `DEMO_SLUG_PREFIX`, `EXPIRED_DEMO_SLUG`; `invitation.*`, `themes.*`, `publicPage.*`.

## Lý do
- design.md: AI không viết HTML tự do, chỉ điền JSON; 7 chủ đề dùng chung layout.
