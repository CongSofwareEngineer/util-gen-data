'use client'

import './globals.css'

import { ROUTES } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'

type GlobalErrorProps = {
  error: Error & { digest?: string }
  unstable_retry: () => void
}

// Replaces the root layout when it crashes, so it renders its own <html>/<body> without providers
const GlobalError = ({ error, unstable_retry }: GlobalErrorProps) => {
  const { translate } = useLanguage()

  return (
    <html lang='vi' data-theme='thiep'>
      <body className='hero min-h-screen px-4'>
        <title>{translate('common.errorPage.title')}</title>
        <div className='hero-content max-w-xl flex-col text-center'>
          <h1 className='text-2xl font-bold lg:text-3xl'>{translate('common.errorPage.title')}</h1>
          <p className='text-base-content/60'>{translate('common.errorPage.description')}</p>
          {error.digest && <p className='text-xs text-base-content/40'>{translate('common.errorPage.code', { code: error.digest })}</p>}
          <div className='mt-4 flex flex-wrap justify-center gap-3'>
            <button className='btn btn-primary' onClick={() => unstable_retry()}>
              {translate('common.errorPage.retry')}
            </button>
            {/* Full reload: the client router may be broken here */}
            <button className='btn btn-outline' onClick={() => window.location.assign(ROUTES.home)}>
              {translate('common.notFoundPage.backHome')}
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

export default GlobalError
