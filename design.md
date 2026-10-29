# Kế hoạch web AI làm thiệp cưới & profile

Cập nhật: 29/10/2026

## Tổng quan

Một website chat AI: user mô tả bằng lời, AI dựng sản phẩm, xem trước bên phải, ưng thì xuất bản thành link (có thời hạn hoặc không giới hạn) để gửi cho người khác. Chỉ người có tài khoản (admin cấp hoặc đăng ký bằng mã mời) mới dùng được.

| Loại sản phẩm | User đưa vào | Hệ thống tạo ra | Giai đoạn |
| --- | --- | --- | --- |
| Thiệp cưới | Tên cô dâu chú rể, ngày giờ, địa điểm, ảnh, chủ đề | Trang thiệp theo 1 trong 7 chủ đề, có RSVP và lời chúc | Làm đầu tiên |
| Profile | Tên, lĩnh vực, kinh nghiệm, kỹ năng, ảnh, link mạng xã hội | Trang giới thiệu cá nhân dùng chung 7 chủ đề | Sau thiệp cưới |
| Dashboard dữ liệu | File Excel theo mẫu chuẩn + mô tả mong muốn | Trang dashboard: doanh thu, thống kê, biểu đồ, bảng lọc | Làm sau cùng |

Nguyên tắc kỹ thuật cốt lõi: **template + JSON**. AI không viết HTML tự do; AI chỉ trích thông tin từ cuộc chat thành JSON theo schema, template render JSON đó thành trang. Sửa bằng chat = AI sửa một phần JSON.

## Bảng tính năng

| Nhóm | Tính năng | Giai đoạn |
| --- | --- | --- |
| Tài khoản | Đăng nhập mới được chat; tài khoản do admin tạo, đổi mật khẩu lần đầu | 1 |
| Tài khoản | Đăng ký bằng mã mời (thay cho việc admin tạo tay) | 3 |
| Chat AI | AI hỏi lại thông tin còn thiếu, trả về JSON điền vào template; user chọn model kèm giá; lịch sử chat và tiền đã dùng lưu trên server | 1 |
| Chat AI | Sửa bằng chat ("đổi màu hồng", "câu mời trang trọng hơn") hoặc sửa tay trên form | 1 |
| Ảnh & link | Kéo thả ảnh vào chat/form → upload Cloudinary → URL ghi vào JSON; dán link mạng xã hội → AI điền vào trường tương ứng | 1 |
| Preview | Khung xem trước bên phải, cập nhật ngay; chuyển giữa chế độ điện thoại và máy tính | 1 |
| Chủ đề | 7 chủ đề cho thiệp cưới: cổ điển, Trung Hoa, công nghệ, tương lai, dễ thương, Tây Âu, đồng quê | 1 |
| Chủ đề | Dùng lại 7 chủ đề cho profile | 4 |
| Xuất bản | Nhấn "Tạo" ra link `tenmien.com/thiep/<slug>`, ai có link đều xem được; link do admin cấp, user muốn đổi link thì liên hệ admin | 1 |
| Xuất bản | Thời hạn link do user chọn: 3, 7, 10 (mặc định), 30 ngày hoặc không giới hạn (dành cho profile, dashboard dữ liệu); cảnh báo nếu hết hạn trước ngày cưới | 1 |
| Xuất bản | Hết hạn thì hiện trang "Thiệp đã hết hạn", giữ dữ liệu thêm 15 ngày rồi xóa (kể cả ảnh trên Cloudinary) | 1 |
| Dashboard user | Danh sách trang đã tạo, sửa tiếp, ẩn/xóa, gia hạn link (luôn có phí), mã QR | 1 |
| Dashboard user | Tải về HTML, PDF, PNG | 1 |
| Thiệp nâng cao | RSVP (khách xác nhận dự), sổ lời chúc, album ảnh, bản đồ, nhạc nền, đếm ngược | 2 |
| Thiệp nâng cao | Đặt mật khẩu cho link, không cho Google tìm thấy | 2 |
| Admin | Tạo/khóa tài khoản, cấp và đổi link cho user, đặt hạn mức (số trang, thời hạn tối đa) | 1 |
| Admin | Quản lý model AI và giá từng model | 1 |
| Admin | Thống kê sử dụng, chi phí AI và lãi lỗ theo model/user, xử lý báo cáo vi phạm | 2 |
| Kinh doanh | Ví nạp trước, nạp qua VietQR/PayOS, gia hạn link có phí | 1 |
| Kinh doanh | Mã mời gắn với người giới thiệu, hoa hồng, ví hoa hồng, yêu cầu rút tiền | 3 |
| Dashboard dữ liệu | Tải file Excel mẫu, upload đúng mẫu, hệ thống kiểm tra cột và báo dòng lỗi; AI đề xuất chỉ số (doanh thu, số đơn, top sản phẩm...) | 5 |
| Dashboard dữ liệu | Biểu đồ, bảng lọc theo ngày/sản phẩm, chia sẻ link như thiệp | 5 |

