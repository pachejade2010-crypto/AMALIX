let indiceCarrusel = 0;

document.addEventListener('DOMContentLoaded', () => {
  const carrusel = document.getElementById('carrusel');
  if (!carrusel) return;
  
  const imgs = Array.from(carrusel.getElementsByTagName('img'));
  if (imgs.length > 10) {
    imgs.slice(10).forEach(img => img.remove());
  }
});

function moverCarruselHacia(direccion) {
  const carruselContainer = document.getElementById('carrusel');
  if (!carruselContainer) return;
  
  const imagenes = carruselContainer.getElementsByTagName('img');
  const totalImagenes = imagenes.length;
  const imagenesVisibles = 3; // Mostrar 3 imágenes a la vez
  const ancho = 280; // Ancho de cada imagen + gap
  
  if (direccion === 'der') {
    indiceCarrusel++;
    if (indiceCarrusel > totalImagenes - imagenesVisibles) {
      indiceCarrusel = 0;
    }
  } else if (direccion === 'izq') {
    indiceCarrusel--;
    if (indiceCarrusel < 0) {
      indiceCarrusel = totalImagenes - imagenesVisibles;
    }
  }
  
  carruselContainer.style.transform = `translateX(-${indiceCarrusel * ancho}px)`;
}





let total = 0;
let carrito = [];

function agregarAlCarrito(nombre, precio) {
  // Buscar si el producto ya está en el carrito
  const itemExistente = carrito.find(item => item.nombre === nombre);
  
  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    carrito.push({
      nombre: nombre,
      precio: precio,
      cantidad: 1
    });
  }
  
  actualizarCarrito();
  
  // Abrir el carrito automáticamente
  const modal = document.getElementById('modal-carrito');
  if (modal.classList.contains('oculto')) {
    modal.classList.remove('oculto');
  }
}

function actualizarCarrito() {
  const carritoItems = document.getElementById('carrito-items');
  const carritoTotal = document.getElementById('carrito-total');
  const carrritoCantidad = document.getElementById('carrito-cantidad');
  
  if (carrito.length === 0) {
    carritoItems.innerHTML = '<p style="text-align: center; color: #999;">Tu carrito está vacío</p>';
    carritoTotal.textContent = '0.00';
    carrritoCantidad.textContent = '0';
    return;
  }
  
  let html = '';
  let totales = 0;
  let totalItems = 0;
  
  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    totales += subtotal;
    totalItems += item.cantidad;
    
    html += `
      <div class="item-carrito">
        <div class="item-info">
          <strong>${item.nombre}</strong>
          <p>$${item.precio.toFixed(2)} x ${item.cantidad}</p>
        </div>
        <div class="item-subtotal">
          <p>$${subtotal.toFixed(2)}</p>
          <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        </div>
      </div>
    `;
  });
  
  carritoItems.innerHTML = html;
  carritoTotal.textContent = totales.toFixed(2);
  carrritoCantidad.textContent = totalItems;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function toggleCarrito() {
  const modal = document.getElementById('modal-carrito');
  modal.classList.toggle('oculto');
}

function limpiarCarrito() {
  if (confirm('¿Deseas limpiar el carrito?')) {
    carrito = [];
    actualizarCarrito();
  }
}

function comprar() {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  
  const total = document.getElementById('carrito-total').textContent;
  alert('¡Compra realizada! Total: $' + total);
  carrito = [];
  actualizarCarrito();
  
  
  setTimeout(() => {
    toggleCarrito();
  }, 1000);
}

function seleccionar(imagen) {
  imagen.style.border = "3px solid red";
}

function toggleFavorito(elemento) {
  if (elemento.textContent === "♡") {
    elemento.textContent = "♥";
    elemento.style.color = "red";
  } else {
    elemento.textContent = "♡";
    elemento.style.color = "black";
  }
}


