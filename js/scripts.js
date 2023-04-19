let nombreUsuario;

function pedirUsuario() {
  nombreUsuario = prompt("Ingrese su nombre");
  alert(`Hola bienvenido a mi proyecto,  ${ nombreUsuario} 😁`);
}

pedirUsuario();

class Sandwich {
  constructor(tipo, precio) {
    this.tipo = tipo;
    this.precio = precio;
  }
}

const listaSandwiches = [
  new Sandwich("Jamón y queso", 350),
  new Sandwich("Verdura", 430),
  new Sandwich("Crudo y roquefort", 675),
];

const precios = listaSandwiches.map(sandwich => sandwich.precio);
const precioPromedio = precios.reduce((total, precio) => total + precio) / precios.length;
console.log(`El precio promedio de los sandwiches es $${precioPromedio.toFixed(2)}`);

const listaEncargos = [];

function cargarEncargos() {
  const cantidadEncargos = parseInt(prompt("¿Cuántos encargos desea cargar?"));

  for (let i = 1; i <= cantidadEncargos; i++) {
    let nombreCliente;
    if (i === 1) {
      nombreCliente = nombreUsuario;
    } else {
      nombreCliente = prompt(`Ingrese el nombre del cliente ${i}`);
    }
    const tipoSandwich = parseInt(prompt("¿Qué variedad desea? \n 1- Jamón y queso \n 2- Verdura \n 3- Crudo y roquefort"));
    let precio;

    switch (tipoSandwich) {
      case 1:
        precio = listaSandwiches[0].precio;
        break;
      case 2:
        precio = listaSandwiches[1].precio;
        break;
      case 3:
        precio = listaSandwiches[2].precio;
        break;
      default:
        alert("La variedad seleccionada no es válida.");
        continue;
    }
    
    const cantidad = parseInt(prompt(`Ingrese la cantidad de sandwiches para el cliente ${i}`));
    
    const fecha = prompt("Ingrese la fecha del encargo (formato: dd/mm/yyyy)");

    const porcentajeDescuento = 30;
    const precioTotal = calcularPrecioTotal(precio, cantidad, porcentajeDescuento);

    listaEncargos.push({
      cliente: nombreCliente,
      sandwich: tipoSandwich,
      cantidad: cantidad,
      precioTotal: precioTotal,
      fecha: fecha
    });
  }
}


function calcularPrecioTotal(precio, cantidad, porcentajeDescuento) {
  let precioTotal = precio * cantidad;

  if (porcentajeDescuento > 0) {
    const descuento = precioTotal * (porcentajeDescuento / 100);
    precioTotal -= descuento;
    alert(`Se ha aplicado un descuento del ${porcentajeDescuento}%. El precio total es $${precioTotal.toFixed(2)}.`);
  } else {
    alert(`El precio total es $${precioTotal.toFixed(2)}.`);
  }

  return precioTotal;
}

function verEncargosPorFecha(encargos) {
  const fecha = prompt("Ingrese una fecha (formato: dd/mm/yyyy)");
  const encargosFiltrados = encargos.filter(encargo => encargo.fecha === fecha);
  console.log(`Encargos para la fecha ${fecha}:`);
  console.table(encargosFiltrados);
}

cargarEncargos();
console.log(listaEncargos);
verEncargosPorFecha(listaEncargos);

// Funcion de orden superior que filtra elementos de un array
function filtrarElementosArray(array, filtro) {
  return array.filter(elemento => filtro(elemento));
}

// Ejemplo de uso de la funcion de orden superior
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const numerosPares = filtrarElementosArray(numeros, numero => numero % 2 === 0);
console.log(numerosPares);

function buscarEncargos(encargos, terminoBusqueda) {
  return encargos.filter(encargo => {
    const clienteEncontrado = encargo.cliente.toLowerCase().includes(terminoBusqueda.toLowerCase());
    const sandwichEncontrado = listaSandwiches[encargo.sandwich-1].tipo.toLowerCase().includes(terminoBusqueda.toLowerCase());
    return clienteEncontrado || sandwichEncontrado;
  });
}
//
function buscarYMostrarEncargos() {
  const terminoBusqueda = prompt("Ingrese el nombre del cliente o tipo de sandwich a buscar:");
  const encargosEncontrados = buscarEncargos(listaEncargos, terminoBusqueda);

  if (encargosEncontrados.length > 0) {
    const mensaje = `Se encontraron los siguientes encargos para el término de búsqueda "${terminoBusqueda}":\n\n`;
    const detalleEncargos = encargosEncontrados.map(encargo => {
      return `Cliente: ${encargo.cliente}\nSandwich: ${listaSandwiches[encargo.sandwich-1].tipo}\nCantidad: ${encargo.cantidad}\nPrecio total: $${encargo.precioTotal.toFixed(2)}\n`;
    }).join("\n");

    alert(mensaje + detalleEncargos);
  } else {
    alert(`No se encontraron encargos para el término de búsqueda "${terminoBusqueda}".`);
  }
}




//////////

 