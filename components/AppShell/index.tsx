'use client'

import { ReactNode, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import Logo from '@/components/Logo'
import ChatBubbleIcon from '@/components/Icons/ChatBubble'
import GiftIcon from '@/components/Icons/Gift'
import InboxIcon from '@/components/Icons/Inbox'
import ZapIcon from '@/components/Icons/Zap'
import { HomeIcon } from '@/components/Icons/Functions/Home'
import { LogOutIcon } from '@/components/Icons/Functions/LogOut'
import { MenuIcon } from '@/components/Icons/Functions/Menu'
import { SettingIcon } from '@/components/Icons/Functions/Setting'
import { InfoIcon } from '@/components/Icons/Info'
import { PaymentIcon } from '@/components/Icons/Payment'
import { UserCircleIcon } from '@/components/Icons/UserCircle'
import { APP_SHELL_VARIANT, LOW_BALANCE_WARNING, ROUTES } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import { formatVnd } from '@/utils/format'
import { cn } from '@/utils/tailwind'

const DRAWER_ID = 'app-shell-drawer'

type MenuItem = { href: string; labelKey: string; icon: ReactNode }

const MENU: Record<APP_SHELL_VARIANT, MenuItem[]> = {
  [APP_SHELL_VARIANT.USER]: [
    { href: ROUTES.studio, labelKey: 'nav.studio', icon: <ChatBubbleIcon className='size-5' /> },
    { href: ROUTES.myPages, labelKey: 'nav.myPages', icon: <HomeIcon className='size-5' /> },
    { href: ROUTES.wallet, labelKey: 'nav.wallet', icon: <PaymentIcon className='size-5' /> },
    { href: ROUTES.referral, labelKey: 'nav.referral', icon: <GiftIcon className='size-5' /> },
  ],
  [APP_SHELL_VARIANT.ADMIN]: [
    { href: ROUTES.admin, labelKey: 'admin.nav.overview', icon: <ZapIcon className='size-5' /> },
    { href: ROUTES.adminUsers, labelKey: 'admin.nav.users', icon: <UserCircleIcon className='size-5' /> },
    { href: ROUTES.adminModels, labelKey: 'admin.nav.models', icon: <SettingIcon className='size-5' /> },
    { href: ROUTES.adminReports, labelKey: 'admin.nav.reports', icon: <InboxIcon className='size-5' /> },
    { href: ROUTES.adminCommissions, labelKey: 'admin.nav.commissions', icon: <GiftIcon className='size-5' /> },
  ],
}

type AppShellProps = {
  variant: APP_SHELL_VARIANT
  children: ReactNode
  // Pages that need the full viewport height without padding (studio)
  fullHeightPaths?: string[]
}

// Logged-in layout: sidebar menu (drawer on mobile) + top bar with wallet balance and account menu
const AppShell = ({ variant, children, fullHeightPaths = [] }: AppShellProps) => {
  const { translate } = useLanguage()
  const { user, isLogin, hasHydrated, logout } = useUser()
  const pathname = usePathname()
  const router = useRouter()
  const balance = user.balance ?? 0
  const isAllowed = isLogin && (variant === APP_SHELL_VARIANT.USER || user.isAdmin)
  const isFullHeight = fullHeightPaths.includes(pathname)

  useEffect(() => {
    if (!hasHydrated) return
    if (!isLogin) router.replace(ROUTES.login)
    else if (!isAllowed) router.replace(ROUTES.myPages)
  }, [hasHydrated, isLogin, isAllowed, router])

  const onLogout = () => {
    logout()
    router.replace(ROUTES.login)
  }

  if (!hasHydrated || !isAllowed) {
    return (
      <div className='flex min-h-dvh items-center justify-center'>
        <span className='loading loading-spinner loading-lg text-primary' />
      </div>
    )
  }

  return (
    <div className='drawer lg:drawer-open'>
      <input id={DRAWER_ID} type='checkbox' className='drawer-toggle' aria-label={translate('common.menu')} />
      <div className={cn('drawer-content flex flex-col', isFullHeight ? 'h-dvh' : 'min-h-dvh')}>
        <header className='navbar sticky top-0 z-30 min-h-14 gap-2 border-b border-base-300 bg-base-100/90 px-3 backdrop-blur lg:px-6'>
          <label htmlFor={DRAWER_ID} className='btn btn-ghost btn-square btn-sm lg:hidden' aria-label={translate('common.menu')}>
            <MenuIcon className='size-5' />
          </label>
          <div className='flex-1'>
            {variant === APP_SHELL_VARIANT.ADMIN && <span className='badge badge-neutral'>{translate('admin.badge')}</span>}
          </div>
          <Link
            href={ROUTES.wallet}
            className={cn('btn btn-sm', balance < LOW_BALANCE_WARNING ? 'btn-warning' : 'btn-ghost')}
            title={translate('wallet.balance')}
          >
            <PaymentIcon className='size-4' />
            {formatVnd(balance)}
          </Link>
          <div className='dropdown dropdown-end'>
            <button tabIndex={0} className='avatar avatar-placeholder' aria-label={translate('nav.account')}>
              <div className='w-9 rounded-full bg-primary text-primary-content'>
                <span>{user.name?.charAt(0)}</span>
              </div>
            </button>
            <ul tabIndex={-1} className='menu dropdown-content z-10 mt-3 w-60 rounded-box bg-base-100 p-2 shadow-lg'>
              <li className='menu-title'>
                <span className='text-base-content'>{user.name}</span>
                <span className='font-normal'>{user.email}</span>
              </li>
              {user.isAdmin && (
                <li>
                  <Link href={variant === APP_SHELL_VARIANT.ADMIN ? ROUTES.myPages : ROUTES.admin}>
                    {translate(variant === APP_SHELL_VARIANT.ADMIN ? 'nav.userArea' : 'nav.admin')}
                  </Link>
                </li>
              )}
              <li>
                <Link href={ROUTES.changePassword}>{translate('nav.changePassword')}</Link>
              </li>
              <li>
                <button onClick={onLogout} className='text-error'>
                  <LogOutIcon className='size-4' />
                  {translate('nav.logout')}
                </button>
              </li>
            </ul>
          </div>
        </header>
        <main className={cn('flex-1', isFullHeight ? 'flex min-h-0 flex-col' : 'p-4 lg:p-8')}>{children}</main>
      </div>

      <div className='drawer-side z-40'>
        <label htmlFor={DRAWER_ID} aria-label={translate('common.close')} className='drawer-overlay' />
        <aside className='flex min-h-full w-64 flex-col gap-4 border-r border-base-300 bg-base-200 p-4'>
          <Logo className='px-2' />
          <ul className='menu w-full gap-1 p-0'>
            {MENU[variant].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={cn(pathname === item.href && 'menu-active')}>
                  {item.icon}
                  {translate(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
          {variant === APP_SHELL_VARIANT.USER && (
            <div className='mt-auto rounded-box bg-base-100 p-4 text-sm'>
              <p className='flex items-center gap-2 font-semibold'>
                <InfoIcon className='size-4' />
                {translate('nav.balanceTitle')}
              </p>
              <p className='mt-1 text-xl font-bold text-primary'>{formatVnd(balance)}</p>
              <Link href={ROUTES.wallet} className='btn btn-primary btn-sm btn-block mt-3'>
                {translate('wallet.topup')}
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

export default AppShell
