'use client'

import type { WeddingData, WeddingEvent, WeddingWish } from '@/types'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'

import Countdown from './Countdown'
import Ornament from './Ornament'

import CalendarIcon from '@/components/Icons/Calendar'
import GlobeIcon from '@/components/Icons/Globe'
import HeartIcon from '@/components/Icons/Heart'
import { MapPinIcon } from '@/components/Icons/MapPin'
import MusicIcon from '@/components/Icons/Music'
import FacebookIcon from '@/components/Icons/SocialMedia/Facebook'
import InstagramIcon from '@/components/Icons/SocialMedia/Instagram'
import LinkedinIcon from '@/components/Icons/SocialMedia/Linkedin'
import TiktokIcon from '@/components/Icons/SocialMedia/Tiktok'
import ZaloIcon from '@/components/Icons/SocialMedia/Zalo'
import { RSVP_MAX_GUESTS, SOCIAL_FIELD, THEME_KEY } from '@/constants/app'
import { THEMES, themeCssVars } from '@/constants/themes'
import useLanguage from '@/hooks/useLanguage'
import { cn } from '@/utils/tailwind'
import { toast } from '@/utils/toast'

const SOCIAL_ICON: Record<SOCIAL_FIELD, (props: { className?: string }) => React.ReactNode> = {
  [SOCIAL_FIELD.FACEBOOK]: FacebookIcon,
  [SOCIAL_FIELD.TIKTOK]: TiktokIcon,
  [SOCIAL_FIELD.INSTAGRAM]: InstagramIcon,
  [SOCIAL_FIELD.ZALO]: ZaloIcon,
  [SOCIAL_FIELD.LINKEDIN]: LinkedinIcon,
  [SOCIAL_FIELD.WEBSITE]: GlobeIcon,
}

const GUEST_OPTIONS = Array.from({ length: RSVP_MAX_GUESTS }, (_, index) => index + 1)

type InvitationProps = {
  data: WeddingData
  // Inside the studio preview: forms do not submit and the report link is hidden
  isPreview?: boolean
}

const Divider = () => (
  <div className='flex items-center justify-center gap-3 py-2' aria-hidden>
    <span className='h-px w-12' style={{ background: 'var(--inv-accent)' }} />
    <HeartIcon className='size-4' fill='var(--inv-accent)' stroke='none' />
    <span className='h-px w-12' style={{ background: 'var(--inv-accent)' }} />
  </div>
)

