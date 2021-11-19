import { defineComponent } from 'vue'
import { FiledPropsDefine, CommonFieldType } from '../../types/props-types'
import { isObject } from '../../utils/transform'
import { useEngineFieldsContext } from '../../hooks/useEngineContext'

export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup(props) {
    const context = useEngineFieldsContext()
    const handleObjectFieldChange = (key: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }
      props.onChange(value)
    }
    return () => {
      const { schema, rootSchema, value } = props
      const { EngineFormItem } = context
      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {}
      return Object.keys(properties).map((k: string, index: number) => (
        <EngineFormItem
          schema={properties[k]}
          rootSchema={rootSchema}
          value={currentValue[k]}
          key={index}
          onChange={(v: any) => handleObjectFieldChange(k, v)}
        ></EngineFormItem>
      ))
    }
  },
})
