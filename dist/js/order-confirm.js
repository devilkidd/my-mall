webpackJsonp([5],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(139);


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

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(140);
	__webpack_require__(7);
	__webpack_require__(14);
	var _mm= __webpack_require__(10);
	var _order= __webpack_require__(142);
	var _address= __webpack_require__(143);
	var templateAddress= __webpack_require__(144);
	var templateProduct= __webpack_require__(145);
	var addressModal=__webpack_require__(146);

	var page = {
	    data : {
	        selectedAddressId:null,
	    },
	    init : function(){
	        this.onLoad();
	        this.bindEvent();
	    },
	    onLoad : function(){        
	        this.loadAddressList();
	        this.loadProductList();
	    },
	    //加载地址列表
	    loadAddressList:function(){
	        var _this=this;
	        $('.adress-con').html('<div class="loading"></div>');

	        //请求接口,获取地址列表
	        // 正式代码 开始
	        // _address.getAddressList(function(res){
	        //     _this.addressFilter(res);
	        //     //渲染地址列表
	        //     var addressListHtml=_mm.renderHtml(templateAddress,res);
	        //     //插入地址列表
	        //     $('.adress-con').html(addressListHtml);
	        // },function(errMsg){
	        //     $('.adress-con').html('<p class="err-tips">地址信息加载失败</p>');
	        // }) 
	        // 正式代码 结束
	        // 测试代码 开始
	        var res={
	            pageNum:1,
	            pageSize:10,
	            size:2,
	            startRow:1,
	            endRow:2,
	            total:2,
	            pages:1,
	            list:[
	                {
	                    id:1,
	                    userId:1,
	                    receiverName:'张杉',
	                    receiverPhone:'18611111111',
	                    receiverProvince:'上海',
	                    receiverCity:'上海市',
	                    receiverDistrict:'长宁区',
	                    receiverAddress:'天山路',
	                    receiverZip:100000,
	                },
	                {
	                    id:2,
	                    userId:2,
	                    receiverName:'李思',
	                    receiverPhone:'18622222222',
	                    receiverProvince:'北京',
	                    receiverCity:'北京市',
	                    receiverDistrict:'海淀区',
	                    receiverAddress:'中关村',
	                    receiverZip:100000,
	                },
	                {
	                    id:3,
	                    userId:3,
	                    receiverName:'王武',
	                    receiverPhone:18633333333,
	                    receiverProvince:'江苏',
	                    receiverCity:'南京市',
	                    receiverDistrict:'雨花台区',
	                    receiverAddress:'软件大道',
	                    receiverZip:100000,
	                }
	            ]
	        };
	        _this.addressFilter(res);
	        //渲染地址列表
	        var addressListHtml=_mm.renderHtml(templateAddress,res);
	        //插入地址列表
	        $('.adress-con').html(addressListHtml);
	        // 测试代码 结束 
	    },
	    //处理地址列表中的选中状态
	    addressFilter:function(data){
	        if(this.data.selectedAddressId){
	            var selectedAddressIdFlag=false;
	            for (var i=0,length=data.list.length;i<length;i++){
	                if(data.list[i].id===this.data.selectedAddressId){
	                    data.list[i].isActive=true;
	                    selectedAddressIdFlag=true;
	                }
	            }
	            //如果以前选中的地址不在列表里,将其删除
	            if(!selectedAddressIdFlag){
	                this.data.selectedAddressId=null;
	            }
	        }
	    },
	    //加载商品清单
	    loadProductList:function(){
	        var _this=this;
	        $('.product-con').html('<div class="loading"></div>');
	        //请求接口,获取商品信息
	        // 正式代码 开始
	        // _order.getProductList(function(res){
	        //     //渲染商品信息
	        //     var productListHtml=_mm.renderHtml(templateProduct,res);
	        //     //插入商品信息
	        //     $('.product-con').html(productListHtml);
	        // },function(errMsg){
	        //     $('.product-con').html('<p class="err-tips">商品信息加载失败</p>');
	        // })  
	        // 正式代码 结束
	        // 测试代码 开始
	        var res={
	            orderItemVoList:[
	                {
	                    orderNo:null,
	                    productId:26,
	                    productName:'iphone7',
	                    productImage:'../resource/detail02.jpeg',
	                    currentUnitPrice:6997,
	                    quantity:1,
	                    totalPrice:6997,
	                    creatTime:'',
	                },                
	                {
	                    orderNo:null,                    
	                    productId:27,
	                    quantity:10,
	                    productName:'魅族 魅蓝E2 4GB+64GB 全网通公开版',
	                    productImage:'../resource/detail02.jpeg',
	                    currentUnitPrice:1499,
	                    totalPrice:14990,
	                }
	            ],
	            productTotalPrice:21987
	        };
	        //渲染商品信息
	        var productListHtml=_mm.renderHtml(templateProduct,res);
	        //插入商品信息
	        $('.product-con').html(productListHtml);
	        // 测试代码 结束
	    },
	    bindEvent : function(){
	       var _this=this;
	       //选择地址绑定事件
	       $(document).on('click','.address-item',function(){
	        // 被选地址添加样式，移除未选择地址样式
	        $(this).addClass('active').siblings('.address-item').removeClass('active');
	        //取到被选地址的data-id，并保存
	        _this.data.selectedAddressId=$(this).data('id');
	       });
	       //订单提交绑定事件
	       $(document).on('click','.order-sumit',function(){
	        var shippingId=_this.data.selectedAddressId;
	        //已经选择收件地址
	        if(shippingId){
	            //创建订单
	            _order.createOrder({
	                shippingId:shippingId,
	            },function (res) {
	                window.location.href='./payment.html?orderNumer='+res.orderNo;
	            },function (errMsg) {
	                _mm.errorTips(errMsg);
	            })
	        }
	        //未选择收件地址
	        else{
	            _mm.errorTips("请选择收件地址")
	        }

	       });
	        //点击使用新地址的事件
	       $(document).on('click','.address-add',function(){
	        addressModal.show(
	            {
	                //判断是修改还是新建地址
	                isUpdate:false,
	                //操作成功后重新加载地址信息
	                onSuccess:function(){
	                    _this.loadAddressList();
	                }
	            }
	        )
	       });
	       //收件人地址编辑事件
	       $(document).on('click','.address-update',function(e){
	           //阻止冒泡
	           e.stopPropagation();
	           var shippingId=$(this).parents('.address-item').data('id');
	        //    正式代码 开始
	        //    _address.getAddress(shippingId,function(res){
	        //         addressModal.show({
	        //             isUpdate:true,
	        //             data:res,
	        //             onSuccess:function(){
	        //                 _this.loadAddressList();
	        //             }
	        //         })
	        //    },function(errMsg){
	        //         _mm.errorTips(errMsg);
	        //    });
	        //    正式代码 结束
	        // 测试代码 开始
	        var res={
	            id:1,
	            userId:1,
	            receiverName:'张杉',
	            receiverPhone:'18611111111',
	            receiverProvince:'上海',
	            receiverCity:'上海市',
	            receiverDistrict:'长宁区',
	            receiverAddress:'天山路',
	            receiverZip:100000,
	        };
	        addressModal.show({
	            isUpdate:true,
	            data:res,
	            onSuccess:function(){
	                _this.loadAddressList();
	            }
	        })
	        // 测试代码 结束
	       });
	       //收件人地址删除事件       
	       $(document).on('click','.address-delete',function(e){
	           //阻止冒泡
	           e.stopPropagation();           
	           var id=$(this).parents('.address-item').data('id');
	           if(window.alert('确定要删除地址吗?')){
	                _address.deleteAddress(id,function(res){
	                        _this.loadAddressList();
	                },function(errMsg){
	                    _mm.errorTips(errMsg)
	                })
	            }
	       });
	    },

	    
	};
	$(function(){
	    page.init();
	})


/***/ }),

