# Quản trị
> Cập nhật: 2026-10-29

## Tổng quan
`/admin/*` (AppShell ADMIN, chỉ `USER_ROLE.ADMIN`). Mock toàn bộ.
Sub-logic: §1 Tổng quan, §2 Tài khoản, §3 Model AI, §4 Báo cáo vi phạm, §5 Mã mời & hoa hồng.

## 1. Tổng quan — `/admin`
- Thẻ: tài khoản, trang đang hiển thị, doanh thu, chi phí AI, lãi gộp, báo cáo chờ xử lý.
- 7 ngày gần nhất: 2 thanh `progress` (doanh thu / chi phí) + lãi mỗi ngày. Bảng lãi lỗ theo model (tin nhắn, token, doanh thu, chi phí, biên lãi %).

## 2. Tài khoản — `/admin/tai-khoan`
- Tìm theo tên/email. Bảng: người dùng (+ badge "chưa đổi mật khẩu"), vai trò, trạng thái, hạn mức (`{used}/{max} trang · tối đa {days} ngày`), số dư, ngày tạo.
- `UserDialog`: tạo (mật khẩu tạm, link được cấp, vai trò, số trang tối đa, thời hạn tối đa — mặc định `DEFAULT_USER_QUOTA`) / sửa hạn mức & link. Menu: đặt lại mật khẩu (confirm), khóa / mở khóa.

## 3. Model AI — `/admin/model-ai`
- Bảng: tên + loại (local/cloud) + nhãn giá, kết nối, giá vào/ra / 1.000 token, ước tính/tin, radio mặc định (model tắt không chọn được), toggle cho chọn (model mặc định không tắt được), sửa.
- `ModelDialog`: các trường như bảng "Danh sách model" trong design.md (bước giá `PRICE_INPUT_STEP`).
- Thẻ "Model cloud dự phòng": chọn model cloud dùng khi máy local không phản hồi.

## 4. Báo cáo vi phạm — `/admin/bao-cao`
- Bảng: trang (link mở tab mới) + chủ trang, lý do, thời gian, trạng thái. "Khóa trang" (confirm) hoặc "Bỏ qua" → `REPORT_STATUS.RESOLVED`.

## 5. Mã mời & hoa hồng — `/admin/hoa-hong`
- Tabs `ADMIN_COMMISSION_TAB`: mã mời (`InviteCodeDialog`: mã, người giới thiệu, số lượt tối đa, hạn — trống = không giới hạn), yêu cầu rút (đã chuyển / từ chối), quy tắc (mức %, ngày đối soát, rút tối thiểu, chỉ đơn đầu — giá trị tạm `REFERRAL_DEFAULTS`, có alert "chưa chốt").

## Translation / Constants
- `admin.*`, `role.*`, `userStatus.*`, `modelType.*`, `reportStatus.*`, `withdrawStatus.*`; `DEFAULT_USER_QUOTA`, `REFERRAL_DEFAULTS`, `PRICE_INPUT_STEP`, `ADMIN_COMMISSION_TAB`.

## Liên quan
- docs/instruction/ui.md §2, docs/instruction/referral.md
