<template>
  <div class="top-app-status" :style="{ height: Number(globalState.statusHeight || 0) + 'px' }"></div>
  <van-nav-bar :title="$t($route.meta.title as string)" left-arrow @click-left="goBack" />
  <div class="main-page">
    <RouterView v-slot="{ Component }" v-if="$route.meta.keepAlive">
      <keep-alive>
        <component :is="Component" :key="$route.path" />
      </keep-alive>
    </RouterView>
    <RouterView v-if="!$route.meta.keepAlive" :key="$route.path" />
  </div>
</template>

<script lang="ts" setup name="BasicLayoutPage">
  import { useRouter } from 'vue-router';
  import { useGlobalStore } from '@/store';

  const globalState = useGlobalStore().globalState;
  // const themeVars = {
  //   navBarHeight: ((Number(globalState.statusHeight || 0) + 92) / 750) * 100 + 'vw',
  // };

  const router = useRouter();

  watch(
    () => router,
    () => {
      //
    },
    { deep: true, immediate: true },
  );

  const goBack = () => {
    if (router.currentRoute.value.path === '/home') {
      if (window.shsc && typeof window.shsc.closePage === 'function') {
        window.shsc.closePage();
      } else {
        window.close();
      }
    } else {
      router.back();
    }
  };
</script>

<style scoped lang="scss">
  .top-app-status {
    background-color: #37f;
  }

  :deep(.van-nav-bar__content) {
    margin-bottom: 0;
    background-color: #37f;

    .van-nav-bar__title {
      color: #fff;
    }
  }

  .main-page {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    overflow: hidden scroll;
    font-size: 24px;
    background-color: #f5f5f5;
  }
</style>
