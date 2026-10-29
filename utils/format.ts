import type { AiModel } from '@/types'

import dayjs from 'dayjs'

import { CURRENCY_LOCALE, DISPLAY_DATE_FORMAT, DISPLAY_DATE_TIME_FORMAT, TOKEN_PRICE_UNIT } from '@/constants/app'

// 46500 -> "46.500 đ"
export const formatVnd = (amount: number) => `${amount.toLocaleString(CURRENCY_LOCALE)} đ`

export const formatNumber = (value: number) => value.toLocaleString(CURRENCY_LOCALE)

export const formatDate = (value: string | Date) => dayjs(value).format(DISPLAY_DATE_FORMAT)

export const formatDateTime = (value: string | Date) => dayjs(value).format(DISPLAY_DATE_TIME_FORMAT)

// Cost of one message = input tokens × input price + output tokens × output price (prices per 1,000 tokens)
export const messageCost = (model: Pick<AiModel, 'inputPrice' | 'outputPrice'>, inputTokens: number, outputTokens: number) =>
  Math.round((inputTokens * model.inputPrice + outputTokens * model.outputPrice) / TOKEN_PRICE_UNIT)

// Expiry date for a link created now; null = unlimited
export const linkExpiry = (days: number) => (days > 0 ? dayjs().add(days, 'day').endOf('day') : null)

export const daysLeft = (value: string | null) => (value ? dayjs(value).diff(dayjs(), 'day') : null)
