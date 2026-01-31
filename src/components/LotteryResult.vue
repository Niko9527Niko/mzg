<template>
  <div class="lottery-result">
    <!-- 复制功能的隐藏textarea -->
    <textarea
      readonly
      id="shareInfo"
      name="shareInfo"
      style="display: none"
      :value="shareInfo"
    ></textarea>

    <!-- 开奖结果表格 -->
    <table class="lottery-table" border="0" bgcolor="#FFFFFF">
      <tr>
        <td align="center" width="18%" style="white-space: nowrap">
          <span style="color: #663300">澳門彩</span><br />
          <span id="q" class="period">{{ formattedPeriod }}</span
          >期开
        </td>

        <!-- 主号码区域 -->
        <td width="11%" v-for="(num, index) in mainNumbers" :key="'main-' + index">
          <div :id="'w' + (index + 1)" class="number-box">
            <div :id="'m' + (index + 1)" class="number" :style="getNumberStyle(num)">
              {{ num }}
            </div>
            <div :id="'m' + (index + 1) + 'x'" class="number-text zodiac-text">
              {{ getZodiacText(num) }}
            </div>
          </div>
        </td>

        <!-- 刷新按钮 -->
        <td width="3%" align="center" bgcolor="#FFFF00">
          <a href="javascript:void(0)" @click="refreshData" class="refresh-link">
            <span class="refresh-text">刷<br />新</span>
          </a>
        </td>

        <!-- 特别号码 -->
        <td width="11%">
          <div id="w7" class="number-box">
            <div id="s1" class="number" :style="getNumberStyle(specialNumber)">
              {{ specialNumber }}
            </div>
            <div id="s1x" class="number-text zodiac-text">
              {{ getZodiacText(specialNumber) }}
            </div>
          </div>
        </td>

        <td width="2%"></td>
      </tr>
    </table>

    <!-- 隐藏的临时信息区域 -->
    <div id="tmpinfo" style="display: none"></div>
  </div>
</template>

<script>
export default {
  name: 'LotteryResult',

  props: {
    period: {
      type: [String, Number],
      default: '000',
    },
    mainNumbers: {
      type: Array,
      default: () => [1, 2, 3, 4, 5, 6],
    },
    specialNumber: {
      type: [String, Number],
      default: '7',
    },
    showActionButtons: {
      type: Boolean,
      default: true,
    },
    autoRefreshInterval: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      localPeriod: this.period,
      localMainNumbers: [...this.mainNumbers],
      localSpecialNumber: this.specialNumber,
      isLoading: false,
      refreshTimer: null,
    }
  },

  computed: {
    formattedPeriod() {
      return String(this.localPeriod).padStart(3, '0')
    },

    shareInfo() {
      return `第${this.formattedPeriod}期开奖结果：${this.localMainNumbers.join(',')} 特别号码：${this.localSpecialNumber}`
    },

    // 完整的生肖映射（1-49）
    zodiacMapping() {
      return {
        // 蛇
        1: '蛇',
        13: '蛇',
        25: '蛇',
        37: '蛇',
        49: '蛇',
        // 龙
        2: '龙',
        14: '龙',
        26: '龙',
        38: '龙',
        // 兔
        3: '兔',
        15: '兔',
        27: '兔',
        39: '兔',
        // 虎
        4: '虎',
        16: '虎',
        28: '虎',
        40: '虎',
        // 牛
        5: '牛',
        17: '牛',
        29: '牛',
        41: '牛',
        // 鼠
        6: '鼠',
        18: '鼠',
        30: '鼠',
        42: '鼠',
        // 猪
        7: '猪',
        19: '猪',
        31: '猪',
        43: '猪',
        // 狗
        8: '狗',
        20: '狗',
        32: '狗',
        44: '狗',
        // 鸡
        9: '鸡',
        21: '鸡',
        33: '鸡',
        45: '鸡',
        // 猴
        10: '猴',
        22: '猴',
        34: '猴',
        46: '猴',
        // 羊
        11: '羊',
        23: '羊',
        35: '羊',
        47: '羊',
        // 马
        12: '马',
        24: '马',
        36: '马',
        48: '马',
      }
    },

    // 波色映射
    waveColorMapping() {
      const colors = {}
      // 红波
      ;[1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46].forEach((num) => {
        colors[num] = '#FF0000'
      })
      // 蓝波
      ;[3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48].forEach((num) => {
        colors[num] = '#3366FF'
      })
      // 绿波
      ;[5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49].forEach((num) => {
        colors[num] = '#009933'
      })
      return colors
    },
  },

  watch: {
    period(newVal) {
      this.localPeriod = newVal
    },
    mainNumbers(newVal) {
      this.localMainNumbers = [...newVal]
    },
    specialNumber(newVal) {
      this.localSpecialNumber = newVal
    },
    autoRefreshInterval(newInterval) {
      this.setupAutoRefresh(newInterval)
    },
  },

  mounted() {
    this.fetchLotteryData()
    this.setupAutoRefresh(this.autoRefreshInterval)
  },

  beforeUnmount() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
    }
  },

  methods: {
    // 获取号码样式
    getNumberStyle(num) {
      const numInt = parseInt(num)
      const color = this.waveColorMapping[numInt]
      return {
        backgroundColor: color || '#CCCCCC',
        color: '#FFFFFF',
        textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)',
      }
    },

    // 获取生肖文字
    getZodiacText(num) {
      const numInt = parseInt(num)
      return this.zodiacMapping[numInt] || ''
    },

    // 刷新数据
    async refreshData() {
      if (this.isLoading) return

      this.isLoading = true
      this.$emit('refresh-start')

      try {
        await new Promise((resolve) => setTimeout(resolve, 500))

        const mockData = this.generateMockData()
        this.updateLocalData(mockData)

        this.$emit('refresh-success', mockData)
        this.$emit('update:period', this.localPeriod)
        this.$emit('update:mainNumbers', this.localMainNumbers)
        this.$emit('update:specialNumber', this.localSpecialNumber)
      } catch (error) {
        console.error('刷新数据失败:', error)
        this.$emit('refresh-error', error)
      } finally {
        this.isLoading = false
      }
    },

    // 获取彩票数据
    async fetchLotteryData() {
      try {
        if (this.period === '000') {
          const mockData = this.generateMockData()
          this.updateLocalData(mockData)
        }
      } catch (error) {
        console.error('获取彩票数据失败:', error)
      }
    },

    // 生成模拟数据
    generateMockData() {
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

      const period = parseInt(this.localPeriod) + 1

      return {
        period: period,
        mainNumbers: mainNumbers,
        specialNumber: specialNumber,
      }
    },

    // 更新本地数据
    updateLocalData(data) {
      this.localPeriod = data.period
      this.localMainNumbers = data.mainNumbers
      this.localSpecialNumber = data.specialNumber
    },

    // 设置自动刷新
    setupAutoRefresh(interval) {
      if (this.refreshTimer) {
        clearInterval(this.refreshTimer)
        this.refreshTimer = null
      }

      if (interval > 0) {
        this.refreshTimer = setInterval(() => {
          this.refreshData()
        }, interval)
      }
    },
  },
}
</script>

