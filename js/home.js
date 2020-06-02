//funzione chiamata quando si clicca il link "registrazione" dentro al form, cambia l'HTML della form aggiungendo campi
function mostra_registrazione(e) 
{ //devo percio caricare il form della registrazione e levare quello del login

    //N.B l'ID del form rimane SEMPRE "form-login"
    var item = document.getElementById("form-login");                       // prendo l'item form
    item.setAttribute("name", "form-registrazione");                        // cambio il nome della form in "form-registrazione"
    item.setAttribute("action", "php/validateRegistrazione.php");           // cambio il campo action facendo eseguire il file php di validazione della registrazione
    //cambio html della form (cambio solo input, le classi wrapper sono grafica bootstrap)
    item.innerHTML = `                                                      
        <div class="form-row align-items-center">
            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Name</div>
                    </div>
                    <input type="text" class="form-control" name="name" placeholder="Alice">
                </div>
            </div>
            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Surname</div>
                    </div>
                    <input type="text" class="form-control" name="surname" placeholder="Rossi">
                </div>
            </div>
            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">e-mail</div>
                    </div>
                    <input type="email" class="form-control" name="email" placeholder="alice@example.com">
                </div>
            </div>
            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Password</div>
                    </div>
                    <input type="password" class="form-control" size="20" name="password" placeholder="Your secret password" minlength="5"
                    onkeyup="validaPsw1();">
                </div>
            </div>
            <div id="password-ok" class="badge"></div>
            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Confirm password</div>
                    </div>
                    <input type="password" class="form-control" name="confirm" size="20" placeholder="Confirm password"
                    onkeyup="validaPsw2();">
                </div>
            </div>
            <div id="password-match" class="alert" role="alert"></div>
            <div class="input-group mb-1 mt-3">
                <div class="input-group-prepend">
                    <div>Hai già un account? Effettua il <a href="#" id="login-button">login</a>!</a>
                </div>
            </div>
        </div>
    `;
    //!!importante (riga 57) creo bottone effettua login per ripassare alla vista del login nella form

    //aggiorno gli eventi sui nuovi bottoni inseriti. devo riassegnare gli event handler ogni volta che cambio form, altrimenti i bottoni non avrebbero funzioni associate
    assegnaEvent();

    // cambio testo sul bottone submit della form
    var button = document.getElementById("form-submit");
    button.innerHTML = "Registrazione";

    // cambio testo sul titolo della form
    var title = document.getElementById("loginModalLabel");
    title.innerHTML = "Form Registrazione";
    
    // cambio testo sul bottone della navbar
    var nav_button = document.getElementById("nav-button")
    nav_button.innerHTML = "Registrazione";


}

