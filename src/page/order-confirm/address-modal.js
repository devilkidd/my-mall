
var _mm= require('util/mm.js');
var _address= require('service/address-service.js');
var _cities= require('util/cities/index.js');
var templateAddressModal= require('./address-modal.string');

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