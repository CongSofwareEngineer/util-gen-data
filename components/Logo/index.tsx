'use client'

import Link from 'next/link'

import HeartIcon from '@/components/Icons/Heart'
import { ROUTES } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import { cn } from '@/utils/tailwind'

// Text logo (brand name is not decided yet: `site.name` in the translation files)
const Logo = ({ className }: { className?: string }) => {
  const { translate } = useLanguage()

  return (
    <Link href={ROUTES.home} className={cn('flex items-center gap-2 text-lg font-bold', className)}>
      <span className='flex size-8 items-center justify-center rounded-full bg-primary text-primary-content'>
        <HeartIcon className='size-4' fill='currentColor' stroke='none' />
      </span>
      <span className='font-display'>{translate('site.name')}</span>
    </Link>
  )
}

export default Logo
