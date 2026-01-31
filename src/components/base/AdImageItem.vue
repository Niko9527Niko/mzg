<template>
  <a
    class="ad-image-link"
    :href="href"
    :target="target"
    rel="noopener noreferrer"
    @click="handleClick"
  >
    <img :src="src" :alt="alt" :style="style" loading="lazy" @error="handleImageError" />
  </a>
</template>

<script>
export default {
  name: 'AdImageItem',
  props: {
    href: {
      type: String,
      required: true,
      validator: (value) => {
        return value && (value.startsWith('http://') || value.startsWith('https://'))
      },
    },
    src: {
      type: String,
      required: true,
      validator: (value) => {
        return value && (value.startsWith('http://') || value.startsWith('https://'))
      },
    },
    alt: {
      type: String,
      default: '广告图片',
    },
    target: {
      type: String,
      default: '_blank',
    },
    style: {
      type: [String, Object],
      default: '',
    },
    // 广告ID，用于统计
    adId: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      imageLoaded: false,
      imageError: false,
      fallbackImage:
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjNlbSIgZmlsbD0iIzAwMCI+QURTPC90ZXh0Pjwvc3ZnPg==',
    }
  },
  computed: {
    // 计算图片样式
    computedStyle() {
      if (typeof this.style === 'string') {
        return this.style
      } else if (typeof this.style === 'object') {
        return Object.entries(this.style)
          .map(([key, value]) => `${key}: ${value}`)
          .join('; ')
      }
      return ''
    },

    // 计算图片源
    computedSrc() {
      return this.imageError ? this.fallbackImage : this.src
    },
  },
  methods: {
    handleClick(event) {
      // 触发点击事件，可以用于统计
      this.$emit('click', {
        event,
        adId: this.adId,
        href: this.href,
        src: this.src,
      })

      // 可以在这里添加统计逻辑
      this.trackAdClick()
    },

    handleImageError() {
      console.warn(`广告图片加载失败: ${this.src}`)
      this.imageError = true
      this.$emit('error', { src: this.src, adId: this.adId })
    },

    trackAdClick() {
      // 广告点击统计逻辑
      console.log(`广告点击统计: ${this.adId} - ${this.href}`)
      // 实际项目中可以发送到统计服务器
      // fetch('/api/ad-click', { method: 'POST', body: JSON.stringify({ adId: this.adId }) })
    },
  },
  mounted() {
    // 预加载图片
    const img = new Image()
    img.onload = () => {
      this.imageLoaded = true
      this.$emit('loaded', { src: this.src, adId: this.adId })
    }
    img.src = this.src
  },
}
</script>

<style scoped>
.ad-image-link {
  display: block;
  text-decoration: none;
  border: none;
  outline: none;
  transition: opacity 0.3s ease;
}

.ad-image-link:hover {
  opacity: 0.9;
}

.ad-image-link img {
  display: block;
  max-width: 100%;
  height: auto;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .ad-image-link img {
    border-radius: 2px;
  }
}
</style>
