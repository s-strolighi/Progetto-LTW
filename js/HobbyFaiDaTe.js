$(document).ready(function(){
    //Variabili utili per l'event handler di scroll
    var arrayLink=$(".sidebar-button"); //tutti i button della sidebar
    var lastLink=arrayLink[0]; //primo button della sidebar

    //assegno un numero ad ogni sezione che serve per creare una corrispondenza tra sezione e bottone
    var contatore=0;
    $(".sezione").each(function(){
        $(this).prop("numero",contatore);
        contatore++;
    })

    //il click sul primo link va gestito separatamente per portare la pagina all'inizio
    $("#primo-link").click(function(){
            window.scrollTo({top : 0});  //Per scrollare la versione per pc
            document.getElementsByClassName("contenitore-sezioni")[0].scrollTo({top : 0});  //per scrollare la versione per telefono
    });

    //gestisco lo scroll di due elementi diversi (window e la div "contenitore-sezioni") nel seguente modo:
    // 1) se sono al pc (la larghezza della finesta è maggiore di 750px) gestisco lo scroll della finestra
    // 2) altrimenti se sono al telefono gestisco lo scroll della div "contenitore-sezioni"
    if (window.innerWidth > 750){
        $(window).scroll(function(){
            var newElem;
            var actualHeight=window.pageYOffset;    //offset attuale della pagina
            var windowHeight=window.innerHeight*40/100; //40% dell'altezza della finestra (usato per la sottolineatura del bottone giusto)
            var window80=window.innerHeight*80/100;     //80% dell'altezza della finesta  (usato per l'effetto di fadeIn)
            //alla fine di questo "ciclo" avrò trovato l'elemento al quale mettere la sottolineatura
            //e se non era già visibile lo avrò reso visibile
            $(".sezione").each(function(){
                    if ($(this).offset().top <= actualHeight + windowHeight){
                        newElem = $(this);
                    }
                    if ($(this).css("opacity")==0 && $(this).offset().top <= actualHeight + window80){
                        $(this).fadeTo(500,1);
                    }
            });
            //rimuovo la classe "underlined" dall'elemento che era precedentemente sottolineato
            //e inserisco la classe "underlined" all'elemento che è entrato nella visuale per ultimo
            // (la classe "underlined" sottolinea il testo contenuto dall'elemento)
            //infine aggiorno l'ultimo elemento
            lastLink.classList.remove("underlined");
            newLink=arrayLink[newElem.prop("numero")];
            newLink.classList.add("underlined");
            lastLink=newLink;
        });
    }
    // stessa cosa fatta per il l'evento scroll dell'elemento window ora lo faccio per l'evento scroll
    //dell'elemento "contenitore-sezioni"
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
    $(".contenitore-sezioni").scroll(); //chiamo la funzione scroll per rendere visibile il primo elemento al caricamento della pagina
});


