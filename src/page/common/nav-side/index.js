
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
//引入hogan插件语法编写的index.string作为模版
var templateIndex=require('./index.string');
// 侧边导航
var navSide = {
    //默认option
    option:{
        name:'',
        navList:[
            {name:'user-center',desc:'个人中心',href:'./user-center.html'},
            {name:'order-list',desc:'我的订单',href:'./order-list.html'},
            {name:'user-pass-update',desc:'修改密码',href:'./user-pass-update.html'},
            {name:'about',desc:'关于我们  ',href:'./about.html'},
        ],
    },
    init : function(option){
        //合并选项,this是当前对象navSide
        $.extend(this.option,option);
        this.renderNav();
    },
    //渲染导航菜单
    renderNav:function(){
        //计算active数据
        //iLength=this.option.navList.length 定义iLength,不用每次循环都读取option
        for(var i=0,iLength=this.option.navList.length;i<iLength;i++){
            if(this.option.navList[i].name===this.option.name){
                this.option.navList[i].isActive=true;
            }
        };
        //渲染list数据
        var navHtml=_mm.renderHtml(templateIndex,{navList:this.option.navList});
        //将渲染后的html放入页面
        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;