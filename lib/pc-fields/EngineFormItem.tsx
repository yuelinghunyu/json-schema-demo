import { defineComponent, PropType } from 'vue'
import { Schema, SchemaTypes, FiledPropsDefine } from '../types/props-types'

import InputNumber from './input/inputNumber.vue'
import InputSting from './input/inputString'

export default defineComponent({
  name: 'EngineFormItem',
  props: FiledPropsDefine,
  setup(props) {
    return () => {
      const { schema } = props
      const type = schema.type
      let Component: any

      switch (type) {
        case SchemaTypes.STRING: {
          Component = InputSting
          break
        }
        case SchemaTypes.NUMBER: {
          Component = InputNumber
          break
        }
        default: {
          console.warn(`${type} is not supported`)
        }
      }

      return <Component {...props} />
    }
  },
})
