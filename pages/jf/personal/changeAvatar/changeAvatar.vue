<!-- 更换头像 -->
<template>
	<view class="">
		<view class="avatar" v-show="showAvatar">
			<image :src="userAvatar" mode="aspectFill"></image>
		</view>
		<view class="editIcon" @click="uploadImg">
			<image src="/static/img/plus.png" mode="aspectFit"></image>
		</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				userAvatar:'',
				showAvatar:false
			}
		},
		methods:{
			uploadImg(){
				var that = this;
				uni.chooseImage({
					sourceType:['album','camera'],
					success(res){
						console.log('图片临时地址:', JSON.stringify(res.tempFilePaths));
						let tempFile = res.tempFilePaths
						uni.uploadFile({
							url:that.GLOBAL.domain+'/upload/uploadFile',
							filePath:tempFile[0],
							name: 'file',
							success(res) {
								console.log('线上图片路径：',JSON.parse(res.data).data);
								let resData = JSON.parse(res.data);
								that.userAvatar = resData.data;
								that.showAvatar = true
								
								that.axios({
									url:that.GLOBAL.domain+'/personal/Tupian',
									method: 'POST',
									dataType: 'json',
									header:{
										'content-type':'application/x-www-form-urlencoded'
									},
									data:that.$qs.stringify({
										avatar:that.userAvatar
									})
								})
								.then((res)=>{
									console.log('success_修改头像',res)
									that.GLOBAL.successHttp(res);
									
									uni.showToast({
										title:'修改成功'
									}) 
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	.editIcon,.avatar{
		width: 200upx;
		height: 200upx;
		background: #EEEEEE;
		margin: 0 auto;
		margin-top: 30upx;
	}
	.editIcon image,.avatar image{
		width: 100%;
		height: 100%;
	}
</style>
