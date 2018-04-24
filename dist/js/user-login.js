webpackJsonp([9],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(163);


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

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(164);
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
	        //点击登录按钮,提交表单
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
	        };
	        //validateResult表单验证结果
	        //this在对象内使用,指向当前对象
	        validateResult=this.formValidate(formData);
	        // console.log(formData);
	        // console.log(validateResult);
	        // 验证成功,提交
	        // 正式代码 开始
	        // if (validateResult.status) {
	        //     _user.login(formData,function(res){
	        //         window.location.href=_mm.getUrlParam('redirect')||'./index.html';
	        //     },function (errMsg) {
	        //         formError.show(errMsg);
	        //     })
	        // }
	        // 正式代码 结束
	        // 测试代码 开始
	        if (validateResult.status){
	            window.location.href=_mm.getUrlParam('redirect')||'./index.html';
	        }
	        // 测试代码 结束
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
	        //调用_mm.validate验证用户名,
	        if (!_mm.validate(formData.username,'require')) {
	            //用户名为空
	            result.msg='用户名不能为空';
	            return result;
	        }        
	        //调用_mm.validate验证密码
	        if (!_mm.validate(formData.password,'require')) {
	            //密码为空
	            result.msg='密码不能为空';
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

/***/ 164:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});