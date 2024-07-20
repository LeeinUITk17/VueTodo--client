import { getManagerUser } from '@/utils/promptmanager';
import { reactive } from 'vue';
const USERKEYS="user";
export const store = reactive({
  isAuthenticated: false,
  setAuthenticated(status: boolean) {
    this.isAuthenticated = status;
  },
  async checkUserAuthenticated() {
    try {
      const user = await getManagerUser();
      if (user && user.email) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    } catch (error) {
      console.error("Error checking user authentication:", error);
      this.isAuthenticated = false;
    }
  },
resetAuthenticated() {
    this.isAuthenticated = false;
    chrome.storage.local.remove('user', () => {
        console.log('User data removed.');
      });
      chrome.storage.local.remove([USERKEYS], () => {
        console.log('Auth data removed.');
      });
  }
});
