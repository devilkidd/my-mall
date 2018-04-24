require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');

var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name: 'user-center',
        })
        //加载用户信息
        this.loadUserInfo();
    },
    bindEvent: function () {
        var _this = this
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val()),
            }
            validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                //更改用户信息
                // 正式代码 开始
                // _user.updateUserInfo(userInfo, function (res,msg) {
                //     _mm.successTips(msg);
                //     window.location.href = './user-center.html'
                // }, function (errMsg) {
                //     _mm.errorTips(errMsg);
                // });
                // 正式代码 结束
                // 测试代码 开始
                var msg='更新个人信息成功';
                    _mm.successTips(msg);
                    window.location.href = './user-center.html'                
                // 测试代码 结束
            }
            else {
                _mm.errorTips(validateResult.msg);
            }
        })
    },
    //加载用户信息
    loadUserInfo: function () {
        //定义容器,存储渲染后的html
        var userHtml = '';
        //通过接口请求用户数据
        // 正式代码 开始
        // _user.getUserInfo(function (res) {
        //     //渲染后数据存入userHtml
        //     userHtml = _mm.renderHtml(templateIndex, res);
        //     //将userHtml添加进页面
        //     $('.panel-body').html(userHtml);
        // }, function (errMsg) {
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
        }; 
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);        
        // 测试代码 结束
    },
    //验证字段信息
    validateForm: function (formData) {
        //定义result对象,存储验证结果
        var result = {
            status: false,
            msg: '',
        };
        
        //验证手机
        if (!_mm.validate(formData.phone, 'phone')) {
            console.log()
            result.msg = '手机号输入不正确';
            return result;
        }
        //验证邮箱
        if (!_mm.validate(formData.email, 'email')) {
            result.msg = '邮箱输入不正确';
            return result;
        }
        //验证密码提示问题
        if (!_mm.validate(formData.question, 'require')) {
            result.msg = '提示问题不能为空';
            return result;
        }
        //验证密码提示问题答案
        if (!_mm.validate(formData.answer, 'require')) {
            result.msg = '提示为题答案不能为空';
            return result;
        }

        //验证通过
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};

$(function () {
    page.init();
});