'use client'

import type { Person, WeddingData, WeddingEvent } from '@/types'

import { ReactNode, useState } from 'react'
import dayjs from 'dayjs'

import { XMarkIcon } from '@/components/Icons/XMark'
import { INPUT_DATE_TIME_FORMAT, SOCIAL_FIELD } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useStudio from '@/hooks/useStudio'
import { cn } from '@/utils/tailwind'
import { validateSocialUrl } from '@/utils/validate'

const toInput = (value: string) => (value ? dayjs(value).format(INPUT_DATE_TIME_FORMAT) : '')
const fromInput = (value: string) => (value ? dayjs(value).format() : '')

const Group = ({ title, children }: { title: string; children: ReactNode }) => (
  <fieldset className='fieldset rounded-box border border-base-300 p-4'>
    <legend className='fieldset-legend'>{title}</legend>
    {children}
  </fieldset>
)

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className='flex flex-col gap-1'>
    <span className='label text-xs'>{label}</span>
    {children}
  </label>
)

const PERSON_KEYS = ['groom', 'bride'] as const
const EVENT_KEYS = ['ceremony', 'reception'] as const
const SECTION_TOGGLES = ['showCountdown', 'showRsvp', 'showWishes'] as const

// Manual edit of the page JSON — same data the AI fills in from the chat
const EditForm = () => {
  const { translate } = useLanguage()
  const { data, setData } = useStudio()
  const [socialErrors, setSocialErrors] = useState<Partial<Record<SOCIAL_FIELD, string>>>({})

  const setPerson = (key: (typeof PERSON_KEYS)[number], value: Partial<Person>) =>
    setData({ [key]: { ...data[key], ...value } } as Partial<WeddingData>)
  const setEvent = (key: (typeof EVENT_KEYS)[number], value: Partial<WeddingEvent>) =>
    setData({ [key]: { ...data[key], ...value } } as Partial<WeddingData>)

  const setSocial = (field: SOCIAL_FIELD, value: string) => {
    const error = validateSocialUrl(field, value)

    setSocialErrors((prev) => ({ ...prev, [field]: error ?? undefined }))
    if (!error) setData({ social: { ...data.social, [field]: value } })
  }

  return (
    <div className='flex flex-col gap-4 overflow-y-auto p-4'>
      {PERSON_KEYS.map((key) => (
        <Group key={key} title={translate(`studio.form.${key}`)}>
          <Field label={translate('studio.form.name')}>
            <input className='input input-sm w-full' value={data[key].name} onChange={(event) => setPerson(key, { name: event.target.value })} />
          </Field>
          <div className='grid grid-cols-2 gap-2'>
            <Field label={translate('studio.form.father')}>
              <input
                className='input input-sm w-full'
                value={data[key].father ?? ''}
                onChange={(event) => setPerson(key, { father: event.target.value })}
              />
            </Field>
            <Field label={translate('studio.form.mother')}>
              <input
                className='input input-sm w-full'
                value={data[key].mother ?? ''}
                onChange={(event) => setPerson(key, { mother: event.target.value })}
              />
            </Field>
          </div>
        </Group>
      ))}

      <Group title={translate('studio.form.general')}>
        <Field label={translate('studio.form.weddingDate')}>
          <input
            type='datetime-local'
            className='input input-sm w-full'
            value={toInput(data.weddingDate)}
            onChange={(event) => setData({ weddingDate: fromInput(event.target.value) })}
          />
        </Field>
        <Field label={translate('studio.form.invitation')}>
          <textarea
            className='textarea textarea-sm w-full'
            rows={3}
            value={data.invitation}
            onChange={(event) => setData({ invitation: event.target.value })}
          />
        </Field>
      </Group>

      {EVENT_KEYS.map((key) => (
        <Group key={key} title={translate(`invitation.${key}`)}>
          <Field label={translate('studio.form.time')}>
            <input
              type='datetime-local'
              className='input input-sm w-full'
              value={toInput(data[key].time)}
              onChange={(event) => setEvent(key, { time: fromInput(event.target.value) })}
            />
          </Field>
          <Field label={translate('studio.form.place')}>
            <input className='input input-sm w-full' value={data[key].place} onChange={(event) => setEvent(key, { place: event.target.value })} />
          </Field>
          <Field label={translate('studio.form.address')}>
            <input className='input input-sm w-full' value={data[key].address} onChange={(event) => setEvent(key, { address: event.target.value })} />
          </Field>
          <Field label={translate('studio.form.mapUrl')}>
            <input
              type='url'
              className='input input-sm w-full'
              value={data[key].mapUrl ?? ''}
              onChange={(event) => setEvent(key, { mapUrl: event.target.value })}
            />
          </Field>
        </Group>
      ))}

      <Group title={translate('studio.form.images')}>
        <p className='text-xs text-base-content/60'>{translate('studio.form.imagesHint')}</p>
        <div className='grid grid-cols-4 gap-2'>
          {data.album.map((url) => (
            <div key={url} className='indicator w-full'>
              <button
                className='indicator-item badge badge-neutral badge-xs size-5 p-0'
                aria-label={translate('common.remove')}
                onClick={() => setData({ album: data.album.filter((item) => item !== url) })}
              >
                <XMarkIcon className='size-3' />
              </button>
              <button
                onClick={() => setData({ coverImage: url })}
                className={cn('aspect-square w-full overflow-hidden rounded-lg ring-offset-2', data.coverImage === url && 'ring-2 ring-primary')}
                title={translate('studio.form.setCover')}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={translate('studio.chat.attachment')} className='size-full object-cover' />
              </button>
            </div>
          ))}
        </div>
      </Group>

      <Group title={translate('studio.form.sections')}>
        {SECTION_TOGGLES.map((key) => (
          <label key={key} className='label cursor-pointer justify-between py-1 text-sm text-base-content'>
            {translate(`studio.form.${key}`)}
            <input
              type='checkbox'
              className='toggle toggle-primary toggle-sm'
              checked={data[key]}
              onChange={(event) => setData({ [key]: event.target.checked })}
            />
          </label>
        ))}
      </Group>

      <Group title={translate('studio.form.social')}>
        <p className='text-xs text-base-content/60'>{translate('studio.form.socialHint')}</p>
        {Object.values(SOCIAL_FIELD).map((field) => (
          <Field key={field} label={translate(`social.${field}`)}>
            <input
              type='url'
              className={cn('input input-sm w-full', socialErrors[field] && 'input-error')}
              defaultValue={data.social[field] ?? ''}
              placeholder={translate('studio.form.urlPlaceholder')}
              onBlur={(event) => setSocial(field, event.target.value.trim())}
            />
            {socialErrors[field] && <span className='text-xs text-error'>{translate(socialErrors[field])}</span>}
          </Field>
        ))}
      </Group>
    </div>
  )
}

export default EditForm
