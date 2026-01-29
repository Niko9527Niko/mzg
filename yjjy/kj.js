document.write(`
<style type="text/css">
    .KJ-TabBox{height: 166px; overflow: hidden; color:#333; background: #fff;}

.KJ-TabBox ul,.KJ-TabBox li{margin:0;list-style:none;padding:0;border:0;font-size: 18px;}
.KJ-TabBox ul { display: flex; height: 41px; padding: 8px 0 0 8px; box-sizing: border-box; border-bottom: solid 2px #FFF;}
.KJ-TabBox li{ flex: 1; height: 26px; line-height: 26px; margin-right: 8px; text-align: center; border-radius: 4px; background: #eee; cursor: pointer;}
.KJ-TabBox li.cur{ color: #fff; background: #FF9900;}
.KJ-TabBox li:nth-child(1).cur { background: #1FB61D;}
.KJ-TabBox li:nth-child(2).cur { background: #E71607;}
.KJ-TabBox li:nth-child(3).cur { background: #2389E9;}
.KJ-TabBox li:nth-child(4).cur { background: #B907C1;}
.KJ-TabBox div{display:none;}
.KJ-TabBox div.cur{display:block!important;}
.KJ-TabBox .KJ-IFRAME{}
@media screen and (max-width: 650px) {
.KJ-TabBox ul,.KJ-TabBox li { font-size: 16px;}
}	
</style>

	<div class="KJ-TabBox">
		<ul><li data-opt="{'color':'#fff','url':'https://qdddsbmzg.dglietou.com/ambm/27849.html','height':130}">澳门彩</li>
		<li data-opt="{'color':'#fff','url':'https://qdddsbmzg.dglietou.com/bm/dh49.html','height':130}">香港彩</li>
		<li data-opt="{'color':'#fff','url':'https://qdddsbmzg.dglietou.com/klbm/ygkl.html','height':130}">快乐8</li>
		</ul>
		<div></div><div></div><div></div><div></div><div></div>
	</div>
`);
var KJTB = {
    $(str) {
        return document.querySelector(str);
    },
    init(str) {
        var that = this;
        var dom = this.$(str);
        dom.addEventListener("click", function (e) {
            var el = e.target;
            if (el.tagName != "LI" || el.className == "cur") return;
            var ind = that.index(el);
            var nodes = dom.querySelectorAll("li");
            for (var item of nodes) {
                item.removeAttribute("style");
                item.removeAttribute("class");
            }
            el.className = "cur";
            nodes = dom.querySelectorAll("div");
            for (var item of nodes) {
                if (item.getAttribute("class") == "cur") that.leave(item);
                item.removeAttribute("style");
                item.removeAttribute("class");
            }
            var node = that.getEl(dom, ind, "DIV");
            node.className = "cur";
            that.cur(dom, el, node);
        });
        var node = that.getEl(dom.querySelector("UL"), 0, "LI");
        node.click();
        [
            [document, "DOMContentLoaded"],
            [window, "resize"]
        ].forEach((item, index, self) => {
            var removeEl = (id) => {
                try {
                    var ifr = document.getElementById(id);
                    ifr.parentNode.removeChild(ifr);
                } catch (e) { }
            };
            var insert = (id, str) => {
                var dom = document.createElement("style");
                dom.id = id;
                dom.innerHTML = str;
                document.head.appendChild(dom);
            };
            item[0].addEventListener(
                item[1],
                function () {
                    removeEl("kj-iframe-css");
                    var w = window.screen.availWidth;
                    if (w <= 650 && w > 500) {
                        insert("kj-iframe-css", ".KJ-IFRAME{height:170px;}");
                    } else if (w <= 500 && w > 450) {
                        insert("kj-iframe-css", ".KJ-IFRAME{height:150px;}");
                    } else if (w <= 450 && w > 350) {
                        insert("kj-iframe-css", ".KJ-IFRAME{height:140px;}");
                    } else if (w <= 350) {
                        insert("kj-iframe-css", ".KJ-IFRAME{height:130px;}");
                    }
                },
                false
            );
        });
    },
    cur(dom, el, node) {
        var that = this;
        var data = el.getAttribute("data-opt");
        data = JSON.parse(data.replace(/'/g, '"'));
        el.style.color = data["color"];
        el.style.borderColor = data["color"];
        node.style.borderColor = data["color"];
        var tid = node.getAttribute("_tid");
        if (tid) {
            clearTimeout(parseInt(tid));
            node.removeAttribute("_tid");
            return;
        }
        node.innerHTML = `
			<iframe class="KJ-IFRAME" src="${data["url"]}" width="100%" height="${data["height"]}" frameborder="0" scrolling="no"></iframe>
		`;
    },
    leave(item) {
        var that = this;
        function remove(el) {
            this.id = setTimeout(() => {
                if (!el.getAttribute("_tid")) return;
                el.removeAttribute("_tid");
                el.innerHTML = "";
            }, 1000 * 10);
            el.setAttribute("_tid", this.id);
        }
        new remove(item);
    },
    index(el, tag) {
        var node = el.parentNode.childNodes;
        var index = -1;
        for (var item of node) {
            tag ? tag == item.tagName && index++ : index++;
            if (item === el) return index;
        }
        return index;
    },
    getEl(el, index, tag) {
        var i = -1;
        for (var item of el.childNodes) {
            tag ? tag == item.tagName && i++ : i++;
            if (index == i) return item;
        }
    }
};
KJTB.init(".KJ-TabBox");

