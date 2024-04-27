<script setup lang="ts">
import { useStore } from "../stores/store";
import { computed } from "vue";
import { ref } from "vue";
import Fuse from "fuse.js";
import allBus from "../assets/allBus.json";

const store = useStore();
/**
 * Error message appear: @click="showBusServicesRoute = showBusServicesRoute === i ? null : i"
 * Message: Type 'number | null' is not assignable to type 'null'. Type 'number' is not assignable to type 'null'.
 * The error message is telling me that I am trying to assign a value of type 'number | null' to a
 * variable from the ternary operator. There is no issue with the logic, we just need to tell the
 * compiler to expect that showBusServiceRoute will either be a number or null type.
 */
const showBusServicesRoute = ref<number | null>(null);

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
      :key="i"
    >
      <div class="column">
        <!-- 
          Okay this section was a pain in the ass. So originally I gave the variable a 
          true bool value and a @click = showBusServicesRoute != showBusServicesRoute, 
          this results in all of the dropdown to be toggleable at the same time which 
          is not what we wanted. Since we have to isolate the dropdown boxes, we can 
          use the index value from the v-for loop. To make use of the index value, we 
          first need to change the original bool value to a null value because it allows 
          us to distinguish betweeen a dropdown that has never been opened(null value) 
          and one that is currently opened(index value). This will ensure no dropdown 
          is open by default, we then use a ternary operator to check the showBusServicesRoute 
          variable for its value, if it has a null value, assign it the index value which will 
          open up the dropdown. While this happens, the is-active class will be activated because 
          the expression will become a true bool value, allowing us to toggle the dropdown.
         -->
        <div
          class="dropdown"
          :class="{ 'is-active': showBusServicesRoute === i }"
          @click="showBusServicesRoute = showBusServicesRoute === i ? null : i"
        >
          <div class="dropdown-trigger">
            <button
              class="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <span>{{ result.item.id }}</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>

          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <!-- 
                Only shows one dropdown option if the name contains a ⟲ symbol. 
                Change all the dropdown options to use router link and each of them 
                will pass either a value of 0 or 1 to bus direction route page for 
                the page to display the correct bus route path. Previous method of 
                using @click directive didn't allow us to pass different props for
                different routes.
              -->
              <router-link
                :to="{
                  name: 'direction',
                  params: {
                    busNumber: result.item.id,
                    busRoute: '0',
                  },
                }"
                class="dropdown-item"
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
                class="dropdown-item"
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
                class="dropdown-item"
                v-if="result.item.name.indexOf('⇄') >= 0"
                >{{
                  result.item.name.replace("⇄", "→").split("→").reverse()[0]
                }}
                →
                {{ result.item.name.replace("⇄", "→").split("→").reverse()[1] }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
