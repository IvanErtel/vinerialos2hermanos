import productos from "./productos.js";

$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
      items: 4, // número de logos que quieres mostrar a la vez
      loop: true, // hace que el carrusel gire en un bucle continuo
      autoplay: true, // activa la reproducción automática
      autoplayTimeout: 2000, // tiempo en milisegundos antes de pasar al siguiente logo
      autoplayHoverPause: true, // pausa el carrusel cuando el mouse pasa sobre él
      autoplaySpeed: 1500 //velocidad de reproduccion automatica
    });
  });

function mostrarProductos(productos) {
    const productListBody = document.getElementById("productListBody");
    productListBody.innerHTML = ''; // Limpiar la lista actual

    if (productos.length === 0) {
        productListBody.innerHTML = `<tr><td colspan="5" class="text-center">Por el momento no contamos con stock del producto seleccionado.</td></tr>`;
    } else {
        productos.forEach(producto => {
            const row = `
                <tr>
                    <td>${producto.codigo}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.categoria}</td>
                    <td>${producto.precio}</td>
                    <td><img src="./assets/${producto.imagen}" alt="${producto.descripcion}" style="max-width: 70px;"></td>
                </tr>
            `;
            productListBody.innerHTML += row;
        });
    }
}


document.addEventListener('DOMContentLoaded', function () {
    mostrarProductos(productos);

    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const handleSearch = () => {
        const searchText = searchInput.value.toLowerCase();
        const productosFiltrados = productos.filter(producto =>
            producto.descripcion.toLowerCase().includes(searchText) ||
            producto.codigo.toLowerCase().includes(searchText) ||
            producto.categoria.toLowerCase().includes(searchText)
        );

        mostrarProductos(productosFiltrados);
        searchInput.value = '';
    };

    // para el botón de búsqueda
    searchButton.addEventListener('click', handleSearch);

    // para el campo de búsqueda
    searchInput.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) { // 13 es el código de tecla para Enter
            handleSearch();
        }
    });
});