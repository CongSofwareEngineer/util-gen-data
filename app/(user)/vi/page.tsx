'use client'

import type { WalletTransaction } from '@/types'

import { useState } from 'react'

import TopupDialog from './components/TopupDialog'

import PageHeader from '@/components/PageHeader'
import { LOW_BALANCE_WARNING, MIN_TOPUP, MONEY_INPUT_STEP, TOPUP_AMOUNTS, WALLET_TX_TYPE } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'
import useUser from '@/hooks/useUser'
import { MOCK_TRANSACTIONS } from '@/mock'
import { formatDateTime, formatNumber, formatVnd } from '@/utils/format'
import { cn } from '@/utils/tailwind'

const TX_BADGE: Record<WALLET_TX_TYPE, string> = {
  [WALLET_TX_TYPE.TOPUP]: 'badge-success',
  [WALLET_TX_TYPE.CHAT]: 'badge-info',
  [WALLET_TX_TYPE.EXTEND]: 'badge-secondary',
  [WALLET_TX_TYPE.REFUND]: 'badge-accent',
}

// Prepaid wallet: top up (no free credit), ledger of every top-up / charge
const WalletPage = () => {
  const { translate } = useLanguage()
  const { open } = useModal()
  const { user, updateUser } = useUser()
  const [amount, setAmount] = useState<number>(TOPUP_AMOUNTS[1])
  const [isCustom, setIsCustom] = useState(false)
  const [transactions, setTransactions] = useState<WalletTransaction[]>(MOCK_TRANSACTIONS)
  const balance = user.balance ?? 0
  const isValidAmount = amount >= MIN_TOPUP

  const onTopup = () => {
    const transferNote = translate('wallet.transferNote', { code: user.inviteCode ?? '' })

    open({
      title: translate('wallet.topupDialog.title'),
      overClickClose: false,
      children: (
        <TopupDialog
          amount={amount}
          transferNote={transferNote}
          onPaid={() => {
            const balanceAfter = balance + amount

            updateUser({ balance: balanceAfter })
            setTransactions((prev) => [
              { id: `${Date.now()}`, type: WALLET_TX_TYPE.TOPUP, amount, balanceAfter, createdAt: new Date().toISOString() },
              ...prev,
            ])
          }}
        />
      ),
    })
  }

  return (
    <div className='flex flex-col gap-6'>
      <PageHeader title={translate('wallet.title')} description={translate('wallet.description')} />

      <div className='grid gap-6 lg:grid-cols-[1fr_1.4fr]'>
        <div className='card bg-neutral text-neutral-content'>
          <div className='card-body'>
            <p className='text-sm opacity-80'>{translate('wallet.balance')}</p>
            <p className='text-4xl font-bold'>{formatVnd(balance)}</p>
            {balance < LOW_BALANCE_WARNING && <div className='badge badge-warning mt-2'>{translate('wallet.lowBalance')}</div>}
            <p className='mt-4 text-xs opacity-70'>{translate('wallet.noFreeCredit')}</p>
          </div>
        </div>

        <div className='card border border-base-300 bg-base-100'>
          <div className='card-body gap-4'>
            <h2 className='card-title'>{translate('wallet.topup')}</h2>
            <div className='grid grid-cols-2 gap-2 sm:grid-cols-5'>
              {TOPUP_AMOUNTS.map((value) => (
                <button
                  key={value}
                  className={cn('btn', !isCustom && amount === value ? 'btn-primary' : 'btn-outline border-base-300')}
                  onClick={() => {
                    setIsCustom(false)
                    setAmount(value)
                  }}
                >
                  {formatNumber(value)}
                </button>
              ))}
              <button className={cn('btn', isCustom ? 'btn-primary' : 'btn-outline border-base-300')} onClick={() => setIsCustom(true)}>
                {translate('wallet.custom')}
              </button>
            </div>
            {isCustom && (
              <label className='flex flex-col gap-1'>
                <span className='label text-sm'>{translate('wallet.customLabel', { min: formatVnd(MIN_TOPUP) })}</span>
                <input
                  type='number'
                  min={MIN_TOPUP}
                  step={MONEY_INPUT_STEP}
                  className={cn('input w-full', !isValidAmount && 'input-error')}
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                />
              </label>
            )}
            <button className='btn btn-primary' disabled={!isValidAmount} onClick={onTopup}>
              {translate('wallet.payWithQr', { amount: formatVnd(amount) })}
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className='mb-3 text-lg font-bold'>{translate('wallet.history')}</h2>
        <div className='overflow-x-auto rounded-box border border-base-300 bg-base-100'>
          <table className='table'>
            <thead>
              <tr>
                <th>{translate('wallet.table.time')}</th>
                <th>{translate('wallet.table.type')}</th>
                <th>{translate('wallet.table.detail')}</th>
                <th className='text-right'>{translate('wallet.table.amount')}</th>
                <th className='text-right'>{translate('wallet.table.balanceAfter')}</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className='whitespace-nowrap text-sm'>{formatDateTime(tx.createdAt)}</td>
                  <td>
                    <span className={cn('badge badge-sm badge-soft', TX_BADGE[tx.type])}>{translate(`wallet.txType.${tx.type}`)}</span>
                  </td>
                  <td className='text-sm'>
                    {tx.sessionTitle && <p>{tx.sessionTitle}</p>}
                    {tx.modelName && (
                      <p className='text-xs text-base-content/50'>
                        {tx.modelName}
                        {tx.tokens ? ` · ${translate('studio.chat.tokens', { count: formatNumber(tx.tokens) })}` : ''}
                      </p>
                    )}
                  </td>
                  <td className={cn('text-right font-semibold', tx.amount > 0 ? 'text-success' : 'text-error')}>
                    {tx.amount > 0 ? '+' : ''}
                    {formatVnd(tx.amount)}
                  </td>
                  <td className='text-right'>{formatVnd(tx.balanceAfter)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default WalletPage
