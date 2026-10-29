'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import AuthCard from '../components/AuthCard'

import { MIN_PASSWORD_LENGTH, QUERY_PARAM, ROUTES } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import { MOCK_USER } from '@/mock'

// Register with an invite code (?ma=CODE prefills it); the code links the account to its referrer
const RegisterForm = () => {
  const { translate } = useLanguage()
  const { login } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState('')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    if (form.get('password') !== form.get('confirmPassword')) {
      setError(translate('auth.passwordMismatch'))

      return
    }
    login({ ...MOCK_USER, name: String(form.get('name')), email: String(form.get('email')), mustChangePassword: false })
    router.replace(ROUTES.wallet)
  }

  return (
    <AuthCard
      title={translate('auth.register.title')}
      description={translate('auth.register.description')}
      footer={
        <>
          {translate('auth.register.hasAccount')}{' '}
          <Link href={ROUTES.login} className='link link-primary'>
            {translate('nav.login')}
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className='flex flex-col gap-3'>
        <label className='flex flex-col gap-1'>
          <span className='label text-sm'>{translate('auth.register.inviteCode')}</span>
          <input
            name='inviteCode'
            required
            defaultValue={searchParams.get(QUERY_PARAM.inviteCode) ?? ''}
            className='input w-full font-mono uppercase tracking-widest'
          />
          <span className='text-xs text-base-content/60'>{translate('auth.register.inviteHint')}</span>
        </label>
        <label className='flex flex-col gap-1'>
          <span className='label text-sm'>{translate('auth.name')}</span>
          <input name='name' required autoComplete='name' className='input w-full' />
        </label>
        <label className='flex flex-col gap-1'>
          <span className='label text-sm'>{translate('auth.email')}</span>
          <input name='email' type='email' required autoComplete='email' className='input w-full' />
        </label>
        <label className='flex flex-col gap-1'>
          <span className='label text-sm'>{translate('auth.phone')}</span>
          <input name='phone' type='tel' required autoComplete='tel' className='input w-full' />
        </label>
        <div className='grid gap-3 sm:grid-cols-2'>
          <label className='flex flex-col gap-1'>
            <span className='label text-sm'>{translate('auth.password')}</span>
            <input name='password' type='password' required minLength={MIN_PASSWORD_LENGTH} autoComplete='new-password' className='input w-full' />
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
        </div>
        {error && <p className='text-sm text-error'>{error}</p>}
        <button type='submit' className='btn btn-primary mt-2'>
          {translate('auth.register.submit')}
        </button>
      </form>
    </AuthCard>
  )
}

export default RegisterForm
