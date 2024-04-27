<script setup>
import allBus from "../assets/allBus.json";
import busStop from "../assets/busStop.json";

const props = defineProps(["busNumber", "busStopID"]);

const busRoutes = allBus[props.busNumber].routes[0];

// console.log(busRoutes);
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
          <i class="fa fa-search"></i>
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
          <i class="fa fa-search"></i>
        </router-link>
      </div>
    </div>
  </nav>
  <!-- End of Navbar -->

  <router-link
    :to="{
      name: 'Timing',
      params: {
        busStopID: busStop[busRoute].ID,
        busStopName: busStop[busRoute].Name,
      },
    }"
    class="columns is-mobile has-background-link-light mb-4 mx-1"
    v-for="(busRoute, i) in busRoutes"
    :key="i"
  >
    <div class="column is-4">
      <p class="title is-4">{{ busStop[busRoute].ID }}</p>
    </div>
    <div class="column">
      <p class="title is-5">{{ busStop[busRoute].Name }}</p>
    </div>
  </router-link>
</template>

<style lang="scss" scoped></style>
