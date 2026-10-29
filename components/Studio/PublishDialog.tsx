'use client'

import { useState } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'

import QrCode from '@/components/QrCode'
import { CopyIcon } from '@/components/Icons/Functions/Copy'
import { ExternalLinkIcon } from '@/components/Icons/ExternalLink'
import {
  DEFAULT_LINK_DURATION,
  EXPIRED_RETENTION_DAYS,
  LINK_DURATIONS,
  MOCK_PAYMENT_DELAY,
  ROUTES,
  SITE_CONFIG,
  UNLIMITED_DURATION,
} from '@/constants/app'
import useCopy from '@/hooks/useCopy'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'
import useStudio from '@/hooks/useStudio'
import useUser from '@/hooks/useUser'
import { MOCK_PAGES } from '@/mock'
import { formatDate, linkExpiry } from '@/utils/format'
import { cn } from '@/utils/tailwind'

// Link slug is assigned by the admin (mock: first page of the user)
const ASSIGNED_SLUG = MOCK_PAGES[0].slug

// "Tạo" flow: pick the link lifetime → publish → share link + QR
const PublishDialog = () => {
  const { translate } = useLanguage()
  const { close } = useModal()
  const { user } = useUser()
  const { data } = useStudio()
  const { copied, copy } = useCopy()
  const [duration, setDuration] = useState<number>(DEFAULT_LINK_DURATION)
  const [hasPassword, setHasPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const url = `${SITE_CONFIG.url}${ROUTES.invitation(ASSIGNED_SLUG)}`
  const expiry = linkExpiry(duration)
  const expiresBeforeWedding = !!expiry && expiry.isBefore(dayjs(data.weddingDate))
  const maxDuration = user.maxDurationDays ?? DEFAULT_LINK_DURATION

  const onPublish = () => {
    setIsLoading(true)
    window.setTimeout(() => {
      setIsLoading(false)
      setIsDone(true)
    }, MOCK_PAYMENT_DELAY / 2)
  }

  if (isDone) {
    return (
      <div className='flex flex-col items-center gap-4 text-center'>
        <div role='alert' className='alert alert-success alert-soft w-full'>
          <span>{translate('studio.publish.success')}</span>
        </div>
        <QrCode value={url} />
        <div className='join w-full'>
          <input readOnly value={url} className='input join-item w-full text-sm' aria-label={translate('studio.publish.link')} />
          <button className='btn btn-primary join-item' onClick={() => copy(url)}>
            <CopyIcon className='size-4' />
            {translate(copied ? 'common.copied' : 'common.copy')}
          </button>
        </div>
        <div className='flex w-full gap-2'>
          <Link href={ROUTES.invitation(ASSIGNED_SLUG)} target='_blank' className='btn btn-ghost flex-1'>
            <ExternalLinkIcon className='size-4' />
            {translate('studio.publish.open')}
          </Link>
          <Link href={ROUTES.myPages} onClick={() => close()} className='btn btn-outline flex-1'>
            {translate('nav.myPages')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      <label className='flex flex-col gap-1'>
        <span className='label text-sm'>{translate('studio.publish.link')}</span>
        <input readOnly value={url} className='input w-full text-sm' />
        <span className='text-xs text-base-content/60'>{translate('studio.publish.linkNote')}</span>
      </label>

      <div>
        <p className='label mb-2 text-sm'>{translate('studio.publish.duration')}</p>
        <div className='grid grid-cols-3 gap-2 sm:grid-cols-5'>
          {LINK_DURATIONS.map((days) => {
            // Unlimited is for profile / dashboard pages only
            const isDisabled = days === UNLIMITED_DURATION || days > maxDuration

            return (
              <button
                key={days}
                type='button'
                disabled={isDisabled}
                onClick={() => setDuration(days)}
                className={cn('btn btn-sm h-auto flex-col py-2', duration === days ? 'btn-primary' : 'btn-outline border-base-300')}
              >
                <span>{days === UNLIMITED_DURATION ? translate('studio.publish.unlimited') : translate('studio.publish.days', { days })}</span>
                {days === DEFAULT_LINK_DURATION && <span className='text-[10px] font-normal opacity-80'>{translate('studio.publish.default')}</span>}
              </button>
            )
          })}
        </div>
        <p className='mt-2 text-xs text-base-content/60'>{translate('studio.publish.unlimitedNote')}</p>
      </div>

      {expiresBeforeWedding && (
        <div role='alert' className='alert alert-warning alert-soft text-sm'>
          <span>{translate('studio.publish.expiresBeforeWedding', { date: formatDate(data.weddingDate) })}</span>
        </div>
      )}

      <div className='rounded-box bg-base-200 p-4 text-sm'>
        <p>{expiry ? translate('studio.publish.expiresAt', { date: formatDate(expiry.toDate()) }) : translate('studio.publish.neverExpires')}</p>
        <p className='mt-1 text-xs text-base-content/60'>{translate('studio.publish.retention', { days: EXPIRED_RETENTION_DAYS })}</p>
      </div>

      <fieldset className='fieldset rounded-box border border-base-300 p-4'>
        <legend className='fieldset-legend'>
          {translate('studio.publish.privacy')}
          <span className='badge badge-ghost badge-xs'>{translate('common.comingSoon')}</span>
        </legend>
        <label className='label cursor-pointer justify-between text-sm text-base-content'>
          {translate('studio.publish.password')}
          <input type='checkbox' className='toggle toggle-sm' checked={hasPassword} onChange={(event) => setHasPassword(event.target.checked)} />
        </label>
        {hasPassword && <input type='password' className='input input-sm w-full' placeholder={translate('studio.publish.passwordPlaceholder')} />}
        <label className='label cursor-pointer justify-between text-sm text-base-content'>
          {translate('studio.publish.noIndex')}
          <input type='checkbox' className='toggle toggle-sm' defaultChecked />
        </label>
      </fieldset>

      <div className='modal-action mt-0'>
        <button className='btn btn-ghost' onClick={() => close()}>
          {translate('common.cancel')}
        </button>
        <button className='btn btn-primary' onClick={onPublish} disabled={isLoading}>
          {isLoading && <span className='loading loading-spinner loading-sm' />}
          {translate('studio.publish.submit')}
        </button>
      </div>
    </div>
  )
}

export default PublishDialog
