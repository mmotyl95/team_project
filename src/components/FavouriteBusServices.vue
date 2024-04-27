<script setup>
import { ref } from "vue";
import { getBusArrival } from "../api/getBusArrival";

const props = defineProps(["busNumber", "busStopID", "busStopName"]);

async function getBusArrivalForSpecificBusNumber() {
  // Call API to get all bus arrival timing of this bus stop
  const { services } = await getBusArrival(props.busStopID);

  // Find bus arrival timing of this busNumber at this busStop from all arrival timings
  return services.find((arrival) => arrival.no === props.busNumber);
}

/**
 * `arrival` is accessed in template, since we
 * want the timing to be updated in real time, we just have to use setInterval
 * to change its value every 30 seconds and it then needs to be a ref instead.
 */
const arrival = ref(await getBusArrivalForSpecificBusNumber());

setInterval(async function () {
  arrival.value = await getBusArrivalForSpecificBusNumber();
}, 30000);
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
      <p v-if="arrival?.next?.duration_ms" class="title is-5">
        {{
          /**
           * When the this gets divided by 60000, it
           * returns time in minutes. If this value is
           * lesser than 1 minute, we want the app to
           * show the string "Arr"
           */
          Math.floor(arrival.next.duration_ms / 60000) < 1
            ? "Arr"
            : Math.floor(arrival.next.duration_ms / 60000)
        }}
      </p>
    </div>

    <div class="column has-text-centered">
      <p class="heading">Second</p>
      <p v-if="arrival?.next2?.duration_ms" class="title is-5">
        {{ Math.floor(arrival.next2.duration_ms / 60000) }}
      </p>
    </div>

    <div class="column has-text-centered">
      <p class="heading">Third</p>
      <p v-if="arrival?.next3?.duration_ms" class="title is-5">
        {{ Math.floor(arrival.next3.duration_ms / 60000) }}
      </p>
    </div>
  </router-link>
</template>
