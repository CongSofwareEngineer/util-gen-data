'use client'

import Invitation from '@/components/Invitation'
import PublishDialog from '@/components/Studio/PublishDialog'
import MonitorIcon from '@/components/Icons/Monitor'
import SmartPhoneIcon from '@/components/Icons/Home/SmartPhone'
import { PREVIEW_DEVICE, ROUTES, SITE_CONFIG } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'
import useStudio from '@/hooks/useStudio'
import { MOCK_PAGES } from '@/mock'
import { cn } from '@/utils/tailwind'

const DEVICES = [
  { value: PREVIEW_DEVICE.MOBILE, icon: SmartPhoneIcon },
  { value: PREVIEW_DEVICE.DESKTOP, icon: MonitorIcon },
]

// Live preview of the page JSON in a phone or browser frame (daisyUI mockup-*)
const PreviewPanel = () => {
  const { translate } = useLanguage()
  const { open } = useModal()
  const { data, device, setDevice } = useStudio()

  return (
    <div className='flex min-h-0 flex-1 flex-col bg-base-200'>
      <div className='flex items-center gap-2 border-b border-base-300 bg-base-100 px-3 py-2'>
        <div className='join'>
          {DEVICES.map(({ value, icon: Icon }) => (
            <button
              key={value}
              className={cn('btn btn-sm join-item', device === value && 'btn-active')}
              onClick={() => setDevice(value)}
              aria-label={translate(`studio.preview.${value}`)}
              title={translate(`studio.preview.${value}`)}
            >
              <Icon className='size-4' />
            </button>
          ))}
        </div>
        <span className='badge badge-ghost hidden sm:inline-flex'>{translate(`themes.${data.theme}.name`)}</span>
        <div className='flex-1' />
        <button
          className='btn btn-primary btn-sm'
          onClick={() => open({ title: translate('studio.publish.title'), children: <PublishDialog />, classNames: { container: 'sm:max-w-xl' } })}
        >
          {translate('studio.publish.button')}
        </button>
      </div>

      <div className='flex flex-1 justify-center overflow-auto p-4 lg:p-8'>
        {device === PREVIEW_DEVICE.MOBILE ? (
          <div className='mockup-phone h-fit shrink-0 border-neutral'>
            <div className='mockup-phone-camera' />
            <div className='mockup-phone-display h-[700px] w-[340px] overflow-y-auto bg-base-100'>
              <Invitation data={data} isPreview />
            </div>
          </div>
        ) : (
          <div className='mockup-browser h-fit w-full max-w-5xl border border-base-300 bg-base-100'>
            <div className='mockup-browser-toolbar'>
              <div className='input text-xs'>{`${SITE_CONFIG.url}${ROUTES.invitation(MOCK_PAGES[0].slug)}`}</div>
            </div>
            <div className='h-[70dvh] overflow-y-auto border-t border-base-300'>
              <Invitation data={data} isPreview />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PreviewPanel
