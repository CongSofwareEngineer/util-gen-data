'use client'

import Link from 'next/link'

import { ROUTES } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'

type ErrorPageProps = {
  error: Error & { digest?: string }
  unstable_retry: () => void
}

// Runtime error boundary for every route under the root layout
const ErrorPage = ({ error, unstable_retry }: ErrorPageProps) => {
  const { translate } = useLanguage()

  return (
    <div className='hero min-h-[60dvh] px-4'>
      <div className='hero-content max-w-xl flex-col text-center'>
        <h1 className='text-2xl font-bold lg:text-3xl'>{translate('common.errorPage.title')}</h1>
        <p className='text-base-content/60'>{translate('common.errorPage.description')}</p>
        {error.digest && <p className='text-xs text-base-content/40'>{translate('common.errorPage.code', { code: error.digest })}</p>}
        <div className='mt-4 flex flex-wrap justify-center gap-3'>
          <button className='btn btn-primary' onClick={() => unstable_retry()}>
            {translate('common.errorPage.retry')}
          </button>
          <Link href={ROUTES.home} className='btn btn-outline'>
            {translate('common.notFoundPage.backHome')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
