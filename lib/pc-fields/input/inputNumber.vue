<template>
  <input type="number" :value="value" @input="handleChange" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { FiledPropsDefine } from '../../types/props-types'
export default defineComponent({
  name: 'EngineInputNumber',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      props.onChange(e.target.value)
    }
    return {
      handleChange,
    }
  },
})
</script>
