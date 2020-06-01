function filterSelection(c) // il parametro c è il nome del bottone che ha triggerato la funzione. io devo filtrare tutte le card che che hanno quella stessa classe. questo filtra viene eseguito solo tra le card che hanno la classe filterDiv
{
  buttons = document.getElementById("nav-hide").getElementsByClassName("btn"); //elenco dei bottoni nella seconda navbar
  filters = []; //elenco delle classi dei bottoni attivi

  if (c == "tutti") c = ''; //se premo il bottone tutti imposto il parametro in modo da attivare tutte le card


  //PARTE DI GESTIONE DEI BOTTONI DOPO L'ONCLICK:
   
  //solo se c == "tutti" li setto tutti disattivati
  for (var i = 0; i < buttons.length; i++)         //scorro tutti i bottoni del filtra
  {
    //indexOf ritorna -1 se non trova occorrenze di c. quindi questo if è falso se il bottone non ha la classe corrispondente a quella del bottone premuto (c)
    if (buttons[i].className.indexOf(c) > -1)      //quindi questo controllo lo passa solo 1 bottone. quello premuto
    { 
      if (buttons[i].className.indexOf('active') > -1 || c == '') //se il bottone premuto era gia attivo o se èstato premuto il bottone tutti (e quindi devono essere disattivati tutti gli altri) lo disattivo
      { 
        buttons[i].classList.remove("active");  //rimuovo la classe active
      } 
      else //se invece il bottone premuto non era attivo lo attivo
      {
        buttons[i].classList.add("active"); //
      }

    }

    //salvo le classi dei bottoni attivi come filtri attualmente attivi
    if (buttons[i].className.indexOf('active') > -1 && buttons[i].className.indexOf('tutti') < 0) //se il bottone attuale è attivo e non è il bottone tutti
    {
      filters[filters.length] = getFilter(buttons[i]); //aggiungo a filters[] tutte le classi dei bottoni attivi. 
                                                       //getFilter si assicura che nell'elenco delle classi non vengano 
                                                       //aggiunte anche le classi btn e active, che sono classi dei
                                                       // bottoni ma non quelle che ci interessano.
    }


  }//fine for

  //se non ho filtri attivi (tutte le schede), attivo il primo bottone (quello con tutti)
  if (filters.length == 0) 
  {
    buttons[0].classList.add("active");
  } 
  else 
  {
    buttons[0].classList.remove("active");
  }




  //PARTE DI GESTIONE DELLE CARD DA VISUALIZZARE OPPURE NO DOPO LA GESTIONE DEI BOTTONI

  //prendo tutte le carte che hanno la classe filterDiv (tutti quelli che possono essere filtrati)
  cards = document.getElementsByClassName("filterDiv");
  
  
  for (i = 0; i < cards.length; i++) //per tutti gli oggetti filtrabili
  {
    card_class = cards[i].className.split(' '); //qui dentro metto le classi della card attuale. che possono essere piu 
                                                 //di una visto che una card puo avere due classi nel caso in cui 
                                                 //esercizio sia di 2 o piu tipi (esempio esercizi gambe e cardio 
                                                 //corrispondono a schede con classi gambe e cardio)

    // !IMPORTANTE! every controlla che TUTTE le occorrenze matchano, SOME controlla che almeno una matcha
    
    //controllo che ci sia almeno una corrispondenza tra filters(che è l'elenco dei bottoni attivi) e card_class(che è l'elenco delle classi della carta attuale)
    //se c'è almeno una corrispondenza allora la carta va resa visibile
    if (filters.some(filtro => card_class.indexOf(filtro) > -1) || filters.length == 0)  //anche se filters è vuoto (cioe se è selezionato i lbottone tutti) la card attuale va resa visibile
    { 
      cards[i].classList.add("show"); //allora la rendo visibile
    } 
    else 
    {
      cards[i].classList.remove("show");//altrimenti la rendo invisibile
    }
  }

} //chiusura funzione

//Restituisce la classe del bottone inerente agli esercizi (toglie active e btn dalle classi)
function getFilter(c) 
{
  classes = c.className.split(' '); /*splitta il contenuto della variabile class del parametro passato*/
  classes = classes.filter(e => e !== 'btn').filter(e => e !== 'active'); /*restituisci la classe solo se la classe non è active o btn*/
  return (classes[0]);  /*restituisco la prima delle classi rimanenti. Anche se per come la useremo noi rimarra sempre una classe sola*/
}


//GESTIONE MOVIMENTO DELLA NAVBAR DEL FILTRA

//metto in una variabile il numero di pixel che distanziano la pagina come è visualizzata in 
//questo momento dalla pagina visualizzata inizialmente. cioe prima di scrollare.
var prevScrollpos = window.pageYOffset; 

window.onscroll = function () //funzione triggerata quando scrollo la finestra
 {
  var currentScrollPos = window.pageYOffset; //aggiorno la posizione della finestra mentre scrollo

  position = document.getElementById("nav-fixed").clientHeight; //restituisce altezza della navbar fissa compreso il padding

  if (prevScrollpos > currentScrollPos) //quando scorro verso l'alto
  {
    document.getElementById("nav-hide").style.top = position+"px"; //aumento la distanza della navbar fissa con il top della finestra. di esattamente l'altezza della navbar mobile
  } 
  else
  {
    document.getElementById("nav-hide").style.top = "-"+position+"px";//diminuisco la distanza della navbar fissa con il top della finestra di un valore pari alla sua altezza. essendo, la navbar mobile, a un livello inferiore rispetto a quella fissa, questa verrà coperta. 
  }
  prevScrollpos = currentScrollPos; //aggiorno costantemente la nuova posizione della finestra
}


