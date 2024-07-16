<template>
  <div class="container">
    <h2>{{ formState }} Post</h2>
    <form @submit.prevent="formState.state === 'Create' ? createPost() : updatePost()">
      <input v-model="currentPost.title" placeholder="Title" required />
      <input v-model="currentPost.content" placeholder="Content" required />
      <button type="submit">{{ formState }}</button>
    </form>

    <h2>Posts</h2>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>
            <button @click="selectPost(post)">View</button>
            <button @click="deletePost(post.id as string)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import axios from 'axios'

interface Post {
  id?: string
  title: string
  content: string
}

export default defineComponent({
  name: 'TodoPopup',
  setup() {
    const posts = reactive<Post[]>([])
    const currentPost = reactive<Post>({ title: '', content: '' })
    const formState = reactive({ state: 'Create' })

    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/posts')
        posts.splice(0, posts.length, ...response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    const createPost = async () => {
      try {
        await axios.post('http://localhost:8000/posts', currentPost)
        fetchPosts()
        Object.assign(currentPost, { title: '', content: '' })
      } catch (error) {
        console.error('Error creating post:', error)
      }
    }

    const updatePost = async () => {
      if (currentPost.id) {
        try {
          await axios.patch(`http://localhost:8000/posts/${currentPost.id}`, currentPost)
          fetchPosts()
          Object.assign(currentPost, { title: '', content: '' })
          formState.state = 'Create'
        } catch (error) {
          console.error('Error updating post:', error)
        }
      }
    }

    const deletePost = async (id: string) => {
      try {
        await axios.delete(`http://localhost:8000/posts/${id}`)
        fetchPosts()
      } catch (error) {
        console.error('Error deleting post:', error)
      }
    }

    const selectPost = (post: Post) => {
      Object.assign(currentPost, post)
      formState.state = 'Update'
    }

    onMounted(fetchPosts)

    return {
      posts,
      currentPost,
      formState,
      fetchPosts,
      createPost,
      updatePost,
      deletePost,
      selectPost
    }
  }
})
</script>

<style scoped>
/* Container */
.container {
  font-family: 'Press Start 2P', cursive;
  color: #cccccc;
  background-color: #333333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px #000000;
}

/* Headings */
h2 {
  font-size: 1.2em;
  text-shadow: 2px 2px 0 #000000;
  margin-bottom: 20px;
}

/* Form */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
}

input {
  padding: 10px;
  border: 2px solid #666666;
  border-radius: 5px;
  background-color: #444444;
  color: #ffffff;
  font-size: 0.9em;
  text-shadow: 1px 1px 0 #000000;
}

button {
  padding: 10px 20px;
  border: 2px solid #666666;
  border-radius: 5px;
  background-color: #555555;
  color: #ffffff;
  font-size: 0.9em;
  cursor: pointer;
  text-shadow: 1px 1px 0 #000000;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #777777;
}

/* Table */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #666666;
  text-align: left;
}

th {
  background-color: #444444;
  text-shadow: 1px 1px 0 #000000;
}

td {
  background-color: #555555;
}

td button {
  margin-right: 5px;
}
</style>
