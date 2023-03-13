/*esse arquivo vai provar as funcionalidades mais basicas dos elementos */
import { value_data, bt_enter_data, bt_exit_data, seleção } from "./objetos.js";
import { save_in_firebase, base, onv, reff, SYSPATH, auth, logado } from './firebase-config.js'


/*Função para definir a data da entrada ou saida do equipamento*/
function init_read() {
  let data = value_data
  var today = new Date()
  let now = today.toLocaleDateString("pt-BR");
  data.value = now
}

//realiza definição de data
init_read()


/**função responsavel por armazenar os equipamentos no estoque */
function informar_transação(texto) {
  logado(auth, (user) => {
    let host = 'Usuarios/'
    const search = reff(base, host);
    onv(search, (snapshot) => {
      const dados = snapshot.val();
      for (const key in dados) {
        let valor = dados[key]
        if (valor.email == user.email) {
          let local = SYSPATH + '-' + valor.empresa + '/Estoque'
          let equipamento = document.querySelector('#select-device').value
          let serial = document.querySelector('#serial-number').value
          let data = document.querySelector('#data').value
          let usuario = valor.username
          let transação = texto
          save_in_firebase(local, equipamento, serial, data, usuario, transação)
        }
      }
    })
  })
}


/*função para preencher uma tabela no html, com os dados vindos do firebase*/
function preencherTabela() {
  logado(auth, (user) => {
    let host = 'Usuarios/'
    const search = reff(base, host);
    onv(search, (snapshot) => {
      const dados = snapshot.val();
      for (const key in dados) {
        let valor = dados[key]
        if (valor.email == user.email) {
          let local = SYSPATH + '-' + valor.empresa + '/Estoque/'
          var matriz = []
          var equipamento, serial, data, usuario, transação
          const device = reff(base, local);
          onv(device, (snapshot) => {
            const eqp = snapshot.val();
            for (const key in eqp) {
              let value = eqp[key]
              let lista = [
                equipamento = value.Equipamento,
                serial = value.serial,
                data = value.data,
                usuario = value.usuario,
                transação = value.transação
              ]
              matriz.push(lista)
            }
            const tabela = document.getElementById("tabela-dados");
            tabela.innerHTML = "";
            matriz.forEach((linha) => {
              const linhaTabela = document.createElement("tr");
              linha.forEach((conteudo) => {
                const coluna = document.createElement("td");
                coluna.innerText = conteudo;
                linhaTabela.appendChild(coluna);
              })
              tabela.appendChild(linhaTabela);
            })
          })
          break
        } else {
          console.log('Não ha dados para exibir ainda!')
        }
      }
    })
  })
}

//preenchimento da tabela de todas a transações
preencherTabela()

//salvando como saida
bt_exit_data.addEventListener("click", function (evento) {
  const texto = 'Saida'
  informar_transação(texto)
});

//salvando como entrada
bt_enter_data.addEventListener("click", function (evento) {
  const texto = 'Entrada'
  informar_transação(texto)
});


/**função para definir as opções de equipamento que serão armazenados no estoque */
function preencher_option() {
  logado(auth, (user) => {
    if (user) {
      let local = 'Usuarios/'
      const device = reff(base, local);
      onv(device, (snapshot) => {
        const dados = snapshot.val();
        for (const key in dados) {
          let valor = dados[key]
          if (user.email == valor.email) {
            const empresa = valor.empresa
            let local2 = SYSPATH + '-' + empresa + '/devices/'
            var matriz = []
            var equipamento
            const device = reff(base, local2);
            onv(device, (snapshot) => {
              const dados = snapshot.val();
              for (const key in dados) {
                let valor = dados[key]
                let lista = [
                  equipamento = valor.device
                ]
                matriz.push(lista)
              }
              const select = seleção;
              matriz.forEach(opção => {
                var option = document.createElement('option')
                option.value = opção
                option.text = opção
                select.appendChild(option)
              })
            })
            break
          } else {
            console.log('erro ao tentar recuperar equipamentos')
          }
        }
      })
    } else {
      console.log('no user')
    }
  });
}

//preenche as opções de equipamentos
preencher_option()

aler
