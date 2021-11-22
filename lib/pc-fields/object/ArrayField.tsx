import { defineComponent, PropType } from 'vue'
import { FiledPropsDefine, Schema } from '../../types/props-types'
import { useEngineFieldsContext } from '../../hooks/useEngineContext'
import SelectionWidget from '../widgets/selection'

const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      require: true,
    },
    onDel: {
      type: Function as PropType<(index: number) => void>,
      require: true,
    },
    index: {
      type: Number,
      require: true,
    },
  },
  setup(props, { slots }) {
    const handleAdd = () => props.onAdd && props.onAdd(props.index as number)
    const handleDel = () => props.onDel && props.onDel(props.index as number)
    return () => {
      return (
        <div>
          <div>
            <button onClick={handleAdd}>新增</button>
            <button onClick={handleDel}>删除</button>
          </div>
          <div>{slots.default && slots.default()}</div>
        </div>
      )
    }
  },
})

export default defineComponent({
  name: 'ArrayField',
  props: FiledPropsDefine,
  setup(props) {
    const context = useEngineFieldsContext()
    const handleArrayItemChange = (v: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[index] = v
      props.onChange(arr)
    }

    const handleAdd = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index + 1, 0, undefined)
      props.onChange(arr)
    }
    const handleDel = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index, 1)
      props.onChange(arr)
    }
    return () => {
      const { EngineFormItem } = context
      const { schema, rootSchema, value } = props

      const isMultiType = Array.isArray(schema.items)
      const isSelect = schema.items && (schema.items as any).enum

      if (isMultiType) {
        const items: Schema[] = schema.items as any
        const arr = Array.isArray(value) ? value : []
        return items.map((s: Schema, index: number) => (
          <EngineFormItem
            schema={s}
            rootSchema={rootSchema}
            value={arr[index]}
            key={index}
            onChange={(v: any) => {
              handleArrayItemChange(v, index)
            }}
          ></EngineFormItem>
        ))
      } else if (!isSelect) {
        const arr = Array.isArray(value) ? value : []
        return arr.map((v: any, index: number) => (
          <ArrayItemWrapper index={index} onAdd={handleAdd} onDel={handleDel}>
            <EngineFormItem
              schema={schema.items as Schema}
              value={v}
              key={index}
              rootSchema={rootSchema}
              onChange={(v: any) => {
                handleArrayItemChange(v, index)
              }}
            ></EngineFormItem>
          </ArrayItemWrapper>
        ))
      } else {
        const enumOptions = (schema as any).items.enum
        const options = enumOptions.map((e: any) => ({
          key: e,
          value: e,
        }))
        return (
          <SelectionWidget
            onChange={props.onChange}
            value={props.value}
            options={options}
          ></SelectionWidget>
        )
      }
    }
  },
})
