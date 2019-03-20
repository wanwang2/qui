/* 设置index-top index-menu的宽度*/
function menuW(){
	var usableW = $(".index-top").width()-$(".index-top .logo").outerWidth()-$(".index-top .top-operate").outerWidth();
	$(".index-top .index-menu").width(usableW-100);//100为index-menu距离左边距离50px+距离右边50px
}
/* 设置index-menu li的选中效果*/
function selectedMenu(){
	$(".index-menu ul li:first").addClass("selected");// 初始化：默认第一个li选中

	$(".index-menu ul li").click(function(){
		$(".index-menu ul li").removeClass("selected");
		$(".index-menu").find(".more").removeClass("selected");
		$(this).addClass("selected");
		if($(this).parent().parent().hasClass("more-pannel")){
			$(".index-menu").find(".more").addClass("selected");
		}
	});
}
/*index-menu创建“更多” 及内容显示*/
function createMoreE(){
	var a = $("<a href='#'>更多</a>");
	var div = $("<div>",{class:"more-pannel"});
	div.append($("<ul>"));
	var more = $("<div>",{class:"more hidden"});
	more.append(a).append(div);
	$(".index-menu").append(more);

	//“更多”内容的收缩
	$(".index-menu .more").hover(function(){
		$(this).children('.more-pannel').slideDown();
	},function(){
		$(this).children('.more-pannel').slideUp();
	});
}
/* 控制index-menu “更多”的显示*/
function toggleMore(){
	// 初始化more
	$(".index-top .index-menu .more").addClass("hidden");
	$(".index-top .index-menu > ul").removeClass("right150px");
	// 初始化more-pannel
	$(".index-menu .more .more-pannel ul").html("");

	var menuW = $(".index-top .index-menu").width();
	var liNum = $(".index-top .index-menu li").length;
	var liW = $(".index-top .index-menu li").width();
	if(liW*liNum > menuW){
		$(".index-top .index-menu .more").removeClass("hidden");
		$(".index-top .index-menu > ul").addClass("right150px");
		var blockLiNum = Math.floor((menuW-150)/liW);// 可见的li个数
		$(".index-top .index-menu ul li").each(function(i,e){
			if (i >= blockLiNum) {
				$(e).clone().appendTo($(".index-menu .more .more-pannel ul"));
			};
		});
	}
}

// 设置top-operate li的选中
function selectedOperate(){
	$(".top-operate ul li").click(function(){
		$(".top-operate ul li").removeClass("selected");
		$(".top-operate").find(".more-operate").removeClass("selected");
		$(this).addClass("selected");
		if($(this).parent().parent().hasClass("more-operate-pannel")){
			$(".top-operate").find(".more-operate").addClass("selected");
		}
	});
}

//控制top-operate "更多"的创建及显示
function toggleOperateMore(){
	$(".top-operate > ul").addClass("margin-right10px");

	var liW = $(".top-operate ul li").outerWidth(true);
	var liNum = $(".top-operate ul li").length;
	if(liW*liNum > 220){
		$(".top-operate > ul").removeClass("margin-right10px").addClass("padding-right54px");

		var a = $("<a>",{title:"更多"});
		a.append($("<span>",{class:"top-operate-more"}));

		var ul = $("<ul>");
		$(".top-operate > ul li").each(function(i,v){
			if(i >= 4){
				$(ul).append($(v).clone());
			}
		});
		var div = $("<div>",{class:"more-operate-pannel"});
		div.append(ul);

		var moreOperate = $("<div>",{class:"more-operate margin-right10px"});
		moreOperate.append(a).append(div);

		$(".top-operate").append(moreOperate);
	}

	$(".top-operate .more-operate").hover(function(){
		$(this).children('.more-operate-pannel').slideDown();
	},function(){
		$(this).children('.more-operate-pannel').slideUp();
	});
}

