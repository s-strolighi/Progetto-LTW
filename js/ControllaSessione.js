// controlla se esiste la sessione, se non esiste reindirizzo alla home
function controllaSessione(){
    inizializzaStorage();
    if(getSession() == null){
        if (window.location.href.indexOf("pagine") > -1)
            window.location.href = ("../../index.html?login=false&error=needLogin")
        else
            window.location.href = ("../index.html?login=false&error=needLogin")
    }
}

// funzione che viene chiamata da ogni tasto logout nel sito, controllo per reindirizzamento verso path corretto della home
function logout() {
    localStorage.session = "[]";
    if (window.location.href.indexOf("pagine") > -1)
        window.location.href = ("../../index.html");
    else
        window.location.href = ("../index.html");
}

// ritorna null se la sessione non esiste o il numero della sessione, se esiste
function getSession() {
    var sessione = JSON.parse(localStorage.session)[0];
    if (sessione == null) {
        return null;
    }
    console.log("Session: " + sessione.session_id);
    return sessione.session_id;
}

// inizializza localStorage
function inizializzaStorage() {
    if (typeof (localStorage.session) == "undefined") {
        localStorage.session = "[]";
    }
}