//jQuery per inserire gli eventhandlers del bottone cerca e delle icone delle varie app
$(document).ready(function(){
    //funzione per i video di youtube
    $(".cerca").click(function(){
        var canzone = $("#canzone").val();
        //controllo che la canzone inserita non sia vuota
        if (canzone=="" || canzone==" "){
            return;
        }
        else {
            richiestaHttp(canzone);
        }
    });
    //funzione per cambiare il contenuto di ajax-container
    $(".ajax-button").click(function(){
        //levo "active" all'icona cliccata precedentemente e la metto a quella attuale
        $(".ajax-button").removeClass("active");
        $(this).addClass("active");
        //uso ajax per richiedere il documento 
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange=function(e){
            if (e.target.readyState==4 && e.target.status == 200){
                document.getElementById("ajax-container").innerHTML=e.target.responseText;
            }
        };
        httpRequest.open("GET","pagine_musica/"+this.getAttribute("alt")+".htm",true);
        httpRequest.send();
    });
});
/*richiesta "get" al file php per prendere il contenuto html della pagina youtube 
"https://youtube.com/results?search_query=(più il testo contenuto in cerca)"*/ 
function richiestaHttp(word){
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange=gestisciResponse;
    httpRequest.open("GET","../../php/IntrattenimentoMusica.php?testo="+word,true);
    httpRequest.send();
}
/*data scraping del contenuto html della pagina youtube per trovare l'id 
del video da riprodurre*/
function gestisciResponse(e){
    if (e.target.readyState==4 && e.target.status == 200){
        var resp = e.target.responseText;
        resp=resp.split("/watch?v=")[1];
        resp=resp.split('"')[0];
        document.getElementById("youtubeFrame").innerHTML=`
            <iframe id="player" type="text/html" width="640" height="360"
            src="http://www.youtube.com/embed/`+resp+`"
            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
}       
