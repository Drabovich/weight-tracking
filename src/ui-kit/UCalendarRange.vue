<script setup>
import { ref, watch } from 'vue';
import { DatePicker } from 'v-calendar';

const { modelValue } = defineProps({
  modelValue: Object,
  customClassCalendar: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['update:modelValue']);
const date = ref({
  start: modelValue.start,
  end: modelValue.end
});

watch(date, (newValue) => {
  emits('update:modelValue', newValue);
});

const handleResetDatePicker = () => {
  date.value = {
    start: null,
    end: null
  };
};
</script>

<template>
  <DatePicker v-model.range="date">
    <template #default="{ togglePopover }">
      <button :class="`${customClassCalendar}`" @click="togglePopover">
        <calendar-icon />
      </button>
    </template>
    <template #footer>
      <div class="w-full px-4 pb-3">
        <button
          class="bg-custom-blue text-white font-bold w-full px-3 py-1 rounded-md"
          @click="handleResetDatePicker"
        >
          Сбросить фильтр
        </button>
      </div>
    </template>
  </DatePicker>
</template>
