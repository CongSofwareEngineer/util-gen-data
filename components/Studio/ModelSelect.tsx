'use client'

import type { AiModel } from '@/types'

import { MODEL_TIER, MODEL_TYPE } from '@/constants/app'
import { ArrowDownIcon } from '@/components/Icons/ArrowDown'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'
import useStudio from '@/hooks/useStudio'
import { MOCK_MODELS } from '@/mock'
import { formatVnd } from '@/utils/format'
import { cn } from '@/utils/tailwind'

export const TIER_BADGE: Record<MODEL_TIER, string> = {
  [MODEL_TIER.SAVING]: 'badge-success',
  [MODEL_TIER.STANDARD]: 'badge-info',
  [MODEL_TIER.PREMIUM]: 'badge-secondary',
}

// Enabled models, cheapest first
export const getSelectableModels = (models: AiModel[]) =>
  models.filter((model) => model.enabled).sort((a, b) => a.estimatePerMessage - b.estimatePerMessage)

const PriceDetail = ({ models }: { models: AiModel[] }) => {
  const { translate } = useLanguage()

  return (
    <div className='overflow-x-auto'>
      <table className='table table-sm'>
        <thead>
          <tr>
            <th>{translate('studio.model.name')}</th>
            <th>{translate('studio.model.inputPrice')}</th>
            <th>{translate('studio.model.outputPrice')}</th>
            <th>{translate('studio.model.perMessage')}</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr key={model.id}>
              <td>
                <p className='font-semibold'>{model.name}</p>
                <p className='text-xs text-base-content/60'>
                  {translate(model.type === MODEL_TYPE.LOCAL ? 'studio.model.local' : 'studio.model.cloud')}
                </p>
              </td>
              <td>{formatVnd(model.inputPrice)}</td>
              <td>{formatVnd(model.outputPrice)}</td>
              <td>~{formatVnd(model.estimatePerMessage)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className='mt-3 text-xs text-base-content/60'>{translate('studio.model.priceNote')}</p>
    </div>
  )
}

// Model picker above the chat: can change mid-session, next messages use the new model's price
const ModelSelect = () => {
  const { translate } = useLanguage()
  const { open } = useModal()
  const { modelId, setModel } = useStudio()
  const models = getSelectableModels(MOCK_MODELS)
  const current = models.find((model) => model.id === modelId) ?? models[0]

  return (
    <div className='flex items-center gap-2'>
      <div className='dropdown flex-1'>
        <button tabIndex={0} className='btn btn-sm btn-block justify-between bg-base-100 font-normal'>
          <span className='flex items-center gap-2 truncate'>
            <span className='font-semibold'>{current.name}</span>
            <span className={cn('badge badge-xs badge-soft', TIER_BADGE[current.tier])}>{translate(`studio.model.tier.${current.tier}`)}</span>
          </span>
          <ArrowDownIcon className='size-4' />
        </button>
        <ul tabIndex={-1} className='menu dropdown-content z-20 mt-2 w-full rounded-box bg-base-100 p-2 shadow-lg'>
          {models.map((model) => (
            <li key={model.id}>
              <button
                onClick={() => setModel(model.id)}
                className={cn('flex flex-col items-start gap-0.5', model.id === current.id && 'menu-active')}
              >
                <span className='flex w-full items-center gap-2'>
                  <span className='font-semibold'>{model.name}</span>
                  <span className={cn('badge badge-xs badge-soft', TIER_BADGE[model.tier])}>{translate(`studio.model.tier.${model.tier}`)}</span>
                  {model.isDefault && <span className='badge badge-xs badge-outline'>{translate('studio.model.default')}</span>}
                </span>
                <span className='text-xs opacity-70'>{translate('studio.model.estimate', { price: formatVnd(model.estimatePerMessage) })}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        className='btn btn-ghost btn-sm'
        onClick={() =>
          open({ title: translate('studio.model.priceTitle'), children: <PriceDetail models={models} />, classNames: { container: 'sm:max-w-2xl' } })
        }
      >
        {translate('studio.model.viewPrice')}
      </button>
    </div>
  )
}

export default ModelSelect
