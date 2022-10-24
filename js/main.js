

// const mayorEdad = () => prompt("Hola, " + nombre + ". " + "Indicanos tu edad")
let edadUsuario = 0
let eleccion
let cantidadCompra
let newUser
let newPass
let usuario
let pass
let stockPioneroAzul = 5

let nombre = prompt("Bienvenido.\n" + "Diganos su nombre por favor")

while (nombre === "") {
    Alert = ("Usted no ha ingresado datos")
    nombre = prompt("Bienvenido.\n" + "Diganos su nombre por favor");
}

do {
    edadUsuario = Number(prompt("Hola, " + nombre + ". " + "Indicanos tu edad"))
}
while (edadUsuario < 18);

if (edadUsuario > 18) {
    alert("Bienvenido al mundo del boxer\n" + "Es necesario crear un usuario para realizar una compra:");
    userNuevo();
    corroborarUser();

} else {
    alert("Disculpa, eres menor, no puedes ingresar. Muchas gracias.");

}

//Comienzo de funciones

function userNuevo() {
    do {
        let newUser = prompt("Ingresa tu nuevo nombre de usuario por favor:");

        let newPass = prompt("Ahora ingresa tu contraseña:");

        if ((newUser == null || newPass == null) && (newUser == "") || (newPass == "")) {
            alert("Datos invalidos. Intente nuevamente")
        }

    } while (newUser == null || newPass == null);
    alert("Usuario Creado. A continuación deberás reingresar con tu Usuario y Clave")
}

function corroborarUser() {

    let usuario = prompt("Reingrese su usuario");

    let pass = prompt("Reingrese su password");

    if ((newUser === usuario) && (newPass === pass)) {
        alert("Sus datos fueron ingresados correctamente.");
        seleccionProducto();
    } else {
        alert("Sus datos ingresados no son validos");
        corroborarUser();
    }
}

function seleccionProducto() {

    console.log("----------------------");
    console.log("Que producto deseas comprar?");
    console.log("1 - Boxer Nacionales");
    console.log("2 - Boxer Importados");
    console.log("3 - Medias");

    let eleccion = prompt("Elija la opcion deseada:");
    switch (eleccion) {
        case "1":
            boxerNacionales()
            break;
        case "2":
            boxerImportados()
            break
        case "3":
            Medias()
            break
        default:
            alert = ("Opcion incorrecta");
            seleccionProducto();
            break
    }
}

function boxerNacionales() {
    console.log("----------------------");
    console.log("1 - Pionero Real - Azul - $1200");
    console.log("2 - Pionero Real -Rojo $1200");
    console.log("3 - Pionero Real - Negro $1200");
    console.log("4 - Pionero Real - Celeste $1200");
    console.log("5 - Volver al menu anterior");

    let eleccion = prompt("Elija el color");
    switch (eleccion) {
        case "1":
            compra()
            break
        case "2":
            compra()
            break
        case "3":
            compra()
            break
        case "4":
            compra()
            break
        case "5":
            seleccionProducto();
            break
        default:
            alert = ("Opcion incorrecta");

            break
    }
}

function boxerImportados() {

    console.log("----------------------");
    console.log("1 - Azul");
    console.log("2 - Rojo");
    console.log("3 - Negro");
    console.log("4 - Celeste");
    console.log("5 - Volver al menu anterior");

    let eleccion = prompt("Elija el color");
    switch (eleccion) {
        case "1":
            compra()
            break
        case "2":
            compra()
            break
        case "3":
            compra()
            break
        case "4":
            compra()
            break
        case "5":
            seleccionProducto();
            break
        default:
            alert("Opcion incorrecta");
            boxerImportados();
            break
    }
}

function compra() {
    let cantidadCompra = prompt("Cuantos desea comprar?");
    switch (cantidadCompra) {
        case "1":
            if (cantidadCompra <= stockPioneroAzul) {
                Confirm = ("Usted selecciono " + cantidadCompra + ". " + "Es Correcto?")
            }
            else if (confirm) {
                Pagar();
            }
            else {
                Alert = ("Tenemos" + stockPioneroAzul + "en stock. ");
                compra();
            }
            break
        case "2":
            console.log = ("hola")
            break
        case "3":

            break
    }

}