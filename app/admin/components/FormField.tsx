import { ReactNode } from 'react'

// Label + control used by the admin dialogs
const FormField = ({ label, hint, children }: { label: ReactNode; hint?: ReactNode; children: ReactNode }) => (
  <label className='flex flex-col gap-1'>
    <span className='label text-sm'>{label}</span>
    {children}
    {hint && <span className='text-xs text-base-content/60'>{hint}</span>}
  </label>
)

export default FormField
