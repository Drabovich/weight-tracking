<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { NUMBER_REGEX } from '@/constants/REGEX';

const emit = defineEmits(['createWeight']);

const inputValueDate = ref(new Date());
const inputValueWeight = ref('');
const errorMessage = ref('');

// Передача данных о новой записи об изменении веса
const handleSaveData = () => {
  errorMessage.value = '';
  if (!NUMBER_REGEX.test(inputValueWeight.value)) {
    errorMessage.value = 'Введите корректные данные!';
    return;
  }

  emit('createWeight', {
    id: uuidv4(),
    date: inputValueDate.value.getTime(),
    weight: inputValueWeight.value.trim()
  });

  inputValueWeight.value = '';
};
</script>

<template>
  <div>
    <div class="flex justify-center items-center gap-x-1">
      <u-calendar
        v-model="inputValueDate"
        customClassCalendar="!bg-custom-grey !border-2 !border-custom-blue !rounded !p-1"
      />
      <u-input
        v-model="inputValueWeight"
        :customClassInput="`${errorMessage ? '!border-red-400' : ''}`"
      />
      <u-button @click="handleSaveData">Добавить</u-button>
    </div>
    <div v-if="errorMessage" class="text-red-400 text-center text-sm pt-1">
      {{ errorMessage }}
    </div>
  </div>
</template>
