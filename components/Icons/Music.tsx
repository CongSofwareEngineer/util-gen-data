import { SVGProps } from 'react'

import { cn } from '@/utils/tailwind'

type IconProps = SVGProps<SVGSVGElement>

const MusicIcon = ({ ...props }: IconProps) => {
  return (
    <svg
      className={cn('size-6', props.className)}
      fill='none'
      stroke='currentColor'
      strokeWidth={1.5}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M9 18V5l12-2v13' strokeLinecap='round' strokeLinejoin='round' />
      <circle cx='6' cy='18' r='3' />
      <circle cx='18' cy='16' r='3' />
    </svg>
  )
}

export default MusicIcon
