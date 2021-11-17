import { defineComponent, provide } from 'vue'
import { Schema, SchemaTypes, FiledPropsDefine } from '../types/props-types'
import EngineFormItem from './EngineFormItem'
import { SchemaFormContextKey } from '../hooks/useEngineContext'

export default defineComponent({
  name: 'EngineForm',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }
    const context: any = {
      EngineFormItem,
    }

    provide(SchemaFormContextKey, context)

    return () => {
      const { schema, value } = props
      return (
        <EngineFormItem
          schema={schema}
          value={value}
          rootSchema={schema}
          onChange={handleChange}
        />
      )
    }
  },
})
