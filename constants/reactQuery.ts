// React Query keys (UI uses mock data for now — hooks will use these once the NestJS API is ready)
export const QUERY_KEYS = {
  getMe: 'getMe',
  getMyPages: 'getMyPages',
  getMySessions: 'getMySessions',
  getSessionMessages: 'getSessionMessages',
  getModels: 'getModels',
  getWallet: 'getWallet',
  getWalletTransactions: 'getWalletTransactions',
  getReferralSummary: 'getReferralSummary',
  getCommissions: 'getCommissions',
  getPublicPage: 'getPublicPage',
  getAdminUsers: 'getAdminUsers',
  getAdminModels: 'getAdminModels',
  getAdminStats: 'getAdminStats',
  getAdminReports: 'getAdminReports',
  getAdminInviteCodes: 'getAdminInviteCodes',
  getAdminWithdrawals: 'getAdminWithdrawals',
}

export type QUERY_PAGINATION = {
  page?: number
  limit?: number
}

export const PAGE_SIZE = 20
