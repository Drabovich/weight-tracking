<script setup>
import { ref, watch } from 'vue';
import { DatePicker } from 'v-calendar';

const { modelValue } = defineProps({
  modelValue: Date,
  customClassCalendar: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['update:modelValue']);
const date = ref(modelValue);

watch(date, (newValue) => {
  emits('update:modelValue', newValue);
});
</script>

<template>
  <DatePicker v-model="date" is-required>
    <template #default="{ togglePopover }">
      <button :class="`${customClassCalendar}`" @click="togglePopover">
        <calendar-icon />
      </button>
    </template>
  </DatePicker>
</template>
