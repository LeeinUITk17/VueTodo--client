<template>
  <div class="container">
    <h1 class="title">Login with Google</h1>
    <button @click="login" class="btn">Login</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { store } from '@/stores'; 

export default defineComponent({
  name: 'PopupLogin',
  setup() {
    const router = useRouter();

    const login = async () => {
      try {
        const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        const clientId = '208940111876-v7gociqk9vsa1qru5c17lvbti6rdtdek.apps.googleusercontent.com';
        const redirectUri = chrome.identity.getRedirectURL('oauth2');
        const scope = 'https://www.googleapis.com/auth/userinfo.email';

        const url = `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;

        chrome.identity.launchWebAuthFlow({ url, interactive: true }, async (redirectUrl) => {
          if (chrome.runtime.lastError || (redirectUrl && redirectUrl.includes('error'))) {
            console.error('Authentication failed:', chrome.runtime.lastError);
            return;
          }

          const params = new URLSearchParams(new URL(redirectUrl as string).hash.slice(1));
          const token = params.get('access_token');

          if (token) {
            const response = await fetch(`http://localhost:8000/auth/google?token=${token}`);
            const user = await response.json();
            console.log('Authenticated user:', user);

            chrome.storage.local.set({ user }, () => {
              console.log('User data saved.');
              store.setAuthenticated(true);
              router.push({ name: 'home' }); 
            });
          }
        });
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    return {
      login,
    };
  },
});
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'); */

.container {
  text-align: center;
  background-color: #3b3b3b;
  padding: 20px;
  border: 3px solid #444;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
  padding: 10px 20px;
  color: #e0e0e0;
  background-color: #444;
  border: 2px solid #555;
}

.btn {
  font-size: 16px;
  padding: 10px 20px;
  color: #e0e0e0;
  background-color: #444;
  border: 2px solid #555;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.btn:hover {
  background-color: #555;
  transform: scale(1.05);
}
</style>
