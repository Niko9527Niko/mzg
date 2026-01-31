<template>
  <!-- 外层容器，始终存在 -->
  <div class="header-wrapper">
    <!-- 头部容器，实现吸顶 -->
    <div
      :class="['header-container', { 'sticky-container': isFixed }]"
      ref="headerContainer"
      :style="headerContainerStyle"
    >
      <!-- 头部内容 -->
      <header class="header clearfix index-header">
        <div class="logo-box clearfix">
          <div class="logo">
            <span class="logo-text">澳门妈祖阁</span>
          </div>
          <div class="bank">
            <img :src="bankImage" alt="bank" />
          </div>
        </div>

        <!-- 导航1 - 开奖信息 -->
        <div class="nav" v-if="showNav1">
          <div class="nav-content">
            <!-- 备用彩票显示 -->
            <div class="lottery-fallback">
              <table class="lottery-table" border="0" bgcolor="#FFFFFF">
                <tr>
                  <td align="center" width="18%" style="white-space: nowrap">
                    <font style="color: #663300; font-size: 14px">澳門彩</font><br />
                    <font class="period">{{ formattedPeriod }}期开</font>
                  </td>

                  <td
                    width="11%"
                    v-for="(num, index) in lotteryData.mainNumbers"
                    :key="'main-' + index"
                  >
                    <div class="number-box">
                      <div class="number" :style="getNumberStyle(num)">
                        {{ num }}
                      </div>
                      <div class="number-text">
                        {{ getNumberText(num) }}
                      </div>
                    </div>
                  </td>

                  <td width="3%" align="center" bgcolor="#FFFF00">
                    <a href="javascript:void(0)" @click="refreshLotteryData">
                      <font class="refresh-text">刷<br />新</font>
                    </a>
                  </td>

                  <td width="11%">
                    <div class="number-box">
                      <div class="number" :style="getNumberStyle(lotteryData.specialNumber)">
                        {{ lotteryData.specialNumber }}
                      </div>
                      <div class="number-text">
                        {{ getNumberText(lotteryData.specialNumber) }}
                      </div>
                    </div>
                  </td>

                  <td width="2%"></td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <!-- 导航2 -->
        <div class="nav2">
          <ul>
            <li :class="{ active: activeNav === 'lhkl8' }">
              <a href="/lhkl8.html" target="_top" @click.prevent="handleNavClick('lhkl8')">
                点击查看【快乐八六合彩】官方开奖
              </a>
            </li>
          </ul>
        </div>

        <!-- 导航图片 -->
        <div class="nav-img" v-if="showNavImage">
          <img :src="navImage" alt="nav" />
        </div>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',

  props: {
    sticky: {
      type: Boolean,
      default: true,
    },
    stickyOffset: {
      type: Number,
      default: 10, // 减小偏移量，让吸顶更早触发
    },
    showNav1: {
      type: Boolean,
      default: true,
    },
    showNavImage: {
      type: Boolean,
      default: false,
    },
    lotteryApiUrl: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      isFixed: false,
      activeNav: '',
      bankImage: 'https://dc2.sj-i.n-dk.mexicorecreation.com:8443/1gongyongtu/01lg49.png',
      navImage: 'https://via.placeholder.com/300x70?text=导航图片',

      // 开奖数据
      lotteryData: {
        period: '123',
        mainNumbers: [1, 2, 3, 4, 5, 6],
        specialNumber: 7,
      },

      // 布局相关
      placeholderHeight: 0,
      headerHeight: 0,
      scrollY: 0,
      lastScrollY: 0,
      ticking: false,

      // 其他数据
      nav2Id: 'nav2_' + Math.random().toString(36).substr(2, 9),
      lotteryRefreshTimer: null,

      // 波色映射和生肖映射
      waveColors: {
        1: '#FF0000',
        2: '#FF0000',
        7: '#FF0000',
        8: '#FF0000',
        12: '#FF0000',
        13: '#FF0000',
        18: '#FF0000',
        19: '#FF0000',
        23: '#FF0000',
        24: '#FF0000',
        29: '#FF0000',
        30: '#FF0000',
        34: '#FF0000',
        35: '#FF0000',
        40: '#FF0000',
        45: '#FF0000',
        46: '#FF0000',
        3: '#3366FF',
        4: '#3366FF',
        9: '#3366FF',
        10: '#3366FF',
        14: '#3366FF',
        15: '#3366FF',
        20: '#3366FF',
        25: '#3366FF',
        26: '#3366FF',
        31: '#3366FF',
        36: '#3366FF',
        37: '#3366FF',
        41: '#3366FF',
        42: '#3366FF',
        47: '#3366FF',
        48: '#3366FF',
        5: '#009933',
        6: '#009933',
        11: '#009933',
        16: '#009933',
        17: '#009933',
        21: '#009933',
        22: '#009933',
        27: '#009933',
        28: '#009933',
        32: '#009933',
        33: '#009933',
        38: '#009933',
        39: '#009933',
        43: '#009933',
        44: '#009933',
        49: '#009933',
      },

      zodiacMap: {
        1: '蛇',
        13: '蛇',
        25: '蛇',
        37: '蛇',
        49: '蛇',
        2: '龙',
        14: '龙',
        26: '龙',
        38: '龙',
        3: '兔',
        15: '兔',
        27: '兔',
        39: '兔',
        4: '虎',
        16: '虎',
        28: '虎',
        40: '虎',
        5: '牛',
        17: '牛',
        29: '牛',
        41: '牛',
        6: '鼠',
        18: '鼠',
        30: '鼠',
        42: '鼠',
        7: '猪',
        19: '猪',
        31: '猪',
        43: '猪',
        8: '狗',
        20: '狗',
        32: '狗',
        44: '狗',
        9: '鸡',
        21: '鸡',
        33: '鸡',
        45: '鸡',
        10: '猴',
        22: '猴',
        34: '猴',
        46: '猴',
        11: '羊',
        23: '羊',
        35: '羊',
        47: '羊',
        12: '马',
        24: '马',
        36: '马',
        48: '马',
      },
    }
  },

  computed: {
    formattedPeriod() {
      return String(this.lotteryData.period).padStart(3, '0')
    },

    headerContainerStyle() {
      if (this.isFixed) {
        return {
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          zIndex: '1000',
          transform: 'translateY(0)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
        }
      } else {
        return {
          position: 'relative',
          transform: `translateY(${this.scrollY > 0 ? -Math.min(this.scrollY, this.headerHeight) : 0}px)`,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }
      }
    },
  },

  mounted() {
    // 初始化高度
    this.$nextTick(() => {
      if (this.$refs.headerContainer) {
        this.headerHeight = this.$refs.headerContainer.offsetHeight
        this.placeholderHeight = this.headerHeight
      }
    })

    if (this.sticky) {
      this.initSmoothSticky()
    }

    this.fetchLotteryData()
    this.setupLotteryRefresh()
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.lotteryRefreshTimer) {
      clearInterval(this.lotteryRefreshTimer)
    }
  },

  methods: {
    // 平滑吸顶实现
    initSmoothSticky() {
      this.handleScroll = () => {
        this.scrollY = window.scrollY

        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            this.updateStickyState()
            this.ticking = false
          })
          this.ticking = true
        }
      }

      window.addEventListener('scroll', this.handleScroll, { passive: true })

      // 初始检查
      this.updateStickyState()
    },

    updateStickyState() {
      const scrollY = this.scrollY
      const shouldBeFixed = scrollY > this.stickyOffset

      if (shouldBeFixed !== this.isFixed) {
        this.isFixed = shouldBeFixed

        // 更新占位符高度
        if (shouldBeFixed) {
          this.placeholderHeight = this.headerHeight
        }
      }

      // 记录最后一次滚动位置
      this.lastScrollY = scrollY
    },

    // 获取号码样式
    getNumberStyle(num) {
      const numInt = parseInt(num)
      const color = this.waveColors[numInt]
      return {
        backgroundColor: color || '#333',
        color: '#FFFFFF',
      }
    },

    // 获取号码文字（生肖）
    getNumberText(num) {
      const numInt = parseInt(num)
      return this.zodiacMap[numInt] || ''
    },

    // 获取开奖数据
    async fetchLotteryData() {
      try {
        if (this.lotteryApiUrl) {
          const response = await fetch(this.lotteryApiUrl)
          const data = await response.json()
          this.lotteryData = data
        } else {
          this.generateMockLotteryData()
        }

        this.$emit('lottery-data-loaded', this.lotteryData)
      } catch (error) {
        console.error('获取开奖数据失败:', error)
        this.generateMockLotteryData()
      }
    },

    // 生成模拟开奖数据
    generateMockLotteryData() {
      const mainNumbers = []
      while (mainNumbers.length < 6) {
        const num = Math.floor(Math.random() * 49) + 1
        if (!mainNumbers.includes(num)) {
          mainNumbers.push(num)
        }
      }
      mainNumbers.sort((a, b) => a - b)

      let specialNumber
      do {
        specialNumber = Math.floor(Math.random() * 49) + 1
      } while (mainNumbers.includes(specialNumber))

      const period = parseInt(this.lotteryData.period) + 1

      this.lotteryData = {
        period: period,
        mainNumbers: mainNumbers,
        specialNumber: specialNumber,
      }
    },

    // 设置定期刷新开奖数据
    setupLotteryRefresh() {
      this.lotteryRefreshTimer = setInterval(
        () => {
          this.fetchLotteryData()
        },
        5 * 60 * 1000,
      )
    },

    // 手动刷新开奖数据
    refreshLotteryData() {
      this.generateMockLotteryData()
      this.$emit('lottery-updated', this.lotteryData)
    },

    handleNavClick(navName) {
      this.activeNav = navName
      this.$emit('nav-click', navName)

      if (navName === 'lhkl8') {
        window.open('/lhkl8.html', '_top')
      }
    },
  },
}
</script>

