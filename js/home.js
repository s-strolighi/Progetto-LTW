function mostra_registrazione(e) {
    var item = document.getElementById("form-login");
    item.innerHTML = `
        <div class="form-row align-items-center">
            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Username</div>
                    </div>
                    <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Mailik947">
                </div>
            </div>
            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Name</div>
                    </div>
                    <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Alice">
                </div>
            </div>
            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Surname</div>
                    </div>
                    <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Rossi">
                </div>
            </div>
            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">e-mail</div>
                    </div>
                    <input type="email" class="form-control" id="inlineFormInputGroup" placeholder="alice@example.com">
                </div>
            </div>
            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Password&nbsp;</div>
                    </div>
                    <input type="password" class="form-control" id="inlineFormInputGroup" placeholder="Your secret password">
                </div>
            </div>
            <div class="col-auto">
                <div class="input-group mb-1 mt-3">
                    <div class="input-group-prepend">
                        <div>Hai già un account? Effettua il <a href="#" id="login-button">login</a>!</a>
                    </div>
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
    item.innerHTML = `
        <div class="form-row align-items-center">
            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Username</div>
                    </div>
                    <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Mailik947">
                </div>
            </div>
            <div class="col-auto">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Password&nbsp;</div>
                    </div>
                    <input type="password" class="form-control" id="inlineFormInputGroup" placeholder="Your secret password">
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
