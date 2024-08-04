const contenedor = document.querySelector(".contenedor");
//Definicion de medidas

const altoTablero = 300;
const anchoTablero = 570;
const altoBloque = 20;
const anchoBloque = 100;

//Defini posicion para Usuario

const posicionIniUsu = [230, 10];
let posicionActualUsu = posicionIniUsu;

//Definir posicion de la bola
const posicionIniBola = [270, 40];
let posicionActualBola = posicionIniBola;

//Definir movimiento bola
let xDireccionBola = 2;
let yDireccionBola = 2;
let diametro = 20;

//definir timer
let timerID;

// Definicion de la clase bloque

class bloque {
  constructor(ejeX, ejeY) {
    this.bottomLeft = [ejeX, ejeY];
    this.bottomRight = [ejeX + anchoBloque, ejeY];
    this.topLeft = [ejeX, ejeY + altoBloque];
    this.topRight = [ejeX + anchoBloque, ejeY + altoBloque];
  }
}

//Definir todos los bloques
const bloques = [
  new bloque(10, 250),
  new bloque(120, 250),
  new bloque(230, 250),
  new bloque(340, 250),
  new bloque(450, 250),
  new bloque(10, 220),
  new bloque(120, 220),
  new bloque(230, 220),
  new bloque(340, 220),
  new bloque(450, 220),
  new bloque(10, 190),
  new bloque(120, 190),
  new bloque(230, 190),
  new bloque(340, 190),
  new bloque(450, 190),
];

//Funcion añadir bloques

function addBloques() {
  for (let i = 0; i < bloques.length; i++) {
    const bloque = document.createElement("div");
    bloque.classList.add("bloque");
    bloque.style.left = bloques[i].bottomLeft[0] + "px";
    bloque.style.bottom = bloques[i].bottomLeft[1] + "px";
    contenedor.appendChild(bloque);
  }
}

addBloques();

//Funcion dibujar bloque de usuario

function dibujarUsuario() {
  usuario.style.left = posicionActualUsu[0] + "px";
  usuario.style.bottom = posicionActualUsu[1] + "px";
}
//Añadir usuario

const usuario = document.createElement("div");
usuario.classList.add("usuario");
contenedor.appendChild(usuario);

dibujarUsuario();

// mover usuario
function moverUsuario(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (posicionActualUsu[0] > 0) {
        posicionActualUsu[0] -= 10;
        dibujarUsuario();
      }
      break;
    case "ArrowRight":
      if (posicionActualUsu[0] < anchoTablero - anchoBloque) {
        posicionActualUsu[0] += 10;
        dibujarUsuario();
      }
      break;
  }
}
//Añadir alemento escuchador

document.addEventListener("keydown", moverUsuario);

//Dibujar la bola
function dibujaBola() {
  bola.style.left = posicionActualBola[0] + "px";
  bola.style.bottom = posicionActualBola[1] + "px";
}
const bola = document.createElement("div");
bola.classList.add("bola");
contenedor.appendChild(bola);

dibujaBola();

function moverBola() {
  posicionActualBola[0] += xDireccionBola;
  posicionActualBola[1] += yDireccionBola;
  dibujaBola();
  revisarColisiones();
  gameOver();
}
timerID = setInterval(moverBola, 20);

//Funcion colision
function revisarColisiones() {
  //colision con bloques
  for (let i = 0; i < bloques.length; i++) {
    if (
      posicionActualBola[0] > bloques[i].bottomLeft[0] &&
      posicionActualBola[0] < bloques[i].bottomRight[0] &&
      posicionActualBola[1] + diametro > bloques[i].bottomLeft[1] &&
      posicionActualBola[1] < bloques[i].topLeft[1]
    ) {
      const todosLosBloques = Array.from(document.querySelectorAll(".bloque"));
      todosLosBloques[i].classList.remove("bloque");
      bloques.splice(i, 1);
      cambiarDireccion();
    }
  }

  //Colisiones con las paredes
  if (
    posicionActualBola[0] >= anchoTablero - diametro ||
    posicionActualBola[1] >= altoTablero - diametro ||
    posicionActualBola[0] <= 0 ||
    posicionActualBola[1] <= 0
  ) {
    cambiarDireccion();
  }
  //Colision con Usuario

  if (
    posicionActualBola[0] > posicionActualUsu[0] &&
    posicionActualBola[0] < posicionActualUsu[0] + anchoBloque &&
    posicionActualBola[1] > posicionActualUsu[1] &&
    posicionActualBola[1] < posicionActualUsu[1] + altoBloque
  ) {
    cambiarDireccion();
  }
}

//Funcion fin de juego
function gameOver() {
  if (posicionActualBola[1] <= 0) {
    clearInterval(timerID);

    document.removeEventListener("keydown", moverUsuario);
  }
}

//Funcion cambio de direccion

function cambiarDireccion() {
  if (xDireccionBola === 2 && yDireccionBola === 2) {
    yDireccionBola = -2;
    return;
  }
  if (xDireccionBola === 2 && yDireccionBola === -2) {
    xDireccionBola = -2;
    return;
  }
  if (xDireccionBola === -2 && yDireccionBola === -2) {
    yDireccionBola = 2;
    return;
  }
  if (xDireccionBola === -2 && yDireccionBola === 2) {
    xDireccionBola = 2;
    return;
  }
}
