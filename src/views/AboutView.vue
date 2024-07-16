<template>
  <div class="about">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      showForm: false,
      operation: 'create', // 'create' or 'update'
      formData: {
        displayName: '',
        username: '',
        avatarUrl: ''
      },
      selectedUserId: null
    }
  },
  methods: {
    async fetchAllUsers() {
      this.callApi('GET', 'http://localhost:8000/users')
    },
    showCreateForm() {
      this.operation = 'create'
      this.showForm = true
      this.resetFormData()
    },
    showUpdateForm(user) {
      this.operation = 'update'
      this.showForm = true
      this.selectedUserId = user._id
      this.formData = { ...user }
    },
    async createUser() {
      await this.callApi('POST', 'http://localhost:8000/users', this.formData)
      this.showForm = false
      this.resetFormData()
      this.fetchAllUsers()
    },
    async updateUser() {
      await this.callApi('PUT', `http://localhost:8000/users/${this.selectedUserId}`, this.formData)
      this.showForm = false
      this.resetFormData()
      this.fetchAllUsers()
    },
    async deleteUser(userId) {
      await this.callApi('DELETE', `http://localhost:8000/users/${userId}`)
      this.fetchAllUsers()
    },
    resetFormData() {
      this.formData = {
        displayName: '',
        username: '',
        avatarUrl: ''
      }
    },
    async callApi(method, url, data = null) {
      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: data ? JSON.stringify(data) : null
        })
        if (method === 'GET') {
          const users = await response.json()
          this.users = users
        }
      } catch (error) {
        console.error('API call failed:', error)
      }
    }
  }
}
</script>

<style>
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
</style>
