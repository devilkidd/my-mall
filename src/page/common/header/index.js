require('./index.css');
var _mm     = require('util/mm.js');
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