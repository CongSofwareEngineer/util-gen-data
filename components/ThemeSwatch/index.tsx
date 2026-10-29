import { THEME_KEY } from '@/constants/app'
import { THEMES } from '@/constants/themes'
import { cn } from '@/utils/tailwind'

// Three color dots of a theme (background, primary, accent)
const ThemeSwatch = ({ theme, className }: { theme: THEME_KEY; className?: string }) => {
  const { colors } = THEMES[theme]

  return (
    <div className={cn('flex -space-x-1.5', className)} aria-hidden>
      {[colors.background, colors.primary, colors.accent].map((color, index) => (
        <span key={index} className='size-4 rounded-full border border-base-100 shadow-sm' style={{ background: color }} />
      ))}
    </div>
  )
}

export default ThemeSwatch
