webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(7);
	var nav=__webpack_require__(14);
	var _mm= __webpack_require__(10);
	var _cart= __webpack_require__(18);
	var templateIndex= __webpack_require__(19);

	var page = {
	    data : {
	    },
	    init : function(){
	        this.onLoad();
	        this.bindEvent();
	    },
	    onLoad : function(){        
	        this.loadCart();
	    },
	    bindEvent : function(){
	        var _this = this; 
	        //商品的选择 / 取消选择
	        $(document).on('click','cart-select',function(){
	            var $this=$(this),
	            productId=$this.parents('.cart-table').data('product-id');
	            //选中
	            if($this.is(':checked')){
	                _cart.selectProduct(productId,function(){
	                    _this.renderCart(res);
	                },function(){
	                    _this.showCartError();
	                });
	            }
	            //取消选中
	            else{
	                _cart.unselectProduct(productId,function(){
	                    _this.renderCart(res);
	                },function(){
	                    _this.showCartError();
	                });
	            }
	        });
	         //商品的全选 / 取消全选
	        $(document).on('click','cart-select-all',function(){
	            var $this=$(this);
	            //全选
	            if($this.is(':checked')){
	                _cart.selectAllProduct(function(){
	                    _this.renderCart(res);
	                },function(){
	                    _this.showCartError();
	                });
	            }
	            //取消全选
	            else{
	                _cart.unselectAllProduct(function(){
	                    _this.renderCart(res);
	                },function(){
	                    _this.showCartError();
	                });
	            }
	        });
	        //商品数量变化
	        $(document).on('click','count-btn',function(){
	            var $this=this,
	            //取到数量input,相比直接用类选择,代码更健壮,避免冲突
	            $pCount=$this.siblings('.count-input'),
	            //parseInt() 函数可解析一个字符串，并返回一个整数
	            currCount=parseInt($pCount.val());
	            //判断按钮是+或-,也可以用html()判断
	            type=$this.hasClass('plus')?'plus':'minus',
	            //商品id,请求接口用
	            productId=$this.parents('.cart-table').data('product-id'),
	            minCount=1,
	            maxCount=parseInt($pCount.data('max')),
	            //修改后的数量.请求接口用
	            newCount=0;
	            //增加商品数量
	            if(type==='plus'){
	                if(currCount>=maxCount){
	                    _mm.errTips('购买数量已经达到上限');
	                    return;
	                }
	                newCount=currCount+1;
	            }
	            //减少商品数量
	            else if(type==='minus'){
	                if(currCount<=minCount){
	                    return;
	                }
	                newCount=currCount-1;
	            }
	            //更新购物车商品数量
	            _cart.updateProduct({
	                productId:productId,
	                newCount:newCount,
	            },function(res){
	                _this.renderCart(res)
	            },function(errMsg){
	                _this.showCartError();
	            });

	        });
	        //删除单个商品
	        $(document).on('click','.cart-delete',function(){
	            if(window.alert('确定删除该商品吗?')){
	            var productId=$(this).parents('.cart-table').data('product-id');
	            _this.deleteCartProduct(producetId);
	            }
	        });
	        //删除选中的商品
	        $(document).on('click','.delete-selected',function(){
	            if(window.alert('确定删除选中的商品?')){
	                //arrProductIds存放选中的项的productId
	                var arrProductIds=[],
	                $selectedItem=$('.cart-select:checked');
	                //productId存入数组
	                for(var i=0,iLength=$selectedItem.length;i<iLength;i++){
	                    //$($selectedItem)包装成jquery对象
	                    arrProductIds.push($($selectedItem).parents('.cart-table').data('product-id'));
	                }
	                if(arrProductIds.length){
	                    //join(',')用逗号分隔数组中的元素
	                    _this.deleteCartProduct(arrProductIds.join(','));
	                }else{
	                    _mm.errTips('请选择您要删除的商品')
	                }
	            }
	        });
	        //提交购物车
	        $(document).on('click','.btn-submit',function(){
	            //总价大于0,提交
	            // 正式代码 开始
	            // if (_this.data.cartInfo&&_this.data.cartInfo.cartTotalPrice>0) {
	            //     window.location.href='./order-confirm.html'
	            // }else{
	            //     _mm.errTips('请选择需要购买的商品');
	            // }
	            //正式代码 结束
	            // 测试代码 开始
	            window.location.href='./order-confirm.html'
	            // 测试代码 结束
	        });
	    },
	    // 加载detail数据
	    loadCart : function(){
	       var _this=this;
	       //请求接口加载购物车列表
	       //正式代码 开始
	    //    _cart.getCartList(function(res){
	    //        //执行渲染购物车列表的函数
	        //    _this.renderCart(res);
	    //    },function(errMsg){
	    //        _this.showCartError();
	    //    })
	       //正式代码 结束
	       //测试代码 开始
	       var res={
	            cartProductVoList:[
	                {
	                    id:26,
	                    userId:1,
	                    productId:26,
	                    quantity:1,
	                    productName:'Apple iPhone 7 Plus (A1661) 128G手机',
	                    productSubtitle:'iPhone 7，现更以lv色呈现。',
	                    productMainImage:'../resource/detail01.jpeg',
	                    productPrice:6997,
	                    productStatus:1,
	                    productStock:99,
	                    productChecked:1,
	                    limitQuantity:'LIMIT_NUM_SUCCESS',
	                },                
	                {
	                    id:26,
	                    userId:1,
	                    productId:27,
	                    quantity:2,
	                    productName:'魅族 魅蓝E2 4GB+64GB 全网通公开版',
	                    productSubtitle:'P20芯片！5.5英寸！800+1300W像素！3400mAh大电池！',
	                    productMainImage:'../resource/detail02.jpeg',
	                    productPrice:1499,
	                    productStatus:1,
	                    productStock:99,
	                    productChecked:1,
	                    limitQuantity:'LIMIT_NUM_SUCCESS',
	                }
	            ]
	       };
	       _this.renderCart(res);
	       //测试代码 结束
	    },
	    renderCart:function(data){
	        //判断购物车是否为空
	        this.filter(data);
	        //缓存购物车数据
	        this.data.carInfo=data;
	        // 生成html
	        var cartHtml=_mm.renderHtml(templateIndex,data);
	        $('.page-wrap').html(cartHtml);
	        //更新导航栏购物车数量显示
	        nav.loadCartCount();
	    },

	    filter:function(data){
	        //判断购物车是否为空,接口中已定义的方法
	        data.notEmpty=!!data.cartProductVoList.length;
	    },
	    showCartError:function(){
	        $('.page-wrap').html('<p class="err-tips">哪里出错了,请重新操作!</p>');
	    },
	    //删除指定商品,支持批量,productId用逗号分隔
	    deleteCartProduct:function(productIds){
	        var _this=this;
	        _cart.deleteProduct(productIds,function(res){
	            _this.renderCart(res);
	        },function(errMsg){
	            _this.showCartError();
	        });
	    },
	};
	$(function(){
	    page.init();
	})

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
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
/* 8 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
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
/* 15 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */,
/* 17 */
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
/* 18 */
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
/* 19 */
/***/ (function(module, exports) {

	module.exports = "{{#notEmpty}} <div class=\"cart-header\"> <table class=\"cart-table\"> <tr> <th class=\"cart-cell cell-check\"> <label class=\"cart-label\"> {{#allChecked}} <input type=\"checkbox\" class=\"cart-select-all\" checked=\"checked\"/> {{/allChecked}} {{^allChecked}} <input type=\"checkbox\" class=\"cart-select-all\"/> {{/allChecked}} <span>全选</span> </label> </th> <th class=\"cart-cell\"></th> <th class=\"cart-cell cell-info\">商品信息</th> <th class=\"cart-cell cell-price\">单价</th> <th class=\"cart-cell cell-count\">数量</th> <th class=\"cart-cell cell-total\">合计</th> <th class=\"cart-cell cell-opera\">操作</th> </tr> </table> </div> <div class=\"cart-list\"> {{#cartProductVoList}} <table class=\"cart-table\" data-product-id=\"{{productId}}\"> <tr> <td class=\"cart-cell cell-check\"> <label class=\"cart-label\"> {{#productChecked}} <input type=\"checkbox\" class=\"cart-select\" checked=\"checked\"/> {{/productChecked}} {{^productChecked}} <input type=\"checkbox\" class=\"cart-select\"/> {{/productChecked}} </label> </td> <td class=\"cart-cell cell-img\"> <a class=\"link\" href=\"./detail.html?productId={{productId}}\"> <img class=\"p-img\" src=\"{{imageHost}}{{productMainImage}}\" alt=\"{{productName}}\"/> </a> </td> <td class=\"cart-cell cell-info\"> <a class=\"link\" href=\"./detail.html?productId={{productId}}\">{{productName}}</a> </td> <td class=\"cart-cell cell-price\">￥{{productPrice}}</td> <td class=\"cart-cell cell-count\"> <span class=\"count-btn minus\">-</span> <input class=\"count-input\" value=\"{{quantity}}\" data-max=\"{{productStock}}\"/> <span class=\"count-btn plus\">+</span> </td> <td class=\"cart-cell cell-total\">￥{{productTotalPrice}}</td> <td class=\"cart-cell cell-opera\"> <span class=\"link cart-delete\">删除</span> </td> </tr> </table> {{/cartProductVoList}} </div> <div class=\"cart-footer\"> <div class=\"select-con\"> <label> {{#allChecked}} <input type=\"checkbox\" class=\"cart-select-all\" checked=\"checked\"/> {{/allChecked}} {{^allChecked}} <input type=\"checkbox\" class=\"cart-select-all\"/> {{/allChecked}} <span>全选</span> </label> </div> <div class=\"delete-con\"> <span class=\"link delete-selected\"> <i class=\"fa fa-trash-o\"></i> <span>删除选中</span> </span> </div> <div class=\"submit-con\"> <span>总价：</span> <span class=\"submit-total\">￥{{cartTotalPrice}}</span> <span class=\"btn btn-submit\">去结算</span> </div> </div> {{/notEmpty}} {{^notEmpty}} <p class=\"err-tip\"> <span>您的购物车空空如也，</span> <a href=\"./index.html\">立即去购物</a> </p> {{/notEmpty}}";

/***/ })
]);