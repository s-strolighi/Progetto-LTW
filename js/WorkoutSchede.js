
function myFunction() //triggerata quando scrivo qualcosa nel cerca
{  
  //per prima cosa setto le variabili
  var input, filter, ul, li, a, i, txtValue;

  input = document.getElementById('myInput'); /*prendo la casella di ricerca*/
  filter = input.value.toUpperCase(); /*prendo cio che è stato scritto nel cerca e lo rendo tutto maiuscolo*/
  ul = document.getElementById("myUL");/*prendo l'elenco delle schede*/
  li = ul.getElementsByTagName('li');/*prendo tutte le schede dell'elenco*/

  //ciclo tutte le voci dell'elenco e nascondo quelle che non matchano con cio che è stato cercato
  for (i = 0; i < li.length; i++) /*scorro tutte le voci dell'elenco*/
  {
    card = li[i].getElementsByClassName("card-title")[0]; /*prendo la voce corrente dell'elenco. quindi la prima scheda di quella scheda selezioniamo solo la div contenente il titolo e la mettiamo in una variabile*/
    txtValue =  card.textContent  /*metto in txtvalue quello che c'è scritto all'interno dei tag con classe card mb-3 */ 
    if (txtValue.toUpperCase().indexOf(filter) > -1) /*se c'è un occorrenza di filter(cioe il testo inserito in search) in txtvalue(cioe nel testo all'interno delle card)*/
     {
      li[i].style.display = ""; /*allora non faccio nulla e lascio la variabile display al valore di default*/
    } else {
      li[i].style.display = "none"; /*se non è cosi assegno none all' attributo css display di quella voce che verra quindi visualizzata*/
    }
  }
}



/*stessa funzione che di erecizi che aggiorna costantemente la navbar mobile*/
var prevScrollpos = window.pageYOffset;
window.onscroll = function () 
{
  var currentScrollPos = window.pageYOffset;

  position = document.getElementById("nav-fixed").clientHeight;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("nav-hide").style.top = position + "px";
  } else {
    document.getElementById("nav-hide").style.top = "-86px";
  }
  prevScrollpos = currentScrollPos;
}

