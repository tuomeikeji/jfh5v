(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-API-file-file"],{"0a1f":function(e,t,n){"use strict";var a=n("38ee"),i=n.n(a);i.a},"10cf":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{title:"saveFile",tempFilePath:"",savedFilePath:""}},onLoad:function(){this.savedFilePath=uni.getStorageSync("savedFilePath")},methods:{chooseImage:function(){var e=this;uni.chooseImage({count:1,success:function(t){e.tempFilePath=t.tempFilePaths[0]}})},saveFile:function(){var e=this;this.tempFilePath.length>0?uni.saveFile({tempFilePath:this.tempFilePath,success:function(t){e.savedFilePath=t.savedFilePath,uni.setStorageSync("savedFilePath",t.savedFilePath),uni.showModal({title:"保存成功",content:"下次进入页面时，此文件仍可用",showCancel:!1})},fail:function(e){uni.showModal({title:"保存失败",content:"失败原因: "+JSON.stringify(e),showCancel:!1})}}):uni.showModal({content:"请选择文件",showCancel:!1})},clear:function(){uni.setStorageSync("savedFilePath",""),this.tempFilePath="",this.savedFilePath=""},openDocument:function(){uni.downloadFile({url:"https://raw.githubusercontent.com/mozilla/pdf.js/master/examples/learning/helloworld.pdf",success:function(e){uni.openDocument({filePath:e.tempFilePath,success:function(){console.log("打开文档成功")}})}})}}};t.default=a},"38ee":function(e,t,n){var a=n("7ff5");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("50c48f34",a,!0,{sourceMap:!1,shadowMode:!1})},"391b":function(e,t,n){"use strict";n.r(t);var a=n("10cf"),i=n.n(a);for(var s in a)"default"!==s&&function(e){n.d(t,e,function(){return a[e]})}(s);t["default"]=i.a},"7ff5":function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,".image[data-v-9cd0e40a]{width:100%;height:%?360?%}.btn-savefile[data-v-9cd0e40a]{background-color:#007aff;color:#fff}",""])},b6bc:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",[n("page-head",{attrs:{title:e.title}}),n("v-uni-view",{staticClass:"uni-padding-wrap uni-common-mt"},[e.tempFilePath?[n("v-uni-image",{staticClass:"image",attrs:{src:e.tempFilePath,mode:"aspectFit"}})]:e._e(),!e.tempFilePath&&e.savedFilePath?[n("v-uni-image",{staticClass:"image",attrs:{src:e.savedFilePath,mode:"aspectFit"}})]:e._e(),e.tempFilePath||e.savedFilePath?e._e():[n("v-uni-view",{staticClass:"uni-hello-addfile",on:{click:function(t){t=e.$handleEvent(t),e.chooseImage(t)}}},[e._v("+ 请选择文件")])],n("v-uni-view",{staticClass:"uni-btn-v"},[n("v-uni-button",{staticClass:"btn-savefile",on:{click:function(t){t=e.$handleEvent(t),e.saveFile(t)}}},[e._v("保存文件")]),n("v-uni-button",{on:{click:function(t){t=e.$handleEvent(t),e.clear(t)}}},[e._v("删除文件")])],1),n("v-uni-view",{staticClass:"btn-area"},[n("v-uni-button",{on:{click:function(t){t=e.$handleEvent(t),e.openDocument(t)}}},[e._v("打开pdf文件")])],1)],2)],1)},i=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return i})},b7f9:function(e,t,n){"use strict";n.r(t);var a=n("b6bc"),i=n("391b");for(var s in i)"default"!==s&&function(e){n.d(t,e,function(){return i[e]})}(s);n("0a1f");var o=n("2877"),c=Object(o["a"])(i["default"],a["a"],a["b"],!1,null,"9cd0e40a",null);t["default"]=c.exports}}]);