var dialog="";
var alertNot="";
 
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
    if(localStorage.getItem("confirmation")){
        alert("Gracias, su asistencia ya fue registrada ✌")
        return
    }
    const data = localStorage.getItem("guest");
    if(data){
        document.getElementById('inpName').value = data;
        document.getElementById('inpName').disabled = true;
        dialog.classList.add('showDialog'); 
    }else{
         dialog.classList.add('showDialog'); 
    }
}


async function confirm(){
    let data ={
        name: document.getElementById('inpName').value ,
        comment: document.getElementById('inpLastName').value
    };
    const companion = localStorage.getItem('companion') || 9 ;
   
    if(Number( document.getElementById('inpLastName').value || 0) > companion ){
        alert("Lo sentimos, aunque queremos que todos asistan, no tenemos suficientes lugares. 😥");
        return
    }
    if((document.getElementById('inpName').value || '' )?.length === 0){
        alert("Debe ingresar su nombre");
        return
    }
    await confirmation(data).then((res)=>{
        if(res){
            dialog.classList.remove('showDialog');
            showAlert();
            
           }
    });
    
}

function cancel(){ dialog.classList.remove('showDialog');}


document.addEventListener('DOMContentLoaded', function() {
    dialog = document.getElementById('modal');
    alertNot = document.getElementById('alert');
});
