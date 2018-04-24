'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
var templateIndex   = require('./index.string');
var Pagination=require('util/pagination/index.js');

var page = {
    data : {
        listParam : {
            keyword         : _mm.getUrlParam('keyword')    || '',
            categoryId      : _mm.getUrlParam('categoryId') || '',
            orderBy         : _mm.getUrlParam('orderBy')    || 'default',
            pageNum         : _mm.getUrlParam('pageNum')    || 1,
            pageSize        : _mm.getUrlParam('pageSize')   || 10,
        },
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        // 排序的点击事件
        $('.sort-item').click(function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            // 点击默认排序
            if($this.data('type') === 'default'){
                // 已经是active样式
                if($this.hasClass('active')) {
                    return;
                }
                // 其他
                else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            else if($this.data('type') === 'price'){
                // active class 的处理
                $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                // 升序、降序的处理
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载列表
            _this.loadList();
        });
    },
    // 加载list数据
    loadList : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam,
            $pListCon   = $('.p-list-con');
        // 加载时出现loading图标
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId 
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        // 正式代码 开始
        // _product.getProductList(listParam, function(res){
        //     listHtml = _mm.renderHtml(templateIndex, {
        //         list :  res.list
        //     });
        //     $pListCon.html(listHtml);
        //     _this.loadPagination({
        //         hasPreviousPage : res.hasPreviousPage,
        //         prePage         : res.prePage,
        //         hasNextPage     : res.hasNextPage,
        //         nextPage        : res.nextPage,
        //         pageNum         : res.pageNum,
        //         pages           : res.pages
        //     });
        // }, function(errMsg){
        //     _mm.errorTips(errMsg);
        // });
        // 正式代码 结束
        // 测试代码 开始
            var res={
                pageNum:1,
                pageSize:10,
                size:2,
                orderBy:null,
                startRow:1,
                endRow:1,
                total:1,
                pages:1,
                list:[
                    {
                        id:26,
                        categoryId:26,
                        name:'[测试]Apple iPhone 7 Plus (A1661) 128G手机',
                        subtitle:'iPhone 7，现更以lv色呈现。',
                        mainImage:"/resource/26.jpg",
                        price:6999,
                        status:1,
                        imageHost:'http://93027.com/my-mall',
                    },
                    {
                        id:27,
                        categoryId:27,
                        name:'[测试]4+64G送手环/Huawei/华为 nova 手机P9/P10plus青春',
                        subtitle:'NOVA青春版1999元',
                        mainImage:"/resource/27.jpg",
                        price:1999,
                        status:1,
                        // imageHost:'/',
                    },
                    {
                        id:28,
                        categoryId:28,
                        name:'[测试]Haier/海尔HJ100-1HU1 10公斤滚筒洗衣机全自动带烘干大容量 洗烘一体 厨卫家电',
                        subtitle:'门店机型 德邦送货',
                        mainImage:"/resource/28.jpg",
                        price:4299,
                        status:1,
                        imageHost:'http://93027.com/my-mall',
                    },
                    {
                        id:29,
                        categoryId:29,
                        name:'[测试]thinkpad旗舰本',
                        subtitle:'51大促！非常超值！',
                        mainImage:"/resource/29.jpg",
                        price:4288,
                        status:1,
                        imageHost:'http://93027.com/my-mall',
                    },
                    {
                        id:30,
                        categoryId:30,
                        name:'[测试]iPhone 7 Plus 4G手机，双卡双待，超长待机，纯黑色',
                        subtitle:'疯狂大促，仅售5999',
                        mainImage:"/resource/30.jpg",
                        price:5999,
                        status:1,
                        imageHost:'http://93027.com/my-mall',
                    },
                    {
                        id:31,
                        categoryId:31,
                        name:'[测试]rio/锐澳330ml*6支装饮料 进口洋酒 白酒 红酒 整箱伏特加鸡尾酒',
                        subtitle:'锐澳鸡尾酒330ml*6罐组合套餐，高果汁本榨鸡尾酒系列',
                        mainImage:"/resource/31.jpg",
                        price:53,
                        status:1,
                        imageHost:'http://93027.com/my-mall',
                    },
                    {
                        id:32,
                        categoryId:32,
                        name:'[测试]Hisense/海信 LED55EC720US 55吋4K高清智能网络平板液晶电视机',
                        subtitle:'55吋4K高清',
                        mainImage:"/resource/32.jpg",
                        price:4199,
                        status:1,
                        imageHost:'http://93027.com/my-mall',
                    },
                    {
                        id:33,
                        categoryId:33,
                        name:'[测试]hi插座插排插线板接线板配件小家电厨卫家电',
                        subtitle:'性能极佳的插座',
                        mainImage:"/resource/33.jpg",
                        price:9.9,
                        status:1,
                        imageHost:'http://93027.com/my-mall',
                    },
                    {
                        id:34,
                        categoryId:34,
                        name:'[测试]AHaier/海尔 KFR-33GW/10EBBAL13U1 1.5匹 空调挂机 智能操控',
                        subtitle:'安静的省电的',
                        mainImage:"/resource/34.jpg",
                        price:2099,
                        status:1,
                        imageHost:'http://93027.com/my-mall',
                    },
                    {
                        id:35,
                        categoryId:35,
                        name:'[测试]国行Apple/苹果 9.7英寸 iPad Pro WLAN 32GBwifi版轻薄平板电脑',
                        subtitle:'iPad Pro',
                        mainImage:"/resource/35.jpg",
                        price:3890,
                        status:1,
                        imageHost:'http://93027.com/my-mall',
                    },
                    {
                        id:36,
                        categoryId:36,
                        name:'[测试]Apple iPhone 7 Plus (A1661) 128G手机',
                        subtitle:'iPhone 7，现更以lv色呈现。',
                        mainImage:"/resource/36.jpg",
                        price:6999,
                        status:1,
                        imageHost:'http://93027.com/my-mall',
                    },
                ],
                firstPages:1,
                prePage:0,
                nextPage:2,
                lastPage:1,
                isFirstPage:true,
                isLastPage:true,
                hasPreviousPage:true,
                hasNextPage:true,
                navigatePages:8,
                navigatePageNums:[
                    1
                ]
            }   ;     
            listHtml = _mm.renderHtml(templateIndex, {
                list :  res.list
            });
            $pListCon.html(listHtml);
            var pageInfo={                
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages,
                pageSize        : res.pageSize
            };
            _this.loadPagination(pageInfo);
        // 测试代码 结束
    },
    // 加载分页信息
    loadPagination : function(pageInfo){        
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
};
$(function(){
    page.init();
})