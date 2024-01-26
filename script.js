const cartas = ['🌟', '🍎', '🐶', '🚀', '🎈', '🌈', '🐱', '🍕', '🌟', '🍎', '🐶', '🚀', '🎈', '🌈', '🐱', '🍕'];
let cartasVolteadas = [];
let cartaVolteada = null;

function iniciarJuego() {
    const tablero = document.getElementById('tablero');
    cartas.sort(() => Math.random() - 0.5);

    for (let i = 0; i < cartas.length; i++) {
        const carta = document.createElement('div');
        carta.className = 'carta';
        carta.dataset.index = i;
        carta.addEventListener('click', voltearCarta);
        tablero.appendChild(carta);
    }
}

function voltearCarta() {
    const carta = this;

    if (!carta.classList.contains('volteada') && cartasVolteadas.length < 2) {
        carta.innerText = cartas[carta.dataset.index];
        carta.classList.add('volteada');
        cartasVolteadas.push(carta);

        if (cartasVolteadas.length === 2) {
            setTimeout(verificarPareja, 1000);
        }
    }
}

function mostrarMensajeGanador() {
    const mensajeGanador = document.createElement('div');
    mensajeGanador.innerText = '¡Felicidades! Has encontrado todos los pares.';
    mensajeGanador.className = 'mensaje-ganador';

    document.body.appendChild(mensajeGanador);

    // Eliminar el mensaje después de 3 segundos 
    setTimeout(() => {
        mensajeGanador.remove();
    }, 3000);
}

function verificarPareja() {
    const [carta1, carta2] = cartasVolteadas;

    if (carta1.innerText === carta2.innerText) {
        cartasVolteadas.forEach(carta => carta.classList.add('encontrada'));
    } else {
        cartasVolteadas.forEach(carta => {
            carta.innerText = '';
            carta.classList.remove('volteada');
        });
    }

    cartasVolteadas = [];

    const cartasEncontradas = document.querySelectorAll('.encontrada');
    if (cartasEncontradas.length === cartas.length) {
        mostrarMensajeGanador();
        mostrarBotonReiniciar();
    }
}

function mostrarBotonReiniciar() {
    const botonReiniciar = document.getElementById('botonReiniciar');
    botonReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    const tablero = document.getElementById('tablero');
    tablero.innerHTML = ''; // Limpiar el tablero
    document.getElementById('botonReiniciar').style.display = 'none'; // Ocultar el botón

    iniciarJuego(); 
}

iniciarJuego();
