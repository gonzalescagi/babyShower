//eccion de variables
var musicOn=false;
var audio = new Audio('indigo.mp3');

function animationScroll(){
     var links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            var targetId = this.getAttribute('href').slice(1);
            var targetElement = document.getElementById(targetId);
            var targetOffset = targetElement.offsetTop;

            // Scroll suave
            window.scrollTo({
                top: targetOffset,
                behavior: 'smooth'
            });

        });
    });
}
function tiempoRestante(fechaObjetivo) {
    var ahora = new Date(); // Fecha y hora actual
    var diferencia = fechaObjetivo - ahora; // Diferencia en milisegundos

    // Calcular días, horas, minutos y segundos restantes
    var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    var horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    var segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
if(horas < 0){
    const temp = document.getElementById('temp');
    temp?temp.style.display="none":null;
}
    return {
        dias: dias,
        horas: horas,
        minutos: minutos,
        segundos: segundos
    };
}
function showBtnSound(){
    const btnSound = document.getElementById('btn-sound');
    btnSound.style.display='flex';
}
function playMuic(){
    audio.loop = true; // Reproducir en bucle
    audio.play(); // Iniciar reproducción
    musicOn=true;
    showBtnSound();
}

function stopMuic(){
    if (musicOn) {
        audio.pause(); // Detener la reproducción
        //audio.currentTime = 0; // Reiniciar la pista al principio
        musicOn=false;
    } else playMuic()
}

function initApp(){
    if(!musicOn){
        playMuic(); 
        let bt = document.getElementById('btnInit');
        bt.style.display="none";
    }
    
}

var fechaObjetivo = new Date("05/04/2024 18:00:00"); // Fecha y hora objetivo
var tiempoRestanteObj = tiempoRestante(fechaObjetivo);

setInterval(()=>{
    var tiempo = tiempoRestante(fechaObjetivo);
  // var doc = document.getElementById("currentDate");
    let dia = document.getElementById("dia");
    let hora = document.getElementById("hora");
    let minuto = document.getElementById("minuto");
    let segundo = document.getElementById("segundo");
   //doc.innerHTML= "Faltan "+ tiempo.dias + " día "+ tiempo.horas + " horas con "+tiempo.minutos+" minutos y "+tiempo.segundos;
    dia.innerHTML=tiempo.dias;
    hora.innerHTML=tiempo.horas;
    minuto.innerHTML=tiempo.minutos;
    segundo.innerHTML=tiempo.segundos;
},1000)


//no usado .. xq no ejecuta la animacion del scrol
 function redireccionar(id,targetId) {
            var targetElement = document.getElementById(id);
            var targetOffset = targetElement.offsetTop;
            window.scrollTo({top: targetOffset,behavior: 'smooth'});
            window.location.href =targetId // "#googlemaps";
}




///LLUVIA////
/*
function crearConfeti() {
    const confeti = document.createElement('div');
    confeti.classList.add('confeti');

    const tamaño = Math.random() * 10 + 5; // Tamaño aleatorio entre 5px y 15px
    const posicionX = Math.random() * window.innerWidth; // Posición X aleatoria en la ventana
    const rotacion = Math.random() * 360; // Rotación aleatoria

    confeti.style.width = tamaño + 'px';
    confeti.style.height = tamaño + 'px';
    confeti.style.left = posicionX + 'px';
    confeti.style.transform = `rotate(${rotacion}deg)`;

    document.querySelector('.contenedor-confeti').appendChild(confeti);

    // Remover el confeti después de la animación
    confeti.addEventListener('animationend', () => {
        confeti.remove();
    });
}
*/
// Generar confeti cada 100ms
//setInterval(crearConfeti, 350);


// Función para verificar si la sección está visible en la pantalla
function esVisible(elemento) {
    const posicion = elemento.getBoundingClientRect();
    return (
        posicion.top >= 0 &&
        posicion.left >= 0 &&
        posicion.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        posicion.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para manejar la animación cuando la sección es visible
function manejarAnimacion() { 
    const seccion = document.querySelector('.date');
    const avion = document.querySelector('.avion');
    //verifica en que seccion esta para activar las animaciones
    //pagina 2
    if (esVisible(document.querySelector('.date'))) {
            let btnConf = document.getElementById('btn-confirmation');
            let btnLocation = document.getElementById('btn-location');
            let avion = document.querySelector('.avion');
            btnConf.classList.add('desdeDerecha');
            btnLocation.classList.add('desdeIzquierda');
            avion.classList.add('desdeDerecha');
    }
    //pagina 3 mapa
    if (esVisible(document.getElementById('googlemaps'))) {
        let animales = document.querySelector('.animalitos');
        let googleMaps = document.getElementById('googlemaps');
        let cajaDireccion = document.getElementById('boxAdres');
        googleMaps.classList.add('desdeDerecha');
        animales.classList.add('desdeDerecha');
        cajaDireccion.classList.add('desdeIzquierda');
       // window.removeEventListener('scroll', manejarAnimacion);
    }
    
}



//ESPERA QUE CARGUE LA PAGINA
document.addEventListener('DOMContentLoaded', function() {
    animationScroll();
    setTimeout(function() {
        document.body.classList.add('change-color');
    }, 2500);
    setTimeout(function() {
        document.body.classList.remove('change-color');
    }, 2500);
    // Agregar un listener para detectar el evento scroll
window.addEventListener('scroll', manejarAnimacion);


});
