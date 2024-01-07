import productos from "./productos.js";

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

    searchButton.addEventListener('click', () => {
        const searchText = searchInput.value.toLowerCase();
        const productosFiltrados = productos.filter(producto =>
            producto.descripcion.toLowerCase().includes(searchText) ||
            producto.codigo.toLowerCase().includes(searchText) ||
            producto.categoria.toLowerCase().includes(searchText)
        );

        mostrarProductos(productosFiltrados);

        searchInput.value = '';
    })
})