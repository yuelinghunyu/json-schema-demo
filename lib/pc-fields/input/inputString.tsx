import { defineComponent } from 'vue'
import { FiledPropsDefine } from '../../types/props-types'
export default defineComponent({
  name: 'EngineInputString',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      props.onChange(e.target.value)
    }
    return () => {
      return (
        <input type="text" value={props.value} onInput={handleChange}></input>
      )
    }
  },
})
