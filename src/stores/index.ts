import { reactive } from 'vue';

export const store = reactive({
  isAuthenticated: false,
  setAuthenticated(status: boolean) {
    this.isAuthenticated = status;
  }
});
