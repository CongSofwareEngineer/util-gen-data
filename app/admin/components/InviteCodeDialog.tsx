'use client'

import type { InviteCode } from '@/types'

import { FormEvent } from 'react'
import dayjs from 'dayjs'

import FormField from './FormField'

import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'

// Issue an invite code to a collaborator (optional max uses / expiry)
const InviteCodeDialog = ({ onSave }: { onSave: (code: InviteCode) => void }) => {
  const { translate } = useLanguage()
  const { close } = useModal()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const maxUses = Number(form.get('maxUses'))
    const expiresAt = String(form.get('expiresAt'))

    onSave({
      code: String(form.get('code')).toUpperCase(),
      ownerName: String(form.get('ownerName')),
      usedCount: 0,
      maxUses: maxUses > 0 ? maxUses : null,
      expiresAt: expiresAt ? dayjs(expiresAt).endOf('day').format() : null,
    })
    close()
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-3'>
      <div className='grid gap-3 sm:grid-cols-2'>
        <FormField label={translate('admin.commissions.code')}>
          <input name='code' required className='input w-full font-mono uppercase' />
        </FormField>
        <FormField label={translate('admin.commissions.owner')}>
          <input name='ownerName' required className='input w-full' />
        </FormField>
        <FormField label={translate('admin.commissions.maxUses')} hint={translate('admin.commissions.emptyUnlimited')}>
          <input name='maxUses' type='number' min={0} className='input w-full' />
        </FormField>
        <FormField label={translate('admin.commissions.expiresAt')} hint={translate('admin.commissions.emptyUnlimited')}>
          <input name='expiresAt' type='date' className='input w-full' />
        </FormField>
      </div>
      <div className='modal-action mt-1'>
        <button type='button' className='btn btn-ghost' onClick={() => close()}>
          {translate('common.cancel')}
        </button>
        <button type='submit' className='btn btn-primary'>
          {translate('admin.commissions.createCode')}
        </button>
      </div>
    </form>
  )
}

export default InviteCodeDialog
