<template>
  <div class="home-container">
    <PromptList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PromptList from './PromptList.vue'

export default defineComponent({
  components: {
    PromptList
  }
})
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2d2d2d;
  color: #fff;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
}
</style>
