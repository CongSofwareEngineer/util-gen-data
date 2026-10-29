'use client'

import Link from 'next/link'

import Logo from '@/components/Logo'
import { HOME_SECTION, INFO_CONTACT, ROUTES } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'

const Footer = () => {
  const { translate } = useLanguage()

  return (
    <footer className='footer sm:footer-horizontal border-t border-base-300 bg-base-200 p-10 text-base-content'>
      <aside className='max-w-xs'>
        <Logo />
        <p className='text-sm text-base-content/70'>{translate('site.description')}</p>
      </aside>
      <nav>
        <h6 className='footer-title'>{translate('footer.product')}</h6>
        <Link href={`${ROUTES.home}#${HOME_SECTION.themes}`} className='link link-hover'>
          {translate('nav.themes')}
        </Link>
        <Link href={`${ROUTES.home}#${HOME_SECTION.pricing}`} className='link link-hover'>
          {translate('nav.pricing')}
        </Link>
        <Link href={ROUTES.studio} className='link link-hover'>
          {translate('nav.createNow')}
        </Link>
      </nav>
      <nav>
        <h6 className='footer-title'>{translate('footer.support')}</h6>
        <Link href={`${ROUTES.home}#${HOME_SECTION.faq}`} className='link link-hover'>
          {translate('nav.faq')}
        </Link>
        <a href={INFO_CONTACT.Zalo} target='_blank' rel='noreferrer' className='link link-hover'>
          {translate('footer.zalo')}
        </a>
        <a href={INFO_CONTACT.Mail} className='link link-hover'>
          {translate('footer.email')}
        </a>
      </nav>
    </footer>
  )
}

export default Footer
