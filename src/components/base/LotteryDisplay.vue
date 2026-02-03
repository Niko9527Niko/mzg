<template>
  <div :class="['box pad', containerClass]" :id="containerId">
    <!-- 标题部分 -->
    <div v-if="showTitle" class="list-title">
      <slot name="list-title" v-if="hasListTitleSlot">
        <!-- 默认插槽内容 -->
        <span v-if="!isTitleHtml" class="title-text">
          {{ computedTitle }}
        </span>
        <span v-else class="title-html" v-html="computedTitle"></span>
      </slot>
      <template v-else>
        <span v-if="!isTitleHtml" class="title-text">
          {{ computedTitle }}
        </span>
        <span v-else class="title-html" v-html="computedTitle"></span>
      </template>
    </div>

    <!-- 表格部分 -->
    <slot name="table-content" v-if="hasTableContentSlot"></slot>
    <template v-else-if="tableData">
      <!-- 使用数据驱动方式 -->
      <table
        border="1"
        width="100%"
        :class="['duilianpt', tableClass]"
        :style="tableStyle"
        :bgcolor="tableBgColor"
        cellspacing="0"
      >
        <tbody>
          <tr v-for="(row, index) in tableData" :key="row.id || index">
            <td v-if="row.isHtml" v-html="row.content"></td>
            <td v-else :style="getCellStyle(row)">
              <!-- 期号 -->
              <span :style="{ color: row.periodColor || periodColor }">
                {{ row.period }}
              </span>

              <!-- 波色 -->
              <span class="zl" v-if="row.wave">
                『<span :style="getWaveStyle(row.wave)" v-html="getWaveDisplay(row.wave)"></span>』
              </span>

              <!-- 标签 -->
              <span :style="{ color: row.labelColor || labelColor }">
                {{ row.label || defaultLabel }}
              </span>

              <!-- 号码列表 -->
              <span class="zl" v-if="row.numbers">
                <span
                  v-for="(number, numIndex) in formatNumbers(row.numbers)"
                  :key="`num-${index}-${numIndex}`"
                  :class="[
                    'number-item',
                    {
                      highlighted: isHighlighted(number, row.highlighted),
                    },
                  ]"
                  :style="getNumberStyle(number, row.highlighted)"
                >
                  {{ number }}
                  <span v-if="numIndex < formatNumbers(row.numbers).length - 1" class="separator"
                    >.</span
                  >
                </span>
              </span>

              <!-- 自定义内容 -->
              <span v-if="row.customContent" v-html="row.customContent"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <div v-else-if="tableHtml" v-html="tableHtml"></div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'LotteryDisplay',
  props: {
    // 容器相关
    containerId: {
      type: String,
      default: 'yxym',
    },
    containerClass: {
      type: String,
      default: '',
    },

    // 标题相关
    listTitle: {
      type: [String, Object],
      default: '',
    },
    showTitle: {
      type: Boolean,
      default: true,
    },

    // 表格相关（多种使用方式）
    tableData: {
      type: Array,
      default: null,
    },
    tableHtml: {
      type: String,
      default: '',
    },
    tableClass: {
      type: String,
      default: '',
    },
    tableBgColor: {
      type: String,
      default: '#ffffff',
    },
    tableStyle: {
      type: Object,
      default: () => ({
        bordercolor: '#FFFFFF',
        bordercolorlight: '#FFFFFF',
        bordercolordark: '#FFFFFF',
      }),
    },

    // 样式配置
    periodColor: {
      type: String,
      default: '#000000',
    },
    labelColor: {
      type: String,
      default: '#000000',
    },
    defaultLabel: {
      type: String,
      default: '主:',
    },

    // 波色配置
    waveColors: {
      type: Object,
      default: () => ({
        红波: {
          name: '红波',
          bgColor: '#FFFF00',
          textColor: '#000000',
        },
        蓝波: {
          name: '蓝波',
          bgColor: '#FFFF00',
          textColor: '#000000',
        },
        绿波: {
          name: '绿波',
          bgColor: '#FFFF00',
          textColor: '#000000',
        },
      }),
    },

    // 高亮配置
    highlightConfig: {
      type: Object,
      default: () => ({
        bgColor: '#FFFF00',
        textColor: '#000000',
        fontWeight: 'bold',
      }),
    },
  },
  setup(props, { slots }) {
    // 检查是否有插槽
    const hasListTitleSlot = computed(() => {
      return !!slots['list-title']
    })

    const hasTableContentSlot = computed(() => {
      return !!slots['table-content']
    })

    // 计算标题
    const computedTitle = computed(() => {
      if (typeof props.listTitle === 'string') {
        return props.listTitle
      } else if (props.listTitle && props.listTitle.text) {
        return props.listTitle.text
      }
      return '妈祖阁『一波主8码』'
    })

    // 判断标题是否为HTML
    const isTitleHtml = computed(() => {
      if (typeof props.listTitle === 'string') {
        return props.listTitle.includes('<')
      }
      return false
    })

    return {
      hasListTitleSlot,
      hasTableContentSlot,
      computedTitle,
      isTitleHtml,
    }
  },
  methods: {
    // 格式化号码
    formatNumbers(numbers) {
      if (Array.isArray(numbers)) {
        return numbers
      } else if (typeof numbers === 'string') {
        return numbers.split('.').map((num) => num.trim())
      }
      return []
    },

    // 获取波色样式
    getWaveStyle(wave) {
      if (typeof wave === 'string') {
        const waveConfig = this.waveColors[wave] || this.waveColors['红波']
        return {
          backgroundColor: waveConfig.bgColor,
          color: waveConfig.textColor,
          padding: '2px 4px',
          borderRadius: '2px',
          fontWeight: 'bold',
        }
      } else if (typeof wave === 'object') {
        return {
          backgroundColor: wave.bgColor || '#FFFF00',
          color: wave.textColor || '#000000',
          padding: wave.padding || '2px 4px',
          borderRadius: wave.borderRadius || '2px',
          fontWeight: wave.fontWeight || 'bold',
          ...wave.style,
        }
      }
      return {}
    },

    // 获取波色显示文本
    getWaveDisplay(wave) {
      if (typeof wave === 'string') {
        return wave
      } else if (typeof wave === 'object') {
        return wave.name || wave.text || ''
      }
      return ''
    },

    // 获取单元格样式
    getCellStyle(row) {
      const baseStyle = {
        padding: '8px',
        textAlign: 'left',
        fontSize: '14px',
        lineHeight: '1.5',
      }

      if (row.style) {
        return { ...baseStyle, ...row.style }
      }

      return baseStyle
    },

    // 获取号码样式
    getNumberStyle(number, highlightedNumbers) {
      const baseStyle = {
        display: 'inline-block',
        margin: '0 1px',
        fontWeight: 'normal',
      }

      if (this.isHighlighted(number, highlightedNumbers)) {
        return {
          ...baseStyle,
          backgroundColor: this.highlightConfig.bgColor,
          color: this.highlightConfig.textColor,
          fontWeight: this.highlightConfig.fontWeight,
          padding: '0 2px',
          borderRadius: '2px',
        }
      }

      return baseStyle
    },

    // 检查是否高亮
    isHighlighted(number, highlightedNumbers) {
      if (!highlightedNumbers) return false

      if (Array.isArray(highlightedNumbers)) {
        return highlightedNumbers.includes(number.toString())
      } else if (typeof highlightedNumbers === 'string') {
        return highlightedNumbers
          .split(',')
          .map((n) => n.trim())
          .includes(number.toString())
      }

      return false
    },
  },
}
</script>

