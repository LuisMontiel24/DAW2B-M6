let secretNumber; 
let attemptsLeft = 20; // Intentos iniciales
let bestScore = 20; // Mejor puntuación

const pistaElement = document.getElementById("pista"); // Elemento pista
const numberElement = document.getElementById("number"); // Elemento número
const attemptsElement = document.getElementById("attempts"); // Elemento intentos
const bestScoreElement = document.getElementById("bestScore"); // Elemento mejor puntuación
const userInputElement = document.getElementById("userInput"); // Entrada usuario
const restartButton = document.getElementById("restart"); // Botón reiniciar
const guessButton = document.getElementById("guess"); // Botón adivinar

// Función para iniciar una nueva partida
function startGame() {
    secretNumber = Math.floor(Math.random() * 10) + 1; // Número aleatorio entre 1 y 10
    attemptsLeft = 20; // Reiniciar intentos
    pistaElement.textContent = "Comencem la partida..."; // Texto inicial
    numberElement.textContent = "?"; // Mostrar número desconocido
    numberElement.style.color = "#000"; // Color negro
    attemptsElement.textContent = attemptsLeft; // Mostrar intentos
    userInputElement.value = ''; // Vaciar entrada
    guessButton.disabled = false; // Habilitar botón
    restartButton.style.display = "none"; // Ocultar botón de reinicio
    document.body.style.backgroundColor = ""; // Reiniciar color de fondo
}

// Función para validar el número introducido
function validateInput(input) {
    if (!input || isNaN(input) || input < 1 || input > 10) { // Validación entrada
        alert("El número introduït no és correcte. Ha de ser entre 1 i 10."); // Alerta de error
        return false;
    }
    return true;
}

// Función para manejar el proceso de jugada
function makeGuess() {
    const userGuess = parseInt(userInputElement.value); // Obtener número
    if (!validateInput(userGuess)) return; // Validar número

    attemptsLeft--; // Restar intento
    attemptsElement.textContent = attemptsLeft; // Actualizar intentos

    if (userGuess < secretNumber) { // Comparar menor
        pistaElement.textContent = "És més gran que el número secret."; // Pista
        numberElement.style.color = "#dc3545"; // Color rojo
        document.body.style.backgroundColor = "#dc3545"; // Cambiar fondo a rojo
    } else if (userGuess > secretNumber) { // Comparar mayor
        pistaElement.textContent = "És més petit que el número secret."; // Pista
        numberElement.style.color = "#dc3545"; // Color rojo
        document.body.style.backgroundColor = "#dc3545"; // Cambiar fondo a rojo
    } else { 
        pistaElement.textContent = "Has encertat!"; // Mensaje de acierto
        numberElement.textContent = secretNumber; // Mostrar número
        numberElement.style.color = "#28a745"; // Color verde
        document.body.style.backgroundColor = "#28a745"; // Cambiar fondo a verde
        guessButton.disabled = true; // Deshabilitar botón de adivinar
        checkBestScore(); // Verificar mejor puntuación
        restartButton.style.display = "inline"; // Mostrar botón de reinicio
    }

    if (attemptsLeft === 0) { // Sin intentos restantes
        pistaElement.textContent = "Has perdut! El número secret era " + secretNumber; // Mensaje de derrota
        numberElement.textContent = secretNumber; // Mostrar número
        numberElement.style.color = "#dc3545"; // Color rojo
        document.body.style.backgroundColor = "#dc3545"; // Cambiar fondo a rojo
        guessButton.disabled = true; // Deshabilitar botón
        restartButton.style.display = "inline"; // Mostrar botón de reinicio
    }
}

// Función para verificar si se ha alcanzado un nuevo mejor resultado
function checkBestScore() {
    if (attemptsLeft < bestScore) { // Mejor puntuación
        bestScore = attemptsLeft; // Actualizar puntuación
        bestScoreElement.textContent = bestScore; // Mostrar nueva mejor puntuación
    }
}

// Asignar eventos a los botones
guessButton.addEventListener("click", makeGuess); // Evento clic en adivinar
restartButton.addEventListener("click", startGame); // Evento clic en reiniciar

startGame();
