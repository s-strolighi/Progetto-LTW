$(document).ready(function () { 

    $(".videogame-media").find("img").click(function () {
        $(this).parent().find("iframe").addClass("active");
    })

    $('.videogame-container .collapse').each(function (index) {
        $(this).on('accordion-open', function(){
            var position =  $('.videogame-media')[index].offsetTop + $(this).height() - 86
            window.scrollTo({top: position, behavior: "smooth"})
        });

        $(this).on('accordion-close', function () {
            var position =  $('.videogame-media')[index].offsetTop - 86
            window.scrollTo({top: position, behavior: "smooth"})
        });
        
    })

    $(".videogame-title").find(".next").click(function () {
        elem = $(this).parent().parent().parent().parent().parent().next()[0].scrollIntoView({behavior: "smooth"});
        closeAccordion();
        pauseVideo();
        removeActive();
    })

    $(".videogame-title").find(".prev").click(function () {
        elem = $(this).parent().parent().parent().parent().parent().prev()[0];
        if (elem.getAttribute("id") == "first-container"){
            window.scrollTo({top: 1, behavior: "smooth"});
        }
        else{
            elem.scrollIntoView({behavior: "smooth"});
        }
        closeAccordion();
        pauseVideo();
        removeActive();
    })

    $('.videogame-container h1').click(function () {
        if($(this).attr('aria-expanded') == 'false'){
            $(this).parent().next().trigger('accordion-open');
        }
        else{
            $(this).parent().next().trigger('accordion-close');
        }

    })

})
    
function pauseVideo() {
    $('iframe').each(function () {
        var elem_src = $(this).attr("src");
        $(this).attr("src", elem_src);
    });
}


function removeActive() {
    $('iframe').each(function () {
        $(this).removeClass("active");
    });
}

function closeAccordion() {
    $('.collapse').each(function () {
        $(this).removeClass("show");
    });

    $('.videogame-container h1').each(function () {
        $(this).addClass("collapsed");
        $(this).attr("aria-expanded", false)
    });
}

