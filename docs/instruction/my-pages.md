# Trang của tôi
> Cập nhật: 2026-10-29

## Tổng quan
`/trang-cua-toi`: danh sách trang đã tạo và phiên chat. Mock từ `MOCK_PAGES`, `MOCK_SESSIONS`.
Sub-logic: §1 Thống kê & hạn mức, §2 Trang đã tạo, §3 Phiên chat.

## 1. Thống kê & hạn mức
- daisyUI `stats`: số trang / `maxPages`, đang hiển thị, lượt xem, RSVP. Hết hạn mức → nút "Tạo thiệp mới" bị khóa + alert liên hệ admin.

## 2. Trang đã tạo — `components/PageCard.tsx`
- Thẻ có nền gradient theo theme, badge trạng thái (`PAGE_STATUS_BADGE`), link, lượt xem, RSVP, còn bao nhiêu ngày (≤ 3 ngày tô vàng).
- Hành động: Sửa tiếp (`/tao-thiep?phien=<sessionId>`), mở trang, QR, menu "Thêm" (gia hạn, tải file, ẩn/hiện, xóa) — chi tiết ở publish.md §2–3.

## 3. Phiên chat
- Bảng: tên phiên + trạng thái (đang mở / đã kết thúc), model, số tin, chi phí + token, cập nhật; nút "Chat tiếp" mở studio với `QUERY_PARAM.session`.

## Translation / Constants
- `myPages.*`, `pageStatus.*`; `MY_PAGES_TAB`, `QUERY_PARAM.session`.

## Liên quan
- docs/instruction/publish.md, docs/instruction/studio.md
