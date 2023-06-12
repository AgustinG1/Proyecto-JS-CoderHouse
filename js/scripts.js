let sandwiches = [
  {
    id: 1,
    nombre: "Jamon & Queso",
    precio: 500,
  },
  {
    id: 2,
    nombre: "Atun",
    precio: 670,
  },
  {
    id: 3,
    nombre: "Vegetariano",
    precio: 585,
  },
];

let carrito = [];

const agregarProducto = (id) => {
  const existe = carrito.some((prod) => prod.id === id);

  if (existe) {
    carrito = carrito.map((prod) => {
      if (prod.id === id) {
        prod.cantidad++;
      }
      return prod;
    });
  } else {
    const item = sandwiches.find((prod) => prod.id === id);
    carrito.push({ ...item, cantidad: 1 });
  }

  guardarCarrito();
  mostrarCarrito();
};

const confirmarEliminarProducto = (id) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará el producto del carrito',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = carrito.filter((prod) => prod.id !== id);
      guardarCarrito();
      mostrarCarrito();
      Swal.fire('Eliminado', 'El producto ha sido eliminado del carrito', 'success');
    }
  });
};

const eliminarProducto = (id) => {
  confirmarEliminarProducto(id);
};

const calcularTotal = () => {
  let total = 0;
  carrito.forEach((prod) => {
    total += prod.precio * prod.cantidad;
  });
  return total;
};

const mostrarCarrito = () => {
  const carritoContenedor = document.getElementById('carritoContenedor');
  carritoContenedor.innerText = carrito.length;
  const carritoItems = document.getElementById("carritoItems");
  const carritoTotal = document.getElementById("carritoTotal");
  const mensajeCompra = document.getElementById("mensaje-compra");

  if (carritoItems) {
    carritoItems.innerHTML = "";

    if (carrito.length === 0) {
      carritoItems.innerHTML = "<li>Gracias por la compra</li>";
      carritoTotal.textContent = "0";
      mensajeCompra.textContent = "";
    } else {
      carrito.forEach((prod) => {
        const { id, nombre, precio, cantidad } = prod;
        const item = document.createElement("li");

        const aumentarCantidadBtn = document.createElement("button");
        aumentarCantidadBtn.classList.add("aumentar-cantidad");
        aumentarCantidadBtn.textContent = "+";
        aumentarCantidadBtn.addEventListener("click", () => {
          prod.cantidad++;
          mostrarCarrito();
        });

        const disminuirCantidadBtn = document.createElement("button");
        disminuirCantidadBtn.classList.add("disminuir-cantidad");
        disminuirCantidadBtn.textContent = "-";
        disminuirCantidadBtn.addEventListener("click", () => {
          if (prod.cantidad > 1) {
            prod.cantidad--;
            mostrarCarrito();
          }
        });

        item.innerHTML = `
          <span>${nombre} - Precio: $${precio} - Cantidad: ${cantidad}</span>
          <button class="eliminar" data-id="${id}">Eliminar</button>
        `;
        item.appendChild(aumentarCantidadBtn);
        item.appendChild(disminuirCantidadBtn);
        carritoItems.appendChild(item);
      });

      carritoTotal.textContent = calcularTotal();
      mensajeCompra.textContent = "";
    }
  }
};
const comprar = () => {
  const mensajeCompra = document.getElementById("mensaje-compra");
  if (carrito.length === 0) {
    mensajeCompra.textContent = "El carrito está vacío";
    return;
  }

  Swal.fire({
    title: "Finalizar compra",
    text: "¿Deseas finalizar la compra?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      // Envío de correo electrónico
      const serviceID = 'service_cuqke6g'; // Reemplaza con tu ID de servicio
      const templateID = 'template_sbd5uh5'; // Reemplaza con tu ID de plantilla

      // Preparar los datos del correo electrónico
      const templateParams = {
        to_name: 'Destinatario', // Nombre del destinatario
        from_name: 'Remitente', // Nombre del remitente
        message: 'Gracias por tu compra' // Mensaje del correo electrónico
      };

      // Enviar el formulario del correo electrónico
      emailjs.send(serviceID, templateID, templateParams)
        .then((response) => {
          console.log('Correo electrónico enviado', response);
          mensajeCompra.textContent = "¡Gracias por tu compra!";
          carrito = [];
          guardarCarrito();
          mostrarCarrito();
          Swal.fire("Compra finalizada", "¡Gracias por tu compra!", "success");
        })
        .catch((error) => {
          console.error('Error al enviar el correo electrónico', error);
          mensajeCompra.textContent = "Se produjo un error al finalizar la compra. Por favor, inténtalo de nuevo.";
        });
    }
  });
};

const guardarCarrito = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const cargarCarrito = () => {
  return new Promise((resolve, reject) => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
      resolve();
    } else {
      reject("No se encontró un carrito guardado en el Local Storage");
    }
  });
};

const iniciarCarrito = async () => {
  const botonesAgregar = document.querySelectorAll(".agregar");
  const modal = document.getElementById("modal");
  const comprarBtn = document.getElementById("comprar");
  const closeBtns = document.querySelectorAll('[data-bs-dismiss="modal"]');
  const eliminarBtns = document.querySelectorAll(".eliminar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = parseInt(boton.parentNode.parentNode.dataset.id);
      agregarProducto(id);
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("eliminar")) {
      const id = parseInt(event.target.dataset.id);
      confirmarEliminarProducto(id);
    }
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  });

  comprarBtn.addEventListener("click", comprar);

  try {
    await cargarCarrito();
    mostrarCarrito();
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener("DOMContentLoaded", iniciarCarrito);





const solicitarSandwich = async () => {
  try {
    const response = await fetch("../data/data.json");
    if (!response.ok) {
      throw new Error("Error al obtener los datos de los sándwiches");
    }
    const data = await response.json();
    sandwiches = data;
    iniciarCarrito(); // Llamada a la función iniciarCarrito después de obtener los sándwiches
  } catch (error) {
    console.error(error);
  }
};

// Uso de async y await
async function solicitarSandwiches() {
  try {
    let response = await fetch("../data/data.json");
    if (!response.ok) {
      throw new Error("Error al obtener los datos de los sándwiches");
    }
    let custom = await response.json();
    console.log("---> Respuesta formateada de la consulta", custom);
  } catch (error) {
    console.error(error);
  }
}

// Llamada a la función solicitarSandwiches
solicitarSandwiches();

// Evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  cargarCarrito();
});

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark');

    // Guardamos el modo en localstorage.
    if (body.classList.contains('dark')) {
      localStorage.setItem('dark-mode', 'true');
    } else {
      localStorage.setItem('dark-mode', 'false');
    }
  }

  // Obtenemos el modo actual almacenado en localstorage
  const savedMode = localStorage.getItem('dark-mode');
  if (savedMode === 'true') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }

  // Función para cargar el widget Darkmode.js después de que se haya cargado la página
  function addDarkmodeWidget() {
    new Darkmode().showWidget();
  }
  window.addEventListener('load', addDarkmodeWidget);

  // Activar/desactivar el modo oscuro al cargar la página
  toggleDarkMode();