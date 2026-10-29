'use client'

import { useEffect } from 'react'

import { cn } from '@/utils/tailwind'
import { Toast as ToastItemType, toast as toastStore } from '@/zustand/toast'

const ALERT_CLASS: Record<NonNullable<ToastItemType['type']>, string> = {
  default: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
}

const ToastItem = ({ item }: { item: ToastItemType }) => {
  const removeToast = toastStore((state) => state.removeToast)

  useEffect(() => {
    const duration = item.duration ?? 5000

    if (duration <= 0) return

    const timer = window.setTimeout(() => removeToast(item.id), duration)

    return () => window.clearTimeout(timer)
  }, [item.id, item.duration, removeToast])

  return (
    <div role='alert' className={cn('alert alert-soft animation-fade-up max-w-sm shadow-lg', ALERT_CLASS[item.type ?? 'default'])}>
      <span className='text-sm'>{item.message}</span>
    </div>
  )
}

// daisyUI `toast` stack, fed by utils/toast
const Toast = () => {
  const toasts = toastStore((state) => state.toasts)

  if (!toasts.length) return null

  return (
    <div className='toast toast-top toast-end z-[200]'>
      {toasts.map((item) => (
        <ToastItem key={item.id} item={item} />
      ))}
    </div>
  )
}

export default Toast
