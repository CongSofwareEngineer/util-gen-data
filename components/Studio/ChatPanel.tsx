'use client'

import { DragEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import ModelSelect from './ModelSelect'

import SendIcon from '@/components/Icons/Functions/Send'
import PhotoIcon from '@/components/Icons/Photo'
import { XMarkIcon } from '@/components/Icons/XMark'
import {
  ACCEPT_IMAGE_TYPES,
  BYTES_PER_MB,
  CHAT_ROLE,
  LOW_BALANCE_WARNING,
  MAX_IMAGE_SIZE_MB,
  MAX_IMAGES_PER_PAGE,
  MOCK_AI_REPLY_DELAY,
  ROUTES,
} from '@/constants/app'
import { THEME_LIST } from '@/constants/themes'
import useLanguage from '@/hooks/useLanguage'
import useStudio from '@/hooks/useStudio'
import useUser from '@/hooks/useUser'
import { MOCK_AI_REPLY, MOCK_MODELS } from '@/mock'
import { formatNumber, formatVnd, messageCost } from '@/utils/format'
import { cn } from '@/utils/tailwind'
import { toast } from '@/utils/toast'
import { user as userStore } from '@/zustand/user'

// Chat with the AI: it asks for missing info and returns JSON for the template (mocked until the API exists)
const ChatPanel = () => {
  const { translate } = useLanguage()
  const { user, updateUser } = useUser()
  const { messages, modelId, isReplying, sessionCost, sessionTokens, data, addMessage, setReplying, setData, setTheme } = useStudio()
  const [text, setText] = useState('')
  const [attachments, setAttachments] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const model = MOCK_MODELS.find((item) => item.id === modelId) ?? MOCK_MODELS[0]
  const balance = user.balance ?? 0
  // Server holds the max possible cost of a turn first: not enough balance = cannot send
  const canAfford = balance >= model.estimatePerMessage

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages.length, isReplying])

  const addFiles = (files: FileList | null) => {
    if (!files?.length) return
    const images = Array.from(files).filter((file) => ACCEPT_IMAGE_TYPES.includes(file.type))

    if (images.some((file) => file.size > MAX_IMAGE_SIZE_MB * BYTES_PER_MB)) {
      toast({ type: 'error', message: translate('studio.chat.imageTooLarge', { size: MAX_IMAGE_SIZE_MB }) })

      return
    }
    if (data.album.length + attachments.length + images.length > MAX_IMAGES_PER_PAGE) {
      toast({ type: 'error', message: translate('studio.chat.tooManyImages', { max: MAX_IMAGES_PER_PAGE }) })

      return
    }
    // Real flow: upload to Cloudinary, keep the returned URL
    setAttachments((prev) => [...prev, ...images.map((file) => URL.createObjectURL(file))])
  }

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    addFiles(event.dataTransfer.files)
  }

  const send = () => {
    const content = text.trim()

    if ((!content && !attachments.length) || isReplying || !canAfford) return

    const images = attachments
    const lowered = content.toLowerCase()
    const matchedTheme = THEME_LIST.find((theme) => lowered.includes(translate(`themes.${theme.key}.name`).toLowerCase()))

    addMessage({ id: `${Date.now()}`, role: CHAT_ROLE.USER, content, images, createdAt: new Date().toISOString() })
    setText('')
    setAttachments([])
    setReplying(true)

    window.setTimeout(() => {
      const cost = messageCost(model, MOCK_AI_REPLY.inputTokens, MOCK_AI_REPLY.outputTokens)

      if (matchedTheme) setTheme(matchedTheme.key)
      if (images.length) setData({ coverImage: images[0], album: [...images, ...data.album] })

      addMessage({
        id: `${Date.now()}-ai`,
        role: CHAT_ROLE.ASSISTANT,
        content: MOCK_AI_REPLY.content,
        modelId: model.id,
        inputTokens: MOCK_AI_REPLY.inputTokens,
        outputTokens: MOCK_AI_REPLY.outputTokens,
        cost,
        createdAt: new Date().toISOString(),
      })
      updateUser({ balance: Math.max(0, (userStore.getState().user.balance ?? 0) - cost) })
      setReplying(false)
    }, MOCK_AI_REPLY_DELAY)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      send()
    }
  }

  return (
    <div
      className={cn('relative flex min-h-0 flex-1 flex-col', isDragging && 'outline-2 outline-dashed outline-primary')}
      onDragOver={(event) => {
        event.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
    >
      {/* Model + session cost */}
      <div className='flex flex-col gap-2 border-b border-base-300 p-3'>
        <ModelSelect />
        <div className='flex items-center justify-between text-sm'>
          <span>
            {translate('studio.chat.sessionCost')} <b className='text-primary'>{formatVnd(sessionCost)}</b>
            <span className='ml-2 text-xs text-base-content/50'>{translate('studio.chat.tokens', { count: formatNumber(sessionTokens) })}</span>
          </span>
          <span className='text-xs text-base-content/70'>{translate('studio.chat.balance', { amount: formatVnd(balance) })}</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={listRef} className='flex-1 overflow-y-auto p-3'>
        {messages.map((message) => {
          const isUser = message.role === CHAT_ROLE.USER

          return (
            <div key={message.id} className={cn('chat', isUser ? 'chat-end' : 'chat-start')}>
              <div className={cn('chat-bubble text-sm', isUser ? 'chat-bubble-primary' : 'bg-base-200 text-base-content')}>
                {message.images?.length ? (
                  <div className='mb-2 flex flex-wrap gap-1'>
                    {message.images.map((url) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={url} src={url} alt={translate('studio.chat.attachment')} className='size-16 rounded-lg object-cover' />
                    ))}
                  </div>
                ) : null}
                {isUser ? (
                  message.content
                ) : (
                  <div className='flex flex-col gap-1 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-4'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                  </div>
                )}
              </div>
              {!isUser && message.cost !== undefined && (
                <div className='chat-footer mt-1 text-xs opacity-60'>
                  {formatVnd(message.cost)} ·{' '}
                  {translate('studio.chat.tokens', { count: formatNumber((message.inputTokens ?? 0) + (message.outputTokens ?? 0)) })}
                </div>
              )}
            </div>
          )
        })}
        {isReplying && (
          <div className='chat chat-start'>
            <div className='chat-bubble bg-base-200'>
              <span className='loading loading-dots loading-sm' aria-label={translate('studio.chat.replying')} />
            </div>
          </div>
        )}
      </div>

      {/* Balance alerts */}
      {!canAfford ? (
        <div role='alert' className='alert alert-error alert-soft mx-3 mb-2 text-sm'>
          <span>{translate('studio.chat.outOfBalance')}</span>
          <Link href={ROUTES.wallet} className='btn btn-error btn-sm'>
            {translate('wallet.topupMore')}
          </Link>
        </div>
      ) : (
        balance < LOW_BALANCE_WARNING && (
          <div role='alert' className='alert alert-warning alert-soft mx-3 mb-2 text-sm'>
            <span>{translate('studio.chat.lowBalance')}</span>
          </div>
        )
      )}

      {/* Composer */}
      <div className='border-t border-base-300 p-3'>
        {attachments.length > 0 && (
          <div className='mb-2 flex flex-wrap gap-2'>
            {attachments.map((url) => (
              <div key={url} className='indicator'>
                <button
                  className='indicator-item badge badge-neutral badge-xs size-5 p-0'
                  aria-label={translate('common.remove')}
                  onClick={() => setAttachments((prev) => prev.filter((item) => item !== url))}
                >
                  <XMarkIcon className='size-3' />
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={translate('studio.chat.attachment')} className='size-14 rounded-lg object-cover' />
              </div>
            ))}
          </div>
        )}
        <div className='flex items-end gap-2'>
          <button
            className='btn btn-ghost btn-square'
            onClick={() => fileInputRef.current?.click()}
            disabled={!canAfford}
            aria-label={translate('studio.chat.attach')}
            title={translate('studio.chat.attach')}
          >
            <PhotoIcon className='size-5' />
          </button>
          <input
            ref={fileInputRef}
            type='file'
            accept={ACCEPT_IMAGE_TYPES}
            multiple
            hidden
            onChange={(event) => {
              addFiles(event.target.files)
              event.target.value = ''
            }}
          />
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={onKeyDown}
            rows={2}
            disabled={!canAfford}
            placeholder={translate('studio.chat.placeholder')}
            className='textarea flex-1 resize-none text-sm'
          />
          <button
            className='btn btn-primary btn-square'
            onClick={send}
            disabled={!canAfford || isReplying || (!text.trim() && !attachments.length)}
            aria-label={translate('studio.chat.send')}
          >
            <SendIcon className='size-5' />
          </button>
        </div>
        <p className='mt-1.5 text-xs text-base-content/50'>{translate('studio.chat.hint')}</p>
      </div>
    </div>
  )
}

export default ChatPanel
