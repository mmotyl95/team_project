<script setup></script>

<template>
  <div class="bus-cards">
    <p class="header has-text-centered">Favourite Buses & Stops</p>

    <!-- <div v-for="card in cards" :key="card.id">
      <div>{{ card.text }}</div>
    </div> -->
    <div class="columns is-multiline is-3-desktop is-8-widescreen is-2-fullhd">
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
</template>

<style>
.column {
  border-color: blue;
}

.header {
  margin-bottom: 5%;
}
</style>
