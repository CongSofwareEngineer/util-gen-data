import { SVGProps } from 'react'

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

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

// ── Users ────────────────────────────────────────────────

export type User = {
  id: string
  name: string
  email: string
  role: USER_ROLE
  status: USER_STATUS
  balance: number
  inviteCode: string
  // Must change the admin-issued password on first login
  mustChangePassword: boolean
  // Quota set by the admin
  maxPages: number
  maxDurationDays: number
  pageCount: number
  createdAt: string
}

// ── Page content (template + JSON) ───────────────────────

export type Person = {
  name: string
  father?: string
  mother?: string
}

export type WeddingEvent = {
  time: string
  place: string
  address: string
  mapUrl?: string
}

export type WeddingWish = {
  id: string
  name: string
  message: string
  createdAt: string
}

// JSON the AI fills in from the chat; the theme template renders it
export type WeddingData = {
  theme: THEME_KEY
  bride: Person
  groom: Person
  weddingDate: string
  invitation: string
  ceremony: WeddingEvent
  reception: WeddingEvent
  coverImage: string
  album: string[]
  music?: string
  showCountdown: boolean
  showRsvp: boolean
  showWishes: boolean
  wishes: WeddingWish[]
  social: Partial<Record<SOCIAL_FIELD, string>>
}

export type PageItem = {
  id: string
  type: PRODUCT_TYPE
  title: string
  slug: string
  theme: THEME_KEY
  status: PAGE_STATUS
  // null = unlimited link
  expiresAt: string | null
  createdAt: string
  views: number
  rsvpCount: number
  sessionId: string
}

// ── Chat & AI models ─────────────────────────────────────

export type AiModel = {
  id: string
  name: string
  type: MODEL_TYPE
  // Ollama/vLLM host or OpenRouter model name
  connection: string
  // Selling price per 1,000 tokens
  inputPrice: number
  outputPrice: number
  tier: MODEL_TIER
  estimatePerMessage: number
  isDefault: boolean
  enabled: boolean
}

export type ChatMessage = {
  id: string
  role: CHAT_ROLE
  content: string
  images?: string[]
  modelId?: string
  inputTokens?: number
  outputTokens?: number
  cost?: number
  createdAt: string
}

export type ChatSession = {
  id: string
  title: string
  type: PRODUCT_TYPE
  modelId: string
  totalCost: number
  totalTokens: number
  messageCount: number
  updatedAt: string
  // Session ends on "Create" or when the user closes it
  isClosed: boolean
}

// ── Wallet & referral ────────────────────────────────────

export type WalletTransaction = {
  id: string
  type: WALLET_TX_TYPE
  amount: number
  balanceAfter: number
  createdAt: string
  sessionTitle?: string
  modelName?: string
  tokens?: number
}

export type Commission = {
  id: string
  refereeName: string
  orderAmount: number
  amount: number
  status: COMMISSION_STATUS
  createdAt: string
}

export type WithdrawRequest = {
  id: string
  userName: string
  amount: number
  bankName: string
  bankAccount: string
  status: WITHDRAW_STATUS
  createdAt: string
}

export type InviteCode = {
  code: string
  ownerName: string
  usedCount: number
  maxUses: number | null
  expiresAt: string | null
}

// ── Admin ────────────────────────────────────────────────

export type ViolationReport = {
  id: string
  pageTitle: string
  pageSlug: string
  ownerName: string
  reason: string
  status: REPORT_STATUS
  createdAt: string
}

export type ModelUsage = {
  modelId: string
  modelName: string
  messages: number
  tokens: number
  revenue: number
  cost: number
}

export type DailyUsage = {
  date: string
  revenue: number
  cost: number
}
