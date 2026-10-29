'use client'

import dayjs from 'dayjs'

import PageHeader from '@/components/PageHeader'
import { PAGE_STATUS, PERCENT, REPORT_STATUS, SHORT_DATE_FORMAT } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import { MOCK_DAILY_USAGE, MOCK_MODEL_USAGE, MOCK_PAGES, MOCK_REPORTS, MOCK_USERS } from '@/mock'
import { formatNumber, formatVnd } from '@/utils/format'
import { cn } from '@/utils/tailwind'

// Admin overview: usage, AI cost vs revenue (profit/loss) by model and by day
const AdminOverviewPage = () => {
  const { translate } = useLanguage()
  const revenue = MOCK_MODEL_USAGE.reduce((sum, item) => sum + item.revenue, 0)
  const cost = MOCK_MODEL_USAGE.reduce((sum, item) => sum + item.cost, 0)
  const maxDaily = Math.max(...MOCK_DAILY_USAGE.map((day) => day.revenue))

  const stats = [
    { title: translate('admin.overview.users'), value: MOCK_USERS.length },
    { title: translate('admin.overview.activePages'), value: MOCK_PAGES.filter((page) => page.status === PAGE_STATUS.ACTIVE).length },
    { title: translate('admin.overview.revenue'), value: formatVnd(revenue) },
    { title: translate('admin.overview.aiCost'), value: formatVnd(cost) },
    { title: translate('admin.overview.profit'), value: formatVnd(revenue - cost), className: 'text-success' },
    {
      title: translate('admin.overview.openReports'),
      value: MOCK_REPORTS.filter((report) => report.status === REPORT_STATUS.OPEN).length,
      className: 'text-error',
    },
  ]

  return (
    <div className='flex flex-col gap-6'>
      <PageHeader title={translate('admin.overview.title')} description={translate('admin.overview.description')} />

      <div className='grid grid-cols-2 gap-3 lg:grid-cols-6'>
        {stats.map((stat) => (
          <div key={stat.title} className='stats border border-base-300 bg-base-100'>
            <div className='stat p-4'>
              <div className='stat-title text-xs'>{stat.title}</div>
              <div className={cn('stat-value text-xl', stat.className)}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className='grid gap-6 xl:grid-cols-2'>
        <div className='card border border-base-300 bg-base-100'>
          <div className='card-body'>
            <h2 className='card-title text-base'>{translate('admin.overview.daily')}</h2>
            <ul className='flex flex-col gap-3'>
              {MOCK_DAILY_USAGE.map((day) => (
                <li key={day.date} className='grid grid-cols-[3rem_1fr_auto] items-center gap-3 text-sm'>
                  <span className='text-base-content/60'>{dayjs(day.date).format(SHORT_DATE_FORMAT)}</span>
                  <div className='flex flex-col gap-1'>
                    <progress
                      className='progress progress-primary'
                      value={day.revenue}
                      max={maxDaily}
                      aria-label={translate('admin.overview.revenue')}
                    />
                    <progress className='progress progress-warning' value={day.cost} max={maxDaily} aria-label={translate('admin.overview.aiCost')} />
                  </div>
                  <span className='text-right font-semibold text-success'>{formatVnd(day.revenue - day.cost)}</span>
                </li>
              ))}
            </ul>
            <div className='mt-2 flex gap-4 text-xs text-base-content/60'>
              <span className='flex items-center gap-1'>
                <span className='size-2 rounded-full bg-primary' />
                {translate('admin.overview.revenue')}
              </span>
              <span className='flex items-center gap-1'>
                <span className='size-2 rounded-full bg-warning' />
                {translate('admin.overview.aiCost')}
              </span>
            </div>
          </div>
        </div>

        <div className='card border border-base-300 bg-base-100'>
          <div className='card-body'>
            <h2 className='card-title text-base'>{translate('admin.overview.byModel')}</h2>
            <div className='overflow-x-auto'>
              <table className='table table-sm'>
                <thead>
                  <tr>
                    <th>{translate('studio.model.name')}</th>
                    <th className='text-right'>{translate('admin.overview.messages')}</th>
                    <th className='text-right'>{translate('admin.overview.revenue')}</th>
                    <th className='text-right'>{translate('admin.overview.aiCost')}</th>
                    <th className='text-right'>{translate('admin.overview.margin')}</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_MODEL_USAGE.map((item) => {
                    const margin = Math.round(((item.revenue - item.cost) / item.revenue) * PERCENT)

                    return (
                      <tr key={item.modelId}>
                        <td>
                          <p className='font-semibold'>{item.modelName}</p>
                          <p className='text-xs text-base-content/50'>{translate('studio.chat.tokens', { count: formatNumber(item.tokens) })}</p>
                        </td>
                        <td className='text-right'>{formatNumber(item.messages)}</td>
                        <td className='text-right'>{formatVnd(item.revenue)}</td>
                        <td className='text-right'>{formatVnd(item.cost)}</td>
                        <td className='text-right'>
                          <span className={cn('badge badge-sm badge-soft', margin >= 0 ? 'badge-success' : 'badge-error')}>{margin}%</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOverviewPage
