import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],

  build: {
    // 关键配置：指定多个入口HTML
    rollupOptions: {
      input: {
        // 第一个页面：index.html
        index: resolve(__dirname, 'index.html'),
        // 第二个页面：lhkl8.html
        lhkl8: resolve(__dirname, 'lhkl8.html'),
      },
      output: {
        // 打包后的文件命名规则
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },

    // 输出目录
    outDir: 'dist',
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
