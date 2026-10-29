'use client'

import type { InviteCode, WithdrawRequest } from '@/types'

import { useState } from 'react'

import InviteCodeDialog from '../components/InviteCodeDialog'
import FormField from '../components/FormField'

import PageHeader from '@/components/PageHeader'
import { PlusIcon } from '@/components/Icons/Plus'
import { ADMIN_COMMISSION_TAB, MIN_WITHDRAW, PERCENT, REFERRAL_DEFAULTS, WITHDRAW_STATUS } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'
import { MOCK_INVITE_CODES, MOCK_WITHDRAWALS } from '@/mock'
import { formatDate, formatDateTime, formatVnd } from '@/utils/format'
import { cn } from '@/utils/tailwind'
import { toast } from '@/utils/toast'

const WITHDRAW_BADGE: Record<WITHDRAW_STATUS, string> = {
  [WITHDRAW_STATUS.PENDING]: 'badge-warning',
  [WITHDRAW_STATUS.PAID]: 'badge-success',
  [WITHDRAW_STATUS.REJECTED]: 'badge-error',
}

// Admin: invite codes, withdraw requests and referral rules (phase 3)
const AdminCommissionsPage = () => {
  const { translate } = useLanguage()
  const { open } = useModal()
  const [tab, setTab] = useState(ADMIN_COMMISSION_TAB.CODES)
  const [codes, setCodes] = useState<InviteCode[]>(MOCK_INVITE_CODES)
  const [withdrawals, setWithdrawals] = useState<WithdrawRequest[]>(MOCK_WITHDRAWALS)

  const setWithdrawStatus = (id: string, status: WITHDRAW_STATUS) =>
    setWithdrawals((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)))

  return (
    <div>
      <PageHeader
        title={
          <span className='flex items-center gap-2'>
            {translate('admin.commissions.title')}
            <span className='badge badge-ghost'>{translate('common.comingSoon')}</span>
          </span>
        }
        description={translate('admin.commissions.description')}
        actions={
          tab === ADMIN_COMMISSION_TAB.CODES && (
            <button
              className='btn btn-primary'
              onClick={() =>
                open({
                  title: translate('admin.commissions.createCode'),
                  children: <InviteCodeDialog onSave={(code) => setCodes((prev) => [code, ...prev])} />,
                })
              }
            >
              <PlusIcon className='size-4' />
              {translate('admin.commissions.createCode')}
            </button>
          )
        }
      />

      <div role='tablist' className='tabs tabs-border mb-4'>
        {Object.values(ADMIN_COMMISSION_TAB).map((value) => (
          <button key={value} role='tab' className={cn('tab', tab === value && 'tab-active')} onClick={() => setTab(value)}>
            {translate(`admin.commissions.tabs.${value}`)}
          </button>
        ))}
      </div>

      {tab === ADMIN_COMMISSION_TAB.CODES && (
        <div className='overflow-x-auto rounded-box border border-base-300 bg-base-100'>
          <table className='table'>
            <thead>
              <tr>
                <th>{translate('admin.commissions.code')}</th>
                <th>{translate('admin.commissions.owner')}</th>
                <th>{translate('admin.commissions.used')}</th>
                <th>{translate('admin.commissions.expiresAt')}</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((code) => (
                <tr key={code.code}>
                  <td className='font-mono font-semibold'>{code.code}</td>
                  <td>{code.ownerName}</td>
                  <td>{code.maxUses ? `${code.usedCount}/${code.maxUses}` : code.usedCount}</td>
                  <td className='text-sm'>{code.expiresAt ? formatDate(code.expiresAt) : translate('studio.publish.unlimited')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === ADMIN_COMMISSION_TAB.WITHDRAWALS && (
        <div className='overflow-x-auto rounded-box border border-base-300 bg-base-100'>
          <table className='table'>
            <thead>
              <tr>
                <th>{translate('admin.commissions.requester')}</th>
                <th className='text-right'>{translate('referral.withdraw.amount')}</th>
                <th>{translate('referral.withdraw.bankName')}</th>
                <th>{translate('admin.reports.date')}</th>
                <th>{translate('admin.users.status')}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((item) => (
                <tr key={item.id}>
                  <td className='font-semibold'>{item.userName}</td>
                  <td className='text-right'>{formatVnd(item.amount)}</td>
                  <td className='text-sm'>
                    {item.bankName}
                    <p className='font-mono text-xs text-base-content/60'>{item.bankAccount}</p>
                  </td>
                  <td className='whitespace-nowrap text-sm'>{formatDateTime(item.createdAt)}</td>
                  <td>
                    <span className={cn('badge badge-sm badge-soft', WITHDRAW_BADGE[item.status])}>{translate(`withdrawStatus.${item.status}`)}</span>
                  </td>
                  <td>
                    {item.status === WITHDRAW_STATUS.PENDING && (
                      <div className='flex gap-1'>
                        <button className='btn btn-success btn-sm' onClick={() => setWithdrawStatus(item.id, WITHDRAW_STATUS.PAID)}>
                          {translate('admin.commissions.markPaid')}
                        </button>
                        <button className='btn btn-ghost btn-sm' onClick={() => setWithdrawStatus(item.id, WITHDRAW_STATUS.REJECTED)}>
                          {translate('admin.commissions.reject')}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === ADMIN_COMMISSION_TAB.SETTINGS && (
        <form
          className='card max-w-xl border border-base-300 bg-base-100'
          onSubmit={(event) => {
            event.preventDefault()
            toast({ type: 'success', message: translate('common.saved') })
          }}
        >
          <div className='card-body gap-3'>
            <div role='alert' className='alert alert-warning alert-soft text-sm'>
              {translate('admin.commissions.rulesPending')}
            </div>
            <FormField label={translate('admin.commissions.rate')}>
              <input type='number' min={0} max={PERCENT} defaultValue={REFERRAL_DEFAULTS.commissionPercent} className='input w-full' />
            </FormField>
            <FormField label={translate('admin.commissions.reviewDays')}>
              <input type='number' min={0} defaultValue={REFERRAL_DEFAULTS.reviewDays} className='input w-full' />
            </FormField>
            <FormField label={translate('admin.commissions.minWithdraw')}>
              <input type='number' min={0} defaultValue={MIN_WITHDRAW} className='input w-full' />
            </FormField>
            <label className='label cursor-pointer gap-2 text-sm text-base-content'>
              <input type='checkbox' defaultChecked className='checkbox checkbox-sm checkbox-primary' />
              {translate('admin.commissions.firstOrderOnly')}
            </label>
            <button type='submit' className='btn btn-primary mt-2'>
              {translate('common.save')}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default AdminCommissionsPage
