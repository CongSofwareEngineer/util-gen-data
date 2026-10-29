import { ReactNode } from 'react'

// Title row of a dashboard/admin page
const PageHeader = ({ title, description, actions }: { title: ReactNode; description?: ReactNode; actions?: ReactNode }) => {
  return (
    <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
      <div>
        <h1 className='text-2xl font-bold'>{title}</h1>
        {description && <p className='mt-1 text-sm text-base-content/60'>{description}</p>}
      </div>
      {actions && <div className='flex flex-wrap gap-2'>{actions}</div>}
    </div>
  )
}

export default PageHeader
