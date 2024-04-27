<script setup></script>

<template>
  <div>
    <div v-for="card in cards" :key="card.id">
      <div>{{ card.text }}</div>
    </div>
  </div>
</template>
