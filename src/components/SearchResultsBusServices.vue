<script setup lang="ts">
import { useStore } from "../stores/store";
import { computed } from "vue";
import Fuse from "fuse.js";
import allBus from "../assets/allBus.json";

const store = useStore();

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
 * Change to using Object.values instead because it contains all of the data that is in the original allBus JSON
 * whereby the name is required to signify which direction bus is going.
 */
const busArray = Object.values(allBus);

const fuse = new Fuse(busArray, options);

const results = computed(() => fuse.search(store.query, { limit: 10 }));
</script>

<template>
  <!-- 
      Only show the list of items if the query is not an empty string, which will change if
      there is input in the search box. 
    -->
  <div v-if="store.query !== ''" class="container">
    <p class="header is-5 has-text-centered mb-4">Bus Services</p>

    <div
      class="columns is-mobile has-background-link-light mb-4 mx-1"
      v-for="(result, i) in results"
      key="i"
    >
      <div
        class="column is-2 is-flex is-justify-content-center is-align-items-center"
      >
        {{ result.item.id }}
      </div>
      <div class="column">
        <router-link
          :to="{
            name: 'direction',
            params: {
              busNumber: result.item.id,
              busRoute: '0',
            },
          }"
          class="dropdown-item button is-info is-inverted is-rounded is-focused"
          v-if="result.item.name.indexOf('⟲') >= 0"
          >{{ result.item.name }}
        </router-link>

        <router-link
          :to="{
            name: 'direction',
            params: {
              busNumber: result.item.id,
              busRoute: '0',
            },
          }"
          class="dropdown-item button is-info is-inverted is-rounded is-focused"
          v-else="result.item.name.indexOf('⇄') >= 0"
          >{{ result.item.name.replace("⇄", "→") }}
        </router-link>
        <hr
          class="dropdown-divider"
          v-if="result.item.name.indexOf('⇄') >= 0"
        />

        <!-- 
                I think there are better ways of doing this line but not so sure because 
                reverse() can't come after replace() and can only come after split()
              -->
        <router-link
          :to="{
            name: 'direction',
            params: {
              busNumber: result.item.id,
              busRoute: '1',
            },
          }"
          class="dropdown-item button is-info is-inverted is-rounded is-focused"
          v-if="result.item.name.indexOf('⇄') >= 0"
          >{{ result.item.name.replace("⇄", "→").split("→").reverse()[0] }}
          →
          {{ result.item.name.replace("⇄", "→").split("→").reverse()[1] }}
        </router-link>
      </div>
    </div>
  </div>
</template>
