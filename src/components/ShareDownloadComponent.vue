<template>
  <div>
    <!-- 固定下载按钮 -->
    <div id="guanbia" class="download66">
      <a
        target="_blank"
        href="https://ye-5.za.ixia.byzicons.com:8443/0149dh/"
        class="btn"
        id="apas"
      >
        下载<br />APP
      </a>
    </div>

    <!-- 分享按钮 -->
<!--    <div id="share" @click="showModal">分享</div>-->

    <!-- 底部横幅 -->
    <div class="bottom-banner">
      <div
        class="dbfont1"
        @click="kaifenx"
        style="
          height: 40px;
          background-color: rgba(0, 0, 0, 0.7);
          width: 100%;
          border-top: 1px solid #fff;
          text-align: center;
          font-weight: 700;
          color: #fff;
          line-height: 40px;
        "
      >
        <span
          @click.stop="showModal"
          style="color: #fff; font-weight: bold; padding: 5px 2px; font-size: 20px"
          class="smtm"
        >
          身边人打不开本站怎么办？请
          <span
            style="
              background-color: #ec0909;
              border-radius: 5px;
              color: #fff;
              margin-left: 6px;
              padding: 4px 4px;
            "
            >点击分享</span
          >
        </span>
      </div>
    </div>

    <!-- 分享模态框 -->
    <div id="modal" v-show="modalVisible" @click="closeModal">
      <div class="container" @click.stop>
        <div class="header2">链接分享</div>
        <div class="message">链接已复制，请发送给好友！</div>
        <div class="link" id="shareLink">{{ shareLink }}</div>
        <div id="qrcode"></div>
        <div id="countdown2">或面对面分享，使用浏览器扫码</div>
        <div id="countdown">
          弹窗将在 <span>{{ countdown }}</span> 秒后自动关闭
        </div>
        <div>
          <button class="button blue-button" @click="openWeChat">打开微信</button>
          <button class="button" @click="closeModal">立即关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 不再直接导入 qrcodejs2，改用动态加载
