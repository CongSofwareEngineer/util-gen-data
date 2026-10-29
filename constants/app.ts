import { PHASE_PRODUCTION_BUILD } from 'next/constants'

// Brand name/description live in the translation files (`site.*`) — the brand is not decided yet
export const SITE_CONFIG = {
  url: 'https://giatuisieusach.vercel.app',
  icon: '/logo.png',
  thumbnail: '/thumbnail.png',
}

export enum INFO_CONTACT {
  Mail = 'mailto:hodiencong2000@gmail.com',
  Zalo = 'https://zalo.me/0392225405',
}

export const IS_PRODUCTION = process.env.NEXT_PUBLIC_ENV === 'production'

// True only while `next build` prerenders pages (always false in the browser)
export const IS_BUILD_PHASE = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD

// HTTP status codes checked on API errors
export enum HTTP_STATUS {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
}

// App routes (Vietnamese slugs, as in design.md)
export const ROUTES = {
  home: '/',
  login: '/dang-nhap',
  register: '/dang-ky',
  changePassword: '/doi-mat-khau',
  studio: '/tao-thiep',
  myPages: '/trang-cua-toi',
  wallet: '/vi',
  referral: '/gioi-thieu',
  admin: '/admin',
  adminUsers: '/admin/tai-khoan',
  adminModels: '/admin/model-ai',
  adminReports: '/admin/bao-cao',
  adminCommissions: '/admin/hoa-hong',
  invitation: (slug: string) => `/thiep/${slug}`,
} as const

// Landing page anchors
export const HOME_SECTION = {
  themes: 'chu-de',
  pricing: 'bang-gia',
  faq: 'hoi-dap',
} as const

// Query params
export const QUERY_PARAM = {
  inviteCode: 'ma',
  session: 'phien',
  page: 'trang',
} as const

// Slugs of the public invitation page that show a demo instead of a real page
export const DEMO_SLUG_PREFIX = 'mau-'
export const EXPIRED_DEMO_SLUG = 'het-han'

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum USER_STATUS {
  ACTIVE = 'ACTIVE',
  LOCKED = 'LOCKED',
}

// What the AI builds (design.md "Loại sản phẩm")
export enum PRODUCT_TYPE {
  WEDDING = 'WEDDING',
  PROFILE = 'PROFILE',
  DASHBOARD = 'DASHBOARD',
}

// The 7 shared themes (tokens in constants/themes.ts)
export enum THEME_KEY {
  CLASSIC = 'classic',
  CHINESE = 'chinese',
  TECH = 'tech',
  FUTURE = 'future',
  CUTE = 'cute',
  WESTERN = 'western',
  RUSTIC = 'rustic',
}

export enum PAGE_STATUS {
  ACTIVE = 'ACTIVE',
  HIDDEN = 'HIDDEN',
  EXPIRED = 'EXPIRED',
  LOCKED = 'LOCKED',
}

// Link lifetime in days; 0 = unlimited (profile / dashboard only)
export const LINK_DURATIONS = [3, 7, 10, 30, 0] as const
export const DEFAULT_LINK_DURATION = 10 as number
export const UNLIMITED_DURATION = 0 as number
// Expired pages keep their data this many days, then everything (images included) is deleted
export const EXPIRED_RETENTION_DAYS = 15 as number

export enum EXPORT_FORMAT {
  HTML = 'html',
  PDF = 'pdf',
  PNG = 'png',
}

export enum PREVIEW_DEVICE {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
}

// AI models
export enum MODEL_TYPE {
  LOCAL = 'LOCAL',
  CLOUD = 'CLOUD',
}

export enum MODEL_TIER {
  SAVING = 'SAVING',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
}

// Token prices are set per 1,000 tokens
export const TOKEN_PRICE_UNIT = 1000 as number

export enum CHAT_ROLE {
  USER = 'user',
  ASSISTANT = 'assistant',
}

// Wallet
export const TOPUP_AMOUNTS = [20000, 50000, 80000, 100000] as const
export const MIN_TOPUP = 20000 as number
export const LOW_BALANCE_WARNING = 3000 as number

export enum WALLET_TX_TYPE {
  TOPUP = 'TOPUP',
  CHAT = 'CHAT',
  EXTEND = 'EXTEND',
  REFUND = 'REFUND',
}

// Referral / commission
export const MIN_WITHDRAW = 200000 as number

export enum COMMISSION_STATUS {
  PENDING = 'PENDING',
  AVAILABLE = 'AVAILABLE',
  PAID = 'PAID',
}

