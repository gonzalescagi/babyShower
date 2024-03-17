//eccion de variables
var musicOn=false;

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

    return {
        dias: dias,
        horas: horas,
        minutos: minutos,
        segundos: segundos
    };
}

function playMuic(){
    var audio = new Audio('indigo.mp3');
    audio.loop = true; // Reproducir en bucle
    audio.play(); // Iniciar reproducción
    musicOn=true;
}

function initApp(){
    if(!musicOn){
        playMuic(); 
        let bt = document.getElementById('btnInit');
        bt.style.display="none";
    }
    
}

var fechaObjetivo = new Date("04/28/2024 12:30:00"); // Fecha y hora objetivo
var tiempoRestanteObj = tiempoRestante(fechaObjetivo);
console.log('Fuera del evento DOMContentLoaded:', tiempoRestanteObj);

setInterval(()=>{
    var tiempo = tiempoRestante(fechaObjetivo);
   var doc = document.getElementById("currentDate")
   doc.innerHTML= "Faltan "+ tiempo.dias + " día "+ tiempo.horas + " horas con "+tiempo.minutos+" minutos y "+tiempo.segundos;
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
    console.log("xx",esVisible(seccion))
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
    console.log('Dentro del evento DOMContentLoaded:');
    var audio = document.getElementById('audioPlayer');
    animationScroll();
    
    // Agregar un listener para detectar el evento scroll
window.addEventListener('scroll', manejarAnimacion);


});
