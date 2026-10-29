'use client'

import type { User } from '@/types'

import { FormEvent } from 'react'

import FormField from './FormField'

import { DEFAULT_USER_QUOTA, LINK_DURATIONS, ROUTES, SITE_CONFIG, UNLIMITED_DURATION, USER_ROLE, USER_STATUS } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'

const DURATION_OPTIONS = LINK_DURATIONS.filter((days) => days !== UNLIMITED_DURATION)

// Create an account (temporary password, must change on first login) or edit its quota / link
const UserDialog = ({ user, onSave }: { user?: User; onSave: (user: User) => void }) => {
  const { translate } = useLanguage()
  const { close } = useModal()
  const isEdit = !!user

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    onSave({
      id: user?.id ?? `${Date.now()}`,
      name: String(form.get('name')),
      email: String(form.get('email')),
      role: form.get('role') as USER_ROLE,
      status: user?.status ?? USER_STATUS.ACTIVE,
      balance: user?.balance ?? 0,
      inviteCode: user?.inviteCode ?? String(form.get('slug')).toUpperCase(),
      mustChangePassword: user?.mustChangePassword ?? true,
      maxPages: Number(form.get('maxPages')),
      maxDurationDays: Number(form.get('maxDurationDays')),
      pageCount: user?.pageCount ?? 0,
      createdAt: user?.createdAt ?? new Date().toISOString(),
    })
    close()
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-3'>
      <div className='grid gap-3 sm:grid-cols-2'>
        <FormField label={translate('auth.name')}>
          <input name='name' required defaultValue={user?.name} className='input w-full' />
        </FormField>
        <FormField label={translate('auth.email')}>
          <input name='email' type='email' required defaultValue={user?.email} className='input w-full' />
        </FormField>
      </div>
      {!isEdit && (
        <FormField label={translate('admin.users.tempPassword')} hint={translate('admin.users.tempPasswordHint')}>
          <input name='password' required className='input w-full font-mono' />
        </FormField>
      )}
      <FormField label={translate('admin.users.slug')} hint={`${SITE_CONFIG.url}${ROUTES.invitation(translate('admin.users.slugPlaceholder'))}`}>
        <input name='slug' required className='input w-full' />
      </FormField>
      <div className='grid gap-3 sm:grid-cols-3'>
        <FormField label={translate('admin.users.role')}>
          <select name='role' defaultValue={user?.role ?? USER_ROLE.USER} className='select w-full'>
            {Object.values(USER_ROLE).map((role) => (
              <option key={role} value={role}>
                {translate(`role.${role}`)}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label={translate('admin.users.maxPages')}>
          <input
            name='maxPages'
            type='number'
            min={1}
            required
            defaultValue={user?.maxPages ?? DEFAULT_USER_QUOTA.maxPages}
            className='input w-full'
          />
        </FormField>
        <FormField label={translate('admin.users.maxDuration')}>
          <select name='maxDurationDays' defaultValue={user?.maxDurationDays ?? DEFAULT_USER_QUOTA.maxDurationDays} className='select w-full'>
            {DURATION_OPTIONS.map((days) => (
              <option key={days} value={days}>
                {translate('studio.publish.days', { days })}
              </option>
            ))}
          </select>
        </FormField>
      </div>
      <div className='modal-action mt-1'>
        <button type='button' className='btn btn-ghost' onClick={() => close()}>
          {translate('common.cancel')}
        </button>
        <button type='submit' className='btn btn-primary'>
          {translate(isEdit ? 'common.save' : 'admin.users.create')}
        </button>
      </div>
    </form>
  )
}

export default UserDialog
