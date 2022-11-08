


let edadUsuario = 0
let eleccion
let cantidadCompra
let nombre = ""
var newUser
var newPass
var usuario
var pass


//----------------------------------------------------- Comienzo de arrays

const articulos = [
    {
        Id: "1",
        Industria: "Nacional",
        articulo: "Boxer",
        Marca: ["Pionero Real", "UOMO", "Lody"],
        modelosPionero: [
            { Color: "Azul", Precio: 2200, Stock: 10 },
            { Color: "Rojo", Precio: 1400, Stock: 2 },
            { Color: "Negro", Precio: 1000, Stock: 10 },
            { Color: "Celeste", Precio: 3000, Stock: 8 }],
        modelosUomo: [
            { Modelo: "Simpsons", Precio: 1500, Stock: 10 },
            { Color: "Batman", Precio: 1500, Stock: 10 },
            { Color: "Chicago", Precio: 1500, Stock: 10 },
            { Color: "Robot", Precio: 1500, Stock: 10 }],
        modelosLody: [
            { Color: "Verde", Precio: 1500, Stock: 10 },
            { Color: "Rojo", Precio: 1500, Stock: 10 },
            { Color: "Azul", Precio: 1500, Stock: 10 }],

    },
    {
        Id: "2",
        Industria: "Importado",
        Marca: ["barak", "Men"],
        articulo: "Boxer",
        modelosBarak: ["Fucsia", "Turquesa", "Gris"],
        modelosMen: ["Negro", "Azul", "Gris"],
        Precio: 1500,
        Stock: 10,
    },
    {
        Id: "3",
        Industria: "Nacional",
        Marca: ["Dufour", "Rhyton"],
        articulo: "Medias",
        modelosDufour: ["Negro,Blanco,Gris"],
        modelosRhyton: ["Negro,Azul,Blanco"],
        Precio: 1000,
        Stock: 10,
    },

]



//----------------------------------------------------Comienzo de funciones
function pedirNombre() {

    do {
        nombre = prompt("Bienvenido.\n" + "Diganos su nombre por favor");

        if (textoNullOVacio(nombre)) {
            alert("Usted no ha ingresado datos");
        }
        //el while es como el if anterior pero genero que se vuelva a crear la pregunta    
    } while (textoNullOVacio(nombre));
}

function pedirYValidarEdad() {
    let esMayorOIgualA18 = false
    do {
        //pido la edad y la recibo en texto.
        let edadIngresadaEnTexto = prompt("Hola, " + nombre + ". " + "Indicanos tu edad")

        //me fijo si es un numero, llamando a la funcion esNumerico (devuelve true o false).
        let esNumeroONo = esNumerico(edadIngresadaEnTexto);

        //si es un numero, lo convierto a Number.
        if (esNumeroONo) {
            edadUsuario = Number(edadIngresadaEnTexto);

            esMayorOIgualA18 = (edadUsuario >= 18);

            if (esMayorOIgualA18 == false) {
                alert("No puedes ingresar, eres menor.");
            }
        } else {
            alert("Usted no ha ingresado un numero");
        }

        //Me fijo si es mayor de edad, y lo guardo en una variable booleana.


    } while (esMayorOIgualA18 == false);
}

//Comprueba si es un numero o no, devuelve true o false.
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

function userNuevo() {
    do {
        newUser = prompt("Ingresa tu nuevo nombre de usuario por favor:")
        newPass = prompt("Ahora ingresa tu contraseña:")

        if (textoNullOVacio(newUser) || textoNullOVacio(newPass)) {
            alert("Datos invalidos. Intente nuevamente")
        }

    } while (textoNullOVacio(newUser) || textoNullOVacio(newPass));

    alert("Usuario Creado. A continuación deberás reingresar con tu Usuario y Clave");


}

function corroborarUser() {
    do {
        usuario = prompt("Reingrese su usuario");

        pass = prompt("Reingrese su password");

        if (newUser != usuario || newPass != pass) {
            alert("Usuario y/o contraseña erroneos. Intente nuevamente.")
        }
    } while (newUser != usuario || newPass != pass)

    alert("Sus datos fueron ingresados correctamente.");

}


function seleccionProducto() {

    let eleccion = prompt("----------------------\n" + "Que producto deseas comprar?\n" + "\n" + "1 - Boxer Nacionales\n" + "2 - Boxer Importados\n" + "3 - Medias\n" + "\n" + "Elija la opcion deseada:")

    switch (eleccion) {
        case "1":
            boxerNacionales()
            break;
        case "2":
            boxerImportados()
            break
        case "3":
            medias()
            break
        default:
            alert = ("Opcion incorrecta");
            seleccionProducto();
            break
    }
}

function boxerNacionales() {

    do {

        let eleccion = prompt("Que marca buscabas: Pionero Real, Uomo o Lody?");

        if (eleccion == "Pionero Real" || eleccion == 1) {

            alert("Haz elegido Pionero Real" + " y los modelos son: \n" + articulos[0].modelosPionero[0].Color + "\n" + articulos[0].modelosPionero[1].Color + "\n" + articulos[0].modelosPionero[2].Color + "\n" + articulos[0].modelosPionero[3].Color)
            consultaPorPrecio();
            // consultaPorModelo();

        } else if (eleccion == "Uomo" || eleccion == 2) {
            console.log((articulos[0].Marca[1]), (articulos[0].modelosUomo));

        } else if (eleccion == "Lody" || eleccion == 3) {
            console.log((articulos[0].Marca[2]), (articulos[0].modelosLody))

        } else { alert(" Opcion incorrecta.") };

    } while (articulos.filter(p => p.Marca === eleccion).length === 0 && eleccion != "1" && eleccion != "2" && eleccion != "3")

}


function boxerImportados() {

    console.log((articulos[1].Marca[0]), (articulos[1].modelosBarak), (articulos[1].Precio));
    console.log((articulos[1].Marca[1]), (articulos[1].modelosMen), (articulos[1].Precio));


}

function medias() {

    console.log((articulos[2].modelosDufour), (articulos[2].Precio));
    console.log((articulos[2].modelosRhyton), (articulos[2].Precio));


}

function consultaPorPrecio() {

    // eleccion = prompt("Hasta que precio buscabas?");
    articulos.filter((producto) => {

        alert(producto.Id)

    }
    )

}

// function consultaPorModelo() {
//     eleccion = prompt("Tenemos estos disponibles: " + (articulos[0].modelosPionero[0].Color) + " " + (articulos[0].modelosPionero[1].Color) + " " + (articulos[0].modelosPionero[2].Color) + " " + (articulos[0].modelosPionero[3].Color) + ". De que precio buscabas?")

//     if (eleccion === ) {


//         alert("Estos son los articulos menores a 150 unidades");
//         console.log(modelosPionero)
//     } else {
//         alert("todo mal")
//     }


// }



function Suma(primerNumero, segundoNumero) {
    return primerNumero + segundoNumero;
}

let numeroUno = 5;
let numeroDos = 3;

let sumatoria = Suma(numeroUno, numeroDos);



//--------------------------------------------------------INICIO DE SISTEMA

pedirNombre();

pedirYValidarEdad();

alert("Bienvenido al mundo del boxer\n" + "Es necesario crear un usuario para realizar una compra:");

userNuevo();

corroborarUser();

seleccionProducto();




//--------------------------------------------------------FIN DEL SISTEMA