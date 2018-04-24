require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm= require('util/mm.js');
var _order= require('service/order-service.js');
var _address= require('service/address-service.js');
var templateAddress= require('./address-list.string');
var templateProduct= require('./product-list.string');
var addressModal=require('./address-modal.js');

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
