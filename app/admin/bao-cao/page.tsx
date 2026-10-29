'use client'

import type { ViolationReport } from '@/types'

import { useState } from 'react'
import Link from 'next/link'

import ConfirmDialog from '@/components/ConfirmDialog'
import PageHeader from '@/components/PageHeader'
import { REPORT_STATUS, ROUTES } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'
import { MOCK_REPORTS } from '@/mock'
import { formatDateTime } from '@/utils/format'
import { cn } from '@/utils/tailwind'
import { toast } from '@/utils/toast'

// Admin: violation reports sent from public pages → lock the page or dismiss
const AdminReportsPage = () => {
  const { translate } = useLanguage()
  const { open } = useModal()
  const [reports, setReports] = useState<ViolationReport[]>(MOCK_REPORTS)

  const resolve = (id: string) =>
    setReports((prev) => prev.map((report) => (report.id === id ? { ...report, status: REPORT_STATUS.RESOLVED } : report)))

  return (
    <div>
      <PageHeader title={translate('admin.reports.title')} description={translate('admin.reports.description')} />
      <div className='overflow-x-auto rounded-box border border-base-300 bg-base-100'>
        <table className='table'>
          <thead>
            <tr>
              <th>{translate('admin.reports.page')}</th>
              <th>{translate('admin.reports.reason')}</th>
              <th>{translate('admin.reports.date')}</th>
              <th>{translate('admin.users.status')}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => {
              const isOpen = report.status === REPORT_STATUS.OPEN

              return (
                <tr key={report.id}>
                  <td>
                    <Link href={ROUTES.invitation(report.pageSlug)} target='_blank' className='link font-semibold'>
                      {report.pageTitle}
                    </Link>
                    <p className='text-xs text-base-content/60'>{translate('admin.reports.owner', { name: report.ownerName })}</p>
                  </td>
                  <td className='max-w-xs text-sm'>{report.reason}</td>
                  <td className='whitespace-nowrap text-sm'>{formatDateTime(report.createdAt)}</td>
                  <td>
                    <span className={cn('badge badge-sm badge-soft', isOpen ? 'badge-error' : 'badge-success')}>
                      {translate(`reportStatus.${report.status}`)}
                    </span>
                  </td>
                  <td>
                    {isOpen && (
                      <div className='flex gap-1'>
                        <button
                          className='btn btn-error btn-sm'
                          onClick={() =>
                            open({
                              title: translate('admin.reports.lockPage'),
                              children: (
                                <ConfirmDialog
                                  isDanger
                                  message={translate('admin.reports.lockConfirm', { title: report.pageTitle })}
                                  onConfirm={() => {
                                    resolve(report.id)
                                    toast({ type: 'success', message: translate('admin.reports.locked') })
                                  }}
                                />
                              ),
                            })
                          }
                        >
                          {translate('admin.reports.lockPage')}
                        </button>
                        <button className='btn btn-ghost btn-sm' onClick={() => resolve(report.id)}>
                          {translate('admin.reports.dismiss')}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminReportsPage
