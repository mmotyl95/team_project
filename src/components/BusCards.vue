/ Cards.vue

<template>
  <div>
    <div v-for="card in cards" :key="card.id">
      <div>{{ card.text }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { usePinia } from "pinia";

export default defineComponent({
  setup() {
    const state = usePinia("cards", {
      cards: [
        { id: 1, text: "" },
        { id: 2, text: "" },
        { id: 3, text: "" },
      ],
    });

    return {
      cards: state.cards,
    };
  },
});
</script>
