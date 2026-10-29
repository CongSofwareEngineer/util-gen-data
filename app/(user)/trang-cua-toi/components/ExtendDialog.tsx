'use client'

import type { PageItem } from '@/types'

import { useState } from 'react'
import dayjs from 'dayjs'

import { EXTEND_FEE_PER_DAY, LINK_DURATIONS, UNLIMITED_DURATION } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'
import useUser from '@/hooks/useUser'
import { formatDate, formatVnd } from '@/utils/format'
import { cn } from '@/utils/tailwind'
import { toast } from '@/utils/toast'

const EXTEND_OPTIONS = LINK_DURATIONS.filter((days) => days !== UNLIMITED_DURATION)

// Extend a page link (always paid, taken from the wallet)
const ExtendDialog = ({ page, onExtended }: { page: PageItem; onExtended: (expiresAt: string) => void }) => {
  const { translate } = useLanguage()
  const { close } = useModal()
  const { user, updateUser } = useUser()
  const [days, setDays] = useState<number>(EXTEND_OPTIONS[0])
  const fee = days * EXTEND_FEE_PER_DAY
  const balance = user.balance ?? 0
  // Expired links restart from today
  const base = page.expiresAt && dayjs(page.expiresAt).isAfter(dayjs()) ? dayjs(page.expiresAt) : dayjs()
  const newExpiry = base.add(days, 'day').endOf('day')

  const onConfirm = () => {
    updateUser({ balance: balance - fee })
    onExtended(newExpiry.format())
    toast({ type: 'success', message: translate('myPages.extend.success') })
    close()
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-4 gap-2'>
        {EXTEND_OPTIONS.map((option) => (
          <button
            key={option}
            className={cn('btn btn-sm', option === days ? 'btn-primary' : 'btn-outline border-base-300')}
            onClick={() => setDays(option)}
          >
            {translate('studio.publish.days', { days: option })}
          </button>
        ))}
      </div>
      <ul className='list rounded-box bg-base-200 text-sm'>
        <li className='list-row'>
          <span className='list-col-grow'>{translate('myPages.extend.newExpiry')}</span>
          <b>{formatDate(newExpiry.toDate())}</b>
        </li>
        <li className='list-row'>
          <span className='list-col-grow'>{translate('myPages.extend.fee')}</span>
          <b className='text-primary'>{formatVnd(fee)}</b>
        </li>
        <li className='list-row'>
          <span className='list-col-grow'>{translate('wallet.balance')}</span>
          <span>{formatVnd(balance)}</span>
        </li>
      </ul>
      {balance < fee && (
        <div role='alert' className='alert alert-error alert-soft text-sm'>
          {translate('myPages.extend.notEnough')}
        </div>
      )}
      <div className='modal-action mt-0'>
        <button className='btn btn-ghost' onClick={() => close()}>
          {translate('common.cancel')}
        </button>
        <button className='btn btn-primary' disabled={balance < fee} onClick={onConfirm}>
          {translate('myPages.extend.submit')}
        </button>
      </div>
    </div>
  )
}

export default ExtendDialog
