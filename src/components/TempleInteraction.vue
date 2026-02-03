<template>
  <div class="temple-container">
    <!-- 初始画面：庙宇 -->
    <div v-if="status === 'initial'" class="temple-scene scene-wrapper">
      <div class="temple-title">
        <h2>妈祖阁</h2>
        <p>心诚则灵，有求必应</p>
      </div>
      <div class="temple-image" @click="startIncense">
        <img src="@/assets/images/temple.png" alt="庙宇" class="temple-img">
        <div class="click-hint">点击上香</div>
      </div>
    </div>

    <!-- 上香动画 - 三根香 -->
    <div v-if="status === 'burningIncense'" class="incense-animation scene-wrapper">
      <div class="incense-group">
        <div
          v-for="(incense, index) in incenseSticks"
          :key="index"
          class="incense-stick"
          :class="{
          burning: incense.burning,
          'stick-1': index === 0,
          'stick-2': index === 1,
          'stick-3': index === 2
        }"
          :style="{ animationDelay: `${index * 0.5}s` }"
        >
          <div class="stick"></div>
          <div class="ash" v-if="incense.burning"></div>
          <div class="fire" v-if="incense.burning"></div>
          <div class="smoke" v-if="incense.burning"></div>
        </div>
      </div>
      <div class="incense-bowl">
        <div class="ash-pile"></div>
      </div>
      <div class="incense-text">{{ incenseText }}</div>

    </div>

    <!-- 选择界面 -->
    <div v-if="status === 'chooseAction'" class="choice-container scene-wrapper">
      <div class="choice-title">
        <h3>香已上完，请选择</h3>
        <p>心诚则灵，天公保佑</p>
      </div>
      <div class="choice-buttons">
        <button class="choice-btn draw-btn" @click="drawLottery">
          <span class="btn-icon">🎯</span>
          <span class="btn-text">抽签求运</span>
          <span class="btn-desc">抽取1-49号灵签</span>
        </button>
        <button class="choice-btn cup-btn" @click="throwCups">
          <span class="btn-icon">🎲</span>
          <span class="btn-text">掷圣杯</span>
          <span class="btn-desc">直接掷杯问事</span>
        </button>
      </div>
    </div>

    <!-- 抽签界面 -->
    <div v-if="status === 'drawing'" class="draw-container scene-wrapper">
      <div class="draw-title">
        <h3>诚心抽签</h3>
        <p>心中默念所求之事</p>
      </div>

      <div class="lottery-tube">
        <div class="tube">
          <div class="sticks-container">
            <div
              v-for="n in 49"
              :key="n"
              class="lottery-stick"
              :class="{
                selected: selectedNumber === n,
                shaking: isShaking
              }"
              :style="{
                transform: `rotate(${(n-1)*7.3}deg) translateY(-180px)`,
                animationDelay: `${n*0.02}s`
              }"
            >
              <span class="stick-number">{{ n }}</span>
            </div>
          </div>
          <div class="tube-opening"></div>
        </div>
      </div>

      <div class="draw-controls">
        <button
          class="draw-action-btn"
          @click="startDraw"
          :disabled="isDrawing"
        >
          {{ isDrawing ? '正在抽签...' : '开始抽签' }}
        </button>

        <div v-if="selectedNumber" class="draw-result">
          <div class="result-number">
            抽到：<span class="lucky-number">第{{ selectedNumber }}号签</span>
          </div>
          <div class="result-actions">
            <button class="action-btn continue-btn" @click="continueWithCup">
              继续掷圣杯
            </button>
            <button class="action-btn finish-btn" @click="showFinal">
              完成，看结果
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 掷圣杯界面 -->
    <div v-if="status === 'throwingCups'" class="cup-container scene-wrapper">
      <div class="cup-title">
        <h3>掷圣杯问事</h3>
        <p>心中默念问题，掷杯三次</p>
        <div class="cup-counter">
          已掷：<span class="cup-count">{{ cupThrows }}</span>/3次
        </div>
      </div>

      <div class="cup-area">
        <div
          class="cup"
          :class="{
            throwing: isThrowing,
            result: showCupResult,
            'cup-positive': cupResult === 'positive',
            'cup-negative': cupResult === 'negative',
            'cup-standing': cupResult === 'standing'
          }"
          @click="throwSingleCup"
        >
          <div class="cup-top"></div>
          <div class="cup-bottom"></div>
          <div class="cup-result-icon" v-if="showCupResult">
            {{ cupResult === 'positive' ? '🙏' : cupResult === 'negative' ? '🙅' : '⚖️' }}
          </div>
        </div>

        <div class="cup-results">
          <div
            v-for="(result, index) in cupResults"
            :key="index"
            class="cup-result-item"
            :class="`result-${result}`"
          >
            第{{ index + 1 }}次：{{ getCupResultText(result) }}
          </div>
        </div>
      </div>

      <div class="cup-controls">
        <button
          class="cup-action-btn"
          @click="throwSingleCup"
          :disabled="isThrowing || cupThrows >= 3"
        >
          {{ getThrowButtonText() }}
        </button>

        <button
          v-if="cupThrows > 0"
          class="cup-finish-btn"
          @click="showFinal"
        >
          完成掷杯
        </button>
      </div>
    </div>

    <!-- 最终结果 -->
    <div v-if="status === 'final'" class="final-container scene-wrapper">
      <div class="final-content">
        <div class="blessing-text">
          <h2 class="blessing-title">天公保佑</h2>
          <div class="blessing-message">
            <p v-if="selectedNumber">您抽到第{{ selectedNumber }}号灵签</p>
            <p v-if="cupResults.length > 0">掷杯结果：{{ getCupSummary() }}</p>
            <p class="blessing-main">天公赐福，心想事成</p>
            <p class="blessing-sub">财源广进，万事如意</p>
          </div>
        </div>

        <div class="god-image">
          <img src="@/assets/images/god-of-wealth.png" alt="财神爷" class="wealth-god">
          <div class="gold-coins">💰💰💰</div>
        </div>

        <div class="final-actions">
          <button class="restart-btn" @click="restart">
            再次祈福
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TempleInteraction',
  data() {
    return {
      status: 'initial', // initial, burningIncense, chooseAction, drawing, throwingCups, final
      isBurning: false,
      incenseSticks: [
        { burning: false, position: 'left' },
        { burning: false, position: 'center' },
        { burning: false, position: 'right' }
      ],
      incenseText: '点燃香火...',
      selectedNumber: null,
      isDrawing: false,
      isShaking: false,
      cupThrows: 0,
      cupResults: [],
      isThrowing: false,
      showCupResult: false,
      cupResult: null,
      lotteryNumbers: Array.from({ length: 49 }, (_, i) => i + 1),
      currentIncenseIndex: 0
    }
  },
  methods: {
    // 开始上香
    startIncense() {
      this.status = 'burningIncense';
      this.incenseText = '请香...';

      // 重置三根香的状态
      this.incenseSticks = [
        { burning: false, position: 'left' },
        { burning: false, position: 'center' },
        { burning: false, position: 'right' }
      ];
      this.currentIncenseIndex = 0;

      // 依次点燃三根香
      setTimeout(() => {
        this.lightIncenseStick(0);
      }, 500);
    },

    lightIncenseStick(index) {
      if (index >= this.incenseSticks.length) {
        // 三根香都点燃后
        setTimeout(() => {
          this.incenseText = '三香齐燃，诚心祷告';
          setTimeout(() => {
            this.status = 'chooseAction';
          }, 2000);
        }, 2000);
        return;
      }

      // 点燃当前香
      setTimeout(() => {
        if (index === 0) {
          this.incenseText = '点燃第一根香：敬天';
        } else if (index === 1) {
          this.incenseText = '点燃第二根香：敬地';
        } else {
          this.incenseText = '点燃第三根香：敬神';
        }

        // ✅ Vue 3中直接修改数组元素
        this.incenseSticks[index].burning = true;

        // 触发视图更新（如果需要）
        this.incenseSticks = [...this.incenseSticks];

        // 继续点燃下一根
        setTimeout(() => {
          this.lightIncenseStick(index + 1);
        }, 1500);
      }, 1000);
    },

    // 抽签
    drawLottery() {
      this.status = 'drawing'
      this.selectedNumber = null
    },

    // 开始抽签动画
    startDraw() {
      if (this.isDrawing) return

      this.isDrawing = true
      this.isShaking = true
      this.selectedNumber = null

      // 模拟摇签筒
      setTimeout(() => {
        this.isShaking = false

        // 随机选择签号
        setTimeout(() => {
          const randomIndex = Math.floor(Math.random() * this.lotteryNumbers.length)
          this.selectedNumber = this.lotteryNumbers[randomIndex]
          this.isDrawing = false

          // 触发抽签完成事件
          this.$emit('lottery-drawn', this.selectedNumber)
        }, 500)
      }, 2000)
    },

    // 继续掷圣杯
    continueWithCup() {
      this.status = 'throwingCups'
      this.cupThrows = 0
      this.cupResults = []
    },

    // 直接掷圣杯
    throwCups() {
      this.status = 'throwingCups'
      this.cupThrows = 0
      this.cupResults = []
      this.selectedNumber = null
    },

    // 掷一次圣杯
    throwSingleCup() {
      if (this.isThrowing || this.cupThrows >= 3) return

      this.isThrowing = true
      this.showCupResult = false

      // 掷杯动画
      setTimeout(() => {
        // 随机结果：positive(圣杯), negative(笑杯), standing(立杯)
        const results = ['positive', 'negative', 'standing']
        const randomIndex = Math.floor(Math.random() * results.length)
        this.cupResult = results[randomIndex]
        this.showCupResult = true

        // 记录结果
        this.cupResults.push(this.cupResult)
        this.cupThrows++

        this.isThrowing = false

        // 触发掷杯事件
        this.$emit('cup-thrown', {
          throwNumber: this.cupThrows,
          result: this.cupResult,
          totalThrows: this.cupResults
        })

        // 如果已经掷了3次，自动进入结果页面
        if (this.cupThrows >= 3) {
          setTimeout(() => {
            this.showFinal()
          }, 1500)
        }
      }, 1000)
    },

    // 显示最终结果
    showFinal() {
      this.status = 'final'

      // 触发完成事件
      this.$emit('ritual-complete', {
        lotteryNumber: this.selectedNumber,
        cupResults: this.cupResults
      })
    },

    // 重新开始
    restart() {
      this.status = 'initial'
      this.isBurning = false
      this.selectedNumber = null
      this.cupThrows = 0
      this.cupResults = []
      this.showCupResult = false
      this.cupResult = null
    },

    // 分享结果
    shareResult() {
      let shareText = '我在妈祖阁祈福：'
      if (this.selectedNumber) {
        shareText += `抽到第${this.selectedNumber}号灵签，`
      }
      if (this.cupResults.length > 0) {
        shareText += `掷杯${this.getCupSummary()}。`
      }
      shareText += '天公保佑，心想事成！'

      if (navigator.share) {
        navigator.share({
          title: '妈祖阁祈福结果',
          text: shareText,
          url: window.location.href
        })
      } else {
        // 复制到剪贴板
        navigator.clipboard.writeText(shareText)
        alert('祈福结果已复制到剪贴板！')
      }
    },

    // 获取掷杯结果文字
    getCupResultText(result) {
      const texts = {
        positive: '圣杯（吉）',
        negative: '笑杯（不确定）',
        standing: '立杯（特殊）'
      }
      return texts[result] || '未知'
    },

    // 获取掷杯总结
    getCupSummary() {
      if (this.cupResults.length === 0) return ''

      const counts = {
        positive: this.cupResults.filter(r => r === 'positive').length,
        negative: this.cupResults.filter(r => r === 'negative').length,
        standing: this.cupResults.filter(r => r === 'standing').length
      }

      let summary = ''
      if (counts.positive > 0) summary += `${counts.positive}次圣杯`
      if (counts.negative > 0) {
        if (summary) summary += '，'
        summary += `${counts.negative}次笑杯`
      }
      if (counts.standing > 0) {
        if (summary) summary += '，'
        summary += `${counts.standing}次立杯`
      }

      return summary
    },

    // 获取掷杯按钮文字
    getThrowButtonText() {
      if (this.isThrowing) return '掷杯中...'
      if (this.cupThrows >= 3) return '已掷3次'
      return `掷圣杯（${this.cupThrows + 1}/3）`
    }
  }
}
</script>

