import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { GlobalState } from '@/interface';

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。

export const useGlobalStore = defineStore('global', () => {
  // ref() 就是 state 属性
  // computed() 就是 getters
  // function() 就是 actions
  // const httpConfig = ref<HttpConfig>({ SERVICE_URL: '' })
  // const serviceUrl = computed(() => httpConfig.value.SERVICE_URL)

  // function SET_HTTP_CONFIG (config: HttpConfig) {
  //   httpConfig.value = config
  // }
  // return { httpConfig, serviceUrl, SET_HTTP_CONFIG }

  // ---------------------------------------------------

  const globalState = ref<GlobalState>({} as GlobalState);

  function SET_GLOBAL_STATE(info: GlobalState) {
    globalState.value = info;
  }

  return { globalState, SET_GLOBAL_STATE };
});

export type UseGlobalStore = ReturnType<typeof useGlobalStore>;
