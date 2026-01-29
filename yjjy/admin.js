//331

var config = {
	am_qishu: '028',
	hk_qishu: '012',
	klb_qishu: '028',
	ktdomain: '0149',
	jwdomain: '338',
	name: "妈祖阁",
//内部链接开始
adlinks: [
       
        {
            name: "tsp",
            url: ["https://s-tsp-t.navutustars.com:2053/"],
            title: "铁算盘"
        },
        {
            name: "jct",
            url: ["https://j-ct-a.j2de-jcts3n5.app:2053/"],
            title: "聚彩堂"
        },
        {
            name: "gjp",
            url: ["https://q-gjp-r.lorriewilliams.com:2053/"],
            title: "管家婆"
        },
        {
            name: "lbw",
            url: ["https://o-lbw-p.knconnection.com:2053/"],
            title: "刘伯温"
        },
        {
            name: "zgl",
            url: ["https://o-zgl-p.iranbroadcasting.com:2053/"],
            title: "诸葛亮"
        },
        {
            name: "hdx",
            url: ["https://s-hdx-t.ledestinyschools.com:2053/"],
            title: "黄大仙"
        },
        {
            name: "bxj",
            url: ["https://m-bxj-n.o-translate.com:2053/"],
            title: "白小姐"
        },
        {
            name: "zdr",
            url: ["https://g-zdr-t.mohamedjalal.com:2053/"],
            title: "曾道人"
        },
        {
            name: "esl",
            url: ["https://e-sl-a.7gr7-eslcn2b.app:2053/"],
            title: "二四六"
        },
        {
            name: "dxw",
            url: ["https://d-xw-a.32r7-dxwk48s.app:2053/"],
            title: "赌侠网"
        },
        {
            name: "wzw",
            url: ["https://m-wzw-n.livingstonpromo.com:2053/"],
            title: "王中王"
        },
        {
            name: "kjw",
            url: ["https://q-kjw-r.jumpstart4life.com:2053/"],
            title: "开奖网"
        },
        {
            name: "jsp",
            url: ["https://o-jsp-p.chunhopower.com:2053/"],
            title: "金算盘"
        },
        {
            name: "gxh",
            url: ["https://gxh-608-aa.kinsei-yochien.com:2053/"],
            title: "广西汇"
        },
        {
            name: "ssz",
            url: ["https://ssz-a-605.98f3-ssz201h.app:2053/"],
            title: "神算子"
        },
        {
            name: "fhw",
            url: ["https://fhw-a-427.thevintagechain.com:2053/"],
            title: "凤凰网"
        },
        {
            name: "dsb",
            url: ["https://dsb-250-d.tudsadvertising.com:2053/"],
            title: "大三巴"
        },
        {
            name: "mzg",
            url: ["https://mzg-378-b.3getonline.com:2053/"],
            title: "妈祖阁"
        },
        {
            name: "dlm",
            url: ["https://dlm-a-270.storytimestore.com:2053/"],
            title: "大联盟"
        },
        {
            name: "qdd",
            url: ["https://qdd-a-478.6yhj-qddzmkq.app:2053/"],
            title: "钱多多"
        },
        {
            name: "jdb",
            url: ["https://jdb-a-903.fx5y-jdbguf3.app:2053/"],
            title: "九点半"
        },
        {
            name: "zyh",
            url: ["https://zyh-a-970.59y2-zyhm8uj.app:2053/"],
            title: "状元红"
        },
        {
            name: "jbp",
            url: ["https://jbp-a-389.jieyu-gifts.com:2053/"],
            title: "聚宝盆"
        },
        {
            name: "jgf",
            url: ["https://jfg-a-730.y0jf-jgfw3wl.app:2053/"],
            title: "金光佛"
        },
        {
            name: "cmw",
            url: ["https://cmw-a-163.zhangyancloud.com:2053/"],
            title: "彩民网"
        },
        {
            name: "cbw",
            url: ["https://cbw-a-245.wyxmoney.com:2053/"],
            title: "彩霸王"
        },
        {
            name: "csw",
            url: ["https://csw-579-d.shamotuanjian.com:2053/"],
            title: "慈善网"
        },
        {
            name: "yqs",
            url: ["https://y-qs-a.h2i7-yqs3y9h.app:2053/"],
            title: "摇钱树"
        },
        {
            name: "dyj",
            url: ["https://dyj-869-c.datingrichbeauty.com:2053/"],
            title: "大赢家"
        },
        {
            name: "gdh",
            url: ["https://g-dh-a.3ks0-gdhw7d3.app:2053/"],
            title: "广东会"
        },
        {
            name: "ztw",
            url: ["https://z-tw-a.83jd-ztwpk7d.app:2053/"],
            title: "中特网"
        },

   // 站内链接结束
    ],
//内部链接结束
}


// 广告链接函数，支持 adlinks 和 newadlinks
// 打开指定广告链接的函数
function openLink(linkName, additionalParam) {
	// 在 config.adlinks 和 config.newadlinks 中查找匹配的链接对象
	let linkConfig = config.adlinks.find(link =>link.name === linkName) || config.newadlinks.find(link =>link.name === linkName);

	// 如果找到了匹配的链接对象且链接数组不为空
	if (linkConfig && linkConfig.url.length > 0) {
		let defaultParam = "0149dh"; // 默认参数值
		let paramToUse = additionalParam ? additionalParam: defaultParam; // 使用传入的参数，若为空则使用默认值
		// 从 url 数组中随机选择一个链接
		let randomIndex = Math.floor(Math.random() * linkConfig.url.length);
		let selectedUrl = linkConfig.url[randomIndex]; // 选中的 URL
		// 将参数附加到选定的 URL 后，形成完整的链接
		let url = selectedUrl + paramToUse;

		// 打开新窗口或标签页，访问构建的 URL
		window.open(url, "_blank");
	} else {
		// 如果未找到指定的链接对象，输出错误信息到控制台
		console.error("未找到链接: " + linkName);
	}
}