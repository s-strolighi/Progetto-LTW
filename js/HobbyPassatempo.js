//funzione per cambiare il contenuto di ajax-container
$(document).ready(function () {
    $(".dropdown-item").click(function () {
        //creo oggetto Ajax per richiedere documento
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function (e) {
            if (e.target.readyState == 4 && e.target.status == 200) {
                document.getElementById("ajax-container").innerHTML = e.target.responseText;
            }
        };
        //richiesta get alla pagina selezionata
        httpRequest.open("GET", "pagine_passatempo/" + this.innerHTML + ".html", true);
        httpRequest.send();
    });

    var lista = document.getElementsByClassName("dropdown-item");
    var dim = lista.length;
    var scelta = Math.floor(Math.random()*dim);
    lista[scelta].click();
});