<template>
  <div id="app">
    <!-- 使用头部组件，启用吸顶功能 -->
    <HeaderComponent :sticky="true" :stickyOffset="0" @nav-click="handleNavClick" />

    <!-- 页面主要内容 -->
    <div class="viewport">
      <main class="main-content">
        <!-- 其他组件 -->
        <div class="content-wrapper">
          <LotteryPage />
          <ZodiacTable />
        </div>
      </main>
    </div>

    <OfficialSites
      title="澳門官方（旗下網站）"
    />
    <!-- 其他组件 -->
    <FooterComponent />
    <!-- 返回顶部 -->
    <a href="#fhdb">
      <p align="center">
        <span style="font-weight: 700">
          <font size="6" face="微软雅黑">返回顶部</font>
        </span>
      </p>
    </a>
  </div>
  <ShareDownloadComponent/>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import ZodiacTable from './components/ZodiacTable.vue'
import FooterComponent from './components/FooterComponent.vue'
import LotteryPage from '@/components/LotteryPage.vue'
import { ref, onMounted } from 'vue'
import ShareDownloadComponent from '@/components/ShareDownloadComponent.vue'
import OfficialSites from '@/components/OfficialSites.vue'
const headerHeight = ref(60)
const updateHeaderHeight = () => {
  const header = document.querySelector('.header-class') // 你的Header选择器
  if (header) {
    headerHeight.value = header.offsetHeight
  }
}

onMounted(() => {
  updateHeaderHeight()
  // 监听窗口变化
  window.addEventListener('resize', updateHeaderHeight)
})

export default {
  name: 'App',

  components: {
    OfficialSites,
    ShareDownloadComponent,
    LotteryPage,
    HeaderComponent,
    ZodiacTable,
    FooterComponent,
  },

  methods: {
    handleNavClick(navName) {
      console.log('导航点击:', navName)
      // 处理导航点击逻辑
      switch (navName) {
        case 'lhkl8':
          // 跳转到快乐8页面
          // this.$router.push('/lhkl8');
          break
        default:
          break
      }
    },
  },

  // 页面卸载时清理
  beforeUnmount() {
    // 确保body的padding被重置
    document.body.style.paddingTop = '0'
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 720px;
  margin: 0 auto;
}



.main-content {
  padding-top: var(--header-height, 100px);
  min-height: 100vh;
  box-sizing: border-box;
}

.content-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}
</style>
