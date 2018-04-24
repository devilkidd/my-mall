webpackJsonp([12],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(172);


/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

	

	'use strict';

	var _mm = __webpack_require__(10);

	var _user = {
	    // 用户登录
	    login : function(userInfo, resolve, reject){ 
	        _mm.request({
	            url     : _mm.getServerUrl('/user/login.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查用户名
	    checkUsername : function(username, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/check_valid.do'),
	            data    : {
	                type    : 'username',
	                str     : username
	            },
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 用户注册
	    register : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/register.do'),
	            // url     :'http://test.happymmall.com/user/register.do',

	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查登录状态
	    checkLogin : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/get_user_info.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取用户密码提示问题
	    getQuestion : function(username, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/forget_get_question.do'),
	            // url     :'http://test.happymmall.com/user/forget_get_question.do',

	            data    : {
	                username : username
	            },
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查密码提示问题答案
	    checkAnswer : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/forget_check_answer.do'),
	            // url     :'http://test.happymmall.com/user/forget_check_answer.do',

	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 重置密码
	    resetPassword : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/forget_reset_password.do'),
	            // url     :'http://test.happymmall.com/user/forget_reset_password.do',

	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取用户信息
	    getUserInfo : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/get_information.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 更新个人信息
	    updateUserInfo : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/update_information.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 登录状态下更新密码
	    updatePassword : function(userInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/reset_password.do'),
	            // url     :'http://test.happymmall.com/user/reset_password.do',
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 登出
	    logout : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/user/logout.do'),
	            // url     :'http://test.happymmall.com/user/logout.do',
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    }
	}
	module.exports = _user;

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(153);

/***/ }),

/***/ 153:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(173)
	__webpack_require__(152);
	var _mm=__webpack_require__(10);
	var _user=__webpack_require__(17);
	//表单里的错误提示
	var formError={
	    show:function (errMsg) {
	        $('.error-item').show().find('.err-msg').text(errMsg);
	    },
	    hide:function () {
	        $('.error-item').hide().find('.err-msg').text('');
	    },
	}
	var page={
	    init:function(){
	        this.bindEvent();
	    },
	    bindEvent:function(){
	        var _this=this;
	        //验证username
	        $('#username').blur(function () {
	            var username=$.trim($(this).val());
	            //判断username是否存在,用户名为空不做验证
	            if(!username) return;
	             //异步验证用户名是否存在
	            // 正式代码 开始
	            // _user.checkUsername(
	            //     username,
	            //     function (res) {
	            //         formError.hide();
	            //     },
	            //     function (errMsg) {
	            //         formError.show(errMsg);
	            //     }
	            // );
	            // 正式代码 结束
	        })
	        //点击注册按钮,提交表单
	        $('#submit').click(function(e){
	            //这句话很重要!!不然按钮的a链接会跳转刷新当前页面!!
	            e.preventDefault();
	            _this.submit();
	        });
	        //回车,提交表单
	        $('.user-content').keyup(function (e) {
	            if(e.keyCode===13){
	                _this.submit();
	            }
	        });
	    },
	    // 提交表单
	    submit:function(){
	        //取到username和password的值存入对象
	        var formData={
	            username:$.trim($('#username').val()),
	            password:$.trim($('#password').val()),
	            passwordConfirm:$.trim($('#password-confirm').val()),
	            phone:$.trim($('#phone').val()),
	            email:$.trim($('#email').val()),
	            question:$.trim($('#question').val()),
	            answer:$.trim($('#answer').val()),
	        };
	        //validateResult表单验证结果
	        //this在对象内使用,指向当前对象
	        validateResult=this.formValidate(formData);
	        // 验证成功,提交
	        if (validateResult.status) {
	            // 正式代码 开始
	            // _user.register(formData,function(res){
	            //     window.location.href='./result.html?type=register';//参数type控制result页面的显示内容
	            // },function (errMsg) {
	            //     formError.show(errMsg);
	            // })
	            // 正式代码 结束
	            // 测试代码 开始
	            window.location.href='./result.html?type=register';
	            // 测试代码 结束
	        }
	        // 验证失败,错误提示
	        else{
	            formError.show(validateResult.msg);
	        }
	    },
	    formValidate:function (formData) {
	        //定义result对象,存储验证结果
	        var result={
	            status:false,
	            msg:'',
	        };
	        //验证用户名是否为空
	        if (!_mm.validate(formData.username,'require')) {
	            result.msg='用户名不能为空';
	            return result;
	        }        
	        //验证密码是否为空
	        if (!_mm.validate(formData.password,'require')) {
	            result.msg='密码不能为空';
	            return result;
	        }       
	        //验证密码长度是否小于6位
	        if (formData.password.length<6) {
	            result.msg='密码长度不能小于6位';
	            return result;
	        }
	        //验证两次输入密码是否一致
	        if (formData.password!==formData.passwordConfirm) {
	            result.msg='两次输入密码不一致';
	            return result;
	        }        
	        //验证手机
	        if (!_mm.validate(formData.phone,'phone')) {
	            result.msg='手机号输入不正确';
	            return result;
	        }        
	        //验证邮箱
	        if (!_mm.validate(formData.email,'email')) {
	            result.msg='邮箱输入不正确';
	            return result;
	        }       
	         //验证密码提示问题
	        if (!_mm.validate(formData.question,'require')) {
	            result.msg='提示问题不能为空';
	            return result;
	        }        
	        //验证密码提示问题答案
	        if (!_mm.validate(formData.answer,'require')) {
	            result.msg='提示为题答案不能为空';
	            return result;
	        }        
	        
	        //验证通过
	        result.status=true;
	        result.msg='验证通过';
	        return result;
	    }

	};

	$(function(){
	    page.init();
	});

/***/ }),

/***/ 173:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});