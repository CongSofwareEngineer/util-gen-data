'use client'

import { useState } from 'react'

import ChatPanel from '@/components/Studio/ChatPanel'
import EditForm from '@/components/Studio/EditForm'
import PreviewPanel from '@/components/Studio/PreviewPanel'
import ThemePicker from '@/components/Studio/ThemePicker'
import { STUDIO_MOBILE_VIEW as MOBILE_VIEW, STUDIO_TAB as EDITOR_TAB } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useStudio from '@/hooks/useStudio'
import { cn } from '@/utils/tailwind'

// Studio: chat / form / theme on the left, live preview on the right (switch views on mobile)
const StudioPage = () => {
  const { translate } = useLanguage()
  const { data, setTheme } = useStudio()
  const [tab, setTab] = useState(EDITOR_TAB.CHAT)
  const [mobileView, setMobileView] = useState(MOBILE_VIEW.EDIT)

  return (
    <div className='flex min-h-0 flex-1 flex-col lg:flex-row'>
      {/* Mobile switch */}
      <div role='tablist' className='tabs tabs-box m-2 lg:hidden'>
        {Object.values(MOBILE_VIEW).map((view) => (
          <button key={view} role='tab' className={cn('tab flex-1', mobileView === view && 'tab-active')} onClick={() => setMobileView(view)}>
            {translate(`studio.mobile.${view}`)}
          </button>
        ))}
      </div>

      <section
        className={cn(
          'flex min-h-0 flex-1 flex-col border-base-300 bg-base-100 lg:w-[440px] lg:flex-none lg:border-r',
          mobileView !== MOBILE_VIEW.EDIT && 'hidden lg:flex'
        )}
      >
        <div role='tablist' className='tabs tabs-border px-2'>
          {Object.values(EDITOR_TAB).map((value) => (
            <button key={value} role='tab' className={cn('tab', tab === value && 'tab-active')} onClick={() => setTab(value)}>
              {translate(`studio.tabs.${value}`)}
            </button>
          ))}
        </div>
        {tab === EDITOR_TAB.CHAT && <ChatPanel />}
        {tab === EDITOR_TAB.FORM && <EditForm />}
        {tab === EDITOR_TAB.THEME && (
          <div className='overflow-y-auto p-4'>
            <p className='mb-3 text-sm text-base-content/60'>{translate('studio.themeHint')}</p>
            <ThemePicker value={data.theme} onChange={setTheme} />
          </div>
        )}
      </section>

      <section className={cn('flex min-h-0 flex-1 flex-col', mobileView !== MOBILE_VIEW.PREVIEW && 'hidden lg:flex')}>
        <PreviewPanel />
      </section>
    </div>
  )
}

export default StudioPage
