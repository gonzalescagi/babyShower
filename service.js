function sendConfirmation(url, datos) {
    // Opciones para la solicitud POST
    const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Tipo de contenido JSON
        },
        body: JSON.stringify(datos) // Convertir datos a formato JSON
    };

    // Enviar la solicitud POST
    fetch(url, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar la solicitud POST');
            }
            return response.json(); // Convertir la respuesta a JSON
        })
        .then(data => {
            // Manejar la respuesta
            console.log('Respuesta:', data);
        })
        .catch(error => {
            // Manejar errores
            console.error('Error:', error);
        });
}



function confirmation(){
    let data = localStorage.getItem("guest");
    let first_name="";
    let last_name="";
    console.log('daa',data, localStorage.getItem("guest"))
    if(data){
        first_name = data.split(" ")[0];
        last_name = data.split(" ")[1];
       }
    const datos ={
    rsvp: [
        {
            guest_guid: null,
            first_name,
            last_name,
            status: 1,
            food_restrictions: "",
            type: 0,
            comment: "Asistiré",
            is_selected: true
        }
    ],
    wli: null
}
    sendConfirmation('https://planning.wedding/api/v1/wedding-website/Ru9xISyll/rsvp?name=Mangu nami', datos);
}

function getParamsWeb(){
        // Obtener la URL actual
    const url = new URL(window.location.href);
    // Obtener los parámetros de la URL
    const parametros = new URLSearchParams(url.search);
    // Obtener el valor del parámetro 'name'
    const nombre = parametros.get('name');
    // Imprimir el valor del parámetro 'name'
    if(nombre){
        localStorage.setItem("guest", nombre);
       }
    console.log('Nombre:', nombre,url);
}


document.addEventListener('DOMContentLoaded', function() {
    getParamsWeb();
});