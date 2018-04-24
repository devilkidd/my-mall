require('./index.css')
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
        //验证username
        $('#username').blur(function () {
            var username=$.trim($(this).val());
            //判断username是否存在,用户名为空不做验证
            if(!username) return;
             //异步验证用户名是否存在
            // 正式代码 开始
            // _user.checkUsername(
            //     username,
            //     function (res) {
            //         formError.hide();
            //     },
            //     function (errMsg) {
            //         formError.show(errMsg);
            //     }
            // );
            // 正式代码 结束
        })
        //点击注册按钮,提交表单
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
            passwordConfirm:$.trim($('#password-confirm').val()),
            phone:$.trim($('#phone').val()),
            email:$.trim($('#email').val()),
            question:$.trim($('#question').val()),
            answer:$.trim($('#answer').val()),
        };
        //validateResult表单验证结果
        //this在对象内使用,指向当前对象
        validateResult=this.formValidate(formData);
        // 验证成功,提交
        if (validateResult.status) {
            // 正式代码 开始
            // _user.register(formData,function(res){
            //     window.location.href='./result.html?type=register';//参数type控制result页面的显示内容
            // },function (errMsg) {
            //     formError.show(errMsg);
            // })
            // 正式代码 结束
            // 测试代码 开始
            window.location.href='./result.html?type=register';
            // 测试代码 结束
        }
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
        //验证用户名是否为空
        if (!_mm.validate(formData.username,'require')) {
            result.msg='用户名不能为空';
            return result;
        }        
        //验证密码是否为空
        if (!_mm.validate(formData.password,'require')) {
            result.msg='密码不能为空';
            return result;
        }       
        //验证密码长度是否小于6位
        if (formData.password.length<6) {
            result.msg='密码长度不能小于6位';
            return result;
        }
        //验证两次输入密码是否一致
        if (formData.password!==formData.passwordConfirm) {
            result.msg='两次输入密码不一致';
            return result;
        }        
        //验证手机
        if (!_mm.validate(formData.phone,'phone')) {
            result.msg='手机号输入不正确';
            return result;
        }        
        //验证邮箱
        if (!_mm.validate(formData.email,'email')) {
            result.msg='邮箱输入不正确';
            return result;
        }       
         //验证密码提示问题
        if (!_mm.validate(formData.question,'require')) {
            result.msg='提示问题不能为空';
            return result;
        }        
        //验证密码提示问题答案
        if (!_mm.validate(formData.answer,'require')) {
            result.msg='提示为题答案不能为空';
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