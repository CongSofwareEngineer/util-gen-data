'use client'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { COUNTDOWN_TICK } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'

const UNITS = ['days', 'hours', 'minutes', 'seconds'] as const

const getParts = (target: string) => {
  const diff = Math.max(0, dayjs(target).diff(dayjs(), 'second'))

  return {
    days: Math.floor(diff / 86400),
    hours: Math.floor((diff % 86400) / 3600),
    minutes: Math.floor((diff % 3600) / 60),
    seconds: diff % 60,
  }
}

// daisyUI `countdown` to the wedding date
const Countdown = ({ target }: { target: string }) => {
  const { translate } = useLanguage()
  const [parts, setParts] = useState<ReturnType<typeof getParts> | null>(null)

  useEffect(() => {
    const tick = () => setParts(getParts(target))

    tick()
    const timer = window.setInterval(tick, COUNTDOWN_TICK)

    return () => window.clearInterval(timer)
  }, [target])

  return (
    <div className='grid grid-flow-col justify-center gap-3 text-center'>
      {UNITS.map((unit) => (
        <div key={unit} className='inv-card flex min-w-16 flex-col p-3'>
          <span className='countdown inv-heading justify-center text-3xl'>
            <span style={{ '--value': parts?.[unit] ?? 0 } as React.CSSProperties} aria-live='polite' aria-label={`${parts?.[unit] ?? 0}`}>
              {parts?.[unit] ?? 0}
            </span>
          </span>
          <span className='inv-muted text-xs'>{translate(`invitation.countdown.${unit}`)}</span>
        </div>
      ))}
    </div>
  )
}

export default Countdown
