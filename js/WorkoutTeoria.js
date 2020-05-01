/*non funziona il percorso dei documenti non so perche

var documenti = document.getElementsByTagName("a");
for (var i = 0; i < documenti.length; i++)
 { 
     documenti[i].onclick = caricaDocumento;
 }
function caricaDocumento(e)
{ 
   var httpRequest = new XMLHttpRequest();
   httpRequest.onreadystatechange = gestisciResponse;
   httpRequest.open("GET", "../workout/pagine/pagine_teoria/"+e.target.innerHTML+".html", true); 
   httpRequest.send(); 
}
/* si noti l’uso della proprietà target degli eventi, che restituisce l’elemento che ha causato l’evento 
function gestisciResponse(e) 
{ 
   if (e.target.readyState == 4 && e.target.status == 200)
     { 
         document.getElementById("zonaDinamica").innerHTML = e.target.responseText;    
     } 
} 
*/