### 7 chủ đề

| Chủ đề | Màu chủ đạo | Font | Họa tiết / cảm giác |
| --- | --- | --- | --- |
| Cổ điển | Trắng ngà, vàng đồng, nâu | Serif thanh lịch | Viền khung mảnh, hoa văn góc, trang trọng |
| Trung Hoa | Đỏ son, vàng kim | Serif đậm nét | Chữ Hỷ 囍, mây cuộn, đèn lồng, đối xứng |
| Công nghệ | Đen than, xanh neon | Sans-serif / monospace | Lưới, đường mạch, hiệu ứng gõ chữ |
| Tương lai | Tím, xanh cyan, gradient | Sans-serif hình học | Kính mờ, ánh sáng phát quang, chuyển động mượt |
| Dễ thương | Hồng pastel, kem, xanh bạc hà | Chữ tròn, mềm | Trái tim, mây, sticker, bo góc lớn |
| Tây Âu | Trắng, xanh sage, vàng champagne | Chữ viết tay + serif | Hoa lá kiểu vườn, nhiều khoảng trắng |
| Đồng quê | Be, nâu gỗ, xanh lá | Serif mộc mạc | Giấy kraft, hoa dại, lúa, ấm áp |

Theme = bộ token (màu, font, họa tiết SVG, hiệu ứng); layout (thứ tự các section) dùng chung. Font lấy từ Google Fonts có bộ chữ tiếng Việt; họa tiết tự vẽ SVG; ưu tiên giao diện điện thoại; mỗi theme phải xuất PDF/PNG đẹp.

### Ảnh và link mạng xã hội

- Ảnh: user kéo thả vào chat hoặc form → upload Cloudinary → URL lưu vào JSON (`avatar`, `anhBia`, `album: []`). AI chỉ cần biết vai trò của ảnh ("lấy ảnh này làm ảnh bìa"), không cần đọc ảnh.
- Link mạng xã hội: trường `facebook`, `tiktok`, `instagram`, `zalo`, `linkedin`, `website`; template tự hiện icon.
- Kiểm tra trước khi lưu: chỉ nhận `https`; mỗi trường chỉ nhận đúng tên miền của nó; trường `website` tự do đưa vào danh sách kiểm duyệt; giới hạn số ảnh mỗi trang (ví dụ 30) và dung lượng mỗi ảnh.
- Ảnh hiển thị dùng `f_auto,q_auto` của Cloudinary để giảm băng thông.

### File Excel mẫu cho dashboard

Dashboard chỉ dựng từ file theo đúng mẫu: 1 sheet tên `DuLieu`, dòng 1 là tiêu đề, không gộp ô, mỗi dòng là một dòng hàng của một đơn. File sai mẫu sẽ bị từ chối kèm danh sách dòng lỗi.

| Cột | Kiểu dữ liệu | Bắt buộc | Ví dụ |
| --- | --- | --- | --- |
| Ngày | Ngày (dd/mm/yyyy) | Có | 15/10/2026 |
| Mã đơn | Chữ | Có | DH00123 |
| Sản phẩm | Chữ | Có | Áo sơ mi trắng |
| Danh mục | Chữ | Có | Thời trang nam |
| Số lượng | Số nguyên | Có | 2 |
| Đơn giá (đ) | Số | Có | 250000 |
| Thành tiền (đ) | Số | Có | 500000 |
| Giá vốn (đ) | Số | Không, có thì tính được lợi nhuận | 300000 |
| Khách hàng | Chữ | Không | Nguyễn Văn A |
| Kênh bán | Chữ | Không | Shopee |
| Trạng thái | Chữ: Hoàn thành / Hủy / Hoàn hàng | Không | Hoàn thành |

Từ mẫu này dashboard tính được: doanh thu theo ngày/tháng, số đơn, top sản phẩm và danh mục, doanh thu theo kênh, tỉ lệ hủy, lợi nhuận gộp (nếu có giá vốn).

## Mã mời và hoa hồng giới thiệu

