require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _user=require('service/user-service.js');
var templateIndex=require('./index.string');
var navSide=require('page/common/nav-side/index.js');
var _mm=require('util/mm.js');

var page={
    init:function(){
        this.onLoad();
    },
    onLoad:function(){
        //初始化左侧菜单
        navSide.init({
            name:'user-center',
        })
        //加载用户信息
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo:function(){
        //定义容器存储渲染后的html
        var userHtml='';
        //通过接口请求用户数据
        // 正式代码 开始
        // _user.getUserInfo(function (res) {
        //     //渲染后数据存入userHtml
        //     userHtml=_mm.renderHtml(templateIndex,res);
        //     //将userHtml添加进页面
        //     $('.panel-body').html(userHtml);
        // },function (errMsg) {
        //     _mm.errorTips(errMsg);
        // });
        // 正式代码 结束
        // 测试代码 开始
        var res={
            id:1,
            username:'test',
            password:'test',
            email:'test@qq.com',
            phone:'13612341234',
            question:'为什么做前端',
            answer:'信仰',
            role:1,
        }
        userHtml=_mm.renderHtml(templateIndex,res);
        //将userHtml添加进页面
        $('.panel-body').html(userHtml);
        // 测试代码 结束
    }  
};

$(function(){
    page.init();
});