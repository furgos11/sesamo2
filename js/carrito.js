document.addEventListener('DOMContentLoaded', () => {
    const carrito = [];

    document.querySelectorAll('button[data-producto]').forEach(button => {
        button.addEventListener('click', (event) => {
            const productoId = event.target.getAttribute('data-producto');
            agregarAlCarrito(productoId);
        });
    });

    document.getElementById('carrito-link').addEventListener('click', (event) => {
        event.preventDefault();
        mostrarCarrito();
    });

    
    document.getElementById('vaciar-carrito').addEventListener('click', (event) => {
        vaciarCarrito();
    });

    function agregarAlCarrito(productoId) {
        const producto = obtenerDetallesProducto(productoId);
        const productoEnCarrito = carrito.find(item => item.id === productoId);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1;
        } else {
            carrito.push({ id: productoId, ...producto, cantidad: 1 });
        }
        actualizarCarrito();
    }

    function obtenerDetallesProducto(productoId) {
        const productos = {
            'principales': { nombre: 'Principales', precio: 360 },
            'ensalada-completa': { nombre: 'Ensalada Completa', precio: 360 },
            'ensalada-tibia': { nombre: 'Ensalada Tibia', precio: 360 },
            'ensalada-palta': { nombre: 'Ensalada de Palta', precio: 360 },
            'ensalada-garbanzos': { nombre: 'Ensalada de Garbanzos', precio: 360 },
            'empanadas': { nombre: 'Empanadas', precio: 125 },
            'croquetas': { nombre: 'Croquetas', precio: 85 },
            'tarta-porcion': { nombre: 'Tarta Porción', precio: 165 },
            'tarta-ensalada': { nombre: 'Tarta + Ensalada + Arroz Integral', precio: 315 },
            'bocata': { nombre: 'Bocatas en Pan Casero', precio: 320 },
            'sopa': { nombre: 'Sopa', precio: 180 },
            'brownie': { nombre: 'Brownie con Helado', precio: 190 },
            'salchichon-chocolate': { nombre: 'Salchichón de Chocolate', precio: 95 },
            'tortita-dia': { nombre: 'Tortita del Día', precio: 110 },
            'jugos-naturales': { nombre: 'Jugos Naturales', precio: 160 },
            'agua-salus': { nombre: 'Agua Salus', precio: 110 },
            'kombucha': { nombre: 'Kombucha Del Mar', precio: 185 },
            'birra-artesanal': { nombre: 'Birra Artesanal', precio: 230 },
            'coca-cola': { nombre: 'Línea Coca-Cola', precio: 120 },
            'cafe-cortado': { nombre: 'Café Cortado', precio: 135 }
        };
        return productos[productoId];
    }

    function actualizarCarrito() {
        const carritoContainer = document.querySelector('#carrito-container .row');
        carritoContainer.innerHTML = '';
        let total = 0;

        carrito.forEach((producto, index) => {
            const productoElemento = document.createElement('div');
            productoElemento.className = 'col-md-4 mb-3';
            productoElemento.innerHTML = `
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-price">$${producto.precio} x ${producto.cantidad}</p>
                        <button class="btn btn-danger" data-index="${index}">Eliminar</button>
                    </div>
                </div>
            `;
            carritoContainer.appendChild(productoElemento);

            total += producto.precio * producto.cantidad;
        });

        const totalElemento = document.createElement('div');
        totalElemento.className = 'col-md-12 mt-3';
        totalElemento.innerHTML = `
            <div class="card text-center">
                <div class="card-body">
                    <h5 class="card-title">Total: $${total}</h5>
                </div>
            </div>
        `;
        carritoContainer.appendChild(totalElemento);

        document.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                eliminarDelCarrito(index);
            });
        });
    }

    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        actualizarCarrito();
    }

    function mostrarCarrito() {
        const carritoSection = document.getElementById('carrito-container');
        carritoSection.scrollIntoView({ behavior: 'smooth' });
    }

    function vaciarCarrito() {
        carrito.length = 0; 
        actualizarCarrito(); 
    }
});
