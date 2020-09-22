<template>
  <p
      class="text-center notification"
  >
    <slot />
  </p>
</template>
<style scoped>
.notification {
  position: fixed;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #00b3ee;
  padding: 10px;
}
</style>