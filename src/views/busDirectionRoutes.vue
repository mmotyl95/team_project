<script setup lang="ts">
import allBus from "../assets/allBus.json";
import busStop from "../assets/busStop.json";

interface Props {
  busNumber: string;
  busRoute: string;
}
const props = defineProps<Props>();

// interface AllBus {
//   name: string;
//   routes: string[][];
// }

/* 
Alternative solution if I don't want to have too many interfaces. 
Original code on 2nd line of interface: [key: string]: AllBus
 */
interface AllBuses {
  [key: string]: {
    name: string;
    routes: string[][];
  };
}

const allBusServices: AllBuses = allBus as AllBuses;

// Refer to comment on Home.vue as same problem was met.
interface BusStop {
  ID: string;
  Name: string;
  Longitude: number;
  Latitude: number;
  Street: string;
}

interface BusStops {
  [key: string]: BusStop;
}

const busStopData: BusStops = busStop as BusStops;

const busRoutes =
  allBusServices[props.busNumber].routes[Number(props.busRoute)];
</script>

<template>
  <!-- Navbar -->
  <nav
    class="navbar has-background-light mb-5"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <!-- 
        This back icon can't use router-link since it requires a ':to' and when we 
        implement saving of bus numbers in home page, we can't force this back icon to 
        a specific page since it might originate from home page or timing page. 
      -->
      <a @click="$router.go(-1)" class="navbar-item">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </a>
      <div class="navbar-item">Bus number {{ busNumber }}</div>

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
  <!-- End of Navbar -->

  <router-link
    :to="{
      name: 'Timing',
      params: {
        busStopID: busStopData[busRoute].ID,
        busStopName: busStopData[busRoute].Name,
      },
    }"
    class="columns is-mobile has-background-link-light mb-4 mx-1"
    v-for="(busRoute, i) in busRoutes"
    :key="i"
  >
    <div class="column is-4">
      <p class="title is-4">{{ busStopData[busRoute].ID }}</p>
    </div>
    <div class="column">
      <p class="title is-5">{{ busStopData[busRoute].Name }}</p>
      <p class="subtitle is-6">
        {{ busStopData[busRoute].Street }}
      </p>
    </div>
  </router-link>
</template>
