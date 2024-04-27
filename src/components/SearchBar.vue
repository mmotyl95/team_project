<template>
  <div class="field has-addons has-addons-centered">
    <div class="control has-icons-left">
      <!--
        Binding this input element to a reactive property called query. When the user
        types into the input field, the computed function will listen for changes in the query,
        which fetches a list of suggestions based on the current value of query. The suggestions 
        are then displayed in a list below the input field.
      -->
      <input
        class="input is-rounded is-hovered"
        type="text"
        placeholder="Search buses and bus stops..."
        v-model="query"
      />

      <span class="icon is-left">
        <i class="fas fa-search"></i>
      </span>

      <!-- 
        Only show the unordered list of items if the query is not an empty string, which 
        will change if there is input in the search box. To ensure the list of results is 
        usable, we want the user to click on one of the result and show that value as the chosen one. 
      -->
      <ul class="search-result" v-if="query !== ''">
        <!-- Bus Stop Code:
        <li
          class="search-results"
          v-for="result in results"
          :key="result"
          @click="selectResult(result)"
        >
          {{ result.ID }}
        </li> -->
        Bus Stop Name:
        <li
          class="search-results"
          v-for="(result, i) in results"
          :key="i"
          @click="selectResult(result)"
        >
          {{ result.Name }}
        </li>
      </ul>
    </div>
    <div class="control">
      <button class="button is-info is-rounded">Search</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

/**
 * busStops have key values that are numerical which stands for the bus stop ID,
 * each ID is an array with * 3 numerical key values which are lat, lon and name of bus stop.
 */
import busStops from "../assets/formattedData.json";

const query = ref("");
const showResults = ref(false);

/**
 * Search results of the bus stop name, will be a list of bus stop objects
 */
const results = computed(function () {
  /**
   * Lowercase the query once to use for search, rather than calling
   * the `toLowerCase` method repeatedly.
   */
  const queryString = query.value.toLowerCase();
  const listOfBustStopsThatMatch = [];

  for (const busStop of busStops)
    if (busStop.Name.toLowerCase().includes(queryString)) {
      listOfBustStopsThatMatch.push(busStop);

      // Return the array early if there is already 5 matches or more
      if (listOfBustStopsThatMatch.length >= 5) return listOfBustStopsThatMatch;
    }

  return listOfBustStopsThatMatch;
});

/**
 * When user clicks on one of the results, we need to close the list of results
 * for a better user experience and assign the query value as the chosen result.
 */
const selectResult = (result) => {
  query.value = result;
  showResults.value = false;
};

// 83139 -- Example bus code
/**
 * Function to get bus arrival data with a given bus stop code
 */
async function getBusArrivalData(busStopCode) {
  /**
   * Get the bus arrival data with the bus stop code.
   * busServices has an object string key value of "services" which contains arrays,
   * with each array contains an object with the specifics of next bus arrival
   */
  const busServices = await fetch(
    `https://arrivelah2.busrouter.sg/?id=${busStopCode}`
  ).then((res) => res.json());

  return busServices;
}
</script>

<style scoped>
.search-results {
  list-style: none;
  margin: 10;
  padding: 10;
}

.search-result {
  position: relative;
  border: 1px solid #ccc;
  padding: 10px;
  width: inherit;
}
</style>
