<template>
  <div>
    <!-- <SearchBar /> -->
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SearchBar from "./components/SearchBar.vue";
</script>
