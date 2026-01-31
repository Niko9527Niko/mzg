<template>
  <div class="box pad">
    <div class="foot-img">
      <p class="copyright">
        【澳門妈祖阁】域名：
        <!-- 使用动态绑定 -->
        <span :style="{ color: domain.part1Color }">{{ domain.part1 }}</span>
        <span :style="{ color: domain.part2Color }">{{ domain.part2 }}</span>
        {{ domain.extension }}
        <br />
        長期收集各類最新、最準確的每期文字資料大全，最快開獎，公式規律盡在媽祖閣
      </p>

      <p class="copyright">
        说明：本论坛所提供的内容、资料、图片和资讯，只应用在合法的资料探讨，暂不适用于其它，外围和使用。特此声明！
      </p>

      <p class="copyright">
        论坛免责声明：以上所有广告内容均为赞助商提供，本站不对其经营行为负责。浏览或使用者须自行承担有关责任，本网站恕不负责。
      </p>

      <p class="copyright">
        【澳門妈祖阁】域名：
        <!-- 如果有特定的JavaScript功能，可以封装成组件或方法 -->
        <!-- <script src="/yjjy/images/zym.js"></script> -->
        <span v-html="domainScript"></span>
        <br />
        {{ chineseText }}
      </p>

      <p class="copyright">
        <span style="color: #ff0000">
          <span style="background-color: #ffff00">
            合作需知：跟本站合作的都是先上位置链接，确认再合作。其余均为骗子！
          </span>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      // 如果需要动态生成域名，可以放在这里
      domain: {
        part1: '0149',
        part1Color: '#FF0000',
        part2: '338',
        part2Color: '#0000FF',
        extension: '.com',
      },
    }
  },

  mounted() {
    // 如果需要在组件加载后执行特定脚本
    // this.loadDomainScript();
  },

  methods: {
    getDefaultDomain() {
      return {
        part1: '0149',
        part1Color: '#FF0000',
        part2: '338',
        part2Color: '#0000FF',
        extension: '.com',
      }
    },
  },
}
</script>

<style scoped>
.box.pad {
  padding: 15px;
  box-sizing: border-box;
}

.foot-img {
  text-align: center;
  margin: 0 auto;
}

.copyright {
  margin: 10px 0;
  font-size: 14px;
  line-height: 1.5;
  color: #666;
}

.copyright a {
  text-decoration: none;
  display: inline-block;
  padding: 5px 10px;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.copyright a:hover {
  opacity: 0.8;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .copyright {
    font-size: 12px;
    padding: 0 10px;
  }

  .copyright a {
    font-size: 16pt !important; /* 移动端调整字体大小 */
    padding: 8px 16px;
  }
}
</style>