/***/ 140:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

	

	'use strict';

	var _mm = __webpack_require__(10);

	var _order = {
	    // 获取商品列表
	    getProductList : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
	            success : resolve,
	            error   : reject
	        });
	    },
	    //提交订单
	    createOrder : function(orderInfo,resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/order/create.do'),
	            data:orderInfo,
	            success : resolve,
	            error   : reject
	        });
	    },
	}
	module.exports = _order;

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

	

	'use strict';

	var _mm = __webpack_require__(10);

	var _address = {
	    // 获取地址列别
	    getAddressList : function(resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/shipping/list.do'),
	            data    :{
	                pagesize:50
	            },
	            success : resolve,
	            error   : reject
	        });
	    },
	    //新建收件人地址
	    save: function(addressInfo,resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/shipping/add.do'),
	            data    :addressInfo,
	            success : resolve,
	            error   : reject
	        });
	    },
	    //更新收件人地址
	    update: function(addressInfo,resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/shipping/update.do'),
	            data    :addressInfo,
	            success : resolve,
	            error   : reject
	        });
	    },
	    //删除收件人地址
	    deleteAddress:function(shippingId,resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/shipping/del.do'),
	            data    :{
	                shippingId:shippingId
	            },
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取单条收件人信息
	    getAddress:function(shippingId,resolve, reject){
	        _mm.request({
	            url     : _mm.getServerUrl('/shipping/select.do'),
	            data    :{
	                shippingId:shippingId
	            },
	            success : resolve,
	            error   : reject
	        });
	    },
	}
	module.exports = _address;

