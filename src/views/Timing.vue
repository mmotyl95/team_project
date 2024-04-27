<script setup>
import SearchBar from "../components/SearchBar.vue";

async function getBusArrival(result) {
  /**
   * Get the bus arrival data with the bus stop code.
   * busServices has an object string key value of "services" which contains arrays,
   * with each array contains an object with the specifics of next bus arrival
   */
  const busServices = await fetch(
    `https://arrivelah2.busrouter.sg/?id=${result}`
  ).then((res) => res.json());
  console.log(busServices);

  return busServices;
}
getBusArrival();
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a href="" class="navbar-item">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </a>
        <div class="navbar-item">
          <SearchBar @select-result="getBusArrival(result)" />
        </div>
        <a href="" class="navbar-item">
          <i id="heart" class="far fa-heart" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
#heart:hover {
  color: red;
}
</style>
