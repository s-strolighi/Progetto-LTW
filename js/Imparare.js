function scrollCheck(){
    var e=document.getElementsByClassName("card-body");
    for (var i=0;i<e.length;i++){
        if (0 > e[i].clientWidth - e[i].scrollWidth){
            e[i].className += " scroll"; 
        }
    }
}