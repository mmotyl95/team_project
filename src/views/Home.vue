<script setup lang="ts">
import { useStore } from "../stores/store";
import busStops from "../assets/busStop.json";

import FavouriteBusServices from "../components/FavouriteBusServices.vue";
import FavouriteBusStops from "../components/FavouriteBusStops.vue";
import LiveGif from "../components/LiveGif.vue";

const cardStore = useStore();
/*
const splitKeys = Object.keys(cardStore.favouriteBusServices)
  .toString()
  .split("-");

My assumption previously was that because Object.keys(cardStore.favouriteBusServices) returns an array, to use the split() method, the data must first be a string and hence i chose the toString() method, and there would be no issues looping through it in <template> because split() method returns an array as well. 

However, the previous method of doing things return me just one array that looks smth like this if i have 4 key properties in the cardStore

[
  "143",
  "20231,143M",
  "20231,30",
  "20231,79",
  "20231"
]

What i realise from your comment previously was that i need to split('-') for each of the key.
This means i need to create a new array with the same number of elements but without changing the original array after changing it from an object to array using the Object.keys method.

Therefore I chose the .map) method because it does what I want, it allows me to iterate over the key values of the array and split them by the dash character, creating an array of arrays where each inner array contains the to values that were previously seperated by a dash. This way, I can use the v-for directive to loop through the array and assign the values to seperate variables, allowing these values to be accessible to the child components
 */

// console.log(splitKeys);
/**
 * const splitKey = Object.entries(cardStore.favouriteBusServices).map(([key]) =>
 key.split("-"));
 * This code returns the same results as using Object.keys
 */

const splitKeys = Object.keys(cardStore.favouriteBusServices).map((key) =>
  key.split("-")
);
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

    <LiveGif />

    <FavouriteBusServices
      v-for="[busNumber, busStopID] in splitKeys"
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
