<script setup lang="ts">
import { useStore } from "../stores/store";
import busStops from "../assets/busStop.json";

import FavouriteBusServices from "../components/FavouriteBusServices.vue";
import FavouriteBusStops from "../components/FavouriteBusStops.vue";
import LiveGif from "../components/LiveGif.vue";

/**
 * There exist an error in the template below for the line
 *  :busStopName="busStops[busStopID].Name"
 * The error message is very long but basically the error says
 * that I am trying to use a string(busStopID) as an index to
 * access an element in the busStops JSON object.
 * This happened because the compiler does not know that the
 * keys of the busStops object match the values of the
 * busStopID variable. Therefore we need to tell the compiler
 * that the busStops object is an object where the keys are
 * strings and the values have the shape of the BusStop interface.
 */

interface BusStop {
  ID: string;
  Name: string;
  Longitude: number;
  Latitude: number;
}

interface BusStops {
  [key: string]: BusStop;
}

/**
 * When importing a JSON file in ts, it's treated as ab 'any' type by default.
 * This means that ts doesn't have any information about the shape of the data.
 * By creating an interface that defines the structure of the JSON data, we
 * are telling ts what the data should look like.
 * The line below is a type assertion which tells typescript that the busStops
 * JSON should be treated as if it has the 'BusStop' type. The assignment of
 * busStopData is a new variable with the same data but with the type of 'BusStops'
 * We can the nuse busStopData in place of busStops in the rest of the code and
 * ts will understand the shape of the data and be able to check for type errors.
 */
const busStopData: BusStops = busStops as BusStops;

const cardStore = useStore();
/*
const splitKeys = Object.keys(cardStore.favouriteBusServices)
  .toString()
  .split("-");

My assumption previously was that because Object.keys(cardStore.favouriteBusServices) 
returns an array, to use the split() method, the data must first be a string and 
hence i chose the toString() method, and there would be no issues looping through it 
in <template> because split() method returns an array as well.

However, the previous method of doing things return me just one array that looks 
something like this if i have 4 key properties in the cardStore.

[
  "143",
  "20231,143M",
  "20231,30",
  "20231,79",
  "20231"
]

What i realise from your comment previously was that i need to split('-') for 
each of the key. This means i need to create a new array with the same number 
of elements but without changing the original array after changing it from an 
object to array using the Object.keys method.

Therefore I chose the .map) method because it does what I want, it allows me 
to iterate over the key values of the array and split them by the dash character, 
creating an array of arrays where each inner array contains the to values that 
were previously seperated by a dash. This way, I can use the v-for directive 
to loop through the array and assign the values to seperate variables, allowing 
these values to be accessible to the child components
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
      :busStopName="busStopData[busStopID].Name"
    />

    <LiveGif />

    <FavouriteBusServices
      v-for="[busNumber, busStopID] in splitKeys"
      :key="busNumber"
      :busNumber="busNumber"
      :busStopID="busStopID"
      :busStopName="busStopData[busStopID].Name"
    />
  </main>
</template>

<style>
.columns {
  border-radius: 15px;
}
</style>