/* 侧边导航手风琴效果控制 注：侧边导航栏最多三层*/
function sidebarController(){
	// 初始化：将一级导航第一个元素A1选中；如果A1存在下一级导航B，则将B的第一个元素B1选中；如果B1存在下一级导航C，则将C的第一个元素C1选中
	$(".sidebar ul li ul").addClass("hidden");
	$(".sidebar ul li:first").addClass("selected").children("ul").removeClass("hidden").children("li:first").addClass("selected").children("ul").removeClass("hidden").children("li:first").addClass("selected");

	//为存在下级的li添加标识
	$(".sidebar ul li").each(function(i,e){
		if($(this).find("ul").length>0){
			$(this).children("a").append("<span class='has-subset'>＞</span>");
		}
		if ($(this).hasClass("selected")) {
			$(this).children("a").find(".has-subset").html("∨");
		};
	});

	$(".sidebar ul li").click(function(){
		$(".sidebar").removeClass("folded");//在sidebar收折状态时，点击图标展开sidebar
		$(".index-container").removeClass("left50px");//在sidebar收折状态时，展开sidebar的同时控制“右侧内容”区距左边的距离

		$(this).children("ul").removeClass("hidden");
		$(this).children("a").find(".has-subset").html("∨");
		$(this).addClass("selected");
		
		$(this).siblings().find("ul").addClass("hidden");
		$(this).siblings().find("a").find(".has-subset").html("＞");
		$(this).siblings().removeClass("selected").find("li").removeClass("selected");
	});	

	$(".sidebar ul li a").click(function(){
		$(this).parent().find("li").removeClass("selected");
		$(this).parent().find(".has-subset").html("＞");
		$(this).parent().find("ul").addClass("hidden");
	});

}
/* sidebar显示和隐藏 */
function sidebarToggle(){
	if($(".sidebar").hasClass("folded")){
		$(".sidebar").removeClass("folded");
		$(".sidebar ul li.selected > ul").removeClass("hidden");
		$(".index-container").removeClass("left50px");
	}else{
		$(".sidebar").addClass("folded");
		$(".sidebar.folded ul li ul").addClass("hidden");
		$(".index-container").addClass("left50px");
	}
}

// .form-table各控件对齐
function formTableControlAlign(){
	var ableW = $(".form-table .input-time-split").parent().width()*0.9;
	ableW = ableW >= 450 ? 450 : ableW;
	var splitTimeSpacingW = $(".form-table .time-split-spacing").outerWidth();
	$(".form-table .input-time-split").width((ableW-splitTimeSpacingW)/2);//设置一个单元格中有两个输入框的input宽度

	var ableW1 = $(".form-table .small-btn").parent().width()*0.9;
	ableW1 = ableW1 >= 450 ? 450 : ableW1;
	var smallBtnW = $(".form-table .small-btn").outerWidth();
	$(".form-table .input-operable").width(ableW1-smallBtnW*2);//设置具有“选”“清”按钮的输入框的宽度

	var tdCol3W = $(".form-table .input-colspan3").parent().width();
	var trW = $(".form-table .input-colspan3").parent().parent().width();
	var tdOddW = trW -tdCol3W;
	var tdEvenW = (tdCol3W - tdOddW)/2;
	var lastColW = tdEvenW*0.9;
	lastColW = lastColW >= 450 ? 450 : lastColW;
	$(".form-table .input-colspan3").width(tdEvenW+tdOddW+lastColW);//设置一个夸3列的输入框
}

// .search-table相关控制
function searchContentController(){
	$(".search-table > tbody").each(function(i,e){
		if($(e).children("tr").size() > 2){
			// 将多余内容添加到customTbody中，并且使隐藏
			var customTbody = $("<tbody class='more-tbody'>");
			$(e).children("tr").each(function(j,v){
				if (j >= 2) {
					customTbody.append($(v));
				};
			}); 
			$(e).after(customTbody);
			// 显示“更多>”
			var searchMore = $("<span class='search-more'>更多></span>")
			$(".search-button").prepend(searchMore);
			// 查询"更多"
			searchMoreToggle();
		}
	});
}
// form-table查询面板"更多"内容的显示和隐藏
function searchMoreToggle(){
	$(".search-content").each(function(i,e){
		$(e).find(".search-more").click(function(){
			if($(e).hasClass("folder")){
				$(e).removeClass("folder");
				$(e).find(".search-more").text("隐藏<");
				formTableControlAlign();
			}else{
				$(e).addClass("folder");
				$(e).find(".search-more").text("更多>")
			}
		});
		$(e).find(".search-button button").each(function(j,v){
			$(v).click(function(o){
				$(e).addClass("folder");
				$(e).find(".search-more").text("更多>");
			});
		});
	});
}

