<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  customClassButton: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <button
    :type="type"
    :class="`
            rounded border-2 border-custom-blue p-2 
            text-xs text-custom-blue font-medium uppercase leading-normal 
            transition duration-150 ease-in-out
            hover:bg-neutral-500 hover:bg-opacity-10 
            ${customClassButton}
        `"
  >
    <slot />
  </button>
</template>
