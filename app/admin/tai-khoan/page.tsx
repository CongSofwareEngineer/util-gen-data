'use client'

import type { User } from '@/types'

import { useState } from 'react'

import UserDialog from '../components/UserDialog'

import ConfirmDialog from '@/components/ConfirmDialog'
import PageHeader from '@/components/PageHeader'
import { SearchIcon } from '@/components/Icons/Functions/Search'
import { PlusIcon } from '@/components/Icons/Plus'
import { USER_ROLE, USER_STATUS } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'
import { MOCK_USERS } from '@/mock'
import { formatDate, formatVnd } from '@/utils/format'
import { cn } from '@/utils/tailwind'
import { toast } from '@/utils/toast'

// Admin: create / lock accounts, set quota (pages, max link duration), assign links
const AdminUsersPage = () => {
  const { translate } = useLanguage()
  const { open } = useModal()
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [keyword, setKeyword] = useState('')
  const query = keyword.trim().toLowerCase()
  const filtered = users.filter((user) => !query || user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query))

  const saveUser = (next: User) =>
    setUsers((prev) => (prev.some((user) => user.id === next.id) ? prev.map((user) => (user.id === next.id ? next : user)) : [next, ...prev]))

  const toggleLock = (user: User) => saveUser({ ...user, status: user.status === USER_STATUS.ACTIVE ? USER_STATUS.LOCKED : USER_STATUS.ACTIVE })

  return (
    <div>
      <PageHeader
        title={translate('admin.users.title')}
        description={translate('admin.users.description')}
        actions={
          <button
            className='btn btn-primary'
            onClick={() => open({ title: translate('admin.users.create'), children: <UserDialog onSave={saveUser} /> })}
          >
            <PlusIcon className='size-4' />
            {translate('admin.users.create')}
          </button>
        }
      />

      <label className='input mb-4 w-full max-w-sm'>
        <SearchIcon className='size-4 opacity-50' />
        <input type='search' value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder={translate('admin.users.search')} />
      </label>

      <div className='overflow-x-auto rounded-box border border-base-300 bg-base-100'>
        <table className='table'>
          <thead>
            <tr>
              <th>{translate('admin.users.user')}</th>
              <th>{translate('admin.users.role')}</th>
              <th>{translate('admin.users.status')}</th>
              <th>{translate('admin.users.quota')}</th>
              <th>{translate('wallet.balance')}</th>
              <th>{translate('admin.users.createdAt')}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id}>
                <td>
                  <p className='font-semibold'>{user.name}</p>
                  <p className='text-xs text-base-content/60'>{user.email}</p>
                  {user.mustChangePassword && (
                    <span className='badge badge-xs badge-warning badge-soft'>{translate('admin.users.mustChangePassword')}</span>
                  )}
                </td>
                <td>
                  <span className={cn('badge badge-sm', user.role === USER_ROLE.ADMIN ? 'badge-neutral' : 'badge-ghost')}>
                    {translate(`role.${user.role}`)}
                  </span>
                </td>
                <td>
                  <span className={cn('badge badge-sm badge-soft', user.status === USER_STATUS.ACTIVE ? 'badge-success' : 'badge-error')}>
                    {translate(`userStatus.${user.status}`)}
                  </span>
                </td>
                <td className='text-sm'>
                  {translate('admin.users.quotaValue', { used: user.pageCount, max: user.maxPages, days: user.maxDurationDays })}
                </td>
                <td>{formatVnd(user.balance)}</td>
                <td className='text-sm'>{formatDate(user.createdAt)}</td>
                <td>
                  <div className='dropdown dropdown-end'>
                    <button tabIndex={0} className='btn btn-ghost btn-sm'>
                      {translate('common.more')}
                    </button>
                    <ul tabIndex={-1} className='menu dropdown-content z-10 w-56 rounded-box bg-base-100 p-2 shadow-lg'>
                      <li>
                        <button
                          onClick={() => open({ title: translate('admin.users.edit'), children: <UserDialog user={user} onSave={saveUser} /> })}
                        >
                          {translate('admin.users.edit')}
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            open({
                              title: translate('admin.users.resetPassword'),
                              children: (
                                <ConfirmDialog
                                  message={translate('admin.users.resetPasswordConfirm', { name: user.name })}
                                  onConfirm={() => {
                                    saveUser({ ...user, mustChangePassword: true })
                                    toast({ type: 'success', message: translate('admin.users.resetPasswordDone') })
                                  }}
                                />
                              ),
                            })
                          }
                        >
                          {translate('admin.users.resetPassword')}
                        </button>
                      </li>
                      <li>
                        <button className={user.status === USER_STATUS.ACTIVE ? 'text-error' : 'text-success'} onClick={() => toggleLock(user)}>
                          {translate(user.status === USER_STATUS.ACTIVE ? 'admin.users.lock' : 'admin.users.unlock')}
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && <p className='p-6 text-center text-sm text-base-content/60'>{translate('common.empty')}</p>}
      </div>
    </div>
  )
}

export default AdminUsersPage
