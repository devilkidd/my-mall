webpackJsonp([4],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(131);


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

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

	

	'use strict';

	var _mm = __webpack_require__(10);

	var _product = {
	    // 获取商品列表
	    getProductList : function(listParam, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/product/list.do'),
	            data    : listParam,
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取商品详细信息
	    getProductDetail : function(productId, resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/product/detail.do'),
	            data    : {
	                productId : productId
	            },
	            success : resolve,
	            error   : reject
	        });
	    }
	}
	module.exports = _product;

/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(132);
	__webpack_require__(14);
	__webpack_require__(7);
	var _mm             = __webpack_require__(10);
	var _product        = __webpack_require__(112);
	var templateIndex   = __webpack_require__(134);
	var Pagination=__webpack_require__(135);

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

/***/ }),

/***/ 132:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 134:
/***/ (function(module, exports) {

	module.exports = "{{#list}} <li class=\"p-item\"> <div class=\"p-img-con\"> <a href=\"./detail.html?productId={{id}}\" target=\"_blank\" class=\"link\"> <img class=\"p-img\" src=\"{{imageHost}}{{mainImage}}\" alt=\"{{name}}\"> </a> </div> <div class=\"p-price-con\"> <span class=\"p-price\">￥{{price}}</span> </div> <div class=\"p-name-con\"> <a href=\"./detail.html?productId={{id}}\" class=\"p-name\" target=\"_blank\">{{name}}</a> </div> </li> {{/list}} {{^list}} <p class=\"err-tips\">很抱歉,找不到你要的商品</p> {{/list}}";

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(136);
	var _mm                 = __webpack_require__(10);
	var templatePagination  = __webpack_require__(138);

	var Pagination = function(){
	    var _this = this;
	    this.defaultOption = {
	        container       : null,
	        pageNum         : 1,
	        pageRange       : 3,
	        onSelectPage    : null
	    };
	    // 事件的处理
	    $(document).on('click', '.pg-item', function(){
	        var $this = $(this);
	        // 对于active和disabled按钮点击，不做处理
	        if($this.hasClass('active') || $this.hasClass('disabled')){
	            return;
	        }
	        typeof _this.option.onSelectPage === 'function' 
	            ? _this.option.onSelectPage($this.data('value')) : null;
	    });
	};
	// 渲染分页组件
	Pagination.prototype.render = function(userOption){
	    // 合并选项
	    this.option = $.extend({}, this.defaultOption, userOption);
	    // 判断容器是否为合法的jquery对象
	    if(!(this.option.container instanceof jQuery)){
	        return;
	    }
	    // 判断是否只有1页
	    if(this.option.pages <= 0){
	        return;
	    }
	    // 渲染分页内容
	    this.option.container.html(this.getPaginationHtml());
	};
	// 获取分页的html, |上一页| 2 3 4 =5= 6 7 8|下一页|  5/9
	Pagination.prototype.getPaginationHtml = function(){
	    var html        = '',
	        option      = this.option,
	        pageArray   = [],
	        start       = option.pageNum - option.pageRange > 0 
	            ? option.pageNum - option.pageRange : 1,
	        end         = option.pageNum + option.pageRange < option.pages
	            ? option.pageNum + option.pageRange : option.pages;
	    // 上一页按钮的数据
	    pageArray.push({
	        name : '上一页',
	        value : this.option.prePage,
	        disabled : !this.option.hasPreviousPage
	    });
	    // 数字按钮的处理
	    for(var i = start; i <= end; i++){
	        pageArray.push({
	            name : i,
	            value : i,
	            active : (i === option.pageNum)
	        });
	    };
	    // 下一页按钮的数据
	    pageArray.push({
	        name : '下一页',
	        value : this.option.nextPage,
	        disabled : !this.option.hasNextPage
	    });
	    html = _mm.renderHtml(templatePagination, {
	        pageArray   : pageArray,
	        pageNum     : option.pageNum,
	        pages       : option.pages
	    });
	    return html;
	};

	module.exports = Pagination;

/***/ }),

/***/ 136:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 138:
/***/ (function(module, exports) {

	module.exports = "<div class=\"pg-content\"> {{#pageArray}} {{#disabled}} <span class=\"pg-item disabled\" data-value=\"{{value}}\">{{name}}</span> {{/disabled}} {{^disabled}} {{#active}} <span class=\"pg-item active\" data-value=\"{{value}}\">{{name}}</span> {{/active}} {{^active}} <span class=\"pg-item\" data-value=\"{{value}}\">{{name}}</span> {{/active}} {{/disabled}} {{/pageArray}} <span class=\"pg-total\">{{pageNum}} / {{pages}}</span> </div>";

/***/ })

});