<script setup>
import { useStore } from "../stores/counter";
import { computed } from "vue";
import { useRouter } from "vue-router";
import Fuse from "fuse.js";
import allBus from "../assets/allBus.json";

const store = useStore();
const router = useRouter();

// Options to make search results more accurate and return less results if the search is more specific.
const options = {
  threshold: 0.3,
  distance: 20,
  includeMatches: true,
  keys: ["id"],
};

/**
 * allBus is a JSON file in an object format with curly braces, I was wondering why initially the computed
 * values does not return anything when trying to search and spotted the difference. The difference is that
 * formattedData which contains busStopID and busStopName data is an array. Therefore, we need to convert this
 * JSON object to an array using Object.keys to turn allBus into an array.
 */
const busArray = Object.keys(allBus);

const fuse = new Fuse(busArray, options);

const results = computed(() => fuse.search(store.query, { limit: 10 }));

const selectResult = (result) => {
  /**
   * Originlly the router push method was using path, that way is wrong as it
   * does not go to the timing page but we should use the name instead like
   * what we used in the router.js file.
   */

  // Redirect to the busRoute view and pass results as busNumber prop
  router.push({
    name: "busRoute",
    params: { busNumber: result.item },
  });
};
</script>

<template>
  <!-- 
      Only show the list of items if the query is not an empty string, which will change if
      there is input in the search box. To ensure the list of results is usable, we want the
      user to click on one of the result and show that value as the chosen one. 
    -->
  <div v-if="store.query !== ''" class="container">
    <p class="header is-5 has-text-centered mb-4">Bus Services</p>

    <div
      class="columns is-mobile has-background-link-light mb-4 mx-1"
      v-for="(result, i) in results"
      :key="i"
      @click="selectResult(result)"
    >
      <div class="column">
        <p class="title is-4">{{ result.item }}</p>
      </div>
    </div>
  </div>
</template>
