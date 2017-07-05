/*
* @Author: 夏本增
* @Date:   2017-06-20 12:15:21
* @Last Modified time: 2017-07-05 11:52:01
*/

'use strict';
$(function(){
	// 获取屏幕宽度，加载大小图 大图用背景 小图图片
	function resize(){
		// 获取屏幕宽度
		var windowWidth = $(window).width();
		// 判断屏幕属于大还是小
		var isSmallScreen = windowWidth < 768;
		//根据大小为界面上的每一张轮播图设置背景
		$("#slider .carousel-inner .item").each(function(index, item) {
			// 因为拿到的是DOM对象，需要转换
			var $item = $(item);
			var imgSrc = isSmallScreen ? $item.data('image-sm') : $item.data('image-lg');
			$item.css('backgroundImage', 'url("'+imgSrc+'")');
			// 因为需要小图时尺寸等比例变化，所以小图是用img方式
			if(isSmallScreen){
				$item.html('<img src="'+imgSrc+'" alt="">')
			}else{
				$item.empty();
			}
		});
	}
	$(window).on('resize',resize).trigger('resize');//trigger先运行一次


	// 控制标签页标签宽度
	var $ulContainer = $('.nav-tabs')
	//获取所有子元素宽度和
	var width = 20;
	// 遍历子元素
	$ulContainer.children().each(function(index, el) {
		// el.clientWidth
		width += $(el).width();
	});
	//判断当前ul的宽度是否超出了屏幕，如果超出就显示横向滚动条
	if(width > $(window).width()){
		$ulContainer.css('width', width).parent().css('overflow-x', 'scroll');
	}

	//a点击注册事件
	var $newsTltle = $('.news-title')
	$("#news .nav-pills a").on('click',function(){
		//获取当前点击元素
		var $this = $(this);
		//获取相应的title值
		var title = $this.data('title')
		//将title设置到相应位置
		$newsTltle.text(title);
	})

	//1 先获取手指在轮播图元素上一个滑动方向(左右)
	//获取界面轮播图组件
	var $carousel = $('.carousel');
	var startX,endX;
	var offset = 50;
	//注册滑动事件（根据坐标，手指滑动开始坐标与结束坐标，看x轴偏移）
	//手指触摸开始记录x坐标
	$carousel.on('touchstart',function(e){
		startX = e.originalEvent.touches[0].clientX;
		console.log(startX);
	})

	$carousel.on('touchmove',function(e){
		//变量重复赋值
		endX = e.originalEvent.touches[0].clientX;
	})
	//结束触摸坐标x
	$carousel.on('touchend',function(e){
		console.log(endX);
		//控制精度，获取每次运动的距离，当大于一定距离时有方向变化
		var distance = Math.abs(startX-endX);
		if (distance > offset) {
			//有方向变化
			//2 更具或得到的方向选择上一张还是下一张（可控制左右按钮）
			// 或通过原来的carousel方法实现
			$(this).carousel(startX > endX ? 'next' : 'prev');
		} 
	})
})