/***/ }),

/***/ 144:
/***/ (function(module, exports) {

	module.exports = "{{#list}} {{#isActive}} <div class=\"address-item active\" data-id=\"{{id}}\"> {{/isActive}} {{^isActive}} <div class=\"address-item\" data-id=\"{{id}}\"> {{/isActive}} <div class=\"address-title\"> {{receiverCity}} {{receiverProvince}} ( {{receiverName}} 收 ) </div> <div class=\"address-detail\"> {{receiverAddress}} {{receiverPhone}} </div> <div class=\"address-opera\"> <span class=\"link address-update\">编辑</span> <span class=\"link address-delete\">删除</span> </div> </div> {{/list}} <div class=\"address-add\"> <div class=\"address-new\"> <i class=\"fa fa-plus\"></i> <div class=\"text\">使用新地址</div> </div> </div></div>";

/***/ }),

/***/ 145:
/***/ (function(module, exports) {

	module.exports = "<table class=\"product-table\"> <tr> <th class=\"cell-img\">&nbsp;</th> <th class=\"cell-info\">商品描述</th> <th class=\"cell-price\">价格</th> <th class=\"cell-count\">数量</th> <th class=\"cell-total\">小计</th> </tr> {{#orderItemVoList}} <tr> <td class=\"cell-img\"> <a href=\"./detail.html?productId={{productId}}\" target=\"_blank\"> <img src=\"{{imageHost}}{{productImage}}\" alt=\"{{productName}}\" class=\"p-img\"> </a> </td> <td class=\"cell-info\"> <a href=\"./detail.html?productId={{productId}}\" target=\"_blank\">{{productName}}</a> </td> <td class=\"cell-price\">￥{{currentUnitPrice}}</td> <td class=\"cell-count\">{{quantity}}</td> <td class=\"cell-total\">￥{{totalPrice}}</td> </tr> {{/orderItemVoList}} </table> <div class=\"submit-con\"> <span>订单总价:</span> <span class=\"submit-total\">￥{{productTotalPrice}}</span> <span class=\"btn order-sumit\">提交订单</span> </div>";

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

	
	var _mm= __webpack_require__(10);
	var _address= __webpack_require__(143);
	var _cities= __webpack_require__(147);
	var templateAddressModal= __webpack_require__(148);

	var addressModal = {
	    show:function (option) {
	        this.option=option;
	        this.option.data=option.data||{};
	        this.$modalWrap=$('.modal-wrap');
	        //渲染页面
	        this.loadModal();
	        //绑定事件
	        this.bindEvent();
	    },
	    loadModal:function(){
	        var addressModalHtml=_mm.renderHtml(templateAddressModal,{
	            isUpdate:this.option.isUpdate,
	            data:this.option.data,
	        });
	        this.$modalWrap.html(addressModalHtml);
	        //加载省份
	        this.loadProvince();
	        //加载城市
	        this.loadCities();
	    },
	    //加载省份方法
	    loadProvince:function(){
	        var provinces=_cities.getProvinces()||[],
	            $provinceSelect=this.$modalWrap.find('#receiver-province');
	        $provinceSelect.html(this.getSelectOption(provinces)); 
	        //如果是更新地址,并且有省份信息,回填表单 
	        if (this.option.isUpdate&&this.option.data.receiverProvince) {
	            $provinceSelect.val(this.option.data.receiverProvince);
	            this.loadCities(this.option.data.receiverProvince);
	        }
	    },
	    //加载城市方法
	    loadCities:function(provinceName){
	        var cities=_cities.getCities(provinceName)||[];
	        $citySelect=this.$modalWrap.find('#receiver-city');
	        $citySelect.html(this.getSelectOption(cities));
	        //如果是更新地址,并且有城市信息,回填表单 
	        if (this.option.isUpdate&&this.option.data.receiverCity) {
	            $citySelect.val(this.option.data.receiverCity);
	        }
	    },
	    //获取select框的option,输入array,输出html
	    getSelectOption:function(optionArray){
	        var html='<option value="">请选择</option>';
	        for(var i=0,length=optionArray.length;i<length;i++){
	            html+='<option value="'+optionArray[i]+'">'+optionArray[i]+'</option>';
	        }
	        return html;
	    },    
	    bindEvent:function(){
	        var _this=this;
	        //阻止点击信息表单时的事件冒泡,而导致触发hide()方法;
	        this.$modalWrap.find('.modal-container').click(
	            function(e){
	                e.stopPropagation();
	            }
	        );
	        //点击x号或者遮罩区,关闭弹窗
	        this.$modalWrap.find('.close').click(
	            function(){
	                _this.hide()
	            }
	        );
	        //省市二级联动事件
	        this.$modalWrap.find('#receiver-province').change(
	            function(){
	                var selectedProvince=$(this).val();
	                _this.loadCities(selectedProvince);
	            }
	        );
	        //提交收货地址事件
	        this.$modalWrap.find('#address-btn').click(
	            function(){
	                var receiverInfo=_this.getReceiverInfo(),
	                isUpdate=_this.option.isUpdate;
	                //添加新地址,且用户信息验证通过
	                if(!isUpdate&&receiverInfo.status){
	                    _address.save(receiverInfo.data,function(res){
	                        _mm.successTips('地址添加成功');
	                        _this.hide();
	                        typeof _this.option.onSuccess==='function'
	                        && _this.option.onSuccess(res);
	                    },function(errMsg){
	                        _mm.errorTips(errMsg)
	                    })
	                }
	                //更新收件人地址,并且验证通过
	                else if(isUpdate&&receiverInfo.status){
	                    _address.update(receiverInfo.data,function(res){
	                        _mm.successTips('地址修改成功');
	                        _this.hide();
	                        typeof _this.option.onSuccess==='function'
	                        && _this.option.onSuccess(res);
	                    },function(errMsg){
	                        _mm.errorTips(errMsg)
	                    })
	                }
	                //验证不通过
	                else{
	                    _mm.errorTips(receiverInfo.errMsg||'哪里不对了')
	                }
	            }
	        );
	        
	        
	    },
	    //获取表单里的收件人信息,并做表单验证
	    getReceiverInfo:function(){
	        //receiverInfo存储表单信息
	        var receiverInfo={},
	        result={
	            status:false
	        };
	        //得到收件人信息,逐条存入
	        receiverInfo.receiverName=$.trim(this.$modalWrap.find('#receiver-name').val());
	        receiverInfo.receiverProvince=this.$modalWrap.find('#receiver-province').val();
	        receiverInfo.receiverCity=this.$modalWrap.find('#receiver-city').val();
	        receiverInfo.receiverAddress=$.trim(this.$modalWrap.find('#receiver-address').val());
	        receiverInfo.receiverPhone=$.trim(this.$modalWrap.find('#receiver-phone').val());        
	        receiverInfo.receiverZip=$.trim(this.$modalWrap.find('#receiver-zip').val());

	        if(this.option.isUpdate){ 
	            receiverInfo.id=this.$modalWrap.find('#receiver-id').val();
	        }
	        //验证收货人信息
	        if (!receiverInfo.receiverName) {
	            result.errMsg='请输入收件人姓名';
	        } else if(!receiverInfo.receiverProvince){
	            result.errMsg='请选择收件人所在省份';
	        }else if(!receiverInfo.receiverCity){
	            result.errMsg='请选择收件人所在城市';
	        }else if(!receiverInfo.receiverAddress){
	            result.errMsg='请输入收件人详细地址';
	        }else if(!receiverInfo.receiverPhone){
	            result.errMsg='请输入收件人电话';
	        }
	        //通过所有验证
	        else{
	            result.status=true;
	            result.data=receiverInfo;
	        }
	        return result;
	    },
	    hide:function(){
	        this.$modalWrap.empty();
	    },
	};
	module.exports=addressModal;

/***/ }),

