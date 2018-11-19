$(".header__button-list > li").each(function(index, li){
    $(li).on("click", function(){
        var sectionId = $(li).attr("scroll-to");
        $('#' + sectionId).get(0).scrollIntoView({ 
            behavior: 'smooth'
        });
    });
});
