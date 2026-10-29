'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import AuthCard from '../components/AuthCard'

import { MIN_PASSWORD_LENGTH, ROUTES } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import { toast } from '@/utils/toast'

// Change password — required on the first login of an admin-created account
const ChangePasswordPage = () => {
  const { translate } = useLanguage()
  const { user, updateUser } = useUser()
  const router = useRouter()
  const [error, setError] = useState('')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    if (form.get('newPassword') !== form.get('confirmPassword')) {
      setError(translate('auth.passwordMismatch'))

      return
    }
    updateUser({ mustChangePassword: false })
    toast({ type: 'success', message: translate('auth.changePassword.success') })
    router.replace(ROUTES.studio)
  }

  return (
    <AuthCard
      title={translate('auth.changePassword.title')}
      description={translate(user.mustChangePassword ? 'auth.changePassword.firstLogin' : 'auth.changePassword.description')}
    >
      <form onSubmit={onSubmit} className='flex flex-col gap-3'>
        <label className='flex flex-col gap-1'>
          <span className='label text-sm'>{translate('auth.changePassword.current')}</span>
          <input name='currentPassword' type='password' required autoComplete='current-password' className='input w-full' />
        </label>
        <label className='flex flex-col gap-1'>
          <span className='label text-sm'>{translate('auth.changePassword.new')}</span>
          <input name='newPassword' type='password' required minLength={MIN_PASSWORD_LENGTH} autoComplete='new-password' className='input w-full' />
          <span className='text-xs text-base-content/60'>{translate('auth.passwordHint', { min: MIN_PASSWORD_LENGTH })}</span>
        </label>
        <label className='flex flex-col gap-1'>
          <span className='label text-sm'>{translate('auth.confirmPassword')}</span>
          <input
            name='confirmPassword'
            type='password'
            required
            minLength={MIN_PASSWORD_LENGTH}
            autoComplete='new-password'
            className='input w-full'
          />
        </label>
        {error && <p className='text-sm text-error'>{error}</p>}
        <button type='submit' className='btn btn-primary mt-2'>
          {translate('auth.changePassword.submit')}
        </button>
      </form>
    </AuthCard>
  )
}

export default ChangePasswordPage
