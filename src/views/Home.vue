<script setup>
// import SearchBar from "@/components/SearchBar.vue";
import BusCards from "@/components/BusCards.vue";
</script>

<template>
  <main>
    <nav
      class="navbar is-fixed top is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <div class="navbar-item">Shelby's Bus App</div>
        <a href="/Search" class="navbar-burger has-text-centered pt-4">
          <i class="fa fa-search" aria-hidden="true"></i>
        </a>
        <!-- navbar items, navbar burger... -->
      </div>
    </nav>
    <!-- <SearchBar /> -->
    <BusCards />
  </main>
</template>
