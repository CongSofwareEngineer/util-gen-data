'use client'

import { useState } from 'react'
import Link from 'next/link'

import PageCard from './components/PageCard'

import PageHeader from '@/components/PageHeader'
import { PlusIcon } from '@/components/Icons/Plus'
import { MY_PAGES_TAB, PAGE_STATUS, QUERY_PARAM, ROUTES } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import { MOCK_MODELS, MOCK_PAGES, MOCK_SESSIONS } from '@/mock'
import { formatDateTime, formatNumber, formatVnd } from '@/utils/format'
import { cn } from '@/utils/tailwind'

// User dashboard: created pages (edit, extend, QR, download, hide/delete) and chat sessions
const MyPagesPage = () => {
  const { translate } = useLanguage()
  const { user } = useUser()
  const [tab, setTab] = useState(MY_PAGES_TAB.PAGES)
  const [pages, setPages] = useState(MOCK_PAGES)
  const maxPages = user.maxPages ?? 0
  const isAtQuota = pages.length >= maxPages

  const stats = [
    { title: translate('myPages.stats.pages'), value: `${pages.length}/${maxPages}`, desc: translate('myPages.stats.quota') },
    { title: translate('myPages.stats.active'), value: pages.filter((page) => page.status === PAGE_STATUS.ACTIVE).length },
    { title: translate('myPages.stats.views'), value: formatNumber(pages.reduce((sum, page) => sum + page.views, 0)) },
    { title: translate('myPages.stats.rsvp'), value: formatNumber(pages.reduce((sum, page) => sum + page.rsvpCount, 0)) },
  ]

  return (
    <div>
      <PageHeader
        title={translate('myPages.title')}
        description={translate('myPages.description')}
        actions={
          <Link href={ROUTES.studio} className={cn('btn btn-primary', isAtQuota && 'btn-disabled')} aria-disabled={isAtQuota}>
            <PlusIcon className='size-4' />
            {translate('myPages.create')}
          </Link>
        }
      />

      {isAtQuota && (
        <div role='alert' className='alert alert-info alert-soft mb-4 text-sm'>
          {translate('myPages.quotaReached')}
        </div>
      )}

      <div className='stats stats-vertical mb-6 w-full border border-base-300 bg-base-100 sm:stats-horizontal'>
        {stats.map((stat) => (
          <div key={stat.title} className='stat'>
            <div className='stat-title'>{stat.title}</div>
            <div className='stat-value text-2xl'>{stat.value}</div>
            {stat.desc && <div className='stat-desc'>{stat.desc}</div>}
          </div>
        ))}
      </div>

      <div role='tablist' className='tabs tabs-border mb-4'>
        {Object.values(MY_PAGES_TAB).map((value) => (
          <button key={value} role='tab' className={cn('tab', tab === value && 'tab-active')} onClick={() => setTab(value)}>
            {translate(`myPages.tabs.${value}`)}
          </button>
        ))}
      </div>

      {tab === MY_PAGES_TAB.PAGES &&
        (pages.length ? (
          <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
            {pages.map((page) => (
              <PageCard
                key={page.id}
                page={page}
                onChange={(next) => setPages((prev) => prev.map((item) => (item.id === next.id ? next : item)))}
                onDelete={(id) => setPages((prev) => prev.filter((item) => item.id !== id))}
              />
            ))}
          </div>
        ) : (
          <div className='rounded-box border border-dashed border-base-300 p-10 text-center text-base-content/60'>{translate('myPages.empty')}</div>
        ))}

      {tab === MY_PAGES_TAB.SESSIONS && (
        <div className='overflow-x-auto rounded-box border border-base-300 bg-base-100'>
          <table className='table'>
            <thead>
              <tr>
                <th>{translate('myPages.sessions.title')}</th>
                <th>{translate('myPages.sessions.model')}</th>
                <th>{translate('myPages.sessions.messages')}</th>
                <th>{translate('myPages.sessions.cost')}</th>
                <th>{translate('myPages.sessions.updatedAt')}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {MOCK_SESSIONS.map((session) => (
                <tr key={session.id}>
                  <td>
                    <p className='font-semibold'>{session.title}</p>
                    <span className={cn('badge badge-xs', session.isClosed ? 'badge-ghost' : 'badge-info')}>
                      {translate(session.isClosed ? 'myPages.sessions.closed' : 'myPages.sessions.open')}
                    </span>
                  </td>
                  <td>{MOCK_MODELS.find((model) => model.id === session.modelId)?.name}</td>
                  <td>{session.messageCount}</td>
                  <td>
                    <p>{formatVnd(session.totalCost)}</p>
                    <p className='text-xs text-base-content/50'>{translate('studio.chat.tokens', { count: formatNumber(session.totalTokens) })}</p>
                  </td>
                  <td className='text-sm'>{formatDateTime(session.updatedAt)}</td>
                  <td>
                    <Link href={`${ROUTES.studio}?${QUERY_PARAM.session}=${session.id}`} className='btn btn-ghost btn-sm'>
                      {translate('myPages.sessions.continue')}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default MyPagesPage
