var $ = jQuery.noConflict();
$(function(){
	$(".info-item-button").click(function(){
		var item = $(this).closest(".info-item")
		if ( item.hasClass("active") ){
			$(".info-item").removeClass("active")
			$(".info-item-description_site").slideUp(200);

		}else{
			$(".info-item").removeClass("active")
			$(".info-item-description_site").slideUp(200);
			item.addClass("active");
			item.find(".info-item-description_site").slideDown(200);
		}

	})
})
