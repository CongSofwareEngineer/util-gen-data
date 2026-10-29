'use client'

import { FormEvent } from 'react'

import PageHeader from '@/components/PageHeader'
import QrCode from '@/components/QrCode'
import { CopyIcon } from '@/components/Icons/Functions/Copy'
import { COMMISSION_STATUS, MIN_WITHDRAW, QUERY_PARAM, ROUTES, SITE_CONFIG } from '@/constants/app'
import useCopy from '@/hooks/useCopy'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import { MOCK_COMMISSIONS } from '@/mock'
import { formatDate, formatVnd } from '@/utils/format'
import { cn } from '@/utils/tailwind'
import { toast } from '@/utils/toast'

const COMMISSION_BADGE: Record<COMMISSION_STATUS, string> = {
  [COMMISSION_STATUS.PENDING]: 'badge-warning',
  [COMMISSION_STATUS.AVAILABLE]: 'badge-success',
  [COMMISSION_STATUS.PAID]: 'badge-ghost',
}

const REFERRAL_STEPS = ['share', 'register', 'pay', 'withdraw'] as const
const WITHDRAW_FIELDS = ['fullName', 'idNumber', 'bankName', 'bankAccount'] as const

// Invite code + commissions + withdraw request (phase 3)
const ReferralPage = () => {
  const { translate } = useLanguage()
  const { user } = useUser()
  const { copied, copy } = useCopy()
  const code = user.inviteCode ?? ''
  const link = `${SITE_CONFIG.url}${ROUTES.register}?${QUERY_PARAM.inviteCode}=${code}`
  const sumBy = (status: COMMISSION_STATUS) => MOCK_COMMISSIONS.filter((item) => item.status === status).reduce((sum, item) => sum + item.amount, 0)
  const available = sumBy(COMMISSION_STATUS.AVAILABLE)
  const canWithdraw = available >= MIN_WITHDRAW

  const stats = [
    { title: translate('referral.stats.referees'), value: MOCK_COMMISSIONS.length },
    { title: translate('referral.stats.pending'), value: formatVnd(sumBy(COMMISSION_STATUS.PENDING)) },
    { title: translate('referral.stats.available'), value: formatVnd(available) },
    { title: translate('referral.stats.paid'), value: formatVnd(sumBy(COMMISSION_STATUS.PAID)) },
  ]

  const onWithdraw = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    toast({ type: 'success', message: translate('referral.withdraw.success') })
    event.currentTarget.reset()
  }

  return (
    <div className='flex flex-col gap-6'>
      <PageHeader
        title={
          <span className='flex items-center gap-2'>
            {translate('referral.title')}
            <span className='badge badge-ghost'>{translate('common.comingSoon')}</span>
          </span>
        }
        description={translate('referral.description')}
      />

      <div className='grid gap-6 lg:grid-cols-[1.4fr_1fr]'>
        <div className='card border border-base-300 bg-base-100'>
          <div className='card-body gap-4'>
            <h2 className='card-title'>{translate('referral.yourCode')}</h2>
            <p className='font-mono text-3xl font-bold tracking-widest text-primary'>{code}</p>
            <div className='join w-full'>
              <input readOnly value={link} className='input join-item w-full text-sm' aria-label={translate('referral.link')} />
              <button className='btn btn-primary join-item' onClick={() => copy(link)}>
                <CopyIcon className='size-4' />
                {translate(copied ? 'common.copied' : 'common.copy')}
              </button>
            </div>
            <ul className='steps steps-vertical text-sm sm:steps-horizontal'>
              {REFERRAL_STEPS.map((step) => (
                <li key={step} className='step step-primary'>
                  {translate(`referral.steps.${step}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='card border border-base-300 bg-base-100'>
          <div className='card-body items-center'>
            <QrCode value={link} />
          </div>
        </div>
      </div>

      <div className='stats stats-vertical w-full border border-base-300 bg-base-100 sm:stats-horizontal'>
        {stats.map((stat) => (
          <div key={stat.title} className='stat'>
            <div className='stat-title'>{stat.title}</div>
            <div className='stat-value text-2xl'>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className='grid gap-6 lg:grid-cols-[1.4fr_1fr]'>
        <div>
          <h2 className='mb-3 text-lg font-bold'>{translate('referral.commissions')}</h2>
          <div className='overflow-x-auto rounded-box border border-base-300 bg-base-100'>
            <table className='table'>
              <thead>
                <tr>
                  <th>{translate('referral.table.referee')}</th>
                  <th>{translate('referral.table.order')}</th>
                  <th>{translate('referral.table.commission')}</th>
                  <th>{translate('referral.table.status')}</th>
                  <th>{translate('referral.table.date')}</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_COMMISSIONS.map((item) => (
                  <tr key={item.id}>
                    <td>{item.refereeName}</td>
                    <td>{formatVnd(item.orderAmount)}</td>
                    <td className='font-semibold'>{formatVnd(item.amount)}</td>
                    <td>
                      <span className={cn('badge badge-sm badge-soft', COMMISSION_BADGE[item.status])}>
                        {translate(`referral.status.${item.status}`)}
                      </span>
                    </td>
                    <td className='text-sm'>{formatDate(item.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <form onSubmit={onWithdraw} className='card border border-base-300 bg-base-100'>
          <div className='card-body gap-3'>
            <h2 className='card-title'>{translate('referral.withdraw.title')}</h2>
            <p className='text-xs text-base-content/60'>{translate('referral.withdraw.note', { min: formatVnd(MIN_WITHDRAW) })}</p>
            <label className='flex flex-col gap-1'>
              <span className='label text-sm'>{translate('referral.withdraw.amount')}</span>
              <input
                type='number'
                required
                min={MIN_WITHDRAW}
                max={available}
                defaultValue={available}
                className='input w-full'
                disabled={!canWithdraw}
              />
            </label>
            {WITHDRAW_FIELDS.map((field) => (
              <label key={field} className='flex flex-col gap-1'>
                <span className='label text-sm'>{translate(`referral.withdraw.${field}`)}</span>
                <input required className='input w-full' disabled={!canWithdraw} />
              </label>
            ))}
            <p className='text-xs text-base-content/60'>{translate('referral.withdraw.taxNote')}</p>
            <button type='submit' className='btn btn-primary' disabled={!canWithdraw}>
              {translate('referral.withdraw.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReferralPage
