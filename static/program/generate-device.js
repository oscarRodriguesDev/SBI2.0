import {SYSPATH,save_device_firebase,logado,auth,reff,base,onv} from './firebase-config.js'
import{new_device,btn_add_new_device} from './objetos.js'



/*função agrega os equipamentos que serão apresentados para o usuario dar entrada e saida*/


document.addEventListener("keydown", function(event) {
    if (event.code === "Enter") {
     
        alert('click no botão "insert in bank"')
     
    }
  });
  
  document.addEventListener("keydown", function(event) {
    if (event.code === "NumpadEnter") {
        alert('click no botão "insert in bank"')
       
    }
  });


function get_group_and_save() {

    logado(auth, (user) => {
        if (user) {
            var equipamento = new_device.value
            let host = 'Usuarios/'
            const search = reff(base, host);
            onv(search, (snapshot) => {
                const dados = snapshot.val();
                for (const key in dados) {
                   let value =  dados[key]
                   if(value.email==user.email){
                    let local =  SYSPATH+'-'+value.empresa+'/devices/'
                    //pegar os valores para salvar no firebase
                    let equipamento = new_device.value
                    save_device_firebase(local,equipamento)
                    new_device.value=''
                    break
                   }else{
                    //email não validado!
                   }
                }
            })


        } else {
            //deslogado
        }
    })
}
btn_add_new_device.addEventListener('click',get_group_and_save,false)