export default {
  name: 'ShareDownloadComponent',
  data() {
    return {
      modalVisible: false,
      shareLink: '',
      countdown: 20,
      countdownTimer: null,
      qrcodeInstance: null,
      qrCodeLoaded: false,
    }
  },
  mounted() {
    // 在客户端环境中才加载 QRCode 库
    if (typeof window !== 'undefined') {
      this.loadQRCodeLibrary()
    }
  },
  beforeUnmount() {
    // 清除定时器
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer)
    }
  },
  methods: {
    async loadQRCodeLibrary() {
      // 避免重复加载
      if (this.qrCodeLoaded || window.QRCode) {
        this.qrCodeLoaded = true
        return
      }

      try {
        // 方案1：使用 CDN 加载（原方案）
        await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js')
        console.log('QRCode library loaded from CDN')
        this.qrCodeLoaded = true
      } catch (error) {
        console.warn('Failed to load QRCode from CDN, trying alternative...', error)

        // 方案2：使用另一个 CDN
        try {
          await this.loadScript('https://cdn.jsdelivr.net/npm/qrcodejs2@0.0.2/qrcode.min.js')
          console.log('QRCode library loaded from alternative CDN')
          this.qrCodeLoaded = true
        } catch (error2) {
          console.error('Failed to load QRCode library', error2)
          // 可以在这里使用备选方案，比如生成二维码图片的 API
        }
      }
    },

    loadScript(src) {
      return new Promise((resolve, reject) => {
        // 检查是否已加载
        const existingScript = document.querySelector(`script[src="${src}"]`)
        if (existingScript) {
          resolve()
          return
        }

        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
        document.head.appendChild(script)
      })
    },

    showModal() {
      // 确保在客户端环境执行
      if (typeof window === 'undefined') return

      const currentPageURL = window.location.href
      this.shareLink = `${currentPageURL}#FX`
      this.modalVisible = true

      // 复制到剪贴板
      this.copyToClipboard(this.shareLink)

      // 生成二维码
      this.generateQRCode(currentPageURL)

      // 开始倒计时
      this.startCountdown()
    },

    generateQRCode(text) {
      // 确保在客户端环境执行
      if (typeof window === 'undefined') return

      // 清除之前的二维码
      const qrcodeEl = document.getElementById('qrcode')
      if (!qrcodeEl) return

      qrcodeEl.innerHTML = ''

      // 检查 QRCode 库是否可用
      if (window.QRCode) {
        try {
          this.qrcodeInstance = new window.QRCode(qrcodeEl, {
            text: text,
            width: 150,
            height: 150,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: window.QRCode.CorrectLevel.H,
          })
        } catch (error) {
          console.error('Failed to generate QR code:', error)
          this.showQRCodeFallback(qrcodeEl, text)
        }
      } else {
        console.warn('QRCode library not loaded, using fallback')
        this.showQRCodeFallback(qrcodeEl, text)
      }
    },

    showQRCodeFallback(element, text) {
      // 备选方案：使用第三方 API 生成二维码图片
      const encodedText = encodeURIComponent(text)
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedText}`

      element.innerHTML = `<img src="${qrCodeUrl}" alt="QR Code" />`
    },

    copyToClipboard(text) {
      if (typeof window === 'undefined') return

      // 使用现代 Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(
          () => {
            alert('内容已成功复制到剪贴板！')
          },
          (err) => {
            // 如果 Clipboard API 失败，使用备选方案
            this.fallbackCopyToClipboard(text)
          },
        )
      } else {
        // 使用传统方法
        this.fallbackCopyToClipboard(text)
      }
    },

    fallbackCopyToClipboard(text) {
      const el = document.createElement('textarea')
      el.value = text
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.select()

      try {
        document.execCommand('copy')
        alert('内容已成功复制到剪贴板！')
      } catch (err) {
        console.error('Failed to copy text: ', err)
        alert('复制失败，请手动复制链接')
      }

      document.body.removeChild(el)
    },

    startCountdown() {
      this.countdown = 20

      if (this.countdownTimer) {
        clearInterval(this.countdownTimer)
      }

      this.countdownTimer = setInterval(() => {
        this.countdown--
        if (this.countdown === 0) {
          this.closeModal()
          clearInterval(this.countdownTimer)
        }
      }, 1000)
    },

    closeModal() {
      this.modalVisible = false
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer)
        this.countdownTimer = null
      }
    },

    openWeChat() {
      if (typeof window !== 'undefined') {
        window.open('weixin://', '_blank')
      }
    },

    closeBanner() {
      if (typeof window === 'undefined') return

      const banner = document.querySelector('.bottom-banner')
      if (banner) {
        banner.style.display = 'none'
      }
    },

    kaifenx() {
      console.log('执行kaifenx函数')
      // 这里可以添加具体的功能逻辑
    },
  },
}
</script>

<style scoped>
/* 下载按钮样式 */
.download66 {
  position: fixed;
  width: 70px;
  right: 0px;
  height: 50px;
  bottom: 60px;
  z-index: 999;
  text-align: center;
}

.download66 p {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  line-height: 44px;
}

.download66 .btn {
  height: 50px;
  width: 50px;
  line-height: 25px;
  text-align: right;
  background-color: #ec0909;
  position: absolute;
  right: 0px;
  font-size: 16px;
  border: none;
  color: #fff;
  border-radius: 25px 0 0 25px;
  padding-right: 8px;
  box-shadow: -1px 3px 1px #c81616;
  border: 1px solid #fff;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.download66 i.close {
  display: block;
  height: 14px;
  width: 14px;
  float: left;
  background-image: url(gb.png);
  background-size: 100%;
}

/* 分享按钮样式 */
#share {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  border-radius: 40px;
  box-sizing: unset;
  border: solid 4px rgba(255, 255, 255, 0.8);
  background: rgba(255, 0, 0, 0.8);
  position: fixed;
  right: 10px;
  bottom: 140px;
  z-index: 1;
  cursor: pointer;
}

/* 底部横幅容器 */
.bottom-banner {
  width: 100%;
  max-width: 720px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0;
  margin: 0 auto;
  z-index: 999;
}

/* 模态框样式 */
#modal {
  font-family: Arial, sans-serif;
  display: flex;
  z-index: 99999999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
}

#modal .container {
  width: 80%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

#modal .header2 {
  background: linear-gradient(90deg, #00cc99, #08c595);
  padding: 10px;
  border-radius: 5px;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
}

#modal .message {
  font-size: 21px;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 15px;
}

#modal .button {
  padding: 10px 10px;
  border-radius: 5px;
  border: none;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  margin: 5px auto;
  transition: opacity 0.3s;
}

#modal .button:hover {
  opacity: 0.9;
}

#modal .blue-button {
  background-color: #0bab33;
  color: white;
}

#modal .gray-button {
  background-color: #95a5a6;
  color: white;
}

#modal #countdown span {
  color: red;
  font-weight: bold;
}

#countdown {
  text-align: center;
  margin: 10px 0;
}

#countdown2 {
  text-align: center;
  color: red;
  font-size: 19px;
  margin: 10px 0;
}

#modal .link {
  font-size: 1px;
  height: 1px;
  color: #fff;
  text-align: center;
  border: 1px solid #e0e0e0;
  word-wrap: break-word;
  overflow: hidden;
}

#qrcode {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
  min-height: 150px;
}

#qrcode img {
  margin: auto;
  max-width: 100%;
}
</style>
