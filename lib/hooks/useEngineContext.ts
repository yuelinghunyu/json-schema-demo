import { inject, reactive } from 'vue'

import { CommonFieldType } from '../types/props-types'

export const SchemaFormContextKey = Symbol()

type EngineFormItemType = { EngineFormItem: CommonFieldType }

export function useEngineFieldsContext(): EngineFormItemType {
  const context: EngineFormItemType | undefined = inject(SchemaFormContextKey)
  if (!context) throw Error('SchemaForm needed')
  return context
}
