<!-- 水平考核详情 -->
<template>
	<view class="uni-page-body" style="background-color: #FFFFFF;">
		<form @submit="formSubmit" class="page-form">
			<block v-for="(item,index) in listData" :key="index" class="list-block">
			  <view class="section" style="padding-top: 20upx;">
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
				this.axios({
				  url: this.GLOBAL.domain + '/Leveltitle/LevelTitleController/' + this.levelId,
				  method: 'POST',
				  dataType: 'json',
				  header:{
				  	'content-type':'application/x-www-form-urlencoded'
				  },
				  data:this.$qs.stringify({
					levelId :Number(this.levelId),
					pageSize: '100',
					pageNum: '1'
				  })
				})
				.then((res)=>{
					console.log('success_LevelDetails----', res);
					this.GLOBAL.successHttp(res);
					this.listData = res.data.data.list;
					
					uni.hideLoading();
				})
				.catch((res)=>{
					console.log("Fail_LevelDetails----", res)
					this.GLOBAL.failHttp(res);  
					
					uni.hideLoading();
				})
			},
			formSubmit: function(e) {
				var that = this
				
				console.log('formSubmit----', e.detail.value)
			
				var radioGroupJson = e.detail.value
				var radioGroupArr = []
			
				for (var prop in radioGroupJson) {
				  var tIndex = radioGroupJson[prop].split("_")[0]
				  var tId = radioGroupJson[prop].split("_")[1]
			
				  var radioSingleAnswer = {"tEnd":tIndex,"tId":tId}
				  radioGroupArr.push(radioSingleAnswer)
				  
				  that. answerArr = radioGroupArr
				}
				
				console.log('最后传参：','modifyArr:',that.answerArr,',levelId:',that.levelId,',shenQingFangShi:',that.shenQingFangShi)
				
				that.loading = true;
				that.disabled = true;
				uni.showLoading({
					title:"提交中"
				})
				that.axios({
				  url: this.GLOBAL.domain + '/Leveltitle/servehotselectiveajax',
				  method: 'POST',
				  dataType: 'json',
				  header:{
					'content-type':'application/json'
					// 'content-type':'application/x-www-form-urlencoded'
				  },
				  // JSON.stringify
				  data:that.$qs.stringify(
					{
						"modifyArr": that.answerArr,
						"levelId": that.levelId,
						"shenQingFangShi": that.shenQingFangShi
					},{arrayFormat: 'indices'})
				})
				.then((res)=>{
					console.log('success_levelTest_提交测试----', res);
					that.GLOBAL.successHttp(res);
					
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
					
					uni.hideLoading();
					that.disabled = false;
					that.loading = false;
				})
				.catch((res)=>{
					console.log("fail_levelTest_提交测试---", res);
					that.GLOBAL.failHttp(res);
					
					uni.hideLoading();
					that.disabled = false;
					that.loading = false;
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
	
	<!-- that.axios.post(that.GLOBAL.domain + '/Leveltitle/servehotselectiveajax',that.$qs.stringify({
		"data":JSON.stringify({modifyArr: that.answerArr,levelId: that.levelId,shenQingFangShi: that.shenQingFangShi})
	}),{"headers":{'content-type':'application/json'}}}) -->