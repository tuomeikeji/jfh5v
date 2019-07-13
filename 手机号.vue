<!-- 
* 普通员工1: 18032253930 黄思
* 普通员工2: 15230829213 郭家旭
* 领导: 15176130909 张丽梅
* 申诉人：13131136775 和玉
* 
*光电部 19943483698  陈新
* 光电部 18832211362  魏烨
* 光电部 18733139198  郑丽欣
* 
* http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg
* http://image.vshi5.com/img_jfb/2018/7/25/2f7b5d4b8fa24121a1fe2bb15228b152.jpg
* 
* :style="item.status == '0' ? 'color:#FFCC33':(item.status == '1' ? 'color:#1AA034' : 'color:#e74958')"
* {{item.typeId == '1' ? '品德A分' : (item.typeId == '2' ? '业绩B分' : (item.typeId == '3' ? '行为C分': (item.typeId == '4' ? '管理奖扣分':(item.typeId == '5' ? '自由奖扣分':(item.typeId == '6' ? '点赞分':(item.typeId == '7' ? '悬赏任务分':(item.typeId == '8' ? '积分支票':(item.typeId == '9' ? '水平考核分':''))))))))}}
*  {{item.sqIntegral>0 ? '+' : '-'}}{{item.sqIntegral>0 ? item.sqIntegral:item.kIntegral}}
* 
*  this.axios
* this.$qs.stringify
* 
* .then((res)=>{
	 
  })
  .catch((res)=>{
	  
  })
  * 
  * ,{arrayFormat: 'repeat'}
  * 
  * qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' })
	// 'a[0]=b&a[1]=c'
	qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' })
	// 'a[]=b&a[]=c'
	qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' })
	// 'a=b&a=c'
  * 
* -->
<template>
</template>

<script>
</script>

<style>
</style>