<style scoped>
.box.pad {
  margin: 10px 0;
  padding: 0;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.list-title {
  background: linear-gradient(transparent, #fffcfc);
  font-size: 26px;
  color: #000;
  text-shadow: 0px 0px 10px #e5e5e5;
}

.title-text {
  display: inline-block;
}
.list-title .title-text {
  ackground: linear-gradient(transparent, #fffcfc);
  font-size: 26px;
  color: #000;
  text-shadow: 0px 0px 10px #e5e5e5;
}
.title-html {
  display: inline-block;
}

.duilianpt {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
}

.duilianpt tr {
  transition: background-color 0.3s ease;
}

.duilianpt tr:hover {
  background-color: #f8f9fa;
}

.duilianpt td {
  padding: 10px 15px;
  border: 1px solid #e0e0e0;
  vertical-align: middle;
}

.zl {
  margin: 0 4px;
  font-weight: bold;
}

.number-item {
  display: inline-block;
  margin: 0 1px;
  transition: all 0.3s ease;
}

.number-item.highlighted {
  animation: pulse 1s infinite;
}

.number-item:hover {
  transform: scale(1.1);
}

.separator {
  margin-left: 1px;
  color: #666;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .box.pad {
    margin: 5px 0;
  }

  .list-title {
    font-size: 26px;
  }
  .list-title .title-text {
    font-size: 26px;
  }

  .duilianpt td {
    padding: 8px 10px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .duilianpt td {
    padding: 6px 8px;
    font-size: 12px;
  }

  .zl {
    margin: 0 2px;
  }
}
</style>
