//filterSelection("all")
function filterSelection(c) {

  buttons = document.getElementById("nav-hide").getElementsByClassName("btn"); //elenco dei bottoni
  filters = []; //elenco dei filtri attualmente attivi

  if (c == "tutti") c = '';

  //solo se c == "tutti" li setto tutti disattivati
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].className.indexOf(c) > -1) {
      if (buttons[i].className.indexOf('active') > -1 || c == '') { //attivo bottone se ha quel filtro o se "tutti" è attivo
        buttons[i].classList.remove("active");
      } else {
        buttons[i].classList.add("active");
      }

    }

    //salvo le classi dei bottoni attivi come filtri attualmente attivi
    if (buttons[i].className.indexOf('active') > -1 && buttons[i].className.indexOf('tutti') < 0) {
      filters[filters.length] = getFilter(buttons[i]); //aggiungo a filters[] tutte le classi dei bottoni attivi
    }
  }

  //se non ho filtri attivi (tutte le schede), attivo il primo bottone
  if (filters.length == 0) {
    buttons[0].classList.add("active");
  } else {
    buttons[0].classList.remove("active");
  }

  cards = document.getElementsByClassName("filterDiv"); //x = array degli oggetti che hanno la classe filterDiv (tutti quelli che possono essere filtrati)
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < cards.length; i++) //per tutti gli oggetti filtrabili
  {
    card_class = cards[i].className.split(' '); //tutte le classi della cards

    // !IMPORTANTE! every controlla che TUTTE le occorrenze matchano, SOME controlla che almeno una matcha
    if (filters.some(filtro => card_class.indexOf(filtro) > -1) || filters.length == 0) { //controllo che i filtri selezionati nei bottoni sono presenti all'interno delle calssi della cards
      //se la card deve essere vista
      cards[i].classList.add("show");
    } else {
      cards[i].classList.remove("show");
    }
  }

} //chiusura funzione

//Restituisce la classe del bottone inerente agli esercizi (toglie active e btn dalle classi)
function getFilter(c) {
  classes = c.className.split(' ');
  classes = classes.filter(e => e !== 'btn').filter(e => e !== 'active');
  return (classes[0]);
}

// movimento navbar del filtra
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;

  position = document.getElementById("nav-fixed").clientHeight;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("nav-hide").style.top = position+"px";
  } else {
    document.getElementById("nav-hide").style.top = "-"+position+"px";
  }
  prevScrollpos = currentScrollPos;
}


//mostro la barra all'interno delle card solo se il testo va in overflow