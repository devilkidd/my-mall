'use strict';
require('./index.css');
var _mm     = require('util/mm.js');
var _user   = require('service/user-service.js');
var _cart   = require('service/cart-service.js');
// 测试数据
var res={
    id:1,
    username:'test',
    email:'test@qq.com',
    phone:'13612341234',
    role:0,
    creatTime:1479048325000,        
    updateTime:1479048325000,        
}
// 导航
var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        // 登录点击事件
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        // 注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        // 退出点击事件
        $('.js-logout').click(function(){
            _user.logout(function(res){
                //reload()重新加载文档,登出账号
                window.location.reload();
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    // 加载用户信息
    loadUserInfo : function(){
        // 正式代码 开始
        // _user.checkLogin(function(res){
        //     $('.user.not-login').hide().siblings('.user.login').show()
        //         .find('.username').text(res.username);
        // }, function(errMsg){
        //     // do nothing
        // });
        // 正式代码 结束
        // 测试代码 开始

            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);        
        // 测试代码 结束
    },
    // 加载购物车数量
    loadCartCount : function(){
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
        }, function(errMsg){
            $('.nav .cart-count').text(0);
        });
    }
};

module.exports = nav.init();