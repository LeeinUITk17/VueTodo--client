<template>
  <div class="list-container">
    <h2>Prompt Templates</h2>
    <ul class="template-list">
      <li
        v-for="(template, index) in templates"
        :key="index"
        @click="selectTemplate(template)"
        class="template-item"
      >
        {{ template.description }}
      </li>
    </ul>
    <PromptForm v-if="selectedTemplate" :template="selectedTemplate" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
import PromptForm from './PromptForm.vue'

interface Field {
  name: string
  label: string
  placeholder: string
}

interface Template {
  name: string
  description: string
  text: string
  fields: Field[]
}

export default defineComponent({
  components: {
    PromptForm
  },
  setup() {
    const templates = ref<Template[]>([])
    const selectedTemplate = ref<Template | null>(null)

    const fetchTemplates = async () => {
      try {
        const response = await axios.get('http://localhost:8000/prompt')
        templates.value = response.data.map(
          (item: { name: any; language: any; description: any }) => ({
            name: item.name,
            description: item.description,
            text: `${item.name},${item.language} about {{keyword}} with language is {{language}}.`,
            fields: [{ name: 'keyword', label: 'Keyword', placeholder: 'Enter your keyword' },
            { name: 'language', label: 'Language', placeholder: 'Select language', options: ['English', 'Vietnamese', 'Japanese'] }
            ]
          })
        )
      } catch (error) {
        console.error('Error fetching templates:', error)
      }
    }

    const selectTemplate = (template: Template) => {
      selectedTemplate.value = template
    }

    onMounted(fetchTemplates)

    return {
      templates,
      selectedTemplate,
      selectTemplate
    }
  }
})
</script>

<style scoped>
.list-container {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  background-color: #3b3b3b;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.template-list {
  list-style: none;
  padding: 0;
}

.template-item {
  padding: 10px;
  margin: 5px 0;
  background-color: #4a4a4a;
  border: 1px solid #5c5c5c;
  cursor: pointer;
  transition: background-color 0.3s;
}

.template-item:hover {
  background-color: #5c5c5c;
}

h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
}
</style>
