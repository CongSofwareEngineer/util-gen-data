'use client'

import QrCodeIcon from '@/components/Icons/QrCode'
import useLanguage from '@/hooks/useLanguage'
import { cn } from '@/utils/tailwind'

// Placeholder until a QR library (or the server-generated VietQR / page QR image) is wired
const QrCode = ({ value, className }: { value: string; className?: string }) => {
  const { translate } = useLanguage()

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className='flex size-48 items-center justify-center rounded-box border-2 border-dashed border-base-300 bg-base-200'>
        <QrCodeIcon className='size-24 text-base-content/40' />
      </div>
      <p className='max-w-48 truncate text-xs text-base-content/60' title={value}>
        {value}
      </p>
      <span className='sr-only'>{translate('common.qrCode')}</span>
    </div>
  )
}

export default QrCode
