# Ví & nạp tiền
> Cập nhật: 2026-10-29

## Tổng quan
`/vi`: ví nạp trước, phải nạp mới chat được (không có tiền tặng). Nạp qua VietQR/PayOS. Hiện **mock** (thanh toán tự thành công sau `MOCK_PAYMENT_DELAY`).
Sub-logic: §1 Số dư, §2 Nạp tiền, §3 Lịch sử giao dịch.

## 1. Số dư
- Thẻ `bg-neutral` hiện `user.balance`, badge "Số dư sắp hết" khi < `LOW_BALANCE_WARNING`. Số dư cũng hiện ở topbar AppShell và sidebar.

## 2. Nạp tiền
1. Chọn mức `TOPUP_AMOUNTS` (20k/50k/80k/100k) hoặc "Tự nhập" (≥ `MIN_TOPUP`, bước `MONEY_INPUT_STEP`).
2. "Nạp X qua VietQR" → `TopupDialog`: QR (placeholder), số tiền, nội dung chuyển khoản `wallet.transferNote` ("NAP <mã>"), trạng thái chờ.
3. Thanh toán xong → cộng số dư, thêm dòng `WALLET_TX_TYPE.TOPUP` vào lịch sử.

## 3. Lịch sử giao dịch
- Bảng như sổ cái: thời gian, loại (nạp / chat AI / gia hạn / hoàn), chi tiết (phiên, model, token), số tiền (+ xanh / − đỏ), số dư sau.

## Translation / Constants
- `wallet.*`; `TOPUP_AMOUNTS`, `MIN_TOPUP`, `LOW_BALANCE_WARNING`, `WALLET_TX_TYPE`, `MOCK_PAYMENT_DELAY`, `MONEY_INPUT_STEP`.

## Liên quan
- docs/instruction/studio.md §2 (trừ tiền mỗi tin), docs/instruction/publish.md §2 (phí gia hạn)
