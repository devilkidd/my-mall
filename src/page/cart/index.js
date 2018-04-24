require('./index.css');
require('page/common/header/index.js');
var nav=require('page/common/nav/index.js');
var _mm= require('util/mm.js');
var _cart= require('service/cart-service.js');
var templateIndex= require('./index.string');

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