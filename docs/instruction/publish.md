# Xuất bản link
> Cập nhật: 2026-10-29

## Tổng quan
Nhấn "Tạo" trong studio để ra link `domain/thiep/<slug>` (slug do admin cấp). Link có thời hạn, gia hạn luôn có phí. Hiện **mock**.
Sub-logic: §1 Tạo link, §2 Gia hạn, §3 Ẩn / xóa / QR / tải về.

## 1. Tạo link — `components/Studio/PublishDialog.tsx`
1. Hiện link (read-only) + ghi chú "muốn đổi link liên hệ admin".
2. Chọn thời hạn `LINK_DURATIONS` (3/7/10/30 ngày, mặc định `DEFAULT_LINK_DURATION`); "Không giới hạn" bị khóa cho thiệp cưới; ngày > `user.maxDurationDays` bị khóa.
3. Cảnh báo nếu ngày hết hạn (`linkExpiry`) trước ngày cưới. Ghi chú giữ dữ liệu `EXPIRED_RETENTION_DAYS` ngày sau hết hạn.
4. Riêng tư (GĐ2, badge "Sắp ra mắt"): mật khẩu link, không cho Google index.
5. "Tạo link" → thành công: QR, ô copy link (`useCopy`), mở thiệp, về "Trang của tôi".

## 2. Gia hạn — `app/(user)/trang-cua-toi/components/ExtendDialog.tsx`
- Chọn số ngày (bỏ "không giới hạn"), phí = ngày × `EXTEND_FEE_PER_DAY` (**giá tạm**, chưa chốt). Link còn hạn → cộng từ ngày hết hạn; đã hết → cộng từ hôm nay. Không đủ số dư → khóa nút.

## 3. Ẩn / xóa / QR / tải về — `PageCard.tsx`
- Ẩn/Hiện (không áp dụng cho trang hết hạn/bị khóa), Xóa (confirm, nói rõ xóa cả ảnh), QR (modal), Tải HTML/PDF/PNG (`EXPORT_FORMAT`, thật: job Playwright qua hàng đợi → toast báo đang xuất).

## Translation / Constants
- `studio.publish.*`, `myPages.extend.*`, `myPages.delete.*`; `LINK_DURATIONS`, `DEFAULT_LINK_DURATION`, `UNLIMITED_DURATION`, `EXPIRED_RETENTION_DAYS`, `EXTEND_FEE_PER_DAY`, `EXPORT_FORMAT`, `PAGE_STATUS`.

## Liên quan
- docs/instruction/my-pages.md, docs/instruction/wallet.md
