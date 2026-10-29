'use client'

import Link from 'next/link'

import Logo from '@/components/Logo'
import { MenuIcon } from '@/components/Icons/Functions/Menu'
import { HOME_SECTION, ROUTES } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'

// Public site navbar (landing, auth pages)
const Header = () => {
  const { translate } = useLanguage()
  const { isLogin, hasHydrated } = useUser()

  const links = [
    { href: `${ROUTES.home}#${HOME_SECTION.themes}`, label: translate('nav.themes') },
    { href: `${ROUTES.home}#${HOME_SECTION.pricing}`, label: translate('nav.pricing') },
    { href: `${ROUTES.home}#${HOME_SECTION.faq}`, label: translate('nav.faq') },
  ]

  return (
    <header className='navbar sticky top-0 z-40 border-b border-base-300 bg-base-100/85 px-4 backdrop-blur lg:px-8'>
      <div className='navbar-start gap-1'>
        <div className='dropdown md:hidden'>
          <button tabIndex={0} className='btn btn-ghost btn-square btn-sm' aria-label={translate('common.menu')}>
            <MenuIcon className='size-5' />
          </button>
          <ul tabIndex={-1} className='menu dropdown-content z-10 mt-3 w-52 rounded-box bg-base-100 p-2 shadow-lg'>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Logo />
      </div>
      <nav className='navbar-center hidden md:flex'>
        <ul className='menu menu-horizontal gap-1'>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className='navbar-end gap-2'>
        {hasHydrated && isLogin ? (
          <>
            <Link href={ROUTES.myPages} className='btn btn-ghost btn-sm hidden sm:inline-flex'>
              {translate('nav.myPages')}
            </Link>
            <Link href={ROUTES.studio} className='btn btn-primary btn-sm'>
              {translate('nav.createNow')}
            </Link>
          </>
        ) : (
          <>
            <Link href={ROUTES.login} className='btn btn-ghost btn-sm'>
              {translate('nav.login')}
            </Link>
            <Link href={ROUTES.register} className='btn btn-primary btn-sm hidden sm:inline-flex'>
              {translate('nav.register')}
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
