<script setup>
import { computed } from "vue";

/**
 * busStops have key values that are numerical which stands for the bus stop ID,
 * each ID is an array with * 3 numerical key values which are lat, lon and name of bus stop.
 */
import busStops from "../assets/formattedData.json";
import { useRouter } from "vue-router";
import { useStore } from "../stores/counter";

const router = useRouter();
const store = useStore();

/**
 * Search results of the bus stop name, will be a list of bus stop objects
 */
const results = computed(function () {
  /**
   * Lowercase the query once to use for search, rather than calling
   * the `toLowerCase` method repeatedly.
   */
  const queryString = store.query.toLowerCase();
  const listOfBustStopsThatMatch = [];

  for (const busStop of busStops)
    if (
      busStop.Name.toLowerCase().includes(queryString) ||
      busStop.ID.includes(queryString)
    ) {
      listOfBustStopsThatMatch.push(busStop);

      // Return the array early if there is already 10 matches or more
      if (listOfBustStopsThatMatch.length >= 10)
        return listOfBustStopsThatMatch;
    }

  return listOfBustStopsThatMatch;
});

const selectResult = (result) => {
  // Originlly the router push method was using path, that way is wrong as it does not go to the timing page but we should use the name instead like what we used in the router.js file.

  // Redirect to the Timing view and pass results as busStopID prop
  router.push({
    name: "Timing",
    params: { busStopID: result.ID, busStopName: result.Name },
  });
};
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
      <span v-if="store.query !== ''" class="icon is-right">
        <i @click="store.clearInput" class="fa-regular fa-x"></i>
      </span>
    </div>
  </div>

  <!-- 
      Only show the list of items if the query is not an empty string, which 
      will change if there is input in the search box. To ensure the list of results is 
      usable, we want the user to click on one of the result and show that value as the chosen one. 
    -->
  <div v-if="store.query !== ''" class="container">
    <p class="header is-5 has-text-centered">Bus Stop Name</p>
    <div
      class="columns is-mobile has-background-link-light mb-4 mx-1"
      v-for="(result, i) in results"
      :key="i"
      @click="selectResult(result)"
    >
      <div class="column is-4">
        <p class="title is-4">{{ result.ID }}</p>
      </div>
      <div class="column">
        <p class="title is-5">{{ result.Name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fa-regular {
  pointer-events: all;
  cursor: pointer;
}
</style>
