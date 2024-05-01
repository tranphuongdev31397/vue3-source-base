import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import vitePluginRequire from 'vite-plugin-require'
// https://vitejs.dev/config/
export default defineConfig(({ mode }: UserConfig) => {
  const env = loadEnv(mode ?? 'development', process.cwd(), '')
  return {
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()]
      }
    },
    plugins: [
      vue(),
      VueDevTools(),
      AutoImport({
        imports: ['vue', '@vueuse/core', 'vue-router'],
        dts: 'src/auto-imports.d.ts', // plugins này sẽ tự động generated ra file auto-imports.d.ts trong source src.
        dirs: [], // chỗ này mình có thể thêm name folder nó sẽ tự động lấy tất cả các tên file trong folder đó và mình có thể gọi bất kì ở trong file Vue nào mà không cần import. (src/stores)
        vueTemplate: true
      }),
      Components({
        include: [/\.vue$/, /\.vue\?vue/],
        dts: 'src/components.d.ts' // plugins này sẽ tự động generated ra file components.d.ts trong source src.
      }),
      //@ts-ignore
      vitePluginRequire.default()
    ],
    define: {
      'process.env': env
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