//funzione chiamata quando si clicca il link "login" dentro al form, cambia l'HTML della form togliendo campi
function mostra_login(e) 
{
    var item = document.getElementById("form-login");                   // prendo l'elemento form
    item.setAttribute("name", "form-login");                            // cambio il nome della form
    item.setAttribute("action", "php/validateLogin.php");               // cambio il file php da eseguire dopo il submit della form
    //cambio html con i campi del login
    item.innerHTML = `
        <div class="form-row align-items-center">
            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">email</div>
                    </div>
                    <input type="text" class="form-control" name="email" placeholder="name@example.com">
                </div>
            </div>
            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Password</div>
                    </div>
                    <input type="password" class="form-control" size="25" name="password" placeholder="Your secret password" minlength="5">
                </div>
            </div>
            <div class="col-auto">
                <div class="input-group mb-1 mt-3">
                    <div class="input-group-prepend">
                        <div>Non hai un account? Effettua la <a href="#" id="registr-button">registrazione</a>!</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    //!!importante (riga 108) creo bottone effettua registrazione per ripassare alla vista della registrazione nella form

    //aggiorno eventi sui componenti creati
    assegnaEvent();

    //cambio testo nel tasto submit della form
    var button = document.getElementById("form-submit");
    button.innerHTML = "Login";

    //cambio testo del titolo del modal
    var title = document.getElementById("loginModalLabel");
    title.innerHTML = "Form Login";

    //cambio testo del bottone della navbar
    var nav_button = document.getElementById("nav-button")
    nav_button.innerHTML = "Login";
}

//funzione che assegna gli eventi per cambiamento form login-registrazione
function assegnaEvent()
 {

    //nell'html ci sta sempre solo 1 dei due bottoni
    var login_button = document.getElementById("login-button");             // prendo elemento per switchare tra le form (link "effettua il login" nel form registrazione)
    if (login_button != null)                                               // SE ESISTE quel bottone (esiste solo se il form è di registrazione)
        login_button.addEventListener("click", mostra_login);               // assegno la funzione per mostrare il form di login nel form di registrazione al' onclick del componente


    var registr_button = document.getElementById("registr-button");         // prendo elemento per switchare tra le form (link "effettua la registrazione" nel form login)
    if (registr_button != null)                                             // SE ESISTE quel bottone (esiste solo se il form è di login)
        registr_button.addEventListener("click", mostra_registrazione);     // assegno la funzione per mostrare il form di registrazione nel form di login

    //Solo un bottone alla volta è presente nella pagina, uno di questi due IF fallirà sempre (li ho messi nella stessa funzione per analogia di funzionamento)
} 

//funzione che assegna il grado di sicurezza della password inserita, assegnato al campo password del form registrazione
function validaPsw1(){  //attivata onKeyUp
    var psw = document.getElementById("form-login").password.value;     //testo dell'input password del form
        var badge = document.getElementById("password-ok");             //elemento "badge" di bootstrap, per segnalazione password sicura ecc
                                                                        // di default il badge viene creato senza la classe grafica (quella che da il colore) e senza testo (invisibile)
        var secuity = 0; //grado di sicurezza della password

    //se il campo è vuoto, il badge non è visibile
    if(psw.length == 0){
        badge.classList.remove("badge-danger");  //tolgo classe per badge rosso
        badge.classList.remove("badge-warning"); //tolgo classe per badge giallo
        badge.classList.remove("badge-success"); //tolgo classe per badge verde
        badge.innerHTML = ""                     //tolgo testo
        return;
    }

    //L'idea è di assegnare un "punto sicurezza" ogni volta che la password soddisfa un criterio di sicurezza

    // Controllo minuscole
    var minuscole = /[a-z]/g;           // <--- espressione regolare
    if (psw.match(minuscole)) {
        secuity += 1;
    }

    // Controllo maiuscole
    var maiuscole = /[A-Z]/g;           // <--- espressione regolare
    if (psw.match(maiuscole)) {
        secuity += 1;
    }

    // Controllo simboli
    var simboli = /[^A-Z^a-z]/g;        // <--- espressione regolare
    if (psw.match(simboli)) {
        secuity += 1;
    }

    // Controllo numeri
    var numeri = /[0-9]/g;              // <--- espressione regolare
    if (psw.match(numeri)) {
        secuity += 1;
    }

    // Controllo lunghezza
    if (psw.length > 10) {
        secuity += 1;
    }

    //Nel nostro caso la sicurezza va da 1 a 5
    // Assegnazione valore sicurezza

    if (secuity <= 2) {
        badge.classList.remove("badge-warning");    //tolgo classe per badge giallo
        badge.classList.remove("badge-success");    //tolgo classe per badge verde
        badge.classList.add("badge-danger");        //aggiungo classe per badge rosso
        badge.innerHTML = "Your passwork is weak!"
        return;
    }

    if (secuity <= 4) {
        badge.classList.remove("badge-danger");     //tolgo classe per badge rosso
        badge.classList.remove("badge-success");    //tolgo classe per badge verde
        badge.classList.add("badge-warning");       //aggiungo classe per badge giallo
        badge.innerHTML = "Your passwork is ok"
        return;
    }

    if (secuity == 5) {
        badge.classList.remove("badge-warning");    //tolgo classe per badge giallo
        badge.classList.remove("badge-danger");     //tolgo classe per badge rosso
        badge.classList.add("badge-success");       //aggiungo classe per badge verde
        badge.innerHTML = "Your passwork is secure!"
        return;
    }
}

//funzione che controlla se le due password matchano (campo conferma password del form) (N.B se le password non sono uguali non impedisce il submit del form (gestione nel file php))
function validaPsw2() {
    var psw1 = document.getElementById("form-login").password.value;  //valore password
    var psw2 = document.getElementById("form-login").confirm.value;   //valore password confermata
    var alert = document.getElementById("password-match");            //elemento "alert" di bootstrap per segnalazione "le password non sono uguali" ecc
                                                                      // di default alert viene creato senza la classe grafica (quella che da il colore) e senza testo (invisibile)
    
    //se il campo conferma password non è stato riempito
    if(psw2.length == 0){
        alert.classList.remove("alert-success");    //tolgo classe per alert verde
        alert.classList.remove("alert-danger");     //tolgo classe per alert rosso
        alert.innerHTML = "";
        return;
    }
    if (psw1 !== psw2) {
        alert.classList.remove("alert-success");    //tolgo classe per alert verde
        alert.classList.add("alert-danger");        //aggiungo classe per alert rosso
        alert.innerHTML = "Passwords does not match!";
    }
    else{
        alert.classList.remove("alert-danger");     //tolgo classe per alert rosso
        alert.classList.add("alert-success");       //aggiungo classe per alert verde
        alert.innerHTML = "Passwords match!"
    }
}


//funzione che cambia il testo del modal che appare per errori di login, di registrazione o la prima registrazione di un utente avvenuta con successo
function changeModal(title, body1, body2){  //ogni modal ha tre testi (titolo del modal, titolo dell'evento accaduto, testo aggiuntivo)
    var modal = document.getElementById("messageModal");

    //creo html del modal, inserendo i tre messaggi
    modal.innerHTML =`
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title modal-lg" id="loginModalLabel">`+ title +`</h2>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h3>` + body1 + `</h3>
                    <h5>`+ body2 +`</h5>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `
}

//funzione che controlla l'avvenuta autenticazione di un utente e in caso di errori mostra un messaggio
//N.B gli errori di login e registrazione sono gestiti mediante passaggio di parametri nella URL (poiche gestiti da un file esterno PHP non è possibile modificare i parametri attuali della home)
//viene eseguita "onload" del body
function controllaLogin() {
    //funzione che inizializza il localStorage(spazio nel browser dove si puo salvare dati in frmato JSon)
    inizializzaStorage();
    var nav_button = document.getElementById("nav-button")  //bottone Login della navbar
    var url = new URL(window.location.href);                //oggetto URL, contiene l'url corrente della home
    
    if(getSession() != null){                               //se la sessione esiste (getSession controlla che il local storage non sia vuoto)
        nav_button.classList.remove("btn-outline-success"); //tolgo grafica verde dal bottone
        nav_button.classList.add("btn-outline-danger");     //aggiungo grafica rossa al bottone
        nav_button.innerHTML = "Logout";                    //aggiungo testo logout

        //url.searchParams.get restituisce il valore del parametro passato nella url
        if(url.searchParams.get("registrazione")){  // se la sessione esiste ed il file php segnala l'avvenuta registrazione
            var nome = url.searchParams.get("name");
            changeModal("Benvenuto "+nome,"Grazie per esserti registrato!","Ora puoi iniziare ad usare il sito cliccando nelle varie sezioni")  //creo modal prima registrazione
            $("#messageModal").modal("show") //faccio apparire il modal
        }
        return;
    }
    //se non c'è la sessione (utente non loggato)

    if (url.searchParams.get("login") == "false") {  //se il file PHP ha segnalato un problema nel login
        if (url.searchParams.get("error")) {         //se il file PHP ha specificato il tipo di errore per il quale non è avvenuto il login
            var error = url.searchParams.get("error");
            //creo un modal per ogni errore di login possibile
            if(error == "password"){ //password errata
                changeModal("Errore Password", "Oops!", "C'è stato un'errore, la tua password sembra non essere associata all'email inserita");
            }
            else if(error == "email") { //email non presente
                changeModal("Errore Email", "Ci dispiace!", "C'è stato un'errore, la tua email sembra non essere presente nei nostri sistemi, se la tua email era corretta, ti invitiamo a registrarti");
            }
            else if(error == "needLogin"){ //accesso a pagine senza essersi loggati prima
                changeModal("Prima il login!", "Sembra tu stia tentando di accedere a delle sezioni bloccate", "Per usufruire del nostro sito è necessaria l'autenticazione, effettua il login o la registrazione!");
            }    
        }
        else{
            //se l'erroe non è specificato, creo un modal generico
            changeModal("Errore generico", "", "Si è riscontrato un'errore nella sessione, riprova");
        }

        $("#messageModal").modal("show"); //mostro modal
        mostra_login(); //mostro form login
    }

    if (url.searchParams.get("registrazione") == "false") { //se il file PHP ha segnalato un problema nella registrazione
        if (url.searchParams.get("error")) {                //se il file PHP ha specificato il tipo di errore per il quale non è avvenuta la registrazione
        var error = url.searchParams.get("error");
            //creo un modal per ogni errore di login possibile
           if (error == "password") { //la password non è uguale alla password di conferma
               changeModal("Errore Password", "Oops!", "Le due password non coincidono! Controlla e reinseriscile");
           } else if (error == "email") { //l'email per la registrazione è stata già utilizzata
               changeModal("Errore Email", "Ci dispiace!", "La tua email sembra essere già presente nei nostri sistemi, prova effettuando il login!");
           }
        }
        else {
            //modal generico
            changeModal("Errore generico", "", "Si è riscontrato un'errore nella sessione, riprova");
        }

        
        $("#messageModal").modal("show"); //mostro il modal
        mostra_registrazione();           //mostro la registrazione invece del login come primo form
    }
}

//funzione che esegue il logout dell'utente
//N.B il tasto ha per default questa funzione associata su "onClick" ma viene eseguita solo se il testo è "Logout"
function logout(){
    if (document.getElementById("nav-button").innerHTML == 'Logout'){    //se il testo del bottone è "logout"
        eliminaStorage();                                                //cancella sessione
        window.location.href = "index.html";                             //reindirizza alla home
    }
}

//FUNZIONI PER LOCAL STORAGE
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
function salvaStorage(id) { //per motivi di sicurezza, andrebbe tolta da questo file (utilizzata solo dal file php) potrebbe essere chiamata da console del browser (bypass login)
    var obj = {
        session_id: id
    };

    var storage = JSON.parse(localStorage.session);
    storage[0] = obj; //se gia esistesse la sessione la sessione, la sovrascrivo (impossibile)
    localStorage.session = JSON.stringify(storage); //salvo nel localStorage il numero di sessione                                       
    return true;
}

//torna null se la sessione non esiste, torna il numero di sessione se esiste
function getSession() {
    var sessione = JSON.parse(localStorage.session)[0];
    if (sessione == null) {
        return null;
    }
    console.log("Session: " + sessione.session_id); //debug
    return sessione.session_id;
}
