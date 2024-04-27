<script setup>
const props = defineProps(["busNumber", "busStopID", "busStopName"]);
</script>

<template>
  <router-link
    class="columns is-mobile has-background-link-light mb-4 mx-1"
    :to="{
      name: 'Timing',
      params: {
        busStopID,
        busStopName,
      },
    }"
  >
    <div class="column has-text-centered is-5">
      <p class="is-size-6">{{ busNumber }}</p>
      <p class="is-size-7">{{ busStopName }}</p>
    </div>
    <div class="column has-text-centered">
      <p class="heading">next</p>
      <p class="title is-4">1st</p>
    </div>
    <div class="column has-text-centered">
      <p class="heading">Second</p>
      <p class="title is-4">2nd</p>
    </div>
    <div class="column has-text-centered">
      <p class="heading">Third</p>
      <p class="title is-4">3rd</p>
    </div>
  </router-link>
</template>
