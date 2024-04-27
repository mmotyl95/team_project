<script setup lang="ts">
import { useStore } from "../stores/store";
import { computed } from "vue";
import { useRouter } from "vue-router";
import Fuse from "fuse.js";

/**
 * busStops have key values that are numerical which stands for the bus stop ID,
 * each ID is an array with * 3 numerical key values which are lat, lon and name of bus stop.
 */
import busStops from "../assets/formattedData.json";

const store = useStore();
const router = useRouter();

// Options to make search results more accurate and return less results if the search is more specific.
const options = {
  threshold: 0.3,
  distance: 20,
  includeMatches: true,
  keys: ["ID", "Name"],
};

const fuse = new Fuse(busStops, options);

const results = computed(() => fuse.search(store.query, { limit: 10 }));

/**
 * Before giving the result param a type, there was an error that says:
 * Parameter 'result' implicitly has an 'any' type. 
 * This error occurs because typescript does not know the shape of the
 * result object element. Example of result object elemnt:
 * {
    "item": {
        "ID": "12021",
        "Name": "Bef Moonbeam Wk",
        "Longitude": 103.78243,
        "Latitude": 1.31908
    },
    "refIndex": 192,
    "matches": [
        {
            "indices": [
                [
                    0,
                    1
                ]
            ],
            "value": "12021",
            "key": "ID"
        }
    ]
}
 * Therefore, creating an interface with the necessary properties allows
 * typescript to understand the shape of the result object. 
 */
interface Item {
  ID: string;
  Name: string;
  Longitude: number;
  Latitude: number;
}

const selectResult = (result: Item) => {
  /**
   * Originlly the router push method was using path, that way is wrong as it
   * does not go to the timing page but we should use the name instead like
   * what we used in the router.js file.
   */

  // Redirect to the Timing view and pass results as busStopID prop
  router.push({
    name: "Timing",
    params: { busStopID: result.ID, busStopName: result.Name },
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
    <p class="header is-5 has-text-centered mb-4">Bus Stop Name</p>

    <!-- On the left side of the "in" keyword, it contains the result element of the results aray 
      which is on the right side. What I did not look at was the shape of the results array. 
      The output was in an 'item' which contains the data I need (ID & Name). So without thinking I went
      to give the results array a dot item which should be remembered forever as something I should 
      never do again. To access the values in an object we use dot notation. Since the ID & name data 
      is stored in the item key, we can simply just .item the result element to access it. -->
    <div
      class="columns is-mobile has-background-link-light mb-4 mx-1"
      v-for="(result, i) in results"
      :key="i"
      @click="selectResult(result.item)"
    >
      <div class="column is-4">
        <p class="title is-4">{{ result.item.ID }}</p>
      </div>
      <div class="column">
        <p class="title is-5">{{ result.item.Name }}</p>
      </div>
    </div>
  </div>
</template>
