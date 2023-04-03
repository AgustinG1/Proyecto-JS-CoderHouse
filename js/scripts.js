
function pedirUsuario(){
    let usuarioIngresado = prompt("Ingrese un usuario");
    alert("Hola bienvenido a mi proyecto" + " " + usuarioIngresado + " " + "😁")
}
pedirUsuario();
    let bienvenido = "Hola bienvenido a mi proyecto de pagina 😁" ;
    console.log(bienvenido);

//////////


let quiereInfoDescuento = prompt("¿Querés recibir descuentos y ofertas ?")
const INFO_DESCUENTO = "SI";

if( quiereInfoDescuento.toUpperCase() == INFO_DESCUENTO ) {
        alert("Okey, te invitamos a que te registres a nuestra pagina para contar con estos beneficios 👍");
}else{
    alert("Bueno, que disfrutes de la pagina 😃 ");
}


let CuantasUnidadesQuiere = 0;
do{
    CuantasUnidadesQuiere = prompt("¿Cuantas unidades de sandwich de miga quieres?");
    alert("Usted quiere" + CuantasUnidadesQuiere)
    console.log(CuantasUnidadesQuiere);
    console.log("El usuario quiere" + CuantasUnidadesQuiere + "unidades")
} while (parseFloat(CuantasUnidadesQuiere));


//////////////////////
var cantidad, precio, desc, compra, pagar;

precio = parseFloat(prompt("Ingresar precio"))
cantidad = parseFloat(prompt("Ingresar cantidad"))

compra = precio * cantidad;
desc = compra * 0.25;
pagar = compra - desc;

console.log("el descuento es: " + desc );
console.log("el total a pagar es: " + pagar)



////////////////////
let cuantosEncargosTenemos = parseFloat (prompt("Cuantos clientes tenemos hoy?"))

for (let encargo = 1; encargo <= cuantosEncargosTenemos; encargo++){
  let nombre = prompt("¿El pedido es para " + encargo + "?");
  alert("El paciente " + nombre + ", tiene asignado el turno número " + encargo);
  console.log("El cliente " + nombre + ", reservo " + encargo + " "+"unidades" );  }
////////////////////


/*
const precioD = 500;
for (const valor of precioD){
    console.log("Precio sin impuestos: " + valor)
    valor *= 1*25;
    console.log("Precio total: " + valor);
}  
*/

/*

let sandwichMiga = prompt("De que sabor quieres los sandwich?");

    alert("Usted quiere sabor: " + sandwichMiga );
    
let cuantosQuiere = parseInt (prompt("Cuantos unidades quiere?")); 

    alert("La cantidad que usted quiere es: " + cuantosQuiere );


if (true) {
    console.log("Usted quiere comprar")
}
 
/////Descuento////
function descuento(numero, porcentaje){
    return numero - (numero * porcentaje / 100 - numero)
    
}/*


var cantidad, precio, desc, compra, pagar;

precio = parseFloat(prompt("Ingresar precio"))
cantidad = parseFloat(prompt("Ingresar cantidad"))

compra = precio * cantidad;
desc = compra * 0.25;
pagar = compra - desc;

console.log("el descuento es: " + desc );
console.log("el total a pagar es: " + pagar)*/