<style scoped>
/* 外层包装器 */
.header-wrapper {
  position: relative;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
}

/* 占位元素，保持页面布局稳定 */
.header-placeholder {
  width: 100%;
  transition: height 0.3s ease;
}

/* 头部容器 */
.header-container {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  will-change: transform, box-shadow;
}

/* 吸顶时的样式 */
.header-container.sticky-container {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Header 基础样式 */
.header.index-header {
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}

.header {
  width: 100%;
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
  transform: translateZ(0); /* 启用GPU加速 */
  backface-visibility: hidden; /* 防止闪烁 */
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

.logo .logo-text {
  font-size: 20px;
  font-weight: bold;
  color: #c96d10;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

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

/* 导航1样式 */
.nav {
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  overflow: hidden;
  border-top: 1px solid #000;
  margin-top: 1px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.nav-content {
  padding: 2px 0;
}

/* 彩票显示样式 */
.lottery-fallback {
  width: 100%;
  font-size: 12px;
  transform: translateZ(0);
}

.lottery-fallback .lottery-table {
  width: 100%;
  margin: 0;
  border-collapse: collapse;
  table-layout: fixed;
}

.lottery-fallback .lottery-table td {
  padding: 1px;
  vertical-align: middle;
}

.lottery-fallback .period {
  color: #000000;
  font-size: 14px;
  font-weight: bold;
  font-family: '微软雅黑';
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
}

.lottery-fallback .number-box {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
  border-radius: 3px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.lottery-fallback .number-box:hover {
  transform: translateY(-1px);
}

.lottery-fallback .number {
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  font-family: '微软雅黑';
  height: 19px;
  line-height: 19px;
  padding: 0;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}

.lottery-fallback .number-text {
  color: #333333;
  font-size: 18px;
  font-weight: bold;
  font-family: '微软雅黑';
  height: 19px;
  line-height: 19px;
  padding: 0;
  background: transparent;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
}

.lottery-fallback .refresh-text {
  background: rgba(255, 255, 0, 0.8);
  font-weight: bold;
  color: #ff3300;
  font-size: 12px;
  font-family: '微软雅黑';
  display: inline-block;
  padding: 2px 1px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.lottery-fallback .refresh-text:hover {
  background: rgba(255, 153, 0, 0.9);
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}

/* Nav2 样式 */
.nav2 {
  width: 100%;
  max-width: 720px;
  margin: 0px auto 0;
  box-sizing: border-box;
  padding: 1px;
  font-size: 13px;
  line-height: 29px;
  border-radius: 0 0 4px 4px;
}

.nav2 ul {
  padding: 0;
  display: flex;
  justify-content: space-between;
}

.nav2 ul li {
  width: 100%;
  box-sizing: border-box;
  padding: 0 4px;
}

.nav2 ul li a {
  display: block;
  padding: 0;
  text-align: center;
  text-decoration: none;
  color: #fff;
  border-radius: 60px;
  background: linear-gradient(145deg, #c96d10, #b85e0a);
  font-size: 20px;
  font-weight: bold;
  height: 29px;
  line-height: 30px;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.nav2 ul li a:hover {
  background: linear-gradient(145deg, #008000, #006600);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 128, 0, 0.3);
}

.nav2 ul li.active a {
  background: linear-gradient(145deg, #008000, #006600);
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

.clearfix::after {
  content: '';
  display: table;
  clear: both;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .logo .logo-text {
    font-size: 18px;
  }

  .lottery-fallback .number {
    font-size: 14px;
    height: 14px;
    line-height: 14px;
  }

  .lottery-fallback .number-text {
    font-size: 10px;
    height: 12px;
    line-height: 12px;
  }

  .lottery-fallback .period {
    font-size: 12px;
  }

  .lottery-fallback .refresh-text {
    font-size: 10px;
    padding: 1px;
  }

  .nav2 ul li a {
    font-size: 14px;
  }

  .header-container {
    max-width: 100%;
  }
}
</style>
