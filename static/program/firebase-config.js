import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getDatabase, set, ref, push, onValue,child,get } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyARMRVhqwaGXH_BVNYdYDpz-uZThZ6H6YM",
  authDomain: "sbi-inventary.firebaseapp.com",
  databaseURL: "https://sbi-inventary-default-rtdb.firebaseio.com",
  projectId: "sbi-inventary",   
  storageBucket: "sbi-inventary.appspot.com",
  messagingSenderId: "332928210151",
  appId: "1:332928210151:web:2728936c932d2654ddfe42"
};

export const create_user =  createUserWithEmailAndPassword
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const sgn = signInWithEmailAndPassword
export const out = signOut
export const logado = onAuthStateChanged
export const base = getDatabase()
export const reff = ref
export const sett = set
export const pushh = push
export const onv = onValue
export const filho =  child
export const GET = get
export const SYSPATH='SBI' //constante nome do sistema






/**
 * função generica para escrever no banco de dados do sistema, no futuro essa empresa deverá ser 
 * detectada pelo nome do usuario
*/

export function save_in_firebase(local,equipamento,serial,data,usuario,transação) {
  const postListRef = ref(base, local);
  const newPostRef = push(postListRef);
    set(newPostRef, {
    'Equipamento':equipamento,
    'serial':serial,
      'usuario':usuario,
    'data':data,
    'transação':transação 
  });
}


/*função apenas salva o equipamento no banco de dados*/
export function save_device_firebase(local, device) {
  try {
    const postListRef = ref(base, local);
    const newPostRef = push(postListRef);
    set(newPostRef, {
      'device': device
    });
    alert('salvo com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar dispositivo:', error);
    alert('Erro ao salvar dispositivo. Verifique o console para mais informações.');
  }
}
