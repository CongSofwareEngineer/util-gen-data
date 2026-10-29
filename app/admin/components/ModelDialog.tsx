'use client'

import type { AiModel } from '@/types'

import { FormEvent } from 'react'

import FormField from './FormField'

import { MODEL_TIER, MODEL_TYPE, PRICE_INPUT_STEP } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'

// Add / edit an AI model and its selling prices (per 1,000 tokens)
const ModelDialog = ({ model, onSave }: { model?: AiModel; onSave: (model: AiModel) => void }) => {
  const { translate } = useLanguage()
  const { close } = useModal()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    onSave({
      id: model?.id ?? `${Date.now()}`,
      name: String(form.get('name')),
      type: form.get('type') as MODEL_TYPE,
      connection: String(form.get('connection')),
      inputPrice: Number(form.get('inputPrice')),
      outputPrice: Number(form.get('outputPrice')),
      tier: form.get('tier') as MODEL_TIER,
      estimatePerMessage: Number(form.get('estimatePerMessage')),
      isDefault: model?.isDefault ?? false,
      enabled: form.get('enabled') === 'on',
    })
    close()
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-3'>
      <div className='grid gap-3 sm:grid-cols-2'>
        <FormField label={translate('admin.models.displayName')}>
          <input name='name' required defaultValue={model?.name} className='input w-full' />
        </FormField>
        <FormField label={translate('admin.models.type')}>
          <select name='type' defaultValue={model?.type ?? MODEL_TYPE.LOCAL} className='select w-full'>
            {Object.values(MODEL_TYPE).map((type) => (
              <option key={type} value={type}>
                {translate(`modelType.${type}`)}
              </option>
            ))}
          </select>
        </FormField>
      </div>
      <FormField label={translate('admin.models.connection')} hint={translate('admin.models.connectionHint')}>
        <input name='connection' required defaultValue={model?.connection} className='input w-full font-mono' />
      </FormField>
      <div className='grid gap-3 sm:grid-cols-3'>
        <FormField label={translate('studio.model.inputPrice')}>
          <input name='inputPrice' type='number' min={0} step={PRICE_INPUT_STEP} required defaultValue={model?.inputPrice} className='input w-full' />
        </FormField>
        <FormField label={translate('studio.model.outputPrice')}>
          <input
            name='outputPrice'
            type='number'
            min={0}
            step={PRICE_INPUT_STEP}
            required
            defaultValue={model?.outputPrice}
            className='input w-full'
          />
        </FormField>
        <FormField label={translate('studio.model.perMessage')}>
          <input
            name='estimatePerMessage'
            type='number'
            min={0}
            step={PRICE_INPUT_STEP}
            required
            defaultValue={model?.estimatePerMessage}
            className='input w-full'
          />
        </FormField>
      </div>
      <FormField label={translate('admin.models.tier')}>
        <select name='tier' defaultValue={model?.tier ?? MODEL_TIER.STANDARD} className='select w-full'>
          {Object.values(MODEL_TIER).map((tier) => (
            <option key={tier} value={tier}>
              {translate(`studio.model.tier.${tier}`)}
            </option>
          ))}
        </select>
      </FormField>
      <label className='label cursor-pointer gap-2 text-sm text-base-content'>
        <input name='enabled' type='checkbox' defaultChecked={model?.enabled ?? true} className='toggle toggle-primary toggle-sm' />
        {translate('admin.models.enabled')}
      </label>
      <div className='modal-action mt-1'>
        <button type='button' className='btn btn-ghost' onClick={() => close()}>
          {translate('common.cancel')}
        </button>
        <button type='submit' className='btn btn-primary'>
          {translate('common.save')}
        </button>
      </div>
    </form>
  )
}

export default ModelDialog
