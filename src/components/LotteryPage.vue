<template>
  <div class="lottery-page">
    <!-- 顶部锚点 -->
    <a name="fhdb"></a>

    <!-- 顶部导航 -->
    <nav class="subnav">
      <a href="#kjjl">
        <img src="@/assets/images/icon1.png" alt="" />
        <span>开奖记录</span>
      </a>

      <a href="#gszq">
        <img src="@/assets/images/icon2.png" alt="" />
        <span>高手专区</span>
      </a>

      <a href="#jdtk">
        <img src="@/assets/images/icon3.png" alt="" />
        <span>经典图库</span>
      </a>

      <a href="#wzyw">
        <img src="@/assets/images/icon4.png" alt="" />
        <span>五至一尾</span>
      </a>

      <a
        href="https://4dy-3u5.fn.zaogradient.com:2053/tool/tool.html"
        target="_blank"
        rel="noopener"
      >
        <img src="@/assets/images/icon5.png" alt="" />
        <span>挑码助手</span>
      </a>
    </nav>

    <!-- 日期和时间显示 -->
    <div class="box news-box">
      <div class="riqi">
        <span style="color: #3333cc"><b>今:</b></span>
        <span style="color: #ff0000"
          ><b>{{ currentDate.month }}</b></span
        >
        <span style="color: #3333cc"><b>月</b></span>
        <span style="color: #ff0000"
          ><b>{{ currentDate.day }}</b></span
        >
        <span style="color: #3333cc"><b>日.</b></span>
        <span v-html="currentDate.weekday"></span>

        <span style="color: #3333cc"
          ><span class="d"><b>农历:</b></span></span
        >
        <span style="color: #ff0000"
          ><b>{{ lunarInfo.lunarMonth }}</b></span
        >
        <span style="color: #3333cc"><b>月</b></span>
        <b>{{ lunarInfo.lunarDay }}</b>
        <span style="color: #3333cc"><b>日.</b></span>

        <span class="d">
          <span style="color: #3333cc"><b>煞</b></span>
          <b
            ><span style="color: #ff0000">{{ lunarInfo.location }} </span></b
          >
          <span style="color: #3333cc"><b>正冲生肖:</b></span>
          <b
            ><span style="color: #ff0000">{{ lunarInfo.animal }}</span></b
          >
        </span>
        <br />

        <span
          ><b>{{ currentTime }} </b></span
        >
      </div>
    </div>

    <!-- 站长推荐 -->
    <div class="box pad" id="yxym">
      <table
        border="1"
        width="100%"
        cellpadding="0"
        cellspacing="0"
        bordercolorlight="#FFFFFF"
        bordercolordark="#FFFFFF"
        bgcolor="#FFFFFF"
        class="qxtable"
      >
        <tr>
          <td
            width="100%"
            style="
              text-align: center;
              background: linear-gradient(
                #ffff27,
                #fdfd47,
                #ffff24ad,
                #ffff24ad,
                #ffff34ad,
                #ffff24ad
              );
              padding-top: 5px;
              padding-bottom: 5px;
            "
          >
            <span class="xz2"
              ><font color="#0000FF"
                >站长推荐：快捷进站.&nbsp;自定网址.&nbsp;不怕打不开.</font
              ></span
            >
          </td>
        </tr>
        <tr>
          <td
            width="100%"
            style="
              text-align: center;
              background: linear-gradient(#c4d339, #fbfb70, #fdfd69, #fbfb50, #f5f56c, #fbfb54);
              padding-top: 5px;
              padding-bottom: 5px;
            "
          >
            <span class="xz2">
              <font color="#f00">网址前面加任意"字"</font>&nbsp;如：
              <span id="sjzf" style="color: #f00">{{ randomPrefix }}</span
              >.0149338.com
            </span>
          </td>
        </tr>
      </table>
    </div>

    <!-- 广告图片 -->
    <div class="box pad">
      <a target="_blank" href="https://dl899.byzicons.com:8443/m/">
        <img
          src="https://dc2.sj-i.n-dk.mexicorecreation.com:8443/1gongyongtu/d444h.gif"
          width="100%"
          alt=""
        />
      </a>
    </div>

    <!-- 彩票预测列表 -->
    <PredictionTable :predictions="predictionList" />
    <!--
     基本用法
    <PredictionTable :predictions="predictionList" />

    不显示特殊行
    <PredictionTable :predictions="predictionList" :show-special-row="false" />

    自定义特殊行
    <PredictionTable
      :predictions="predictionList"
      :special-row="{
        href: '/custom.html',
        target: '_self',
        text: '自定义标题→【自定义内容】←自定义描述',
      }"
    />
    -->

    <!-- 妈祖阁赠言 -->
    <div class="box news-box">
      <div class="haoju">
        <font color="#CC0000">妈祖阁赠言:福山福水福天下,利国利民利万家</font>
      </div>
    </div>

    <!-- 详细预测表格 -->
    <div class="box pad" id="yxym">
      <div class="list-title">
        <span style="color: #ff0000">0149</span><span style="color: #0000ff">338</span>.com
        一直被模仿,从未被超越
      </div>
      <font color="#FF0000">
        <table
          border="1"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          bordercolorlight="#FFFFFF"
          bordercolordark="#FFFFFF"
          bgcolor="#FFFFFF"
          class="qxtable"
          id="table2"
        >
          <tr v-for="(row, index) in PredictionTables" :key="index">
            <td
              :colspan="row.colspan || 1"
              :style="row.style"
              :bgcolor="row.bgcolor"
              :width="row.width"
            >
              <font v-if="row.color" :color="row.color">{{ row.text }}</font>
              <span v-html="row.html || row.text"></span>
            </td>
          </tr>
        </table>
      </font>
    </div>

    <!-- 示例1：直接使用原始格式 -->
    <div class="box pad" id="yxym">
      <AdContainer :ads="imageAds" container-id="yxym-ads" custom-class="guanggao" />
    </div>

    <LotteryDisplay
      container-id="method2"
      :list-title="titleString"
      :table-html="tableHtmlString"
    />
    <!-- 示例2：使用列表布局 -->
    <!--    <div class="box pad" id="vertical-ads">
      <AdContainer
        :ads="imageAds"
        container-id="vertical-ads"
        :display-as-table="false"
        custom-class="vertical-ad-list"
      />
    </div>-->

    <!-- 示例3：带轮播功能 -->
    <!--    <div class="box pad" id="rotating-ads">
      <AdContainer
        :ads="imageAds"
        container-id="rotating-ads"
        :auto-rotate="true"
        :rotate-interval="3000"
        @ad-rotate="handleAdRotate"
        @ad-click="handleAdClick"
      />
    </div>-->
    <!-- 示例4：单独使用广告项 -->
    <!--    <div class="box pad" id="single-ad">
      <table border="1" width="100%" class="guanggao">
        <tr>
          <td>
            <AdImageItem
              href="https://example.com/ad"
              src="https://example.com/ad.gif"
              alt="示例广告"
              ad-id="example-ad"
              @click="handleSingleAdClick"
            />
          </td>
        </tr>
      </table>
    </div>-->
    <!-- 图片广告 -->
    <!--    <div class="box pad" id="yxym">
      <table
        border="1"
        width="100%"
        class="guanggao"
        bgcolor="#008000"
        cellspacing="0"
        bordercolor="#FFFFFF"
        bordercolorlight="#FFFFFF"
        bordercolordark="#FFFFFF"
        cellpadding="2"
      >
        <tr v-for="(imgAd, index) in imageAds" :key="index">
          <td>
            <a :href="imgAd.link" target="_blank">
              <img :src="imgAd.image" :alt="imgAd.alt" :style="imgAd.style || ''" />
            </a>
          </td>
        </tr>
      </table>
    </div>-->
  </div>
