<script setup>
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
  <nav
    class="navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <!-- This anker tag should return to the previous search result and it's state, not to a fresh Search page. Leaving it here for interactivity -->
      <a href="/Search" class="navbar-item">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </a>
      <div class="navbar-item">
        <i id="heart" class="far fa-heart" aria-hidden="true"></i>
      </div>
      <div class="navbar-burger pt-3 px-1">
        <a href="/Search" class="navbar-item">
          <i class="fa fa-search" aria-hidden="true"></i>
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
