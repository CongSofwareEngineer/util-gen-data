# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Project Rules (MANDATORY)

These rules apply to every task and override default behavior. They work together with the project skills: `language`, `component`, `create-page`, `icon-image`, `modal-drawer`, `comment`, `review`.

## 1. Never hardcode text in the UI

- Every user-facing string (labels, buttons, titles, placeholders, toasts, errors, empty states, `alt`, `aria-label`, metadata) MUST come from `translate()` of `useLanguage` (`@/hooks/useLanguage`).
- Add each key to BOTH `public/assets/language/vn.json` and `public/assets/language/en.json` (see skill `language`).
- Images come from `config/images.ts`, icons from `components/Icons/` (see skill `icon-image`).

```tsx
// ❌ Bad
<button className='btn'>Lưu</button>
toast.error('Có lỗi xảy ra')

// ✅ Good
const { translate } = useLanguage()
<button className='btn'>{translate('common.save')}</button>
toast.error(translate('common.error'))
```

## 2. Never hardcode names/values — always go through constants

- Do NOT write raw string/number literals for keys, names, or config values directly in components, hooks, or services. Define them in `constants/` (or `config/` for site/API/image config) and import them.
- This covers: React Query keys, cookie/localStorage keys, status/enum values, routes/paths, API endpoints, model/theme names, limits/sizes/page sizes, prices, colors, external URLs, regex patterns, timeouts.
- Reuse existing constants first:
  - `constants/reactQuery.ts` — `QUERY_KEYS`, `PAGE_SIZE`
  - `constants/cookies.ts` — `COOKIES_KEY`
  - `constants/app.ts` — `SITE_CONFIG`, `ROUTES`, `QUERY_PARAM`, enums (`THEME_KEY`, `PAGE_STATUS`, `MODEL_TIER`, `WALLET_TX_TYPE`…), limits (`MAX_*`, `MIN_*`), prices/durations (`TOPUP_AMOUNTS`, `LINK_DURATIONS`)
  - `constants/themes.ts` — `THEMES` (tokens of the 7 themes), `themeCssVars`
  - `config/` — `baseApi.ts`, `images.ts`, `cloudinary.ts`
- If no suitable constant exists, add it to the matching file in `constants/` (ask first — see rule 4).

```ts
// ❌ Bad
useQuery({ queryKey: ['getMyPages', page] })
if (page.status === 'EXPIRED') { ... }
Cookies.get('accessToken')

// ✅ Good
useQuery({ queryKey: [QUERY_KEYS.getMyPages, page] })
if (page.status === PAGE_STATUS.EXPIRED) { ... }
Cookies.get(COOKIES_KEY.accessToken)
```

## 3. Never commit or push on your own

- Do NOT run `git commit`, `git push`, `git merge`, `git rebase`, `git reset`, `git stash`, or any command that changes git history or the remote.
- Only do so when the user explicitly asks for that specific action in the current message. Leave all changes uncommitted for the user to review.

## 4. Always ask before adding or deleting

- Before creating a new file/folder/component/hook/constant/translation namespace, installing a package, or deleting/renaming any file, code block, key, or dependency: describe what will be added/removed and wait for the user's confirmation.
- Editing existing code within the scope of the requested task does not need extra confirmation, but removing existing logic does.
- When in doubt, ask.

## 5. Every logic change must have a log file in `docs/`

- For every new or changed piece of logic (feature, hook, API call, business rule, bug fix), write a Markdown log file in `docs/` so the team can understand it.
- Path: `docs/<feature>/<YYYY-MM-DD>-<short-slug>.md` (e.g. `docs/studio/2026-10-29-chat-preview.md`). Create the `<feature>` folder if missing.
- Write the log in Vietnamese, short and clear, using this template:

```md
# <Tên thay đổi>

- Ngày: YYYY-MM-DD
- Phạm vi: <feature / module>

## Mục đích
<Vì sao cần thay đổi này, giải quyết vấn đề gì>

## Luồng xử lý
1. <Bước 1>
2. <Bước 2>

## File liên quan
- `path/to/file.ts` — <vai trò>

## Constants / Translation keys mới
- `QUERY_KEYS.xxx`, `common.xxx`

## Lưu ý
<Edge case, giới hạn, việc cần làm tiếp>
```

- Update the existing log instead of creating a duplicate when continuing the same change on the same day.

## Done checklist

Before reporting a task as done, verify:

- [ ] No hardcoded UI text — all via `translate()`, keys in both `vn.json` and `en.json`
- [ ] No raw keys/names/values — all via `constants/` or `config/`
- [ ] Nothing committed or pushed
- [ ] Every add/delete was confirmed by the user
- [ ] Log file written in `docs/`
- [ ] `npm run lint` and `npm run build` pass (skill `review`)

---

# Project Context

## Overview

Next.js client for an **AI wedding-invitation & profile builder** (brand/domain not decided yet — `site.name` in the translation files; product plan in `design.md`).

