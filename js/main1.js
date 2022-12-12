/////// Variables
const verCarrito = document.getElementById("verCarrito")
const orden = document.getElementById("orden")
let carrito = [];
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

//////// STORAGE

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

//////// Inicio sistema

function sistema(divs) {


    articulos.forEach((articulo) => {
        let div = document.createElement("div");
        div.className = "card col-6 me-4 mt-4";
        div.style = "width: 18rem";

        let image = document.createElement("img");
        image.src = articulo.imagen;
        image.className = "card-img-top";
        image.alt = articulo.descripcion;
        div.appendChild(image);

        let divDescripcion = document.createElement("div");
        divDescripcion.className = "card-body text-center";

        let parrafoDescripcion = document.createElement("p");
        parrafoDescripcion.className = "card-text d-flex fs-3 justify-content-center";
        parrafoDescripcion.innerText = articulo.descripcion;
        divDescripcion.appendChild(parrafoDescripcion);

        let parrafoPrecio = document.createElement("p");
        parrafoPrecio.className = "card-text d-flex fs-5 justify-content-center";
        parrafoPrecio.innerText = "$" + articulo.Precio;
        divDescripcion.appendChild(parrafoPrecio);

        let btnAgregarCarro = document.createElement("button")
        btnAgregarCarro.className = "btn btn-primary mt-2 d-flex justify-content-center";
        btnAgregarCarro.innerText = "Agregar al carro";
        divDescripcion.appendChild(btnAgregarCarro);

        //////////////// compra

        btnAgregarCarro.addEventListener("click", () => {
            carrito.push({
                id: articulo.Id,
                descripcion: articulo.descripcion,
                precio: articulo.Precio,
            });
            Toastify({
                text: "Has agregado un articulo",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
            saveLocal()

        })
        div.appendChild(divDescripcion);


        divs.appendChild(div);


    });
    verCarrito.addEventListener("click", () => {
        /////////// Comienzo orden de compra

        //// orden Header
        orden.style.display = "block";
        orden.replaceChildren();

        orden.style = " border: solid white 1px;"
        const ordenHeader = document.createElement("div");

        ordenHeader.className = "orden-Header d-flex justify-content-center"
        ordenHeader.innerHTML = "<H2><u> Tu orden de Compra</u></H2>";

        const headerButton = document.createElement("button")
        headerButton.innerText = "❌"
        headerButton.className = "headerButton"
        headerButton.addEventListener("click", () => {
            orden.style.display = "none";
        });

        ordenHeader.appendChild(headerButton)

        orden.appendChild(ordenHeader);

        /////// orden Body

        carrito.forEach((articulo) => {
            let ordenBody = document.createElement("div");
            ordenBody.className = "ordenBody d-flex justify-content-center";
            let descripcion = document.createElement("h3");
            descripcion.innerText = articulo.descripcion;
            descripcion.className = "me-2";
            ordenBody.appendChild(descripcion);
            let precio = document.createElement("h3");
            precio.innerText = `$ ${articulo.precio}`;
            ordenBody.appendChild(precio);
            orden.appendChild(ordenBody)
        })

        //////// orden footer

        const totalSuma = carrito.reduce((acc, articulo) => acc + articulo.precio, 0)

        const totalOrden = document.createElement("div");
        totalOrden.className = "totalOrden d-flex justify-content-center";
        let descripcion = document.createElement("h2");
        descripcion.innerText = `El total de su orden es de: $${totalSuma}`;
        totalOrden.appendChild(descripcion);

        orden.appendChild(totalOrden)

    })
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









function inicioWeb() {
    document.querySelector("#nav").style.display = "none";
    document.querySelector("#orden").style.display = "none";
    document.querySelector("#banner").style.display = "none";


    let div = document.createElement("div");

    let parrafoBienvenida = document.createElement("p");
    parrafoBienvenida.innerText = "Bienvenido. Diganos su nombre por favor:";
    div.appendChild(parrafoBienvenida);

    let input = document.createElement("input");
    input.className = "container-fluid mb-2 border border-dark border-2 rounded"
    input.id = "input-nombre";
    div.appendChild(input);

    let boton = document.createElement("button");
    boton.className = "btn btn-primary ";
    boton.innerText = "ACEPTAR";
    boton.onclick = confirmarLogin;
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
function pedirEdad(nombre) {
    document.querySelector("#contenedor").replaceChildren();

    let div = document.createElement("div");
    let parrafoEdad = document.createElement("p");
    parrafoEdad.innerText = `Hola, ${nombre}. Indicanos tu edad`;
    div.appendChild(parrafoEdad);

    let input = document.createElement("input");
    input.className = "container-fluid border border-dark mb-2 border-3 rounded"
    input.id = "input-edad";
    div.appendChild(input);

    let boton = document.createElement("button");
    boton.className = "btn btn-primary";
    boton.innerText = "ACEPTAR";
    boton.onclick = validarEdad;
    div.appendChild(boton);

    document.querySelector("#contenedor").appendChild(div);

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
function userNuevo() {
    let divUser = document.createElement("div");
    let parrafoNewUser = document.createElement("p");

    parrafoNewUser.innerText = "Ingresa tu nuevo nombre de usuario por favor:";
    divUser.appendChild(parrafoNewUser);

    let inputUser = document.createElement("input");
    inputUser.className = "border border-dark border-2 rounded";
    inputUser.id = "input-newUser";
    divUser.appendChild(inputUser);


    let divPass = document.createElement("div");
    let parrafoNewPass = document.createElement("p");
    parrafoNewPass.innerText = "Ingresa tu nueva contraseña por favor:";
    divPass.appendChild(parrafoNewPass);

    let inputPass = document.createElement("input");
    inputPass.className = "border border-dark border-2 rounded";
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
function corroborarUser() {

    if (textoNullOVacio(document.querySelector("#input-newUser").value) || textoNullOVacio(document.querySelector("#input-newPass").value)) {
        crearError("Datos invalidos. Intente nuevamente");
    } else {
        document.querySelector("#contenedor").replaceChildren();
        let div = document.createElement("div")
        let divH2 = document.createElement("h2")
        divH2.innerText = "Reingresa tu usuario y contraseña"
        div.appendChild(divH2)


        let divCheckUser = document.createElement("div");
        let parrafoCheckUser = document.createElement("p");
        parrafoCheckUser.innerText = "Reingresa tu nombre de usuario:";
        divCheckUser.appendChild(parrafoCheckUser);

        let inputUser = document.createElement("input");
        inputUser.className = "border border-dark border-2 rounded";
        inputUser.id = "input-checkUser";
        divCheckUser.appendChild(inputUser);

        let divCheckPass = document.createElement("div");
        let parrafoCheckPass = document.createElement("p");
        parrafoCheckPass.innerText = "Reingresa tu contraseña:";
        divCheckPass.appendChild(parrafoCheckPass);

        let inputPass = document.createElement("input");
        inputPass.className = "border border-dark border-2 rounded";
        inputPass.id = "input-checkPass";
        divCheckPass.appendChild(inputPass);

        let divBoton = document.createElement("div");
        let boton = document.createElement("button");
        boton.className = "btn btn-primary mt-2";
        boton.innerText = "ACEPTAR";
        boton.onclick = chequeoUserYPass;

        divBoton.appendChild(boton);

        document.querySelector("#contenedor").appendChild(div)

        document.querySelector("#contenedor").appendChild(divCheckUser);

        document.querySelector("#contenedor").appendChild(divCheckPass);

        document.querySelector("#contenedor").appendChild(divBoton);


    }

}
function chequeoUserYPass() {
    if (textoNullOVacio(document.querySelector("#input-checkUser").value) || textoNullOVacio(document.querySelector("#input-checkPass").value)) {
        alert("Usuario y/o contraseña erroneos. Intente nuevamente.")
    } else {
        Swal.fire({
            title: 'Has creado tu usuario satisfactoriamente ✔',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
        accesoALaWeb();

    }
}
function accesoALaWeb() {
    document.querySelector("#nav").style.display = "flex";
    document.querySelector("#contenedor").replaceChildren();

    let div1 = document.createElement("div");
    div1.innerHTML = "<H2><u> Este es nuestro listado de Boxers Nacionales</u></H2>";
    div1.className = "d-flex justify-content-center"
    document.querySelector("#contenedor").appendChild(div1)

    let div2 = document.createElement("div");
    div2.className = "mt-4 col-12 row d-flex justify-content-evenly "

    sistema(div2);

    document.querySelector("#contenedor").appendChild(div2);

}
// inicioWeb();
accesoALaWeb();