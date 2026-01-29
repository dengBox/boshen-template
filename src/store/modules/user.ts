import { defineStore } from 'pinia';

interface StoreUser {
  token: string;
}

export const useUserStore = defineStore('user', {
  state: (): StoreUser => ({
    token: 'token',
  }),
  getters: {
    getUserInfo() {
      return '';
    },
  },
  actions: {
    setInfo() {},
  },
});
