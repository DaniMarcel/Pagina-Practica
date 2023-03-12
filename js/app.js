// Seleccionamos las variables para ir en orden
const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-productos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

// Hacemos los Listeners 
cargarEventListeners();
function cargarEventListeners(){
    // Cuando agregas un producto presionando "Agregar al Carrito"
    listaProductos.addEventListener('click', agregarProducto);

    // Elimina productos del carrito
    carrito.addEventListener('click', eliminarProducto);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}


// Funciones
// Funcion que añade el producto al carrito
function agregarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

// Funcion para leer los datos del producto
function leerDatosProducto(producto){
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h5').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
    }

    if(articulosCarrito.some(producto => producto.id === infoProducto.id)){
        const productos = articulosCarrito.map(producto => {
            if(producto.id === infoProducto.id){
                producto.cantidad++;
                return producto;
            }else{
                return producto;
            }
        });
        articulosCarrito = [...productos];
    }else{
        infoProducto.cantidad = 1;
        articulosCarrito = [...articulosCarrito, infoProducto];
    }

    carritoHTML();
}

// Eliminar productos del carrito
function eliminarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-producto')){
        const productoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

        carritoHTML();
    }
}

// Vaciar el carrito
function vaciarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


// Muestra el carrito de compras en el HTML
function carritoHTML(){

    vaciarCarrito();

    articulosCarrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="100">
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });     
}