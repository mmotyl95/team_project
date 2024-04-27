<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "../stores/store";
import { getBusArrival } from "../api/getBusArrival";
import LiveGif from "../components/LiveGif.vue";

const cardStore = useStore();

const props = defineProps<{
  busStopID: string;
  busStopName: string;
}>();
/**
 * busServices is accessed in template using the v-for directive, since we
 * want the timing to be updated in real time, we just have to use setInterval
 * to change its value every 30 seconds and it then needs to be a ref instead.
 */
const busServices = ref(await getBusArrival(props.busStopID));

setInterval(async function () {
  busServices.value = await getBusArrival(props.busStopID);
}, 20000);
</script>

<template>
  <nav
    class="navbar has-background-light"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <!-- Search icon that should return to the previous search result -->
      <a @click="$router.go(-1)" class="navbar-item">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </a>

      <!-- Home icon which takes us back to main page -->
      <router-link :to="{ name: 'home' }" class="navbar-item">
        <i class="fa fa-home" aria-hidden="true"></i>
      </router-link>

      <div class="navbar-item">
        <i
          :class="{ active: cardStore.favouriteBusStops[busStopID] }"
          class="fa-solid fa-heart"
          aria-hidden="true"
          @click="cardStore.toggleBusStop(busStopID)"
        ></i>
      </div>

      <div class="navbar-item">{{ busStopID }} | {{ busStopName }}</div>
      <div class="navbar-burger pt-3 px-2">
        <router-link :to="{ name: 'Search' }" class="navbar-item">
          <i class="fa fa-search has-text-info"></i>
        </router-link>
      </div>
    </div>

    <!--
      Same issue with home page search icon, bulma burger allows a nice
      placement of search icon but it disappear when on wide desktop screen.
     -->
    <div class="navbar-menu">
      <div class="navbar-end">
        <router-link :to="{ name: 'Search' }" class="navbar-item">
          <i class="fa fa-search has-text-info"></i>
        </router-link>
      </div>
    </div>
  </nav>

  <!-- Live Gif to tell user that time is being updated in real time -->
  <div class="container has-text-centered">
    <LiveGif />
  </div>

  <!--
    Originally used bulma's level for timing to be displayed horizontally,
    but when all the values are loop through using the v-for directive,
    not all of the values are aligned centered. Therefore we change to columns.
   -->
  <router-link
    class="columns is-mobile has-background-link-light mb-4 mx-1"
    v-for="(busService, i) in busServices.services"
    :key="i"
    :to="{
      name: 'busRoute',
      params: { busNumber: busService.no, busStopID: busStopID },
    }"
  >
    <div class="column has-text-centered">
      <p class="heading">Bus</p>
      <p class="title is-4">
        {{ busService.no }}
      </p>
    </div>

    <div class="column has-text-centered">
      <p class="heading">next</p>
      <!--
          (?.) aka optional chanining access an object's property or call a function.
          If the object accessed or function called is undefined or null, it returns
          undefined instead of throwing an error. This statement means if busService
          is undefined or null, the whole statement will be undefine, if it passes
          busService and gets to next and it is undefined or null as well, the whole
          statement throws a undefined value instead of an error. This is needed since
          the api might not have data for the 3rd estimated time and hence we do not want
          the whole app to crash because it did when some next3 values are null/undefined.
         -->
      <p v-if="busService?.next?.duration_ms" class="title is-5">
        {{
          /**
           * When the this gets divided by 60000, it
           * returns time in minutes. If this value is
           * lesser than 1 minute, we want the app to
           * show the string "Arr"
           */
          Math.floor(busService.next.duration_ms / 60000) < 1
            ? "Arr"
            : Math.floor(busService.next.duration_ms / 60000)
        }}
      </p>
    </div>

    <div class="column has-text-centered">
      <p class="heading">Second</p>
      <p v-if="busService?.next2?.duration_ms" class="title is-5">
        {{ Math.floor(busService.next2.duration_ms / 60000) }}
      </p>
    </div>

    <div class="column has-text-centered">
      <p class="heading">Third</p>
      <p v-if="busService?.next3?.duration_ms" class="title is-5">
        {{ Math.floor(busService.next3.duration_ms / 60000) }}
      </p>
    </div>

    <div class="column has-text-centered is-1">
      <!-- 
        @click.prevent ensures that only the custom click event is executed and not the
        router-link element click event.
       -->

      <i
        :class="{
          active:
            cardStore.favouriteBusServices[`${busService.no}-${busStopID}`],
        }"
        class="fa-solid fa-heart"
        aria-hidden="true"
        @click.prevent="cardStore.toggleBusServices(busService.no, busStopID)"
      >
      </i>
    </div>
  </router-link>
</template>

<style scoped>
.columns {
  border-radius: 15px;
}

.active {
  color: red;
}
</style>
