<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <TodoList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoList from "@/components/TodoList.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    TodoList,
  },
});
</script>
