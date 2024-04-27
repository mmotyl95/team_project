<template>
  <div class="field has-addons has-addons-centered">
    <div class="control has-icons-left">
      <input
        class="input is-rounded is-hovered"
        type="text"
        placeholder="Search buses and bus stops..."
        v-model="query"
        @input="search"
      />
      <span class="icon is-left">
        <i class="fas fa-search"></i>
      </span>
      <ul v-if="showResults">
        <li
          v-for="result in results"
          :key="result"
          @click="selectResult(result)"
        >
          {{ result }}
        </li>
      </ul>
    </div>
    <div class="control">
      <button class="button is-info is-rounded">Search</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const query = ref("");
const results = ref([]);
const showResults = ref(false);

const search = () => {
  showResults.value = true;
};

const selectResult = (result) => {
  query.value = result;
  showResults.value = false;
};
</script>

<style scoped></style>