A chat-first web app: the user describes what they want in plain words, the AI fills a JSON, a theme template renders it as a live preview on the right; when happy the user publishes it as a link (with an expiry) to share. Only accounts issued by the admin or registered with an invite code can use it.

- **Core principle — template + JSON**: the AI never writes free HTML. It extracts info from the chat into JSON matching a schema (`WeddingData` in `types/index.ts`); the template (`components/Invitation`) renders that JSON. Editing by chat = the AI patches part of the JSON. Manual edits go through the same JSON (studio form).
- **Products** (phases from `design.md`): wedding invitation (phase 1–2, building now) → profile page (phase 4, reuses the 7 themes) → Excel data dashboard (phase 5).
- **7 themes**: classic, chinese, tech, future, cute, western, rustic. A theme is only a token set (colors, fonts, SVG ornament, effects) in `constants/themes.ts`; the section layout is shared. Fonts come from Google Fonts with a Vietnamese subset (`GOOGLE_FONTS_URL`). Mobile first, must export cleanly to PDF/PNG.
- **Billing**: prepaid wallet (top up 20k/50k/80k/100k or custom ≥ 20k via VietQR/PayOS, no free credit). Each message costs `inputTokens × inputPrice + outputTokens × outputPrice` (per 1,000 tokens) of the selected model. The chat always shows session cost, tokens and wallet balance; not enough balance → chat locked with a "Top up" button. Server is the source of truth for every amount.
- **Links**: `<domain>/thiep/<slug>`, slug assigned by the admin. Lifetime 3 / 7 / 10 (default) / 30 days; unlimited only for profile/dashboard. Warn if it expires before the wedding. Expired → "Thiệp đã hết hạn" page, data kept 15 more days then deleted (Cloudinary images included). Extending is always paid.
- **Admin**: accounts (create/lock, quota = max pages + max link duration, assign links), AI models (local Ollama/vLLM or cloud OpenRouter, selling prices, default, cloud fallback), usage & profit per model/user/day, abuse reports, invite codes & commission withdrawals.
- Backend is a separate **NestJS** API at `NEXT_PUBLIC_API_APP` (PostgreSQL/Prisma, Redis/BullMQ, Playwright exports, PayOS). This repo has no database.

## Current state

