(function(){
    $.ajax({
        url:'http://127.0.0.1:3000/index',
        type:'get',
        dataType:'json'
    }).then(result=>{
        var html=`<div class="carousel-item active">
        <img class="w-100" src='${result.data[0].href}'/>
        </div>`;
        for(var i=1;i<result.data.length;i++){
            var p1 = result.data[i].href;
            html+=`<div class="carousel-item">
            <img class="w-100" src='${p1}'/>
            </div>`;
        }
        var div1 = document.getElementById('banner10')
        div1.innerHTML = html;
    });
    $.ajax({
        url:'http://127.0.0.1:3000/contbox',
        type:'get',
        dataType:'json'
    }).then(result=>{
        var html = `<li class="firli">
        <div class="contbox1">
            <a target="_blank" href="file:///C:/Users/Hubery/Desktop/Hubery/Project1/tsf1/product-details.html" title="金如意（金箔）【预售】">
            <span class="fl left-word">
                <span class="f27">金如意（金箔）【预...</span>
                <span class="f18">全黄铜，24k真金金箔贴制</span><br/>
                <span class="f16 price1">4700元</span>
                <span class="f16 price2">1199元</span>
            </span>
            <span class="fl picbox">
                <img src="../image/14780020003902dn8hm.jpg" alt="">
            </span>
                <div class="clearfix"></div>
            </a>
        </div>
    </li>`;
        for(var i = 0;i<4;i++){
            var tit = result.data[i].title;
            var pri = result.data[i].price;
            var pri1 = result.data[i].price1;
            var pics = result.data[i].pic;
            var hre = result.data[i].href;
            html += `<li><div class="contbox">
                <span class="itemname">
                    <a href="#">${tit}</a>
                </span>
                <span class="itemprice">
                    <i class="price1">${pri}元</i>
                    <i class="price2">${pri1}元</i>
                </span>
                <span class="imgbox">
                    <a target="_blank" href="${hre}">
                        <img src="${pics}" alt="">
                    </a>
                </span>
            </div></li>`
        }
        var div2 = document.getElementById('cont');
        div2.innerHTML=html;
    });
    $.ajax({
        url:'http://127.0.0.1:3000/contbox',
        type:'get',
        dataType:'json'
    }).then(result=>{
        var html = '';
        for(var i = 2;i<result.data.length;i++){
            var tit = result.data[i].title;
            var pri = result.data[i].price;
            var pri1 = result.data[i].price1;
            var pics = result.data[i].pic;
            var hre = result.data[i].href;
            html += `<li><div class="contbox">
            <span class="itemname">
                <a href="#">${tit}</a>
            </span>
            <span class="itemprice">
                <i class="price1">${pri}元</i>
                <i class="price2">${pri1}元</i>
            </span>
            <span class="imgbox">
                <a target="_blank" href="${hre}">
                    <img src="${pics}" alt="">
                </a>
            </span>
        </div></li>`;
        }
        var div3 = document.getElementById('cont1');
        div3.innerHTML = html;
    });
    $.ajax({
        url:'http://127.0.0.1:3000/hot',
        type:'get',
        dataType:'json'
    }).then(result=>{
        var html = '';
        for(var i = 0;i<result.data.length;i++){
            var hi = result.data[i].hid;
            var tit = result.data[i].title;
            var pri = result.data[i].price2;
            var pics = result.data[i].pic;
            var hre = result.data[i].href;
            html += `<li class="card2">
            <a href="${hre}">
                <span class="fl num">${hi}</span>
                <div class="fl c-mid">
                    <span class="font-name">${tit}</span>
                    <span class="price2">${pri}元</span>
                </div>
                <span class="img fl"><img src="${pics}" alt=""></span>
            </a>
        </li>`;
        }
        var div4 = document.getElementById('cont3');
        div4.innerHTML = html;
    })
})()