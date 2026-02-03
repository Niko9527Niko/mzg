<template>
  <div class="sx grey-line">
    <!-- 十二生肖表格 -->
    <div class="list-title">
      <font class="title-text">2025年属性知识</font>
    </div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <th>２０２５蛇年（十二生肖号码对照）</th>
      </tr>
      <tr>
        <td>
          <ul class="sx1 clearfix">
            <li v-for="(zodiac, index) in zodiacData" :key="index">
              <dl>
                <dt>
                  {{ zodiac.name }}<img :src="zodiac.image" :alt="zodiac.name" />[冲
                  {{ zodiac.conflict }}]
                </dt>
                <dd>
                  <span
                    v-for="(num, numIndex) in zodiac.numbers"
                    :key="numIndex"
                    :class="getNumberClass(num)"
                  >
                    {{ num }}
                  </span>
                </dd>
              </dl>
            </li>
          </ul>
        </td>
      </tr>
    </table>

    <!-- 五行对照表格 -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <colgroup>
        <col width="50" />
        <col width="" />
      </colgroup>
      <tr>
        <th colspan="2">五行对照</th>
      </tr>
      <tr v-for="(element, index) in fiveElements" :key="index">
        <td>
          <font :style="{ color: element.color }">{{ element.name }}</font>
        </td>
        <td class="a-left">
          <span
            v-for="(num, numIndex) in element.numbers"
            :key="numIndex"
            :class="getNumberWaveClass(num)"
          >
            {{ num }}
          </span>
        </td>
      </tr>
    </table>

    <!-- 波色表格 -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <colgroup>
        <col width="50" />
        <col width="" />
      </colgroup>
      <tr>
        <th colspan="2">波色</th>
      </tr>
      <tr v-for="(wave, index) in waveColors" :key="index">
        <td>
          <font :style="{ color: wave.color }">{{ wave.name }}</font>
        </td>
        <td class="a-left">
          <span
            v-for="(num, numIndex) in wave.numbers"
            :key="numIndex"
            :class="getWaveClass(wave.name)"
          >
            {{ num }}
          </span>
        </td>
      </tr>
    </table>

    <!-- 合数单双表格 -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <colgroup>
        <col width="50" />
        <col width="" />
      </colgroup>
      <tr>
        <th colspan="2">合数单双</th>
      </tr>
      <tr>
        <td><font color="#3366ff">合数单</font></td>
        <td class="a-left">
          <span v-for="num in oddSumNumbers" :key="num" :class="getNumberClass(num)">
            {{ num }}
          </span>
        </td>
      </tr>
      <tr>
        <td><font color="#3366ff">合数双</font></td>
        <td class="a-left">
          <span v-for="num in evenSumNumbers" :key="num" :class="getNumberClass(num)">
            {{ num }}
          </span>
        </td>
      </tr>
    </table>

    <!-- 生肖属性表格 -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <th>生肖属性</th>
      </tr>
      <tr v-for="(attr, index) in zodiacAttributes" :key="index">
        <td>
          <font color="#3366ff">{{ attr.name }}：</font>{{ attr.value }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import she from '@/assets/images/zodiac/she.gif'
import long from '@/assets/images/zodiac/long.gif'
import tu from '@/assets/images/zodiac/tu.gif'
import hu from '@/assets/images/zodiac/hu.gif'
import niu from '@/assets/images/zodiac/niu.gif'
import shu from '@/assets/images/zodiac/shu.gif'
import zhu from '@/assets/images/zodiac/zhu.gif'
import gou from '@/assets/images/zodiac/gou.gif'
import ji from '@/assets/images/zodiac/ji.gif'
import hou from '@/assets/images/zodiac/hou.gif'
import yang from '@/assets/images/zodiac/yang.gif'
import ma from '@/assets/images/zodiac/ma.gif'
export default {
  name: 'ZodiacTable',
  data() {
    return {
      zodiacData: [
        {
          name: '蛇',
          image: she,
          conflict: '猪',
          numbers: ['01', '13', '25', '37', '49'],
        },
        {
          name: '龙',
          image: long,
          conflict: '狗',
          numbers: ['02', '14', '26', '38'],
        },
        {
          name: '兔',
          image: tu,
          conflict: '鸡',
          numbers: ['03', '15', '27', '39'],
        },
        {
          name: '虎',
          image: hu,
          conflict: '猴',
          numbers: ['04', '16', '28', '40'],
        },
        {
          name: '牛',
          image: niu,
          conflict: '羊',
          numbers: ['05', '17', '29', '41'],
        },
        {
          name: '鼠',
          image: shu,
          conflict: '马',
          numbers: ['06', '18', '30', '42'],
        },
        {
          name: '猪',
          image: zhu,
          conflict: '蛇',
          numbers: ['07', '19', '31', '43'],
        },
        {
          name: '狗',
          image: gou,
          conflict: '龙',
          numbers: ['08', '20', '32', '44'],
        },
        {
          name: '鸡',
          image: ji,
          conflict: '兔',
          numbers: ['09', '21', '33', '45'],
        },
        {
          name: '猴',
          image: hou,
          conflict: '虎',
          numbers: ['10', '22', '34', '46'],
        },
        {
          name: '羊',
          image: yang,
          conflict: '牛',
          numbers: ['11', '23', '35', '47'],
        },
        {
          name: '马',
          image: ma,
          conflict: '鼠',
          numbers: ['12', '24', '36', '48'],
        },
      ],

      fiveElements: [
        {
          name: '金',
          color: '#ffcc00',
          numbers: ['03', '04', '11', '12', '25', '26', '33', '34', '41', '42'],
        },
        {
          name: '木',
          color: '#33cc33',
          numbers: ['07', '08', '15', '16', '23', '24', '37', '38', '45', '46'],
        },
        { name: '水', color: '#3399ff', numbers: ['13', '14', '21', '22', '29', '30', '43', '44'] },
        {
          name: '火',
          color: '#ff6600',
          numbers: ['01', '02', '09', '10', '17', '18', '31', '32', '39', '40', '47', '48'],
        },
        {
          name: '土',
          color: '#cc9900',
          numbers: ['05', '06', '19', '20', '27', '28', '35', '36', '49'],
        },
      ],

      waveColors: [
        {
          name: '红波',
          color: '#ff0000',
          numbers: [
            '01',
            '02',
            '07',
            '08',
            '12',
            '13',
            '18',
            '19',
            '23',
            '24',
            '29',
            '30',
            '34',
            '35',
            '40',
            '45',
            '46',
          ],
        },
        {
          name: '蓝波',
          color: '#3366ff',
          numbers: [
            '03',
            '04',
            '09',
            '10',
            '14',
            '15',
            '20',
            '25',
            '26',
            '31',
            '36',
            '37',
            '41',
            '42',
            '47',
            '48',
          ],
        },
        {
          name: '绿波',
          color: '#009933',
          numbers: [
            '05',
            '06',
            '11',
            '16',
            '17',
            '21',
            '22',
            '27',
            '28',
            '32',
            '33',
            '38',
            '39',
            '43',
            '44',
            '49',
          ],
        },
      ],

      oddSumNumbers: [
        '01',
        '03',
        '05',
        '07',
        '09',
        '10',
        '12',
        '14',
        '16',
        '18',
        '21',
        '23',
        '25',
        '27',
        '29',
        '30',
        '32',
        '34',
        '36',
        '38',
        '41',
        '43',
        '45',
        '47',
        '49',
      ],
      evenSumNumbers: [
        '02',
        '04',
        '06',
        '08',
        '11',
        '13',
        '15',
        '17',
        '19',
        '20',
        '22',
        '24',
        '26',
        '28',
        '31',
        '33',
        '35',
        '37',
        '39',
        '40',
        '42',
        '44',
        '46',
        '48',
      ],

      zodiacAttributes: [
        { name: '家禽', value: '牛、马、羊、鸡、狗、猪' },
        { name: '野兽', value: '鼠、虎、兔、龙、蛇、猴' },
        { name: '吉美', value: '兔、龙、蛇、马、羊、鸡' },
        { name: '凶丑', value: '鼠、牛、虎、猴、狗、猪' },
        { name: '阴性', value: '鼠、龙、蛇、马、狗、猪' },
        { name: '阳性', value: '牛、虎、兔、羊、猴、鸡' },
        { name: '单笔', value: '鼠、龙、马、蛇、鸡、猪' },
        { name: '双笔', value: '虎、猴、狗、兔、羊、牛' },
        { name: '天肖', value: '兔、马、猴、猪、牛、龙' },
        { name: '地肖', value: '蛇、羊、鸡、狗、鼠、虎' },
        { name: '白边', value: '鼠、牛、虎、鸡、狗、猪' },
        { name: '黑中', value: '兔、龙、蛇、马、羊、猴' },
        { name: '女肖', value: '兔、蛇、羊、鸡、猪（五宫肖）' },
        { name: '男肖', value: '鼠、牛、虎、龙、马、猴、狗' },
        { name: '三合', value: '鼠龙猴、牛蛇鸡、虎马狗、兔羊猪' },
        { name: '六合', value: '鼠牛、龙鸡、虎猪、蛇猴、兔狗、马羊' },
        { name: '琴棋书画', value: '琴:兔蛇鸡　棋:鼠牛狗　书:虎龙马　画:羊猴猪' },
        { name: '五福肖', value: '鼠、虎、兔、蛇、猴[龙]' },
        { name: '红肖', value: '马、兔、鼠、鸡' },
        { name: '蓝肖', value: '蛇、虎、猪、猴' },
        { name: '绿肖', value: '羊、龙、牛、狗' },
      ],
    }
  },

  methods: {
    // 获取数字的波色类
    getNumberWaveClass(num) {
      const numInt = parseInt(num)

      // 红波号码：01,02,07,08,12,13,18,19,23,24,29,30,34,35,40,45,46
      const redNumbers = [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46]

      // 蓝波号码：03,04,09,10,14,15,20,25,26,31,36,37,41,42,47,48
      const blueNumbers = [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48]

      // 绿波号码：05,06,11,16,17,21,22,27,28,32,33,38,39,43,44,49
      const greenNumbers = [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49]

      if (redNumbers.includes(numInt)) return 'red'
      if (blueNumbers.includes(numInt)) return 'blue'
      if (greenNumbers.includes(numInt)) return 'green'
      return ''
    },
    // 保持原有的 getNumberClass 方法，用于生肖表格
    getNumberClass(num) {
      const numInt = parseInt(num)
      // 根据数字决定样式类
      if ([3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48].includes(numInt)) {
        return 'blue'
      } else if ([5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49].includes(numInt)) {
        return 'green'
      }
      return ''
    },

    getElementNumberColor(num, elementName) {
      const numInt = parseInt(num)
      // 简化逻辑，实际应用中可以根据更复杂的规则
      if (elementName === '金') {
        if ([3, 4, 25, 26, 41, 42].includes(numInt)) return '#3366ff'
        if ([11, 12, 33, 34, 49].includes(numInt)) return '#008000'
        return '#FF0000'
      }
      // 其他元素的逻辑类似，这里简化处理
      return '#3366ff'
    },

    getWaveClass(waveName) {
      switch (waveName) {
        case '红波':
          return ''
        case '蓝波':
          return 'blue'
        case '绿波':
          return 'green'
        default:
          return ''
      }
    },
  },
}
</script>

<style scoped>
/* 这里保留所有原有的CSS样式 */
@charset "UTF-8";
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
ol,
ul {
  list-style: none;
}
img {
  border: 0;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
th,
td {
  vertical-align: middle;
}
html {
  height: 100%;
  color: #000;
  font-size: 1em;
  line-height: 1.5em;
  background: #f4f4f4;
}
body {
  font-size: 14px;
  font-family: 'Lantinghei SC', 'Microsoft Yahei', Helvetica, Arial;
  color: #000;
}
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
}
audio,
canvas,
iframe,
img,
svg,
video {
  vertical-align: middle;
}
fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}
textarea {
  resize: vertical;
}
input,
select,
button,
textarea {
  font-size: 100%;
  font-family: inherit;
  margin: 0;
  padding: 0;
  outline: none;
}
a {
  color: #000;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #aaa;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #aaa;
}
input[type='text'],
select {
  -webkit-appearance: none;
}
.clearfix:after {
  content: '.';
  display: block;
  height: 0;
  clear: both;
  overflow: hidden;
  visibility: hidden;
}
.clearfix {
  *zoom: 1;
}
.clear {
  clear: both;
  width: 0px;
  height: 0px;
  font-size: 0px;
  overflow: hidden;
}
html,
body,
div,
span,
header,
nav,
a,
ul,
li {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  -webkit-text-size-adjust: 100%;
}
ol,
ul {
  list-style: none;
}
body {
  max-width: 800px;
  min-height: 100%;
  margin: 0 auto;
  position: relative;
  background: #fff;
  word-break: break-all;
}

