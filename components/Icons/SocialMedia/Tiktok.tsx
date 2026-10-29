import { SVGProps } from 'react'

import { cn } from '@/utils/tailwind'

type IconProps = SVGProps<SVGSVGElement>

const TiktokIcon = ({ ...props }: IconProps) => {
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
      <path
        d='M15 3c.4 2.4 1.9 4 4.5 4.3v3c-1.7 0-3.2-.5-4.5-1.4V15a6 6 0 1 1-6-6v3.1A2.9 2.9 0 1 0 12 15V3h3Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default TiktokIcon
