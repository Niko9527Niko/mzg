<template>
  <div :class="['ad-container', `ad-type-${type}`]" :id="containerId">
    <table
      v-if="displayAsTable"
      :class="['ad-table', customClass]"
      :style="tableStyle"
      :border="border"
      :cellpadding="cellPadding"
      :cellspacing="cellSpacing"
      bgcolor="#008000"
    >
      <tbody>
        <tr v-for="(ad, index) in ads" :key="getAdKey(ad, index)">
          <td>
            <AdImageItem
              :href="ad.link"
              :src="ad.image"
              :alt="ad.alt || '广告图片'"
              :target="ad.target || '_blank'"
              :style="ad.style"
              :ad-id="ad.id || index"
              @click="handleAdClick"
              @error="handleAdError"
              @loaded="handleAdLoaded"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else :class="['ad-list', customClass]" :style="listStyle">
      <div v-for="(ad, index) in ads" :key="getAdKey(ad, index)" class="ad-item">
        <AdImageItem
          :href="ad.link"
          :src="ad.image"
          :alt="ad.alt || '广告图片'"
          :target="ad.target || '_blank'"
          :style="ad.style"
          :ad-id="ad.id || index"
          @click="handleAdClick"
          @error="handleAdError"
          @loaded="handleAdLoaded"
        />
      </div>
    </div>

    <!-- 广告统计信息（开发环境显示） -->
<!--    <div v-if="showDebugInfo" class="ad-debug-info">
      <p>广告数量: {{ ads.length }}</p>
      <p>加载成功: {{ loadedCount }}</p>
      <p>加载失败: {{ errorCount }}</p>
      <p>点击次数: {{ clickCount }}</p>
    </div>-->
  </div>
</template>

<script>
import AdImageItem from './AdImageItem.vue'

export default {
  name: 'AdContainer',
  components: {
    AdImageItem,
  },
  props: {
    // 广告数据数组
    ads: {
      type: Array,
      required: true,
      default: () => [],
      validator: (ads) => {
        return ads.every((ad) => ad && ad.link && ad.image)
      },
    },
    // 容器ID
    containerId: {
      type: String,
      default: 'ad-container',
    },
    // 显示类型：table（表格布局）或 list（列表布局）
    type: {
      type: String,
      default: 'table',
      validator: (value) => ['table', 'list'].includes(value),
    },
    // 是否显示为表格（兼容旧代码）
    displayAsTable: {
      type: Boolean,
      default: true,
    },
    // 表格边框
    border: {
      type: [String, Number],
      default: '1',
    },
    // 表格内边距
    cellPadding: {
      type: [String, Number],
      default: '2',
    },
    // 表格间距
    cellSpacing: {
      type: [String, Number],
      default: '0',
    },
    // 自定义类名
    customClass: {
      type: String,
      default: '',
    },
    // 是否显示调试信息
    showDebugInfo: {
      type: Boolean,
      default: process.env.NODE_ENV === 'development',
    },
    // 自动轮播
    autoRotate: {
      type: Boolean,
      default: false,
    },
    // 轮播间隔（毫秒）
    rotateInterval: {
      type: Number,
      default: 5000,
    },
  },
  data() {
    return {
      loadedCount: 0,
      errorCount: 0,
      clickCount: 0,
      currentIndex: 0,
      rotateTimer: null,
    }
  },
  computed: {
    // 表格样式
    tableStyle() {
      return {
        width: '100%',
        borderCollapse: 'collapse',
        bordercolor: '#FFFFFF',
        bordercolorlight: '#FFFFFF',
        bordercolordark: '#FFFFFF',
      }
    },

    // 列表样式
    listStyle() {
      return {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }
    },

    // 当前显示的广告（轮播时使用）
    currentAd() {
      return this.ads[this.currentIndex] || null
    },
  },
  methods: {
    getAdKey(ad, index) {
      return ad.id || `${this.containerId}-ad-${index}`
    },

    handleAdClick(data) {
      this.clickCount++
      this.$emit('ad-click', {
        ...data,
        containerId: this.containerId,
        timestamp: new Date().toISOString(),
      })
    },

    handleAdError(data) {
      this.errorCount++
      this.$emit('ad-error', {
        ...data,
        containerId: this.containerId,
        timestamp: new Date().toISOString(),
      })
    },

    handleAdLoaded(data) {
      this.loadedCount++
      this.$emit('ad-loaded', {
        ...data,
        containerId: this.containerId,
        timestamp: new Date().toISOString(),
      })
    },

    // 开始轮播
    startRotation() {
      if (!this.autoRotate || this.ads.length <= 1) return

      this.rotateTimer = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.ads.length
        this.$emit('ad-rotate', {
          index: this.currentIndex,
          ad: this.currentAd,
          containerId: this.containerId,
          timestamp: new Date().toISOString(),
        })
      }, this.rotateInterval)
    },

    // 停止轮播
    stopRotation() {
      if (this.rotateTimer) {
        clearInterval(this.rotateTimer)
        this.rotateTimer = null
      }
    },

    // 切换到指定广告
    goToAd(index) {
      if (index >= 0 && index < this.ads.length) {
        this.currentIndex = index
        this.$emit('ad-change', {
          index: this.currentIndex,
          ad: this.currentAd,
          containerId: this.containerId,
          timestamp: new Date().toISOString(),
        })
      }
    },
  },
  watch: {
    // 监听广告数据变化
    ads: {
      handler(newAds) {
        console.log('广告数据更新:', newAds)
        this.loadedCount = 0
        this.errorCount = 0
        this.currentIndex = 0
      },
      deep: true,
    },

    // 监听轮播设置变化
    autoRotate(newValue) {
      if (newValue) {
        this.startRotation()
      } else {
        this.stopRotation()
      }
    },
  },
  mounted() {
    if (this.autoRotate) {
      this.startRotation()
    }
  },
  beforeUnmount() {
    this.stopRotation()
  },
}
</script>

<style scoped>
.ad-container {
  width: 100%;
  margin: 0 auto;
  padding: 0;
}

.ad-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
}

.ad-table td {
  padding: 2px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #ffffff;
}

.ad-table tr {
  background-color: #008000;
}

.ad-table tr:hover {
  background-color: #009900;
}

.ad-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ad-item {
  margin: 2px 0;
  text-align: center;
}

/* 调试信息样式 */
.ad-debug-info {
  margin-top: 10px;
  padding: 8px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

.ad-debug-info p {
  margin: 4px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .ad-table td {
    padding: 1px;
  }

  .ad-list {
    gap: 2px;
  }
}

@media (max-width: 480px) {
  .ad-container {
    max-width: 100%;
    overflow-x: hidden;
  }
}
</style>
