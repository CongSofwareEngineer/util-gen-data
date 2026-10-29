import { SVGProps } from 'react'

import { cn } from '@/utils/tailwind'

type IconProps = SVGProps<SVGSVGElement>

const MonitorIcon = ({ ...props }: IconProps) => {
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
      <rect x='2' y='3' width='20' height='14' rx='2' />
      <path d='M8 21h8M12 17v4' strokeLinecap='round' />
    </svg>
  )
}

export default MonitorIcon