<style scoped>
.temple-container {
  width: 100%;
  margin: 20px auto;
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  color: #FFF;
  font-family: 'Microsoft YaHei', sans-serif;
}

/* 初始庙宇画面 */
.temple-scene {
  text-align: center;
  animation: fadeIn 1s ease;
}

.temple-image {
  position: relative;
  cursor: pointer;
  margin-bottom: 20px;
}

.temple-img {
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.click-hint {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  padding: 10px 20px;
  border-radius: 20px;
  color: #FFD700;
  font-size: 1.2em;
  animation: pulse 2s infinite;
}

.temple-title h2 {
  font-size: 2.5em;
  color: #FFD700;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.temple-title p {
  font-size: 1.2em;
  color: #FFF;
  opacity: 0.9;
}

/* 上香动画 */
.incense-animation {
  text-align: center;
  animation: fadeIn 1s ease;
}

.incense-stick {
  position: relative;
  width: 8px;
  height: 200px;
  margin: 0 auto 50px;
  transform-origin: bottom center;
  animation: incenseSway 3s ease-in-out infinite;
}

.stick {
  width: 100%;
  height: 80%;
  background: linear-gradient(to bottom, #8B7355, #A0522D);
  border-radius: 4px;
}

.ash {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 20px;
  background: #666;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.5s;
}

.incense-stick.burning .ash {
  opacity: 1;
  animation: ashFall 2s infinite;
}

.fire {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 30px;
  background: radial-gradient(circle, #FF4500, #FFD700);
  border-radius: 50% 50% 20% 20%;
  animation: fireFlicker 0.5s infinite;
}

.smoke {
  position: absolute;
  top: -40px;
  left: 50%;
  width: 4px;
  height: 60px;
  background: linear-gradient(to top, rgba(255,255,255,0.8), transparent);
  border-radius: 2px;
  animation: smokeRise 3s infinite;
}

.incense-bowl {
  width: 100px;
  height: 40px;
  margin: 0 auto;
  background: linear-gradient(135deg, #696969, #808080);
  border-radius: 50% 50% 0 0;
  position: relative;
}

.ash-pile {
  width: 60px;
  height: 20px;
  background: #555;
  border-radius: 50%;
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
}

.incense-text {
  margin-top: 30px;
  font-size: 1.5em;
  color: #FFD700;
  animation: textGlow 2s infinite;
}

/* 选择界面 */
.choice-container {
  text-align: center;
  animation: fadeIn 1s ease;
}

.choice-title h3 {
  font-size: 2em;
  color: #FFD700;
  margin-bottom: 10px;
}

.choice-buttons {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
}

.choice-btn {
  width: 180px;
  padding: 25px 20px;
  border: none;
  border-radius: 15px;
  background: linear-gradient(135deg, #D2691E, #8B4513);
  color: white;
  font-size: 1.2em;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.choice-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  background: linear-gradient(135deg, #CD853F, #A0522D);
}

.btn-icon {
  font-size: 2em;
}

.btn-text {
  font-weight: bold;
  font-size: 1.3em;
}

.btn-desc {
  font-size: 0.9em;
  opacity: 0.9;
}

/* 抽签界面 */
.draw-container {
  animation: fadeIn 1s ease;
}

.draw-title {
  text-align: center;
  margin-bottom: 30px;
}

.draw-title h3 {
  font-size: 2em;
  color: #FFD700;
  margin-bottom: 10px;
}

.lottery-tube {
  position: relative;
  height: 300px;
  margin: 40px 0;
}

.tube {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 250px;
  background: linear-gradient(135deg, #8B4513, #A0522D);
  border-radius: 10px;
  overflow: hidden;
}

.tube-opening {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background: #D2691E;
  border-radius: 10px 10px 0 0;
}

.sticks-container {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
}

.lottery-stick {
  position: absolute;
  width: 4px;
  height: 200px;
  background: #FFD700;
  border-radius: 2px;
  transform-origin: bottom center;
  transition: transform 0.3s ease;
}

.lottery-stick.shaking {
  animation: stickShake 0.1s infinite;
}

.stick-number {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: #FFD700;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
}

.lottery-stick.selected {
  background: #FF4500;
  z-index: 10;
  animation: selectedGlow 1s infinite;
}

.draw-controls {
  text-align: center;
}

.draw-action-btn {
  padding: 15px 40px;
  font-size: 1.2em;
  background: linear-gradient(135deg, #FFD700, #FF8C00);
  color: #8B4513;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.draw-action-btn:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
}

.draw-action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.draw-result {
  margin-top: 30px;
  animation: fadeIn 0.5s ease;
}

.result-number {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.lucky-number {
  color: #FFD700;
  font-size: 1.8em;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.result-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.action-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 20px;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.continue-btn {
  background: linear-gradient(135deg, #32CD32, #228B22);
  color: white;
}

.finish-btn {
  background: linear-gradient(135deg, #FFD700, #FF8C00);
  color: #8B4513;
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* 掷圣杯界面 */
.cup-container {
  animation: fadeIn 1s ease;
}

.cup-title {
  text-align: center;
  margin-bottom: 30px;
}

.cup-title h3 {
  font-size: 2em;
  color: #FFD700;
  margin-bottom: 10px;
}

.cup-counter {
  font-size: 1.2em;
  color: #FFD700;
  margin-top: 10px;
}

.cup-count {
  font-size: 1.5em;
  font-weight: bold;
}

.cup-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin: 40px 0;
}

.cup {
  position: relative;
  width: 100px;
  height: 150px;
  cursor: pointer;
  transition: all 0.5s ease;
  transform-style: preserve-3d;
}

.cup.throwing {
  animation: cupThrow 1s ease;
}

.cup.result {
  cursor: default;
}

.cup-positive {
  background: linear-gradient(135deg, #32CD32, #228B22);
}

.cup-negative {
  background: linear-gradient(135deg, #FF4500, #DC143C);
}

.cup-standing {
  background: linear-gradient(135deg, #FFD700, #FF8C00);
}

.cup-top {
  position: absolute;
  top: 0;
  left: 20%;
  width: 60%;
  height: 40px;
  background: inherit;
  border-radius: 50% 50% 0 0;
}

.cup-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: inherit;
  border-radius: 30% 30% 50% 50%;
}

.cup-result-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3em;
  z-index: 2;
}

.cup-results {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
}

.cup-result-item {
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
}

.result-positive {
  background: rgba(50, 205, 50, 0.2);
  color: #32CD32;
  border: 2px solid #32CD32;
}

.result-negative {
  background: rgba(255, 69, 0, 0.2);
  color: #FF4500;
  border: 2px solid #FF4500;
}

.result-standing {
  background: rgba(255, 215, 0, 0.2);
  color: #FFD700;
  border: 2px solid #FFD700;
}

.cup-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.cup-action-btn, .cup-finish-btn {
  padding: 15px 30px;
  border: none;
  border-radius: 25px;
  font-size: 1.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.cup-action-btn {
  background: linear-gradient(135deg, #4169E1, #1E90FF);
  color: white;
}

.cup-finish-btn {
  background: linear-gradient(135deg, #FFD700, #FF8C00);
  color: #8B4513;
}

.cup-action-btn:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(65, 105, 225, 0.4);
}

.cup-action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cup-finish-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
}

/* 最终结果 */
.final-container {
  animation: fadeIn 1s ease;
}

.final-content {
  text-align: center;
  padding: 30px;
}

.blessing-text {
  margin-bottom: 40px;
}

.blessing-title {
  font-size: 3.5em;
  color: #FFD700;
  margin-bottom: 20px;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.7);
  animation: titleGlow 2s infinite;
}

.blessing-message {
  font-size: 1.3em;
  line-height: 1.8;
}

.blessing-main {
  font-size: 1.6em;
  color: #FFD700;
  margin: 20px 0;
  font-weight: bold;
}

.blessing-sub {
  font-size: 1.2em;
  color: #FFA500;
}

.god-image {
  position: relative;
  margin: 40px 0;
}

.wealth-god {
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.gold-coins {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2em;
  animation: coinFall 3s infinite;
}

.final-actions {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
}

.restart-btn, .share-btn {
  padding: 15px 40px;
  font-size: 1.2em;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.restart-btn {
  background: linear-gradient(135deg, #32CD32, #228B22);
  color: white;
}

.share-btn {
  background: linear-gradient(135deg, #4169E1, #1E90FF);
  color: white;
}

.restart-btn:hover, .share-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

/* 动画定义 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: translateX(-50%) scale(1); }
  50% { transform: translateX(-50%) scale(1.05); }
}

@keyframes incenseSway {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}

@keyframes fireFlicker {
  0%, 100% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translateX(-50%) scale(0.9);
  }
}

@keyframes smokeRise {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(0);
  }
  50% {
    opacity: 0.5;
    transform: translateX(-50%) translateY(-20px);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-60px);
  }
}

@keyframes ashFall {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(40px);
  }
}

@keyframes textGlow {
  0%, 100% { text-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }
  50% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
}

@keyframes stickShake {
  0%, 100% { transform: rotate(var(--rotate)) translateY(-180px) rotate(0deg); }
  25% { transform: rotate(var(--rotate)) translateY(-180px) rotate(-2deg); }
  75% { transform: rotate(var(--rotate)) translateY(-180px) rotate(2deg); }
}

@keyframes selectedGlow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(255, 69, 0, 0.5);
    background: #FF4500;
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 69, 0, 0.8);
    background: #FF6347;
  }
}

@keyframes cupThrow {
  0% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(90deg) scale(1.1); }
  50% { transform: rotate(180deg) scale(1); }
  75% { transform: rotate(270deg) scale(0.9); }
  100% { transform: rotate(360deg) scale(1); }
}

@keyframes titleGlow {
  0%, 100% {
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.7);
    transform: scale(1);
  }
  50% {
    text-shadow: 0 0 30px rgba(255, 215, 0, 1);
    transform: scale(1.02);
  }
}

@keyframes coinFall {
  0% {
    transform: translateX(-50%) translateY(-20px) rotate(0deg);
    opacity: 0;
  }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% {
    transform: translateX(-50%) translateY(20px) rotate(360deg);
    opacity: 0;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .temple-container {
    padding: 20px;
    margin: 10px;
  }

  .choice-buttons {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .choice-btn {
    width: 100%;
    max-width: 300px;
  }

  .result-actions {
    flex-direction: column;
    gap: 10px;
  }

  .cup-results {
    width: 100%;
  }

  .final-actions {
    flex-direction: column;
    gap: 15px;
  }

  .blessing-title {
    font-size: 2.5em;
  }
}
/* 上香动画样式 - 三根香 */
.incense-animation {
  text-align: center;
  animation: fadeIn 1s ease;
}

.incense-group {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin: 0 auto 50px;
  position: relative;
  height: 250px;
}

.incense-stick {
  position: relative;
  width: 8px;
  height: 200px;
  transform-origin: bottom center;
}

.stick-1 {
  animation: incenseSwayLeft 3s ease-in-out infinite;
}

.stick-2 {
  animation: incenseSwayCenter 3s ease-in-out infinite;
}

.stick-3 {
  animation: incenseSwayRight 3s ease-in-out infinite;
}

.stick {
  width: 100%;
  height: 80%;
  background: linear-gradient(to bottom, #8B7355, #A0522D);
  border-radius: 4px;
  position: absolute;
  bottom: 0;
  left: 0;
}

.ash {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 20px;
  background: linear-gradient(to bottom, #888, #666);
  border-radius: 50% 50% 0 0;
  opacity: 0;
  animation: ashFall 2s infinite;
}

.incense-stick.burning .ash {
  opacity: 1;
}

.fire {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 30px;
  background: radial-gradient(circle, #FF4500 0%, #FF8C00 50%, #FFD700 100%);
  border-radius: 50% 50% 20% 20%;
  box-shadow: 0 0 15px rgba(255, 69, 0, 0.8);
  animation: fireFlicker 0.5s infinite;
  z-index: 2;
}

.smoke {
  position: absolute;
  top: -40px;
  left: 50%;
  width: 4px;
  height: 60px;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.8), transparent);
  border-radius: 2px;
  animation: smokeRise 3s infinite;
}

.incense-bowl {
  width: 180px;
  height: 50px;
  margin: 0 auto;
  background: linear-gradient(135deg, #696969, #808080);
  border-radius: 50% 50% 0 0;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.ash-pile {
  width: 120px;
  height: 25px;
  background: linear-gradient(to top, #555, #666);
  border-radius: 50%;
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
}

.incense-text {
  margin: 30px 0;
  font-size: 1.5em;
  color: #FFD700;
  animation: textGlow 2s infinite;
  font-weight: bold;
}

.incense-meaning {
  margin-top: 40px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.incense-meaning p {
  color: #FFD700;
  margin-bottom: 15px;
  font-size: 1.2em;
}

.meaning-items {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.meaning-item {
  padding: 10px 20px;
  background: rgba(139, 69, 19, 0.5);
  border-radius: 10px;
  border: 1px solid #FFD700;
  color: #FFD700;
  font-size: 1.1em;
  min-width: 100px;
  transition: all 0.3s ease;
}

.meaning-item:hover {
  background: rgba(139, 69, 19, 0.8);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
}

/* 三根香不同的摇摆动画 */
@keyframes incenseSwayLeft {
  0%, 100% {
    transform: rotate(-10deg) translateY(0);
  }
  25% {
    transform: rotate(-8deg) translateY(-5px);
  }
  50% {
    transform: rotate(-5deg) translateY(0);
  }
  75% {
    transform: rotate(-12deg) translateY(5px);
  }
}

@keyframes incenseSwayCenter {
  0%, 100% {
    transform: rotate(0deg) translateY(0);
  }
  25% {
    transform: rotate(2deg) translateY(-5px);
  }
  50% {
    transform: rotate(-2deg) translateY(0);
  }
  75% {
    transform: rotate(0deg) translateY(5px);
  }
}

@keyframes incenseSwayRight {
  0%, 100% {
    transform: rotate(10deg) translateY(0);
  }
  25% {
    transform: rotate(8deg) translateY(-5px);
  }
  50% {
    transform: rotate(5deg) translateY(0);
  }
  75% {
    transform: rotate(12deg) translateY(5px);
  }
}

/* 更细腻的火焰动画 */
@keyframes fireFlicker {
  0%, 100% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
    box-shadow: 0 0 15px rgba(255, 69, 0, 0.8);
  }
  25% {
    opacity: 0.9;
    transform: translateX(-50%) scale(0.95) rotate(5deg);
    box-shadow: 0 0 12px rgba(255, 140, 0, 0.7);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scale(1.05) rotate(-5deg);
    box-shadow: 0 0 18px rgba(255, 215, 0, 0.9);
  }
  75% {
    opacity: 0.8;
    transform: translateX(-50%) scale(0.98) rotate(3deg);
    box-shadow: 0 0 10px rgba(255, 69, 0, 0.6);
  }
}

/* 烟雾上升动画 */
@keyframes smokeRise {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(0) scale(0.5);
    filter: blur(1px);
  }
  20% {
    opacity: 0.8;
    transform: translateX(-50%) translateY(-40px) scale(1);
    filter: blur(2px);
  }
  40% {
    opacity: 0.6;
    transform: translateX(-50%) translateY(-80px) scale(1.2);
    filter: blur(3px);
  }
  60% {
    opacity: 0.4;
    transform: translateX(-50%) translateY(-120px) scale(1.4);
    filter: blur(4px);
  }
  80% {
    opacity: 0.2;
    transform: translateX(-50%) translateY(-160px) scale(1.6);
    filter: blur(5px);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-200px) scale(1.8);
    filter: blur(6px);
  }
}

/* 香灰掉落动画 */
@keyframes ashFall {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
  30% {
    opacity: 0.8;
    transform: translateX(-50%) translateY(15px) scale(0.9);
  }
  60% {
    opacity: 0.5;
    transform: translateX(-50%) translateY(30px) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(60px) scale(0.7);
  }
}

/* 文字发光动画 */
@keyframes textGlow {
  0%, 100% {
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5),
    0 0 20px rgba(255, 215, 0, 0.3);
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.8),
    0 0 40px rgba(255, 215, 0, 0.5),
    0 0 60px rgba(255, 215, 0, 0.3);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .incense-group {
    gap: 30px;
    height: 200px;
  }

  .incense-stick {
    height: 160px;
  }

  .meaning-items {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .meaning-item {
    width: 80%;
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  .incense-group {
    gap: 20px;
  }

  .incense-stick {
    width: 6px;
    height: 140px;
  }

  .fire {
    width: 12px;
    height: 24px;
  }

  .smoke {
    width: 3px;
    height: 50px;
  }
}
.scene-wrapper {
  min-height: 600px; /* 固定最小高度 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0;
  box-sizing: border-box;
}

.temple-container {
  width: 100%;
  margin: 20px auto;
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  color: #FFF;
  font-family: 'Microsoft YaHei', sans-serif;
  min-height: 700px; /* 容器也有最小高度 */
}

/* 初始庙宇画面 */
.temple-scene {
  text-align: center;
  animation: fadeIn 1s ease;
}

.temple-image {
  position: relative;
  cursor: pointer;
  margin: 20px 0;
  max-height: 400px; /* 限制图片最大高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 15px;
}

.temple-img {
  width: auto;
  max-width: 100%;
  max-height: 400px; /* 限制图片最大高度 */
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  object-fit: contain; /* 保持原图比例，不拉伸 */
}

/* 最终结果中的图片容器 */
.god-image {
  position: relative;
  margin: 20px 0;
  max-height: 300px; /* 限制财神图片高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.wealth-god {
  width: auto;
  max-width: 100%;
  max-height: 300px; /* 限制图片最大高度 */
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  object-fit: contain; /* 保持原图比例，不拉伸 */
}

/* 上香动画容器调整 */
.incense-animation {
  text-align: center;
  animation: fadeIn 1s ease;
  justify-content: space-around; /* 更均匀地分布空间 */
}

.incense-group {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin: 0 auto 30px; /* 减少底部间距 */
  position: relative;
  height: 220px; /* 稍微降低高度 */
}

/* 选择界面调整 */
.choice-container {
  text-align: center;
  animation: fadeIn 1s ease;
}

.choice-buttons {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 30px;
  margin-bottom: 30px;
}

/* 抽签界面调整 */
.draw-container {
  animation: fadeIn 1s ease;
}

.lottery-tube {
  position: relative;
  height: 280px; /* 稍微降低高度 */
  margin: 30px 0;
}

/* 掷圣杯界面调整 */
.cup-container {
  animation: fadeIn 1s ease;
}

.cup-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px; /* 减少间距 */
  margin: 30px 0;
}

/* 最终结果调整 */
.final-content {
  text-align: center;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;
}

.blessing-text {
  margin-bottom: 30px;
}

.final-actions {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .scene-wrapper {
    min-height: 500px; /* 移动端稍低 */
    padding: 15px 0;
  }

  .temple-container {
    padding: 20px;
    margin: 10px;
    min-height: 600px;
  }

  .temple-img {
    max-height: 300px; /* 移动端更小 */
  }

  .wealth-god {
    max-height: 200px; /* 移动端更小 */
  }

  .incense-group {
    height: 180px;
    gap: 40px;
    margin-bottom: 20px;
  }

  .choice-buttons {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .lottery-tube {
    height: 240px;
    margin: 20px 0;
  }
}

@media (max-width: 480px) {
  .scene-wrapper {
    min-height: 450px;
    padding: 10px 0;
  }

  .temple-container {
    min-height: 550px;
  }

  .temple-img {
    max-height: 250px;
  }

  .wealth-god {
    max-height: 180px;
  }

  .incense-group {
    height: 150px;
    gap: 30px;
  }
}
</style>
