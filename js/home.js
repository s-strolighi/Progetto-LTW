function mostra_registrazione(e) {
    var item = document.getElementById("form-login");
    item.setAttribute("name", "form-registrazione");
    item.setAttribute("action", "php/validateRegistrazione.php");
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
    assegnaEvent();

    var button = document.getElementById("form-submit");
    button.innerHTML = "Registrazione";

    var title = document.getElementById("loginModalLabel");
    title.innerHTML = "Form Registrazione";

    var nav_button = document.getElementById("nav-button")
    nav_button.innerHTML = "Registrazione";


}

function mostra_login(e) {
    var item = document.getElementById("form-login");
    item.setAttribute("name", "form-login");
    item.setAttribute("action", "php/validateLogin.php");
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
            <div id="login-correct"class="alert" role="alert"></div>
            <div class="col-auto">
                <div class="input-group mb-1 mt-3">
                    <div class="input-group-prepend">
                        <div>Non hai un account? Effettua la <a href="#" id="registr-button">registrazione</a>!</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    assegnaEvent();

    var button = document.getElementById("form-submit");
    button.innerHTML = "Login";


    var title = document.getElementById("loginModalLabel");
    title.innerHTML = "Form Login";

    var nav_button = document.getElementById("nav-button")
    nav_button.innerHTML = "Login";
}

function assegnaEvent() {
    var login_button = document.getElementById("login-button");
    if (login_button != null)
        login_button.addEventListener("click", mostra_login);


    var registr_button = document.getElementById("registr-button");
    if (registr_button != null)
        registr_button.addEventListener("click", mostra_registrazione);
} 

function validaPsw1(){
    var psw = document.getElementById("form-login").password.value;
    var badge = document.getElementById("password-ok");
    var secuity = 0;

    if(psw.length == 0){
        badge.classList.remove("badge-warning");
        badge.classList.remove("badge-success");
        badge.classList.remove("badge-danger");
        badge.innerHTML = ""
        return;
    }


    // Controllo minuscole
    var minuscole = /[a-z]/g;
    if (psw.match(minuscole)) {
        secuity += 1;
    }

    // Controllo maiuscole
    var maiuscole = /[A-Z]/g;
    if (psw.match(maiuscole)) {
        secuity += 1;
    }

    // Controllo simboli
    var simboli = /[^A-Z^a-z]/g;
    if (psw.match(simboli)) {
        secuity += 1;
    }

    // Controllo numeri
    var numeri = /[0-9]/g;
    if (psw.match(numeri)) {
        secuity += 1;
    }

    // Controllo lunghezza
    if (psw.length > 10) {
        secuity += 1;
    }

    // Assegnazione valore sicurezza

    if (secuity <= 2) {
        badge.classList.remove("badge-warning");
        badge.classList.remove("badge-success");
        badge.classList.add("badge-danger");
        badge.innerHTML = "Your passwork is weak!"
        return;
    }

    if (secuity <= 4) {
        badge.classList.remove("badge-danger");
        badge.classList.remove("badge-success");
        badge.classList.add("badge-warning");
        badge.innerHTML = "Your passwork is ok"
        return;
    }

    if (secuity == 5) {
        badge.classList.remove("badge-warning");
        badge.classList.remove("badge-danger");
        badge.classList.add("badge-success");
        badge.innerHTML = "Your passwork is secure!"
        return;
    }
}

function validaPsw2() {
    var psw1 = document.getElementById("form-login").password.value;
    var psw2 = document.getElementById("form-login").confirm.value;
    var alert = document.getElementById("password-match");
    if(psw2.length == 0){
        alert.classList.remove("alert-success");
        alert.classList.remove("alert-danger");
        alert.innerHTML = "";
        return;
    }
    if (psw1 !== psw2) {
        alert.classList.remove("alert-success");
        alert.classList.add("alert-danger");
        alert.innerHTML = "Passwords does not match!";
    }
    else{
        alert.classList.remove("alert-danger");
        alert.classList.add("alert-success");
        alert.innerHTML = "Passwords match!"
    }
}

function changeModal(title, body1, body2){
    var modal = document.getElementById("messageModal");
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

function controllaLogin() {
    inizializzaStorage();
    var nav_button = document.getElementById("nav-button")
    var url = new URL(window.location.href);
    
    if(getSession() != null){
        nav_button.classList.remove("btn-outline-success");
        nav_button.classList.add("btn-outline-danger");
        nav_button.innerHTML = "Logout";

        if(url.searchParams.get("registrazione")){
            var nome = url.searchParams.get("name");
            changeModal("Benvenuto "+nome,"Grazie per esserti registrato!","Ora puoi iniziare ad usare il sito cliccando nelle varie sezioni")
            $("#messageModal").modal("show")
            console.log("Benvenuto " + nome);
        }
        return;
    }
    if (url.searchParams.get("login") == "false") {
        if (url.searchParams.get("error")) {
            var error = url.searchParams.get("error");
            if(error == "password"){
                changeModal("Errore Password", "Oops!", "C'è stato un'errore, la tua password sembra non essere associata all'email inserita");
            }
            else if(error == "email") {
                changeModal("Errore Email", "Ci dispiace!", "C'è stato un'errore, la tua email sembra non essere presente nei nostri sistemi, se la tua email era corretta, ti invitiamo a registrarti");
            }
            else if(error == "needLogin"){
                changeModal("Prima il login!", "Sembra tu stia tentando di accedere a delle sezioni bloccate", "Per usufruire del nostro sito è necessaria l'autenticazione, effettua il login o la registrazione!");
            }    
        }
        else{
            changeModal("Errore generico", "", "Si è riscontrato un'errore nella sessione, riprova");
        }
        $("#messageModal").modal("show");
        mostra_login();
        console.log("Errore login: "+error);
    }

    if (url.searchParams.get("registrazione") == "false") {
        if (url.searchParams.get("error")) {
        var error = url.searchParams.get("error");
           if (error == "password") {
               changeModal("Errore Password", "Oops!", "Le due password non coincidono! Controlla e reinseriscile");
           } else if (error == "email") {
               changeModal("Errore Email", "Ci dispiace!", "La tua email sembra essere già presente nei nostri sistemi, prova effettuando il login!");
           }
        }
        else {
            changeModal("Errore generico", "", "Si è riscontrato un'errore nella sessione, riprova");
        }

        $("#messageModal").modal("show");
        mostra_registrazione();
        console.log("Errore registrazione: " + error)
    } 
}


function logout(){
    if (document.getElementById("nav-button").innerHTML == 'Logout'){
        eliminaStorage();
        window.location.href = "index.html";
    }
}
