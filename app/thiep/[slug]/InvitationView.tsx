'use client'

import { FormEvent } from 'react'
import Link from 'next/link'

import Invitation from '@/components/Invitation'
import { InfoIcon } from '@/components/Icons/Info'
import { DEMO_SLUG_PREFIX, EXPIRED_DEMO_SLUG, EXPIRED_RETENTION_DAYS, ROUTES, THEME_KEY } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'
import { MOCK_WEDDING } from '@/mock'
import { toast } from '@/utils/toast'

const ReportForm = () => {
  const { translate } = useLanguage()
  const { close } = useModal()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    toast({ type: 'success', message: translate('publicPage.report.success') })
    close()
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-3'>
      <p className='text-sm text-base-content/70'>{translate('publicPage.report.description')}</p>
      <textarea name='reason' required rows={4} className='textarea w-full' placeholder={translate('publicPage.report.placeholder')} />
      <div className='modal-action mt-0'>
        <button type='button' className='btn btn-ghost' onClick={() => close()}>
          {translate('common.cancel')}
        </button>
        <button type='submit' className='btn btn-error'>
          {translate('publicPage.report.submit')}
        </button>
      </div>
    </form>
  )
}

const ExpiredView = () => {
  const { translate } = useLanguage()

  return (
    <div className='hero min-h-dvh bg-base-200 px-4'>
      <div className='hero-content max-w-md flex-col text-center'>
        <h1 className='font-display text-3xl font-bold'>{translate('publicPage.expired.title')}</h1>
        <p className='text-base-content/70'>{translate('publicPage.expired.description', { days: EXPIRED_RETENTION_DAYS })}</p>
        <Link href={ROUTES.home} className='btn btn-primary mt-4'>
          {translate('publicPage.expired.cta')}
        </Link>
      </div>
    </div>
  )
}

// Public page: anyone with the link can view it. Mock: `mau-<theme>` = theme demo, `het-han` = expired page
const InvitationView = ({ slug }: { slug: string }) => {
  const { translate } = useLanguage()
  const { open } = useModal()

  if (slug === EXPIRED_DEMO_SLUG) return <ExpiredView />

  const demoTheme = slug.startsWith(DEMO_SLUG_PREFIX) ? (slug.slice(DEMO_SLUG_PREFIX.length) as THEME_KEY) : null
  const theme = demoTheme && Object.values(THEME_KEY).includes(demoTheme) ? demoTheme : MOCK_WEDDING.theme

  return (
    <div className='mx-auto min-h-dvh max-w-3xl shadow-xl'>
      <Invitation data={{ ...MOCK_WEDDING, theme }} />
      <button
        className='btn btn-ghost btn-xs no-print fixed bottom-4 right-4 z-20 bg-base-100/80 backdrop-blur'
        onClick={() => open({ title: translate('publicPage.report.title'), children: <ReportForm /> })}
      >
        <InfoIcon className='size-3.5' />
        {translate('publicPage.report.button')}
      </button>
    </div>
  )
}

export default InvitationView
