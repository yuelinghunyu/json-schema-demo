import { defineComponent } from 'vue'
import { Schema, SchemaTypes, FiledPropsDefine } from '../types/props-types'
import EngineFormItem from './EngineFormItem'

export default defineComponent({
  name: 'EngineForm',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    return () => {
      const { schema, value } = props
      return (
        <EngineFormItem schema={schema} value={value} onChange={handleChange} />
      )
    }
  },
})
