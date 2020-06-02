//funzione per animazione bottoni ed icone
$(document).ready(function () { //onload
    $(".card-header").click(function () { //sull'evento click sul componente con classe .card-header
       
        //su tutti gli altri card-header (non quello del click) rimuovi le classi per le animazioni ("chiudi" le sezioni)
        $(".card-header").not(this).find('.title-fade').removeClass('title-fade-active');
        $(".card-header").not(this).find('.logo').removeClass('logo-active');
        //.parent.parent perche il side-button sta fuori dal componente card-header
        $(".card-header").not(this).parent().parent().find('.side-button').removeClass('side-button-active');

        //dopo aver disattivato tutte le altre sezioni, fai il toggle sulla corrente: se attiva la disattiva, se disattiva la attiva
        $(this).find('.title-fade').toggleClass('title-fade-active');
        $(this).find('.logo').toggleClass('logo-active');
        $(this).parent().parent().find('.side-button').toggleClass('side-button-active');

    })
});

//FUNZIONI DI GESTIONED DELLA TABELLA DI COMPARAZIONE

//assegna event listener sul click del bottone
function assegnaEventi(){
    buttons = document.getElementsByClassName("side-button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", toggleButton)
    }
}

//funzione che cambia il bottone in base al click
function toggleButton(e){
    if(this.innerText.indexOf("Compara") > -1){   //se è presente "Add"
        this.innerText = "Rimuovi";  //switch sul testo del bottone

        //cambio grafica bottone
        this.classList.remove("btn-outline-light"); 
        this.classList.add("btn-light");
    }

    else{
        this.innerText = "Compara"; //switch sul testo del bottone

        //cambio grafica bottone
        this.classList.remove("btn-light");
        this.classList.add("btn-outline-light");
    }

    //passo la gestione della tabella ad un'altra funzione
    toggleTable(this.parentElement.parentElement)
    //!N.B this = bottone premuto, this.parent = sezione laterale per i bottoni, this.parent.parent = tutta la "riga" contenente il provider di servizi
}

//funzione che gestisce la tabella di comparazione
function toggleTable(current){
    var table = document.getElementById("confronto");
    var elements = table.children; //.children restituisce una lista degli elementi figli

    var title = current.getElementsByClassName("title-fade")[0].innerText; //salvo il nome del provider
    
    //per ogni figlio già presente nella tabella cerco se il nome del figlio è uguale al nome del provider passato dal click del bottone
    for(var i = 0; i < elements.length; i++){
        
        //se il nome è uguale rimuovo il figlio dalla tabella
        var cmp = elements[i].getElementsByClassName("card-header")[0].getElementsByTagName("a")[0].innerText;
        if (cmp == title) {
            table.removeChild(table.children[i]);
            
            resizeTable(); //funzione per allineamento figli in base alla quantità
            
            if(table.children.length > 1){ //se c'è più di un figlio scorro per far vedere all'utente la tabella
                table.scrollIntoView({behavior: "smooth"}); //behavior:smooth rende lo scorrimento "lento" e non istantaneo
            }
            return;
        }
    }

    //salvo dal testo i campi che voglio comparare
    var costo = current.getElementsByClassName("costo")[0].innerText;
    var esclusive = current.getElementsByClassName("esclusive")[0].innerText;
    var formato = current.getElementsByClassName("formato")[0].innerText;
    var service_link = current.getElementsByClassName("link")[0].href;
    var logo_path = current.getElementsByClassName("logo")[0].src;
    var extra = "";
    //se ci sono più "extra" li unisco
    for (var i = 0; i < current.getElementsByClassName("extra").length; i++){
        if(i > 0){
            extra += " - ";
        }
        extra += current.getElementsByClassName("extra")[i].innerText;
    }
    
    //se esco dal for senza aver trovato lo stesso figlio, lo aggiungo alla tabella
    table.innerHTML += `
        <div class="column">
        <div class="card" >
            <div class="card-header">
                <img class="table-logo" src="`+logo_path +`">
                <a href="`+service_link+`" target="_blank" class="table-title">`+title+`</a> 
            </div>
            <ul class="list-group list-group-flush">
                <li class = "list-group-item"> `+costo+ ` </li>
                <li class = "list-group-item"> `+esclusive+ ` </li>
                <li class = "list-group-item"> `+formato+ ` </li>
                <li class = "list-group-item"> `+extra+ ` </li>
            </ul>
        </div>
    </div>
    `
    resizeTable();
    if(table.children.length > 1){
        table.scrollIntoView({behavior: "smooth"});
    }
}


//funzione per ridimensionamento figli della tabella in base al numero, si basa su classi css predefinite (columns-x, da 1 a 4)
function resizeTable(){
    var table = document.getElementById("confronto");
    var children = table.children;
    if(children.length >= 4){ //massimo 4 per riga
        var n = 4;
    }
    else{
        var n = children.length;
    }

    //ad ogni elemento della tabella rimuovo tutte le classi di layout (per sicurezza) e aggiungo quella corretta
    for(var i = 0; i < children.length; i++){
        children[i].classList.remove("columns-1", "columns-2", "columns-3", "columns-4");
        children[i].classList.add("columns-"+n);
    }

}