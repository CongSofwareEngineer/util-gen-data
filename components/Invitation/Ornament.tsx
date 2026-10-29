import HeartIcon from '@/components/Icons/Heart'
import { THEME_KEY } from '@/constants/app'
import { DOUBLE_HAPPINESS } from '@/constants/themes'

// Hand-drawn SVG decoration of each theme, laid over the cover section
const Ornament = ({ theme }: { theme: THEME_KEY }) => {
  switch (theme) {
    case THEME_KEY.CLASSIC:
      return (
        <div aria-hidden className='pointer-events-none absolute inset-3 border' style={{ borderColor: 'var(--inv-accent)' }}>
          <div className='absolute inset-1.5 border border-dashed' style={{ borderColor: 'var(--inv-accent)' }} />
          {['left-0 top-0', 'right-0 top-0 -scale-x-100', 'left-0 bottom-0 -scale-y-100', 'right-0 bottom-0 -scale-100'].map((position) => (
            <svg key={position} className={`absolute size-12 ${position}`} viewBox='0 0 48 48' fill='none'>
              <path d='M4 44 C4 20 20 4 44 4 M12 36 C14 22 22 14 36 12' stroke='var(--inv-accent)' strokeWidth='1.5' />
              <circle cx='10' cy='10' r='2.5' fill='var(--inv-accent)' />
            </svg>
          ))}
        </div>
      )

    case THEME_KEY.CHINESE:
      return (
        <div aria-hidden className='pointer-events-none absolute inset-x-0 top-6 flex justify-center'>
          <span
            className='flex size-20 items-center justify-center rounded-full border-2 text-5xl font-black'
            style={{ borderColor: 'var(--inv-primary)', color: 'var(--inv-primary)' }}
          >
            {DOUBLE_HAPPINESS}
          </span>
        </div>
      )

    case THEME_KEY.TECH:
      return <div aria-hidden className='inv-tech-grid pointer-events-none absolute inset-0 opacity-60' />

    case THEME_KEY.FUTURE:
      return (
        <div aria-hidden className='pointer-events-none absolute inset-0 overflow-hidden'>
          <div className='absolute -left-16 top-10 size-56 rounded-full blur-3xl' style={{ background: 'var(--inv-primary)', opacity: 0.45 }} />
          <div className='absolute -right-10 bottom-10 size-48 rounded-full blur-3xl' style={{ background: 'var(--inv-accent)', opacity: 0.4 }} />
        </div>
      )

    case THEME_KEY.CUTE:
      return (
        <div aria-hidden className='pointer-events-none absolute inset-0'>
          {[
            'left-6 top-8 size-7 -rotate-12',
            'right-8 top-16 size-5 rotate-12',
            'left-10 bottom-24 size-5 rotate-6',
            'right-6 bottom-12 size-8 -rotate-6',
          ].map((position) => (
            <HeartIcon key={position} className={`absolute ${position}`} fill='var(--inv-primary)' stroke='none' />
          ))}
        </div>
      )

    case THEME_KEY.WESTERN:
      return (
        <svg aria-hidden className='pointer-events-none absolute left-1/2 top-4 h-16 w-48 -translate-x-1/2' viewBox='0 0 200 60' fill='none'>
          <path d='M10 50 Q100 0 190 50' stroke='var(--inv-primary)' strokeWidth='1.5' />
          {[30, 60, 100, 140, 170].map((x, index) => (
            <ellipse
              key={x}
              cx={x}
              cy={index % 2 ? 26 : 36}
              rx='8'
              ry='4'
              fill='var(--inv-primary)'
              opacity='0.7'
              transform={`rotate(${index % 2 ? -30 : 30} ${x} 30)`}
            />
          ))}
        </svg>
      )

    case THEME_KEY.RUSTIC:
      return (
        <>
          <div aria-hidden className='inv-kraft pointer-events-none absolute inset-0 opacity-40' />
          <svg aria-hidden className='pointer-events-none absolute bottom-4 left-4 h-24 w-10' viewBox='0 0 40 100' fill='none'>
            <path d='M20 100 V20' stroke='var(--inv-accent)' strokeWidth='2' />
            {[25, 40, 55, 70].map((y) => (
              <g key={y}>
                <ellipse cx='13' cy={y} rx='6' ry='3' fill='var(--inv-accent)' transform={`rotate(-35 13 ${y})`} />
                <ellipse cx='27' cy={y + 6} rx='6' ry='3' fill='var(--inv-accent)' transform={`rotate(35 27 ${y + 6})`} />
              </g>
            ))}
          </svg>
        </>
      )

    default:
      return null
  }
}

export default Ornament
