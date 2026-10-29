'use client'

import type { AiModel } from '@/types'

import { useState } from 'react'

import ModelDialog from '../components/ModelDialog'

import PageHeader from '@/components/PageHeader'
import { EditIcon } from '@/components/Icons/Functions/Edit'
import { PlusIcon } from '@/components/Icons/Plus'
import { TIER_BADGE } from '@/components/Studio/ModelSelect'
import { MODEL_TYPE } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'
import { MOCK_MODELS } from '@/mock'
import { formatVnd } from '@/utils/format'
import { cn } from '@/utils/tailwind'

// Admin: AI models (local Ollama/vLLM or cloud OpenRouter), selling prices, default model and cloud fallback
const AdminModelsPage = () => {
  const { translate } = useLanguage()
  const { open } = useModal()
  const [models, setModels] = useState<AiModel[]>(MOCK_MODELS)
  const cloudModels = models.filter((model) => model.type === MODEL_TYPE.CLOUD && model.enabled)

  const saveModel = (next: AiModel) =>
    setModels((prev) => (prev.some((model) => model.id === next.id) ? prev.map((model) => (model.id === next.id ? next : model)) : [...prev, next]))

  const setDefault = (id: string) => setModels((prev) => prev.map((model) => ({ ...model, isDefault: model.id === id })))

  return (
    <div className='flex flex-col gap-6'>
      <PageHeader
        title={translate('admin.models.title')}
        description={translate('admin.models.description')}
        actions={
          <button
            className='btn btn-primary'
            onClick={() => open({ title: translate('admin.models.add'), children: <ModelDialog onSave={saveModel} /> })}
          >
            <PlusIcon className='size-4' />
            {translate('admin.models.add')}
          </button>
        }
      />

      <div className='overflow-x-auto rounded-box border border-base-300 bg-base-100'>
        <table className='table'>
          <thead>
            <tr>
              <th>{translate('admin.models.displayName')}</th>
              <th>{translate('admin.models.connection')}</th>
              <th className='text-right'>{translate('studio.model.inputPrice')}</th>
              <th className='text-right'>{translate('studio.model.outputPrice')}</th>
              <th className='text-right'>{translate('studio.model.perMessage')}</th>
              <th>{translate('studio.model.default')}</th>
              <th>{translate('admin.models.enabled')}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr key={model.id} className={cn(!model.enabled && 'opacity-60')}>
                <td>
                  <p className='font-semibold'>{model.name}</p>
                  <div className='flex gap-1'>
                    <span className='badge badge-xs badge-outline'>{translate(`modelType.${model.type}`)}</span>
                    <span className={cn('badge badge-xs badge-soft', TIER_BADGE[model.tier])}>{translate(`studio.model.tier.${model.tier}`)}</span>
                  </div>
                </td>
                <td className='font-mono text-xs'>{model.connection}</td>
                <td className='text-right'>{formatVnd(model.inputPrice)}</td>
                <td className='text-right'>{formatVnd(model.outputPrice)}</td>
                <td className='text-right'>~{formatVnd(model.estimatePerMessage)}</td>
                <td>
                  <input
                    type='radio'
                    name='default-model'
                    className='radio radio-primary radio-sm'
                    checked={model.isDefault}
                    disabled={!model.enabled}
                    onChange={() => setDefault(model.id)}
                    aria-label={translate('studio.model.default')}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    className='toggle toggle-success toggle-sm'
                    checked={model.enabled}
                    disabled={model.isDefault}
                    onChange={(event) => saveModel({ ...model, enabled: event.target.checked })}
                    aria-label={translate('admin.models.enabled')}
                  />
                </td>
                <td>
                  <button
                    className='btn btn-ghost btn-sm btn-square'
                    aria-label={translate('common.edit')}
                    onClick={() => open({ title: translate('admin.models.edit'), children: <ModelDialog model={model} onSave={saveModel} /> })}
                  >
                    <EditIcon className='size-4' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='card max-w-xl border border-base-300 bg-base-100'>
        <div className='card-body gap-3'>
          <h2 className='card-title text-base'>{translate('admin.models.fallbackTitle')}</h2>
          <p className='text-sm text-base-content/60'>{translate('admin.models.fallbackDescription')}</p>
          <select className='select w-full' defaultValue={cloudModels[0]?.id} aria-label={translate('admin.models.fallbackTitle')}>
            {cloudModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default AdminModelsPage
