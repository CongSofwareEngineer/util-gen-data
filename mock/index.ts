// Mock data so the UI can be built and reviewed before the NestJS API exists.
// Replace each export with a React Query hook (QUERY_KEYS) when the matching endpoint is ready.
import type {
  AiModel,
  ChatMessage,
  ChatSession,
  Commission,
  DailyUsage,
  InviteCode,
  ModelUsage,
  PageItem,
  User,
  ViolationReport,
  WalletTransaction,
  WeddingData,
  WithdrawRequest,
} from '@/types'

import {
  CHAT_ROLE,
  COMMISSION_STATUS,
  MODEL_TIER,
  MODEL_TYPE,
  PAGE_STATUS,
  PRODUCT_TYPE,
  REPORT_STATUS,
  SOCIAL_FIELD,
  THEME_KEY,
  USER_ROLE,
  USER_STATUS,
  WALLET_TX_TYPE,
  WITHDRAW_STATUS,
} from '@/constants/app'
import { images } from '@/config/images'

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Nguyễn Minh Anh',
  email: 'minhanh@example.com',
  role: USER_ROLE.ADMIN,
  status: USER_STATUS.ACTIVE,
  balance: 46500,
  inviteCode: 'MINHANH26',
  mustChangePassword: false,
  maxPages: 5,
  maxDurationDays: 30,
  pageCount: 3,
  createdAt: '2026-09-02T08:00:00Z',
}

export const MOCK_WEDDING: WeddingData = {
  theme: THEME_KEY.CLASSIC,
  bride: { name: 'Thu Hà', father: 'Trần Văn Bình', mother: 'Lê Thị Mai' },
  groom: { name: 'Minh Anh', father: 'Nguyễn Văn Hùng', mother: 'Phạm Thị Lan' },
  weddingDate: '2026-12-20T10:00:00+07:00',
  invitation: 'Trân trọng kính mời bạn đến chung vui cùng gia đình chúng tôi trong ngày trọng đại.',
  ceremony: {
    time: '2026-12-20T09:00:00+07:00',
    place: 'Tư gia nhà gái',
    address: '12 Nguyễn Trãi, Phường Bến Thành, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.google.com/?q=12+Nguyen+Trai+Ho+Chi+Minh',
  },
  reception: {
    time: '2026-12-20T18:00:00+07:00',
    place: 'Trung tâm tiệc cưới Riverside',
    address: '1 Tôn Đức Thắng, Phường Sài Gòn, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.google.com/?q=1+Ton+Duc+Thang+Ho+Chi+Minh',
  },
  coverImage: images.demo.cover,
  album: images.demo.album,
  showCountdown: true,
  showRsvp: true,
  showWishes: true,
  wishes: [
    { id: 'w1', name: 'Hoàng Nam', message: 'Chúc hai bạn trăm năm hạnh phúc!', createdAt: '2026-10-20T10:00:00Z' },
    { id: 'w2', name: 'Bảo Ngọc', message: 'Hạnh phúc thật nhiều nha, hẹn gặp ở tiệc cưới!', createdAt: '2026-10-22T14:30:00Z' },
  ],
  social: {
    [SOCIAL_FIELD.FACEBOOK]: 'https://facebook.com/minhanh',
    [SOCIAL_FIELD.INSTAGRAM]: 'https://instagram.com/thuha',
  },
}

export const MOCK_MODELS: AiModel[] = [
  {
    id: 'm1',
    name: 'AI Tiết kiệm',
    type: MODEL_TYPE.LOCAL,
    connection: 'qwen3.5:9b',
    inputPrice: 100,
    outputPrice: 300,
    tier: MODEL_TIER.SAVING,
    estimatePerMessage: 200,
    isDefault: true,
    enabled: true,
  },
  {
    id: 'm2',
    name: 'AI Tiêu chuẩn',
    type: MODEL_TYPE.CLOUD,
    connection: 'google/gemini-flash',
    inputPrice: 250,
    outputPrice: 800,
    tier: MODEL_TIER.STANDARD,
    estimatePerMessage: 500,
    isDefault: false,
    enabled: true,
  },
  {
    id: 'm3',
    name: 'AI Cao cấp',
    type: MODEL_TYPE.CLOUD,
    connection: 'anthropic/claude-sonnet',
    inputPrice: 900,
    outputPrice: 3000,
    tier: MODEL_TIER.PREMIUM,
    estimatePerMessage: 1800,
    isDefault: false,
    enabled: true,
  },
  {
    id: 'm4',
    name: 'AI Thử nghiệm',
    type: MODEL_TYPE.CLOUD,
    connection: 'openai/gpt-mini',
    inputPrice: 200,
    outputPrice: 600,
    tier: MODEL_TIER.STANDARD,
    estimatePerMessage: 400,
    isDefault: false,
    enabled: false,
  },
]

