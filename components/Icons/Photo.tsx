import { SVGProps } from 'react'

import { cn } from '@/utils/tailwind'

type IconProps = SVGProps<SVGSVGElement>

const PhotoIcon = ({ ...props }: IconProps) => {
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
      <rect x='3' y='4' width='18' height='16' rx='2' />
      <circle cx='8.5' cy='9.5' r='1.5' />
      <path d='m21 16-5-5-9 9' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default PhotoIcon
