$(document).ready(function()     //il codice della funzione al'interno della ready verra eseguito solo una volta che il DOM è stato caricato
{
    //Variabili utili per l'event handler di scroll
    var arrayLink=$(".sidebar-button"); //prendo tutti i button della sidebar
    var lastLink=arrayLink[0]; //prendo il primo button della sidebar (lastlink mi servira a salvarmi l'ultimo bottone che è stato sottolineato)

    //assegno un numero ad ogni sezione che serve per creare una corrispondenza tra sezione e bottone
    var contatore=0;
    $(".sezione").each(function()/* each = la funzione passata verra eseguita per ogni elemento del DOM con la classe sezione (quindi per ogni porzione di pagina associata a un bottone)*/
    {
        $(this).prop("numero",contatore); /*per ogni sezione della pagina gli assegna una proprieta numero e la setta a contatore(che aumenta ogni volta)*/
        contatore++;
    })

    //il click sul primo link va gestito separatamente per portare la pagina all'inizio
    $("#primo-link").click(function()   
    {
            window.scrollTo({top : 0});  //scrolla la pagina alle coordinate specificate(quindi all'inizio) //Per scrollare la versione per pc
            document.getElementsByClassName("contenitore-sezioni")[0].scrollTo({top : 0}); //scrolla tutta la seconda colonna contenente le sezioni all'inizio della pagina //per scrollare la versione per telefono
    });




    //gestisco lo scroll di due elementi diversi (window e la div "contenitore-sezioni") nel seguente modo:
    // 1) se sono al pc (la larghezza della finesta è maggiore di 750px) gestisco lo scroll della finestra
    // 2) altrimenti se sono al telefono gestisco lo scroll della div "contenitore-sezioni"

    if (window.innerWidth > 750)//se sono al pc
    {
        //PER SOTTOLINEARE IL BOTTONE GIUSTO QUANDO SCROLLO LA PARTE DI PAGINA CO LE SEZIONI:

        $(window).scroll(function()  //quando scrolliamo la parte con le sezioni
        {  

            var newElem;
            var actualHeight=window.pageYOffset;        //offset attuale della pagina
            var windowHeight=window.innerHeight*40/100; //40% dell'altezza della finestra (usato per la sottolineatura del bottone giusto)
            var window80=window.innerHeight*80/100;     //80% dell'altezza della finesta  (usato per l'effetto di fadeIn)
            //alla fine di questo "ciclo" avrò trovato l'elemento al quale mettere la sottolineatura
            //e se non era già visibile lo avrò reso visibile

            $(".sezione").each(function()/*mentre si sta scrollando scorro le varie sezioni nella seconda colonna*/
            {
                    if ($(this).offset().top <= actualHeight + windowHeight)//se l'offset dell'attuale sezioni dal top della pagina è minore di quello della finestra, vuol dire che quella sezione sta dentro la finestra e il bottone associato deve essere sottolineato
                    {
                        newElem = $(this); //allora salvo quell elemento per renderlo visibile e sottolinearlo
                    }
                    if ($(this).css("opacity")==0 && $(this).offset().top <= actualHeight + window80) //controllo diverso per il date perche deve partire prima che il bottone venga sottolineato
                    {
                        $(this).fadeTo(500,1);
                    }
            });

            
            //e inserisco la classe "underlined" all'elemento che è entrato nella visuale per ultimo
            // (la classe "underlined" sottolinea il testo contenuto dall'elemento)
            //infine aggiorno l'ultimo elemento

            //lastlink all'inizio sara il primo bottone poi verra aggiornato qui ogni volta
            lastLink.classList.remove("underlined"); //rimuovo la classe "underlined" dall'elemento che era precedentemente sottolineato
            newLink=arrayLink[newElem.prop("numero")]; //in new link metto il bottone appena sottolineato (che sara alla posizione dell'array corrispondente al valore della proprieta numero della sezione resa visibile)
            newLink.classList.add("underlined");    //sotolineo quel bottone 
            lastLink=newLink; //aggiorno last link
        });
    }

    // stessa cosa fatta per il l'evento scroll dell'elemento window ora lo faccio per l'evento scroll
    //dell'elemento "contenitore-sezioni"

    else  //se non mi trovo sul pc ma da mobile applico .scroll sulla sola colonna delle sezioni anziche su tutta la pagina
    {
        $(".contenitore-sezioni").scroll(function()
        {
            var newElem;
            var windowHeight = window.innerHeight*85/100;
            $(".sezione").each(function()                    //seguo lo stesso procedimento di sopra ma con le distanze settate per mobile
            {
                var offset=$(this).offset().top;
                if (offset <= 275) //275 = navbar + 2 volte sidebar(2 volte perchè il testo va sotto la sidebar) + 15 pixel (perchè preferisco un pò sopra)
                {  
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
    $(".contenitore-sezioni").scroll();//rende subito visibile la prima sezione senza effetto fade in //chiamo la funzione scroll per rendere visibile il primo elemento al caricamento della pagina
});


