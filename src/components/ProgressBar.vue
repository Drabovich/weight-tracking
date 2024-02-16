<script setup>
const { lastWeight, maxWeight, inputValueGoal } = defineProps({
  lastWeight: String,
  inputValueGoal: String,
  progressBarValue: Number
});
</script>

<template>
  <div
    v-if="lastWeight && inputValueGoal && progressBarValue !== null"
    class="flex gap-x-3 p-3 rounded-lg bg-custom-dark"
  >
    <div class="text-2xl flex justify-center items-center">🏄</div>
    <div class="grow min-h-full w-10 rounded bg-custom-grey relative">
      <div
        class="h-full flex justify-center items-center rounded bg-gradient-to-r from-custom-blue to-blue-500"
        :style="
          progressBarValue <= 0
            ? 'width: 0%'
            : progressBarValue > 100
              ? 'width: 100%'
              : `width: ${progressBarValue}%`
        "
      ></div>
      <span
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >{{ progressBarValue }}%</span
      >
    </div>
    <div class="text-2xl flex justify-center items-center">💫</div>
  </div>
</template>