const Section = ({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) => (
  <section className={cn('animation-fade-up px-5 py-10 @md:px-10', className)}>
    {title && <h2 className='inv-heading mb-2 text-center text-2xl @md:text-3xl'>{title}</h2>}
    {title && <Divider />}
    <div className='mt-4'>{children}</div>
  </section>
)

const EventCard = ({ title, event }: { title: string; event: WeddingEvent }) => {
  const { translate } = useLanguage()
  const time = dayjs(event.time)

  return (
    <div className='inv-card flex flex-col items-center gap-2 p-6 text-center'>
      <h3 className='inv-heading text-xl'>{title}</h3>
      <p className='text-3xl font-semibold'>{time.format('HH:mm')}</p>
      <p className='inv-muted text-sm'>
        {translate(`invitation.weekdays.${time.day()}`)}, {time.format('DD.MM.YYYY')}
      </p>
      <p className='mt-2 font-semibold'>{event.place}</p>
      <p className='inv-muted text-sm'>{event.address}</p>
      {event.mapUrl && (
        <a href={event.mapUrl} target='_blank' rel='noreferrer' className='inv-btn mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm'>
          <MapPinIcon className='size-4' />
          {translate('invitation.viewMap')}
        </a>
      )}
    </div>
  )
}

const Invitation = ({ data, isPreview = false }: InvitationProps) => {
  const { translate } = useLanguage()
  const theme = THEMES[data.theme]
  const weddingDate = dayjs(data.weddingDate)
  const [wishes, setWishes] = useState<WeddingWish[]>(data.wishes)
  const [isMusicOn, setIsMusicOn] = useState(false)
  const socials = Object.entries(data.social).filter(([, url]) => !!url) as [SOCIAL_FIELD, string][]
  const isTech = data.theme === THEME_KEY.TECH
  const isFuture = data.theme === THEME_KEY.FUTURE

  const onSubmitRsvp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isPreview) return
    event.currentTarget.reset()
    toast({ type: 'success', message: translate('invitation.rsvp.success') })
  }

  const onSubmitWish = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isPreview) return
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()

    if (!name || !message) return
    setWishes((prev) => [{ id: `${Date.now()}`, name, message, createdAt: new Date().toISOString() }, ...prev])
    event.currentTarget.reset()
  }

  return (
    <div className='inv @container relative min-h-full w-full overflow-hidden' style={themeCssVars(theme)}>
      {/* Cover */}
      <header className='relative flex min-h-[560px] flex-col items-center justify-end overflow-hidden px-6 pb-16 text-center @md:min-h-[640px]'>
        {data.coverImage && (
          <Image
            src={data.coverImage}
            alt={translate('invitation.coverAlt')}
            fill
            sizes='(max-width: 768px) 100vw, 900px'
            className='object-cover'
            priority
          />
        )}
        <div className='absolute inset-0' style={{ background: theme.coverOverlay }} />
        <Ornament theme={data.theme} />
        <div className={cn('relative z-10 flex flex-col items-center gap-3', isFuture && 'inv-glass inv-card px-8 py-6')}>
          <p className='text-xs uppercase tracking-[0.3em] text-white/90'>{translate('invitation.saveTheDate')}</p>
          <h1 className={cn('inv-names text-4xl leading-tight text-white @md:text-6xl', isTech && 'inv-caret', isFuture && 'inv-glow')}>
            {data.groom.name}
            <span className='mx-3 inline-block' style={{ color: 'var(--inv-accent)' }}>
              &amp;
            </span>
            {data.bride.name}
          </h1>
          <p className='text-lg tracking-widest text-white/90'>{weddingDate.format('DD . MM . YYYY')}</p>
        </div>
      </header>

      {/* Invitation + parents */}
      <Section title={translate('invitation.title')}>
        <div className='grid gap-6 text-center @md:grid-cols-2'>
          {[
            { label: translate('invitation.groomFamily'), person: data.groom },
            { label: translate('invitation.brideFamily'), person: data.bride },
          ].map(({ label, person }) => (
            <div key={label}>
              <p className='inv-heading text-sm uppercase tracking-widest'>{label}</p>
              {person.father && <p className='mt-1'>{translate('invitation.father', { name: person.father })}</p>}
              {person.mother && <p>{translate('invitation.mother', { name: person.mother })}</p>}
            </div>
          ))}
        </div>
        <p className='mx-auto mt-8 max-w-xl text-center text-lg italic leading-relaxed'>{data.invitation}</p>
      </Section>

      {/* Events */}
      <Section title={translate('invitation.events')}>
        <div className='grid gap-4 @md:grid-cols-2'>
          <EventCard title={translate('invitation.ceremony')} event={data.ceremony} />
          <EventCard title={translate('invitation.reception')} event={data.reception} />
        </div>
      </Section>

      {data.showCountdown && (
        <Section title={translate('invitation.countdown.title')}>
          <Countdown target={data.weddingDate} />
          <p className='inv-muted mt-4 flex items-center justify-center gap-2 text-sm'>
            <CalendarIcon className='size-4' />
            {translate(`invitation.weekdays.${weddingDate.day()}`)}, {weddingDate.format('DD/MM/YYYY')}
          </p>
        </Section>
      )}

      {data.album.length > 0 && (
        <Section title={translate('invitation.album')}>
          <div className='grid grid-cols-2 gap-2 @md:grid-cols-3'>
            {data.album.map((url, index) => (
              <div
                key={url}
                className={cn('relative aspect-square overflow-hidden', index === 0 && 'col-span-2 row-span-2 aspect-auto')}
                style={{ borderRadius: 'var(--inv-radius)' }}
              >
                <Image
                  src={url}
                  alt={translate('invitation.albumAlt', { index: index + 1 })}
                  fill
                  sizes='(max-width: 768px) 50vw, 300px'
                  className='object-cover'
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.showRsvp && (
        <Section title={translate('invitation.rsvp.title')}>
          <form onSubmit={onSubmitRsvp} className='inv-card mx-auto flex max-w-md flex-col gap-3 p-6'>
            <p className='inv-muted text-center text-sm'>{translate('invitation.rsvp.description')}</p>
            <input name='name' required placeholder={translate('invitation.rsvp.name')} className='inv-field w-full px-4 py-2.5' />
            <div className='flex gap-4'>
              {['yes', 'no'].map((value) => (
                <label key={value} className='flex cursor-pointer items-center gap-2'>
                  <input type='radio' name='attend' value={value} defaultChecked={value === 'yes'} className='accent-[var(--inv-primary)]' />
                  {translate(`invitation.rsvp.${value}`)}
                </label>
              ))}
            </div>
            <select name='guests' className='inv-field w-full px-4 py-2.5' defaultValue={1} aria-label={translate('invitation.rsvp.guests')}>
              {GUEST_OPTIONS.map((count) => (
                <option key={count} value={count}>
                  {translate('invitation.rsvp.guestCount', { count })}
                </option>
              ))}
            </select>
            <button type='submit' className='inv-btn px-4 py-3 font-semibold'>
              {translate('invitation.rsvp.submit')}
            </button>
          </form>
        </Section>
      )}

      {data.showWishes && (
        <Section title={translate('invitation.wishes.title')}>
          <form onSubmit={onSubmitWish} className='mx-auto flex max-w-md flex-col gap-3'>
            <input name='name' required placeholder={translate('invitation.wishes.name')} className='inv-field w-full px-4 py-2.5' />
            <textarea
              name='message'
              required
              rows={3}
              placeholder={translate('invitation.wishes.message')}
              className='inv-field w-full px-4 py-2.5'
            />
            <button type='submit' className='inv-btn px-4 py-3 font-semibold'>
              {translate('invitation.wishes.submit')}
            </button>
          </form>
          <ul className='mx-auto mt-6 flex max-w-md flex-col gap-3'>
            {wishes.map((wish) => (
              <li key={wish.id} className='inv-card p-4'>
                <p className='font-semibold'>{wish.name}</p>
                <p className='inv-muted text-sm'>{wish.message}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <footer className='flex flex-col items-center gap-4 px-6 pb-12 pt-4 text-center'>
        <Divider />
        <p className='inv-names text-2xl'>{translate('invitation.thanks')}</p>
        {socials.length > 0 && (
          <div className='flex gap-3'>
            {socials.map(([field, url]) => {
              const Icon = SOCIAL_ICON[field]

              return (
                <a key={field} href={url} target='_blank' rel='noreferrer' aria-label={translate(`social.${field}`)} className='inv-card p-2.5'>
                  <Icon className='size-5' />
                </a>
              )
            })}
          </div>
        )}
      </footer>

      {data.music && (
        <button
          type='button'
          onClick={() => setIsMusicOn((value) => !value)}
          aria-label={translate(isMusicOn ? 'invitation.musicOff' : 'invitation.musicOn')}
          className={cn('inv-btn no-print fixed bottom-5 left-5 z-20 p-3 shadow-lg', isMusicOn && 'animate-spin [animation-duration:4s]')}
        >
          <MusicIcon className='size-5' />
        </button>
      )}
    </div>
  )
}

export default Invitation