export const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: 'c1',
    role: CHAT_ROLE.USER,
    content: 'Mình muốn làm thiệp cưới cho Minh Anh và Thu Hà, cưới ngày 20/12 tại Riverside, phong cách cổ điển.',
    createdAt: '2026-10-28T09:00:00Z',
  },
  {
    id: 'c2',
    role: CHAT_ROLE.ASSISTANT,
    content:
      'Mình đã dựng thiệp theo chủ đề **Cổ điển** ở khung bên phải. Bạn cho mình xin thêm:\n\n- Giờ và địa chỉ lễ vu quy/thành hôn\n- Tên bố mẹ hai bên (nếu muốn in)\n- Ảnh bìa — kéo thả ảnh vào khung chat là được',
    modelId: 'm1',
    inputTokens: 820,
    outputTokens: 310,
    cost: 175,
    createdAt: '2026-10-28T09:00:05Z',
  },
]

export const MOCK_PAGES: PageItem[] = [
  {
    id: 'p1',
    type: PRODUCT_TYPE.WEDDING,
    title: 'Minh Anh & Thu Hà',
    slug: 'minhanh-thuha',
    theme: THEME_KEY.CLASSIC,
    status: PAGE_STATUS.ACTIVE,
    expiresAt: '2026-11-07T23:59:00+07:00',
    createdAt: '2026-10-28T09:30:00Z',
    views: 128,
    rsvpCount: 34,
    sessionId: 's1',
  },
  {
    id: 'p2',
    type: PRODUCT_TYPE.WEDDING,
    title: 'Quốc Bảo & Ngọc Trâm',
    slug: 'bao-tram',
    theme: THEME_KEY.CHINESE,
    status: PAGE_STATUS.HIDDEN,
    expiresAt: '2026-11-20T23:59:00+07:00',
    createdAt: '2026-10-21T10:00:00Z',
    views: 56,
    rsvpCount: 12,
    sessionId: 's2',
  },
  {
    id: 'p3',
    type: PRODUCT_TYPE.WEDDING,
    title: 'Đức Huy & Lan Chi',
    slug: 'huy-chi',
    theme: THEME_KEY.WESTERN,
    status: PAGE_STATUS.EXPIRED,
    expiresAt: '2026-10-20T23:59:00+07:00',
    createdAt: '2026-10-10T10:00:00Z',
    views: 312,
    rsvpCount: 80,
    sessionId: 's3',
  },
]

export const MOCK_SESSIONS: ChatSession[] = [
  {
    id: 's1',
    title: 'Minh Anh & Thu Hà',
    type: PRODUCT_TYPE.WEDDING,
    modelId: 'm1',
    totalCost: 3500,
    totalTokens: 18400,
    messageCount: 14,
    updatedAt: '2026-10-28T09:30:00Z',
    isClosed: true,
  },
  {
    id: 's4',
    title: 'Thiệp cưới chủ đề dễ thương',
    type: PRODUCT_TYPE.WEDDING,
    modelId: 'm2',
    totalCost: 1200,
    totalTokens: 5200,
    messageCount: 4,
    updatedAt: '2026-10-29T07:10:00Z',
    isClosed: false,
  },
]

export const MOCK_TRANSACTIONS: WalletTransaction[] = [
  { id: 't1', type: WALLET_TX_TYPE.TOPUP, amount: 50000, balanceAfter: 50000, createdAt: '2026-10-28T08:50:00Z' },
  {
    id: 't2',
    type: WALLET_TX_TYPE.CHAT,
    amount: -3500,
    balanceAfter: 46500,
    createdAt: '2026-10-28T09:30:00Z',
    sessionTitle: 'Minh Anh & Thu Hà',
    modelName: 'AI Tiết kiệm',
    tokens: 18400,
  },
  {
    id: 't3',
    type: WALLET_TX_TYPE.EXTEND,
    amount: -10000,
    balanceAfter: 36500,
    createdAt: '2026-10-29T08:00:00Z',
    sessionTitle: 'Quốc Bảo & Ngọc Trâm',
  },
  { id: 't4', type: WALLET_TX_TYPE.REFUND, amount: 10000, balanceAfter: 46500, createdAt: '2026-10-29T08:05:00Z' },
]

