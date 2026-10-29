'use client'

import { ReactNode } from 'react'

import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'

type ConfirmDialogProps = {
  message: ReactNode
  confirmLabel?: ReactNode
  isDanger?: boolean
  onConfirm: () => void
}

// Body of a confirm modal: open it with useModal().open({ title, children: <ConfirmDialog ... /> })
const ConfirmDialog = ({ message, confirmLabel, isDanger, onConfirm }: ConfirmDialogProps) => {
  const { translate } = useLanguage()
  const { close } = useModal()

  return (
    <div>
      <p className='text-base-content/80'>{message}</p>
      <div className='modal-action'>
        <button className='btn btn-ghost' onClick={() => close()}>
          {translate('common.cancel')}
        </button>
        <button
          className={isDanger ? 'btn btn-error' : 'btn btn-primary'}
          onClick={() => {
            onConfirm()
            close()
          }}
        >
          {confirmLabel ?? translate('common.confirm')}
        </button>
      </div>
    </div>
  )
}

export default ConfirmDialog
