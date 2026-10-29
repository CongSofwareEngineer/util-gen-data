'use client'

import Link from 'next/link'

import { HTTP_STATUS, ROUTES } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'

// Site-wide 404 page; Next.js adds a noindex robots tag automatically
const NotFound = () => {
  const { translate } = useLanguage()

  return (
    <div className='hero min-h-dvh px-4'>
      <div className='hero-content max-w-xl flex-col text-center'>
        <p className='text-6xl font-extrabold text-primary lg:text-7xl'>{HTTP_STATUS.NOT_FOUND}</p>
        <h1 className='text-2xl font-bold lg:text-3xl'>{translate('common.notFoundPage.title')}</h1>
        <p className='text-base-content/60'>{translate('common.notFoundPage.description')}</p>
        <Link href={ROUTES.home} className='btn btn-primary mt-4'>
          {translate('common.notFoundPage.backHome')}
        </Link>
      </div>
    </div>
  )
}

export default NotFound
