function inizializzaStorage() {
    if (typeof (localStorage.session) == "undefined") {
        localStorage.session = "[]";
    }
}

function eliminaStorage() {
    localStorage.session = "[]";
}

function salvaStorage(id) {
    var obj = {
        session_id: id
    };

    var storage = JSON.parse(localStorage.session);
    storage[0] = obj;
    localStorage.session = JSON.stringify(storage);
    return true;
}

function getSession(){
    var sessione = JSON.parse(localStorage.session)[0];
    if(sessione == null){
        return null;
    }
    console.log("Session: "+sessione.session_id);
    return sessione.session_id;
}