import {auth,create_user,SYSPATH,base,pushh,reff,sett} from './firebase-config.js'
import {new_email,new_senha,new_user,btn_new_user,replay_senha,grupo} from './objetos.js'

/*função responsavel por criar um novo usuario*/
function create_new_user(email, senha){
    create_user(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error)
      // ..
    });
}

/*essa função vai definir o grupo e a empresa que o usuario vai pertencer
*vamos trabalhar com 3 permissions iniciais:
*permission master: para usuario com total permissão no sistema, inicialmente somente eu
*permission admin: para usuarios com cargo de gestão nas empresas
*permission commom: para usuarios que utilizam as funcionalidades operacionais do sistema
*/

function user_definition(grupo,empresa,email,username, permission){
    //definir o local onde vai ser armazenao o usuario
    let local='Usuarios/'
    const users = reff(base, local);
    const new_users = pushh(users);
    sett(new_users, {
          'email':email,
          'username':username,
          'grupo':grupo,
          'empresa':empresa,
          'permission':permission
        });
}
       


function criar_novo_usuario(){
    let novo_email = new_email.value
    let nova_senha = new_senha.value
    let name_empresa = grupo.value
    let grp = name_empresa
    let novo_usuario =new_user.value 
    let  permission = 'common'
    create_new_user(novo_email,nova_senha)
    user_definition(grp,name_empresa,novo_email,novo_usuario,permission)
    new_email.value =''
    new_senha.value=''
    new_user.value =''
    replay_senha.value =''
    grupo.value = ''


}

btn_new_user.addEventListener('click',criar_novo_usuario,false)

