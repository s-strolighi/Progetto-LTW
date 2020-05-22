$(document).ready(function () { 

    //prendo elemento img di ogni gioco
    $(".videogame-media").find("img").click(function () {
        $(this).parent().find("iframe").addClass("active"); //sul click aggiungo la classe "active" al frame del video (lo porta in primo piano)
    })

    //gli elementi collapse (i dropdown sul titolo del gioco) possono interagire tramite due eventi: "accordion-open" e "accordion-close"
    $('.videogame-container .collapse').each(function (index) {
        $(this).on('accordion-open', function(){ //accordion-open allinea la fine della casella di testo con la fine della pagina
            var position =  $('.videogame-media')[index].offsetTop + $(this).height() - 86 //86px = altezza navbar
            window.scrollTo({top: position, behavior: "smooth"})
        });

        $(this).on('accordion-close', function () { //accordion-close allinea l'inizio della div del gioco con l'inizio della pagina
            var position = $('.videogame-media')[index].offsetTop - 86 //86px = altezza navbar
            window.scrollTo({top: position, behavior: "smooth"})
        });
        
    })

    //gli elementi next a destra del titolo per scorrere i giochi
    $(".videogame-title").find(".next").click(function () {
        //risalgo l'albero del DOM per tornare al componente "videogame", prendo il successivo e lo mostro
        elem = $(this).parent().parent().parent().parent().parent().next()[0].scrollIntoView({behavior: "smooth"});
        
        //chiudo eventuali titoli aperti e video attivi
        closeAccordion();
        pauseVideo();
        removeActive();
    })

     //gli elementi prev a sinistra del titolo per scorrere i giochi
    $(".videogame-title").find(".prev").click(function () {
        //risalgo l'albero del DOM per tornare al componente "videogame", prendo il precedente
        elem = $(this).parent().parent().parent().parent().parent().prev()[0];

        //se l'elemento è il primo lo porto ad atezza 0px (tutto in alto)
        if (elem.getAttribute("id") == "first-container"){
            window.scrollTo({top: 0, behavior: "smooth"});
        }
        //altrimenti mostro l'elemento 
        else{
            elem.scrollIntoView({behavior: "smooth"});
        }

        //chiudo eventuali titoli aperti e video attivi
        closeAccordion();
        pauseVideo();
        removeActive();
    })

    //funzione che gestisce i click sui titoli dei videogiochi
    $('.videogame-container h1').click(function () {
        if($(this).attr('aria-expanded') == 'false'){ //aria-expanded è una proprietà del componente di bootstrap che indica se il dropdown è visibile o no
            $(this).parent().next().trigger('accordion-open'); //scatena evento "accordion-open"
        }
        else{
            $(this).parent().next().trigger('accordion-close'); //scatena evento "accordion-close"
        }

    })

})

//per mettere in pausa il video ricarico iframe cambiando il link (con lo stesso link precedente)
function pauseVideo() {
    $('iframe').each(function () {
        var elem_src = $(this).attr("src");
        $(this).attr("src", elem_src);
    });
}

//porto il video non visibile togliendo la classe "active"
function removeActive() {
    $('iframe').each(function () {
        $(this).removeClass("active");
    });
}

//chudo il dropdown togliendo la classe "show"
function closeAccordion() {
    $('.collapse').each(function () {
        $(this).removeClass("show");
    });

    //ripristino la proprietà "aria-expanded" del titolo
    $('.videogame-container h1').each(function () {
        $(this).addClass("collapsed");
        $(this).attr("aria-expanded", false)
    });
}

