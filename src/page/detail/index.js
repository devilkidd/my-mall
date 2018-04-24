'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
var _cart           = require('service/cart-service.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        productId : _mm.getUrlParam('productId') || '',
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 如果没有传productId, 自动跳回首页
        if(!this.data.productId){
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function(){
            var imageUrl   = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // count的操作
        $(document).on('click', '.p-count-btn', function(){
            var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $('.p-count'),
                currCount   = parseInt($pCount.val()),
                minCount    = 1,
                maxCount    = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        // 加入购物车
        $(document).on('click', '.cart-add', function(){
            // 正式代码 开始
            // _cart.addToCart({
            //     productId   : _this.data.productId,
            //     count       : $('.p-count').val()
            // }, function(res){
            //     window.location.href = './result.html?type=cart-add';
            // }, function(errMsg){
            //     _mm.errorTips(errMsg);
            // });
            // 正式代码 结束
            // 测试代码 开始
             window.location.href = './result.html?type=cart-add';
            // 测试代码 结束
        });
    },
    // 加载商品详情的数据
    loadDetail : function(){
        var _this       = this,
            html        = '',
            $pageWrap   = $('.page-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求detail信息
        // 正式代码 开始
        // _product.getProductDetail(this.data.productId, function(res){
        //     _this.filter(res);
        //     // 缓存住detail的数据
        //     _this.data.detailInfo = res;
        //     // render
        //     html = _mm.renderHtml(templateIndex, res);
        //     $pageWrap.html(html);
        // }, function(errMsg){
        //     $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
        // });
        // 正式代码 结束
        // 测试代码 开始
        var res={
            id:26,
            categoryId:26,
            name:'Apple iPhone 7 Plus (A1661) 128G手机',
            subtitle:'iPhone 7，现更以lv色呈现。',
            mainImage:'../resource/detail01.jpeg',
            subImages:'../resource/detail01.jpeg,../resource/detail02.jpeg,../resource/detail03.jpeg,../resource/detail04.jpeg',
            detail:'这里会从接口调用产品详情的数据',
            price:6997,
            stock:99,
            status:1,
            
        };
        _this.filter(res);
        _this.data.detailInfo = res;
        // render
        html = _mm.renderHtml(templateIndex, res);
        $pageWrap.html(html);
        // 测试代码 结束
    },
    // 数据匹配
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
};
$(function(){
    page.init();
})