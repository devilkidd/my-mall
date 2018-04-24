webpackJsonp([6],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(149);


/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(150)
	__webpack_require__(152);
	var _mm=__webpack_require__(10);
	//根据type参数类型,显示不同的提示
	$(function(){
	    //获取url中的type参数,type不存在默认值为default
	    var type=_mm.getUrlParam('type')||'default',
	    //根据type值匹配相应类
	    $element=$('.'+type+'-success');
	    //显示对应的提示
	    $element.show();    
	})

/***/ }),

/***/ 150:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(153);

/***/ }),

/***/ 153:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});