'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import AuthCard from '../components/AuthCard'

import { ROUTES } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import { MOCK_USER } from '@/mock'

// Login (accounts are created by the admin or registered with an invite code)
const LoginPage = () => {
  const { translate } = useLanguage()
  const { login } = useUser()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    setIsLoading(true)
    // Mock: real flow is a server action that sets the httpOnly token cookies
    login({ ...MOCK_USER, email: String(form.get('email')) }, form.get('remember') === 'on')
    router.replace(MOCK_USER.mustChangePassword ? ROUTES.changePassword : ROUTES.studio)
  }

  return (
    <AuthCard
      title={translate('auth.login.title')}
      description={translate('auth.login.description')}
      footer={
        <>
          {translate('auth.login.noAccount')}{' '}
          <Link href={ROUTES.register} className='link link-primary'>
            {translate('auth.login.registerWithCode')}
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className='flex flex-col gap-3'>
        <label className='flex flex-col gap-1'>
          <span className='label text-sm'>{translate('auth.email')}</span>
          <input name='email' type='email' required autoComplete='email' className='input w-full' />
        </label>
        <label className='flex flex-col gap-1'>
          <span className='label text-sm'>{translate('auth.password')}</span>
          <input name='password' type='password' required autoComplete='current-password' className='input w-full' />
        </label>
        <label className='label cursor-pointer gap-2 text-sm text-base-content'>
          <input name='remember' type='checkbox' defaultChecked className='checkbox checkbox-sm checkbox-primary' />
          {translate('auth.login.remember')}
        </label>
        <button type='submit' className='btn btn-primary mt-2' disabled={isLoading}>
          {isLoading && <span className='loading loading-spinner loading-sm' />}
          {translate('auth.login.submit')}
        </button>
      </form>
    </AuthCard>
  )
}

export default LoginPage