Mã mời là một chuỗi ngắn (ví dụ `LAN2026`) mà chỉ người có mã mới đăng ký được tài khoản. Không phải tạo tay từng tài khoản nhưng vẫn chặn được spam. Mỗi mã gắn với một người giới thiệu, nên hệ thống biết ai mang khách về để trả hoa hồng.

Luồng hoạt động:

1. Admin cấp mã mời cho cộng tác viên (hoặc mỗi user tự có một mã riêng trong dashboard).
2. Cộng tác viên gửi link `tenmien.com/dang-ky?ma=LAN2026` cho khách.
3. Khách đăng ký bằng mã đó; hệ thống ghi nhận khách thuộc về cộng tác viên nào.
4. Khách nạp tiền/mua dịch vụ; hệ thống tạo khoản hoa hồng ở trạng thái "chờ duyệt".
5. Hết thời gian đối soát (ví dụ 7 ngày), hoa hồng chuyển sang "được rút".
6. Cộng tác viên gửi yêu cầu rút; admin duyệt và chuyển khoản, đánh dấu "đã trả".

Quy tắc cần chốt:

- Mức hoa hồng: theo % giá trị đơn (ví dụ 20%) hay số tiền cố định mỗi đơn.
- Tính cho đơn đầu tiên hay mọi đơn của khách đó trong N tháng.
- Mỗi mã dùng tối đa bao nhiêu lượt, có hết hạn không.
- Mức rút tối thiểu (ví dụ 200.000 đ).
- Chống gian lận: không dùng mã của chính mình, chặn nhiều tài khoản cùng thiết bị/số điện thoại.

Khoản chi hoa hồng cho cá nhân có thể phải khấu trừ thuế TNCN; hệ thống cần lưu đủ thông tin người nhận (họ tên, CCCD, tài khoản ngân hàng).

## Model AI và tính tiền theo token

User trả tiền theo số token thực dùng trong phiên chat, trừ từ ví nạp trước; mỗi model có giá riêng do admin đặt. Hệ thống hỗ trợ cả AI local và AI cloud; mặc định là AI local, nhưng admin đổi được mặc định khi chưa có máy local.

Danh sách model (admin quản lý):

| Trường | Ý nghĩa | Ví dụ |
| --- | --- | --- |
| Tên hiển thị | Tên user thấy khi chọn model | AI Tiêu chuẩn |
| Loại | Local hoặc Cloud | Local |
| Kết nối | Địa chỉ máy chủ Ollama/vLLM, hoặc tên model trên OpenRouter | qwen3.5:9b |
| Giá token vào | Giá bán cho 1.000 token user gửi đi (gồm cả lịch sử chat) | 100 đ |
| Giá token ra | Giá bán cho 1.000 token AI trả lời | 300 đ |
| Nhãn mức giá | Tiết kiệm / Tiêu chuẩn / Cao cấp | Tiết kiệm |
| Giá ước tính mỗi tin | Hiển thị cho user so sánh nhanh | ~200 đ/tin |
| Mặc định | Model được chọn sẵn khi mở chat | Có |
| Trạng thái | Bật/tắt cho user chọn | Bật |

Model đề xuất: local Qwen3.5-9B (Ollama/vLLM, tắt chế độ thinking, ép JSON schema); cloud qua OpenRouter.

Quy tắc tính tiền:

- Phiên chat bắt đầu khi user gửi tin đầu tiên, kết thúc khi nhấn "Tạo" hoặc tự đóng phiên.
- Mỗi tin nhắn trừ tiền = token vào × giá vào + token ra × giá ra của model đang dùng.
- Khung chat luôn hiện: số tiền đã dùng trong phiên (chính), token (phụ), số dư ví.
- Số dư không đủ cho tin tiếp theo thì chặn gửi và nhắc nạp thêm.
- AI local cũng có giá token riêng, thường rẻ hơn cloud.
- Máy local không phản hồi thì tự chuyển sang model cloud dự phòng, báo cho user và tính theo giá model cloud đó.

Giảm token:

- Mỗi lượt chỉ gửi kèm JSON hiện tại của trang và vài tin gần nhất, không gửi toàn bộ lịch sử.
- AI chỉ trả phần JSON thay đổi, không viết lại cả trang.

Admin xem lãi lỗ: mỗi tin lưu token vào/ra, chi phí thực tế (OpenRouter trả về chi phí từng lượt gọi) và tiền đã thu, gộp theo ngày, model và user.

### Lưu phiên chat và số tiền

