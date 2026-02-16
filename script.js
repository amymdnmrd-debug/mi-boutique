function pagar(nombre, precio) {
    let confirmar = confirm(`Vas a comprar ${nombre} por $${precio}. ¿Confirmar pago?`);
    if(confirmar) {
        alert('¡Gracias por tu compra! Te contactaremos por WhatsApp para enviar tu producto.');
        window.location.href = 'https://wa.me/tu-numero?text=Hola,%20quiero%20comprar%20' + encodeURIComponent(nombre);
    }
}