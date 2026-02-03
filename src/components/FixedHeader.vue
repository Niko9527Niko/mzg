<template>
  <!-- 固定区域容器 -->
  <div
    :class="['sticky-wrapper', { 'sticky-fixed': isFixed }]"
    :style="stickyStyle"
    ref="stickyWrapperRef"
  >
    <!-- 头部内容 -->
    <header class="header clearfix index-header">
      <!-- Logo区域 -->
      <div class="logo-box clearfix">
        <div class="logo">
          <!-- 动态logo显示 -->
          <div v-if="logoType === 'image'" class="logo-img-wrapper">
            <img :src="logoImage" alt="logo" class="logo-img" @error="handleLogoError" />
          </div>
          <div v-else-if="logoType === 'text'" class="logo-text-wrapper">
            <span class="logo-text">{{ logoText }}</span>
          </div>
          <div v-else-if="logoType === 'script'" class="logo-script-wrapper">
            <div v-html="scriptContent" v-if="scriptContent"></div>
            <span v-else class="logo-placeholder">{{ defaultLogoText }}</span>
          </div>
        </div>

        <div class="bank">
          <img :src="effectiveBankImage" alt="bank" @error="handleBankImageError" />
        </div>
      </div>

      <!-- 导航1（顶部导航） -->
      <div class="nav nav1"></div>

      <!-- 导航2（主导航） -->
      <div class="nav2" :style="nav2Style">
        <div class="nav2-inner">
          <div class="nav2-left" :style="{ width: nav2Item1Width, background: nav2Item1Bg }">
            <a
              href="/lhkl8.html"
              target="_top"
              class="nav2-link"
              @click.prevent="handleNav2Item1Click"
            >
              {{ nav2Item1Text }}
            </a>
          </div>

          <div class="nav2-right" :style="{ width: nav2Item2Width, background: nav2Item2Bg }">
            <a href="/" target="_top" class="nav2-link" @click.prevent="handleNav2Item2Click">
              {{ nav2Item2Text }}
            </a>
          </div>
        </div>
      </div>

      <!-- 导航3（开奖信息iframe） -->
      <div class="nav3" :style="nav3Style">
        <!-- 使用iframe或组件 -->
        <iframe
          v-if="useIframe"
          width="100%"
          height="45"
          border="0"
          frameborder="0"
          scrolling="no"
          :src="lotteryIframeUrl"
          :title="lotteryIframeTitle"
          loading="lazy"
          referrerpolicy="no-referrer"
          ref="iframeRef"
        ></iframe>

        <!-- 或者使用组件 -->
        <div v-else class="lottery-component-wrapper">
          <slot name="lottery-content">
            <div class="lottery-placeholder">
              {{ lotteryPlaceholderText }}
            </div>
          </slot>
        </div>
      </div>

      <!-- 导航图片 -->
      <div class="nav-img" v-if="showNavImage">
        <img :src="navImage" alt="nav" />
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'FixedHeader',

  props: {
    // 吸顶功能
    sticky: {
      type: Boolean,
      default: true,
    },
    stickyOffset: {
      type: Number,
      default: 0,
    },

    // Logo相关
    logoType: {
      type: String,
      default: 'script',
      validator: (value) => ['image', 'text', 'script'].includes(value),
    },
    logoImage: {
      type: String,
      default: '',
    },
    logoText: {
      type: String,
      default: '澳门妈祖阁',
    },
    defaultLogoText: {
      type: String,
      default: '澳门彩',
    },

    // 银行图片
    bankImage: {
      type: String,
      default: 'https://dc2.sj-i.n-dk.mexicorecreation.com:8443/1gongyongtu/28012c3daysjlogo.png',
    },

    // 导航2配置
    nav2Item1Text: {
      type: String,
      default: '当前为快乐８',
    },
    nav2Item1Bg: {
      type: String,
      default: '#874ba1b3',
    },
    nav2Item1Width: {
      type: String,
      default: '40%',
    },
    nav2Item1Link: {
      type: String,
      default: '/lhkl8.html',
    },

    nav2Item2Text: {
      type: String,
      default: '点击进入→澳门彩',
    },
    nav2Item2Bg: {
      type: String,
      default: '#c96d10b3',
    },
    nav2Item2Width: {
      type: String,
      default: '60%',
    },
    nav2Item2Link: {
      type: String,
      default: '/',
    },

    // 导航2样式配置
    nav2Height: {
      type: String,
      default: '29px',
    },
    nav2FontSize: {
      type: String,
      default: '20px',
    },

    // 开奖信息配置
    useIframe: {
      type: Boolean,
      default: true,
    },
    lotteryIframeUrl: {
      type: String,
      default: 'https://qdddsbmzg.dglietou.com/klbm/dbkj.html',
    },
    lotteryIframeTitle: {
      type: String,
      default: '开奖信息',
    },
    lotteryPlaceholderText: {
      type: String,
      default: '开奖信息加载中...',
    },

    // 导航图片
    showNavImage: {
      type: Boolean,
      default: false,
    },
    navImage: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      isFixed: false,
      scriptContent: '',
      scrollListener: null,
      resizeListener: null,

      // 错误处理
      logoLoadError: false,
      bankImageLoadError: false,

      // 默认银行图片（备用）
      defaultBankImage: 'https://via.placeholder.com/85x50?text=Bank',

      // 计算高度
      stickyHeight: 0,
      originalStickyHeight: 0,
      lastScrollTop: 0,
    }
  },

  computed: {
    stickyStyle() {
      if (this.isFixed) {
        return {
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          zIndex: '9999',
          width: '100%',
          maxWidth: '720px',
          margin: '0 auto',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          animation: 'slideDown 0.3s ease',
        }
      }
      return {}
    },

    // 获取有效的银行图片
    effectiveBankImage() {
      return this.bankImageLoadError ? this.defaultBankImage : this.bankImage
    },

    // 导航2样式
    nav2Style() {
      return {
        height: this.nav2Heightnav2Height,
        fontSize: this.nav2FontSize,
        lineHeight: this.nav2Height,
      }
    },

    // 导航3样式
    nav3Style() {
      return {
        marginTop: `2px`,
      }
    },
  },

  mounted() {
    // 计算原始高度
    this.calculateHeights()

    // 初始化吸顶功能
    if (this.sticky) {
      this.initStickyHeader()
    }

    // 如果是脚本类型，加载脚本内容
    if (this.logoType === 'script') {
      this.loadScriptContent()
    }

    // 监听窗口resize
    this.resizeListener = () => {
      this.calculateHeights()
      if (this.sticky) {
        this.updateStickyStatus()
      }
    }
    window.addEventListener('resize', this.resizeListener)

    // 监听iframe加载
    if (this.useIframe && this.$refs.iframeRef) {
      this.$refs.iframeRef.addEventListener('load', () => {
        this.calculateHeights()
      })
    }
  },

  beforeUnmount() {
    // 清理事件监听
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener)
    }
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener)
    }
  },

  methods: {
    // 计算高度
    calculateHeights() {
      this.$nextTick(() => {
        const wrapperElement = this.$refs.stickyWrapperRef
        if (wrapperElement) {
          this.originalStickyHeight = wrapperElement.offsetHeight
          this.stickyHeight = this.originalStickyHeight
        }
      })
    },

    // 初始化吸顶功能
    initStickyHeader() {
      this.scrollListener = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop

        // 当滚动超过stickyOffset时固定
        if (scrollTop > (this.stickyOffset || 0) && !this.isFixed) {
          this.isFixed = true
          // 给body添加padding，防止内容跳动
          document.body.style.paddingTop = `${this.stickyHeight}px`
          this.$emit('sticky-fixed', true)
        } else if (scrollTop <= (this.stickyOffset || 0) && this.isFixed) {
          this.isFixed = false
          document.body.style.paddingTop = '0'
          this.$emit('sticky-fixed', false)
        }

        this.lastScrollTop = scrollTop
      }

      window.addEventListener('scroll', this.scrollListener, { passive: true })
      // 初始调用一次
      this.scrollListener()
    },

    // 加载脚本内容
    async loadScriptContent() {
      try {
        // 模拟从服务器获取脚本内容
        const mockScriptContent = `
          <div class="dynamic-logo">
            <span style="font-size: 20px; font-weight: bold; color: #c96d10;">
              澳门妈祖阁
            </span>
            <br>
            <span style="font-size: 12px; color: #666;">
              专业彩票分析平台
            </span>
          </div>
        `

        this.scriptContent = mockScriptContent
        this.$emit('script-loaded', mockScriptContent)
      } catch (error) {
        console.error('加载脚本失败:', error)
        this.$emit('script-error', error)
      }
    },

    // 导航2项目1点击
    handleNav2Item1Click() {
      this.$emit('nav2-item1-click', {
        text: this.nav2Item1Text,
        link: this.nav2Item1Link,
      })

      window.open(this.nav2Item1Link, '_top')
    },

    // 导航2项目2点击
    handleNav2Item2Click() {
      this.$emit('nav2-item2-click', {
        text: this.nav2Item2Text,
        link: this.nav2Item2Link,
      })

      window.open(this.nav2Item2Link, '_top')
    },

    // 图片加载错误处理
    handleLogoError() {
      this.logoLoadError = true
      this.$emit('logo-error', 'logo图片加载失败')
    },

    handleBankImageError() {
      this.bankImageLoadError = true
      this.$emit('bank-image-error', '银行图片加载失败')
    },

    // 更新吸顶状态
    updateStickyStatus() {
      if (this.scrollListener) {
        this.scrollListener()
      }
    },

    // 重置吸顶状态
    resetSticky() {
      this.isFixed = false
      document.body.style.paddingTop = '0'
      this.$emit('sticky-fixed', false)
    },

    // 获取当前高度
    getStickyHeight() {
      return this.stickyHeight
    },

    // 手动触发重新计算
    recalculate() {
      this.calculateHeights()
      this.updateStickyStatus()
    },
  },
}
</script>

