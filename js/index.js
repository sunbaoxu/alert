(function(win,$){
let extend  = function (_defult,opts) {
			for(let m in opts){
				_defult[m]=opts[m]
			}
			return _defult;
		}
	 var PhoneAlert = function(opts,successCallback){
	 	this.title=opts.title;
	 	this.cont=opts.cont;
	 	this.btns=opts.btns;
	 	this.yes=opts.yes;
	 	this.no=opts.no;
	 	this.successCallback=successCallback;
	 	//初始化
	 	this.init()
	 } 
	 PhoneAlert.prototype={
	 	init : function(){
	 	//添加弹框
	 		this.boxHtml();
	 	},
	 	//添加弹框
	 	boxHtml : function(){
	 		//创建元素标签
	 		let str  = '',
		 			that =  this;
		 			//添加内容
		 			str+=`<div class="ind_back" id="ind_back">
		 							<div class="indA_box" id="indA_box">
		 								<div class="indA_title" >${that.title}</div>
										<div class="indA_cont">${that.cont}</div>`;
						if(that.btns){
							str+=`<div class="indA_footer">`;
							for(let i=0;i<that.btns.length;i++){
								if(that.btns.length>1){
									str+=`<button class="minBtn" data-ind="${i}">${that.btns[i]}</button>`;
								}
								else{
									str+=`<button class="maxBtn">${that.btns[i]}</button>`;
								}	
							}
							str+=`</div>`;
						}
					str+=`</div></div>`
		 			//追加到页面中
		 			$('body').append(str);
		 			//设置弹框样式
		 			that.styleHtml($('#indA_box'));
		 			//点击按钮
		 			var minbtns = $('.minBtn').length>1?$('.minBtn'):$('.maxBtn');
		 			if(minbtns!=null){
		 				that.clickBtn(minbtns,$('#indA_box'))
		 			}
		 			//拖动效果
		 			let SaveDialo=this.SaveDialog()	;
		 					that.moveAlert($('#indA_box'),SaveDialo);
		 					//关闭弹框
				 			$('#ind_back').on(SaveDialo.touchstart,function(e){
				 				var e=e.event||window.event,thouch = e;
				 				if(e.target.id!='ind_back') return false;
				 				cancelBox();
					 		})	
	 	},
	 	//设置弹框样式
	 	styleHtml : function(box){
	 		let boxW 	= box.width(),
	 				boxH 	=	box.height(),
	 				keshiW= $(document).width(),
	 				keshiH= $(document).height();
	 				box.css({
	 					left : (keshiW-boxW)/2+"px",
	 					top  : (keshiH-boxH)/2+"px"
	 				})
	 	},
	 	clickBtn : function(btns,oldobox ){
	 		var that=this;
				if(btns.length>1){
					btns.on('click',function() {
						let ind = $(this).attr('data-ind');
						if(ind==0){
							that.yes();
						}
						else if(ind==1){
							//取消弹框
							that.no();				
						}
					});
				}
				else if(btns.length==1){
					btns[0].onclick=function(){
						that.yes();
					}
				}
				else{
					setTimeout(function(){
 						$("#indA_box").html(`<img src="loading.gif" alt="" />`).removeClass().addClass('indA_box1');
						that.successCallback("true");
					},3000)
				}
	 	},
	 	//拖动效果
	 	moveAlert : function(box,SaveDialo){
			box.on(SaveDialo.touchstart,function(e){
				var e=e.event||window.event,thouch = e;
				if(e.touches){thouch = e.touches[0]}		
				let X=thouch.pageX-this.offsetLeft,
						Y=thouch.pageY-this.offsetTop,		
					dong =function(e){
						var e=e.event||window.event,thouch = e;
						if(e.touches){thouch = e.touches[0]}					
						let movel=thouch.pageX-X,
	          		movet=thouch.pageY-Y,         
	          		winw =$(document).width()-box.width(),
	         			winh =$(document).height()-box.height();
	              if(movel<0)movel=0;
	              if(movet<0)movet=0;
	              if(movel>=winw)movel=winw;
	              if(movet>=winh)movet=winh;
	            	box.css({
	            		left : movel+"px",
	            		top  : movet+"px"
	            	});
				};
				//滑动事件
				$('body').on(SaveDialo.touchmove,dong);
				//离开 移除事件
				$('body').on(SaveDialo.touchend,function(){
					$('body').off(SaveDialo.touchmove,dong);
				})
			})
	 	},
	 	//判断当前浏览器
	 	browserRedirect: function () {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
		      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		          return "phone"
		      } else {
		          return "pc"
		      }
     },
    // 执行事件
    SaveDialog : function(){
    	var obj={}
    	if(this.browserRedirect()=='pc'){
    		obj = {
    			touchmove :'mousemove',
    			touchend :'mouseup',
    			touchstart :'mousedown'
    		}
    	}
    	else{
    		obj = {
    			touchmove :'touchmove',
    			touchend :'touchend',
    			touchstart :'touchstart'
    		}
    	}
    	return obj
    } 	
	 }

let Alerts   =   function(opts){		
			return new PhoneAlert(extend({
				title:"1363234445",
				cont:'',
				btns:["yes","no"]
			},opts))
		},
		cancelAlert = function(opts){
			return new PhoneAlert(extend({
				title:"1363234445",
				cont:'',
				btns:["yes","no"]
			},opts))
		},
		succeedBox  = function(opts,fn){
			return new PhoneAlert(extend({
				title:"1363234445",
				cont:''
			},opts),fn)
		},
		cancelBox =   function(){
			$('#ind_back').remove();	
	 	}
	 	$.fn.extend({
			Alerts      : Alerts,
			cancelAlert : cancelAlert,
			cancelBox   : cancelBox,
			succeedBox  : succeedBox
		});
})(window,jQuery)