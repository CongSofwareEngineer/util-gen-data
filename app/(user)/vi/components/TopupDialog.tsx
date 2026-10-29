'use client'

import { useEffect, useState } from 'react'

import QrCode from '@/components/QrCode'
import { MOCK_PAYMENT_DELAY } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'
import { formatVnd } from '@/utils/format'

// VietQR via PayOS: scan, the wallet is credited automatically after a few seconds (mocked)
const TopupDialog = ({ amount, transferNote, onPaid }: { amount: number; transferNote: string; onPaid: () => void }) => {
  const { translate } = useLanguage()
  const { close } = useModal()
  const [isPaid, setIsPaid] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsPaid(true)
      onPaid()
    }, MOCK_PAYMENT_DELAY)

    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex flex-col items-center gap-4 text-center'>
      <QrCode value={transferNote} />
      <ul className='list w-full rounded-box bg-base-200 text-sm'>
        <li className='list-row'>
          <span className='list-col-grow text-left'>{translate('wallet.topupDialog.amount')}</span>
          <b className='text-primary'>{formatVnd(amount)}</b>
        </li>
        <li className='list-row'>
          <span className='list-col-grow text-left'>{translate('wallet.topupDialog.note')}</span>
          <b>{transferNote}</b>
        </li>
      </ul>
      {isPaid ? (
        <>
          <div role='alert' className='alert alert-success alert-soft w-full'>
            {translate('wallet.topupDialog.success', { amount: formatVnd(amount) })}
          </div>
          <button className='btn btn-primary btn-block' onClick={() => close()}>
            {translate('common.done')}
          </button>
        </>
      ) : (
        <p className='flex items-center gap-2 text-sm text-base-content/70'>
          <span className='loading loading-spinner loading-sm text-primary' />
          {translate('wallet.topupDialog.waiting')}
        </p>
      )}
    </div>
  )
}

export default TopupDialog
