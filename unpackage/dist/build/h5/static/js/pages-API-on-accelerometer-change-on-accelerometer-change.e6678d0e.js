(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-API-on-accelerometer-change-on-accelerometer-change"],{2387:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("page-head",{attrs:{title:t.title}}),n("v-uni-view",{staticClass:"uni-padding-wrap uni-common-mt"},[n("v-uni-view",{staticClass:"uni-btn-v"},[n("v-uni-button",{attrs:{type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.watchAcce(e)}}},[t._v("监听设备的加速度变化")]),n("v-uni-button",{attrs:{type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.stopAcce(e)}}},[t._v("停止监听设备的加速度变化")])],1),n("v-uni-view",{staticClass:"uni-textarea uni-common-mt"},[n("v-uni-textarea",{attrs:{value:t.value}})],1)],1)],1)},c=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return c})},"3fd4":function(t,e,n){"use strict";n.r(e);var a=n("2387"),c=n("4d64");for(var o in c)"default"!==o&&function(t){n.d(e,t,function(){return c[t]})}(o);n("772f");var i=n("2877"),u=Object(i["a"])(c["default"],a["a"],a["b"],!1,null,"4b95ee8d",null);e["default"]=u.exports},4073:function(t,e,n){var a=n("c07d");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var c=n("4f06").default;c("71db144c",a,!0,{sourceMap:!1,shadowMode:!1})},"4d64":function(t,e,n){"use strict";n.r(e);var a=n("8d67"),c=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=c.a},"772f":function(t,e,n){"use strict";var a=n("4073"),c=n.n(a);c.a},"8d67":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{title:"onAccelerometerChange",value:""}},onUnload:function(){uni.stopAccelerometer()},methods:{watchAcce:function(){var t=this;uni.onAccelerometerChange(function(e){t.value="监听设备的加速度变化:\nX轴："+e.x.toFixed(2)+"\nY轴："+e.y.toFixed(2)+"\nZ轴："+e.z.toFixed(2)})},stopAcce:function(){uni.stopAccelerometer()}}};e.default=a},c07d:function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,".shake[data-v-4b95ee8d]{background-color:#fc3;color:#fff;margin-bottom:%?50?%}",""])}}]);