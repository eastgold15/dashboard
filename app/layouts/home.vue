<script setup lang="ts">

</script>

<template>
  <main class="px-10 text-center">
    <Header class="fixed left-0 top-0" />

    <div class="mx-auto mt-80px text-center text-sm opacity-25">
      <slot />
    </div>

    <Footer class="absolute bottom-4 right-4" />
</main>
</template>
