<script setup>
import { ref } from "vue";
import { useStore } from "../stores/store";
import SearchResultsBusStops from "../components/SearchResultsBusStops.vue";
import SearchResultsBusServices from "../components/SearchResultsBusServices.vue";

const store = useStore();

// Create specific variable name which in this case, reminds us that they are used to show the respective components.
const showBusStopSearchResults = ref(true);
const showBusServicesSearchResults = ref(true);

/**
 * Original way of implementing autocomplete search function before importing fuse.
 * Search results of the bus stop name, will be a list of bus stop objects
 */
// const results = computed(function () {

/**
 * Lowercase the query once to use for search, rather than calling
 * the `toLowerCase` method repeatedly.
 */
// const queryString = store.query.toLowerCase();
// const listOfBustStopsThatMatch = [];
// for (const busStop of busStops)
//   if (
//     busStop.Name.toLowerCase().includes(queryString) ||
//     busStop.ID.includes(queryString)
//   ) {
//     listOfBustStopsThatMatch.push(busStop);
//     // Return the array early if there is already 10 matches or more
//     if (listOfBustStopsThatMatch.length >= 10)
//       return listOfBustStopsThatMatch;
//   }
// return listOfBustStopsThatMatch;
// });
</script>

<template>
  <div class="field has-addons has-addons-centered">
    <router-link :to="{ name: 'home' }" class="icon pt-4 pr-5">
      <i class="fa fa-arrow-left" aria-hidden="true"></i>
    </router-link>

    <!--
          Binding this input element to a reactive property called query. When the user
          types into the input field, the computed function will listen for changes in the query,
          which fetches a list of suggestions based on the current value of query. The suggestions 
          are then displayed in a list below the input field.
        -->
    <div class="control has-icons-left has-icons-right">
      <input
        class="input"
        type="text"
        placeholder="Search buses and bus stops..."
        v-model="store.query"
      />
      <span class="icon is-left">
        <i class="fas fa-search"></i>
      </span>
      <!-- Show x icon only if query has value. -->
      <span v-if="store.query !== ''" class="icon is-right">
        <i @click="store.clearInput" class="fa-regular fa-x is-clickable"></i>
      </span>
    </div>
  </div>

  <div class="columns is-mobile">
    <div class="column mr-5">
      <button
        class="button"
        :class="{ 'is-success': showBusStopSearchResults }"
        @click="showBusStopSearchResults = !showBusStopSearchResults"
      >
        Bus Stops
      </button>
    </div>

    <div class="column">
      <button
        class="button"
        :class="{ 'is-success': showBusServicesSearchResults }"
        @click="showBusServicesSearchResults = !showBusServicesSearchResults"
      >
        Bus Service only
      </button>
    </div>
  </div>

  <SearchResultsBusServices
    class="vertical"
    v-if="showBusServicesSearchResults"
  />
  <hr />
  <SearchResultsBusStops class="vertical" v-if="showBusStopSearchResults" />
</template>

<style>
.vertical {
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
