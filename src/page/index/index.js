require('page/common/header/index.js');
require('page/common/nav/index.js');
require('./index.css');
require('util/slider/index.js');

var navSide=require('page/common/nav-side/index.js');
var templateBanner=require('./banner.string');

var _mm=require('util/mm.js');

$(function(){
    //渲染banner的html
    var bannerHtml=_mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    //初始化banner
    var $slider=$('.banner').unslider({
        dots:true,
    });
    //前一张和后一张按钮的事件绑定
    $('.banner-con .banner-arrow').click(function () {
        var forword=$(this).hasClass('prev')?'prev':'next';
        $slider.data('unslider')[forword]();
    })
})