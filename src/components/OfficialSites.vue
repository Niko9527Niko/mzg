<template>
  <div class="box pad" id="yxym">
    <div class="list-title" :style="titleStyle">
      {{ title }}
    </div>

    <table
      border="1"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      bordercolorlight="#FFFFFF"
      bordercolordark="#FFFFFF"
      class="gongshi"
    >
      <tr v-for="(row, rowIndex) in siteRows" :key="rowIndex">
        <td v-for="(site, colIndex) in row" :key="colIndex">
          <template v-if="site.name">
            <a
              href="javascript:void(0);"
              @click="openLink(site.code, '#yqlj')"
            >
              <span :style="{ color: linkColor }">{{ site.name }}</span>
            </a>
          </template>
          <template v-else>
            <!-- 空单元格 -->
            <a target="_blank" href="">
              <span :style="{ color: linkColor }"></span>
            </a>
          </template>
        </td>
      </tr>
    </table>

  </div>
</template>

<script>
export default {
  name: 'OfficialSites',

  props: {
    // 标题
    title: {
      type: String,
      default: '澳門官方（旗下網站）'
    },

    // 标题样式
    titleStyle: {
      type: Object,
      default: () => ({
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center'
      })
    },

    // 链接颜色
    linkColor: {
      type: String,
      default: '#000000'
    },

    // 是否显示弹窗确认
    showConfirmModal: {
      type: Boolean,
      default: true
    },

    // 弹窗确认文字配置
    modalTexts: {
      type: Object,
      default: () => ({
        title: '即将跳转',
        description: '您即将离开当前站点',
        confirm: '确认跳转',
        cancel: '取消'
      })
    },

    // 自定义网站数据（可覆盖默认数据）
    customSites: {
      type: Array,
      default: () => []
    },

    // 自定义链接映射
    customLinks: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      // 网站数据，按行分组
      siteRows: [
        [
          { name: '中特網', code: 'ztw' },
          { name: '摇钱树', code: 'yqs' },
          { name: '廣东会', code: 'dgh' },
          { name: '慈善網', code: 'csw' }
        ],
        [
          { name: '大贏家', code: 'dyj' },
          { name: '彩霸王', code: 'cbw' },
          { name: '金光佛', code: 'jgf' },
          { name: '彩民網', code: 'cmw' }
        ],
        [
          { name: '聚宝盆', code: 'jbp' },
          { name: '狀元紅', code: 'zyh' },
          { name: '九點半', code: 'jdb' },
          { name: '钱多多', code: 'qdd' }
        ],
        [
          { name: '大三巴', code: 'dsb' },
          { name: '大联盟', code: 'dlm' },
          { name: '鳯凰網', code: 'fhw' },
          { name: '神算子', code: 'ssz' }
        ],
        [
          { name: '廣西汇', code: 'gxh' },
          { name: '聚彩堂', code: 'jct' },
          { name: '铁算盘', code: 'tsp' },
          { name: '赌侠网', code: 'dxw' }
        ],
        [
          { name: '开奖网', code: 'kjw' },
          { name: '金算盘', code: 'jsp' },
          { name: '王中王', code: 'wzw' },
          { name: '二四六', code: 'esl' }
        ],
        [
          { name: '白小姐', code: 'bxj' },
          { name: '管家婆', code: 'gjp' },
          { name: '诸葛亮', code: 'zgl' },
          { name: '刘伯温', code: 'lbw' }
        ],
        [
          { name: '曾道人', code: 'zdr' },
          { name: '黄大仙', code: 'hdx' },
          {}, // 空单元格
          {}  // 空单元格
        ]
      ],

      // 弹窗相关
      showLinkModal: false,
      pendingLinkCode: null,
      pendingLinkName: '',

      // 网站链接映射（可被自定义链接覆盖）
      defaultSiteLinks: {
        ztw: 'https://ztw.example.com',
        yqs: 'https://yqs.example.com',
        dgh: 'https://dgh.example.com',
        csw: 'https://csw.example.com',
        dyj: 'https://dyj.example.com',
        cbw: 'https://cbw.example.com',
        jgf: 'https://jgf.example.com',
        cmw: 'https://cmw.example.com',
        jbp: 'https://jbp.example.com',
        zyh: 'https://zyh.example.com',
        jdb: 'https://jdb.example.com',
        qdd: 'https://qdd.example.com',
        dsb: 'https://dsb.example.com',
        dlm: 'https://dlm.example.com',
        fhw: 'https://fhw.example.com',
        ssz: 'https://ssz.example.com',
        gxh: 'https://gxh.example.com',
        jct: 'https://jct.example.com',
        tsp: 'https://tsp.example.com',
        dxw: 'https://dxw.example.com',
        kjw: 'https://kjw.example.com',
        jsp: 'https://jsp.example.com',
        wzw: 'https://wzw.example.com',
        esl: 'https://esl.example.com',
        bxj: 'https://bxj.example.com',
        gjp: 'https://gjp.example.com',
        zgl: 'https://zgl.example.com',
        lbw: 'https://lbw.example.com',
        zdr: 'https://zdr.example.com',
        hdx: 'https://hdx.example.com'
      }
    };
  },

  computed: {
    currentSiteName() {
      return this.pendingLinkName || '';
    },

    // 合并后的网站链接（自定义覆盖默认）
    siteLinks() {
      return {
        ...this.defaultSiteLinks,
        ...this.customLinks
      };
    }
  },

  watch: {
    // 监听自定义网站数据变化
    customSites: {
      handler(newSites) {
        if (newSites && newSites.length > 0) {
          this.updateSiteRows(newSites);
        }
      },
      immediate: true
    },

    // 监听标题变化
    title(newTitle) {
      this.$emit('title-change', newTitle);
    }
  },

  mounted() {
    // 如果提供了自定义网站数据，则更新
    if (this.customSites && this.customSites.length > 0) {
      this.updateSiteRows(this.customSites);
    }
  },

  methods: {
    // 更新网站数据行
    updateSiteRows(sites) {
      const sitesArray = [...sites];
      const rows = [];
      const itemsPerRow = 4; // 每行4个

      // 将网站数据分组为每行4个
      for (let i = 0; i < sitesArray.length; i += itemsPerRow) {
        const row = sitesArray.slice(i, i + itemsPerRow);
        // 确保每行都有4个单元格
        while (row.length < itemsPerRow) {
          row.push({});
        }
        rows.push(row);
      }

      // 确保至少有8行（保持原始布局）
      while (rows.length < 8) {
        const emptyRow = Array(itemsPerRow).fill({});
        rows.push(emptyRow);
      }

      this.siteRows = rows;
    },

    // 打开链接
    openLink(code, anchor) {
      const site = this.getSiteByCode(code);
      if (!site) return;

      this.pendingLinkCode = code;
      this.pendingLinkName = site.name;

      // 根据配置决定是否显示弹窗
      if (this.showConfirmModal) {
        this.showLinkModal = true;
      } else {
        // 不显示弹窗，直接跳转
        this.confirmJump();
      }

      // 触发点击事件
      this.$emit('site-click', {
        code: code,
        name: site.name,
        anchor: anchor
      });
    },

    // 根据代码获取网站信息
    getSiteByCode(code) {
      for (const row of this.siteRows) {
        for (const site of row) {
          if (site.code === code) {
            return site;
          }
        }
      }
      return null;
    },

    // 确认跳转
    confirmJump() {
      if (this.pendingLinkCode && this.siteLinks[this.pendingLinkCode]) {
        // 在新窗口打开链接
        window.open(this.siteLinks[this.pendingLinkCode], '_blank');

        // 记录访问历史
        this.recordVisit(this.pendingLinkCode);

        // 触发跳转事件
        this.$emit('site-jump', {
          code: this.pendingLinkCode,
          name: this.pendingLinkName,
          url: this.siteLinks[this.pendingLinkCode]
        });
      }

      this.closeModal();
    },

    // 取消跳转
    cancelJump() {
      this.closeModal();

      // 触发取消事件
      this.$emit('site-cancel', {
        code: this.pendingLinkCode,
        name: this.pendingLinkName
      });
    },

    // 关闭弹窗
    closeModal() {
      this.showLinkModal = false;
      this.pendingLinkCode = null;
      this.pendingLinkName = '';
    },

    // 记录访问历史
    recordVisit(code) {
      try {
        const visits = JSON.parse(localStorage.getItem('siteVisits') || '[]');
        visits.unshift({
          code: code,
          name: this.getSiteByCode(code)?.name,
          timestamp: new Date().toISOString()
        });

        // 只保留最近的20条记录
        localStorage.setItem('siteVisits', JSON.stringify(visits.slice(0, 20)));

        // 触发访问记录事件
        this.$emit('visit-recorded', visits[0]);
      } catch (error) {
        console.error('记录访问历史失败:', error);
        this.$emit('visit-error', error);
      }
    },

    // 获取最近访问的网站
    getRecentVisits() {
      try {
        const visits = JSON.parse(localStorage.getItem('siteVisits') || '[]');
        this.$emit('recent-visits-loaded', visits);
        return visits;
      } catch (error) {
        console.error('获取访问历史失败:', error);
        this.$emit('recent-visits-error', error);
        return [];
      }
    },

    // 获取最热门的网站（按访问次数）
    getPopularSites() {
      try {
        const visits = JSON.parse(localStorage.getItem('siteVisits') || '[]');
        const countMap = {};

        visits.forEach(visit => {
          countMap[visit.code] = (countMap[visit.code] || 0) + 1;
        });

        const popularSites = Object.entries(countMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([code, count]) => ({
            code,
            count,
            name: this.getSiteByCode(code)?.name
          }));

        this.$emit('popular-sites-loaded', popularSites);
        return popularSites;
      } catch (error) {
        console.error('获取热门网站失败:', error);
        this.$emit('popular-sites-error', error);
        return [];
      }
    },

    // 添加新网站
    addSite(site) {
      const newSite = {
        name: site.name,
        code: site.code || this.generateSiteCode(site.name)
      };

      // 找到第一个空单元格
      for (let i = 0; i < this.siteRows.length; i++) {
        for (let j = 0; j < this.siteRows[i].length; j++) {
          if (!this.siteRows[i][j].name) {
            this.siteRows[i][j] = newSite;
            this.$emit('site-added', newSite);
            return true;
          }
        }
      }

      // 如果没有空单元格，添加到新行
      this.addNewRow(newSite);
      return true;
    },

    // 添加新行
    addNewRow(site) {
      const newRow = [site, {}, {}, {}];
      this.siteRows.push(newRow);
      this.$emit('row-added', newRow);
    },

    // 生成网站代码
    generateSiteCode(name) {
      // 简单的中文转拼音首字母
      const pinyinMap = {
        '中': 'z', '特': 't', '網': 'w',
        '摇': 'y', '钱': 'q', '树': 's',
        // 可以继续添加更多映射
      };

      let code = '';
      for (const char of name) {
        code += pinyinMap[char] || char.toLowerCase();
      }
      return code;
    }
  }
};
</script>

