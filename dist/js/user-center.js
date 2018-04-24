webpackJsonp([7],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(155);


/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	var _mm     = __webpack_require__(10);
	// 通用页面头部
	var header = {
	    init : function(){
	        this.bindEvent();
	        this.onLoad();
	    },
	    // 搜索后,关键字回填input
	    onLoad:function(){
	        //获取url中的keyword字段
	        var keyword=_mm.getUrlParam('keyword');
	        //如果keyword存在,回填
	        if(keyword){
	            $('#search-input').val(keyword);
	        }
	    },
	    //给button绑定事件
	    bindEvent : function(){
	        var _this=this;
	        //点击按钮,提交搜索
	        $('#search-btn').click(function(){
	            _this.searchSubmit();
	        });
	        //输入回车,提交搜索
	        $('#search-input').keyup(function(e){
	            //keycode等于回车键13,提交搜索
	            if(e.keyCode===13){
	                _this.searchSubmit();
	            }
	        })
	    },
	    //搜索的提交
	    searchSubmit:function(){
	        //取到input中的值赋给keyword,trim()去除空格
	        var keyword=$.trim( $('#search-input').val());
	        //keyword存在,跳转到搜索结果页
	        if(keyword){
	            window.location.href='./list.html?keyword='+keyword;
	        }
	        //keyword不存在,返回首页
	        else{
	            _mm.goHome();
	        }
	    }
	};

	header.init();

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(15);
	var _mm     = __webpack_require__(10);
	var _user   = __webpack_require__(17);
	var _cart   = __webpack_require__(18);
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

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

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

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

	

	'use strict';

	var _mm = __webpack_require__(10);

	var _cart = {
	    // 获取购物车数量
	    getCartCount : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 添加到购物车
	    addToCart : function(productInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/add.do'),
	            data    : productInfo,
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取购物车列表
	    getCartList : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/list.do'),
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 选择购物车商品
	    selectProduct : function(productId, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/select.do'),
	            data    : {
	                productId : productId
	            },
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 取消选择购物车商品
	    unselectProduct : function(productId, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/un_select.do'),
	            data    : {
	                productId : productId
	            },
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 选中全部商品
	    selectAllProduct : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/select_all.do'),
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 取消选中全部商品
	    unselectAllProduct : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/un_select_all.do'),
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 更新购物车商品数量
	    updateProduct : function(productInfo, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/update.do'),
	            data    : productInfo,
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 删除指定商品
	    deleteProduct : function(productIds, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/cart/delete_product.do'),
	            data    : {
	                productIds : productIds
	            },
	            success : resolve,
	            error   : reject
	        });
	    },
	}
	module.exports = _cart;

/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

	
	'use strict';
	__webpack_require__(122);
	var _mm = __webpack_require__(10);
	//引入hogan插件语法编写的index.string作为模版
	var templateIndex=__webpack_require__(124);
	// 侧边导航
	var navSide = {
	    //默认option
	    option:{
	        name:'',
	        navList:[
	            {name:'user-center',desc:'个人中心',href:'./user-center.html'},
	            {name:'order-list',desc:'我的订单',href:'./order-list.html'},
	            {name:'user-pass-update',desc:'修改密码',href:'./user-pass-update.html'},
	            {name:'about',desc:'关于我们  ',href:'./about.html'},
	        ],
	    },
	    init : function(option){
	        //合并选项,this是当前对象navSide
	        $.extend(this.option,option);
	        this.renderNav();
	    },
	    //渲染导航菜单
	    renderNav:function(){
	        //计算active数据
	        //iLength=this.option.navList.length 定义iLength,不用每次循环都读取option
	        for(var i=0,iLength=this.option.navList.length;i<iLength;i++){
	            if(this.option.navList[i].name===this.option.name){
	                this.option.navList[i].isActive=true;
	            }
	        };
	        //渲染list数据
	        var navHtml=_mm.renderHtml(templateIndex,{navList:this.option.navList});
	        //将渲染后的html放入页面
	        $('.nav-side').html(navHtml);
	    }
	};

	module.exports = navSide;

/***/ }),

/***/ 122:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 124:
/***/ (function(module, exports) {

	module.exports = "{{#navList}} {{#isActive}} <li class=\"nav-item active\"> {{/isActive}} {{^isActive}} </li><li class=\"nav-item\"> {{/isActive}} <a class=\"link\" href=\"{{href}}\">{{desc}}</a> </li> {{/navList}} ";

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(156);
	__webpack_require__(7);
	__webpack_require__(14);
	var _user=__webpack_require__(17);
	var templateIndex=__webpack_require__(158);
	var navSide=__webpack_require__(121);
	var _mm=__webpack_require__(10);

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

/***/ }),

/***/ 156:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 158:
/***/ (function(module, exports) {

	module.exports = "<div class=\"user-info\"> <div class=\"form-line\"> <span class=\"label\">用户名:</span> <span class=\"text\">{{username}}</span> </div> <div class=\"form-line\"> <span class=\"label\">电 话:</span> <span class=\"text\">{{phone}}</span> </div> <div class=\"form-line\"> <span class=\"label\">邮 箱:</span> <span class=\"text\">{{email}}</span> </div> <div class=\"form-line\"> <span class=\"label\">问 题:</span> <span class=\"text\">{{question}}</span> </div> <div class=\"form-line\"> <span class=\"label\">答 案:</span> <span class=\"text\">{{answer}}</span> </div> <a class=\"btn btn-submit\" href=\"./user-center-update.html\">编辑</a> </div>";

/***/ })

});