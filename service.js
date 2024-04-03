function sendWhasap(inData){
    let phone = localStorage.getItem("phone") || '994828878';
    
    const api = "https://api.whatsapp.com/send?phone="+phone+"&text=Hola, mi nombre es "+inData.rsvp[0]?.fields[0]?.options.first_name+
    " - "+inData.rsvp[0]?.fields[2]?.options?.value;
    window.open(api, '_blank');
}

async function sendConfirmation(url, datos) {
    // Opciones para la solicitud POST
    const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Tipo de contenido JSON
        },
        body: JSON.stringify(datos) // Convertir datos a formato JSON
    };

    // Enviar la solicitud POST
    const response = await fetch(url, opciones)
        .then(response => {                
            if (!response.ok) {
                sendWhasap(datos);
                throw new Error('Error al enviar la solicitud POST');
            }
            localStorage.setItem("confirmation",true);
            sendWhasap(datos);
            return response.json(); // Convertir la respuesta a JSON
        })
        .catch(error => {
            console.error('Error:', error);
            sendWhasap(datos);
            alert("No se pudo enviar su confirmación, intente nuevamente o confirme por whatsapp")
        });
    return response;
}



async function confirmation(inData){
    let data = inData.name || localStorage.getItem("guest");
    let first_name="";
    let last_name="";
    let comment =inData?.comment? ("Asistiré con "+ inData.comment +" acompañantes"): "Asistiré" || "Asistiré";
    if(data){
        first_name = data;
        last_name = data;
       }

    const newData ={
        rsvp: [
          {
            guest: {
              id: "master",
              guest_type: "master",
              first_name,
              last_name:""
            },
            fields: [
              {
                type: "name",
                is_static: true,
                is_required: true,
                is_master_only: false,
                is_limited_visible: false,
                visible_for: [],
                options: {
                  label_first_name: "Nombre",
                  label_last_name: "Apellido",
                  linked_to: [],
                  first_name,
                  last_name,
                },
                _id: "65f9e1eb5684dd7395cfe968"
              },
              {
                type: "question",
                is_static: false,
                is_required: true,
                is_master_only: false,
                is_limited_visible: false,
                visible_for: [],
                options: {
                  type: "radio",
                  label: "¿Va a asistir?",
                  answers: [
                    {
                      guid: "83f3c6625808",
                      label:"Sí, Recepción",
                      linked_to: [
                        {
                          guid: "f75faf7ccf68",
                          key: "status",
                          type: "status",
                          title: "Estado de RSVP",
                          value: 1,
                          is_custom: false,
                          is_text: false
                        }
                      ],
                      is_selected: true
                    }
                  ]
                },
                _id: "65f9e1eb5684dd7395cfe969"
              },
              {
                type: "textarea",
                is_static: false,
                is_required: true,
                is_master_only: true,
                is_limited_visible: false,
                visible_for: [],
                options: {
                  label: "Comentarios",
                  linked_to: [],
                  value: comment
                },
                _id: "65f9e1eb5684dd7395cfe96d"
              }
            ]
          }
        ],
        wli: null
      }
      
   const response = await sendConfirmation('https://planning.wedding/api/v1/wedding-website/Ru9xISyll/rsvp', newData)
   .then((res)=>{
       console.log('res dede el sendConfirmation', res)
       return res;
   });
    return response;
}

function getParamsWeb(){
    // Obtener la URL actual
    const url = new URL(window.location.href);
    const parametros = new URLSearchParams(url.search);
    const nombre = parametros.get('name');
    const phone = parametros.get('phone');
    const companion = parametros.get('companion');
    if(nombre)localStorage.setItem("guest", nombre);
    if(phone)  localStorage.setItem("phone", phone);
    if(companion)  localStorage.setItem("companion", companion);
}


document.addEventListener('DOMContentLoaded', function() {
    getParamsWeb();
});