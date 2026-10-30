import { toast } from './toast'

import { COPY_FEEDBACK_DURATION } from '@/constants/app'
import { language } from '@/zustand/language'

export async function copyToClipboard(text: string, textSuccess?: string) {
  try {
    const textNoti = textSuccess || language.getState().language.messages.text.copied

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
    } else {
      const tmp = document.createElement('input')

      tmp.value = text
      document.body.appendChild(tmp)
      tmp.select()
      document.execCommand('copy')
      tmp.remove()
    }

    toast({
      message: textNoti,
      duration: COPY_FEEDBACK_DURATION,
    })
  } catch {
    toast({
      message: 'Error',
      duration: COPY_FEEDBACK_DURATION,
      type: 'error',
    })
  }
}