<style scoped>
/* 基础样式 */
* {
  margin: 0;
  padding: 0;
  outline: 0;
}

.lottery-result {
  font-family: '微软雅黑', 'Microsoft YaHei', 'PingFang SC', sans-serif;
  font-weight: bold;
  background: transparent;
}

/* 链接样式 */
a,
a.visited {
  text-decoration: none;
  color: #0000ff;
}

a:hover {
  text-decoration: underline;
  color: #ff0000;
}

/* 开奖表格 */
.lottery-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.lottery-table td {
  padding: 2px;
  vertical-align: middle;
}

/* 期数显示 */
.period {
  font-size: 18px;
  color: #333;
  font-weight: bold;
  font-family: '微软雅黑';
}

/* 号码框 */
.number-box {
  width: 100%;
  margin: auto;
  border: 1px solid #ddd;
  text-align: center;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.number {
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  font-family: '微软雅黑';
  height: 24px;
  line-height: 24px;
  padding: 2px 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.number:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 生肖文字样式 - 重点修复部分 */
.zodiac-text {
  background: #ffffff;
  color: #333333 !important;
  font-size: 15px !important;
  font-weight: bold !important;
  font-family: '微软雅黑', 'Microsoft YaHei' !important;
  height: 20px;
  line-height: 20px;
  padding: 2px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: none !important;
}

/* 确保文字显示 */
.number-text {
  background: #ffffff !important;
  color: #333333 !important;
  font-size: 15px !important;
  font-weight: bold !important;
  font-family: '微软雅黑', 'Microsoft YaHei' !important;
  height: 20px;
  line-height: 20px;
  padding: 2px 0;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}

/* 刷新按钮 */
.refresh-link {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.refresh-text {
  background: #ffff00;
  font-weight: bold;
  color: #ff3300;
  font-size: 15px;
  font-family: '微软雅黑';
  display: inline-block;
  padding: 6px 3px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.refresh-text:hover {
  background: #ff9900;
  color: #ffffff;
  text-decoration: none;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 调试样式 - 如果仍然不显示，添加这个 */
.debug-show {
  border: 1px solid red !important;
  background: rgba(255, 0, 0, 0.1) !important;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .number {
    font-size: 16px;
    height: 20px;
    line-height: 20px;
  }

  .zodiac-text {
    font-size: 12px !important;
    height: 16px;
    line-height: 16px;
  }

  .period {
    font-size: 14px;
  }

  .refresh-text {
    font-size: 12px;
    padding: 4px 2px;
  }
}

@media (max-width: 360px) {
  .number {
    font-size: 14px;
  }

  .zodiac-text {
    font-size: 10px !important;
  }

  .refresh-text {
    font-size: 10px;
  }
}
</style>
