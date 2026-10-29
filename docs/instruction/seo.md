# SEO
> Cập nhật: 2026-10-29

## Tổng quan
Metadata gốc, sitemap/robots và chặn index các trang riêng tư.

## 1. Metadata
- `app/layout.tsx`: title/description/OpenGraph lấy từ `site.name`, `site.description` (qua `translate` của `utils/language.tsx`), ảnh `SITE_CONFIG.thumbnail`.
- `app/(user)/layout.tsx`, `app/admin/layout.tsx`, `/thiep/[slug]`: `robots: { index: false, follow: false }` (thiệp mặc định không cho Google tìm thấy).
- `app/manifest.json`: tên "Thiệp AI", màu theme `#C2416B`.

## 2. Sitemap & robots
- `next-sitemap.config.js` (chạy ở `postbuild`): loại trừ admin, khu user, `/thiep/*`; robots disallow tương ứng.

## Edge cases
- Tên thương hiệu và tên miền chưa chốt: `SITE_CONFIG.url` và `siteUrl` vẫn là domain cũ, ảnh logo/thumbnail trong `public/` vẫn là ảnh cũ — cần thay khi chốt.
