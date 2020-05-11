

/*non avevo pensato che ci sono piu ricette quindi dovrei fare un botto di id incasinare il codice tantissimo. 
penso di risolvere passando alla funzione l'oggetto this che la triggera. in modo tale che quando scrivo qui
il javascript,nel corpo della funzione senza che faccio getelementbyid ho direttamento l'oggetto che ha triggerato
la funzione*/

/*vedi anche come hai fatto per fare le schede di workout*/

function triggedButton(e) {
  
/*le chiamate javascript mi funzionano solo se uso getelementbyid e non getelementbyclassname*/

/*i bottoni hanno id uguale al nome della tabella che deve far apparire*/ /*verificato funziona*/
var pressedButton = e.id;

/*cosi ottengo tutte le tabelle di tutte le ricette*/
var tabelle = document.getElementsByClassName("tab");



var i,me,j;
/*faccio sparire tutte le possibili tabelle*/
for(i = 0; i < tabelle.length; i++)
   {
    /*entra 1 sola volta in questo if*/
    if(pressedButton.toString() == tabelle[i].getAttribute("name").toString()) /*paragono id del bottone e name della tabella a cui corrisponde, che nell'html combacieranno*/
    {
   
     
   
      tabelle[i].style.width = "100%";
      tabelle[i].style.height = "100%";
      
     /* alert(tabelle[i].parentElement.children[2].tagName);*/
       me = tabelle[i] /*salvo la tabella che devo visualizzare*/
   }
  
}
/*primo ciclo funziona come deve*/


/*cosi mi da anche dei tag che non voglio*/
var allSiblings = me.parentNode.childNodes;
/*salvo in un altro array solo i siblings veri*/
var mySiblings = [];
for (i = 0; i < allSiblings.length; i++) {
                                       /*se metto questa seconda condizione nell'if funziona tutto bene, se non la metto
                                       nell'array dei fratelli mi ci ritrovo anche degli elementi che non capisco che sono*/
  if (allSiblings[i] !== me && allSiblings[i].nodeType==1) /* 1=nodo, 2=attributo, 3=text, 8=commentNode*/
  { 
		mySiblings.push(allSiblings[i])
	}
}
/*
for(j=0; j<mySiblings.length; j++)
{
  alert(mySiblings[j].id); /*controllo
}
*/
/*fino a qui funziona tutto*/


/*l'arrray adesso contiene solo le 2 tabelle che devo chiudere*/
for(j=0; j<mySiblings.length; j++)
{
  mySiblings[j].style.width = "0%";
  mySiblings[j].style.height = "0";
}

}//function
  
 

  




  