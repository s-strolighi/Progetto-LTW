<?php
    //prendo il parametro che mi passa la richiesta get fatta nel file IntrattenimentoMusica.js
    $riferimento = $_REQUEST["testo"];
    //rimpiazzo gli spazi bianchi con degli + per rispettare il protocollo di ricerca di youtube
    $riferimento = str_replace(" ","+",$riferimento);
    $stringa="https://youtube.com/results?search_query=" . $riferimento;
    //funzione che mi ritorna la stringa corrispondente al documento html dell'url contenuto in $stringa
    $data = file_get_contents($stringa);
    echo $data;
?>