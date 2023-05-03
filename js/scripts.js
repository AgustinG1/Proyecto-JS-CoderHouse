// JSON de productos
const productos = [
	{
	  nombre: 'Sandwich de jamón y queso',
	  descripcion: 'Clásico sandwich de jamón y queso.',
	  precio: 500
	},
	{
	  nombre: 'Sandwich de atún',
	  descripcion: 'Sabroso sandwich de atún con lechuga y mayonesa.',
	  precio: 670
	},
	{
	  nombre: 'Sandwich vegetariano',
	  descripcion: 'Saludable sandwich vegetariano con aguacate, lechuga, tomate y mayonesa de ajo.',
	  precio: 585
	}
];

// Obtener los botones "Agregar al carrito"
const botonesAgregar = document.querySelectorAll('.agregar');

// Obtener el carrito y el total
const carrito = document.querySelector('.carrito ul');
const totalHTML = document.querySelector('#total');

// Inicializar el total en 0
let total = 0;

// Agregar un listener de clic a cada botón "Agregar al carrito"
botonesAgregar.forEach((boton, indice) => {
	boton.addEventListener('click', () => {
		// Obtener la información del producto seleccionado
		const producto = productos[indice];
		const nombre = producto.nombre;
		const precio = producto.precio;

		// Crear un nuevo elemento en el carrito con la información del producto
		const nuevoItem = document.createElement('li');
		nuevoItem.innerHTML = `${nombre} - $${precio}`;
		carrito.appendChild(nuevoItem);

		// Sumar el precio del producto al total
		total += precio;
		
		// Actualizar el total visualmente
		totalHTML.textContent = total;

		// Guardar el producto en el carrito en el almacenamiento local
		const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
		const nuevoProducto = { nombre: nombre, precio: precio };
		carritoActual.push(nuevoProducto);
		localStorage.setItem('carrito', JSON.stringify(carritoActual));
	});
});

// Agregar un listener de clic al botón "Finalizar compra"
const botonComprar = document.querySelector('#comprar');
const mensajeCompra = document.querySelector('#mensaje-compra');

botonComprar.addEventListener('click', () => {
	// Mostrar mensaje de compra con el total
	mensajeCompra.textContent = `Gracias por su compra! Total: $${total}`;
;


	// Reiniciar el carrito y el total visualmente
	carrito.innerHTML = '';
	total = 0;
	totalHTML.textContent = total;

	// Limpiar el almacenamiento local
	localStorage.removeItem('carrito');
});

// Cargar los productos del carrito desde el almacenamiento local al cargar la página
window.addEventListener('load', () => {
	const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
	carritoActual.forEach((producto) => {
		const nuevoItem = document.createElement('li');
		nuevoItem.innerHTML = `${producto.nombre} - $${producto.precio}`;
		carrito.appendChild(nuevoItem);
		total += producto.precio;
	});
	totalHTML.textContent = total;
});