Mọi thứ lưu trên server ngay khi phát sinh, nên user reload, đóng tab hay đổi máy đều không mất gì.

- Mỗi tin nhắn (của user và của AI) lưu vào database kèm model dùng, token vào/ra và số tiền.
- Tổng tiền phiên và số dư ví do server tính, trình duyệt chỉ hiển thị.
- Mở lại phiên thấy nguyên cuộc chat, bản preview và số tiền đã dùng; dashboard user có danh sách phiên để chat tiếp phiên đang dở.
- AI đang trả lời mà user reload: phần đã sinh vẫn được lưu và tính tiền theo token thực tế API trả về.
- Trừ tiền chạy trong một giao dịch database để không bao giờ bị trừ hai lần.
- Lịch sử ví ghi từng dòng nạp/trừ như sổ cái: thời gian, phiên, model, token, số tiền, số dư sau giao dịch.

### Chọn model trong khung chat

- Ô chọn model nằm ngay trên khung chat; đổi được giữa phiên, các tin sau tính theo giá model mới.
- Danh sách sắp từ rẻ đến đắt, đánh dấu model mặc định.
- Mỗi model hiện: tên, nhãn mức giá, giá ước tính cho một tin nhắn, và giá chi tiết theo 1.000 token vào/ra khi bấm xem thêm.
- Giá ước tính mỗi tin lúc đầu do admin nhập, sau tự tính từ mức dùng trung bình thực tế.

### Nạp tiền và ngắt chat khi hết tiền

Phải nạp tiền mới chat được; không có tiền tặng dùng thử.

| Lựa chọn nạp | Số tiền |
| --- | --- |
| Mức 1 | 20.000 đ |
| Mức 2 | 50.000 đ |
| Mức 3 | 80.000 đ |
| Mức 4 | 100.000 đ |
| Tự nhập | Tối thiểu 20.000 đ |

1. User chọn mức nạp, quét mã VietQR qua PayOS; tiền vào ví tự động sau vài giây.
2. Trước mỗi tin nhắn, server giữ tạm số tiền tối đa lượt đó có thể tốn; ví không đủ thì không gửi.
3. AI trả lời xong, trừ đúng token thực tế và trả phần giữ tạm còn dư về ví.
4. Ví còn dưới mức cảnh báo (ví dụ 3.000 đ) thì nhắc "Số dư sắp hết".
5. Hết tiền thì khóa ô chat, hiện nút "Nạp thêm"; phiên chat và preview giữ nguyên, nạp xong chat tiếp.

## Công nghệ

| Thành phần | Đề xuất | Dùng để |
| --- | --- | --- |
| Frontend | Next.js (App Router) + Tailwind CSS | Trang chat, preview, dashboard user, trang thiệp công khai |
| Backend | NestJS | API, gọi AI, quản lý tài khoản, ví, hạn mức, hoa hồng |
| Cơ sở dữ liệu | PostgreSQL (Neon) + Prisma | User, mã mời, trang, phiên bản, phiên chat, tin nhắn, ví, RSVP, hoa hồng |
| Hàng đợi việc nền | Redis + BullMQ | Xuất PDF/PNG, quét link hết hạn, xóa dữ liệu, gửi email |
| AI | AI local: Qwen3.5-9B chạy bằng Ollama/vLLM; AI cloud: OpenRouter (một key gọi nhiều model). Dùng lớp "AI provider" chung trong NestJS | Chat, trích thông tin thành JSON, đề xuất chỉ số cho dashboard |
| Lưu ảnh và file | Cloudinary cho ảnh (tự nén, đổi cỡ, đổi định dạng qua URL); Cloudflare R2 cho file Excel và file đã xuất | Ảnh cưới, avatar, file Excel, file đã xuất |
| Xuất PDF/PNG | Playwright chạy phía server | Chụp trang thiệp đồng nhất, không phụ thuộc máy user |
| Đọc Excel | SheetJS hoặc ExcelJS | Đọc file khách upload ở giai đoạn 5 |
| Biểu đồ | ECharts hoặc Recharts | Dashboard dữ liệu |
| Đăng nhập | JWT + refresh token, mật khẩu băm bằng argon2 | Phiên đăng nhập, phân quyền admin/user |
| Thanh toán | PayOS (VietQR) | Nạp ví, gia hạn link, làm cơ sở tính hoa hồng |
| Triển khai | Next.js trên Vercel; NestJS, Redis trên VPS bằng Docker; Cloudflare làm DNS/CDN | Chạy thật, chi phí thấp lúc đầu |

