require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _user = require('service/user-service.js');
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
            name: 'user-pass-update',
        })

    },
    bindEvent: function () {
        var _this = this
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val()),

            }
            validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                //更改用户密码
                // 正式代码 开始
                // _user.updatePassword({
                //     passwordOld:userInfo.password,
                //     passwordNew:userInfo.passwordNew,
                // }, function (res,msg) {
                //     _mm.successTips(msg);
                //  window.location.href='./user-center.html';
                // }, function (errMsg) {
                //     _mm.errorTips(errMsg);
                // });
                // 正式代码 结束
                // 测试代码 开始
                var msg='密码修改成功';
                _mm.successTips(msg);
                window.location.href='./user-center.html';
                // 测试代码 结束
            }
            else {
                _mm.errorTips(validateResult.msg);
            }
        })
    },
    //验证字段信息
    validateForm: function (formData) {
        //定义result对象,存储验证结果
        var result = {
            status: false,
            msg: '',
        };
        
        //验证原密码
        if (!_mm.validate(formData.password,'require')) {
            result.msg = '原密码不能为空';
            return result;
        }
        //验证新密码
        if (!formData.passwordNew||formData.passwordNew.length<6) {
             result.msg = '密码长度不能小于6位';
            return result;
        }
        //验证密码提示问题
        if (formData.passwordNew!==formData.passwordConfirm) {
            result.msg = '两次输入密码不一致';
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