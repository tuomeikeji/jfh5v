(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-extUI-tag-tag"],{"131e":function(t,e,i){"use strict";i.r(e);var a=i("8c98"),n=i("5ed8");for(var r in n)"default"!==r&&function(t){i.d(e,t,function(){return n[t]})}(r);i("3d3f");var s=i("2877"),l=Object(s["a"])(n["default"],a["a"],a["b"],!1,null,"277e158c",null);e["default"]=l.exports},2009:function(t,e,i){"use strict";i.r(e);var a=i("a180"),n=i("38db");for(var r in n)"default"!==r&&function(t){i.d(e,t,function(){return n[t]})}(r);i("5449");var s=i("2877"),l=Object(s["a"])(n["default"],a["a"],a["b"],!1,null,"5d3dbeeb",null);e["default"]=l.exports},"38db":function(t,e,i){"use strict";i.r(e);var a=i("5289"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,function(){return a[t]})}(r);e["default"]=n.a},"3d3f":function(t,e,i){"use strict";var a=i("d289"),n=i.n(a);n.a},"42c7":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".uni-tag[data-v-277e158c]{-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 %?32?%;height:%?60?%;line-height:-webkit-calc(%?60?% - %?2?%);line-height:calc(%?60?% - %?2?%);font-size:%?28?%;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;color:#333;-webkit-border-radius:%?6?%;border-radius:%?6?%;background-color:#f8f8f8;border:%?1?% solid #f8f8f8}.uni-tag--circle[data-v-277e158c]{-webkit-border-radius:%?30?%;border-radius:%?30?%}.uni-tag--mark[data-v-277e158c]{-webkit-border-radius:0 %?30?% %?30?% 0;border-radius:0 %?30?% %?30?% 0}.uni-tag--disabled[data-v-277e158c]{opacity:.5}.uni-tag--small[data-v-277e158c]{height:%?40?%;padding:0 %?16?%;line-height:-webkit-calc(%?40?% - %?2?%);line-height:calc(%?40?% - %?2?%);font-size:%?24?%}.uni-tag--primary[data-v-277e158c]{color:#fff;background-color:#007aff;border:%?1?% solid #007aff}.uni-tag--primary.uni-tag--inverted[data-v-277e158c]{color:#007aff;background-color:#fff;border:%?1?% solid #007aff}.uni-tag--success[data-v-277e158c]{color:#fff;background-color:#4cd964;border:%?1?% solid #4cd964}.uni-tag--success.uni-tag--inverted[data-v-277e158c]{color:#4cd964;background-color:#fff;border:%?1?% solid #4cd964}.uni-tag--warning[data-v-277e158c]{color:#fff;background-color:#f0ad4e;border:%?1?% solid #f0ad4e}.uni-tag--warning.uni-tag--inverted[data-v-277e158c]{color:#f0ad4e;background-color:#fff;border:%?1?% solid #f0ad4e}.uni-tag--error[data-v-277e158c]{color:#fff;background-color:#dd524d;border:%?1?% solid #dd524d}.uni-tag--error.uni-tag--inverted[data-v-277e158c]{color:#dd524d;background-color:#fff;border:%?1?% solid #dd524d}.uni-tag--inverted[data-v-277e158c]{color:#333;background-color:#fff;border:%?1?% solid #f8f8f8}",""])},5289:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("131e"));function n(t){return t&&t.__esModule?t:{default:t}}var r={components:{uniTag:a.default},data:function(){return{type:"default",inverted:!1}},methods:{setType:function(){var t=["default","primary","success","warning","error"],e=t.indexOf(this.type);t.splice(e,1);var i=Math.floor(4*Math.random());this.type=t[i]},setInverted:function(){this.inverted=!this.inverted}}};e.default=r},5449:function(t,e,i){"use strict";var a=i("59d1"),n=i.n(a);n.a},"59d1":function(t,e,i){var a=i("a9bb");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("61cf7757",a,!0,{sourceMap:!1,shadowMode:!1})},"5ed8":function(t,e,i){"use strict";i.r(e);var a=i("7a32"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,function(){return a[t]})}(r);e["default"]=n.a},"7a32":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"UniTag",props:{type:{type:String,default:"default"},size:{type:String,default:"normal"},text:{type:String,default:""},disabled:{type:Boolean,default:!1},inverted:{type:Boolean,default:!1},circle:{type:Boolean,default:!1},mark:{type:Boolean,default:!1}},methods:{_onClick:function(){this.disabled||this.$emit("click")}}};e.default=a},"8c98":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.text?i("v-uni-view",{staticClass:"uni-tag",class:[t.disabled?"uni-tag--disabled":"",t.inverted?"uni-tag--inverted":"",t.circle?"uni-tag--circle":"",t.mark?"uni-tag--mark":"","uni-tag--"+t.size,"uni-tag--"+t.type],on:{click:function(e){e=t.$handleEvent(e),t._onClick(e)}}},[t._v(t._s(t.text))]):t._e()},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},a180:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"example"},[i("v-uni-view",{staticClass:"example-title"},[t._v("实心标签")]),i("v-uni-view",[i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{text:"标签"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{text:"标签",type:"primary"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{text:"标签",type:"success"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{text:"标签",type:"warning"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{text:"标签",type:"error"}})],1)],1),i("v-uni-view",{staticClass:"example-title"},[t._v("空心标签")]),i("v-uni-view",[i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,text:"标签"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,text:"标签",type:"primary"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,text:"标签",type:"success"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,text:"标签",type:"warning"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,text:"标签",type:"error"}})],1)],1),i("v-uni-view",{staticClass:"example-title"},[t._v("圆角样式")]),i("v-uni-view",[i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{circle:!0,text:"标签",type:"primary",size:"small"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,circle:!0,text:"标签",type:"success",size:"small"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{circle:!0,text:"标签",type:"warning"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,circle:!0,text:"标签",type:"error"}})],1)],1),i("v-uni-view",{staticClass:"example-title"},[t._v("标记样式")]),i("v-uni-view",[i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{mark:!0,text:"标签",type:"primary",size:"small"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{mark:!0,text:"标签",type:"success",size:"small"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{mark:!0,text:"标签",type:"warning"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{mark:!0,circle:!0,text:"标签",type:"error"}})],1)],1),i("v-uni-view",{staticClass:"example-title"},[t._v("点击事件")]),i("v-uni-view",[i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{type:t.type,text:"标签"},on:{click:function(e){e=t.$handleEvent(e),t.setType(e)}}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{circle:!0,inverted:t.inverted,text:"标签",type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.setInverted(e)}}})],1)],1),i("v-uni-view",{staticClass:"example-title"},[t._v("小标签")]),i("v-uni-view",[i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{text:"标签",size:"small"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{text:"标签",type:"primary",size:"small"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{text:"标签",type:"success",size:"small"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,mark:!0,text:"标签",type:"warning",size:"small"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,circle:!0,text:"标签",type:"error",size:"small"}})],1)],1),i("v-uni-view",{staticClass:"example-title"},[t._v("不可点击状态")]),i("v-uni-view",{staticClass:"page-section"},[i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{disabled:!0,text:"标签"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{disabled:!0,text:"标签",type:"primary"}})],1),i("v-uni-view",{staticClass:"tag-view"},[i("uni-tag",{attrs:{inverted:!0,disabled:!0,text:"标签",type:"error",size:"small"}})],1)],1)],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},a9bb:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,"uni-page-body[data-v-5d3dbeeb]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fff}uni-view[data-v-5d3dbeeb]{font-size:%?28?%;line-height:inherit}.example[data-v-5d3dbeeb]{padding:0 %?30?% %?30?%}.example-title[data-v-5d3dbeeb]{font-size:%?32?%;line-height:%?32?%;color:#777;margin:%?40?% %?25?%;position:relative}.example .example-title[data-v-5d3dbeeb]{margin:%?40?% 0}.example-body[data-v-5d3dbeeb]{padding:0 %?40?%}.tag-view[data-v-5d3dbeeb]{margin:%?10?% %?20?%;display:inline-block}body.?%PAGE?%[data-v-5d3dbeeb]{background-color:#fff}",""])},d289:function(t,e,i){var a=i("42c7");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("a4da5df0",a,!0,{sourceMap:!1,shadowMode:!1})}}]);