(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-API-download-file-download-file"],{"0caa":function(n,t,i){"use strict";var e=function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("v-uni-view",[i("page-head",{attrs:{title:n.title}}),i("v-uni-view",{staticClass:"uni-padding-wrap uni-common-mt"},[n.imageSrc?i("v-uni-image",{staticClass:"img",attrs:{src:n.imageSrc,mode:"center"}}):[i("v-uni-view",{staticClass:"uni-hello-text"},[n._v("点击按钮下载服务端示例图片")]),i("v-uni-view",{staticClass:"uni-btn-v"},[i("v-uni-button",{attrs:{type:"primary"},on:{click:function(t){t=n.$handleEvent(t),n.downloadImage(t)}}},[n._v("下载")])],1)]],2)],1)},a=[];i.d(t,"a",function(){return e}),i.d(t,"b",function(){return a})},"304a":function(n,t,i){"use strict";i.r(t);var e=i("0caa"),a=i("6e51");for(var o in a)"default"!==o&&function(n){i.d(t,n,function(){return a[n]})}(o);i("ca5c");var u=i("2877"),c=Object(u["a"])(a["default"],e["a"],e["b"],!1,null,"9e750d04",null);t["default"]=c.exports},"6e51":function(n,t,i){"use strict";i.r(t);var e=i("c986"),a=i.n(e);for(var o in e)"default"!==o&&function(n){i.d(t,n,function(){return e[n]})}(o);t["default"]=a.a},"9f90":function(n,t,i){t=n.exports=i("2350")(!1),t.push([n.i,".img[data-v-9e750d04]{width:%?500?%;height:%?500?%;margin:0 %?95?%}",""])},bf14:function(n,t,i){var e=i("9f90");"string"===typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);var a=i("4f06").default;a("357e580f",e,!0,{sourceMap:!1,shadowMode:!1})},c986:function(n,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{title:"downloadFile",imageSrc:""}},onUnload:function(){this.imageSrc=""},methods:{downloadImage:function(){uni.showLoading({title:"下载中"});var n=this;uni.downloadFile({url:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",success:function(t){console.log("downloadFile success, res is",t),n.imageSrc=t.tempFilePath,uni.hideLoading()},fail:function(n){console.log("downloadFile fail, err is:",n)}})}}};t.default=e},ca5c:function(n,t,i){"use strict";var e=i("bf14"),a=i.n(e);a.a}}]);