<template>
  <div id="popup">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/skull.png" width="125" height="125" />
      <div class="wrapper">
        <nav>
          <RouterLink to="/todo"><button>Todo</button></RouterLink>
          <RouterLink to="/"><button>Home</button></RouterLink>
          <RouterLink to="/prompt"><button>PromptGPT</button></RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
    <!-- <div class="about">
      <h1>This is an about page</h1>
      <button @click="fetchAllUsers">Get All Users</button>
      <button @click="showCreateForm">Create User</button>
      <div v-if="showForm">
        <form @submit.prevent="operation === 'create' ? createUser() : updateUser()">
          <input v-model="formData.displayName" placeholder="Display Name" required />
          <input v-model="formData.username" placeholder="Username" required />
          <input v-model="formData.avatarUrl" placeholder="Avatar URL" />
          <button type="submit">{{ operation === 'create' ? 'Create' : 'Update' }} User</button>
        </form>
      </div>
      <div v-for="user in users" :key="user._id" class="user">
        <h2>{{ user.displayName }}</h2>
        <p>Username: {{ user.username }}</p>
        <img :src="user.avatarUrl" alt="User Avatar" width="100" />
        <button @click="showUpdateForm(user)">Update</button>
        <button @click="deleteUser(user._id)">Delete</button>
      </div>
    </div> -->

    <!-- <RouterView />

    <RouterLink to="/todo">
      <button>Todo</button>
    </RouterLink> -->
  </div>
</template>

<!-- <script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

interface User {
  _id: string
  displayName: string
  username: string
  avatarUrl?: string
}

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Popup',
  data() {
    return {
      users: [] as User[],
      showForm: false,
      operation: 'create' as 'create' | 'update',
      formData: {
        displayName: '',
        username: '',
        avatarUrl: ''
      },
      selectedUserId: null as string | null
    }
  },
  methods: {
    async fetchAllUsers() {
      await this.callApi('GET', 'http://localhost:8000/users')
    },
    showCreateForm() {
      this.operation = 'create'
      this.showForm = true
      this.resetFormData()
    },
    showUpdateForm(user: User) {
      this.operation = 'update'
      this.showForm = true
      this.selectedUserId = user._id
      this.formData = { ...user, avatarUrl: user.avatarUrl || '' }
    },
    async createUser() {
      await this.callApi('POST', 'http://localhost:8000/users', this.formData)
      this.showForm = false
      this.resetFormData()
      await this.fetchAllUsers()
    },
    async updateUser() {
      if (this.selectedUserId) {
        await this.callApi(
          'PUT',
          `http://localhost:8000/users/${this.selectedUserId}`,
          this.formData
        )
        this.showForm = false
        this.resetFormData()
        await this.fetchAllUsers()
      }
    },
    async deleteUser(userId: string) {
      await this.callApi('DELETE', `http://localhost:8000/users/${userId}`)
      await this.fetchAllUsers()
    },
    resetFormData() {
      this.formData = {
        displayName: '',
        username: '',
        avatarUrl: ''
      }
      this.selectedUserId = null
    },
    async callApi(method: string, url: string, data: Record<string, unknown> | null = null) {
      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: data ? JSON.stringify(data) : null
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        if (method === 'GET') {
          const users = await response.json()
          this.users = users
        }
      } catch (error) {
        console.error('API call failed:', error)
      }
    }
  }
})
</script> -->

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
