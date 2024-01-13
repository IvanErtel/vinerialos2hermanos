import productos from "./productos.js";

$(document).ready(function () {
    initOwlCarousel();

    // Verificar en qué página estamos y ejecutar la lógica correspondiente
    const path = window.location.pathname;
    if (path.includes('productos.html')) {
        initProductosPage();
    } else if (path.includes('index.html')) {
        initIndexPage();
    }
});

function initOwlCarousel() {
    $(document).ready(function () {
        $(".owl-carousel").owlCarousel({
            items: 4, // número de logos que quieres mostrar a la vez
            loop: true, // hace que el carrusel gire en un bucle continuo
            autoplay: true, // activa la reproducción automática
            autoplayTimeout: 2000, // tiempo en milisegundos antes de pasar al siguiente logo
            autoplayHoverPause: true, // pausa el carrusel cuando el mouse pasa sobre él
            autoplaySpeed: 1500 //velocidad de reproduccion automatica
        });

        $(".owl-carousel.productos").owlCarousel({
            items: 3,
            loop: true,
            autoplay: true,
            autoplayTimeout: 1000,
            autoplayHoverPause: true,
            autoplaySpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 3,
                }
            }
        });
    })
}

function initProductosPage() {
    // Lógica específica para la página de productos
    mostrarProductos(productos);
    handleProductosSearch();
}

function initIndexPage() {
    // Lógica específica para la página de inicio
    handleIndexSearch();
}

function mostrarProductos(productos) {
    const container = document.getElementById('productos-container');
    container.innerHTML = '';

    let row = document.createElement('div');
    row.className = 'row';

    productos.forEach((producto, index) => {
        const cardHtml = `
            <div class="col-md-3 mb-4">
                <div class="product-card-ofertas">
                    <img src="${producto.imagen}" alt="${producto.descripcion}" class="img-fluid" />
                    <div class="product-body">
                        <h5 class="product-title">${producto.descripcion}</h5>              
                        <div class="product-promotions">
                            <span class="badge badge-info">Pack 6 Unidades</span>
                        </div>
                        <div class="pricing">
                        <span class="price new-price">${producto.precio}</span>
                        <span class="price old-price">${producto.precio}</span>
                        <span class="discount">-10%</span>
                        <span class="favorito">♥</span>
                    </div>
                    </div>
                </div>
            </div>`;

        row.innerHTML += cardHtml;

        // Cada 4 productos, inicia una nueva fila
        if ((index + 1) % 4 === 0) {
            container.appendChild(row);
            row = document.createElement('div');
            row.className = 'row';
        }
    });

    // Asegúrate de agregar la última fila si no está vacía
    if (row.innerHTML !== '') {
        container.appendChild(row);
    }
}

function handleProductosSearch() {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");

    const filtrarYMostrarProductos = () => {
        const busqueda = searchInput.value.toLowerCase();
        const productosFiltrados = productos.filter(producto =>
            producto.descripcion.toLowerCase().includes(busqueda) ||
            producto.codigo.toLowerCase().includes(busqueda) ||
            producto.categoria.toLowerCase().includes(busqueda)
        );
        mostrarProductos(productosFiltrados);
    };

    // Evento para el botón de búsqueda en productos.html
    searchButton.addEventListener('click', (event) => {
        event.preventDefault();
        filtrarYMostrarProductos();
    });

    // Evento para el campo de entrada de búsqueda en productos.html
    searchInput.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            filtrarYMostrarProductos();
        }
    });

    // Filtrado inicial basado en el parámetro de búsqueda de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const busquedaInicial = urlParams.get('buscar');
    if (busquedaInicial) {
        searchInput.value = busquedaInicial; // Opcional: muestra el término de búsqueda en el campo de entrada
        filtrarYMostrarProductos();
    }
}


function handleIndexSearch() {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");

    const handleSearchIndex = () => {
        const searchText = searchInput.value.toLowerCase();
        window.location.href = `paginas/productos.html?buscar=${encodeURIComponent(searchText)}`;
    };

    // Eventos para el botón y el campo de búsqueda en index.html
    searchButton.addEventListener('click', (event) => {
        event.preventDefault();
        handleSearchIndex();
    });

    searchInput.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleSearchIndex();
        }
    });
}