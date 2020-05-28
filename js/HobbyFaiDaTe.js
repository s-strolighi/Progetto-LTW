$(document).ready(function(){
    //Variabili utili per l'event handler di scroll
    var arrayLink=$(".sidebar-button"); //tutti i button della sidebar
    var lastLink=arrayLink[0]; //primo button della sidebar

    var contatore=0;
    $(".sezione").each(function(){
        $(this).prop("numero",contatore);
        contatore++;
    })

    $("#primo-link").click(function(){
            window.scrollTo({top : 0});  //Per scrollare la versione per pc
            document.getElementsByClassName("contenitore-sezioni")[0].scrollTo({top : 0});  //per scrollare la versione per telefono
    });

    if (window.innerWidth > 750){
        $(window).scroll(function(){
            //var elementi=document.getElementsByClassName("sezione");
            var newElem;
            var actualHeight=window.pageYOffset;
            var windowHeight=window.innerHeight*40/100; //20% dell'altezza della finestra (escluso barre del browser)
            var window80=window.innerHeight*80/100;
            $(".sezione").each(function(){
                    if ($(this).offset().top <= actualHeight + windowHeight){
                        newElem = $(this);
                    }
                    if ($(this).css("opacity")==0 && $(this).offset().top <= actualHeight + window80){
                        $(this).fadeTo(500,1);
                    }
            });
            lastLink.classList.remove("underlined");
            newLink=arrayLink[newElem.prop("numero")];
            newLink.classList.add("underlined");
            lastLink=newLink;
        });
    }
    else {
        $(".contenitore-sezioni").scroll(function(){
            var newElem;
            var windowHeight = window.innerHeight*85/100;
            $(".sezione").each(function(){
                var offset=$(this).offset().top;
                if (offset <= 275){  //275 = navbar + 2 volte sidebar(2 volte perchè il testo va sotto la sidebar) + 15 pixel (perchè preferisco un pò sopra)
                    newElem=$(this);
                }
                if ($(this).css("opacity")==0 && offset <= windowHeight){
                    $(this).fadeTo(500,1);
                }
            });
            lastLink.classList.remove("underlined");
            newLink=arrayLink[newElem.prop("numero")];
            newLink.classList.add("underlined");
            lastLink=newLink;
        });
    }
    $(".contenitore-sezioni").scroll();
/*
    $(window).scroll(function() {
        $(".fadeIn").each(function(){
            var actualHeight=window.pageYOffset;
            var windowHeight=window.innerHeight*80/100;
            if ($(this).css("opacity")==0 && $(this).offset().top <= actualHeight + windowHeight){
                $(this).fadeTo(500,1);
            }
        });
    }).scroll();*/

/*
    $(window).scroll(function() { //aggiungi un event handler dell'evento scroll    
        var windowBottom = $(this).scrollTop() + $(this).innerHeight(); //height al posto di innerHeight?  dall'inizio al punto più alto attuale + altezza del documento (praticamente l'altezza totale del documento?)
        $(".fadeIn").each(function() {
            // Check the location of each desired element 
            var objectBottom = $(this).offset().top + $(this).outerHeight(); //offset ci da la posizione relativa al documento + l'altezza dell'elemento
            console.log($(this).offset().top);
            // If the element is completely within bounds of the window, fade it in 
            if (objectBottom < windowBottom) { //object comes into view (scrolling down)
                if ($(this).css("opacity")==0) {$(this).fadeTo(500,1);}
            } //else { //object goes out of view (scrolling up)
                //if ($(this).css("opacity")==1) {$(this).fadeTo(500,0);}
            //}
        });
    }).scroll(); //invoke scroll-handler on page-load
*/


});


