const texts = ["6h","a1","ab","12","df","88","66","58","dh","49","01","tk","tm","sx","1H","dx","kj","j8","LV","v0","wz","ss","d3","p5","T1","P7","9x","1m"];
const sjzf = document.getElementById('sjzf');
function displayRandomText() {
    const randomIndex = Math.floor(Math.random() * texts.length);
    sjzf.textContent = texts[randomIndex];}
setInterval(displayRandomText, 2000);
function generatePeriods(swiperWrapperId, configQishu, numPeriods) {
    var qishuInt = parseInt(configQishu, 10); // 转换为整数，去除前导零
    var swiperWrapper = document.querySelector('#' + swiperWrapperId + ' .swiper-wrapper');

    var startQishu = qishuInt - numPeriods + 1 > 0 ? qishuInt - numPeriods + 1 : 1;

    for (var i = qishuInt; i >= startQishu; i--) {
        var div = document.createElement('div');
        div.className = 'swiper-slide';
        div.innerHTML = '<div><div>' + i + '期</div></div>';
        swiperWrapper.appendChild(div);
    }
}


//   初始化图
// 然后在 initGallery 函数中调用它：
function initGallery(galleryId, configQishu, imageUrlTemplate, numPeriods) {
    generatePeriods(galleryId, configQishu, numPeriods);

    var swiper = new Swiper('#' + galleryId + ' .swiper', {
        slidesPerView: 'auto',
        on: {
            click: function (event) {
                // 清除所有swiper-slide的样式
                var allSlides = document.querySelectorAll('#' + galleryId + ' .swiper-slide>div>div');
                allSlides.forEach(function (slide) {
                    slide.classList.remove('activebtn9X1MA');
                });

                // 添加新样式到被点击的swiper-slide
                if (event.clickedIndex !== undefined) {
                    var clickedSlide = document.querySelectorAll('#' + galleryId + ' .swiper-slide>div>div')[event.clickedIndex];
                    clickedSlide.classList.add('activebtn9X1MA');
                }

                // 更新画廊图片
                var clickedIndex = event.clickedIndex;
                if (clickedIndex !== undefined) {
                    var qishuInt = parseInt(configQishu, 10);
                    var clickedQishu = qishuInt - clickedIndex; // 计算点击的期数
                    loadGalleryImage(galleryId, clickedQishu, imageUrlTemplate);
                }
            },
        },
    });

    // 加载默认图片
    var qishuInt = parseInt(configQishu, 10);
    loadGalleryImage(galleryId, qishuInt, imageUrlTemplate);

    // 为当前期数添加特定样式
    var currentSlide = document.querySelector('#' + galleryId + ' .swiper-slide:first-child>div>div');
    if (currentSlide) {
        currentSlide.classList.add('activebtn9X1MA');
    }
}

// 加载图片的函数
function loadGalleryImage(galleryId, qishu, imageUrlTemplate) {
    var imgElement = document.querySelector('#' + galleryId + ' img');
    var imageUrl = imageUrlTemplate.replace('{qishu}', qishu);

    imgElement.onload = function() {
        imgElement.alt = "";
    };

    imgElement.onerror = function() {
        imgElement.alt = "图片正在更新中";
        imgElement.src = "";
    };

    imgElement.src = imageUrl;
}


// 初始化图片
// 澳门图
initGallery('mySwiperaomenBoxImg1', config.am_qishu, "https://tu.tuku.fit/aomen/2026/col/{qishu}/sbxxj.jpg",25);

// 初始化图片