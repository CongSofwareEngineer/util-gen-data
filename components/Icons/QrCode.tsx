import { SVGProps } from 'react'

import { cn } from '@/utils/tailwind'

type IconProps = SVGProps<SVGSVGElement>

const QrCodeIcon = ({ ...props }: IconProps) => {
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
      <rect x='3' y='3' width='7' height='7' rx='1' />
      <rect x='14' y='3' width='7' height='7' rx='1' />
      <rect x='3' y='14' width='7' height='7' rx='1' />
      <path d='M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default QrCodeIcon
