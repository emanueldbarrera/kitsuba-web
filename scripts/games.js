var srcWlackAndWhite = "images/game-{}-bw.png",
    srcColor = "images/game-{}.png";

// Each time the user hovers on the game image, change the color
function changeImage(index, iconElement, image){
    var src = $(iconElement).find('img').attr("src", image.replace("{}", index));
}

function changeImagesOnHover(){
    var icons = $(".game-icon");
    $.each(icons, function(index, icon){
        $(icon).on("mouseenter", function(){
            changeImage(index+1, icon, srcColor);
        });
        $(icon).on("mouseleave", function(){
            changeImage(index+1, icon, srcWlackAndWhite);
        });
    });
}

function init(){
    changeImagesOnHover();
}

init();