'use strict';
//var Hogan=require('hogan');旧版引用方式会报错
var Hogan=require('hogan.js');
var conf={
    serverHost:'',
};
var _mm={
    //网络请求
    request : function(param){
        //取到_mm对象存入_this
        var _this=this;
        $.ajax({
            type:param.method||'get',
            url:param.url||'',
            dataType:param.type||'json',
            data:param.data||'',
            success:function(res){
                //请求成功,返回值为0
                if(0===res.status){
                  typeof param.success==='function'&&param.success(res.data,res.msg);
                }
                //没有登录状态,返回值为10,需要强制登录
                else if(10===res.status){
                    //跳转到登录页
                    _this.doLogin();
                }
                //请求数据错误,返回值为1
                else if(1===res.status){
                    typeof param.error==='function'&&param.error(res.msg);
                }
            },
            error:function(err){
                typeof param.error==='function'&&param.error(err.statusText);
            }

        })
    },
    //获取服务器地址
    getServerUrl:function(path){
        //不直接返回path,而这样处理,是便于之后修改的需要
        return conf.serverHost+path;
    },
    //获取url参数
    getUrlParam:function(name){
        //获取url参数的规则:以name或&开头,以&或字符串末尾结束
        var reg=new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        //根据reg规则获取需要的参数集合
        //window.location.search获取url问号之后的字符串
        //substr()分割字符串
        //match()根据规则匹配字符串,返回数组
        var result=window.location.search.substr(1).match(reg);
        return result?decodeURIComponent(result[2]):null;
    },
    //渲染html模版
    renderHtml:function(htmlTemplate,data){
        //编译模版
        var template=Hogan.compile(htmlTemplate);
        //渲染编译后的模版
        var result=template.render(data);
        return result;
    },
    //成功提示
    successTips:function(msg){
        alert(msg||'操作成功');
    },
    //错误提示
    errorTips:function(msg){
        alert(msg||'哪里出错');
    },    
    //字段验证
    validate:function(value,type){
        //trim()去除value前后空格,返回字符串
        var value=$.trim(value);
        //非空验证
        if('require'===type){
            //value转换为boolean
            return !!value;
        }
        //手机号验证
        if('phone'===type){
            // /^1\d{10}$/以1开头10为数字的正则
            //test()验证value是否符合正则
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if('email'===type){
            return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }
    },
    //统一登录处理
    doLogin:function(){
        //跳转到redirect参数为当前url的登录页面
        //encodeURIComponent()对url进行编码
        window.location.href='./user-login.html?redirect='+encodeURIComponent(window.location.href);
    },
    //返回主页
    goHome:function(){
        window.location.href='./index.html';
    },
};

module.exports=_mm;