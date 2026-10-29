import type { ChatMessage, WeddingData } from '@/types'

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { IS_PRODUCTION, PREVIEW_DEVICE, THEME_KEY } from '@/constants/app'
import { MOCK_MESSAGES, MOCK_MODELS, MOCK_WEDDING } from '@/mock'

// Studio = chat + live preview of the page JSON. Session cost/tokens are shown here; the server is the source of truth.
type StudioState = {
  data: WeddingData
  messages: ChatMessage[]
  modelId: string
  isReplying: boolean
  device: PREVIEW_DEVICE
  sessionCost: number
  sessionTokens: number
  setData: (data: Partial<WeddingData>) => void
  setTheme: (theme: THEME_KEY) => void
  setModel: (modelId: string) => void
  setDevice: (device: PREVIEW_DEVICE) => void
  setReplying: (isReplying: boolean) => void
  addMessage: (message: ChatMessage) => void
}

const defaultModelId = MOCK_MODELS.find((model) => model.isDefault)?.id ?? MOCK_MODELS[0].id

const sumMessages = (messages: ChatMessage[]) =>
  messages.reduce(
    (total, message) => ({
      cost: total.cost + (message.cost ?? 0),
      tokens: total.tokens + (message.inputTokens ?? 0) + (message.outputTokens ?? 0),
    }),
    { cost: 0, tokens: 0 }
  )

const initialTotals = sumMessages(MOCK_MESSAGES)

export const studio = create<StudioState>()(
  devtools(
    (set) => ({
      data: MOCK_WEDDING,
      messages: MOCK_MESSAGES,
      modelId: defaultModelId,
      isReplying: false,
      device: PREVIEW_DEVICE.MOBILE,
      sessionCost: initialTotals.cost,
      sessionTokens: initialTotals.tokens,

      setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
      setTheme: (theme) => set((state) => ({ data: { ...state.data, theme } })),
      setModel: (modelId) => set({ modelId }),
      setDevice: (device) => set({ device }),
      setReplying: (isReplying) => set({ isReplying }),
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
          sessionCost: state.sessionCost + (message.cost ?? 0),
          sessionTokens: state.sessionTokens + (message.inputTokens ?? 0) + (message.outputTokens ?? 0),
        })),
    }),
    {
      name: 'studio-zustand',
      enabled: !IS_PRODUCTION,
    }
  )
)
