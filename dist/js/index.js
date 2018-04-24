webpackJsonp([3],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(114);


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

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	__webpack_require__(14);
	__webpack_require__(115);
	__webpack_require__(117);

	var navSide=__webpack_require__(121);
	var templateBanner=__webpack_require__(125);

	var _mm=__webpack_require__(10);

	$(function(){
	    //渲染banner的html
	    var bannerHtml=_mm.renderHtml(templateBanner);
	    $('.banner-con').html(bannerHtml);
	    //初始化banner
	    var $slider=$('.banner').unslider({
	        dots:true,
	    });
	    //前一张和后一张按钮的事件绑定
	    $('.banner-con .banner-arrow').click(function () {
	        var forword=$(this).hasClass('prev')?'prev':'next';
	        $slider.data('unslider')[forword]();
	    })
	})

/***/ }),

/***/ 115:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(118);
	__webpack_require__(120);

/***/ }),

/***/ 118:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 120:
/***/ (function(module, exports) {

	window.console&&console.warn("This version of Unslider is due to be deprecated by December 1. Please visit unslider.com for details on how to upgrade."),function(t,s){if(!t)return s;var i=function(){this.el=s,this.items=s,this.sizes=[],this.max=[0,0],this.current=0,this.interval=s,this.opts={speed:500,delay:3e3,complete:s,keys:!s,dots:s,fluid:s};var i=this;this.init=function(s,i){return this.el=s,this.ul=s.children("ul"),this.max=[s.outerWidth(),s.outerHeight()],this.items=this.ul.children("li").each(this.calculate),this.opts=t.extend(this.opts,i),this.setup(),this},this.calculate=function(s){var e=t(this),n=e.outerWidth(),h=e.outerHeight();i.sizes[s]=[n,h],n>i.max[0]&&(i.max[0]=n),h>i.max[1]&&(i.max[1]=h)},this.setup=function(){if(this.el.css({overflow:"hidden",width:i.max[0],height:this.items.first().outerHeight()}),this.ul.css({width:100*this.items.length+"%",position:"relative"}),this.items.css("width",100/this.items.length+"%"),this.opts.delay!==s&&(this.start(),this.el.hover(this.stop,this.start)),this.opts.keys&&t(document).keydown(this.keys),this.opts.dots&&this.dots(),this.opts.fluid){var e=function(){i.el.css("width",Math.min(Math.round(i.el.outerWidth()/i.el.parent().outerWidth()*100),100)+"%")};e(),t(window).resize(e)}this.opts.arrows&&this.el.parent().append('<p class="arrows"><span class="prev">芒鈥犅�</span><span class="next">芒鈥犫€�</span></p>').find(".arrows span").click(function(){t.isFunction(i[this.className])&&i[this.className]()}),t.event.swipe&&this.el.on("swipeleft",i.prev).on("swiperight",i.next)},this.move=function(s,e){this.items.eq(s).length||(s=0),0>s&&(s=this.items.length-1);var n=this.items.eq(s),h={height:n.outerHeight()},o=e?5:this.opts.speed;this.ul.is(":animated")||(i.el.find(".dot:eq("+s+")").addClass("active").siblings().removeClass("active"),this.el.animate(h,o)&&this.ul.animate(t.extend({left:"-"+s+"00%"},h),o,function(){i.current=s,t.isFunction(i.opts.complete)&&!e&&i.opts.complete(i.el)}))},this.start=function(){i.interval=setInterval(function(){i.move(i.current+1)},i.opts.delay)},this.stop=function(){return i.interval=clearInterval(i.interval),i},this.keys=function(s){var e=s.which,n={37:i.prev,39:i.next,27:i.stop};t.isFunction(n[e])&&n[e]()},this.next=function(){return i.stop().move(i.current+1)},this.prev=function(){return i.stop().move(i.current-1)},this.dots=function(){var s='<ol class="dots">';t.each(this.items,function(t){s+='<li class="dot'+(1>t?" active":"")+'">'+(t+1)+"</li>"}),s+="</ol>",this.el.addClass("has-dots").append(s).find(".dot").click(function(){i.move(t(this).index())})}};t.fn.unslider=function(s){var e=this.length;return this.each(function(n){var h=t(this),o=(new i).init(h,s);h.data("unslider"+(e>1?"-"+(n+1):""),o)})}}(window.jQuery,!1);

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

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"banner\"> <ul> <li> <a href=\"./list.html?categoryId=100021\" target=\"_blank\"> <img src=\"" + __webpack_require__(126) + "\" alt=\"\" class=\"banner-img\"> </a> </li> <li> <a href=\"./list.html?categoryId=100030\" target=\"_blank\"> <img src=\"" + __webpack_require__(127) + "\" alt=\"\" class=\"banner-img\"> </a> </li> <li> <a href=\"./list.html?categoryId=100016\" target=\"_blank\"> <img src=\"" + __webpack_require__(128) + "\" alt=\"\" class=\"banner-img\"> </a> </li> <li> <a href=\"./list.html?categoryId=100001\" target=\"_blank\"> <img src=\"" + __webpack_require__(129) + "\" alt=\"\" class=\"banner-img\"> </a> </li> <li> <a href=\"./list.html?categoryId=100021\" target=\"_blank\"> <img src=\"" + __webpack_require__(130) + "\" alt=\"\" class=\"banner-img\"> </a> </li> </ul> <div class=\"banner-arrow prev\"> <i class=\"fa fa-angle-left\"></i> </div> <div class=\"banner-arrow next\"> <i class=\"fa fa-angle-right\"></i> </div> </div>";

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner1.jpg";

/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner2.jpg";

/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner3.jpg";

/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner4.jpg";

/***/ }),

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner5.jpg";

/***/ })

});