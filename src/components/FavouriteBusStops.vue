<script setup lang="ts">
const props = defineProps<{
  busStopID: string;
  busStopName: string;
}>();
</script>

<template>
  <router-link
    :to="{
      name: 'Timing',
      params: {
        busStopID,
        busStopName,
      },
    }"
    class="columns is-mobile has-background-info is-multiline mb-5 mx-1"
  >
    <div class="column is-one-third">
      <p class="title is-4">
        {{ busStopID }}
      </p>
    </div>

    <div class="column">
      <p class="title is-5">
        {{ busStopName }}
      </p>
    </div>
  </router-link>
</template>
