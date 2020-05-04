/*JAVASCRIPT DELLO SLIDER E DEL FILTRO PER CATEGORIE*/
/*da effettuare onload del body, assegna l'event handler oninput allo slider e onclick all'elemento radio*/
function assegnaEventHandler(){
    var slider = document.getElementById("myRange");  
    var output = document.getElementById("demo");
    var contenitore=document.getElementById("contenitore");
    /*prendo le card del documento e le inserisco in un array in modo che possa recuperarle anche dopo averle rimosse dal DOM!*/
    var cards=document.getElementsByClassName("card"); 
    var arrayCards=[];
    var prezzomax=0;
    for (var i=0;i<cards.length;i++){
        var prezzoAttuale=parseInt(cards[i].getElementsByClassName("prezzo")[0].innerHTML);
        if (prezzoAttuale > prezzomax) prezzomax=prezzoAttuale;   /*cerco il prezzo massimo cosi da inserirlo come valore dell'attributo max dello slider*/
        arrayCards[i]=cards[i];
        arrayCards[i].accettabilePrezzo=true;
        arrayCards[i].accettabileTipo=true;
    }
    document.getElementById("myRange").setAttribute("max",prezzomax); //inserisco il prezzo massimo come attributo "max" dello slider
    output.innerHTML = prezzomax +"€"; //Printa valore iniziale dello slider onload del body

    //Aggiunta event handler allo slider
    slider.oninput = function() {
        /*se il costo è 0 esce la scritta gratis invece che 0*/
        if (this.value=="0"){
            output.innerHTML="Gratis";
        }
        /*altrimenti esce il costo*/
        else {
            output.innerHTML = this.value + "€"; 
        }
        //per ogni card (anche quelle non più presenti nel DOM)
        for (var i=0;i<arrayCards.length;i++){
            var prezzo=Math.ceil(parseFloat(arrayCards[i].getElementsByClassName("prezzo")[0].innerHTML)); //prezzo card
            //se il prezzo massimo è minore del prezzo della card e la card è presente nel DOM
            if (this.value < prezzo && (!(document.getElementById("card"+i)==null))){ 
                contenitore.removeChild(arrayCards[i]);  //rimuovi card
                arrayCards[i].accettabilePrezzo=false;
            }
            /*se il prezzo massimo è maggiore o uguale al prezzo della card,
            la card non è presente nel DOM, ed il filtro per categoria non esclude questa card*/
            else if (this.value >= prezzo && (document.getElementById("card"+i)==null) && arrayCards[i].accettabileTipo==true){ 
                contenitore.appendChild(arrayCards[i]);  //aggiungi card
                arrayCards[i].accettabilePrezzo=true;
            }
            /*altrimenti semplicemente inserisco la proprietà accettabilePrezzo=false/true alla card. 
            ATTENZIONE: questa proprietà viene settata anche negli if sopra a questo perchè è fondamentale per capire se una carta va riaggiunta o meno al DOM nel filtra per categoria*/
            else if (this.value < prezzo){
                arrayCards[i].accettabilePrezzo=false;
            }
            else {
                arrayCards[i].accettabilePrezzo=true;
            }
        }      
    }
    //Aggiunta event handler all'elemento radio
    var elemRadio=document.getElementsByName("tipo");
    for (var i=0;i<elemRadio.length;i++){
        elemRadio[i].onclick=function(){
            var tipo=this.value;
            /*se tipo==nessuno setto la proprietà accettabileTipo=true a tutte le card.
            Inoltre inserisco quelle che hanno un prezzo < del prezzo massimo attualmente selezionato (vedi proprietà accettabilePrezzo)
            e che non sono già presenti nel DOM.*/
            if (tipo == "nessuno"){
                for(i=0;i<arrayCards.length;i++){
                    var prova = arrayCards[i].getAttribute("class");
                    arrayCards[i].accettabileTipo=true;
                    if (arrayCards[i].accettabilePrezzo==true && document.getElementById("card"+i)==null){
                        contenitore.appendChild(arrayCards[i]);
                    }
                }
            }
            /*altrimenti setto la proprietà accettabileTipo a seconda del tipo delle diverse carte 
            e inserisco le carte che possono essere aggiunte e tolgo quelle che devono essere tolte
            ricordandomi di controllare anche la proprietà accettabilePrezzo*/
            else {
                for (var i=0;i<arrayCards.length;i++){
                    if (arrayCards[i].getAttribute("class").includes(tipo) && arrayCards[i].accettabilePrezzo==true && document.getElementById("card"+i)==null){
                        arrayCards[i].accettabileTipo=true;
                        contenitore.appendChild(arrayCards[i]);
                    }
                    else if (!arrayCards[i].getAttribute("class").includes(tipo) && !(document.getElementById("card"+i)==null)){
                        arrayCards[i].accettabileTipo=false;
                        contenitore.removeChild(arrayCards[i]);
                    }
                    else if (arrayCards[i].getAttribute("class").includes(tipo)){
                        arrayCards[i].accettabileTipo=true;
                    }
                    else {
                        arrayCards[i].accettabileTipo=false;
                    }
                }
            }
        };
    }
}


