<script setup lang="ts">
const props = defineProps<{
  busStopID: string;
  busStopName: string;
  busStopStreet: string;
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
      <p class="subtitle is-6">
        {{ busStopStreet }}
      </p>
    </div>
  </router-link>
</template>