</template>

<script>
import { calculateLunar } from '@/utils/lunarCalculator'
import PredictionTable from './base/PredictionTable.vue'
import AdContainer from '@/components/base/AdContainer.vue'
import LotteryDisplay from '@/components/base/LotteryDisplay.vue'

export default {
  name: 'LotteryComponent',
  components: {
    LotteryDisplay,
    AdContainer,
    PredictionTable,
  },
  data() {
    return {
      currentTime: '',
      randomPrefix: '00',
      currentDate: {
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        weekday: '',
      },
      lunarInfo: {
        lunarMonth: '',
        lunarDay: '',
        location: '',
        animal: '',
        lunarYear: '',
      },
      predictionList: [
        { period: '029期', name: '中特网直击', title: '平特一肖', desc: '灭庄', link: 'ztw' },
        { period: '029期', name: '彩霸王', title: '⒌肖主一码', desc: '精心准', link: 'cbw' },
        { period: '029期', name: '摇钱树', title: '绝杀四肖', desc: '同揭分晓', link: 'yqs' },
        { period: '029期', name: '诸葛亮', title: '密研一波', desc: '强力推荐', link: 'zgl' },
        { period: '029期', name: '刘伯温', title: '必看单双', desc: '稳如泰山', link: 'lbw' },
        { period: '029期', name: '王中王', title: '男女中特', desc: '连准多期', link: 'wzw' },
      ],
      predictions: [
        { period: '029期', name: '中特网直击', title: '平特一肖', desc: '灭庄', link: 'ztw' },
        { period: '029期', name: '彩霸王', title: '⒌肖主一码', desc: '精心准', link: 'cbw' },
        { period: '029期', name: '摇钱树', title: '绝杀四肖', desc: '同揭分晓', link: 'yqs' },
        { period: '029期', name: '诸葛亮', title: '密研一波', desc: '强力推荐', link: 'zgl' },
        { period: '029期', name: '刘伯温', title: '必看单双', desc: '稳如泰山', link: 'lbw' },
        { period: '029期', name: '王中王', title: '男女中特', desc: '连准多期', link: 'wzw' },
      ],
      predictionTables: [
        {
          text: '七肖:',
          bgcolor: '#F4F4F4',
          width: '43.5%',
          color: '#000080',
          html: '<font color="#000080">七肖:</font><font color="#FF0000"><span style="background-color: #FFFF00">兔</span>牛虎蛇猴鸡龙</font>',
        },
        {
          text: '⑦码: 39.05.28.25.22.21.38',
          bgcolor: '#F4F4F4',
          html: '<font color="#000080">⑦码:</font> <font color="#FF0000"><span style="background-color: #FFFF00">39</span>.05.28.25.22.21.38</font>',
        },
        {
          colspan: 2,
          text: '018期: 妈祖阁出版<兔-39>内部助力',
          style: 'text-align:center; background: #FFCCFF;',
          html: '<font color="#0000FF">018期: 妈祖阁出版</font><font color="#FF0000"><span class="xz3">&lt;<span style="background-color: #FFFF00">兔</span>-<span style="background-color: #FFFF00">39</span>&gt;</span></font><font color="#0000FF">内部助力</font>',
        },
      ],
      ads: [
        { text: '029期: 大三巴→【一肖爆特】←横扫黑庄', link: 'dsb', target: '#2784901' },
        { text: '029期: 钱多多爆料【二肖②码】内幕信息', link: 'qdd', target: '#2784902' },
        { text: '029期: 广西汇→【平特一肖】←抓住机会', link: 'gxh', target: '#2784903' },
        {
          text: '029期: 20KJ网→【三肖三码】←精心打造',
          link: 'https://hsyw-rw1sq.20kj-mksde.app:10099/#27849',
          target: '_blank',
          external: true,
        },
        {
          text: '029期: 诸葛亮→【家野爆中】←三期必出',
          link: 'https://zqnatsd-zgl.taiyang.xn--5tzm5g:2096/html/gg/37849.html',
          target: '_blank',
          external: true,
        },
        { text: '029期: 神算子→【三肖必中特】←实力料', link: 'ssz', target: '#2784906' },
      ],
      imageAds: [
        {
          link: 'https://7217al2.com:59789/aaa004.html',
          image: 'https://tp.7217tp.com/712X45.gif',
          alt: '点击查看.',
        },
        {
          link: 'https://www.9659061.com/nice.htm?21183841',
          image: 'https://www.tttt9659abc.com/98080.gif',
          alt: '点击查看.',
        },
        {
          link: 'https://45.192.225.12:5029/?cid=7097263',
          image: 'https://tuchuang222.bum3bjmj4rhdou7l1231.com/34vip60.gif',
          alt: '点击查看.',
        },
        {
          link: 'https://7188282.com:7188/qqxb15.html',
          image: 'https://7188tp1.com/960801.gif',
          alt: '点击查看.',
          style: 'vertical-align: middle;',
        },
      ],
      lotteryScript: '',
      timer: null,
      titleString: '妈祖阁『一波主8码』',
      tableHtmlString: `
        <table border="1" width="100%" class="duilianpt" bgcolor="#ffffff" cellspacing="0" bordercolor="#FFFFFF">
          <tr>
            <td><font color="#000000">028期</font><span class="zl">『<span style="background-color: #FFFF00">蓝波</span>』</span><font color="#000000">主:</font><span class="zl">04.10.14.20.26.36.37.42</span></td>
          </tr>
          <tr>
            <td><font color="#000000">029期</font><span class="zl">『红波』</span><font color="#000000">主:</font><span class="zl">01.12.07.30.18.19.08.40</span></td>
          </tr>
        </table>
      `,
    }
  },
  computed: {
    // 计算属性：格式化显示的时间
    formattedTime() {
      return this.currentTime
    },

    // 计算属性：完整的日期显示
    displayDate() {
      return `${this.currentDate.month}月${this.currentDate.day}日 ${this.currentDate.weekday}`
    },

    // 计算属性：农历显示
    displayLunar() {
      return `${this.lunarInfo.lunarYear}年 ${this.lunarInfo.lunarMonth}月${this.lunarInfo.lunarDay} ${this.lunarInfo.animal} ${this.lunarInfo.location}`
    },
  },
  methods: {
    // 计算星期
    calculateWeekday() {
      const day = new Date().getDay()
      const weekdays = [
        "<span style='color:#FF0000'><b>星期日.</b></span>",
        "<span style='color:#FF0000'><b>星期一.</b></span>",
        "<span style='color:#FF0000'><b>星期二.</b></span>",
        "<span style='color:#FF0000'><b>星期三.</b></span>",
        "<span style='color:#FF0000'><b>星期四.</b></span>",
        "<span style='color:#FF0000'><b>星期五.</b></span>",
        "<span style='color:#FF0000'><b>星期六.</b></span>",
      ]
      this.currentDate.weekday = weekdays[day]
    },

    // 更新时钟
    updateClock() {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      this.currentTime = `${hours}:${minutes}:${seconds}`
    },

    // 加载开奖脚本
    async loadLotteryScript() {
      try {
        // 模拟加载外部脚本
        // 实际中可能需要使用 fetch 获取脚本内容
        this.lotteryScript = '<div>开奖信息加载中...</div>'
      } catch (error) {
        console.error('加载开奖脚本失败:', error)
      }
    },

    // 初始化
    init() {
      // 生成随机前缀
      this.randomPrefix = Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, '0')

      // 计算星期
      this.calculateWeekday()

      // 计算农历
      const lunar = calculateLunar()
      if (lunar) {
        this.lunarInfo = {
          lunarMonth: lunar.lunarDate.split('月')[0],
          lunarDay: lunar.lunarDate.split('月')[1].replace('日', ''),
          location: lunar.location,
          animal: lunar.animal,
          lunarYear: lunar.lunarYear,
        }
      }

      // 启动时钟
      this.timer = setInterval(this.updateClock, 1000)
      this.updateClock()

      // 加载开奖脚本
      this.loadLotteryScript()
    },

    // 处理链接点击
    handleLinkClick(item) {
      if (item.external) {
        window.open(item.link, item.target || '_blank')
      } else {
        // 内部链接处理逻辑
        console.log('内部链接:', item.link)
        // 这里可以添加路由跳转逻辑
      }
    },

    // 处理图片广告点击
    handleImageAdClick(ad) {
      window.open(ad.link, '_blank')
    },
  },
  mounted() {
    this.init()
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
}
</script>

<style>
/* 全局样式 */
@import '@/assets/css/sty1e.css';

/* 内联样式覆盖 */
</style>
