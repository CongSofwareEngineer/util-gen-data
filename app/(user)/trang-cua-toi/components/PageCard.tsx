'use client'

import type { PageItem } from '@/types'

import Link from 'next/link'

import ExtendDialog from './ExtendDialog'

import ConfirmDialog from '@/components/ConfirmDialog'
import QrCode from '@/components/QrCode'
import ThemeSwatch from '@/components/ThemeSwatch'
import { DownloadIcon } from '@/components/Icons/Download'
import { EditIcon } from '@/components/Icons/Functions/Edit'
import { ExternalLinkIcon } from '@/components/Icons/ExternalLink'
import { EyeIcon } from '@/components/Icons/Eye'
import { EyeSlashIcon } from '@/components/Icons/EyeSlash'
import QrCodeIcon from '@/components/Icons/QrCode'
import { TrashIcon } from '@/components/Icons/Trash'
import ZapIcon from '@/components/Icons/Zap'
import { EXPORT_FORMAT, PAGE_STATUS, QUERY_PARAM, ROUTES, SITE_CONFIG } from '@/constants/app'
import { THEMES } from '@/constants/themes'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'
import { daysLeft, formatDate } from '@/utils/format'
import { cn } from '@/utils/tailwind'
import { toast } from '@/utils/toast'

export const PAGE_STATUS_BADGE: Record<PAGE_STATUS, string> = {
  [PAGE_STATUS.ACTIVE]: 'badge-success',
  [PAGE_STATUS.HIDDEN]: 'badge-ghost',
  [PAGE_STATUS.EXPIRED]: 'badge-warning',
  [PAGE_STATUS.LOCKED]: 'badge-error',
}

type PageCardProps = {
  page: PageItem
  onChange: (page: PageItem) => void
  onDelete: (id: string) => void
}

const PageCard = ({ page, onChange, onDelete }: PageCardProps) => {
  const { translate } = useLanguage()
  const { open } = useModal()
  const theme = THEMES[page.theme]
  const url = `${SITE_CONFIG.url}${ROUTES.invitation(page.slug)}`
  const remaining = daysLeft(page.expiresAt)
  const isHidden = page.status === PAGE_STATUS.HIDDEN

  const onDownload = (format: EXPORT_FORMAT) => {
    // Real flow: export job (Playwright on the server) → file link
    toast({ message: translate('myPages.downloadQueued', { format: format.toUpperCase() }) })
  }

  return (
    <div className='card border border-base-300 bg-base-100 shadow-sm'>
      <figure className='relative h-28' style={{ background: `linear-gradient(135deg, ${theme.colors.background}, ${theme.colors.primary})` }}>
        <span className='text-2xl' style={{ fontFamily: theme.fonts.names, color: theme.colors.text }}>
          {page.title}
        </span>
        <span className={cn('badge badge-sm absolute right-3 top-3', PAGE_STATUS_BADGE[page.status])}>{translate(`pageStatus.${page.status}`)}</span>
      </figure>
      <div className='card-body gap-2 p-4'>
        <div className='flex items-center justify-between gap-2'>
          <h2 className='card-title truncate text-base'>{page.title}</h2>
          <ThemeSwatch theme={page.theme} />
        </div>
        <p className='truncate text-xs text-base-content/60'>{url}</p>
        <div className='flex flex-wrap gap-x-4 gap-y-1 text-xs text-base-content/70'>
          <span>{translate('myPages.views', { count: page.views })}</span>
          <span>{translate('myPages.rsvp', { count: page.rsvpCount })}</span>
          <span className={cn(remaining !== null && remaining <= 3 && 'font-semibold text-warning')}>
            {page.expiresAt === null
              ? translate('studio.publish.unlimited')
              : remaining !== null && remaining >= 0
                ? translate('myPages.expiresIn', { days: remaining, date: formatDate(page.expiresAt) })
                : translate('myPages.expiredOn', { date: formatDate(page.expiresAt) })}
          </span>
        </div>
        <div className='card-actions mt-2 items-center'>
          <Link href={`${ROUTES.studio}?${QUERY_PARAM.session}=${page.sessionId}`} className='btn btn-primary btn-sm'>
            <EditIcon className='size-4' />
            {translate('myPages.continueEdit')}
          </Link>
          <Link
            href={ROUTES.invitation(page.slug)}
            target='_blank'
            className='btn btn-ghost btn-sm btn-square'
            aria-label={translate('myPages.view')}
          >
            <ExternalLinkIcon className='size-4' />
          </Link>
          <button
            className='btn btn-ghost btn-sm btn-square'
            aria-label={translate('common.qrCode')}
            onClick={() => open({ title: page.title, children: <QrCode value={url} className='py-2' /> })}
          >
            <QrCodeIcon className='size-4' />
          </button>
          <div className='dropdown dropdown-end dropdown-top ml-auto'>
            <button tabIndex={0} className='btn btn-ghost btn-sm'>
              {translate('common.more')}
            </button>
            <ul tabIndex={-1} className='menu dropdown-content z-10 w-52 rounded-box bg-base-100 p-2 shadow-lg'>
              <li>
                <button
                  onClick={() =>
                    open({
                      title: translate('myPages.extend.title', { title: page.title }),
                      children: <ExtendDialog page={page} onExtended={(expiresAt) => onChange({ ...page, expiresAt, status: PAGE_STATUS.ACTIVE })} />,
                    })
                  }
                >
                  <ZapIcon className='size-4' />
                  {translate('myPages.extend.button')}
                </button>
              </li>
              {Object.values(EXPORT_FORMAT).map((format) => (
                <li key={format}>
                  <button onClick={() => onDownload(format)}>
                    <DownloadIcon className='size-4' />
                    {translate('myPages.download', { format: format.toUpperCase() })}
                  </button>
                </li>
              ))}
              {page.status !== PAGE_STATUS.EXPIRED && page.status !== PAGE_STATUS.LOCKED && (
                <li>
                  <button onClick={() => onChange({ ...page, status: isHidden ? PAGE_STATUS.ACTIVE : PAGE_STATUS.HIDDEN })}>
                    {isHidden ? <EyeIcon className='size-4' /> : <EyeSlashIcon className='size-4' />}
                    {translate(isHidden ? 'myPages.show' : 'myPages.hide')}
                  </button>
                </li>
              )}
              <li>
                <button
                  className='text-error'
                  onClick={() =>
                    open({
                      title: translate('myPages.delete.title'),
                      children: (
                        <ConfirmDialog
                          isDanger
                          message={translate('myPages.delete.message', { title: page.title })}
                          onConfirm={() => onDelete(page.id)}
                        />
                      ),
                    })
                  }
                >
                  <TrashIcon className='size-4' />
                  {translate('common.delete')}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageCard
