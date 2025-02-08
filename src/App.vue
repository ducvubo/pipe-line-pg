<template>
  <div id="app">
    <h1 class="p-5 text-xl bg-green-600 font-bold text-white">PG Pipeline Dashboard</h1>
    <PipelineList />
  </div>
</template>

<script setup>
import PipelineList from './components/PipelineList.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  background-color: aliceblue;
  height: 100vh;
}
</style>
