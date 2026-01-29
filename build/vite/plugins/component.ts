/**
 * @name  ConfigAutoComponentsPlugin
 * @description 按需加载，自动引入组件
 */
// 按需引用 vant会有样式覆盖的问题
import Components from 'unplugin-vue-components/vite';
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers';
// import { VantResolver } from '@vant/auto-import-resolver';

export const ConfigAutoComponentsPlugin = () => {
  return Components({
    // dirs: ['src/components'],
    extensions: ['vue', 'md'],
    deep: true,
    dts: 'types/components.d.ts',
    directoryAsNamespace: false,
    globalNamespaces: [],
    directives: true,
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    // resolvers: [VueUseComponentsResolver(), VantResolver()],
    resolvers: [VueUseComponentsResolver()],
  });
};
