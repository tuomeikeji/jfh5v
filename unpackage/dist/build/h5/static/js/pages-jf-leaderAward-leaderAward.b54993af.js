(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-jf-leaderAward-leaderAward"],{2132:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.visibleSync?a("v-uni-view",{staticClass:"uni-drawer",class:{"uni-drawer--visible":e.showDrawer,"uni-drawer--right":e.rightMode},on:{touchmove:function(t){t.stopPropagation(),t.preventDefault(),t=e.$handleEvent(t),e.moveHandle(t)}}},[a("v-uni-view",{staticClass:"uni-drawer__mask",on:{click:function(t){t=e.$handleEvent(t),e.close(t)}}}),a("v-uni-view",{staticClass:"uni-drawer__content"},[e._t("default")],2)],1):e._e()},n=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return n})},"2bf5":function(e,t,a){"use strict";var i=a("a5ae"),n=a.n(i);n.a},5164:function(e,t,a){"use strict";a.r(t);var i=a("dcd5"),n=a("70c5");for(var s in n)"default"!==s&&function(e){a.d(t,e,function(){return n[e]})}(s);a("6296");var r=a("2877"),o=Object(r["a"])(n["default"],i["a"],i["b"],!1,null,"08c1686d",null);t["default"]=o.exports},5988:function(e,t,a){"use strict";a.r(t);var i=a("fb19"),n=a.n(i);for(var s in i)"default"!==s&&function(e){a.d(t,e,function(){return i[e]})}(s);t["default"]=n.a},"599a":function(e,t,a){"use strict";var i=a("7892"),n=a.n(i);n.a},6296:function(e,t,a){"use strict";var i=a("6864"),n=a.n(i);n.a},6864:function(e,t,a){var i=a("89c8");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("e42e5b54",i,!0,{sourceMap:!1,shadowMode:!1})},"70c5":function(e,t,a){"use strict";a.r(t);var i=a("cf9d"),n=a.n(i);for(var s in i)"default"!==s&&function(e){a.d(t,e,function(){return i[e]})}(s);t["default"]=n.a},7892:function(e,t,a){var i=a("cb09");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("50c3909c",i,!0,{sourceMap:!1,shadowMode:!1})},"89c8":function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,".row[data-v-08c1686d]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:0 %?30?%}.row-title[data-v-08c1686d]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;padding-top:%?28?%;padding-bottom:%?28?%;font-size:%?34?%;color:#000}.row-extra[data-v-08c1686d]{-webkit-flex-basis:initial;-ms-flex-preferred-size:initial;flex-basis:auto;font-size:%?32?%;color:#888}.row-arrow[data-v-08c1686d]{width:%?32?%;height:%?32?%;margin-left:%?16?%}.page[data-v-08c1686d]{min-height:100%;padding-bottom:%?10?%;font-size:%?14?%}.am-input-label[data-v-08c1686d]{font-weight:700}.page-section-title[data-v-08c1686d]{font-weight:700}.row-title[data-v-08c1686d]{font-size:%?14?%;font-weight:700}.row-extra[data-v-08c1686d]{font-size:%?12?%}.am-input-content[data-v-08c1686d]{font-size:%?13?%}.button-form[data-v-08c1686d]{font-size:%?17?%;height:%?44?%;line-height:%?44?%;margin-left:%?10?%;margin-right:%?10?%}.picture-btns[data-v-08c1686d]{height:%?40?%;line-height:%?40?%;color:#3296fa;font-size:%?14?%;text-align:center}.picture-btns .details[data-v-08c1686d]{font-weight:400;font-size:%?12?%;color:#888;margin-left:%?7?%}.am-input-line-bottom[data-v-08c1686d]{display:none}\n\n/* .page-section-btns {\n  border-top: none;\n} */\n\n/* 批量添加组件 */.select-section[data-v-08c1686d]{padding:0 %?30?%}.select-section .title[data-v-08c1686d]{font-weight:700;line-height:%?40?%;font-size:%?14?%}.select-section .title .details[data-v-08c1686d]{font-weight:400;font-size:%?12?%;color:#888;margin-left:%?7?%}.add-wrapper[data-v-08c1686d]{width:%?40?%;display:inline-block;text-align:center;margin:0 %?14?% %?14?% 0}.add-wrapper .add[data-v-08c1686d]{height:%?37?%;width:%?37?%;-webkit-border-radius:50%;border-radius:50%;background:#eee;display:inline-block;line-height:%?37?%;text-align:center;font-size:%?37?%;color:#999;vertical-align:bottom}.add-wrapper .name[data-v-08c1686d]{margin-top:%?4?%;display:inline-block;font-size:%?13?%;color:#888}.add-wrapper-new[data-v-08c1686d]{width:%?40?%;display:inline-block;text-align:center;margin:0 %?27?% %?14?% 0}.add-wrapper-new .add[data-v-08c1686d]{height:%?60?%;width:%?60?%;background:#eee;display:inline-block;line-height:%?60?%;text-align:center;font-size:%?37?%;color:#999;vertical-align:bottom}",""])},9399:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a("bc60"));function n(e){return e&&e.__esModule?e:{default:e}}var s={props:{showDrawerFlag:{type:Boolean,default:!1}},components:{uniDrawer:i.default},data:function(){return{reset:!1,users:[],checkedUserId:[],search:"",pageSize:10,currentPage:1,isFirstPage:!0,hasNextPage:!0}},created:function(){this.getUsers(),this.getSystemInfoPage()},methods:{getUsers:function(){var e=this;uni.request({url:this.GLOBAL.domain+"/work/declareBehaviorDetail/selectAllDeptUser",method:"POST",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},data:{pageSize:this.pageSize,pageNum:this.currentPage,search:this.search},success:function(t){if(e.GLOBAL.successHttp(t),console.log("success_selectLeaderdepts_所有下属员工---",t),200==t.statusCode){console.log("load page 第"+e.currentPage+"页");var a=t.data.data.list;e.users=e.isFirstPage?a:e.users.concat(a),e.isFirstPage=!1,e.currentPage+=1,e.hasNextPage=t.data.data.hasNextPage}},fail:function(t){console.log("fail_selectLeaderdepts_所有下属员工",t),e.GLOBAL.failHttp(t)}})},lower:function(){this.getUsers()},getSystemInfoPage:function(){var e=this;uni.getSystemInfo({success:function(t){e.winH=t.windowHeight}})},closeDrawer:function(){this.$emit("toggleUserDrawer")},formSubmit:function(e){console.log("submit，携带值为",e.detail.value),this.$emit("getUsers",e.detail.value.userCheckBox),this.closeDrawer()}}};t.default=s},"951b":function(e,t,a){"use strict";a.r(t);var i=a("9399"),n=a.n(i);for(var s in i)"default"!==s&&function(e){a.d(t,e,function(){return i[e]})}(s);t["default"]=n.a},a5ae:function(e,t,a){var i=a("b0cd");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("595587a0",i,!0,{sourceMap:!1,shadowMode:!1})},b0cd:function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,".page-section-btns[data-v-0ceff71e]{position:fixed;bottom:0;width:100%;background:#ccc;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}\n/* 用户列表样式 */.checkbox-wrapper[data-v-0ceff71e]{overflow:auto\n\t  /* padding-top: 4px; */}.checkbox[data-v-0ceff71e]{display:block;position:relative;height:%?48?%;line-height:%?48?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.checkbox uni-image[data-v-0ceff71e]{height:%?40?%;width:%?40?%;-webkit-border-radius:50%;border-radius:50%;display:inline-block;vertical-align:middle;margin-left:%?14?%;margin-right:%?14?%}.checkbox-text[data-v-0ceff71e]{font-size:%?17?%}.checkbox-details[data-v-0ceff71e]{font-size:%?12?%;margin-left:%?14?%;color:#888}",""])},bc60:function(e,t,a){"use strict";a.r(t);var i=a("2132"),n=a("5988");for(var s in n)"default"!==s&&function(e){a.d(t,e,function(){return n[e]})}(s);a("599a");var r=a("2877"),o=Object(r["a"])(n["default"],i["a"],i["b"],!1,null,"12b67f74",null);t["default"]=o.exports},cb09:function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,".uni-drawer[data-v-12b67f74]{display:block;position:fixed;top:0;left:0;right:0;bottom:0;overflow:hidden;visibility:hidden;z-index:10001;height:100%}.uni-drawer.uni-drawer--right .uni-drawer__content[data-v-12b67f74]{left:auto;right:0;-webkit-transform:translatex(100%);-ms-transform:translatex(100%);transform:translatex(100%)}.uni-drawer.uni-drawer--visible[data-v-12b67f74]{visibility:visible}.uni-drawer.uni-drawer--visible .uni-drawer__content[data-v-12b67f74]{-webkit-transform:translatex(0);-ms-transform:translatex(0);transform:translatex(0)}.uni-drawer.uni-drawer--visible .uni-drawer__mask[data-v-12b67f74]{display:block;opacity:1}.uni-drawer__mask[data-v-12b67f74]{display:block;opacity:0;position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.4);-webkit-transition:opacity .3s;-o-transition:opacity .3s;transition:opacity .3s}.uni-drawer__content[data-v-12b67f74]{display:block;position:absolute;top:0;left:0;\n\t/* width: 61.8%; */width:100%;height:100%;background:#fff;-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out;transition:all .3s ease-out;-webkit-transform:translatex(-100%);-ms-transform:translatex(-100%);transform:translatex(-100%)}",""])},cf9d:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(a("bc60")),n=s(a("dd86"));function s(e){return e&&e.__esModule?e:{default:e}}var r={components:{uniDrawer:i.default,chooseUser:n.default},data:function(){return{radioG_points:[{value:"addIntegral",name:"奖励积分",checked:"true"},{value:"delIntegral",name:"扣除积分"}],radioPointCurr:0,allPoints:0,arrIndexType:3,copy:[],types:[],loading:!1,disabled:!1,showUserDrawer:!1,checkedUserInfo:[]}},onLoad:function(e){this.getType(),this.getAllPoints()},methods:{getType:function(){var e=this;uni.request({url:this.GLOBAL.domain+"/rank/selectType",method:"POST",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},success:function(t){console.log("success_selectType_获取积分类型",t),200==t.statusCode&&(e.types=t.data.data)},fail:function(t){console.log("fail_selectType_获取积分类型",t),e.GLOBAL.failHttp(t)}})},getAllPoints:function(){var e=this;uni.request({url:this.GLOBAL.domain+"/leader/leaderManageIntegral",method:"POST",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},success:function(t){console.log("success_leaderManageIntegral_管理者可用积分",t),e.GLOBAL.successHttp(t),200==t.statusCode&&(e.allPoints=t.data.data)},fail:function(e){console.log("fail_获取审批人",e);var t=JSON.stringify(e);switch(e.error){case 13:t="连接超时";break;case 12:t="网络出错";break;case 19:t="访问拒绝"}uni.showModal({content:t,confirmText:"确定",showCancel:!1,success:function(){uni.reLaunch({url:"/pages/jf/login/login"})}})}})},radioPointsChange:function(e){switch(e.detail.value){case"addIntegral":this.radioPointCurr=0;break;case"delIntegral":this.radioPointCurr=1;break}},formSubmit:function(e){var t=this;console.log("form发生了submit事件，携带数据为："+JSON.stringify(e.detail.value));var a=this,i=[];a.checkedUserInfo.forEach(function(e){i.push(e.userId)});var n=e.detail.value.addIntegral?e.detail.value.addIntegral:0,s=e.detail.value.delIntegral?e.detail.value.delIntegral:0,r=e.detail.value.remark,o=e.detail.value.title,l=e.detail.value.content,c=a.types[a.arrIndexType].id;return console.log("title:"+o+",content:"+l+",remark:"+r+",typeId:"+c+",addpoints:"+n+",delPoints:"+s+",usersId:"+i),o&&l?i<=0?(uni.showModal({content:"请选择需要奖扣的员工",showCancel:!1}),!1):n*i.length>a.allPoints?(uni.showModal({content:"您的可用积分不足",showCancel:!1}),!1):void uni.request({url:this.GLOBAL.domain+"/free/freeIntegral",method:"POST",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},data:{addIntegral:n,delIntegral:s,spRemark:r,typeId:c,from:[i],approvalTitle:o,approvalContent:l},success:function(e){console.log("success_申请成功----",e),t.GLOBAL.successHttp(e),0==e.data.code?uni.showModal({content:"提交成功",showCancel:!1,success:function(){uni.navigateBack()}}):uni.showModal({content:e.data.msg,showCancel:!1})},fail:function(e){console.log("fail_申请失败",e),t.GLOBAL.failHttp(e)},complete:function(){a.loading=!1,a.disabled=!1,uni.hideLoading()}}):(uni.showModal({content:"请填写关键内容",showCancel:!1}),!1)},showDrawer:function(){this.showUserDrawer=!0},toggleDrawer:function(){this.showUserDrawer=!this.showUserDrawer},getUsers:function(e){var t=this;console.log("oooo",e);var a=e;a.forEach(function(e){e=JSON.parse(e),t.checkedUserInfo.push(e)})}}};t.default=r},dcd5:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"page"},[a("v-uni-form",{staticClass:"page-section",on:{submit:function(t){t=e.$handleEvent(t),e.formSubmit(t)}}},[a("v-uni-view",{staticClass:"page-section-title"},[e._v("*奖扣标题")]),a("v-uni-view",{staticClass:"page-section-demo"},[a("v-uni-textarea",{staticStyle:{"font-size":"26upx"},attrs:{name:"title","auto-height":"true",maxlength:"-1"}})],1),a("hr"),a("v-uni-view",{staticClass:"page-section-title"},[e._v("*奖扣内容")]),a("v-uni-view",{staticClass:"page-section-demo"},[a("v-uni-textarea",{staticStyle:{"font-size":"26upx"},attrs:{name:"content","auto-height":"true",maxlength:"-1"}})],1),a("hr"),a("v-uni-view",[a("v-uni-label",[e._v("积分类型：")]),a("v-uni-input",{attrs:{type:"text",value:e.types[e.arrIndexType].name,name:"type",disabled:"true"}})],1),a("hr"),a("v-uni-view",{staticClass:"page-section-title"},[e._v("备注")]),a("v-uni-view",{staticClass:"page-section-demo"},[a("v-uni-textarea",{staticStyle:{"font-size":"28upx"},attrs:{"auto-height":"true",name:"remark"}})],1),a("hr"),a("v-uni-view",[a("v-uni-view",{staticClass:"uni-title"},[e._v("可用积分"+e._s(e.allPoints))]),a("v-uni-radio-group",{attrs:{name:"radioPoints"},on:{change:function(t){t=e.$handleEvent(t),e.radioPointsChange(t)}}},e._l(e.radioG_points,function(t,i){return a("v-uni-label",{key:t.value},[a("v-uni-radio",{attrs:{value:t.value,checked:t.checked}}),a("v-uni-text",[e._v(e._s(t.name))])],1)}),1),a("v-uni-view",[a("v-uni-label",{directives:[{name:"show",rawName:"v-show",value:0==e.radioPointCurr,expression:"radioPointCurr == 0"}],attrs:{for:"addIntegral"}},[e._v("奖励积分："),a("v-uni-input",{attrs:{type:"text",id:"addIntegral",name:"addIntegral"}})],1),a("v-uni-label",{directives:[{name:"show",rawName:"v-show",value:1==e.radioPointCurr,expression:"radioPointCurr == 1"}],attrs:{for:"delIntegral"}},[e._v("扣除积分："),a("v-uni-input",{attrs:{type:"text",id:"delIntegral",name:"delIntegral"}})],1)],1)],1),a("v-uni-view",{staticClass:"select-section"},[a("v-uni-view",{staticClass:"title"},[e._v("*选择员工"),a("v-uni-text",{staticClass:"details"},[e._v("可选择多人")])],1),a("v-uni-view",{staticClass:"add-wrapper"},[a("v-uni-text",{staticClass:"add",on:{click:function(t){t=e.$handleEvent(t),e.showDrawer(t)}}},[e._v("+")])],1),e._l(e.checkedUserInfo,function(t,i){return a("v-uni-view",{staticClass:"add-wrapper"},[a("v-uni-text",{staticClass:"name"},[e._v(e._s(t.userName))])],1)})],2),a("chooseUser",{attrs:{showDrawerFlag:e.showUserDrawer},on:{toggleUserDrawer:function(t){t=e.$handleEvent(t),e.toggleDrawer(t)},getUsers:function(t){t=e.$handleEvent(t),e.getUsers(t)}}}),a("v-uni-button",{staticClass:"button-form",attrs:{"form-type":"submit",type:"primary",loading:e.loading,disabled:e.disabled}},[e._v("提交")])],1)],1)},n=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return n})},dd86:function(e,t,a){"use strict";a.r(t);var i=a("e861"),n=a("951b");for(var s in n)"default"!==s&&function(e){a.d(t,e,function(){return n[e]})}(s);a("2bf5");var r=a("2877"),o=Object(r["a"])(n["default"],i["a"],i["b"],!1,null,"0ceff71e",null);t["default"]=o.exports},e861:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("uni-drawer",{attrs:{visible:e.showDrawerFlag,mode:"left"}},[a("v-uni-form",{on:{submit:function(t){t=e.$handleEvent(t),e.formSubmit(t)}}},[a("v-uni-scroll-view",{style:"height:"+e.winH+"px;",attrs:{"scroll-y":"true"},on:{scrolltolower:function(t){t=e.$handleEvent(t),e.lower(t)}}},[e.users.length>0?a("v-uni-view",[a("v-uni-checkbox-group",{attrs:{name:"userCheckBox"}},e._l(e.users,function(t){return a("v-uni-label",{key:t.userId,staticClass:"uni-list-cell uni-list-cell-pd"},[a("v-uni-view",{staticClass:"checkbox"},[a("v-uni-image",{attrs:{src:t.avatar?t.avatar:"/static/img/default_user_icon.png"}}),a("v-uni-text",{staticClass:"checkbox-text"},[e._v(e._s(t.userName))]),a("v-uni-text",{staticClass:"checkbox-details"},[e._v(e._s(t.deptName))])],1),a("v-uni-view",[a("v-uni-checkbox",{attrs:{value:JSON.stringify(t),checked:t.checked}})],1)],1)}),1)],1):a("v-uni-view",{staticClass:"uni-noData-txt"},[e._v("暂无数据")]),e.users.length>0&&!e.hasNextPage?a("v-uni-view",{staticClass:"uni-noMore-txt"},[e._v("无更多数据")]):e._e()],1),a("v-uni-view",{staticClass:"page-section-btns"},[a("v-uni-view",[a("v-uni-button",{attrs:{size:"mini"},on:{click:function(t){t=e.$handleEvent(t),e.closeDrawer(t)}}},[e._v("取消")])],1),e.reset?a("v-uni-view",[a("v-uni-button",{attrs:{size:"mini",type:"warn",formType:"submit"}},[e._v("重置")])],1):a("v-uni-view",[a("v-uni-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){t=e.$handleEvent(t),e.all(t)}}},[e._v("选择全部")])],1),a("v-uni-view",[a("v-uni-button",{attrs:{size:"mini",formType:"submit"}},[e._v("确定")])],1)],1)],1)],1)},n=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return n})},fb19:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={name:"UniDrawer",props:{visible:{type:Boolean,default:!1},mode:{type:String,default:""},mask:{type:Boolean,default:!0}},data:function(){return{visibleSync:!1,showDrawer:!1,rightMode:!1}},watch:{visible:function(e){var t=this;clearTimeout(this.watchTimer),setTimeout(function(){t.showDrawer=e},100),this.visibleSync&&clearTimeout(this.closeTimer),e?this.visibleSync=e:this.watchTimer=setTimeout(function(){t.visibleSync=e},300)}},created:function(){var e=this;this.visibleSync=this.visible,setTimeout(function(){e.showDrawer=e.visible},100),this.rightMode="right"===this.mode},methods:{close:function(){var e=this;this.showDrawer=!1,this.closeTimer=setTimeout(function(){e.visibleSync=!1,e.$emit("close")},200)},moveHandle:function(){}}};t.default=i}}]);