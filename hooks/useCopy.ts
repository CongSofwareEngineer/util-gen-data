import { useState } from 'react'

import { COPY_FEEDBACK_DURATION } from '@/constants/app'

// Copy text to the clipboard and flag `copied` for a short moment (button feedback)
const useCopy = () => {
  const [copied, setCopied] = useState(false)

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION)
  }

  return { copied, copy }
}

export default useCopy
