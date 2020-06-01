function triggeredButton(e) 
{ 
  /*i bottoni hanno id uguale al nome della tabella che deve apparire*/ 
  var pressedButton = e.id; /*mi l'id del bottone che è stato premuto*/
  
  /*cosi ottengo tutte le tabelle di tutte le ricette*/
  var tabelle = document.getElementsByClassName("tab");
  
  var i,me,j;

  /*faccio sparire tutte le possibili tabelle*/
  for(i = 0; i < tabelle.length; i++) //ciclo tutte le tabelle di tutte le ricette
     {
      /*verifico se l'id del bottone che è stato premuto è uguale al nome della tabella attuale *//*entra 1 sola volta in questo if, quando trova l'unica tabella associata a quel bottone*/
      if(pressedButton.toString() == tabelle[i].getAttribute("name").toString()) /*paragono id del bottone e name della tabella a cui corrisponde, che nell'html combacieranno*/
      {
        tabelle[i].style.height = "100%";/*trovata la tabella corrispondente al bottone premuto imposto la sua altezza al 100% cosi da farla apparire*/
        me = tabelle[i] /*salvo la tabella che devo visualizzare*/
      }
    
  }

  /*adesso devo navigare nel DOM per riconoscere le uniche due tabelle appartenenti alla stessa ricetta di quella corrispondente al bottone premuto*/
  /*le due tabelle in questione saranno elementi fratelli della tabella salvata nella variabile me*/
  
  /*cosi mi da anche dei tag che non voglio. perche inquesto modo ottengo tutti gli elementi nel DOM,anche quelli  che non sono nodi*/
  var allSiblings = me.parentNode.childNodes;

  /*salvo in un altro array solo i siblings veri*/
  var mySiblings = [];

  for (i = 0; i < allSiblings.length; i++) 
  {
  /*l'array allSibling preso sopra quindi contiene: la tabella associata al bottone premuto, le due tabelle della stessa ricetta a cui devo annullare l'altezza e altri elementi del DOM che pero non sono nodi */
    if (allSiblings[i] !== me && allSiblings[i].nodeType==1) /* qui allora filtro l'array in modo da lasciare solo le due tabelle che volevo*//* 1=nodo, 2=attributo, 3=text, 8=commentNode*/
    { 
          mySiblings.push(allSiblings[i]) /*trovate le tabelle le inserisco nell'array dei veri fratelli. alla fine sara un array con solo le due tabelle che cercavo*/
    }
  }
  
  
  /*l'array adesso contiene solo le 2 tabelle che devo chiudere*/
  for(j=0; j<mySiblings.length; j++)
  {
    mySiblings[j].style.height = "0";/*imposto l'altezza delle tabelle da nascondere a zero*/
  }
  
  }//triggeredButton
    
   
  
    
  
  
  
  