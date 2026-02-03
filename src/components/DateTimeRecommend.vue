<!-- DateTimeRecommend.vue -->
<template>
  <div>
    <!-- 日期和时间显示 -->
    <div class="box news-box">
      <div class="riqi">
        <span style="color: #3333cc"><b>今:</b></span>
        <span style="color: #ff0000"><b>{{ currentDate.month }}</b></span>
        <span style="color: #3333cc"><b>月</b></span>
        <span style="color: #ff0000"><b>{{ currentDate.day }}</b></span>
        <span style="color: #3333cc"><b>日.</b></span>
        <span v-html="currentDate.weekday"></span>

        <span style="color: #3333cc"
        ><span class="d"><b>农历:</b></span></span
        >
        <span style="color: #ff0000"><b>{{ lunarInfo.lunarMonth }}</b></span>
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
        <tbody>
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
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// 完全按照原代码定义构造函数
function tagLunarCal(d, i, w, k, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13) {
  this.BaseDays = d;
  this.Intercalation = i;
  this.BaseWeekday = w;
  this.BaseKanChih = k;
  this.MonthDays = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13];
}

export default {
  name: 'DateTimeRecommend',

  data() {
    const now = new Date();
    return {
      currentTime: '',
      randomPrefix: '00',
      currentDate: {
        month: now.getMonth() + 1,
        day: now.getDate(),
        weekday: ''
      },
      lunarInfo: {
        lunarMonth: '',
        lunarDay: '',
        location: '',
        animal: '',
        lunarYear: '',
        kan: '',
        chih: '',
        age: 0
      },
      timer: null,
      randomPrefixTimer: null,

      // 完全复制原代码的常量
      FIRSTYEAR: 1998,
      LASTYEAR: 2032,
      SolarCal: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      SolarDays: [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365, 396, 0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366, 397],
      AnimalIdx: ["马", "羊", "猴", "鸡", "狗", "猪", "鼠", "牛", "虎", "兔", "龙", "蛇"],
      LocationIdx: ["南.", "東.", "北.", "西."],
      heavenlyStems: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
      earthlyBranches: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
      lunarMonthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      lunarDayNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
    };
  },

  methods: {
    // 原汁原味的农历数据
    // 农历数据数组
    getLunarCalData() {
      return [
        new tagLunarCal(27, 5, 3, 43, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1),  // 1998
        new tagLunarCal(46, 0, 4, 48, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1),  // 1999
        new tagLunarCal(35, 0, 5, 53, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1),  // 2000
        new tagLunarCal(23, 4, 0, 59, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1),  // 2001
        new tagLunarCal(42, 0, 1, 4, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1),   // 2002
        new tagLunarCal(31, 0, 2, 9, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0),   // 2003
        new tagLunarCal(21, 2, 3, 14, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1),  // 2004
        new tagLunarCal(39, 0, 5, 20, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1),  // 2005
        new tagLunarCal(28, 7, 6, 25, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1),  // 2006
        new tagLunarCal(48, 0, 0, 30, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1),  // 2007
        new tagLunarCal(37, 0, 1, 35, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1),  // 2008
        new tagLunarCal(25, 5, 3, 41, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1),  // 2009
        new tagLunarCal(44, 0, 4, 46, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1),  // 2010
        new tagLunarCal(33, 0, 5, 51, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1),  // 2011
        new tagLunarCal(22, 4, 6, 56, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0),  // 2012
        new tagLunarCal(40, 0, 1, 2, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0),   // 2013
        new tagLunarCal(30, 9, 2, 7, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1),   // 2014
        new tagLunarCal(49, 0, 3, 12, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1),  // 2015
        new tagLunarCal(38, 0, 4, 17, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0),  // 2016
        new tagLunarCal(27, 6, 6, 23, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1),  // 2017
        new tagLunarCal(46, 0, 0, 28, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0),  // 2018
        new tagLunarCal(35, 0, 1, 33, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0),  // 2019
        new tagLunarCal(24, 4, 2, 38, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1),  // 2020
        new tagLunarCal(42, 0, 4, 44, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1),  // 2021
        new tagLunarCal(31, 0, 5, 49, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0),  // 2022
        new tagLunarCal(21, 2, 6, 54, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1),  // 2023
        new tagLunarCal(40, 0, 0, 59, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1),  // 2024
        new tagLunarCal(28, 6, 2, 5, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0),   // 2025
        new tagLunarCal(47, 0, 3, 10, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1),  // 2026
        new tagLunarCal(36, 0, 4, 15, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1),  // 2027
        new tagLunarCal(25, 5, 5, 20, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0),  // 2028
        new tagLunarCal(43, 0, 0, 26, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1),  // 2029
        new tagLunarCal(32, 0, 1, 31, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0),  // 2030
        new tagLunarCal(22, 3, 2, 36, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0)   // 2031
      ];
    },

    // 原汁原味的GetLeap函数
    GetLeap(year) {
      if (year % 400 == 0) return 1;
      else if (year % 100 == 0) return 0;
      else if (year % 4 == 0) return 1;
      else return 0;
    },

    // 原汁原味的农历计算
    calculateLunar() {
      const today = new Date();
      const SolarYear = today.getFullYear();
      const SolarMonth = today.getMonth() + 1;
      const SolarDate = today.getDate();


      // 验证年份范围
      if (SolarYear < this.FIRSTYEAR || SolarYear > this.LASTYEAR) {
        console.warn('年份超出范围');
        return this.getFallbackLunar();
      }

      const LunarCal = this.getLunarCalData();
      const y = SolarYear - this.FIRSTYEAR;

      if (!LunarCal[y]) {
        console.error('找不到农历数据');
        return this.getFallbackLunar();
      }

      const sm = SolarMonth - 1;
      const leap = this.GetLeap(SolarYear);

      // 计算从1月1日到当前日期的天数
      const acc = this.SolarDays[leap * 14 + sm] + SolarDate;

      // 计算天干地支
      const kc = acc + LunarCal[y].BaseKanChih;
      const Kan = kc % 10;
      const Chih = kc % 12;

      const Location = this.LocationIdx[kc % 4];
      let Age = kc % 60;
      Age = Age < 22 ? 22 - Age : 82 - Age;

      const Animal = this.AnimalIdx[Chih];

      // ✅ 修正：计算农历年份
      let LunarYear, lunarYearIndex;

      if (acc <= LunarCal[y].BaseDays) {
        // 春节前，属于前一个农历年
        lunarYearIndex = y - 1;
        LunarYear = SolarYear - 1;
      } else {
        // 春节后，属于当前农历年
        lunarYearIndex = y;
        LunarYear = SolarYear;
      }

      // 确保索引有效
      if (lunarYearIndex < 0) {
        lunarYearIndex = 0;
        LunarYear = this.FIRSTYEAR;
      }

      // 计算农历月日
      let l1 = LunarCal[lunarYearIndex].BaseDays;
      let LunarMonth = 0;
      let LunarDate = 0;


      // 注意：这里需要调整acc的值
      let adjustedAcc = acc;
      if (lunarYearIndex < y) {
        // 如果是前一年，需要重新计算acc
        const prevLeap = this.GetLeap(LunarYear);
        adjustedAcc = this.SolarDays[prevLeap * 14 + sm + 12] + SolarDate;
      }

      for (let i = 0; i < 13; i++) {
        const monthDays = LunarCal[lunarYearIndex].MonthDays[i];
        const l2 = l1 + monthDays + 29;

        if (adjustedAcc <= l2) {
          LunarMonth = i + 1;
          LunarDate = adjustedAcc - l1;
          break;
        }
        l1 = l2;
      }

      if (LunarMonth === 0) {
        console.error('未找到农历月份');
        return this.getFallbackLunar();
      }

      // 处理闰月
      const im = LunarCal[lunarYearIndex].Intercalation;

      if (im != 0 && LunarMonth > im) {
        LunarMonth--;
        if (LunarMonth == im) {
          LunarMonth = -im;
        }
      }

      if (LunarMonth > 12) {
        LunarMonth -= 12;
      }

      // 天干地支
      const kanName = this.heavenlyStems[Kan];
      const chihName = this.earthlyBranches[Chih];

      const result = {
        year: LunarYear,
        month: this.formatLunarMonth(LunarMonth, im),
        day: this.formatLunarDay(LunarDate),
        location: Location,
        animal: Animal,
        kan: kanName,
        chih: chihName,
        lunarYear: `${kanName}${chihName}`,
        age: Age,
        rawMonth: LunarMonth,
        rawDay: LunarDate,
        solarYear: SolarYear,
        solarMonth: SolarMonth,
        solarDay: SolarDate
      };

      return result;
    },

    // 格式化农历月份
    formatLunarMonth(month, leapMonth) {
      if (month < 0) {
        const absMonth = Math.abs(month);
        return `闰${this.lunarMonthNames[absMonth - 1]}`;
      }
      return this.lunarMonthNames[month - 1] || '正月';
    },

    // 格式化农历日期
    formatLunarDay(day) {
      return this.lunarDayNames[day - 1] || '初一';
    },

    // 后备方案
    getFallbackLunar() {
      const now = new Date();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const year = now.getFullYear();
      const chih = year % 12;

      return {
        year: year,
        month: this.lunarMonthNames[(month - 1) % 12],
        day: this.lunarDayNames[(day - 1) % 30],
        location: '东',
        animal: this.AnimalIdx[chih] || '马',
        kan: '甲',
        chih: '子',
        lunarYear: '甲子',
        age: 0,
        rawMonth: month,
        rawDay: day
      };
    },

    // 更新农历信息
    updateLunarInfo() {
      try {
        const lunarData = this.calculateLunar();

        this.lunarInfo.lunarMonth = lunarData.month;
        this.lunarInfo.lunarDay = lunarData.day;
        this.lunarInfo.location = lunarData.location;
        this.lunarInfo.animal = lunarData.animal;
        this.lunarInfo.lunarYear = lunarData.lunarYear;
        this.lunarInfo.kan = lunarData.kan;
        this.lunarInfo.chih = lunarData.chih;
        this.lunarInfo.age = lunarData.age;


        this.$emit('lunar-update', { ...this.lunarInfo });

      } catch (error) {
        console.error('农历计算错误:', error);
        this.setDefaultLunarInfo();
      }
    },

    // 其他方法保持不变...
    calculateWeekday() {
      const day = new Date().getDay();
      const weekdays = [
        '<span style="color:#FF0000"><b>星期日.</b></span>',
        '<span style="color:#FF0000"><b>星期一.</b></span>',
        '<span style="color:#FF0000"><b>星期二.</b></span>',
        '<span style="color:#FF0000"><b>星期三.</b></span>',
        '<span style="color:#FF0000"><b>星期四.</b></span>',
        '<span style="color:#FF0000"><b>星期五.</b></span>',
        '<span style="color:#FF0000"><b>星期六.</b></span>'
      ];
      this.currentDate.weekday = weekdays[day];
    },

    updateClock() {
      const now = new Date();
      this.currentDate.month = now.getMonth() + 1;
      this.currentDate.day = now.getDate();

      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      this.currentTime = `${hours}:${minutes}:${seconds}`;

      if (hours === '00' && minutes === '00') {
        this.updateLunarInfo();
      }

      this.$emit('time-update', this.currentTime);
    },

    setDefaultLunarInfo() {
      const lunarData = this.getFallbackLunar();
      this.lunarInfo.lunarMonth = lunarData.month;
      this.lunarInfo.lunarDay = lunarData.day;
      this.lunarInfo.location = lunarData.location;
      this.lunarInfo.animal = lunarData.animal;
      this.lunarInfo.lunarYear = lunarData.lunarYear;
      this.lunarInfo.kan = lunarData.kan;
      this.lunarInfo.chih = lunarData.chih;
      this.lunarInfo.age = lunarData.age;
    },

    // 初始化
    init() {
      if (!this.customPrefix) {
        this.updateRandomPrefix();
        this.randomPrefixTimer = setInterval(() => {
          this.updateRandomPrefix();
        }, 3000);
      }

      this.calculateWeekday();
      this.updateLunarInfo();

      this.timer = setInterval(this.updateClock, 1000);
      this.updateClock();

      this.dailyUpdateTimer = setInterval(() => {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
          this.updateLunarInfo();
        }
      }, 60000);
    },

    updateRandomPrefix() {
      const randomNum = Math.floor(Math.random() * 100);
      const newPrefix = randomNum.toString().padStart(2, '0');
      this.randomPrefix = newPrefix;
      this.$emit('prefix-update', newPrefix);
    },

    updateTime(manualTime) {
      if (manualTime) {
        this.currentTime = manualTime;
      } else {
        this.updateClock();
      }
    },

    updateLunar(manualLunar) {
      if (manualLunar) {
        this.lunarInfo = { ...manualLunar };
      } else {
        this.updateLunarInfo();
      }
    },

    updatePrefix(manualPrefix) {
      if (manualPrefix) {
        this.randomPrefix = manualPrefix;
      } else {
        this.updateRandomPrefix();
      }
    },

    getCurrentLunarInfo() {
      return { ...this.lunarInfo };
    }
  },

  watch: {
    customPrefix(newVal) {
      if (newVal) {
        this.randomPrefix = newVal;
        if (this.randomPrefixTimer) {
          clearInterval(this.randomPrefixTimer);
          this.randomPrefixTimer = null;
        }
      }
    }
  },

  mounted() {
    this.init();
  },

  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.randomPrefixTimer) {
      clearInterval(this.randomPrefixTimer);
    }
    if (this.dailyUpdateTimer) {
      clearInterval(this.dailyUpdateTimer);
    }
  }
};
</script>

<style scoped>


.qxtable {
  margin-top: 10px;
}

.box {
  margin-bottom: 10px;
}

.news-box {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
}
</style>
