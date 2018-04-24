require('./index.css');
require('page/common/nav-simple/index.js');
var _mm=require('util/mm.js');
var _user=require('service/user-service.js');
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