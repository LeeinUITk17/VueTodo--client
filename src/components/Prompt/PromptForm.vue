<template>
  <div class="form-container">
    <h2>Prompt Form</h2>
    <form @submit.prevent="handleSubmit" class="prompt-form">
      <div v-for="(field, index) in template.fields" :key="index" class="form-field">
        <label :for="field.name">{{ field.label }}</label>
        <input v-if="!field.options" :id="field.name" v-model="formData[field.name]" :placeholder="field.placeholder" />
        <select v-else :id="field.name" v-model="formData[field.name]">
          <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
      <button type="submit">Generate Prompt</button>
    </form>
    <div v-if="generatedPrompt" class="generated-prompt">
      <h3>Generated Prompt</h3>
      <p>{{ generatedPrompt }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

interface Field {
  name: string;
  label: string;
  placeholder: string;
  options?: string[];
}

interface Template {
  text: string;
  fields: Field[];
}

export default defineComponent({
  props: {
    template: {
      type: Object as PropType<Template>,
      required: true
    }
  },
  data() {
    return {
      formData: {} as { [key: string]: string },
      generatedPrompt: ''
    };
  },
  methods: {
    handleSubmit() {
      this.generatedPrompt = this.template.text;
      for (const key in this.formData) {
        this.generatedPrompt = this.generatedPrompt.replace(`{{${key}}}`, this.formData[key]);
      }
      chrome.tabs.create({ url: 'https://chat.openai.com' }, (tab) => {
        chrome.tabs.onUpdated.addListener(function listener(this: any, tabId, info) {
          if (info.status === 'complete' && tabId === tab.id) {
            chrome.tabs.onUpdated.removeListener(listener);
            chrome.scripting.executeScript({
              target: { tabId: tab.id as number },
              func: (prompt) => {
                const textarea = document.querySelector('textarea');
                if (textarea) {
                  textarea.value = prompt;
                  const inputEvent = new Event('input', { bubbles: true });
                  textarea.dispatchEvent(inputEvent);
                }
              },
              args: [this.generatedPrompt]
            });
          }
        });
      });
    }
  }
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

.generated-prompt {
  margin-top: 20px;
  background-color: #4a4a4a;
  padding: 10px;
  border-radius: 5px;
  color: #fff;
}

h2,
h3 {
  font-size: 1.2rem;
}
</style>
