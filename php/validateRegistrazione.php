<html>

<head>
    <script type="text/javascript" lang="javascript">
        function salvaStorage(id) { //l'id della sessione viene passato dal file PHP, nel momento in cui l'utente esegue la registrazione o il login
            var obj = {
                session_id: id
            };

            var storage = JSON.parse(localStorage.session);
            storage[0] = obj; //se gia esistesse la sessione la sessione, la sovrascrivo (impossibile)
            localStorage.session = JSON.stringify(storage); //salvo nel localStorage il numero di sessione                                       
            return true;
        }
    </script>
</head>

<body>
    <?php
    $dbconn = pg_connect("host=localhost port=5432 dbname=LTW user=postgres password=admin")
        or die('could not connect: ' . pg_last_error());
    if (!(isset($_POST['form-submit-button']))) {
        header('Location: ../index.html');
    } else {
        $email = $_POST['email'];
        $q1 = 'select * from utente where email = $1';
        $result = pg_query_params($dbconn, $q1, array($email));
        if ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
            header('Location: ../index.html?registrazione=false&error=email');
        } else {
            $nome = $_POST['name'];
            $cognome = $_POST['surname'];
            $password = md5($_POST['password']);
            $confirm = md5($_POST['confirm']);

            if ($password != $confirm) {
                header('Location: ../index.html?registrazione=false&error=password');
            }

            $q2 = "insert into utente values ($1, $2, $3, $4)";
            $data = pg_query_params($dbconn, $q2, array($email, $nome, $cognome, $password));
            if ($data) {
                $code = (int) time();
                echo "<script>
                        salvaStorage($code);
                        window.location.href = '../index.html?registrazione=true&name=$nome';
                    </script>";
            }
        }
    }

    ?>
</body>

</html>