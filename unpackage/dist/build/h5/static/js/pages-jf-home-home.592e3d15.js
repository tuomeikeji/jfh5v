(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-jf-home-home"],{"01d7":function(n,t,e){t=n.exports=e("2350")(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* 今日积分排名card 自写样式*/.content-main[data-v-3436cbc6]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:%?90?%;position:relative}.content-main .number[data-v-3436cbc6]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.content-main .number .number-amount[data-v-3436cbc6],.content-main .number .number-text[data-v-3436cbc6]{display:inline-block;width:100%;text-align:center}.content-main .number .number-amount[data-v-3436cbc6]{line-height:%?60?%;font-size:%?30?%;color:#46adf4}.content-main .number .number-text[data-v-3436cbc6]{color:#999}\n/* 积分动态card 覆盖uni.css*/.uni-media-list[data-v-3436cbc6]{-webkit-box-align:center\n\t/* align-items: center; */}.uni-triple-right[data-v-3436cbc6]{position:absolute;top:%?19?%;right:%?14?%}.uni-text[data-v-3436cbc6]{color:#666}.uni-text-small[data-v-3436cbc6]{color:#999}.uni-media-list-logo[data-v-3436cbc6],.uni-media-list-logo uni-image[data-v-3436cbc6]{border-radius:50%;-webkit-border-radius:50%}.uni-title[data-v-3436cbc6]{padding:%?0?%}",""])},"0638":function(n,t,e){"use strict";var i=e("9f9a"),a=e.n(i);a.a},"0eb4":function(n,t,e){var i=e("01d7");"string"===typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);var a=e("4f06").default;a("22c7dfa2",i,!0,{sourceMap:!1,shadowMode:!1})},"2cd1":function(n,t,e){"use strict";e.r(t);var i=e("75b0"),a=e("2fb5");for(var s in a)"default"!==s&&function(n){e.d(t,n,function(){return a[n]})}(s);e("307c");var o=e("2877"),l=Object(o["a"])(a["default"],i["a"],i["b"],!1,null,"3436cbc6",null);t["default"]=l.exports},"2fb5":function(n,t,e){"use strict";e.r(t);var i=e("5b91"),a=e.n(i);for(var s in i)"default"!==s&&function(n){e.d(t,n,function(){return i[n]})}(s);t["default"]=a.a},3005:function(n,t,e){"use strict";e.r(t);var i=e("bd45"),a=e("a20f");for(var s in a)"default"!==s&&function(n){e.d(t,n,function(){return a[n]})}(s);e("0638");var o=e("2877"),l=Object(o["a"])(a["default"],i["a"],i["b"],!1,null,"f9c1ef62",null);t["default"]=l.exports},"307c":function(n,t,e){"use strict";var i=e("0eb4"),a=e.n(i);a.a},"560a":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={name:"UniCard",props:{title:{type:String,default:""},extra:{type:String,default:""},note:{type:String,default:""},thumbnail:{type:String,default:""},isFull:{type:Boolean,default:!1}},methods:{onClick:function(){this.$emit("click")}}};t.default=i},"5b91":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(e("3005")),a=o(e("e17c")),s=o(e("ca0a"));function o(n){return n&&n.__esModule?n:{default:n}}var l={components:{uniCard:i.default,uniList:a.default,uniListItem:s.default},data:function(){return{topImage:"",rank:{},first:{},listData:[],pageSize:10,currentPage:1,isFirstPage:!0,hasNextPage:!0}},onPullDownRefresh:function(){this.pullDown()},onLoad:function(){this.getTopImage(),this.getRank(),this.getList()},methods:{getTopImage:function(){var n=this;uni.showLoading({title:"加载中..."}),uni.request({url:"home/picture",method:"POST",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},async:!0,withCredentials:!0,crossDomain:!0,data:{location:0},success:function(t){console.log("success_HomeTopImage----",t),n.GLOBAL.successHttp(t),t.data.data.list.length>0&&(n.topImage=t.data.data.list[0].picUrl)},fail:function(t){console.log("failHomeTopImage---",t),n.GLOBAL.failHttp(t)},complete:function(){uni.hideLoading()}})},getRank:function(){var n=this;uni.showLoading({title:"加载中..."}),uni.request({url:this.GLOBAL.domain+"/home/index",method:"POST",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},success:function(t){console.log("success_/home/index----",t),n.GLOBAL.successHttp(t),n.rank=t.data.data,n.first=t.data.data},fail:function(t){console.log("fail_/home/index---",t),n.GLOBAL.failHttp(t)},complete:function(){uni.hideLoading()}})},getList:function(){var n=this;uni.showLoading({title:"加载中..."}),uni.request({url:this.GLOBAL.domain+"/home/list",method:"POST",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},data:{pageSize:this.pageSize,pageNum:this.currentPage,userId:""},success:function(t){console.log("success_/home/list----",t),n.GLOBAL.successHttp(t),console.log("load page 第"+n.currentPage+"页");var e=t.data.data.list;n.listData=n.isFirstPage?e:n.listData.concat(e),n.isFirstPage=!1,n.currentPage+=1,n.hasNextPage=t.data.data.hasNextPage,console.log("数据list:"+n.listData.length+"条")},fail:function(t){console.log("fail_/home/list---",t),n.GLOBAL.failHttp(t)},complete:function(){uni.hideLoading()}})},lower:function(){this.getList()},pullDown:function(){this.currentPage=1,this.listData=[],this.getList()},onItemClick:function(n,t){var e=this.listData[t].approvalId;console.log("list点击",e),uni.navigateTo({url:"logDetail/homeLogDetails?approvalId="+e})},rankTo:function(){uni.switchTab({url:"/pages/jf/rank/rank"})}}};t.default=l},"75b0":function(n,t,e){"use strict";var i=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",{staticClass:"page"},[e("v-uni-view",{staticClass:"topImage"},[n.topImage.length>0?e("v-uni-image",{attrs:{src:n.topImage,mode:"aspectFill"}}):n._e()],1),e("uni-card",{attrs:{title:"今日积分排名",thumbnail:"/static/img/menu.png"}},[e("v-uni-view",{staticClass:"content-main"},[e("v-uni-view",{staticClass:"number"},[e("v-uni-text",{staticClass:"number-amount"},[n._v(n._s(null==n.rank.rank?"0":n.rank.rank))]),e("v-uni-text",{staticClass:"number-text"},[n._v("排名")])],1),e("v-uni-view",{staticClass:"number"},[e("v-uni-text",{staticClass:"number-amount"},[n._v(n._s(null==n.rank.amount?"0":n.rank.amount))]),e("v-uni-text",{staticClass:"number-text"},[n._v("今日积分")])],1)],1),e("uni-list",[e("uni-list-item",{attrs:{title:n.first.userName?n.first.userName+"获得今日积分冠军":"暂无人获得今日积分冠军",thumb:n.first.userImg?n.first.userImg:"/static/img/default_user_icon.png"},on:{click:function(t){t=n.$handleEvent(t),n.rankTo(t)}}})],1)],1),e("uni-card",{attrs:{title:"积分动态"}},[e("v-uni-scroll-view",{staticStyle:{height:"400px"},attrs:{"scroll-y":"true"},on:{scrolltolower:function(t){t=n.$handleEvent(t),n.lower(t)}}},[n.listData.length>0?e("v-uni-view",{staticClass:"uni-list"},[n._l(n.listData,function(t,i){return[e("v-uni-view",{key:i+"_0",staticClass:"uni-list-cell"},[e("v-uni-view",{staticClass:"uni-media-list",on:{click:function(e){e=n.$handleEvent(e),n.onItemClick(t,i)}}},[e("v-uni-view",{staticClass:"uni-media-list-logo"},[e("v-uni-image",{attrs:{src:t.userImg?t.userImg:"/static/img/default_user_icon.png"}})],1),e("v-uni-view",{staticClass:"uni-media-list-body"},[e("v-uni-view",[e("v-uni-view",{staticClass:"uni-title"},[n._v(n._s(t.userName))]),e("v-uni-view",{staticClass:"uni-text"},[n._v(n._s(t.approvalTitle))]),e("v-uni-view",{staticClass:"uni-text-small"},[n._v(n._s(t.approvalContent))]),e("v-uni-view",{staticClass:"uni-text-small"},[n._v(n._s(t.spTime))])],1),e("v-uni-view",{staticClass:"uni-triple-right"},[t.sqIntegral>0?e("v-uni-view",[n._v("+"+n._s(t.sqIntegral)+"    "+n._s("1"==t.integralTypeId?"品德分":"2"==t.integralTypeId?"业绩分":"3"==t.integralTypeId?"行为分":"4"==t.integralTypeId?"奖扣分":"5"==t.integralTypeId?"奖励分":"6"==t.integralTypeId?"点赞分":"7"==t.integralTypeId?"任务分":"行为分"))]):e("v-uni-view",[n._v("-"+n._s(t.kIntegral)+"    "+n._s("1"==t.integralTypeId?"品德分":"2"==t.integralTypeId?"业绩分":"3"==t.integralTypeId?"行为分":"4"==t.integralTypeId?"奖扣分":"5"==t.integralTypeId?"奖励分":"6"==t.integralTypeId?"点赞分":"7"==t.integralTypeId?"任务分":"行为分"))])],1)],1)],1)],1)]})],2):e("v-uni-view",{staticClass:"uni-noData-txt"},[n._v("暂无数据")]),n.listData.length>0&&!n.hasNextPage?e("v-uni-view",{staticClass:"uni-noMore-txt"},[n._v("无更多数据")]):n._e()],1)],1)],1)},a=[];e.d(t,"a",function(){return i}),e.d(t,"b",function(){return a})},"9f9a":function(n,t,e){var i=e("d41e");"string"===typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);var a=e("4f06").default;a("b064428c",i,!0,{sourceMap:!1,shadowMode:!1})},a20f:function(n,t,e){"use strict";e.r(t);var i=e("560a"),a=e.n(i);for(var s in i)"default"!==s&&function(n){e.d(t,n,function(){return i[n]})}(s);t["default"]=a.a},bd45:function(n,t,e){"use strict";var i=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",{staticClass:"uni-card",class:n.isFull?"uni-card--full":"",on:{click:function(t){t=n.$handleEvent(t),n.onClick(t)}}},[n.title?e("v-uni-view",{staticClass:"uni-card__header"},[n.thumbnail?e("v-uni-view",{staticClass:"uni-card__header-extra-img-view"},[e("v-uni-image",{staticClass:"uni-card__header-extra-img",attrs:{src:n.thumbnail}})],1):n._e(),e("v-uni-view",{staticClass:"uni-card__header-title-text"},[n._v(n._s(n.title))]),n.extra?e("v-uni-view",{staticClass:"uni-card__header-extra-text"},[n._v(n._s(n.extra))]):n._e()],1):n._e(),e("v-uni-view",{staticClass:"uni-card__content uni-card__content--pd"},[n._t("default")],2),n.note?e("v-uni-view",{staticClass:"uni-card__footer"},[n._v(n._s(n.note))]):n._e()],1)},a=[];e.d(t,"a",function(){return i}),e.d(t,"b",function(){return a})},d41e:function(n,t,e){t=n.exports=e("2350")(!1),t.push([n.i,'.uni-card[data-v-f9c1ef62]{margin-left:%?24?%;margin-right:%?24?%;background:#fff;-webkit-box-shadow:none;box-shadow:none;position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.uni-card[data-v-f9c1ef62]:after{content:"";position:absolute;-webkit-transform-origin:center;-ms-transform-origin:center;transform-origin:center;-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:none;top:-50%;left:-50%;right:-50%;bottom:-50%;border:%?1?% solid #c8c7cc;-webkit-border-radius:%?12?%;border-radius:%?12?%;-webkit-transform:scale(.5);-ms-transform:scale(.5);transform:scale(.5)}.uni-card__footer[data-v-f9c1ef62],.uni-card__header[data-v-f9c1ef62]{position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;padding:%?16?%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.uni-card__header[data-v-f9c1ef62]:after{position:absolute;bottom:0;right:0;left:0;height:%?1?%;content:"";-webkit-transform:scaleY(.5);-ms-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.uni-card__header-title[data-v-f9c1ef62]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;margin-right:%?16?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.uni-card__header-title-text[data-v-f9c1ef62]{font-size:%?32?%;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.uni-card__header-extra-img-view[data-v-f9c1ef62]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.uni-card__header-extra-img[data-v-f9c1ef62]{height:%?40?%;width:%?40?%;margin-right:%?16?%}.uni-card__header-extra-text[data-v-f9c1ef62]{-webkit-box-flex:0;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;width:30%;margin-left:%?16?%;font-size:%?28?%;text-align:right;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.uni-card__content--pd[data-v-f9c1ef62]{padding:%?16?%}.uni-card__footer[data-v-f9c1ef62]{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;color:#999;font-size:%?24?%;padding-top:0}.uni-card--full[data-v-f9c1ef62]{margin:0}',""])}}]);