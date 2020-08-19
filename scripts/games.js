var srcWlackAndWhite = "images/game-{}-bw.png",
    srcColor = "images/game-{}.png";

// Each time the user hovers on the game image, change the color
function changeImage(index, iconElement, image){
    var src = $(iconElement).find('img').attr("src", image.replace("{}", index));
}

function changeImagesOnHover(){
    var icons = $(".game-icon");
    $.each(icons, function(index, icon){
        // Display colored image
        $(icon).on("mouseenter", function(){
            changeImage(index+1, icon, srcColor);
        });
        // Display b&w image
        $(icon).on("mouseleave", function(){
            changeImage(index+1, icon, srcWlackAndWhite);
        });
        // In mobile, it changes when the element is visible
        if (isMobile()) {
            inView('#'+$(icon).attr('id'))
            .on('enter', function(){changeImage(index+1, icon, srcColor)})
            .on('exit', function(){changeImage(index+1, icon, srcWlackAndWhite)});
        }
    });
}

function init(){
    changeImagesOnHover();
    inView.offset({
        top: 200,
        bottom: 300,
    });
}

init();