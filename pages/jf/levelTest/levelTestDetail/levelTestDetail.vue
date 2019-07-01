<!-- 水平考核详情 -->
<template>
	<view class="uni-page-body" style="padding-bottom: 40upx;">
		<form @submit="formSubmit" class="page-form">
			<block v-for="(item,index) in listData" :key="index" class="list-block">
			  <view class="section">
				<view class="section_title" style="padding:0 30upx;">
				  <text class="uni-title">{{index+1}}、{{item.tName}}</text>
				  <text class="uni-text">（答对得{{item.tIntegral}}分）</text>
				</view>
				<radio-group :name="'radio-group-'+item.tId" class="radio-group" onChange="radioChange">
				  <label><radio :value="'0_'+item.tId" :checked="item.checked"/><text class="radio-txt">{{item.tA}}</text></label><view class="form-line" />
				  <label><radio :value="'1_'+item.tId" :checked="item.checked"/><text class="radio-txt">{{item.tB}}</text></label><view class="form-line" />
				  <label><radio :value="'2_'+item.tId" :checked="item.checked"/><text class="radio-txt">{{item.tC}}</text></label><view class="form-line" />
				  <label><radio :value="'3_'+item.tId" :checked="item.checked"/><text class="radio-txt">{{item.tD}}</text></label><view class="form-line" />
				</radio-group>
			  </view>
			</block>
			<button form-type="submit" type="primary" :loading="loading" :disabled="disabled" class="button-form" style="margin-top: 100upx;">提交</button>
	  </form>
  </view>
</template>

<script>
	export default{
		data(){
			return{
				loading: false,
				disabled:false,
				
				options: {},
				listData: [],
				levelId: "", //大题id
				shenQingFangShi: "", //申请方式 
				testStatus: "0", //是否已考核 
				assName: "",//大题题目
				numberid:"",
				answerArr: []
			}
		},
		onLoad(options) {
			console.log("上一级页面链接中带的参数",options)
			
			this.levelId = options.levelId,
			this.assName = options.assName,
			this.shenQingFangShi = options.shenQingFangShi,
			this.testStatus = options.testStatus,
			this.numberid = options.numberid
			
		},
		onShow() {
			this.getList();
		},
		methods: {
			getList(){
				uni.showLoading({title: '加载中...'});
				uni.request({
				  url: this.GLOBAL.domain + '/Leveltitle/LevelTitleController/' + this.levelId,
				  method: 'POST',
				  dataType: 'json',
				  header:{
				  	'content-type':'application/x-www-form-urlencoded'
				  },
				  data:{
					levelId :Number(this.levelId),
					pageSize: '100',
					pageNum: '1'
				  },
				  success: (res) => {
					console.log('success_LevelDetails----', res);
					this.GLOBAL.successHttp(res);
					this.listData = res.data.data.list;
				  },
				  fail: (res) => {
					console.log("Fail_LevelDetails----", res)
					this.GLOBAL.failHttp(res);
				  },
				  complete() {
				  	uni.hideLoading();
				  }
				})
			},
			formSubmit: function(e) {
				console.log('formSubmit----', e.detail.value)
			
				var radioGroupJson = e.detail.value
				var radioGroupArr = []
			
				for (var prop in radioGroupJson) {
				  var tIndex = radioGroupJson[prop].split("_")[0]
				  var tId = radioGroupJson[prop].split("_")[1]
			
				  var radioSingleAnswer = {"tEnd":tIndex,"tId":tId}
				  radioGroupArr.push(radioSingleAnswer)
				  
				  this. answerArr = radioGroupArr
				}
				
				console.log('最后传参：','modifyArr:',this.answerArr,',levelId:',this.levelId,',shenQingFangShi:',this.shenQingFangShi)
				
				this.loading = true;
				this.disabled = true;
				uni.showLoading({
					title:"提交中"
				})
				uni.request({
				  url: this.GLOBAL.domain + '/Leveltitle/servehotselectiveajax',
				  method: 'POST',
				  dataType: 'json',
				  header:{
				 	'content-type':'application/json;charsetset=UTF-8'
				  },
				  data:JSON.stringify({
					modifyArr: this.answerArr,
					levelId: this.levelId,
					shenQingFangShi: this.shenQingFangShi
				  }),
				  success: (res) => {
					console.log('successApp----', res);
					this.GLOBAL.successHttp(res);
					
					if(res.data.code == 0){
						uni.showModal({
							showCancel:false,
							content:"提交成功",
							success(res) {
								if(res.confirm){
									uni.navigateBack()
								}
							}
						})
					}else{
						uni.showModal({
							showCancel:false,
							content:res.data.msg,
						})
					}
					
					
				  },
				  fail: (res) => {
					console.log("httpRequestFailApp----", res)
					var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});
				  },
				  complete: () => {
					uni.hideLoading();
					this.disabled = false;
					this.loading = false;
				  }
				})
			}
		}
	}
	
</script>

<style>
	.radio-group label{
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		display: block;
		width: 100%;
		padding: 20upx 30upx;
	}
	
</style>
