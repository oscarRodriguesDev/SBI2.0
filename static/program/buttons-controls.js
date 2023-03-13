import {bt_transações,tela_transações,tela_estoque,bt_estoque,bt_hist_exit,bt_hist_enter,bt_totais, tela_saidas,tela_entradas,tela_totais}from './objetos.js'

//botão para formulario de inserção de dados
bt_transações.addEventListener('click',function (event) {
    tela_transações.style.display='block' //ativa
    tela_estoque.style.display='none'
    tela_saidas.style.display='none'
    tela_entradas.style.display='none'
    tela_totais.style.display='none'
})


//botão para a tela do estoque
bt_estoque.addEventListener('click',function (event) {
    tela_transações.style.display='none' 
    tela_estoque.style.display='block'//ativa
    tela_saidas.style.display='none'
    tela_entradas.style.display='none'
    tela_totais.style.display='none'
})


//botão para a tela de saidass
bt_hist_exit.addEventListener('click',function (event) {
    tela_transações.style.display='none' 
    tela_estoque.style.display='none'
    tela_saidas.style.display='block' //block
    tela_entradas.style.display='none' 
    tela_totais.style.display='none'
})



//botão para a tela de entradas
bt_hist_enter.addEventListener('click',function (event) {
    tela_transações.style.display='none' 
    tela_estoque.style.display='none'
    tela_saidas.style.display='none'
    tela_entradas.style.display='block' //ativa
    tela_totais.style.display='none'
})


//botão para a tela de totais
bt_totais.addEventListener('click',function (event) {
    tela_transações.style.display='none' 
    tela_estoque.style.display='none'
    tela_saidas.style.display='none' 
    tela_entradas.style.display='none' 
    tela_totais.style.display='block' //ativa
})