export const MOCK_COMMISSIONS: Commission[] = [
  {
    id: 'k1',
    refereeName: 'Trần Bảo Ngọc',
    orderAmount: 100000,
    amount: 20000,
    status: COMMISSION_STATUS.PENDING,
    createdAt: '2026-10-27T10:00:00Z',
  },
  { id: 'k2', refereeName: 'Lê Quốc Huy', orderAmount: 80000, amount: 16000, status: COMMISSION_STATUS.AVAILABLE, createdAt: '2026-10-15T10:00:00Z' },
  { id: 'k3', refereeName: 'Phạm Lan Chi', orderAmount: 50000, amount: 10000, status: COMMISSION_STATUS.PAID, createdAt: '2026-09-30T10:00:00Z' },
]

export const MOCK_USERS: User[] = [
  MOCK_USER,
  {
    id: 'u2',
    name: 'Trần Quốc Bảo',
    email: 'quocbao@example.com',
    role: USER_ROLE.USER,
    status: USER_STATUS.ACTIVE,
    balance: 12000,
    inviteCode: 'BAO2026',
    mustChangePassword: true,
    maxPages: 3,
    maxDurationDays: 10,
    pageCount: 1,
    createdAt: '2026-10-12T08:00:00Z',
  },
  {
    id: 'u3',
    name: 'Lê Thị Hồng',
    email: 'hong@example.com',
    role: USER_ROLE.USER,
    status: USER_STATUS.LOCKED,
    balance: 0,
    inviteCode: 'HONG26',
    mustChangePassword: false,
    maxPages: 1,
    maxDurationDays: 7,
    pageCount: 1,
    createdAt: '2026-10-01T08:00:00Z',
  },
]

export const MOCK_MODEL_USAGE: ModelUsage[] = [
  { modelId: 'm1', modelName: 'AI Tiết kiệm', messages: 1240, tokens: 1860000, revenue: 248000, cost: 62000 },
  { modelId: 'm2', modelName: 'AI Tiêu chuẩn', messages: 530, tokens: 910000, revenue: 265000, cost: 171000 },
  { modelId: 'm3', modelName: 'AI Cao cấp', messages: 88, tokens: 240000, revenue: 158000, cost: 121000 },
]

export const MOCK_DAILY_USAGE: DailyUsage[] = [
  { date: '2026-10-23', revenue: 62000, cost: 31000 },
  { date: '2026-10-24', revenue: 81000, cost: 38000 },
  { date: '2026-10-25', revenue: 54000, cost: 29000 },
  { date: '2026-10-26', revenue: 97000, cost: 51000 },
  { date: '2026-10-27', revenue: 120000, cost: 62000 },
  { date: '2026-10-28', revenue: 143000, cost: 70000 },
  { date: '2026-10-29', revenue: 114000, cost: 73000 },
]

export const MOCK_REPORTS: ViolationReport[] = [
  {
    id: 'r1',
    pageTitle: 'Khuyến mãi khủng',
    pageSlug: 'km-khung',
    ownerName: 'Lê Thị Hồng',
    reason: 'Trang giả mạo, dẫn tới link lừa đảo',
    status: REPORT_STATUS.OPEN,
    createdAt: '2026-10-28T15:00:00Z',
  },
  {
    id: 'r2',
    pageTitle: 'Quốc Bảo & Ngọc Trâm',
    pageSlug: 'bao-tram',
    ownerName: 'Trần Quốc Bảo',
    reason: 'Lộ số điện thoại cá nhân',
    status: REPORT_STATUS.RESOLVED,
    createdAt: '2026-10-25T09:00:00Z',
  },
]

export const MOCK_INVITE_CODES: InviteCode[] = [
  { code: 'MINHANH26', ownerName: 'Nguyễn Minh Anh', usedCount: 3, maxUses: null, expiresAt: null },
  { code: 'LAN2026', ownerName: 'Cộng tác viên Lan', usedCount: 18, maxUses: 50, expiresAt: '2026-12-31T23:59:00+07:00' },
]

export const MOCK_WITHDRAWALS: WithdrawRequest[] = [
  {
    id: 'wd1',
    userName: 'Cộng tác viên Lan',
    amount: 360000,
    bankName: 'Vietcombank',
    bankAccount: '0123456789',
    status: WITHDRAW_STATUS.PENDING,
    createdAt: '2026-10-28T11:00:00Z',
  },
  {
    id: 'wd2',
    userName: 'Nguyễn Minh Anh',
    amount: 200000,
    bankName: 'MB Bank',
    bankAccount: '9876543210',
    status: WITHDRAW_STATUS.PAID,
    createdAt: '2026-10-10T11:00:00Z',
  },
]

// Fake AI replies used by the studio chat until the AI provider API is wired
export const MOCK_AI_REPLY = {
  content: 'Đã cập nhật thiệp theo yêu cầu của bạn. Bạn xem bản xem trước bên phải nhé — cần chỉnh gì cứ nhắn mình.',
  inputTokens: 900,
  outputTokens: 260,
}
