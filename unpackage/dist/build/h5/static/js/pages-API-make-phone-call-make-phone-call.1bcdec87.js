(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-API-make-phone-call-make-phone-call"],{"2f33":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={data:function(){return{title:"makePhoneCall",disabled:!0}},methods:{bindInput:function(t){this.inputValue=t.target.value,this.inputValue.length>0?this.disabled=!1:this.disabled=!0},makePhoneCall:function(){uni.makePhoneCall({phoneNumber:this.inputValue,success:function(){console.log("成功拨打电话")}})}}};n.default=i},"3a85":function(t,n,e){"use strict";var i=e("f2eb"),a=e.n(i);a.a},4605:function(t,n,e){"use strict";e.r(n);var i=e("6603"),a=e("7091");for(var u in a)"default"!==u&&function(t){e.d(n,t,function(){return a[t]})}(u);e("3a85");var o=e("2877"),l=Object(o["a"])(a["default"],i["a"],i["b"],!1,null,"4df97e1e",null);n["default"]=l.exports},6603:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",[e("page-head",{attrs:{title:t.title}}),e("v-uni-view",{staticClass:"uni-padding-wrap uni-common-mt"},[e("v-uni-view",{staticClass:"uni-hello-text uni-center"},[t._v("请在下方输入电话号码")]),e("v-uni-input",{staticClass:"input uni-common-mt",attrs:{type:"number",name:"input"},on:{input:function(n){n=t.$handleEvent(n),t.bindInput(n)}}}),e("v-uni-view",{staticClass:"uni-btn-v uni-common-mt"},[e("v-uni-button",{attrs:{type:"primary",disabled:t.disabled},on:{click:function(n){n=t.$handleEvent(n),t.makePhoneCall(n)}}},[t._v("拨打")])],1)],1)],1)},a=[];e.d(n,"a",function(){return i}),e.d(n,"b",function(){return a})},7091:function(t,n,e){"use strict";e.r(n);var i=e("2f33"),a=e.n(i);for(var u in i)"default"!==u&&function(t){e.d(n,t,function(){return i[t]})}(u);n["default"]=a.a},db88:function(t,n,e){n=t.exports=e("2350")(!1),n.push([t.i,".input[data-v-4df97e1e]{height:%?119?%;line-height:%?119?%;font-size:%?78?%;border-bottom:%?1?% solid #e2e2e2;text-align:center}",""])},f2eb:function(t,n,e){var i=e("db88");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=e("4f06").default;a("48423cdd",i,!0,{sourceMap:!1,shadowMode:!1})}}]);