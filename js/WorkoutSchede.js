
function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput'); /*la casella di ricerca*/
  filter = input.value.toUpperCase(); /*metto maiuscolo quello che ho scritto nella search e lo metto in filter*/
  ul = document.getElementById("myUL");/*metto in ul l'elenco*/
  li = ul.getElementsByTagName('li');/*metto in li tutte le voci dell'elenco*/

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) /*scorro tutte le voci del menu*/
  {
    card = li[i].getElementsByClassName("card-title")[0]; /*dalla voce i del menu prendo l'elemento per nome della classe(prendo la div che contiene il titolo cosi cerco per titolo di card/scheda)*/
    txtValue =  card.textContent || card.innerText  /*metto in txtvalue quello che c'è scritto all'interno dei tag con classe card mb-3 */ 
    if (txtValue.toUpperCase().indexOf(filter) > -1) /*se c'è un occorrenza di filter(cioe il testo inserito in search) in txtvalue(cioe nel testo all'interno delle card)*/
     {
      li[i].style.display = ""; /*se è cosi non faccio nulla*/
    } else {
      li[i].style.display = "none"; /*se non è cosi assegno none all' attributo css display di quella voce*/
    }
  }
}


/*
textContent vs innerText:

textContent ottiene il contenuto di tutti gli elementi, compresi gli elementi <script> e <style>. Al contrario, innerText mostra solo elementi "leggibili".
textContent restituisce ogni elemento nel nodo. Al contrario, innerText è consapevole dello stile e non restituirà il testo di elementi "nascosti". Inoltre, 
poiché innerText prende in considerazione gli stili CSS, la lettura  del valore di innerText aziona un reflow per garantire stili aggiornati. (I reflow possono 
essere computazionalmente costosi, e quindi dovrebbero essere evitati quando possibile.) A differenza di textContent, la modifica di innerText in Internet Explorer 
(versione 11 e inferiore) rimuove i nodi figlio dall'elemento e distrugge in modo permanente tutti i nodi di testo discendenti. 
È impossibile inserire nuovamente i nodi in qualsiasi altro elemento o nello stesso elemento.

Element.innerHTML:

restituisce HTML, come indica il nome. A volte le persone usano innerHTML per recuperare o scrivere testo all'interno di un elemento, ma textContent ha prestazioni migliori perché il suo valore non viene analizzato come HTML. Inoltre, l'utilizzo di textContent può impedire gli attacchi XSS.
*/