<style scoped>
/* 基础样式 */
* {
  padding: 0;
  border: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
}

/* 固定区域容器 */
.sticky-wrapper {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  position: relative;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Header 样式 */
.header.index-header {
  height: auto;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  transition: all 0.3s ease;
  background-image: linear-gradient(
    to right,
    #f1e8db,
    #ede3d4,
    #efe7da,
    #ede2d2,
    #e9e2d7,
    #e7dfd3,
    #f1e8db
  );
  width: 100%;
}

/* Logo 区域 */
.logo-box {
  height: 50px;
  padding: 0 10px;
}

.logo {
  float: left;
  height: 50px;
  display: flex;
  align-items: center;
}

.logo-img-wrapper,
.logo-text-wrapper,
.logo-script-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
}

.logo-img {
  width: 208px;
  height: 50px;
  object-fit: contain;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: #c96d10;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.logo-placeholder {
  font-size: 18px;
  font-weight: bold;
  color: #c96d10;
}

/* 银行图片 */
.bank {
  float: right;
  position: relative;
  width: 90px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bank img {
  display: block;
  width: 85px;
  height: 50px;
  object-fit: contain;
}

/* 导航1 */
.nav1 {
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  overflow: hidden;
  border-top: 1px solid #000;
  margin-top: 1px;
  height: 0;
}

/* 导航2 - 重新设计的布局 */
.nav2 {
  width: 100%;
  max-width: 720px;
  box-sizing: border-box;
  padding: 0;
  line-height: 1;
  border-radius: 0 0 4px 4px;
  position: relative;
  z-index: 100;
}

.nav2-inner {
  display: flex;
  width: 100%;
  height: 100%;
}

.nav2-left,
.nav2-right {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: all 0.3s ease;
}

.nav2-left {
  border-radius: 4px 0 0 4px;
}

.nav2-right {
  border-radius: 0 4px 4px 0;
}

.nav2-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 5px;
}

