<script setup>
import { useStore } from "../stores/counter";

const cardStore = useStore();
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
        <!-- 
          Navbar burger only is shown on touch devices so there is a navbar menu below with the same exact icons and routing to search page. But if navbar-burger is removed, the search icon will disappear in mobile view although the navbar-end is present. Therefore an addition icon for navbar-menu is needed
         -->
        <a href="/Search" class="navbar-burger has-text-centered pt-4">
          <i class="fa fa-search"></i>
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <a href="/Search" class="navbar-item">
            <i class="fa fa-search"></i>
          </a>
        </div>
      </div>
    </nav>

    <div class="bus-cards">
      <p class="header has-text-centered">Favourite Buses & Stops</p>

      <div
        class="columns is-multiline is-3-desktop is-8-widescreen is-2-fullhd"
      >
        <div class="column is-full">
          <p class="notification is-primary">
            Bus Stop Code||||
            <span class="has-text-right is-capitalized">Bus stop name</span>
          </p>
        </div>
        <div class="column is-full">
          <p class="notification is-primary">
            Bus Stop Code||||
            <span class="has-text-right is-capitalized">Bus stop name</span>
          </p>
        </div>
        <div class="column is-full">
          <p class="notification is-primary">
            Bus Stop Code||||
            <span class="has-text-right is-capitalized">Bus stop name</span>
          </p>
        </div>
        <div class="column is-full">
          <p class="notification is-primary">
            Bus Stop Code||||
            <span class="has-text-right is-capitalized">Bus stop name</span>
          </p>
        </div>
      </div>
    </div>

    {{ cardStore.count }}
  </main>
</template>

<style>
.column {
  border-color: blue;
}

.header {
  margin-bottom: 5%;
}
</style>
