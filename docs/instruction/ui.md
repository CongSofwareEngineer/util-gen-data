# UI dùng chung
> Cập nhật: 2026-10-29

## Tổng quan
Khung giao diện chung của app: theme daisyUI, layout public / user / admin, modal, toast và các component nhỏ. Ưu tiên class daisyUI (https://daisyui.com), hạn chế tự viết component.
Sub-logic: §1 Theme & font, §2 Layout, §3 Modal & confirm, §4 Toast, §5 Component nhỏ.

## Dùng chung
- `cn()` — `utils/tailwind.ts`; `useLanguage` — `hooks/useLanguage.tsx`; mock data — `mock/index.ts`.
- Route: `ROUTES` (`constants/app.ts`, slug tiếng Việt).

## 1. Theme & font
### Mục đích
Một theme daisyUI tên `thiep` (hồng – champagne – sage) cho toàn app; 7 chủ đề thiệp dùng token riêng (xem invitation.md §2).
### Entry points
- `app/globals.css`: `@plugin "daisyui"` (`themes: false`) + `@plugin "daisyui/theme"` tên `thiep`; `@theme` khai báo `--font-sans` (Be Vietnam Pro), `--font-display` (Playfair Display).
- `app/layout.tsx`: `<html data-theme='thiep'>`, nạp Google Fonts qua `GOOGLE_FONTS_URL`.
### Edge cases
- Mọi font đều có bộ chữ tiếng Việt (cần cho xuất PDF/PNG).

## 2. Layout
### Entry points
- `app/(public)/layout.tsx` — `Header` (navbar, menu dropdown trên mobile) + `Footer`.
- `app/(user)/layout.tsx`, `app/admin/layout.tsx` — `components/AppShell` với `APP_SHELL_VARIANT.USER | ADMIN`, metadata `noindex`.
### Luồng xử lý (AppShell)
1. Chờ `hasHydrated` của store user → hiện spinner.
2. Chưa đăng nhập → `router.replace(ROUTES.login)`; vào admin mà không phải admin → `ROUTES.myPages`.
3. daisyUI `drawer lg:drawer-open`: sidebar `menu` (tự đánh dấu `menu-active` theo pathname), topbar có nút số dư ví (vàng khi < `LOW_BALANCE_WARNING`) và dropdown tài khoản (chuyển user/admin, đổi mật khẩu, đăng xuất).
4. `fullHeightPaths` (studio) → nội dung cao đúng `h-dvh`, không padding.

## 3. Modal & confirm
- `useModal().open({ title, children, classNames, overClickClose })` → `components/MyModal` render daisyUI `modal modal-open modal-bottom sm:modal-middle` (bottom sheet trên mobile). Esc / bấm nền để đóng.
- `components/ConfirmDialog` — nội dung xác nhận (`isDanger` → nút đỏ).

## 4. Toast
- `toast({ type, message })` (`utils/toast.ts`) → `components/Toast` (daisyUI `toast` + `alert`), `type`: default | success | warning | error.

## 5. Component nhỏ
- `Logo` (logo chữ, tên lấy từ `site.name`), `PageHeader`, `ThemeSwatch`, `QrCode` (**placeholder**, chưa cài thư viện QR).

## Liên quan
- docs/instruction/invitation.md, docs/instruction/studio.md
