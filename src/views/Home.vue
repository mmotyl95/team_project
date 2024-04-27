<script setup>
import { useStore } from "../stores/store";
import busStops from "../assets/busStop.json";

import FavouriteBusServices from "../components/FavouriteBusServices.vue";
import FavouriteBusStops from "../components/FavouriteBusStops.vue";

const cardStore = useStore();
</script>

<template>
  <main>
    <nav
      class="navbar has-background-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <div class="navbar-item">Shelby's Bus App</div>
        <!-- 
          Navbar burger only is shown on touch devices so there is a navbar menu 
          below with the same exact icons and routing to search page. But if navbar-burger 
          is removed, the search icon will disappear in mobile view although the navbar-end 
          is present. Therefore an addition icon for navbar-menu is needed
         -->
        <router-link
          :to="{ name: 'Search' }"
          class="navbar-burger has-text-centered pt-4"
        >
          <i class="fa fa-search"></i>
        </router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link :to="{ name: 'Search' }" class="navbar-item">
            <i class="fa fa-search"></i>
          </router-link>
        </div>
      </div>
    </nav>

    <p class="header has-text-centered mb-4">Favourite Buses & Stops</p>

    <FavouriteBusStops
      v-for="busStopID in Object.keys(cardStore.favouriteBusStops)"
      :key="busStopID"
      :busStopID="busStopID"
      :busStopName="busStops[busStopID].Name"
    />

    <FavouriteBusServices
      v-for="[busNumber, busStopID] in Object.entries(
        cardStore.favouriteBusServices
      )"
      :key="busNumber"
      :busNumber="busNumber"
      :busStopID="busStopID"
      :busStopName="busStops[busStopID].Name"
    />
  </main>
</template>

<style>
.columns {
  border-radius: 15px;
}
</style>
