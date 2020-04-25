
  
   
    //filterSelection("all")
    function filterSelection(c) 
    {
    var x, i;
   x = document.getElementsByClassName("filterDiv"); //x = array degli oggetti che hanno la classe filterDiv (tutti quelli che possono essere filtrati)
   if (c == "all") c = "";
   // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
   for (i = 0; i < x.length; i++) //per tutti gli oggetti filtrabili
   {
     w3RemoveClass(x[i], "show");//rimuoviamo a tutti la classe show (quella che permette che siano visibili definita nel file css)
     if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show"); //x[i].className restituisce le classi dell'oggetto attuale
                                                                   //indexOf ritorna la prima occorrenza della stringa c in quelle classi
                                                                   //poi verifica se la stringa ritornata è >-1 (in pratica se c'è stato un riscontro)
                                                                   //se è cosi allora aggiungo la classe show che permette di mostrare l'oggetto
   }
 }
 
 // Show filtered elements
 function w3AddClass(element, name) {
   var i, arr1, arr2;
   arr1 = element.className.split(" ");
   arr2 = name.split(" ");
   for (i = 0; i < arr2.length; i++) {
     if (arr1.indexOf(arr2[i]) == -1) {
       element.className += " " + arr2[i];
     }
   }
 }
 
 // Hide elements that are not selected
 function w3RemoveClass(element, name) {
   var i, arr1, arr2;
   arr1 = element.className.split(" ");
   arr2 = name.split(" ");
   for (i = 0; i < arr2.length; i++) {
     while (arr1.indexOf(arr2[i]) > -1) {
       arr1.splice(arr1.indexOf(arr2[i]), 1);
     }
   }
   element.className = arr1.join(" ");
 }
 
 // Add active class to the current control button (highlight it)
 var btnContainer = document.getElementById("myBtnContainer");
 var btns = btnContainer.getElementsByClassName("btn");
 for (var i = 0; i < btns.length; i++) {
   btns[i].addEventListener("click", function() {
     var current = document.getElementsByClassName("active");
     current[0].className = current[0].className.replace(" active", "");
     this.className += " active";
   });
 
 
 }
     