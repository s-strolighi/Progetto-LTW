//il local storage contiene un solo oggetto "session", con un solo campo "session_id" che contiene il numero di sessione dell'utente

//inizializzazione localStorage
function inizializzaStorage() {
    if (typeof (localStorage.session) == "undefined") {
        localStorage.session = "[]";
    }
}

//cancella il localStorage
function eliminaStorage() {
    localStorage.session = "[]";
}

//crea la nuova sessione
function salvaStorage(id) { //l'id della sessione viene passato dal file PHP, nel momento in cui l'utente esegue la registrazione o il login
    var obj = {
        session_id: id
    };

    var storage = JSON.parse(localStorage.session); 
    storage[0] = obj;                                   //se gia esistesse la sessione la sessione, la sovrascrivo (impossibile)
    localStorage.session = JSON.stringify(storage);     //salvo nel localStorage il numero di sessione                                       
    return true;
}

//torna null se la sessione non esiste, torna il numero di sessione se esiste
function getSession(){
    var sessione = JSON.parse(localStorage.session)[0];
    if(sessione == null){
        return null;
    }
    console.log("Session: "+sessione.session_id);  //debug
    return sessione.session_id;
}