/***/ 147:
/***/ (function(module, exports) {

	var _cities={
	    cityInfo:{
	        '北京':['北京'],
	        '上海':['上海'],
	        '江苏':['南京','苏州'],
	    },
	    //获取所有省份
	    getProvinces:function(){
	        //定义provinces存放省份
	        var provinces=[];
	        //for in 遍历对象的key,并存入provinces
	        for(var item in this.cityInfo){
	            provinces.push(item);
	        }
	        return provinces;
	    },
	    //获取某省份的所有城市
	    getCities:function(porvinceName){
	        //获取城市,并做容错处理
	        return this.cityInfo[porvinceName]||[];
	    }
	}
	module.exports=_cities;

/***/ }),

/***/ 148:
/***/ (function(module, exports) {

	module.exports = "<div class=\"modal close\"> <div class=\"modal-container\"> <div class=\"modal-header\"> {{#isUpdate}} <h1 class=\"modal-title\">更新地址</h1> {{/isUpdate}} {{^isUpdate}} <h1 class=\"modal-title\">使用新地址</h1> {{/isUpdate}} <i class=\"fa fa-close close\"></i> </div> <div class=\"modal-body\"> <div class=\"form\"> <div class=\"form-line\"> <label for=\"receiver-name\" class=\"label\"> <span class=\"required\">*</span>收件人姓名:</label> <input type=\"text\" class=\"formitem\" id=\"receiver-name\" placeholder=\"请输入收件人姓名\" value=\"{{data.receiverName}}\"> </div> <div class=\"form-line\"> <label for=\"receiver-province\" class=\"label\"> <span class=\"required\">*</span>所在城市:</label> <select name=\"\" id=\"receiver-province\" class=\"form-item\"> <option value=\"\">请选择</option> </select> <select name=\"\" id=\"receiver-city\" class=\"form-item\"> <option value=\"\">请选择</option> </select> </div> <div class=\"form-line\"> <label for=\"receiver-address\" class=\"label\"> <span class=\"required\">*</span>详细地址:</label> <input type=\"text\" class=\"form-item\" id=\"receiver-address\" placeholder=\"请输入详细地址\" value=\"{{data.receiverAddress}}\"> </div> <div class=\"form-line\"> <label for=\"receiver-phone\" class=\"label\"> <span class=\"required\">*</span>收件人手机:</label> <input type=\"text\" class=\"form-item\" id=\"receiver-phone\" placeholder=\"请输入收件人手机\" value=\"{{data.receiverPhone}}\"> </div> <div class=\"form-line\"> <label for=\"receiver-zip\" class=\"label\">邮政编码:</label> <input type=\"text\" class=\"form-item\" id=\"receiver-zip\" placeholder=\"请输入邮政编码\" value=\"{{data.receiverZip}}\"> </div> <div class=\"form-line\"> <input type=\"hidden\" id=\"receiver-id\" value=\"{{data.id}}\"> <a href=\"\" class=\"btn address-btn\">保存</a> </div> </div> </div> </div> </div>";

/***/ })

});