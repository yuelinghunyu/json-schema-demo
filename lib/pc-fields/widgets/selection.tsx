import { defineComponent, ref, PropType, watch } from 'vue'

export default defineComponent({
  name: 'SelectionWidget',
  props: {
    value: {},
    onChange: {
      type: Function as PropType<(v: any) => void>,
      require: true,
    },
    options: {
      type: Array as PropType<
        {
          key: string
          value: any
        }[]
      >,
      require: true,
    },
  },
  setup(props) {
    const currentValRef = ref(props.value || [])
    watch(currentValRef, (newv, oldv) => {
      if (newv !== props.value) {
        props.onChange && props.onChange(newv)
      }
    })

    watch(
      () => props.value,
      (v) => {
        if (v !== currentValRef.value) {
          currentValRef.value = v
        }
      },
    )

    return () => {
      const { options } = props
      return (
        <select multiple={true} v-model={currentValRef.value}>
          {options!.map((op) => (
            <option value={op.value}>{op.key}</option>
          ))}
        </select>
      )
    }
  },
})
