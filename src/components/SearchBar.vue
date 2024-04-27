<template>
  <div class="field has-addons has-addons-centered">
    <div class="control has-icons-left">
      <!-- Binding this input element to a reactive property called query. When the user types into the input field, the search method is called, which fetches a list of suggestions based on the current value of query. The suggestions are then displayed in a list below the input field. -->
      <input
        class="input is-rounded is-hovered"
        type="text"
        placeholder="Search buses and bus stops..."
        v-model="query"
        @input="search"
      />
      <span class="icon is-left">
        <i class="fas fa-search"></i>
      </span>
      <!-- 
        Only show the unordered list of items when showResults turns true, which will be when there is input in the search box. To ensure the list of results is usable, we want the user to click on one of the result and show that value as the chosen one. 
      -->
      <ul class="search-result" v-if="showResults">
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
          v-for="result in results"
          :key="result"
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
import { ref } from "vue";

let query = ref("");
let results = ref([]);
let showResults = ref(false);

// When user clicks on one of the results, we need to close the list of results for a better user experience and assign the query value as the chosen result.
const selectResult = (result) => {
  query.value = result;
  showResults.value = false;
};

/*
 * Originally both api calls were seperate functions
 * but I require them to run at the same time but if
 * I just seperate their fetches into 2 different awaits,* the await keyword pauses the function so the second   * request won't happen till the first one finishes. We  * can have them both run at the sam time using the      * Promise.all() method. This method accepts a single    * argument, which is an array of promises, which makes response an array now.
 * https://dev.to/alexmercedcoder/making-multiple-api-calls-in-javascript-kip
 */
async function search() {
  const response = await Promise.all([
    // Fetches all the bus stops in Singapore
    fetch(`src/assets/formattedData.json`),

    //returns the bus arrival data base on bus stop code
    fetch(`https://arrivelah2.busrouter.sg/?id=83139`),
  ]);

  // busStops and busServices are both objects
  /* busStops have key values that are numerical which   * stands for the bus stop ID, each ID is an array with * 3 numerical key values which are lat, lon and name of bus stop.
   */
  const busStops = await response[0].json();

  /* busServices has an object string key value of      * "services" which is contain arrays, with each array
   * contains an object with the specifics of next bus arrival
   */
  const busServices = await response[1].json();

  // Stores the bus stop data in the results array
  results.value = busStops;

  // console.log(busServices);
  // console.log(busStops);

  // becomes true to show the list of results to user
  showResults.value = true;

  // let matches = 0;
  // if (JSON.stringify(busStops).includes(query.value.toLowerCase()))
  //   console.log("input match");

  return busStops.filter((result) =>
    result.toLowerCase().includes(query.value.toLowerCase())
  );
}
//     if (
//       result.Name.toLowerCase().includes(
//         query.value.toLowerCase() && matches < 10
//       )
//     )
//       console.log("Input value found)");
//     // matches++;
//     else {
//       console.log("input not found");
//     }
//     return result;
//   });

// const result = busStops.filter((data) => {
//   return Object.keys(data).some((key) => {
//     return JSON.stringify(data[key].trim().includes(query));
//   });
// });
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
