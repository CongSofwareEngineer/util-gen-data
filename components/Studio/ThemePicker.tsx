'use client'

import { CheckIcon } from '@/components/Icons/Check'
import { THEME_KEY } from '@/constants/app'
import { THEME_LIST } from '@/constants/themes'
import useLanguage from '@/hooks/useLanguage'
import { cn } from '@/utils/tailwind'

type ThemePickerProps = {
  value?: THEME_KEY
  onChange?: (theme: THEME_KEY) => void
  className?: string
}

// The 7 themes as mini cards painted with their own tokens (used in the studio and on the landing page)
const ThemePicker = ({ value, onChange, className }: ThemePickerProps) => {
  const { translate } = useLanguage()

  return (
    <div className={cn('grid grid-cols-2 gap-3', className)}>
      {THEME_LIST.map((theme) => {
        const isActive = theme.key === value

        return (
          <button
            key={theme.key}
            type='button'
            onClick={() => onChange?.(theme.key)}
            className={cn(
              'relative flex flex-col items-start gap-1 overflow-hidden rounded-box border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md',
              isActive ? 'border-primary ring-2 ring-primary' : 'border-base-300'
            )}
            style={{ background: theme.colors.background, color: theme.colors.text }}
            aria-pressed={isActive}
          >
            {isActive && (
              <span className='absolute right-2 top-2 rounded-full bg-primary p-0.5 text-primary-content'>
                <CheckIcon className='size-3.5' strokeWidth={3} />
              </span>
            )}
            <span className='text-xl' style={{ fontFamily: theme.fonts.names, color: theme.colors.primary }}>
              {translate(`themes.${theme.key}.name`)}
            </span>
            <span className='line-clamp-2 text-xs opacity-80' style={{ fontFamily: theme.fonts.body }}>
              {translate(`themes.${theme.key}.mood`)}
            </span>
            <span className='mt-2 flex gap-1'>
              {[theme.colors.primary, theme.colors.accent, theme.colors.muted].map((color) => (
                <span key={color} className='size-3 rounded-full' style={{ background: color }} />
              ))}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default ThemePicker
