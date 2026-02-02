<template>
  <div id="app">

    <FixedHeader />

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
      title="最快开奖（快乐8官方）联盟网站"
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
    <ShareDownloadComponent/>
  </div>
</template>

<script setup lang="ts">

import ShareDownloadComponent from '@/components/ShareDownloadComponent .vue'
import OfficialSites from '@/components/OfficialSites.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import LotteryPage from '@/components/LotteryPage.vue'
import ZodiacTable from '@/components/ZodiacTable.vue'
import FixedHeader from '@/components/FixedHeader.vue'
</script>

<style scoped>
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
