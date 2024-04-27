<script setup>
// Define props that is used or busStopID and busStopName
const props = defineProps(["busStopID", "busStopName"]);

/**
 * Get the bus arrival data with the bus stop code. busServices
 * has an object string key value of "services" which contains arrays,
 * with each array contains an object with the specifics of next bus arrival
 */
const getBusArrival = async (busStopID) =>
  fetch(`https://arrivelah2.busrouter.sg/?id=${busStopID}`).then((res) =>
    res.json()
  );

const busServices = await getBusArrival(props.busStopID);

function favourite() {
  console.log("saved");
}
</script>

<template>
  <nav
    class="navbar has-background-light mb-5"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <!--
        This anker tag should return to the previous search result and it's
        state, not to a fresh Search page. Leaving it here for interactivity.
      -->
      <a href="/Search" class="navbar-item">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </a>
      <div class="navbar-item">
        <i
          id="heart"
          class="far fa-heart"
          aria-hidden="true"
          @click="favourite"
        ></i>
      </div>
      <div class="navbar-item">{{ busStopName }}</div>
      <div class="navbar-burger pt-3 px-2">
        <a href="/Search" class="navbar-item">
          <i class="fa fa-search"></i>
        </a>
      </div>
    </div>

    <!--
      Same issue with home page search icon, bulma burger allows a nice
      placement of search icon but it disappear when on wide desktop screen.
     -->
    <div class="navbar-menu">
      <div class="navbar-end">
        <a href="/Search" class="navbar-item">
          <i class="fa fa-search"></i>
        </a>
      </div>
    </div>
  </nav>

  <!--
    Originally used bulma's level for timing to be displayed horizontally,
    but when all the values are loop through using the v-for directive,
    not all of the values are aligned centered. Therefore we change to columns.
   -->
  <div
    class="columns is-mobile has-background-link-light mb-4 mx-1"
    v-for="(busService, i) in busServices.services"
    :key="i"
  >
    <div class="column has-text-centered">
      <p class="title">
        {{ busService.no }}
      </p>
    </div>
    <div class="column has-text-centered">
      <p class="heading">next</p>

      <!--
          (?.) aka optional chanining access an object's property or call a function.
          If the object accessed or function called is undefined or null, it returns
          undefined instead of throwing an error. This statement means if busService
          is undefined or null, the whole statement will be undefine, if it passes
          busService and gets to next and it is undefined or null as well, the whole
          statement throws a undefined value instead of an error. This is needed since
          the api might not have data for the 3rd estimated time and hence we do not want
          the whole app to crash because it did when some next3 values are null/undefined.
         -->
      <p v-if="busService?.next?.duration_ms" class="title is-5">
        {{
          /**
           * When the this gets divided by 60000, it
           * returns time in minutes. If this value is
           * lesser than 1 minute, we want the app to
           * show the string "Arr"
           *  */
          Math.floor(busService.next.duration_ms / 60000) < 1
            ? "Arr"
            : Math.floor(busService.next.duration_ms / 60000)
        }}
      </p>
    </div>
    <div class="column has-text-centered">
      <p class="heading">Second</p>
      <p v-if="busService?.next2?.duration_ms" class="title is-5">
        {{ Math.floor(busService.next2.duration_ms / 60000) }}
      </p>
    </div>
    <div class="column has-text-centered">
      <p class="heading">Third</p>
      <p v-if="busService?.next3?.duration_ms" class="title is-5">
        {{ Math.floor(busService.next3.duration_ms / 60000) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
#heart:hover {
  color: red;
  transform: scale(1.5);
}

.columns {
  border-radius: 15px;
}
</style>