- **UI is complete but runs on mock data** (`mock/index.ts`). No page calls the API yet: login stores `MOCK_USER` (admin role), the studio fakes AI replies (`MOCK_AI_REPLY`), top-up/publish/export are simulated with timeouts. Replace each mock with a React Query hook (`QUERY_KEYS` already listed) when the endpoint exists.
- `components/QrCode` is a placeholder (no QR library installed yet).

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** — see the warning at the top; read `node_modules/next/dist/docs/` first. Route `params` are `Promise`s (`await params`), page props use the global `PageProps<'/route'>` helper. Turbopack is the default bundler.
- **daisyUI 5** is the component library — use its classes (`btn`, `card`, `modal`, `drawer`, `menu`, `dropdown`, `tabs`, `table`, `stats`, `steps`, `chat`, `mockup-phone`, `mockup-browser`, `fieldset`, `input`, `toggle`, `alert`, `toast`, `badge`, `collapse`, `countdown`, `list`…) instead of hand-written components (https://daisyui.com). Custom app theme `thiep` in `app/globals.css`.
- **TailwindCSS v4** (CSS-first: `@plugin`/`@theme` in `app/globals.css`, no `tailwind.config`). Merge classes with `cn()` from `utils/tailwind.ts`. Container queries (`@container`, `@md:`) make the invitation adapt to the preview frame.
- **TanStack Query v5** for server state, **Zustand v5** (`persist` + `devtools`) for client state.
- **dayjs**, **react-markdown** + `remark-gfm` (AI chat bubbles).
- Images on **Cloudinary**, always displayed with `f_auto,q_auto` (`config/cloudinary.ts`); `res.cloudinary.com` allowed in `next.config.ts`.
- Lint/format: ESLint 9 + Prettier. Package lock: `yarn.lock`.

## Project Structure

```
app/                         # App Router (Vietnamese slugs, all listed in ROUTES — constants/app.ts)
  layout.tsx                 # root: fonts, metadata, ReactQuery, MyModal, Toast
  (public)/                  # Header + Footer
    page.tsx                 # landing: hero, steps, 7 themes, products, pricing, FAQ
    dang-nhap/ dang-ky/ doi-mat-khau/   # login, register with invite code (?ma=), change password
  (user)/                    # AppShell USER (login required, noindex)
    tao-thiep/               # studio: chat / form / theme + live preview + publish
    trang-cua-toi/           # my pages (edit, extend, QR, download, hide, delete) + chat sessions
    vi/                      # wallet: top up (VietQR), ledger
    gioi-thieu/              # invite code, commissions, withdraw (phase 3)
  admin/                     # AppShell ADMIN: overview, tai-khoan, model-ai, bao-cao, hoa-hong
  thiep/[slug]/              # public invitation (mock: mau-<theme> = demo, het-han = expired), report abuse
components/
  AppShell/                  # daisyUI drawer sidebar + top bar (balance, account menu), auth/role guard
  Invitation/                # template renderer: shared sections + Ornament (per-theme SVG) + Countdown
  Studio/                    # ChatPanel, ModelSelect, EditForm, ThemePicker, PreviewPanel, PublishDialog
  Header/ Footer/ Logo/ PageHeader/ ThemeSwatch/ QrCode/ ConfirmDialog/
  MyModal/ Toast/ ReactQuery/ Icons/
config/                      # baseApi.ts (BaseAPI class), images.ts, cloudinary.ts
constants/                   # app.ts (routes, enums, limits, prices), themes.ts (7 theme tokens), reactQuery.ts, cookies.ts
hooks/                       # useLanguage, useModal, useUser, useStudio, useCopy
mock/                        # mock data until the API exists
services/                    # one API client per backend resource (upload.ts so far)
types/                       # domain types (User, WeddingData, PageItem, AiModel, ChatMessage, Wallet…)
utils/                       # format (money/date/message cost), validate (social links), cookie ('use server'), toast, language
zustand/                     # stores: user, studio, language, modal, toast
public/assets/language/      # vn.json, en.json
docs/                        # instruction/ + changelog/ (rule 5)
```

## Architecture & Conventions

### API layer
- Each service is a class extending `BaseAPI` (`config/baseApi.ts`) with an endpoint, exported as a singleton:
  `const UploadService = new UploadApi('uploads'); export default UploadService`.
- `get` defaults to **no auth**; `post` / `put` / `patch` / `postFormData` default to `isUseAuth: true`. Pass `{ isUseAuth: false }` for public endpoints (public page, RSVP, wishes, report).
- Errors throw `HttpError` (keeps `status`). Backend responses are wrapped `{ data, meta? }` — services unwrap `response.data`.
- Data fetching in components goes through React Query hooks with keys from `QUERY_KEYS`; mutations invalidate the related keys.

### Auth
- Access/refresh tokens live in **httpOnly cookies**, read/written only through the server actions in `utils/cookie.ts` (`COOKIES_KEY`). `BaseAPI` refreshes ~5s before expiry and retries once on 401.
- Logged-in user state is the persisted Zustand store `zustand/user.ts` (`useUser`, includes `balance`, quota, `mustChangePassword`); wait for `hasHydrated` before relying on it. `AppShell` redirects to login when logged out and non-admins away from `/admin`.

### Studio (chat + preview)
- State in `zustand/studio.ts` (`useStudio`): page JSON, messages, selected model, session cost/tokens, preview device.
- Only the current JSON + a few recent messages are sent to the AI each turn; the AI returns only the changed part of the JSON.
- Images: drag & drop into chat/form → upload to Cloudinary → URL saved in the JSON (`coverImage`, `album`). Max `MAX_IMAGES_PER_PAGE` per page, `MAX_IMAGE_SIZE_MB` each.
- Social links: `https` only, each field only its own domain (`SOCIAL_DOMAINS`, `utils/validate.ts`); `website` is free but moderated.

### UI
- Prefer daisyUI classes over custom components; only wrap when the same markup repeats many times.
- Open modals with `useModal().open({ title, children })` (`components/MyModal` = daisyUI `modal`, bottom sheet on mobile). Confirmations use `components/ConfirmDialog`.
- Invitation styling uses the `.inv-*` classes + `--inv-*` CSS variables from `themeCssVars()`; never hardcode theme colors in components.
- Mobile-first responsive layouts.

### Gotchas
- `page.tsx` files may only export the page (and Next config like `metadata`) — put shared maps/helpers in components or constants.
- `useSearchParams` must sit under a `<Suspense>` boundary (see `app/(public)/dang-ky`).
- `next.config.ts` removes `console.*` in production and only enables `reactStrictMode` in production.
- Open business questions (prices, extension fee, commission rules, brand/domain) are listed at the end of `design.md`; related constants (`EXTEND_FEE_PER_DAY`, `REFERRAL_DEFAULTS`) are placeholders.

## Environment

- Variables are typed in `environment.d.ts`. Real values in `.env.local` (git-ignored — never commit it, never print keys).
- Public: `NEXT_PUBLIC_API_APP`, `NEXT_PUBLIC_ENV`, `NEXT_PUBLIC_BUILD`.

## Commands

```bash
npm run dev        # dev server (http://localhost:3000)
npm run lint       # eslint
npm run build      # production build (NEXT_PUBLIC_ENV=production); postbuild runs next-sitemap
npm run start      # serve the production build
npm run fort-http  # expose localhost:3000 via cloudflared tunnel
```

There is no test suite — verify with `npm run lint` + `npm run build` (and the `code-checker` agent / skill `review`).

## Project skills & agents

- Skills (`.claude/skills/`): `language`, `component`, `create-page`, `icon-image`, `modal-drawer`, `comment`, `review`, `seo-check`.
- Agent (`.claude/agents/`): `code-checker` — read-only reviewer for logic bugs, regressions and UI issues after a change.
