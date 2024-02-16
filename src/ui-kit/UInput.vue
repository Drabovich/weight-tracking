<script setup>
import { ref, watch } from 'vue';

const { modelValue } = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: 'Введите данные'
  },
  modelValue: String,
  customClassInput: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['update:modelValue']);
const val = ref(modelValue);

watch(val, (newValue) => {
  emits('update:modelValue', newValue);
});
</script>

<template>
  <input
    v-model="val"
    :type="type"
    :value="modelValue"
    :class="`
            w-full max-w-48 rounded border-2 border-custom-blue bg-custom-grey
            p-1 outline-none
            ${customClassInput}
        `"
    :placeholder="placeholder"
  />
</template>
