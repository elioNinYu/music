<template>
  <div id="app">
    <top />
    <index />
  </div>
</template>

<script>
import top from "./views/01.top";
import index from "./views/02.index";
export default {
  name: "app",
  components: {
    top,
    index,
  },
};
</script>

<style>
</style>
