<template>
  <div class="box pad" id="yxym">
    <table
      border="1"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      bordercolorlight="#FFFFFF"
      bordercolordark="#FFFFFF"
      bgcolor="#FFFFFF"
      class="gg"
    >
      <!-- 特殊情况：第一个固定行 -->
      <tr v-if="showSpecialRow">
        <td width="100%" style="text-align: center; background: #00ff00">
          <a :href="specialRow.href" :target="specialRow.target">
            {{ specialRow.text }}
          </a>
        </td>
      </tr>

      <!-- 动态数据行 -->
      <tr v-for="(item, index) in predictions" :key="item.id || index">
        <td width="100%" style="text-align: center; background: #00ff00">
          <a
            href="javascript:void(0);"
            @click="openLink(item.link, '#27849db')"
            :class="{ 'disabled-link': !item.link }"
            :title="item.title || item.desc"
          >
            {{ getDisplayText(item) }}
          </a>
        </td>
      </tr>

      <!-- 空数据提示 -->
      <tr v-if="predictions.length === 0 && !loading">
        <td width="100%" style="text-align: center; background: #00ff00; padding: 20px">
          <span style="color: #666">暂无数据</span>
        </td>
      </tr>

      <!-- 加载中状态 -->
      <tr v-if="loading">
        <td width="100%" style="text-align: center; background: #00ff00; padding: 20px">
          <span style="color: #666">加载中...</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PredictionTable',
  props: {
    // 预测数据数组
    predictions: {
      type: Array,
      default: () => [],
      validator: (value) => {
        return value.every((item) => {
          return item && typeof item === 'object'
        })
      },
    },
    // 是否显示特殊行
    showSpecialRow: {
      type: Boolean,
      default: true,
    },
    // 特殊行配置
    specialRow: {
      type: Object,
      default: () => ({
        href: '/lhkl8.html',
        target: '_blank',
        text: '福彩快乐8→【官方资料区】←5A级大公开',
      }),
    },
    // 是否正在加载
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 可以在这里添加组件内部的状态
    }
  },
  computed: {
    // 计算是否有数据
    hasData() {
      return this.predictions.length > 0
    },
  },
  methods: {
    /**
     * 打开链接
     * @param {string} link - 链接地址
     * @param {string} fallbackColor - 回退颜色（原代码中的参数）
     */
    openLink(link, fallbackColor = '#27849db') {
      if (!link) {
        console.warn('链接为空')
        return
      }

      // 判断链接类型
      if (link.startsWith('http://') || link.startsWith('https://')) {
        // 外部链接，新窗口打开
        window.open(link, '_blank')
      } else if (link.startsWith('javascript:')) {
        // JavaScript 代码，使用 eval（注意安全风险）
        try {
          const jsCode = link.replace('javascript:', '')
          // 安全起见，这里应该对 jsCode 进行验证
          if (this.isSafeJSCode(jsCode)) {
            eval(jsCode)
          }
        } catch (error) {
          console.error('执行 JavaScript 出错:', error)
        }
      } else if (link.startsWith('#')) {
        // 锚点链接
        const element = document.querySelector(link)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // 内部链接，使用路由跳转（如果使用 Vue Router）
        if (this.$router) {
          this.$router.push(link)
        } else {
          // 如果没有 Vue Router，使用普通跳转
          window.location.href = link
        }
      }
    },

    /**
     * 检查 JavaScript 代码是否安全（简单示例）
     * @param {string} code - JavaScript 代码
     * @returns {boolean} 是否安全
     */
    isSafeJSCode(code) {
      // 这里应该实现更严格的安全检查
      const unsafePatterns = [
        'document.cookie',
        'localStorage',
        'sessionStorage',
        'eval(',
        'Function(',
        'setTimeout(',
        'setInterval(',
        'XMLHttpRequest',
        'fetch(',
        'window.location',
        'window.open',
        'alert(',
        'confirm(',
        'prompt(',
      ]

      return !unsafePatterns.some((pattern) => code.toLowerCase().includes(pattern.toLowerCase()))
    },

    /**
     * 获取显示文本
     * @param {Object} item - 数据项
     * @returns {string} 显示的文本
     */
    getDisplayText(item) {
      // 如果提供了自定义显示文本
      if (item.displayText) {
        return item.displayText
      }

      // 根据 period, name, title, desc 生成文本
      const parts = []
      if (item.period) parts.push(item.period+': ')
      if (item.name) parts.push(item.name)
      if (item.title) parts.push(`→【${item.title}】←`)
      if (item.desc) parts.push(item.desc)

      return parts.join('')
    },
  },
  watch: {
    // 监听数据变化
    predictions: {
      handler(newVal) {
        console.log('预测数据已更新:', newVal)
        // 可以在这里添加数据变化时的处理逻辑
      },
      deep: true,
    },
  },
  mounted() {
    // 组件挂载后的逻辑
    console.log('PredictionTable 组件已挂载')
  },
}
</script>

<style scoped>
.box.pad {
  margin: 0;
  padding: 0;
  width: 100%;
}

table.gg {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

table.gg tr {
  transition: background-color 0.3s ease;
}

table.gg tr:hover {
  background-color: #e8f5e9 !important;
}

table.gg td {
  padding: 12px 8px;
  border: 1px solid #fff;
  font-family: Arial, sans-serif;
}

table.gg a {
  color: #000;
  text-decoration: none;
  font-weight: bold;
  display: block;
  transition: all 0.3s ease;
  padding: 4px 0;
}

table.gg a:hover {
  color: #ff0000;
  text-decoration: underline;
  transform: translateY(-1px);
}

table.gg a.disabled-link {
  color: #999;
  cursor: not-allowed;
  pointer-events: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  table.gg td {
    padding: 8px 4px;
    font-size: 14px;
  }

  table.gg a {
    font-size: 18pt;
    padding: 3px 0;
  }
}

@media (max-width: 480px) {
  .box.pad {
    overflow-x: auto;
  }

  table.gg {
    min-width: 320px;
  }

  table.gg td {
    padding: 6px 3px;
    font-size: 12px;
  }

  table.gg a {
    font-size: 14pt;
    padding: 2px 0;
  }
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

table.gg tr {
  animation: fadeIn 0.5s ease forwards;
}

table.gg tr:nth-child(odd) {
  animation-delay: calc(var(--row-index, 0) * 0.1s);
}
</style>
