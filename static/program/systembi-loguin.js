/*esse arquivo vai provar as funcionalidades mais basicas dos elementos */
import { usuario, password, loguin_btn, h3_named_usuario } from "./objetos.js";
import { auth, sgn, logado, reff, base, onv } from "./firebase-config.js"




/**função para logar */
function login() {
  if (validarEmail(usuario.value)) {
    sgn(auth, usuario.value, password.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        usuario.value = ''
        password.value = ''
        window.location.href = 'controle-de-estoque';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        password.value = ''
        console.log('erro ' + error + ' ocorreu ao tentar logar')
        alert('Verifique  os campos e tente novamente!')
      });
  } else {
   // alert('loguin por usuario')
    var local = 'Usuarios/'
    const device = reff(base, local);
    onv(device, (snapshot) => {
      const dados = snapshot.val();
      for (const key in dados) {
        let valor = dados[key]
        var nick = valor.username
        if (usuario.value == nick) {
          sgn(auth, valor.email, password.value)
            .then((userCredential) => {
              const user = userCredential.user;
              usuario.value = ''
              password.value = ''
              window.location.href = 'controle-de-estoque';
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              password.value = ''
              console.log('erro ' + error + ' ocorreu ao tentar logar')
              alert('Verifique  os campos e tente novamente!')
            });

          //loguin
          break

        } else {
          console.log('Usuario não encontrado')

        }
      }
    })
  }
}



//função para verificar se usuario está logado ainda não quero o nome do usuario!
function is_logged() {
  logado(auth, (user) => {
    if (user) {
     
  
      window.location.href = 'controle-de-estoque';

      // ...

    } else {
      // User is signed out
      // ...
      console.log('Usuario deslogado')
    }
  });
}

/*função pega o email do usuario, mas em breve vai pegar o nome do usuario*/
function named_user() {

  logado(auth, (user) => {
    if (user) {
      let mail = user.email
      alert(mail)

    } else {

    }
  });

}

loguin_btn.addEventListener('click', login, false)

is_logged()


//para tratar evento da tecla enter
document.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    login()

  }
});

document.addEventListener("keydown", function (event) {
  if (event.code === "NumpadEnter") {
    login()
  }
});


/*função que analisa por expressao regular se o usuario esta logando com email ou com nome de usuario */
function validarEmail(email) {
  // Expressão regular para validar um email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Retorna true se o email for válido e false caso contrário
  return regex.test(email);
}




