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
}


var fechaObjetivo = new Date("03/15/2024 12:30:00"); // Fecha y hora objetivo
var tiempoRestanteObj = tiempoRestante(fechaObjetivo);
console.log('Fuera del evento DOMContentLoaded:', tiempoRestanteObj);

//ESPERA QUE CARGUE LA PAGINA
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dentro del evento DOMContentLoaded:');
    var audio = document.getElementById('audioPlayer');
    animationScroll();
});


setInterval(()=>{
    var tiempo = tiempoRestante(fechaObjetivo);
   var doc = document.getElementById("currentDate")
   doc.innerHTML= "Faltan "+ tiempo.dias + " día "+ tiempo.horas + " horas con "+tiempo.minutos+" minutos y "+tiempo.segundos;
},1000)


//no usado .. xq no ejecuta la animacion del scrol
 function redireccionar(type) {
            // Cambia "https://www.ejemplo.com" por la dirección a la que deseas redirigir
            window.location.href = "#googlemaps";
}