export enum WITHDRAW_STATUS {
  PENDING = 'PENDING',
  PAID = 'PAID',
  REJECTED = 'REJECTED',
}

export enum REPORT_STATUS {
  OPEN = 'OPEN',
  RESOLVED = 'RESOLVED',
}

// Social links: each field only accepts its own domain (`website` is free but goes to moderation)
export enum SOCIAL_FIELD {
  FACEBOOK = 'facebook',
  TIKTOK = 'tiktok',
  INSTAGRAM = 'instagram',
  ZALO = 'zalo',
  LINKEDIN = 'linkedin',
  WEBSITE = 'website',
}

export const SOCIAL_DOMAINS: Record<SOCIAL_FIELD, string[]> = {
  [SOCIAL_FIELD.FACEBOOK]: ['facebook.com', 'fb.com'],
  [SOCIAL_FIELD.TIKTOK]: ['tiktok.com'],
  [SOCIAL_FIELD.INSTAGRAM]: ['instagram.com'],
  [SOCIAL_FIELD.ZALO]: ['zalo.me'],
  [SOCIAL_FIELD.LINKEDIN]: ['linkedin.com'],
  [SOCIAL_FIELD.WEBSITE]: [],
}

// Images
export const MAX_IMAGES_PER_PAGE = 30 as number
export const MAX_IMAGE_SIZE_MB = 10 as number
export const ACCEPT_IMAGE_TYPES = 'image/png,image/jpeg,image/webp'
// Max files the server accepts in one upload request
export const MAX_IMAGES_PER_UPLOAD = 10 as number

// Image upload folders (must match server CloudinaryFolder enum)
export enum UPLOAD_IMAGE_TYPE {
  AVATAR = 'avatars',
  PAGE = 'pages',
}

// Max guests one RSVP can bring
export const RSVP_MAX_GUESTS = 5 as number

// Auth
export const MIN_PASSWORD_LENGTH = 8 as number

// Formatting
export const CURRENCY_LOCALE = 'vi-VN'
export const DISPLAY_DATE_FORMAT = 'DD/MM/YYYY'
export const DISPLAY_DATE_TIME_FORMAT = 'HH:mm DD/MM/YYYY'
export const INPUT_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm'

// UI timings (ms)
export const COPY_FEEDBACK_DURATION = 2000 as number
export const MOCK_AI_REPLY_DELAY = 900 as number
export const MOCK_PAYMENT_DELAY = 2500 as number
export const COUNTDOWN_TICK = 1000 as number

// Google Fonts used by the app and the 7 themes (all ship a Vietnamese subset)
export const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Noto+Serif:wght@400;700;900&family=JetBrains+Mono:wght@400;700&family=Exo+2:wght@300;500;700&family=Quicksand:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500&family=Dancing+Script:wght@600;700&family=Lora:ital,wght@0,500;0,700;1,500&display=swap'

// Logged-in layouts (components/AppShell)
export enum APP_SHELL_VARIANT {
  USER = 'user',
  ADMIN = 'admin',
}

// Studio left panel tabs and mobile view switch
export enum STUDIO_TAB {
  CHAT = 'chat',
  FORM = 'form',
  THEME = 'theme',
}

export enum STUDIO_MOBILE_VIEW {
  EDIT = 'edit',
  PREVIEW = 'preview',
}

// Extending a link always costs money (price not decided yet — mock value per day)
export const EXTEND_FEE_PER_DAY = 1000 as number

// "My pages" tabs
export enum MY_PAGES_TAB {
  PAGES = 'pages',
  SESSIONS = 'sessions',
}

// Admin defaults (referral rules are not decided yet — see design.md "Quy tắc cần chốt")
export const DEFAULT_USER_QUOTA = {
  maxPages: 3,
  maxDurationDays: 10,
} as const

export const REFERRAL_DEFAULTS = {
  commissionPercent: 20,
  reviewDays: 7,
} as const

// Number input steps
export const MONEY_INPUT_STEP = 1000 as number
export const PRICE_INPUT_STEP = 10 as number

// Admin commission tabs
export enum ADMIN_COMMISSION_TAB {
  CODES = 'codes',
  WITHDRAWALS = 'withdrawals',
  SETTINGS = 'settings',
}

export const PERCENT = 100 as number
export const SHORT_DATE_FORMAT = 'DD/MM'
export const BYTES_PER_MB = (1024 * 1024) as number
