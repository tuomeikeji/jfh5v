(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-jf-complaint-formSubmit-complaintSubmit"],{"187f":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"uni-page-body",staticStyle:{"background-color":"#FFFFFF"}},[a("v-uni-form",{staticClass:"page-section",on:{submit:function(t){t=e.$handleEvent(t),e.formSubmit(t)}}},[a("v-uni-view",{staticClass:"page-section-title"},[e._v("标题：")]),a("v-uni-view",{staticClass:"page-section-demo"},[a("v-uni-textarea",{attrs:{name:"title","auto-height":"true",maxlength:"-1",value:e.options.title,disabled:"true"}})],1),a("v-uni-view",{staticClass:"form-line"}),a("v-uni-view",{staticClass:"page-section-title"},[e._v("内容：")]),a("v-uni-view",{staticClass:"page-section-demo"},[a("v-uni-textarea",{attrs:{name:"content","auto-height":"true",maxlength:"-1",value:e.options.content,disabled:"true"}})],1),a("v-uni-view",{staticClass:"form-line"}),a("v-uni-view",{staticClass:"clear"},[a("v-uni-label",{staticClass:"page-section-lable"},[e._v("积分类型：")]),a("v-uni-input",{staticClass:"page-section-input",attrs:{name:"type",disabled:"true",value:"1"==e.options.type?"品德A分":"2"==e.options.type?"业绩B分":"3"==e.options.type?"行为C分":"4"==e.options.type?"管理奖扣分":"5"==e.options.type?"自由奖扣分":"6"==e.options.type?"点赞分":"7"==e.options.type?"悬赏任务分":"8"==e.options.type?"积分支票":"9"==e.options.type?"水平考核分":""}})],1),a("v-uni-view",{staticClass:"form-line"}),a("v-uni-view",{staticClass:"page-section-title"},[e._v("备注：")]),a("v-uni-view",{staticClass:"page-section-demo"},[a("v-uni-textarea",{attrs:{"auto-height":"true",disabled:"true",name:"remark",vlaue:"options.remark ? options.remark: '无'"}})],1),a("v-uni-view",{staticClass:"form-line"}),a("v-uni-view",{staticClass:"page-section-title"},[a("v-uni-text",{staticClass:"uni-text-red"},[e._v("*")]),e._v("申诉理由：")],1),a("v-uni-view",{staticClass:"page-section-demo"},[a("v-uni-textarea",{attrs:{"auto-height":"",placeholder:"输入申诉理由",name:"reason"}})],1),a("v-uni-view",{staticClass:"form-line"}),a("v-uni-view",{staticClass:"select-section"},[a("robby-image-upload",{attrs:{"server-url":e.serverUrl},on:{delete:function(t){t=e.$handleEvent(t),e.deleteImage(t)},add:function(t){t=e.$handleEvent(t),e.addImage(t)}},model:{value:e.imageData,callback:function(t){e.imageData=t},expression:"imageData"}})],1),a("v-uni-view",{staticClass:"form-line"}),a("v-uni-picker",{attrs:{value:e.arrIndexPoints,range:e.pointsArray,name:"points"},on:{change:function(t){t=e.$handleEvent(t),e.changePoints(t)}}},[a("v-uni-view",{staticClass:"row"},[a("v-uni-view",{staticClass:"row-title"},[e._v("申请积分")]),a("v-uni-view",{staticClass:"row-extra"},[e._v("当前选择："+e._s(e.pointsArray[e.arrIndexPoints]))]),a("v-uni-image",{staticClass:"row-arrow",attrs:{src:"/static/img/arrowright.png",mode:"aspectFill"}})],1)],1),a("v-uni-view",{staticClass:"form-line"}),a("v-uni-picker",{attrs:{value:e.arrIndexApply,range:e.apply,"range-key":"userName",name:"apply"},on:{change:function(t){t=e.$handleEvent(t),e.changeApply(t)}}},[a("v-uni-view",{staticClass:"row"},[a("v-uni-view",{staticClass:"row-title"},[e._v("申请人")]),a("v-uni-view",{staticClass:"row-extra"},[e._v("当前选择："+e._s(e.apply[e.arrIndexApply].userName))]),a("v-uni-image",{staticClass:"row-arrow",attrs:{src:"/static/img/arrowright.png",mode:"aspectFill"}})],1)],1),a("v-uni-view",{staticClass:"form-line"}),a("v-uni-picker",{attrs:{value:e.arrIndexApprover,range:e.approver,"range-key":"userName",name:"approver"},on:{change:function(t){t=e.$handleEvent(t),e.changeApprover(t)}}},[a("v-uni-view",{staticClass:"row"},[a("v-uni-view",{staticClass:"row-title"},[e._v("审批人")]),a("v-uni-view",{staticClass:"row-extra"},[e._v("当前选择："+e._s(e.approver[e.arrIndexApprover].userName))]),a("v-uni-image",{staticClass:"row-arrow",attrs:{src:"/static/img/arrowright.png",mode:"aspectFill"}})],1)],1),a("v-uni-view",{staticClass:"form-line"}),a("v-uni-picker",{attrs:{onChange:"changeTo",value:e.arrIndexTo,range:e.ssuser,"range-key":"userName",name:"ssuser"}},[a("v-uni-view",{staticClass:"row"},[a("v-uni-view",{staticClass:"row-title"},[e._v("申诉人")]),a("v-uni-view",{staticClass:"row-extra"},[e._v("当前选择："+e._s(e.ssuser[e.arrIndexTo].userName))]),a("v-uni-image",{staticClass:"row-arrow",attrs:{src:"/static/img/arrowright.png",mode:"aspectFill"}})],1)],1),a("v-uni-view",{staticClass:"form-line"}),a("v-uni-view",{staticClass:"select-section",staticStyle:{"padding-top":"20upx"}},[a("v-uni-view",{staticClass:"title"},[e._v("抄送"),a("v-uni-text",{staticClass:"details"},[e._v("审批通过后，通知抄送人")])],1),a("v-uni-view",{staticClass:"add-wrapper"},[a("v-uni-text",{staticClass:"addIcon",on:{click:function(t){t=e.$handleEvent(t),e.showDrawer(t)}}},[e._v("+")])],1),e._l(e.checkedUserInfo,function(t,i){return a("v-uni-view",{staticClass:"add-wrapper"},[a("v-uni-image",{staticClass:"addIcon",attrs:{src:t.avatar?t.avatar:"/static/img/default_user_icon.png"}}),a("v-uni-text",{staticClass:"name"},[e._v(e._s(t.userName))])],1)})],2),a("chooseUser",{attrs:{showDrawerFlag:e.showUserDrawer,getUsersUrl:e.getUsersUrl,checkedUserItem:e.checkedUserItem},on:{toggleUserDrawer:function(t){t=e.$handleEvent(t),e.toggleDrawer(t)},getUsers:function(t){t=e.$handleEvent(t),e.getUsers(t)}}}),a("v-uni-button",{staticClass:"button-form",attrs:{"form-type":"submit",type:"primary",loading:e.loading,disabled:e.disabled}},[e._v("提交")])],1)],1)},s=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return s})},"30f7":function(e,t,a){"use strict";a.r(t);var i=a("187f"),s=a("a52e");for(var n in s)"default"!==n&&function(e){a.d(t,e,function(){return s[e]})}(n);var o=a("2877"),r=Object(o["a"])(s["default"],i["a"],i["b"],!1,null,"43feba0c",null);t["default"]=r.exports},"3d0d":function(e,t,a){"use strict";var i=a("bd6c"),s=a.n(i);s.a},"46ce":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(a("aa1e")),s=o(a("697c")),n=o(a("6e9f"));function o(e){return e&&e.__esModule?e:{default:e}}var r={components:{robbyImageUpload:i.default,uniDrawer:s.default,chooseUser:n.default},data:function(){return{options:{},arrIndexPoints:0,arrIndexApprover:0,arrIndexApply:0,arrIndexTo:0,pointsArray:[],approver:[],apply:[],copy:[],ssuser:[],loading:!1,disabled:!1,showUserDrawer:!1,checkedUserInfo:[],getUsersUrl:"/work/declareBehaviorDetail/selectAllDeptUser",checkedUserItem:[],upLoadImgFile:[],enableDel:!1,enableAdd:!1,limitNumber:9,imageData:[],serverUrl:this.GLOBAL.domain+"/upload/uploadFile"}},onLoad:function(e){console.log(e),this.options=e,this.pointsArray=[e.points],this.getApply(),this.getApprover(),this.getssUser()},methods:{deleteImage:function(e){console.log(e)},addImage:function(e){console.log("addImage==",e);for(var t=[],a=0;a<e.allImages.length;a++)t.push(JSON.parse(e.allImages[a]).data);this.upLoadImgFile=t,console.log("页面upLoadImgFiles",this.upLoadImgFile)},getssUser:function(){var e=this;this.axios({url:this.GLOBAL.domain+"/complaint/selectComplaintPel",method:"GET",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"}}).then(function(t){console.log("success_selectComplaintPel_获取申诉人",t),0==t.data.code&&e.ssuser.push(t.data.data.user)}).catch(function(t){console.log("fail__selectComplaintPel_获取申诉人",t),e.GLOBAL.failHttp(t)})},getApprover:function(){var e=this;this.axios({url:this.GLOBAL.domain+"/work/declareBehaviorDetail/approverPel",method:"POST",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"}}).then(function(t){console.log("success_获取审批人",t),e.GLOBAL.successHttp(t),0==t.data.code&&e.approver.push(t.data.data)}).catch(function(t){console.log("fail_获取审批人",t),e.GLOBAL.failHttp(t)})},getApply:function(){var e=this;this.axios({url:this.GLOBAL.domain+"/work/selectSysUser",method:"POST",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"}}).then(function(t){console.log("success_获取申请人",t),e.GLOBAL.successHttp(t),0==t.data.code&&e.apply.push(t.data.data)}).catch(function(t){console.log("fail_获取申请人",t),e.GLOBAL.failHttp(t)})},changePoints:function(e){console.log("picker发送选择改变，携带值为",e.detail.value),this.arrIndexPoints=e.detail.value},changeApply:function(e){console.log("picker发送选择改变，携带值为",e.detail.value),this.arrIndexApply=e.detail.value},changeApprover:function(e){console.log("picker发送选择改变，携带值为",e.detail.value),this.arrIndexApprover=e.detail.value},changeSsUser:function(e){console.log("picker发送选择改变，携带值为",e.detail.value),this.arrIndexTo=e.detail.value},formSubmit:function(e){console.log("form发生了submit事件，携带数据为："+JSON.stringify(e.detail.value));var t=this,a=[];t.checkedUserInfo.forEach(function(e){a.push(e.userId)});var i=t.ssuser[e.detail.value.ssuser].userId,s=t.options.approvalId,n=e.detail.value.reason;if(console.log("appPelId:"+i+",approvalId:"+s+",appReason:"+n+",pic:"+[t.upLoadImgFile]+",usersId"+a),!n)return uni.showModal({content:"请您填写关键内容",showCancel:!1}),!1;uni.showLoading({mask:!0,title:"提交中..."}),t.loading=!0,t.disabled=!0,t.axios({url:t.GLOBAL.domain+"/complaint/addComplaint",method:"POST",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},data:this.$qs.stringify({approvalId:s,pic:t.upLoadImgFile,appReason:n,appPelId:i,to:a},{arrayFormat:"repeat"})}).then(function(e){console.log("success_申请成功----",e),t.GLOBAL.successHttp(e),uni.showModal({content:"申请成功",confirmText:"确定",showCancel:!1,success:function(){uni.navigateBack()}}),t.loading=!1,t.disabled=!1,uni.hideLoading()}).catch(function(e){console.log("fail_申请失败",e),t.GLOBAL.failHttp(e),t.loading=!1,t.disabled=!1,uni.hideLoading()})},showChooseImgDrawer:function(){this.ChooseImgDrawer=!0},closeDrawer:function(){this.ChooseImgDrawer=!1},showDrawer:function(){this.showUserDrawer=!0},toggleDrawer:function(){this.showUserDrawer=!this.showUserDrawer},getUsers:function(e){var t=this;this.checkedUserInfo=[],this.checkedUserItem=[];var a=e;a.forEach(function(e){e=JSON.parse(e),t.checkedUserInfo.push(e),t.checkedUserItem.push(e)})}}};t.default=r},4916:function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,".imageUploadContainer[data-v-0f93652a]{padding:%?10?% %?5?%;margin:%?10?% %?5?%}.dragging[data-v-0f93652a]{-webkit-transform:scale(1.2);-ms-transform:scale(1.2);transform:scale(1.2)}.imageUploadList[data-v-0f93652a]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.imageItem[data-v-0f93652a],.imageUpload[data-v-0f93652a]{width:%?160?%;height:%?160?%;margin:%?10?%}.imageDel[data-v-0f93652a]{position:relative;left:%?120?%;bottom:%?165?%;background-color:rgba(0,0,0,.5);width:%?36?%;text-align:center;line-height:%?35?%;-webkit-border-radius:%?17?%;border-radius:%?17?%;color:#fff;font-size:%?30?%;padding-bottom:%?2?%}.imageItem uni-image[data-v-0f93652a],.moveImage[data-v-0f93652a]{width:%?160?%;height:%?160?%;-webkit-border-radius:%?8?%;border-radius:%?8?%}.imageUpload[data-v-0f93652a]{line-height:%?140?%;text-align:center;font-size:%?150?%;color:#d9d9d9;border:%?1?% solid #d9d9d9;-webkit-border-radius:%?8?%;border-radius:%?8?%}.moveImage[data-v-0f93652a]{position:absolute}",""])},"583a":function(e,t,a){"use strict";var i;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s={name:"robby-image-upload",props:["value","enableDel","enableAdd","enableDrag","serverUrl","formData","limit","fileKeyName","showUploadProgress","serverUrlDeleteImage"],data:function(){return{imageBasePos:{x0:-1,y0:-1,w:-1,h:-1},showMoveImage:!1,moveImagePath:"",moveLeft:0,moveTop:0,deltaLeft:0,deltaTop:0,dragIndex:null,targetImageIndex:null}},computed:{posMoveImageLeft:function(){return this.moveLeft+"px"},posMoveImageTop:function(){return this.moveTop+"px"},isShowDel:function(){return!1!==this.enableDel},isShowAdd:function(){return!1!==this.enableAdd&&!(this.limit&&this.value.length>=this.limit)},isDragable:function(){return!1!==this.enableDrag}},methods:{selectImage:function(){i=this,i.value||(i.value=[]),uni.chooseImage({count:i.limit?i.limit-i.value.length:999,success:function(e){var t=e.tempFilePaths;if(i.limit){var a=i.limit-i.value.length;if(a<t.length)return void uni.showToast({title:"图片总数限制为"+i.limit+"张，当前还可以选"+a+"张",icon:"none",mask:!1,duration:2e3})}for(var s=0;s<t.length;s++)i.value.push(t[s]);if(i.serverUrl){for(var n=i.value.length-t.length,o=[],r=i.fileKeyName?i.fileKeyName:"file",l=0,u=function(e){o.push(new Promise(function(a,s){var o=n+e;uni.uploadFile({url:i.serverUrl,fileType:"image",formData:i.formData,filePath:t[e],name:r,success:function(e){200===e.statusCode?(i.value[o]=e.data,l++,i.showUploadProgress&&uni.showToast({title:"上传进度："+l+"/"+t.length,icon:"none",mask:!1,duration:1e3}),console.log("success to upload image: "+e.data),a("success to upload image:"+o)):(console.log("fail to upload image:"+e.data),s("failt to upload image:"+o))},fail:function(e){console.log("fail to upload image:"+e),s("failt to upload image:"+o)}})}))},c=0;c<t.length;c++)u(c);Promise.all(o).then(function(e){i.$emit("add",{currentImages:t,allImages:i.value}),i.$emit("input",i.value)})}else i.$emit("add",{currentImages:t,allImages:i.value}),i.$emit("input",i.value)}})},deleteImage:function(e){var t=e.currentTarget.dataset.index,a=this.value[t];this.value.splice(t,1),this.serverUrlDeleteImage&&this.axios({url:this.serverUrlDeleteImage,method:"GET",data:this.$qs.stringify({imagePath:a})}).then(function(e){console.log(e.data)}).catch(function(e){}),this.$emit("delete",{currentImage:a,allImages:this.value}),this.$emit("input",this.value)},previewImage:function(e){var t=e.currentTarget.dataset.index;console.log("插件中this.value",this.value);for(var a=[],i=0;i<this.value.length;i++)a.push(JSON.parse(this.value[i]).data);console.log("插件中uploadUrls",a),uni.previewImage({current:JSON.parse(this.value[t]).data,indicator:"number",loop:"true",urls:a})},initImageBasePos:function(){var e=.024;i=this,uni.getSystemInfo({success:function(t){var a=t.screenWidth,s=Math.ceil(e*a),n=Math.ceil((a-2*s)/4);i.imageBasePos.x0=s,i.imageBasePos.w=n,i.imageBasePos.h=n}})},findOverlapImage:function(e,t){var a=Math.floor((e-this.imageBasePos.x0)/this.imageBasePos.w),i=Math.floor((t-this.imageBasePos.y0)/this.imageBasePos.h),s=4*i+a;return s},isDragging:function(e){return this.dragIndex===e},start:function(e){if(this.isDragable){if(this.dragIndex=e.currentTarget.dataset.index,this.moveImagePath=this.value[this.dragIndex],this.showMoveImage=!0,-1===this.imageBasePos.y0){this.initImageBasePos();var t=Math.floor(this.dragIndex/4)*this.imageBasePos.h,a=e.currentTarget.offsetTop;this.imageBasePos.y0=a-t}this.moveLeft=e.target.offsetLeft,this.moveTop=e.target.offsetTop}},move:function(e){if(this.isDragable){var t=e.touches[0];this.targetImageIndex=this.findOverlapImage(t.clientX,t.clientY),0===this.deltaLeft&&(this.deltaLeft=t.clientX-this.moveLeft,this.deltaTop=t.clientY-this.moveTop),this.moveLeft=t.clientX-this.deltaLeft,this.moveTop=t.clientY-this.deltaTop}},stop:function(e){this.isDragable&&(null!==this.dragIndex&&null!==this.targetImageIndex&&(this.targetImageIndex<0&&(this.targetImageIndex=0),this.targetImageIndex>=this.value.length&&(this.targetImageIndex=this.value.length-1),this.dragIndex!==this.targetImageIndex&&(this.value[this.dragIndex]=this.value[this.targetImageIndex],this.value[this.targetImageIndex]=this.moveImagePath)),this.dragIndex=null,this.targetImageIndex=null,this.deltaLeft=0,this.deltaTop=0,this.showMoveImage=!1,this.$emit("input",this.value))}}};t.default=s},"621f":function(e,t,a){"use strict";a.r(t);var i=a("583a"),s=a.n(i);for(var n in i)"default"!==n&&function(e){a.d(t,e,function(){return i[e]})}(n);t["default"]=s.a},"86fa":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"imageUploadContainer"},[a("v-uni-view",{staticClass:"imageUploadList"},[e._l(e.value,function(t,i){return a("v-uni-view",{key:i,staticClass:"imageItem"},[a("v-uni-image",{class:{dragging:e.isDragging(i)},attrs:{src:t,draggable:"true","data-index":i},on:{touchstart:function(t){t=e.$handleEvent(t),e.start(t)},touchmove:function(t){t=e.$handleEvent(t),e.move(t)},touchend:function(t){t=e.$handleEvent(t),e.stop(t)},click:function(t){t=e.$handleEvent(t),e.previewImage(t)}}}),e.isShowDel?a("v-uni-view",{staticClass:"imageDel",attrs:{"data-index":i},on:{click:function(t){t=e.$handleEvent(t),e.deleteImage(t)}}},[e._v("x")]):e._e()],1)}),e.isShowAdd?a("v-uni-view",{staticClass:"imageUpload",on:{click:function(t){t=e.$handleEvent(t),e.selectImage(t)}}},[e._v("+")]):e._e()],2),e.showMoveImage?a("v-uni-image",{staticClass:"moveImage",style:{left:e.posMoveImageLeft,top:e.posMoveImageTop},attrs:{src:e.moveImagePath}}):e._e()],1)},s=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return s})},a52e:function(e,t,a){"use strict";a.r(t);var i=a("46ce"),s=a.n(i);for(var n in i)"default"!==n&&function(e){a.d(t,e,function(){return i[e]})}(n);t["default"]=s.a},aa1e:function(e,t,a){"use strict";a.r(t);var i=a("86fa"),s=a("621f");for(var n in s)"default"!==n&&function(e){a.d(t,e,function(){return s[e]})}(n);a("3d0d");var o=a("2877"),r=Object(o["a"])(s["default"],i["a"],i["b"],!1,null,"0f93652a",null);t["default"]=r.exports},bd6c:function(e,t,a){var i=a("4916");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var s=a("4f06").default;s("2e6c30e3",i,!0,{sourceMap:!1,shadowMode:!1})}}]);