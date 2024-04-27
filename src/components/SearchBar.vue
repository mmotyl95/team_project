<template>
  <div class="field has-addons has-addons-centered">
    <div class="control has-icons-left">
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
      <ul v-if="showResults">
        <li
          v-for="result in results"
          :key="result"
          @click="selectResult(result)"
        >
          {{ result }}
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

const query = ref("");
const results = ref([]);
const showResults = ref(false);

const search = () => {
  showResults.value = true;
};

const selectResult = (result) => {
  query.value = result;
  showResults.value = false;
};

// This function returns the bus arrival data base on bus stop code, therefore i need to link this function and give feed the bus code paramters dynamic value from the search box.
async function fetchBusService() {
  const busService = await fetch(
    `https://arrivelah2.busrouter.sg/?id=83139`
  ).then((response) => response.json());

  // console.log(busService);
}
// fetchBusService();

// This function fetches all the bus stops in Singapore and puts them an object, thus the busStop const is an object now.
async function fetchBusStops() {
  const busStops = await fetch(
    "https://data.busrouter.sg/v1/stops.min.json"
  ).then((response) => response.json());

  console.log(busStops);
}

fetchBusStops();
</script>

<style scoped></style>
