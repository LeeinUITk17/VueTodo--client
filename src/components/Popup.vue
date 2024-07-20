<template>
  
  <div id="popup">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/skull.png" width="125" height="125" />
      <div class="wrapper">
        <nav v-if="!store.isAuthenticated">
          <RouterLink to="/"><button>Login</button></RouterLink>       
        </nav>
        <nav v-if="store.isAuthenticated">
          <RouterLink to="/prompt"><button>PromptGPT</button></RouterLink>
          <RouterLink to="/todo"><button>Todo</button></RouterLink>
          <button @click="logout">Logout</button>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<script lang="ts">
import { store } from '@/stores';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'Popup',
  setup() {
    const router = useRouter();
    const logout = () => {
      chrome.storage.local.remove('user', () => {
        console.log('User data removed.');
        store.resetAuthenticated(); 
        router.push({ name: 'login' }); 
      });
    };
    return { store, logout };
  },
});
</script>

<style>
#popup {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}

.user {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border: 2px solid #f0f0f0;
  border-radius: 5px;
  background-color: #070606;
  color: #ffffff;
  font-size: 0.9em;
  cursor: pointer;
  text-shadow: 1px 1px 0 #000000;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e1dc90;
}
</style>
