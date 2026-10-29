import type { Metadata } from 'next'

import AppShell from '@/components/AppShell'
import { APP_SHELL_VARIANT } from '@/constants/app'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AppShell variant={APP_SHELL_VARIANT.ADMIN}>{children}</AppShell>
}
