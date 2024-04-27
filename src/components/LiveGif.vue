<template>
  <iframe
    src="https://giphy.com/embed/PisferDnOMqQOMC4ir"
    width="100"
    height="50"
    class="giphy"
    loading="lazy"
  ></iframe>
</template>

<style scoped>
/* Give it a special none clickable pointer-event because without it, clicking it will redirect to gif source. */
.giphy {
  pointer-events: none;
}
</style>
