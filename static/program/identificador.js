/*esse arquivo vai provar as funcionalidades mais basicas dos elementos */
import { h3_named_usuario, bt_logout } from "./objetos.js";
import { auth,out, logado, base, onv, reff, SYSPATH } from "./firebase-config.js"


/**essa função pode estar com problemas retornando outros usuarios */
function named_user() {
  logado(auth, (user) => {
    if (user) {
      let local = 'Usuarios/'
      const device = reff(base, local);
      onv(device, (snapshot) => {
        const dados = snapshot.val();
        for (const key in dados) {
          let valor = dados[key]
          if (user.email == valor.email) {
            h3_named_usuario.innerText = valor.username
            break
          } else {
            console.log('Ocorreu um erro ao tentar recuperar seu nome de usuario')
            h3_named_usuario.innerText = 'Não identificado'

          }

        }
      })

    } else {
      window.location.href = "index.html";
    }
  });
}

//chamada à função para apresentar o nome do usuario
named_user()


/*função para deslogar */
function logout() {
  out(auth).then(() => {
    window.location.href = "index.html";
  }).catch((error) => {
    alert('Usuario ainda está logado!')
  });
}

//adcionando eventos ao botão para deslogar
bt_logout.addEventListener('click', logout, false)

//função para pegar o nome do grupo
export function getGroup() {
  let local = 'Usuarios/';
  const device = reff(base, local);
  return onv(device, (snapshot) => {
    const dados = snapshot.val();
    for (const key in dados) {
      let valor = dados[key];
      const empresa = valor.empresa;
    
    }
    return null
  });
}


