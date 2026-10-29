import { ReactNode } from 'react'

// Centered card used by the login / register / change-password pages
const AuthCard = ({
  title,
  description,
  children,
  footer,
}: {
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  footer?: ReactNode
}) => {
  return (
    <div className='flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-base-200 px-4 py-10'>
      <div className='card w-full max-w-md border border-base-300 bg-base-100 shadow-xl'>
        <div className='card-body gap-4'>
          <div>
            <h1 className='text-2xl font-bold'>{title}</h1>
            {description && <p className='mt-1 text-sm text-base-content/60'>{description}</p>}
          </div>
          {children}
          {footer && <div className='text-center text-sm'>{footer}</div>}
        </div>
      </div>
    </div>
  )
}

export default AuthCard
