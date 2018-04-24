webpackJsonp([10],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(166);


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

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(167)
	__webpack_require__(152);
	var _mm = __webpack_require__(10);
	var _user = __webpack_require__(17);
	//表单里的错误提示
	var formError = {
	    show: function (errMsg) {
	        $('.error-item').show().find('.err-msg').text(errMsg);
	    },
	    hide: function () {
	        $('.error-item').hide().find('.err-msg').text('');
	    },
	}
	var page = {
	    //存储逐步拿到的数据,最后统一提交
	    data: {
	        username: '',
	        question: '',
	        answer: '',
	        token: '',
	    },
	    init: function () {
	        this.onLoad();
	        this.bindEvent();
	    },
	    onLoad: function () {
	        this.loadStepUsername();
	    },
	    // 显示用户名输入框
	    loadStepUsername: function () {
	        $('.step-username').show();
	    },
	    //显示密码提示问题答案输入框
	    loadStepQuestion: function () {
	        //隐藏错误提示
	        formError.hide();
	        //切换容器,将服务器返回的密码提示问题显示在页面上
	        $('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);
	    },
	    //显示重置新密码输入框
	    loadStepPassword: function () {
	        formError.hide();
	        $('.step-question').hide().siblings('.step-password').show();
	    },
	    bindEvent: function () {
	        var _this = this;
	        //找回密码第一步绑定点击事件
	        $('#submit-username').click(function (e) {
	            //这句话很重要!!不然按钮的a链接会跳转刷新当前页面!!
	            e.preventDefault();
	            var username = $.trim($('#username').val());
	            //用户名存在
	            // 正式代码 开始
	            // if (username) {
	            //     _user.getQuestion(username, function (res) {
	            //         //将username存入data.username
	            //         _this.data.username = username;
	            //         //将返回的提示问题存入data.question
	            //         _this.data.question = res;
	            //         _this.loadStepQuestion();

	            //     }, function (errMsg) {
	            //         formError.show(errMsg);
	            //     })
	            // }
	            // 正式代码 结束
	            // 测试代码 开始
	            var res='为什么要做前端';
	            if (username) {
	                    _this.data.username = username;
	                    //将返回的提示问题存入data.question
	                    _this.data.question = res;
	                    _this.loadStepQuestion();
	            }
	            // 测试代码 结束
	            //用户名不存在
	            else {
	                formError.show('请输入用户名');
	            }
	        });

	        //找回密码第二步绑定点击事件
	        $('#submit-question').click(function (e) {
	            //这句话很重要!!不然按钮的a链接会跳转刷新当前页面!!
	            e.preventDefault();
	            var answer = $.trim($('#answer').val());
	            //检查密码提示问题答案
	            // 正式代码 开始
	            // if (answer) {
	            //     _user.checkAnswer({
	            //         username: _this.data.username,
	            //         question: _this.data.question,
	            //         answer: answer,
	            //     }, function (res) {
	            //         //将answer存入data.answer
	            //         _this.data.answer = answer;
	            //         //将返回的token存入data.token
	            //         _this.data.token = res;
	            //         _this.loadStepPassword();

	            //     }, function (errMsg) {
	            //         formError.show(errMsg);
	            //     })
	            // }
	            // 正式代码 结束
	            // 测试代码 开始
	            var res='this is a token';
	            if (answer) {             
	                    _this.data.answer = answer;
	                    _this.data.token = res;
	                    _this.loadStepPassword();
	            }           
	            // 测试代码 结束
	            //密码提示问题答案为空
	            else {
	                formError.show('请输入密码提示问题答案');
	            }
	        });
	        //找回密码第三步绑定点击事件
	        $('#submit-password').click(function (e) {
	            //这句话很重要!!不然按钮的a链接会跳转刷新当前页面!!
	            e.preventDefault();
	            var password = $.trim($('#password').val());
	            //检查新密码
	            // 正式代码 开始
	            // if (password&&password.length>=6) {
	            //     _user.resetPassword({
	            //         username: _this.data.username,
	            //         //新密码
	            //         passwordNew: password,
	            //         //服务器返回的token
	            //         forgetToken: _this.data.token,
	            //     }, function (res) {
	            //         window.location.href='./result.html?type=pass-reset';
	            //     }, function (errMsg) {
	            //         formError.show(errMsg);
	            //     })
	            // }
	            // 正式代码 结束
	            // 测试代码 开始
	            if (password&&password.length>=6) {
	               window.location.href='./result.html?type=pass-reset';
	            }
	            // 测试代码 结束
	            //新密码为空
	            else {
	                formError.show('请输入不少于6位的新密码');
	            }
	        });
	    },

	};

	$(function () {
	    page.init();
	});

/***/ }),

/***/ 167:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});