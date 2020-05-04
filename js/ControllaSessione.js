function controllaSessione(){
    inizializzaStorage();
    if(getSession() == null){
        window.location.href = ("../index.html?login=false&error=needLogin")
    }
}

function eliminaStorage() {
    localStorage.session = "[]";
    window.location.href = ("../index.html")
}

function getSession() {
    var sessione = JSON.parse(localStorage.session)[0];
    if (sessione == null) {
        return null;
    }
    console.log("Session: " + sessione.session_id);
    return sessione.session_id;
}

function inizializzaStorage() {
    if (typeof (localStorage.session) == "undefined") {
        localStorage.session = "[]";
    }
}