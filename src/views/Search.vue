<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "../stores/store";
import SearchResultsBusStops from "../components/SearchResultsBusStops.vue";
import SearchResultsBusServices from "../components/SearchResultsBusServices.vue";
import { onMounted } from "vue";

const store = useStore();

// Create specific variable name which in this case, reminds us that they are used to show the respective components.
const showBusStopSearchResults = ref(true);
const showBusServicesSearchResults = ref(true);

// Creates a reactive reference to the input element, with a type of HTMLInputElement
const inputRef = ref<HTMLInputElement | null>(null);

// When this page is loaded, we will focu on the input element.
onMounted(() => {
  if (inputRef.value) inputRef.value.focus();
});
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
    <a @click="$router.go(-1)" class="icon pt-4 pr-5">
      <i class="fa fa-arrow-left" aria-hidden="true"></i>
    </a>

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
        ref="inputRef"
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

  <div class="columns is-mobile mb-4 mx-1">
    <div class="column">
      <button
        class="button is-fullwidth is-rounded is-outlined"
        :class="{ 'is-active': showBusStopSearchResults }"
        @click="showBusStopSearchResults = !showBusStopSearchResults"
      >
        Bus Stops
      </button>
    </div>

    <div class="column">
      <button
        class="button is-fullwidth is-rounded is-outlined"
        :class="{ 'is-active': showBusServicesSearchResults }"
        @click="showBusServicesSearchResults = !showBusServicesSearchResults"
      >
        Bus Service
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
  max-height: 240px;
  overflow-x: hidden;
  overflow-y: auto;
}

.button.is-active {
  background-color: rgb(227, 196, 155);
  color: #fff;
  border-color: transparent;
}

.button.is-active:hover {
  background-color: rgb(198, 149, 88);
}
</style>
