var dialog="";
var alertNot="";
 
/*
async function obtenerDatos() {
    const respuesta = await fetch('https://api.example.com/data');
    const datos = await respuesta.json();
    return datos;
}
*/
async function mostrarDatos() {
    try {
        const datos = await obtenerDatos();
        console.log(datos);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

function showAlert(){
     alertNot.classList.add('showDialog');
    setTimeout(()=>{
         alertNot.classList.remove('showDialog');
    },4500);
}

function openModal(){
    const data = localStorage.getItem("guest");
    if(data){
        confirmation(null).then((res)=>{
            if(res)showAlert();
        });
    }else{
         dialog.classList.add('showDialog'); 
    }
}


async function confirm(){
    let data = document.getElementById('inpName').value +" "+document.getElementById('inpLastName').value;
    await confirmation(data).then((res)=>{
        if(res){
            console.log('confirmado',res)
            dialog.classList.remove('showDialog');
            showAlert();
            
           }
    });
    
}

function cancel(){
    dialog.classList.remove('showDialog');
}


document.addEventListener('DOMContentLoaded', function() {
    dialog = document.getElementById('modal');
    alertNot = document.getElementById('alert');
});