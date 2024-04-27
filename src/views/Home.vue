<script setup>
import { useStore } from "../stores/store";
import busStops from "../assets/busStop.json";

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

    <router-link
      v-for="busStopID in Object.keys(cardStore.favouriteBusStops)"
      :key="busStopID"
      :to="{
        name: 'Timing',
        params: {
          busStopID: busStopID,
          busStopName: busStops[busStopID].Name,
        },
      }"
      class="columns is-mobile has-background-link-light is-multiline mb-5 mx-1"
    >
      <div class="column is-one-third">
        <p class="title is-4">
          {{ busStopID }}
        </p>
      </div>

      <div class="column">
        <p class="title is-5">
          {{ busStops[busStopID].Name }}
        </p>
      </div>
    </router-link>
  </main>
</template>

<style>
.columns {
  border-radius: 15px;
}
</style>
