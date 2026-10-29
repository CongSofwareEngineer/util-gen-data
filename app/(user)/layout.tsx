import type { Metadata } from 'next'

import AppShell from '@/components/AppShell'
import { APP_SHELL_VARIANT, ROUTES } from '@/constants/app'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppShell variant={APP_SHELL_VARIANT.USER} fullHeightPaths={[ROUTES.studio]}>
      {children}
    </AppShell>
  )
}
