(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-jf-complaint-complaint"],{"2b28":function(t,e,i){"use strict";i.r(e);var n=i("4597"),a=i("4867");for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);i("c59d");var o=i("2877"),r=Object(o["a"])(a["default"],n["a"],n["b"],!1,null,"716020ca",null);e["default"]=r.exports},"3d32":function(t,e,i){var n=i("d0b07");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("0fa9aac8",n,!0,{sourceMap:!1,shadowMode:!1})},4597:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"segmented-control",class:{text:"text"===t.styleType},style:{borderColor:"text"===t.styleType?"":t.activeColor}},t._l(t.values,function(e,n){return i("v-uni-view",{key:n,staticClass:"segmented-control-item",class:[{text:"text"===t.styleType},{active:n===t.currentIndex}],style:{color:n===t.currentIndex?"text"===t.styleType?t.activeColor:"#fff":"text"===t.styleType?"#000":t.activeColor,backgroundColor:n===t.currentIndex&&"button"===t.styleType?t.activeColor:""},on:{click:function(e){e=t.$handleEvent(e),t._onClick(n)}}},[t._v(t._s(e))])}),1)},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},4655:function(t,e,i){"use strict";i.r(e);var n=i("c846"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);e["default"]=a.a},4867:function(t,e,i){"use strict";i.r(e);var n=i("4f01"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);e["default"]=a.a},"4f01":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"UniSegmentedControl",props:{current:{type:Number,default:0},values:{type:Array,default:function(){return[]}},activeColor:{type:String,default:"#007aff"},styleType:{type:String,default:"button"}},data:function(){return{currentIndex:0}},watch:{current:function(t){t!==this.currentIndex&&(this.currentIndex=t)}},created:function(){this.currentIndex=this.current},methods:{_onClick:function(t){this.currentIndex!==t&&(this.currentIndex=t,this.$emit("clickItem",t))}}};e.default=n},5753:function(t,e,i){"use strict";var n=i("b03b"),a=i.n(n);a.a},aa15:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".uni-media-list[data-v-1fb31c5e]{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.uni-media-list-body[data-v-1fb31c5e]{height:auto}.list-body-bottom[data-v-1fb31c5e],.list-body-top[data-v-1fb31c5e]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}",""])},b03b:function(t,e,i){var n=i("aa15");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("3befe26e",n,!0,{sourceMap:!1,shadowMode:!1})},b5da:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"page"},[i("uni-segmented-control",{attrs:{current:t.current,values:t.items,"style-type":t.styleType,"active-color":t.activeColor},on:{clickItem:function(e){e=t.$handleEvent(e),t.onClickTabItem(e)}}}),i("v-uni-view",{staticClass:"content"},[i("v-uni-scroll-view",{style:"height:"+t.winH+"px;",attrs:{"scroll-y":"true"},on:{scrolltolower:function(e){e=t.$handleEvent(e),t.lower(e)}}},[t.listData.length>0?i("v-uni-view",{staticClass:"uni-list"},[t._l(t.listData,function(e,n){return[i("v-uni-view",{key:n+"_0",staticClass:"uni-list-cell"},[i("v-uni-view",{staticClass:"uni-media-list",on:{click:function(i){i=t.$handleEvent(i),t.onItemClick(e,n)}}},[i("v-uni-view",{staticClass:"uni-media-list-logo"},[i("v-uni-image",{attrs:{src:e.userImg?e.userImg:"/static/img/default_user_icon.png"}})],1),i("v-uni-view",{staticClass:"uni-media-list-body"},[i("v-uni-view",{staticClass:"flex-space-between"},[i("v-uni-text",{staticClass:"uni-title"},[t._v(t._s(e.userName))]),i("v-uni-text",{staticClass:"uni-title",staticStyle:{color:"#4d96f5"}},[t._v(t._s(e.sqIntegral>0?"+":"-")+t._s(e.sqIntegral>0?e.sqIntegral:e.kIntegral)+"   "+t._s("1"==e.type?"品德A分":"2"==e.type?"业绩B分":"3"==e.type?"行为C分":"4"==e.type?"管理奖扣分":"5"==e.type?"自由奖扣分":"6"==e.type?"点赞分":"7"==e.type?"悬赏任务分":"8"==e.type?"积分支票":"9"==e.type?"水平考核分":""))])],1),i("v-uni-view",{staticClass:"uni-text"},[t._v(t._s(e.approvalTitle))]),i("v-uni-view",{staticClass:"flex-space-between"},[i("v-uni-text",{staticClass:"uni-text-small"},[t._v(t._s(e.spTime?e.spTime:e.sqTime))]),i("v-uni-text",{staticClass:"uni-text-small",style:"0"==e.status?"color:#FFCC33":"1"==e.status?"color:#1AA034":"color:#e74958"},[t._v(t._s("0"==e.status?"审批中":"1"==e.status?"审批通过":"审批不过"))])],1)],1)],1)],1)]})],2):i("v-uni-view",{staticClass:"uni-noData-txt"},[t._v("暂无数据")]),t.listData.length>0&&!t.hasNextPage?i("v-uni-view",{staticClass:"uni-noMore-txt"},[t._v("无更多数据")]):t._e()],1)],1)],1)},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},c59d:function(t,e,i){"use strict";var n=i("3d32"),a=i.n(n);a.a},c79e:function(t,e,i){"use strict";i.r(e);var n=i("b5da"),a=i("4655");for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);i("5753");var o=i("2877"),r=Object(o["a"])(a["default"],n["a"],n["b"],!1,null,"1fb31c5e",null);e["default"]=r.exports},c846:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("2b28"));function a(t){return t&&t.__esModule?t:{default:t}}var s={components:{uniSegmentedControl:n.default},data:function(){return{current:0,items:["审批拒绝","审批通过"],activeColor:"#007aff",styleType:"text",listData:[],pageSize:10,currentPage:1,isFirstPage:!0,hasNextPage:!0,status:2,search:""}},onShow:function(){this.pullDown()},onLoad:function(){this.getSystemInfoPage()},onPullDownRefresh:function(){this.pullDown()},methods:{getList:function(){var t=this;uni.showLoading({title:"加载中..."}),this.axios({url:this.GLOBAL.domain+"/complaint/selectComplaintList",method:"POST",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},data:this.$qs.stringify({pageSize:this.pageSize,pageNum:this.currentPage,time:this.status,search:this.search})}).then(function(e){if(t.GLOBAL.successHttp(e),console.log("success_selectComplaintList_积分申诉列表----",e),0==e.data.code){console.log("load page 第"+t.currentPage+"页");var i=e.data.data.list;t.listData=t.isFirstPage?i:t.listData.concat(i),t.isFirstPage=!1,t.currentPage+=1,t.hasNextPage=e.data.data.hasNextPage}uni.hideLoading(),uni.stopPullDownRefresh()}).catch(function(e){console.log("fail_selectComplaintList_积分申诉列表---",e),t.GLOBAL.failHttp(e),uni.hideLoading(),uni.stopPullDownRefresh()})},lower:function(){this.getList()},pullDown:function(){this.currentPage=1,this.listData=[],this.getList()},getSystemInfoPage:function(){var t=this;uni.getSystemInfo({success:function(e){t.winH=e.windowHeight}})},onItemClick:function(t,e){var i=t.approvalId,n=t.approvalTitle,a=t.approvalContent,s=t.spRemark,o=t.sqIntegral,r=t.type;if(2==t.status)uni.navigateTo({url:"/pages/jf/complaint/formSubmit/complaintSubmit?approvalId="+i+"&title="+n+"&content="+a+"&remark="+s+"&points="+o+"&type="+r});else if(1==t.status){var l=t.status;uni.navigateTo({url:"/pages/jf/complaint/detail/complaintDetail?approvalId="+i+"&status="+l})}},onClickTabItem:function(t){switch(this.current=t,t){case 0:this.status=2,this.pullDown();break;case 1:this.status=1,this.pullDown();break}}}};e.default=s},d0b07:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".segmented-control[data-v-716020ca]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:75%;font-size:%?28?%;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0 auto;overflow:hidden;border:%?1?% solid;-webkit-border-radius:%?10?%;border-radius:%?10?%}.segmented-control.text[data-v-716020ca]{border:0;-webkit-border-radius:0;border-radius:0}.segmented-control-item[data-v-716020ca]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;text-align:center;line-height:%?80?%;-webkit-box-sizing:border-box;box-sizing:border-box;border-left:%?1?% solid}.segmented-control-item.active[data-v-716020ca]{color:#fff}.segmented-control-item.text[data-v-716020ca]{border-left:0;color:#000}.segmented-control-item.text.active[data-v-716020ca]{border-bottom-style:solid}.segmented-control-item[data-v-716020ca]:first-child{border-left-width:0}",""])}}]);