/*表单填写（分组）form-group toggle*/
function formGroupToggle(){
	$(".form-group .form-head span.right").on("click",function(){
		$(this).toggleClass("on").parent().next().toggle();
	})
} 


/* tab设置：设置tab-container guide ul的宽度；控制“上一个”“下一个”的显示*/
// function tabController(){
// 	$(".tab-container .guide ul li").removeClass("hidden");//将所有li都置为显示状态

// 	var ulW = $(".tab-container .tab-title").width()-$(".tab-container .previous-tab-btn").outerWidth()-$(".tab-container .next-tab-btn").outerWidth();
// 	$(".tab-container .guide ul").width(ulW);

// 	var liWSum = 0;
// 	$(".tab-container .guide ul li").each(function(i,e){
// 		liWSum += $(this).width();
// 		if (liWSum > ulW) {
// 			$(e).addClass("hidden");
// 		};
// 	});
// 	if(liWSum > ulW){
// 		$(".tab-container .tab-title .previous-tab-btn").removeClass("hidden");
// 		$(".tab-container .tab-title .next-tab-btn").removeClass("hidden");
// 	}else{
// 		$(".tab-container .tab-title .previous-tab-btn").addClass("hidden");
// 		$(".tab-container .tab-title .next-tab-btn").addClass("hidden");
// 	}
// }

// // tab选中
// function tabSelected(){
// 	$(".tab-container .guide ul li").first().addClass("selected");
// 	$(".tab-container .guide ul li").click(function(){
// 		$(this).addClass("selected").siblings().removeClass("selected");
// 	 });
// }

//  var isClickNextFun= true;
// // 点击“下一个”：将第一个可见li隐藏,并且将可见li后的第一个隐藏的li显示
// function showNextLi(){
// 	if(isClickNextFun){
// 		$(".tab-container .guide ul li").each(function(){
// 			if($(this).css("display") == "block"){
// 				$(this).addClass("hidden");
// 				var nextLiWSum = 0;
// 				$(this).nextAll().each(function(i,e){
// 					nextLiWSum += $(e).outerWidth();
// 					if($(this).hasClass("hidden")){
// 						$(this).removeClass("hidden");
// 						return true;
// 					}
// 				});
// 				if(nextLiWSum  <= $(".tab-container .guide ul").width()){
// 					isClickNextFun = false;
// 				}
// 				return false;
// 			}
// 		});
// 	}
// }
// // 点击“上一个”：将第一个隐藏的li显示
// function showPreLi(){
// 	$(".tab-container .guide ul li").each(function(){
// 		if($(this).css("display") == "block"){
// 			if ($(this).prev()) {
// 				$(this).prev().removeClass("hidden");
// 				isClickNextFun = true;
// 			};
// 			return false;
// 		}
// 	});
// };

// 设置list-list相对于search-content的top值
function listListPosition(){
	$(".list-max").each(function(i,e){
		var listListE = $(e).find(".list-list");
		var searchContentE = $(e).find(".search-content");
		var searchContentH = $(e).find(".search-content").outerHeight(true);
		if(listListE.length>0 && searchContentE.length>0){// 如果一个list-max中存在“条件检索列表”
			$(listListE).css("top",searchContentH);
		}
	});
}

// tab-button相关控制
function tabButtonController(){
	// 按钮宽度控制
	var maxHSpan = 0; 
	$(".tab-button span").each(function(i,e){
		maxHSpan = $(this).width() > maxHSpan ? $(this).width() : maxHSpan;
	});
	$(".tab-button span").width(maxHSpan);

	// tab切换
	var tabTitle = $(".tab-top .tab-button > span");
	var tabContent = $(".tab-content > div");
	tabContent.addClass("hidden");
	$(".tab-content > div:eq(0)").removeClass("hidden");
	tabTitle.click(function() {
		tabContent.eq(tabTitle.index(this)).removeClass("hidden").siblings().addClass("hidden");
		$(this).addClass("selected").siblings().removeClass("selected");
	});
}

