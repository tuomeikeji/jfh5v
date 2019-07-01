
 // <!-- http://47.104.172.206:1002 -->
 // <!-- http://192.168.255.69:1002 -->http://192.168.255.1009
 //  http://118.190.208.221:1002
export default
  {
	level:'',
	id:'',
	domain:'http://118.190.208.221:1002',
	setUserLevel(level){
		this.level = level;	
	},
	setUserId(id){
		this.id = id;
	},
	successHttp(res){
		//数据请求成功
		var res = res;
		if(res.statusCode != 200){
			uni.showModal({
				content: '访问出错，请重新登陆', confirmText: '确定',showCancel: false,
				success() {
					uni.reLaunch({ url: '/pages/jf/login/login' });
				}
			});
		}else if(res.data.code != 0){
			if(res.data.code == 1001 || res.data.code == 2018){
				//session失效 重新登陆
				uni.showModal({
					content: res.data.msg, confirmText: '确定',showCancel: false,
					success() {
						uni.reLaunch({ url: '/pages/jf/login/login' });
					}
				});
			}
		}
	},
	failHttp(res){
		//数据请求失败
		var res = res;
		if(res.errMsg == 'request:fail'){
			uni.showModal({
				content: '访问出错，请重新登陆', confirmText: '确定',showCancel: false,
				success() {
					uni.reLaunch({ url: '/pages/jf/login/login' });
				}
			});
		}
	}
  }

