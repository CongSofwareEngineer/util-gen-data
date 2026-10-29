# Giới thiệu & hoa hồng (GĐ3)
> Cập nhật: 2026-10-29

## Tổng quan
`/gioi-thieu`: mã mời của user, link đăng ký, hoa hồng và yêu cầu rút tiền. Quy tắc hoa hồng **chưa chốt** (xem cuối `design.md`). Mock từ `MOCK_COMMISSIONS`.

## 1. Mã mời & link
- Hiện `user.inviteCode`, link `ROUTES.register?ma=<code>` (copy + QR), 4 bước (`steps`): gửi link → đăng ký bằng mã → nạp tiền → rút sau đối soát.

## 2. Hoa hồng
- `stats`: người đã mời, chờ duyệt, được rút, đã trả (`COMMISSION_STATUS`). Bảng: người được mời, giá trị nạp, hoa hồng, trạng thái, ngày.

## 3. Rút tiền
- Form: số tiền (≥ `MIN_WITHDRAW`, ≤ số được rút), họ tên chủ TK, CCCD, ngân hàng, số TK; ghi chú thuế TNCN. Số được rút < tối thiểu → khóa form.

## Translation / Constants
- `referral.*`; `MIN_WITHDRAW`, `COMMISSION_STATUS`, `QUERY_PARAM.inviteCode`.

## Liên quan
- docs/instruction/admin.md §5, docs/instruction/auth.md §2