.nav2-left:hover,
.nav2-right:hover {
  background: #008000 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 128, 0, 0.3);
}

/* 导航3（开奖信息区域） */
.nav3 {
  width: 100%;
  position: relative;
  z-index: 99;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  overflow: hidden;
  margin-top: 25px;
  border-top: 1px solid #000;
}

.lottery-component-wrapper {
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.lottery-placeholder {
  color: white;
  font-weight: bold;
  font-size: 16px;
}

/* iframe样式 */
iframe {
  display: block;
  border: none;
  background: transparent;
  width: 100%;
}

/* 导航图片 */
.nav-img {
  text-align: center;
  background: #000;
  padding: 5px 0;
}

.nav-img img {
  width: auto;
  height: 70px;
  max-width: 100%;
  object-fit: contain;
}

/* 清除浮动 */
.clearfix::after {
  content: '';
  display: table;
  clear: both;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sticky-wrapper {
    max-width: 100%;
  }

  .sticky-fixed {
    max-width: 100% !important;
    width: 100% !important;
  }

  .nav2 {
    height: 35px !important;
    font-size: 16px !important;
    line-height: 35px !important;
  }

  .nav2-link {
    padding: 0 8px;
    font-size: 14px;
  }

  .nav3 {
    margin-top: 2px !important;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 18px;
  }

  .logo-placeholder {
    font-size: 16px;
  }

  .nav2 {
    height: 32px !important;
    font-size: 14px !important;
    line-height: 32px !important;
  }

  .nav2-link {
    font-size: 12px;
    padding: 0 5px;
  }

  .nav3 {
    margin-top: 2px !important;
  }

  .nav2-item1-width {
    width: 70% !important;
  }

  .nav2-item2-width {
    width: 30% !important;
  }
}

@media (max-width: 320px) {
  .nav2 {
    height: 28px !important;
    font-size: 12px !important;
    line-height: 28px !important;
  }

  .nav2-link {
    font-size: 11px;
    padding: 0 3px;
  }

  .nav3 {
    margin-top: 2px !important;
  }

  .logo-text {
    font-size: 16px;
  }
}

/* 防止页面内容被遮挡 */
body {
  transition: padding-top 0.3s ease;
}
</style>