// // 数据表格：为奇数行添加颜色，设置是否显示滚动条
// function gridController(){
// 	$(".grid-tbody .grid-list tr:odd").addClass("td-color");//为基数行添加颜色
// 	$(".grid").each(function(i,e){
// 		var gridTbodyH = $(e).find(".grid-tbody").height();
// 		var gridListH =$(e).find(".grid-tbody .grid-list").height();//list高度
// 		if(gridListH > gridTbodyH){
// 			$(e).find(".grid-tab-thead-father").css("right","17px");//设置表头距右边17px
// 		}else{
// 			$(e).find(".grid-tab-thead-father").css("right",0);
// 		}
// 	});
// }
// // 数据表格行的选中
// function gridChecked(){
// 	$(".grid").each(function(i,e){
// 		$(e).find(".grid-tbody .grid-list tr").click(function(){
// 			console.info(this);
// 			if($(this).hasClass("selected")) {
// 				$(this).removeClass("selected").find(":checkbox").prop("checked",false);
// 			}else {
// 				$(this).addClass("selected").find(":checkbox").prop("checked", true);
// 			}
// 			controlBoxToggle(e);
// 		});
// 		// 利用.grid-header :checkbox 的选中状态控制表格数据"全部选中"和"全部不选中"
// 		$(e).find(".grid-header .grid-list").find(":checkbox").click(function(){
// 			if($(this).prop("checked")){
// 				$(".grid-list :checkbox",e).prop("checked",true);	
// 				$(".grid-list tr",e).addClass("selected");
// 			}else{
// 				$(".grid-list :checkbox",e).prop("checked",false);
// 				$(".grid-list tr",e).removeClass("selected");	
// 			}
// 		});
// 	});
// 	// 控制.grid-header :checkbox 的选中状态：选中行数 == 所有行数 选中此checkbox，选中行数 < 所有行数 checked置为false 
// 	function controlBoxToggle(eo){
// 		var trL = $(eo).find(".grid-tbody .grid-tab-tbody-father .grid-list tr").length;//行数
// 		var trCheckedL = $(eo).find( ".grid-tbody .grid-tab-tbody-father .grid-list :checkbox:checked").length;//选中行数
// 		if(trL == trCheckedL){
// 			$(eo).find(".grid-header .grid-list :checkbox").prop("checked", true);	
// 		}else{
// 			$(eo).find(".grid-header .grid-list :checkbox").prop("checked",false);
// 		}	
// 	}
// }

// // 显示对话框 
// function showDialog(){
// 	$(".dialog-bg").removeClass("hidden");
// 	$(".dialog").removeClass("hidden");
// }
// // 关闭对话框
// function closeDialog(){
// 	$(".dialog-bg").addClass("hidden");
// 	$(".dialog").addClass("hidden");
// }

$(function(){
	menuW();/* 设置index-top index-menu的宽度*/
	createMoreE();/*index-menu创建“更多” 及内容显示*/
	// toggleMore();/* 控制index-menu “更多”的显示*/
	selectedMenu();/* 设置index-menu li的选中效果*/
	
	toggleOperateMore();//控制top-operate "更多"的创建及显示
	selectedOperate();// 设置top-operate li的选中
	
	sidebarController();/* 侧边导航手风琴效果控制 */

	searchContentController();// .search-table相关控制
	formTableControlAlign();// .form-table各控件对齐
	listListPosition();// 设置list-list相对于search-content的top值

	formGroupToggle();/*表单填写（分组）form-group toggle*/

	tabButtonController();// tab-button相关控制

	// tabController();/* tab设置*/
	// tabSelected();// tab选中

	// gridController();// 数据表格：为奇数行添加颜色，设置是否显示滚动条
	// gridChecked();// 数据表格行的选中

	windowResize();//window resize 时执行
});
function windowResize(){
	$(window).resize(function(){
		menuW();/* 设置index-top index-menu的宽度*/
		toggleMore();/* 控制index-menu “更多”的显示*/
		formTableControlAlign();// .form-table各控件对齐
		// tabController();/* tab设置*/
		// gridController();// 数据表格：为奇数行添加颜色，设置是否显示滚动条
	});
}