(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-jf-leaderAward-leaderAward"],{"09a7":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=s(a("697c")),i=s(a("6e9f"));function s(e){return e&&e.__esModule?e:{default:e}}var o={components:{uniDrawer:n.default,chooseUser:i.default},data:function(){return{radioG_points:[{value:"addIntegral",name:"奖励积分",checked:"true"},{value:"delIntegral",name:"扣除积分"}],radioPointCurr:0,allPoints:0,arrIndexType:3,copy:[],types:[],loading:!1,disabled:!1,showUserDrawer:!1,checkedUserInfo:[],checkedUserItem:[],getUsersUrl:"/leader/selectLeaderdepts"}},onLoad:function(e){this.getType(),this.getAllPoints()},methods:{getType:function(){var e=this;this.axios({url:this.GLOBAL.domain+"/rank/selectType",method:"POST",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"}}).then(function(t){console.log("success_selectType_获取积分类型",t),0==t.data.code&&(e.types=t.data.data)}).catch(function(t){console.log("fail_selectType_获取积分类型",t),e.GLOBAL.failHttp(t)})},getAllPoints:function(){var e=this;this.axios({url:this.GLOBAL.domain+"/leader/leaderManageIntegral",method:"POST",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"}}).then(function(t){console.log("success_leaderManageIntegral_管理者可用积分",t),e.GLOBAL.successHttp(t),0==t.data.code&&(e.allPoints=t.data.data)}).catch(function(t){console.log("fail_获取审批人",t),e.GLOBAL.failHttp(t)})},radioPointsChange:function(e){switch(e.detail.value){case"addIntegral":this.radioPointCurr=0;break;case"delIntegral":this.radioPointCurr=1;break}},formSubmit:function(e){console.log("form发生了submit事件，携带数据为："+JSON.stringify(e.detail.value));var t=this,a=[];t.checkedUserInfo.forEach(function(e){a.push(e.userId)});var n=e.detail.value.addIntegral?e.detail.value.addIntegral:0,i=e.detail.value.delIntegral?e.detail.value.delIntegral:0,s=e.detail.value.remark,o=e.detail.value.title,r=e.detail.value.content,l=t.types[t.arrIndexType].id;if(console.log("最终提交数据:","addIntegral:"+n+",delIntegral:"+i+",typeId:"+l+",from:"+a),!o||!r)return uni.showModal({content:"请填写关键内容",showCancel:!1}),!1;if(o>50)return uni.showModal({content:"标题大于50字，请重新填写",showCancel:!1}),!1;var c=/^[0-9]\d*$/;return!c.test(n)&&0==i||!c.test(i)&&0==n?(console.log(c.test(n),c.test(i)),uni.showModal({content:"奖扣分请输入正整数",showCancel:!1}),!1):n*a.length>t.allPoints?(uni.showModal({content:"您的可用积分不足",showCancel:!1}),!1):a.length<=0?(uni.showModal({content:"请选择需要奖扣的员工",showCancel:!1}),!1):(uni.showLoading({mask:!0,title:"提交中..."}),t.loading=!0,t.disabled=!0,void t.axios({url:t.GLOBAL.domain+"/free/freeIntegral",method:"POST",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},data:t.$qs.stringify({addIntegral:n,delIntegral:i,spRemark:s,typeId:l,from:a,approvalTitle:o,approvalContent:r,approvalImg:[]},{arrayFormat:"repeat"})}).then(function(e){console.log("success_申请成功----",e),t.GLOBAL.successHttp(e),0==e.data.code?uni.showModal({content:"提交成功",showCancel:!1,success:function(){uni.navigateBack()}}):uni.showModal({content:e.data.msg,showCancel:!1}),t.loading=!1,t.disabled=!1,uni.hideLoading()}).catch(function(e){console.log("fail_申请失败",e),t.GLOBAL.failHttp(e),uni.showModal({content:"提交失败，请稍后再试",showCancel:!1,success:function(){uni.navigateBack()}}),t.loading=!1,t.disabled=!1,uni.hideLoading()}))},showDrawer:function(){this.showUserDrawer=!0},toggleDrawer:function(){this.showUserDrawer=!this.showUserDrawer},getUsers:function(e){var t=this;this.checkedUserInfo=[],this.checkedUserItem=[];var a=e;a.forEach(function(e){e=JSON.parse(e),t.checkedUserInfo.push(e),t.checkedUserItem.push(e)})}}};t.default=o},2942:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"uni-page-body",staticStyle:{"background-color":"#FFFFFF"}},[a("v-uni-form",{staticClass:"page-section",on:{submit:function(t){t=e.$handleEvent(t),e.formSubmit(t)}}},[a("v-uni-view",{staticClass:"page-section-title"},[a("v-uni-text",{staticClass:"uni-text-red"},[e._v("*")]),e._v("奖扣标题："),a("v-uni-text",{staticClass:"uni-text-small"},[e._v("(标题小于50字)")])],1),a("v-uni-view",{staticClass:"page-section-demo"},[a("v-uni-textarea",{attrs:{name:"title","auto-height":"true",maxlength:"-1"}})],1),a("v-uni-view",{staticClass:"form-line"}),a("v-uni-view",{staticClass:"page-section-title"},[a("v-uni-text",{staticClass:"uni-text-red"},[e._v("*")]),e._v("奖扣内容：")],1),a("v-uni-view",{staticClass:"page-section-demo"},[a("v-uni-textarea",{attrs:{name:"content","auto-height":"true",maxlength:"-1"}})],1),a("v-uni-view",{staticClass:"form-line"}),a("v-uni-view",{staticClass:"clear"},[a("v-uni-label",{staticClass:"page-section-lable"},[e._v("积分类型：")]),a("v-uni-input",{staticClass:"page-section-input",attrs:{type:"text",value:e.types[e.arrIndexType].name,name:"type",disabled:"true"}})],1),a("v-uni-view",{staticClass:"form-line"}),a("v-uni-view",{staticClass:"page-section-title"},[e._v("备注：")]),a("v-uni-view",{staticClass:"page-section-demo"},[a("v-uni-textarea",{staticStyle:{"font-size":"28upx"},attrs:{"auto-height":"true",name:"remark"}})],1),a("v-uni-view",{staticClass:"form-line"}),a("v-uni-view",{staticStyle:{padding:"0 30upx"}},[a("v-uni-view",{staticClass:"uni-title"},[e._v("可用积分:"),a("v-uni-text",{staticStyle:{color:"#007AFF","font-size":"32upx"}},[e._v(e._s(e.allPoints))]),e._v("分")],1),a("v-uni-radio-group",{staticStyle:{"margin-bottom":"20upx"},attrs:{name:"radioPoints"},on:{change:function(t){t=e.$handleEvent(t),e.radioPointsChange(t)}}},e._l(e.radioG_points,function(t,n){return a("v-uni-label",{key:t.value},[a("v-uni-radio",{attrs:{value:t.value,checked:t.checked}}),a("v-uni-text",[e._v(e._s(t.name))])],1)}),1),a("v-uni-view",[a("v-uni-label",{directives:[{name:"show",rawName:"v-show",value:0==e.radioPointCurr,expression:"radioPointCurr == 0"}],staticClass:"page-section-lable2",attrs:{for:"addIntegral"}},[e._v("奖励积分："),a("v-uni-input",{staticClass:"page-section-input2",attrs:{type:"tel",id:"addIntegral",name:"addIntegral",placeholder:"请填写正整数"}})],1),a("v-uni-label",{directives:[{name:"show",rawName:"v-show",value:1==e.radioPointCurr,expression:"radioPointCurr == 1"}],staticClass:"page-section-lable2",attrs:{for:"delIntegral"}},[e._v("扣除积分："),a("v-uni-input",{staticClass:"page-section-input2",attrs:{type:"tel",id:"delIntegral",name:"delIntegral",placeholder:"请填写正整数"}})],1)],1)],1),a("v-uni-view",{staticClass:"form-line"}),a("v-uni-view",{staticClass:"select-section",staticStyle:{"padding-top":"30upx"}},[a("v-uni-view",{staticClass:"title"},[a("v-uni-text",{staticClass:"uni-text-red"},[e._v("*")]),e._v("选择员工"),a("v-uni-text",{staticClass:"details"},[e._v("可选择多人")])],1),a("v-uni-view",{staticClass:"add-wrapper"},[a("v-uni-text",{staticClass:"addIcon",on:{click:function(t){t=e.$handleEvent(t),e.showDrawer(t)}}},[e._v("+")])],1),e._l(e.checkedUserInfo,function(t,n){return a("v-uni-view",{staticClass:"add-wrapper"},[a("v-uni-image",{staticClass:"addIcon",attrs:{src:t.avatar?t.avatar:"/static/img/default_user_icon.png"}}),a("v-uni-text",{staticClass:"name"},[e._v(e._s(t.userName))])],1)})],2),a("chooseUser",{attrs:{showDrawerFlag:e.showUserDrawer,getUsersUrl:e.getUsersUrl,checkedUserItem:e.checkedUserItem},on:{toggleUserDrawer:function(t){t=e.$handleEvent(t),e.toggleDrawer(t)},getUsers:function(t){t=e.$handleEvent(t),e.getUsers(t)}}}),a("v-uni-button",{staticClass:"button-form",attrs:{"form-type":"submit",type:"primary",loading:e.loading,disabled:e.disabled}},[e._v("提交")])],1)],1)},i=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return i})},"2b62":function(e,t,a){"use strict";var n=a("90fb"),i=a.n(n);i.a},"90fb":function(e,t,a){var n=a("b102");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=a("4f06").default;i("56349c06",n,!0,{sourceMap:!1,shadowMode:!1})},b102:function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,".page-section-input2[data-v-26f4a346]{display:inline-block;border:%?1?% solid #eee;vertical-align:top;width:%?400?%;margin-left:%?20?%;margin-bottom:%?24?%}",""])},cde0:function(e,t,a){"use strict";a.r(t);var n=a("2942"),i=a("ec6e");for(var s in i)"default"!==s&&function(e){a.d(t,e,function(){return i[e]})}(s);a("2b62");var o=a("2877"),r=Object(o["a"])(i["default"],n["a"],n["b"],!1,null,"26f4a346",null);t["default"]=r.exports},ec6e:function(e,t,a){"use strict";a.r(t);var n=a("09a7"),i=a.n(n);for(var s in n)"default"!==s&&function(e){a.d(t,e,function(){return n[e]})}(s);t["default"]=i.a}}]);