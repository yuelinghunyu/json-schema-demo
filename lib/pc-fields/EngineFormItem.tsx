import { defineComponent, PropType, computed } from 'vue'
import { Schema, SchemaTypes, FiledPropsDefine } from '../types/props-types'

import InputNumber from './input/inputNumber.vue'
import InputSting from './input/inputString'
import ObjectField from './object/ObjectField'

import { retrieveSchema } from '../utils/transform'

export default defineComponent({
  name: 'EngineFormItem',
  props: FiledPropsDefine,
  setup(props) {
    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props
      return retrieveSchema(schema, rootSchema, value)
    })

    return () => {
      const { schema, rootSchema, value } = props
      const retrievedSchema = retrievedSchemaRef.value
      console.log(retrievedSchema)
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
        case SchemaTypes.OBJECT: {
          Component = ObjectField
          break
        }
        default: {
          console.warn(`${type} is not supported`)
        }
      }

      return <Component {...props} schema={retrievedSchema} />
    }
  },
})
