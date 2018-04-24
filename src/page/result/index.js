require('./index.css')
require('page/common/nav-simple/index.js');
var _mm=require('util/mm.js');
//根据type参数类型,显示不同的提示
$(function(){
    //获取url中的type参数,type不存在默认值为default
    var type=_mm.getUrlParam('type')||'default',
    //根据type值匹配相应类
    $element=$('.'+type+'-success');
    //显示对应的提示
    $element.show();    
})