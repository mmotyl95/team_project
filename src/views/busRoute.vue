<script setup lang="ts">
import { ref } from "vue";
import allBus from "../assets/allBus.json";
import busStop from "../assets/busStop.json";

const props = defineProps<{
  busNumber: string;
  busStopID: string;
}>();

interface AllBus {
  [key: string]: {
    name: string;
    routes: string[][];
  };
}

const allBusServices: AllBus = allBus as AllBus;

interface BusStops {
  [key: string]: {
    ID: string;
    Name: string;
    Longitude: number;
    Latitude: number;
    Street: string;
  };
}

const busStopData: BusStops = busStop as BusStops;
/* 
 If the busStopID matches one of the bus stop id in first array of route, display
 the first array of route, if it matches one of the bus stop id in the second 
 array of route, display the second array. How can I do it? Use conditional 
 checker v-if in our case so far does not seem to be possible cuz in router-link 
 element we use v-for and documentation say to not use v-if and v-for in the 
 same element. I cant see how to use v-if in the subsequent elements. 
 */

/* 
Original way of checking for busStopID in either of the array, but then i went 
to test and realized that the order is mixed up sometimes because in the array, 
the first and last busStopID is the same but has its place swapped which 
results in the wrong order of direction displayed sometimes when user clicks 
the bus service from timing page.

  const busRoutes = allBus[props.busNumber].routes[0].includes(props.busStopID)
  ? allBus[props.busNumber].routes[0]
  : allBus[props.busNumber].route[1];
 */

/* 
  Below is if we do it using a function and we have to add a @click directive 
  to the <router-link> element below. There is minimal performance difference 
  since our app is so simple and should not cause a significant concern. 
  However if the logic is used in multiple palces, it can be beneficial to 
  extract the logic into a function to avoid code duplication and improve maintainability.
 */

/* 
 Realized I need to assign busRoutes value to the first routes array for looping bus routes, 
 but if the routes have 2 arrays, continue the previous logic. Need to use function because
 we have to return the value if the first conditional statement is true.
 */
const busRoutes = ref<string[]>([]);

function checkBusStopID() {
  const firstRoute = allBusServices[props.busNumber].routes[0];
  // Didn't see the allBus json data clearly, there was actually 3 symbols.
  if (
    allBusServices[props.busNumber].name.includes("⟲") ||
    allBusServices[props.busNumber].name.includes("→")
  ) {
    busRoutes.value = firstRoute;
    return;
  }
  const secondRoute = allBusServices[props.busNumber].routes[1];
  if (
    firstRoute.includes(props.busStopID) &&
    secondRoute.includes(props.busStopID)
  ) {
    const firstIndex = firstRoute.indexOf(props.busStopID);
    const secondIndex = secondRoute.indexOf(props.busStopID);
    busRoutes.value = firstIndex < secondIndex ? firstRoute : secondRoute;
  } else {
    busRoutes.value = firstRoute.includes(props.busStopID)
      ? firstRoute
      : secondRoute;
  }
}
checkBusStopID();

/* 
Initialize different route array to be used as checker later and instantiate 
memory for busRoute but don't assign values to it because it will change its values later. 
*/
// const firstRoute = allBus[props.busNumber].routes[0];
// const secondRoute = allBus[props.busNumber].routes[1];
// let busRoutes;

/* 
Check both routes array whether the busStopID exist, this is for the first and
last value because theywill be in both arrays. If the busStopID exists in both array,
it then compares the index of the busStopID in the first array with the second array.
We then use a ternary operator to determine the direction of the bus. If the index in 
the first array is smaller than that of the second array, the bus is going in the 
direction of the first route, otherwise it is going in the direction of the second route.
 */

/* 
This method of doing things does not take into consideration that some routes array 
only have one array and thus for those routes, the secondRoute value is undefined which is a mistake.
*/

// if (
//   firstRoute.includes(props.busStopID) &&
//   secondRoute.includes(props.busStopID)
// ) {
//   const firstIndex = firstRoute.indexOf(props.busStopID);
//   const secondIndex = secondRoute.indexOf(props.busStopID);
//   busRoutes = firstIndex < secondIndex ? firstRoute : secondRoute;
// } else {
/* 
  Straightforward because if the busStopID exist only in one of the array, 
  just assign the busRoute array where the busStopID is found.
  */
//   busRoutes = firstRoute.includes(props.busStopID) ? firstRoute : secondRoute;
// }
</script>

<template>
  <!-- Navbar -->
  <nav
    class="navbar has-background-light mb-5"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <!-- 
        This back icon can't use router-link since it requires a ':to' and when we 
        implement saving of bus numbers in home page, we can't force this back icon to 
        a specific page since it might originate from home page or timing page. 
      -->
      <a @click="$router.go(-1)" class="navbar-item">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </a>
      <div class="navbar-item">Bus number {{ busNumber }}</div>

      <div class="navbar-burger pt-3 px-2">
        <router-link :to="{ name: 'Search' }" class="navbar-item">
          <i class="fa fa-search has-text-info"></i>
        </router-link>
      </div>
    </div>

    <!--
      Same issue with home page search icon, bulma burger allows a nice
      placement of search icon but it disappear when on wide desktop screen.
     -->
    <div class="navbar-menu">
      <div class="navbar-end">
        <router-link :to="{ name: 'Search' }" class="navbar-item">
          <i class="fa fa-search has-text-info"></i>
        </router-link>
      </div>
    </div>
  </nav>
  <!-- End of Navbar -->

  <router-link
    :to="{
      name: 'Timing',
      params: {
        busStopID: busRoute,
        busStopName: busStopData[busRoute].Name,
      },
    }"
    class="columns is-mobile has-background-link-light mb-4 mx-1"
    v-for="(busRoute, i) in busRoutes"
    :key="i"
  >
    <div class="column is-4">
      <p class="title is-4">{{ busRoute }}</p>
    </div>
    <div class="column">
      <p class="title is-5">{{ busStopData[busRoute].Name }}</p>
      <p class="subtitle is-6">
        {{ busStopData[busRoute].Street }}
      </p>
    </div>
  </router-link>
</template>

<style lang="scss" scoped></style>
