// Variables
const verCarrito = document.getElementById("verCarrito");
const orden = document.getElementById("orden");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Funciones utiles
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

// STORAGE
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//////// Inicio sistema
function sistema(contenedorFotos) {
    fetch('../data/db.json').then(async (res) => {
        let articulos = await res.json();
        console.log(articulos)
        articulos.forEach((articulo) => {
            let div = document.createElement("div");
            div.className = "col-4";
            let div2 = document.createElement("div");
            div2.className = "card m-4 shadow-sm";
            div.appendChild(div2);

            let image = document.createElement("img");
            image.src = articulo.imagen;
            image.className = "card-img-top";
            image.alt = articulo.descripcion;
            div2.appendChild(image);

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

            // Compra
            btnAgregarCarro.addEventListener("click", () => {
                carrito.push({
                    id: articulo.Id,
                    descripcion: articulo.descripcion,
                    precio: articulo.Precio,
                });
                Toastify({
                    text: "Artículo agregado ✔",
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
                saveLocal();
                armarFooter();
            })
            div2.appendChild(divDescripcion);
            contenedorFotos.appendChild(div);
        });
    });

    verCarrito.addEventListener("click", () => armarFooter());
};

function armarFooter() {
    // Comienzo orden de compra

    // orden Header
    orden.style.display = "block";
    orden.replaceChildren();
    orden.classList = "sticky-bottom border-top";
    const ordenHeader = document.createElement("div");

    ordenHeader.className = "orden-Header d-flex justify-content-center";
    ordenHeader.innerHTML = "<H2><u> Tu orden de Compra</u></H2>";

    const headerButton = document.createElement("button");
    headerButton.innerText = "❌";
    headerButton.className = "headerButton";
    headerButton.addEventListener("click", () => {
        orden.style.display = "none";
    });

    ordenHeader.appendChild(headerButton);
    orden.appendChild(ordenHeader);

    // Orden Body
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
    });

    // Orden footer
    const totalSuma = carrito.reduce((acc, articulo) => acc + articulo.precio, 0);
    const totalOrden = document.createElement("div");
    totalOrden.className = "totalOrden d-flex justify-content-center";
    let descripcion = document.createElement("h2");
    descripcion.innerText = `El total de su orden es de: $${totalSuma}`;
    totalOrden.appendChild(descripcion);
    const abonarOBorrar = document.createElement("div");
    abonarOBorrar.className = "col-12 d-flex justify-content-center";
    abonar = document.createElement("button");
    abonar.innerText = "Comprar";
    abonar.onclick = comprar;
    abonar.className = "col-2 btn btn-primary me-2";
    borrar = document.createElement("button");
    borrar.innerText = "Vaciar Pedido";
    borrar.className = "col-2 btn btn-secondary";
    borrar.onclick = vaciarCarrito;

    abonarOBorrar.appendChild(abonar);
    abonarOBorrar.appendChild(borrar);
    orden.appendChild(abonarOBorrar);
    orden.appendChild(totalOrden);
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    carrito = [];
    armarFooter();
}

function comprar() {
    Swal.fire({
        title: '¡Has comprado! ✔',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
    vaciarCarrito();
    orden.style.display = "none";
}

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

// Funciones de sistema
function inicioWeb() {
    document.querySelector("#orden").style.display = "none";
    document.querySelector("#banner").style.display = "none";

    let div = document.createElement("div");

    let parrafoBienvenida = document.createElement("p");
    parrafoBienvenida.innerText = "Nombre:";
    div.appendChild(parrafoBienvenida);

    let input = document.createElement("input");
    input.placeholder = "Nombre";
    input.className = "container-fluid mb-2 border border-dark border-2 rounded"
    input.id = "input-nombre";
    div.appendChild(input);

    let boton = document.createElement("button");
    boton.className = "btn btn-primary";
    boton.innerText = "ACEPTAR";
    boton.onclick = confirmarLogin;
    div.appendChild(boton);

    document.querySelector("#contenedor").appendChild(div);
}

function confirmarLogin() {
    let nombre = document.querySelector("#input-nombre").value;

    if (!chequearSiSonLetras(nombre)) {
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
    parrafoEdad.className = "fw-light";
    parrafoEdad.innerText = `Hola, ${nombre}. Indicanos tu edad`;
    div.appendChild(parrafoEdad);

    let input = document.createElement("input");
    input.placeholder = "Edad";
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
            let descripcion = document.createElement("p");
            descripcion.className = "fw-light";
            descripcion.innerText = "Es necesario crear un usuario para realizar una compra:";
            parrafoIngresoALaWeb.appendChild(descripcion)
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

    parrafoNewUser.innerText = "Nuevo nombre de usuario";
    divUser.appendChild(parrafoNewUser);

    let inputUser = document.createElement("input");
    inputUser.placeholder = "Usuario";
    inputUser.className = "border border-dark border-2 rounded";
    inputUser.id = "input-newUser";
    divUser.appendChild(inputUser);


    let divPass = document.createElement("div");
    let parrafoNewPass = document.createElement("p");
    parrafoNewPass.innerText = "Nueva contraseña";
    divPass.appendChild(parrafoNewPass);

    let inputPass = document.createElement("input");
    inputPass.placeholder = "Contraseña";
    inputPass.type = "password";
    inputPass.className = "border border-dark border-2 rounded";
    inputPass.id = "input-newPass";
    divPass.appendChild(inputPass);

    let divBoton = document.createElement("div");
    let boton = document.createElement("button");
    boton.className = "btn btn-primary mt-2";
    boton.innerText = "ACEPTAR";
    boton.onclick = validarUser;

    divBoton.appendChild(boton);

    document.querySelector("#user-nuevo").appendChild(divUser);

    document.querySelector("#user-nuevo").appendChild(divPass);

    document.querySelector("#user-nuevo").appendChild(divBoton);

}

function validarUser() {
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
        parrafoCheckUser.innerText = "Usuario:";
        divCheckUser.appendChild(parrafoCheckUser);

        let inputUser = document.createElement("input");
        inputUser.className = "border border-dark border-2 rounded";
        inputUser.placeholder = "Usuario";
        inputUser.id = "input-checkUser";
        divCheckUser.appendChild(inputUser);

        let divCheckPass = document.createElement("div");
        let parrafoCheckPass = document.createElement("p");
        
        parrafoCheckPass.innerText = "Contraseña:";
        divCheckPass.appendChild(parrafoCheckPass);

        let inputPass = document.createElement("input");
        inputPass.type = "password";
        inputPass.placeholder = "Contraseña";
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
        });
        accesoALaWeb();
    }
}

function accesoALaWeb() {
    document.querySelector("#nav").style.display = "flex";
    document.querySelector("#contenedor").replaceChildren();

    let div1 = document.createElement("div");
    div1.className = "d-flex justify-content-center"
    let title  = document.createElement("h2");
    title.innerText = "Boxers Nacionales";
    div1.appendChild(title);
    document.querySelector("#contenedor").appendChild(div1)

    let div2 = document.createElement("div");
    div2.className = "mt-4 col-12";

    let div3 = document.createElement("div");
    div3.className = "row d-flex justify-content-evenly";
    div2.appendChild(div3);

    sistema(div3);

    document.querySelector("#contenedor").appendChild(div2);

}

// Ejecucion
inicioWeb();