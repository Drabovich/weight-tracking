<script setup>
defineProps({
  lastWeight: String
});
</script>

<template>
  <div
    class="w-32 h-32 flex shrink-0 justify-center items-center bg-custom-grey border-4 border-solid border-custom-blue rounded-full"
  >
    <div class="flex flex-col items-center">
      <span class="text-3xl">{{ lastWeight || '-' }}</span>
      <span>kg</span>
    </div>
  </div>
</template>
