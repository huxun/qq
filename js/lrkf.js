(function($){
	$.fn.lrkf=function(options){
		//配置参数
		var opts={
			position:"fixed",
			btntext:"\u5ba2\u670d\u5728\u7ebf",
			qqs:[],
			tel:"",
			more:null,
			kftop:"120",
			z:"99999",
			defshow:true,
			Event:"",
			img:"",
			callback:function(){}
		},$body=$("body"),$url="";

		$.extend(opts,options);

		//添加所需的DOM元素
		if(!$("#lrkfwarp").length>0){
			var appendStr = "<div id='lrkfwarp' class='lrkf lrkfshow' style="+opts.position+">";
			appendStr += "<a href='#' class='lrkf_btn lrkf_btn_hide' id='lrkf_btn' onfocus='this.blur()'>"+opts.btntext+"</a>";
			appendStr += "<div class='lrkf_box'>";
			appendStr += "<div class='lrkf_header'><a href='#' title='\u5173\u95ed' class='x' id='lrkf_x'></a></div>";
			appendStr += "<div class='lrkf_con' id='lrkf_con'><ul class='kflist'></ul></div>";
			appendStr += "<div class='lrkf_foot'></div>";
			appendStr += "</div>";
			appendStr += "</div>";
			appendStr += "<style>";
			appendStr += "html{overflow-x:hidden;}";
			appendStr += "#lrkfwarp ul{padding-left:0; margin:0;list-style-type: none;}";
			appendStr += ".lrkf{font-size:13px;position:fixed;}";
			appendStr += ".lrkf a{ display:block; color:#666; text-decoration:none; font-size:13px;}";
			appendStr += "#lrkfwarp img{ border:none;vertical-align:middle; margin-right:4px; margin-top:-2px;display:inline;}";
			appendStr += ".lrkf_con{padding:6px 8px;}";
			appendStr += ".lrkf_con li.qq{padding:5px 0;}";
			appendStr += ".lrkf_con li.tel{ line-height:1.35; padding-bottom:4px;}";
			appendStr += ".lrkf_con li.more{ padding:2px 0;}";
			appendStr += ".lrkf_con li.tel b{ display:block; color:#C00;}";
			appendStr += ".lrkf_tool a{ display:block; padding:8px 10px; text-align:center;}";
			appendStr += ".lrkf_con .hr{padding:0;height:0;font-size:0;line-height:0;clear:both;margin:4px 0;border-bottom:#fff solid 1px;border-top:#CFCFCF solid 1px;border-left:none;border-right:none;}";
			appendStr += ".lrkf_btn{position:absolute; top:20px;width:22px;left:-22px;display:block;text-align:center;padding:10px 0;}";
			appendStr += ".lrkf .lrkf_xc{ position:absolute; bottom:-14px; right:6px;font-size:10px;display:none;}";
			appendStr += "</style>";
			$body.append(appendStr);
		}
		
		//将主要的元素对象缓存，加快访问速度
		var $lrkfwarp=$("#lrkfwarp"),
			$lrkf_con=$("#lrkf_con"),
			$kflist=$lrkf_con.children("ul"),
			$lrkf_x=$("#lrkf_x"),
			$lrkf_btn=$("#lrkf_btn"),
			$lrkfwarp_w=$lrkfwarp.outerWidth()*1+1;

		//设置top和z-index
		$lrkfwarp.css({top:opts.kftop+"px","z-index":opts.z});

		//设置right
		if(!opts.defshow){
			$lrkfwarp.removeClass("lrkfshow").css({right:-$lrkfwarp_w})
		}

		//添加qq链接
		var json={options:opts.qqs};
		json=eval(json.options);
		var linkStr = '';
		$.each(json,function(i,o){
			linkStr += "<li class=qq><a target=_blank href="+o.qq+"><img src="+opts.img+">"+o.name+"</a></li>";
		});
		$kflist.append(linkStr);

		//添加电话信息
		if(opts.tel){$kflist.append("<li class=hr></li>");
		var json_tel={options:opts.tel};
		json_tel=eval(json_tel.options);
		$.each(json_tel,function(i,o){$kflist.append("<li class=tel>"+o.name+":<b>"+o.tel+"</b></li>")})}

		//添加more链接
		if(opts.more){
			$kflist.append("<li class=hr></li><li class=more><a href='"+opts.more+"'>>>\u66f4\u591a\u65b9\u5f0f</a></li>");
		}

		//支持IE6
		var $lrkfwarptop=$lrkfwarp.offset().top;
		if($.browser.msie&&$.browser.version==6||opts.position=="absolute"){
			$(window).scroll(function(){
				var offsetTop=$lrkfwarptop+$(window).scrollTop()+"px";
				$lrkfwarp.animate({top:offsetTop},{duration:600,queue:false});
			});
		}

		//添加关闭按钮响应
		$lrkf_x.click(function(){
			$lrkfwarp.hide();
			return false
		});

		//添加弹出效果
		if(opts.Event==""){
			$lrkfwarp.mouseenter(function(){$(this).stop().animate({right:0})}).mouseleave(function(){$(this).stop().animate({right:-$lrkfwarp_w})})
		}else{
			$lrkf_btn.on("click",function(){
				if($lrkfwarp.hasClass("lrkfshow")){
					$lrkfwarp.animate({right:-$lrkfwarp_w},function(){$lrkfwarp.removeClass("lrkfshow")})
				}else{
					$lrkfwarp.addClass("lrkfshow").animate({right:0})
				}
				return false;
			});
		}
	}
})(jQuery);