# Studio — chat AI + xem trước
> Cập nhật: 2026-10-29

## Tổng quan
Màn hình chính `/tao-thiep`: bên trái chat với AI / sửa tay / chọn chủ đề, bên phải xem trước trực tiếp. Nguyên tắc **template + JSON**: AI chỉ điền JSON (`WeddingData`), template render. Hiện AI trả lời **giả lập** (`MOCK_AI_REPLY`).
Sub-logic: §1 Bố cục, §2 Chat & tính tiền, §3 Chọn model, §4 Ảnh, §5 Sửa tay, §6 Chọn chủ đề, §7 Xem trước.

## Dùng chung
- Store `zustand/studio.ts` (`useStudio`): `data`, `messages`, `modelId`, `isReplying`, `device`, `sessionCost`, `sessionTokens`; action `setData`, `setTheme`, `setModel`, `setDevice`, `addMessage` (tự cộng tiền/token phiên).
- Mock: `MOCK_WEDDING`, `MOCK_MESSAGES`, `MOCK_MODELS`, `MOCK_AI_REPLY`.

## 1. Bố cục
- Desktop: cột trái 440px (tabs `STUDIO_TAB`: chat / form / theme), phải là preview.
- Mobile: `tabs-box` chuyển giữa `STUDIO_MOBILE_VIEW.EDIT` và `PREVIEW`.

## 2. Chat & tính tiền — `components/Studio/ChatPanel.tsx`
### Luồng xử lý
1. Đầu panel: chọn model + "Phiên này: X đ" (chính), token (phụ), số dư ví.
2. Gửi (Enter, Shift+Enter xuống dòng): chặn khi số dư < `estimatePerMessage` của model (server giữ tạm tiền tối đa của lượt).
3. Thêm tin user → `isReplying` (daisyUI `loading-dots`) → sau `MOCK_AI_REPLY_DELAY` thêm tin AI kèm token + `cost = messageCost(model, in, out)` → trừ `user.balance`.
4. Mock thông minh nhẹ: tin có tên chủ đề (vd "Trung Hoa") → đổi theme; có ảnh đính kèm → ảnh đầu làm ảnh bìa + thêm vào album.
### Edge cases
- Số dư < `LOW_BALANCE_WARNING` → alert vàng "sắp hết". Không đủ → khóa ô chat + nút "Nạp thêm" (phiên và preview giữ nguyên).
- Tin AI render markdown (`react-markdown` + `remark-gfm`), footer hiện tiền + token của tin.

## 3. Chọn model — `ModelSelect.tsx`
- Chỉ model `enabled`, sắp rẻ → đắt (`getSelectableModels`), hiện tên, nhãn mức giá (`TIER_BADGE`), "Mặc định", giá ước tính/tin. Đổi giữa phiên được.
- Nút "Bảng giá" mở modal bảng giá vào/ra theo 1.000 token.

## 4. Ảnh
- Kéo thả vào panel chat hoặc nút đính kèm. Chỉ `ACCEPT_IMAGE_TYPES`, mỗi ảnh ≤ `MAX_IMAGE_SIZE_MB`, tổng ảnh trang ≤ `MAX_IMAGES_PER_PAGE`. Mock dùng `URL.createObjectURL`; thật: upload Cloudinary (`services/upload.ts`, `UPLOAD_IMAGE_TYPE.PAGE`) rồi lưu URL.

## 5. Sửa tay — `EditForm.tsx`
- Nhóm `fieldset`: chú rể/cô dâu (tên, bố, mẹ), ngày cưới + lời mời, lễ thành hôn / tiệc cưới (giờ, nơi, địa chỉ, link bản đồ), ảnh (bấm chọn ảnh bìa, gỡ ảnh), bật/tắt phần (đếm ngược, RSVP, lời chúc), mạng xã hội.
- Link MXH kiểm tra khi blur bằng `validateSocialUrl` (`utils/validate.ts`): chỉ `https`, đúng tên miền `SOCIAL_DOMAINS`; `website` tự do. Lỗi hiện dưới ô, không ghi vào JSON.

## 6. Chọn chủ đề — `ThemePicker.tsx`
- Lưới 7 thẻ tô bằng chính token của theme; đổi theme giữ nguyên nội dung. Dùng lại ở landing (bấm mở thiệp mẫu).

## 7. Xem trước — `PreviewPanel.tsx`
- Toolbar: `join` chuyển `PREVIEW_DEVICE.MOBILE` (daisyUI `mockup-phone`) / `DESKTOP` (`mockup-browser`), tên chủ đề, nút **Tạo** → `PublishDialog` (xem publish.md).

## Translation / Constants
- `studio.*`, `themes.*`, `social.*`, `validate.*`; `STUDIO_TAB`, `STUDIO_MOBILE_VIEW`, `PREVIEW_DEVICE`, `CHAT_ROLE`, `MODEL_TIER`, `MODEL_TYPE`, `TOKEN_PRICE_UNIT`, `LOW_BALANCE_WARNING`, `MAX_IMAGES_PER_PAGE`, `MAX_IMAGE_SIZE_MB`, `ACCEPT_IMAGE_TYPES`, `SOCIAL_FIELD`, `SOCIAL_DOMAINS`, `MOCK_AI_REPLY_DELAY`.

## Liên quan
- docs/instruction/invitation.md, docs/instruction/publish.md, docs/instruction/wallet.md