Ghi chú Neon (gói Free): 0,5 GB/project, 100 CU-hours/tháng; cố định compute 0,25 CU; database tự ngủ sau 5 phút không truy vấn, nên job định kỳ chạy thưa (mỗi giờ hoặc mỗi ngày). Khi dev trên máy có thể chạy Postgres bằng Docker.

## Lộ trình các bước làm

Ước tính cho 1 người làm toàn thời gian; cả 6 giai đoạn khoảng 4–5 tháng (bán thời gian thì nhân khoảng gấp đôi). MVP thiệp cưới chạy được sau khoảng 6 tuần.

| Giai đoạn | Thời gian | Nội dung |
| --- | --- | --- |
| GĐ0 · Chuẩn bị | 1 tuần | Duyệt mẫu 7 chủ đề, chốt cấu trúc JSON thiệp, thiết kế database |
| GĐ1 · MVP thiệp cưới | 4–6 tuần | Đăng nhập, admin, hạn mức; chat AI, preview, 7 chủ đề; ví + nạp tiền + tính tiền token; link có hạn, xuất file |
| GĐ2 · Thiệp nâng cao | 2–3 tuần | RSVP, lời chúc, album, QR; bản đồ, nhạc, đếm ngược; mật khẩu link, kiểm duyệt |
| GĐ3 · Kinh doanh | 3–4 tuần | Mã mời, đăng ký bằng mã; hoa hồng, ví hoa hồng, rút tiền |
| GĐ4 · Profile | 2 tuần | Bộ khung trang profile, dùng lại 7 chủ đề, chat AI cho profile |
| GĐ5 · Dashboard Excel | 4–6 tuần | Upload Excel mẫu, kiểm tra cột; đề xuất chỉ số, biểu đồ; lọc dữ liệu, chia sẻ link |

Thứ tự làm trong GĐ1:

1. Khởi tạo dự án Next.js + NestJS, PostgreSQL, Docker.
2. Đăng nhập, phân quyền admin/user, trang admin tạo tài khoản và đặt hạn mức.
3. Template thiệp cưới và 7 chủ đề, render từ JSON.
4. Trang chat + preview, nối API AI trả về JSON (lớp AI provider, local + cloud).
5. Ví, nạp tiền PayOS, giữ tạm/quyết toán tiền theo token, lưu lịch sử chat.
6. Lưu trang, sinh link, thời hạn link, trang "đã hết hạn".
7. Dashboard user: danh sách trang, sửa, gia hạn, mã QR.
8. Xuất HTML/PDF/PNG bằng Playwright chạy qua hàng đợi.
9. Triển khai thử, mời vài người dùng thật góp ý.

## Rủi ro và điểm cần chốt

| Rủi ro | Cách xử lý |
| --- | --- |
| Chi phí AI tăng theo số tin nhắn | Tính tiền theo token, trừ ví nạp trước; giá bán mỗi model do admin đặt cao hơn chi phí; AI chỉ sửa JSON, không viết lại cả trang |
| Link bị dùng để lừa đảo, giả mạo | Chỉ user đã xác thực mới tạo được; kiểm tra link mạng xã hội; nút báo cáo; admin khóa trang |
| Lộ thông tin cá nhân trên thiệp | Mật khẩu cho link, không cho Google tìm thấy, link tự hết hạn |
| Lỗi dấu tiếng Việt khi xuất PDF/PNG | Nhúng font có bộ chữ tiếng Việt vào trang xuất |
| Gian lận hoa hồng | Thời gian đối soát, chặn tự giới thiệu, admin duyệt trước khi trả |
| Excel của khách lộn xộn | Bắt buộc dùng file mẫu chuẩn; hệ thống kiểm tra định dạng và báo lỗi trước khi dựng dashboard |
| Vượt hạn mức gói Free (Neon, Cloudinary) | Giới hạn số ảnh mỗi trang, xóa dữ liệu hết hạn, theo dõi mức dùng, nâng gói khi có doanh thu |

Câu hỏi còn mở:

- [ ] Giá các model và giá gia hạn link?
- [ ] Mức hoa hồng: % hay số tiền cố định, đơn đầu hay mọi đơn?
- [ ] Mức phí gia hạn và phí cho lựa chọn không giới hạn là bao nhiêu?
- [ ] Lựa chọn không giới hạn có mở cho thiệp cưới không, hay chỉ cho profile và dashboard?
- [ ] Tên miền và tên thương hiệu của website?
