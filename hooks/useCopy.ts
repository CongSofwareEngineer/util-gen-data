import { useState } from 'react'

import { copyToClipboard } from '@/utils/function'

// Copy text to the clipboard and flag `copied` for a short moment (button feedback)
const useCopy = () => {
  const [copied, setCopied] = useState(false)

  const copy = async (text: any) => {
    copyToClipboard(text).then(() => {
      setCopied(true)
    })
  }

  return { copied, copy }
}

export default useCopy
