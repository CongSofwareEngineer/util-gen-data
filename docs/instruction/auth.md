# Đăng nhập & tài khoản
> Cập nhật: 2026-10-29

## Tổng quan
Chỉ người có tài khoản mới dùng được app: tài khoản do admin tạo (phải đổi mật khẩu lần đầu) hoặc đăng ký bằng mã mời. Hiện **chạy mock** — chưa gọi API.
Sub-logic: §1 Đăng nhập, §2 Đăng ký bằng mã mời, §3 Đổi mật khẩu, §4 Store user.

## Dùng chung
- Store `zustand/user.ts` (`useUser`), cookie token `utils/cookie.ts` (`COOKIES_KEY`), `BaseAPI` refresh token (`config/baseApi.ts`).
- `MOCK_USER` (`mock/index.ts`) — role ADMIN để xem được cả khu admin.

## 1. Đăng nhập — `/dang-nhap`
- Form email + mật khẩu + "Ghi nhớ đăng nhập". Submit → `login(MOCK_USER, remember)` → `mustChangePassword` ? `/doi-mat-khau` : `/tao-thiep`.
- Thật: server action đặt cookie httpOnly rồi `login(user)`.

## 2. Đăng ký bằng mã mời — `/dang-ky?ma=CODE`
- `RegisterForm` (bọc `Suspense` vì dùng `useSearchParams`), điền sẵn mã từ `QUERY_PARAM.inviteCode`.
- Trường: mã mời, họ tên, email, SĐT, mật khẩu + nhập lại (≥ `MIN_PASSWORD_LENGTH`). Sai khớp → báo `auth.passwordMismatch`.
- Thành công → đăng nhập và chuyển `/vi` (phải nạp tiền mới chat được).

## 3. Đổi mật khẩu — `/doi-mat-khau`
- Mật khẩu hiện tại, mới, nhập lại. Nếu `mustChangePassword` hiện thông báo lần đầu đăng nhập. Xong → `updateUser({ mustChangePassword: false })`, toast, về studio.

## 4. Store user
- `User` (`types/index.ts`): `role`, `status`, `balance`, `inviteCode`, `mustChangePassword`, `maxPages`, `maxDurationDays`, `pageCount`.
- `isAdmin` suy ra từ `role === USER_ROLE.ADMIN`. "Không ghi nhớ" → không lưu localStorage, reload là đăng xuất.

## Translation / Constants
- `auth.*`, `nav.login`, `nav.register`; `ROUTES.login|register|changePassword`, `QUERY_PARAM.inviteCode`, `MIN_PASSWORD_LENGTH`, `USER_ROLE`, `USER_STATUS`.

## Liên quan
- docs/instruction/referral.md (mã mời), docs/instruction/ui.md §2 (guard của AppShell)