.sx {
  background: #e5e5e5;
}
.sx table {
  margin-top: 0px;
}
.sx th {
  height: 30px;
  background: #f1f1f1;
}
.sx td {
  padding: 5px 0;
  text-align: center;
  border: solid 1px #d8ccb4;
  word-wrap: break-word;
  background: #fff;
}
.sx td.a-left {
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
}
.sx span {
  height: 18px;
  line-height: 18px;
  margin: 0 2px;
  padding: 0 2px;
  font-size: 12px;
  color: #fff;
  display: inline-block;
  background: #f00;
}
.sx span.green {
  background: #009933;
}
.sx span.blue {
  background: #3366ff;
}

ul.sx1 {
  width: 100%;
}
ul.sx1 li {
  float: left;
  width: 33.33%;
  padding: 5px 0;
  box-sizing: border-box;
}
ul.sx1 li dl {
  text-align: center;
}
ul.sx1 li dl dt {
  margin-bottom: 5px;
}
ul.sx1 li dl dt img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
  margin-left: 5px;
}
ul.sx1 li dl dd {
  padding: 0 5px;
}

.grey-line {
  border-top: solid 0px #e5e5e5;
}

/* 响应式调整 */
@media (max-width: 480px) {
  ul.sx1 li {
    width: 50%;
  }
}

@media (max-width: 320px) {
  ul.sx1 li {
    width: 100%;
  }
}
</style>
