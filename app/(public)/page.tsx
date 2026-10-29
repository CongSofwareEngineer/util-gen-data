'use client'

import Link from 'next/link'

import Invitation from '@/components/Invitation'
import ThemePicker from '@/components/Studio/ThemePicker'
import { TIER_BADGE, getSelectableModels } from '@/components/Studio/ModelSelect'
import { DEMO_SLUG_PREFIX, HOME_SECTION, MIN_TOPUP, PRODUCT_TYPE, ROUTES, THEME_KEY, TOPUP_AMOUNTS } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import { MOCK_MODELS, MOCK_WEDDING } from '@/mock'
import { formatVnd } from '@/utils/format'
import { cn } from '@/utils/tailwind'

const STEPS = ['describe', 'build', 'edit', 'publish'] as const
const FEATURES = ['rsvp', 'wishes', 'countdown', 'album', 'qr', 'export', 'expiry', 'privacy'] as const
const FAQ_KEYS = ['account', 'cost', 'expiry', 'edit', 'images', 'refund'] as const
const PRODUCTS = [
  { type: PRODUCT_TYPE.WEDDING, isAvailable: true },
  { type: PRODUCT_TYPE.PROFILE, isAvailable: false },
  { type: PRODUCT_TYPE.DASHBOARD, isAvailable: false },
]

