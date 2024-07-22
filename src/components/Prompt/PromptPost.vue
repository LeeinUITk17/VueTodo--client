<template>
  <div class="form-container">
    <h2>Create New Prompt</h2>
    <form @submit.prevent="handleSubmit" class="prompt-form">
      <div class="form-field">
        <label for="name">Name</label>
        <input id="name" v-model="formData.name" placeholder="Enter template name" />
      </div>
      <div class="form-field">
        <label for="description">Description</label>
        <input id="description" v-model="formData.description" placeholder="Enter template description" />
      </div>
      <div class="form-field">
        <label for="language">Language</label>
        <select id="language" v-model="formData.language">
          <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
        </select>
      </div>
      <div class="form-field">
        <label for="type">Type</label>
        <select id="type" v-model="formData.type">
          <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
      <button type="submit">Create Prompt</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import router from '@/router';

export default defineComponent({
  props: {
    template: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const formData = ref({
      name: '',
      description: '',
      language: '',
      type: '',
    });

    const languages = ref([
      'JAVA', 'JAVASCRIPT', 'PYTHON', 'CSHARP', 'PHP', 'RUBY', 'GO', 'SWIFT', 'KOTLIN', 'TYPESCRIPT', 'HTML', 'CSS', 'SQL', 'PERL', 'LUA',
    ]);

    const types = ref([
      'CODE_GENERATION', 'DEBUGGING', 'CODE_REVIEW',
    ]);

    const handleSubmit = async () => {
      try {
        await axios.post('http://localhost:8000/prompt', formData.value);
        alert('Prompt created successfully!');
        router.push({ name: 'home' });
      } catch (error) {
        console.error('Error creating prompt:', error);
      }
    };

    return {
      formData,
      languages,
      types,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.form-container {
  background-color: #3b3b3b;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin-top: 20px;
}

.prompt-form {
  display: flex;
  flex-direction: column;
}

.form-field {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #5c5c5c;
  border-radius: 5px;
  background-color: #4a4a4a;
  color: #fff;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #5c5c5c;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #6c6c6c;
}

h2 {
  font-size: 1.2rem;
}
</style>
