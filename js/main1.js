///////funciones utiles
function chequearSiSonLetras(texto) {
    return /^[a-zA-Z]+$/.test(texto);
}

function esNumerico(textoAEvaluar) {
    if (/^\d+$/.test(textoAEvaluar)) {
        return true;
    } else {
        return false;
    }
}


function textoNullOVacio(texto) {
    return texto === null || texto === "";

}
//////// Para agregar las fotos

function crearFoto() {
    let div = document.createElement("div");
    div.className = "card";
    div.style = "width: 18rem;";

    let image = document.createElement("img");
    image.src = "img/BarakBlancoRojo.png";
    image.className = "card-img-top";
    image.alt = "BarakBlancoRojo";
    div.appendChild(image);

    let divDescripcion = document.createElement("div");
    divDescripcion.className = "card-body";

    let parrafo = document.createElement("p");
    parrafo.className = "card-text";
    parrafo.innerText = "descripcion";
    divDescripcion.appendChild(parrafo);

    div.appendChild(divDescripcion);
    let contenedorDondeVoyAAgregarCosas = document.querySelector("#boxer-nacionales");
    contenedorDondeVoyAAgregarCosas.appendChild(div);
};

function crearError(descripcion) {
    let errorExistente = document.querySelector("#error");
    if (errorExistente != null) {
        errorExistente.remove();
    }

    let error = document.createElement("p");
    error.innerText = descripcion;
    error.style = "color: red";
    error.id = "error";
    document.querySelector("#contenedor").appendChild(error);
}

///////// funciones de sistema

function corroborarUser() {

    if (textoNullOVacio(document.querySelector("#input-newUser").value) || textoNullOVacio(document.querySelector("#input-newPass").value)) {
        crearError("Datos invalidos. Intente nuevamente");
    } else {
        document.querySelector("#contenedor").replaceChildren();

    }

}

function userNuevo() {
    let divUser = document.createElement("div");
    let parrafoNewUser = document.createElement("p");
    parrafoNewUser.innerText = "Ingresa tu nuevo nombre de usuario por favor:";
    divUser.appendChild(parrafoNewUser);

    let inputUser = document.createElement("input");
    inputUser.className = "border border-dark rounded";
    inputUser.id = "input-newUser";
    divUser.appendChild(inputUser);

    let divPass = document.createElement("div");
    let parrafoNewPass = document.createElement("p");
    parrafoNewPass.innerText = "Ingresa tu nueva contraseña por favor:";
    divPass.appendChild(parrafoNewPass);

    let inputPass = document.createElement("input");
    inputPass.className = "border border-dark rounded";
    inputPass.id = "input-newPass";
    divPass.appendChild(inputPass);

    let divBoton = document.createElement("div");
    let boton = document.createElement("button");
    boton.className = "btn btn-primary mt-2";
    boton.innerText = "ACEPTAR";
    boton.onclick = corroborarUser;

    divBoton.appendChild(boton);

    document.querySelector("#user-nuevo").appendChild(divUser);

    document.querySelector("#user-nuevo").appendChild(divPass);

    document.querySelector("#user-nuevo").appendChild(divBoton);





}

function validarEdad() {
    let esMayorOIgualA18 = false;
    let edadIngresadaEnTexto = document.querySelector("#input-edad").value;
    let esNumeroONo = esNumerico(edadIngresadaEnTexto);
    if (esNumeroONo) {
        edadUsuario = Number(edadIngresadaEnTexto);

        esMayorOIgualA18 = (edadUsuario >= 18);

        if (esMayorOIgualA18 == false) {
            crearError("No puedes ingresar, eres menor.");
        } else {
            document.querySelector("#contenedor").replaceChildren();
            let div = document.createElement("div");
            let parrafoIngresoALaWeb = document.createElement("h2");
            let letraOscura = document.createElement("strong");
            letraOscura.innerText = "Bienvenido al mundo del boxer. Es necesario crear un usuario para realizar una compra:";
            parrafoIngresoALaWeb.appendChild(letraOscura)
            div.appendChild(parrafoIngresoALaWeb);
            let divUsuarioNuevo = document.createElement("div");
            divUsuarioNuevo.id = "user-nuevo";
            document.querySelector("#contenedor").appendChild(div);
            document.querySelector("#contenedor").appendChild(divUsuarioNuevo);
            userNuevo();

        }
    } else {
        crearError("Usted no ha ingresado un numero");
    }
}

function pedirEdad(nombre) {
    document.querySelector("#contenedor").replaceChildren();

    let div = document.createElement("div");
    let parrafoEdad = document.createElement("p");
    parrafoEdad.innerText = `Hola, ${nombre}. Indicanos tu edad`;
    div.appendChild(parrafoEdad);

    let input = document.createElement("input");
    input.className = "border border-dark rounded"
    input.id = "input-edad";
    div.appendChild(input);

    let boton = document.createElement("button");
    boton.className = "btn btn-primary ms-2";
    boton.innerText = "ACEPTAR";
    boton.onclick = validarEdad;
    div.appendChild(boton);

    document.querySelector("#contenedor").appendChild(div);

}


function confirmarLogin() {
    let nombre = document.querySelector("#input-nombre").value;

    if (chequearSiSonLetras(nombre) === false) {
        crearError("Usted no ha ingresado un nombre.");
    }
    else {
        pedirEdad(nombre);
    }
}

function crearLogin() {
    let div = document.createElement("div");

    let parrafoBienvenida = document.createElement("p");
    parrafoBienvenida.innerText = "Bienvenido. Diganos su nombre por favor:";
    div.appendChild(parrafoBienvenida);

    let input = document.createElement("input");
    input.className = "border border-dark rounded"
    input.id = "input-nombre";
    div.appendChild(input);

    let boton = document.createElement("button");
    boton.className = "btn btn-primary ms-2 ";
    boton.innerText = "ACEPTAR";
    boton.onclick = confirmarLogin;
    div.appendChild(boton);

    document.querySelector("#contenedor").appendChild(div);
}

crearLogin();