const HomePage = () => {
  const { translate } = useLanguage()
  const models = getSelectableModels(MOCK_MODELS)

  return (
    <>
      {/* Hero */}
      <section className='hero bg-gradient-to-b from-base-200 to-base-100'>
        <div className='hero-content w-full max-w-6xl flex-col gap-10 px-4 py-12 lg:flex-row lg:py-20'>
          <div className='flex-1 text-center lg:text-left'>
            <span className='badge badge-primary badge-soft'>{translate('home.hero.badge')}</span>
            <h1 className='mt-4 font-display text-4xl font-bold leading-tight md:text-5xl'>{translate('home.hero.title')}</h1>
            <p className='mt-4 text-lg text-base-content/70'>{translate('home.hero.subtitle')}</p>
            <div className='mt-8 flex flex-wrap justify-center gap-3 lg:justify-start'>
              <Link href={ROUTES.studio} className='btn btn-primary btn-lg'>
                {translate('home.hero.cta')}
              </Link>
              <Link href={`#${HOME_SECTION.themes}`} className='btn btn-ghost btn-lg'>
                {translate('home.hero.secondary')}
              </Link>
            </div>
            <p className='mt-4 text-sm text-base-content/60'>{translate('home.hero.note')}</p>
          </div>
          <div className='mockup-phone shrink-0 border-neutral'>
            <div className='mockup-phone-camera' />
            <div className='mockup-phone-display h-[600px] w-[300px] overflow-y-auto'>
              <Invitation data={MOCK_WEDDING} isPreview />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className='mx-auto max-w-6xl px-4 py-16'>
        <h2 className='text-center font-display text-3xl font-bold'>{translate('home.steps.title')}</h2>
        <ul className='steps steps-vertical mt-10 w-full md:steps-horizontal'>
          {STEPS.map((step) => (
            <li key={step} className='step step-primary'>
              <div className='px-2 text-left md:text-center'>
                <p className='font-semibold'>{translate(`home.steps.${step}.title`)}</p>
                <p className='text-sm text-base-content/60'>{translate(`home.steps.${step}.desc`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Themes */}
      <section id={HOME_SECTION.themes} className='scroll-mt-20 bg-base-200 py-16'>
        <div className='mx-auto max-w-6xl px-4'>
          <h2 className='text-center font-display text-3xl font-bold'>{translate('home.themes.title')}</h2>
          <p className='mx-auto mt-2 max-w-2xl text-center text-base-content/60'>{translate('home.themes.subtitle')}</p>
          <ThemePicker
            className='mt-10 md:grid-cols-4'
            onChange={(theme: THEME_KEY) => window.open(ROUTES.invitation(`${DEMO_SLUG_PREFIX}${theme}`), '_blank')}
          />
        </div>
      </section>

      {/* Products */}
      <section className='mx-auto max-w-6xl px-4 py-16'>
        <h2 className='text-center font-display text-3xl font-bold'>{translate('home.products.title')}</h2>
        <div className='mt-10 grid gap-4 md:grid-cols-3'>
          {PRODUCTS.map(({ type, isAvailable }) => (
            <div key={type} className={cn('card border border-base-300 bg-base-100', !isAvailable && 'opacity-80')}>
              <div className='card-body'>
                <div className='flex items-center justify-between'>
                  <h3 className='card-title'>{translate(`product.${type}.name`)}</h3>
                  <span className={cn('badge badge-sm', isAvailable ? 'badge-success' : 'badge-ghost')}>
                    {translate(isAvailable ? 'home.products.available' : 'common.comingSoon')}
                  </span>
                </div>
                <p className='text-sm text-base-content/70'>{translate(`product.${type}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-10 grid grid-cols-2 gap-3 md:grid-cols-4'>
          {FEATURES.map((feature) => (
            <div key={feature} className='rounded-box bg-base-200 p-4'>
              <p className='font-semibold'>{translate(`home.features.${feature}.title`)}</p>
              <p className='mt-1 text-xs text-base-content/60'>{translate(`home.features.${feature}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id={HOME_SECTION.pricing} className='scroll-mt-20 bg-base-200 py-16'>
        <div className='mx-auto max-w-6xl px-4'>
          <h2 className='text-center font-display text-3xl font-bold'>{translate('home.pricing.title')}</h2>
          <p className='mx-auto mt-2 max-w-2xl text-center text-base-content/60'>{translate('home.pricing.subtitle')}</p>
          <div className='mt-10 grid gap-4 md:grid-cols-3'>
            {models.map((model) => (
              <div key={model.id} className={cn('card border bg-base-100', model.isDefault ? 'border-primary shadow-lg' : 'border-base-300')}>
                <div className='card-body'>
                  <div className='flex items-center gap-2'>
                    <h3 className='card-title'>{model.name}</h3>
                    <span className={cn('badge badge-sm badge-soft', TIER_BADGE[model.tier])}>{translate(`studio.model.tier.${model.tier}`)}</span>
                  </div>
                  <p className='mt-2 text-3xl font-bold'>~{formatVnd(model.estimatePerMessage)}</p>
                  <p className='text-sm text-base-content/60'>{translate('home.pricing.perMessage')}</p>
                  <ul className='mt-3 space-y-1 text-sm'>
                    <li>{translate('home.pricing.input', { price: formatVnd(model.inputPrice) })}</li>
                    <li>{translate('home.pricing.output', { price: formatVnd(model.outputPrice) })}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-8 flex flex-col items-center gap-3 text-center'>
            <p className='text-sm text-base-content/70'>{translate('home.pricing.topup', { min: formatVnd(MIN_TOPUP) })}</p>
            <div className='flex flex-wrap justify-center gap-2'>
              {TOPUP_AMOUNTS.map((amount) => (
                <span key={amount} className='badge badge-lg badge-outline'>
                  {formatVnd(amount)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id={HOME_SECTION.faq} className='mx-auto max-w-3xl scroll-mt-20 px-4 py-16'>
        <h2 className='text-center font-display text-3xl font-bold'>{translate('home.faq.title')}</h2>
        <div className='mt-8 flex flex-col gap-2'>
          {FAQ_KEYS.map((key, index) => (
            <div key={key} className='collapse-plus collapse border border-base-300 bg-base-100'>
              <input type='radio' name='home-faq' defaultChecked={index === 0} aria-label={translate(`home.faq.${key}.q`)} />
              <div className='collapse-title font-semibold'>{translate(`home.faq.${key}.q`)}</div>
              <div className='collapse-content text-sm text-base-content/70'>{translate(`home.faq.${key}.a`)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className='px-4 pb-16'>
        <div className='mx-auto max-w-6xl rounded-box bg-primary px-6 py-12 text-center text-primary-content'>
          <h2 className='font-display text-3xl font-bold'>{translate('home.cta.title')}</h2>
          <p className='mt-2 opacity-90'>{translate('home.cta.subtitle')}</p>
          <Link href={ROUTES.studio} className='btn btn-lg mt-6 border-none bg-base-100 text-primary'>
            {translate('home.hero.cta')}
          </Link>
        </div>
      </section>
    </>
  )
}

export default HomePage
