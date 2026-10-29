'use client'

import { useEffect } from 'react'

import { CloseIcon } from '../Icons/Functions/Close'

import useModal from '@/hooks/useModal'
import useLanguage from '@/hooks/useLanguage'
import { cn } from '@/utils/tailwind'

// Renders the modal stack from zustand/modal with daisyUI `modal` (bottom sheet on mobile, centered from sm)
const MyModal = () => {
  const { listModals, close } = useModal()
  const { translate } = useLanguage()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && listModals.length) {
        close()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [listModals.length, close])

  return (
    <>
      {listModals.map((modal, index) => (
        <div key={`modal-${index}`} className='modal modal-open modal-bottom sm:modal-middle' style={{ zIndex: 100 + index * 2 }} role='dialog'>
          <div className={cn('modal-box max-h-[90dvh]', modal.classNames?.container)}>
            {modal.showBtnClose !== false && (
              <button
                onClick={() => close()}
                aria-label={translate('common.close')}
                className='btn btn-sm btn-circle btn-ghost absolute right-3 top-3'
              >
                <CloseIcon className='size-5' />
              </button>
            )}
            {modal.title && <h3 className={cn('mb-4 pr-8 text-lg font-bold', modal.classNames?.header)}>{modal.title}</h3>}
            <div className={modal.classNames?.body}>{modal.children}</div>
          </div>
          <button
            className={cn('modal-backdrop', modal.classNames?.backdrop)}
            aria-label={translate('common.close')}
            onClick={() => modal.overClickClose !== false && close()}
          />
        </div>
      ))}
    </>
  )
}

export default MyModal
