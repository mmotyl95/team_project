<script setup>
// const props = defineProps({});
// const emit = defineEmits;

async function getBusArrivalData(result) {
  /**
   * Get the bus arrival data with the bus stop code.
   * busServices has an object string key value of "services" which contains arrays,
   * with each array contains an object with the specifics of next bus arrival
   */
  const busServices = await fetch(
    `https://arrivelah2.busrouter.sg/?id=${result}`
  ).then((res) => res.json());
  console.log(busServices);

  return busServices;
}
</script>

<template>
  <div>testing testing</div>
</template>

<style lang="scss" scoped></style>
