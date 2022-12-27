
const f = {
  ap: () => document.getElementById('ap'),
  name: () => document.getElementById('name'),
  description: () => document.getElementById('description'),
  pg: () => document.getElementById('pg'),
  dateIn: () => document.getElementById('dateIn'),
  hourIn: () => document.getElementById('hourIn'),
  nameOpIn: () => document.getElementById('nameOpIn'),
  receive: () => document.getElementById('receive'),
  deliver: () => document.getElementById('deliver'),
  qtd: () => document.getElementById('qtd'),

  btnAdd: () => document.getElementById('btnAdd'),
  msgFillError: () => document.getElementById('msg-fill-error'),
  msgError: () => document.getElementById('error'),
  
  btnMais: () => document.getElementById('btnMais'),
  divNewField: () => document.getElementById('divNewField'),
  newInputField: () => document.getElementById('newInputField'),
  newLabelInputField: () => document.getElementById('newLabelInputField')
}

var newInputField = document.getElementById('newInputField')
var description = document.getElementById('description')


var currentUser;
var userName = f.nameOpIn();

const hour = f.hourIn()
const date = f.dateIn()
const d = new Date()
const hora = String(d.getHours()).padStart(2, '0')
const min = String(d.getMinutes()).padStart(2, '0')

const horaAtual = `${hora}:${min}`
hour.value = horaAtual

const dia = String(d.getDate()).padStart(2, '0')
const mes = String(d.getMonth() + 1).padStart(2, '0')
const ano = String(d.getFullYear())

const dataAtual = `${dia}/${mes}/${ano}`
date.value = dataAtual

window.addEventListener('DOMContentLoaded', () => {

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {

      currentUser = firebase.auth().currentUser;

      userName.value = currentUser.displayName;
    } else {
      alert('erro')
    }

  })



})

function voltar() {
  window.location.href = 'home.html'
}

var currentUser;

window.addEventListener('DOMContentLoaded', () => {
  firebase.auth().onAuthStateChanged((currentUser) => {
    currentUser = firebase.auth().currentUser;

    if (currentUser == null) {
      window.location.href = '../index.html'
    } else {
      window.document.body.style.display = 'block'
    }






  })



})

window.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    f.btnAdd().click();
  }
})


function saveOperation() {
  showLoading();
  const operation = createOperation();

  firebase.firestore()
    .collection('home')
    .add(operation)
    .then(()=>{
      hideLoading();
      window.location.href = '../index.html'
    })
    .catch(()=>{
      f.msgError().style.display = 'block'
    })





}

function createOperation(){
  return {
    typeColor: f.receive().checked ? "receive" : "deliver",
    ap: parseInt(f.ap().value),
    name: f.name().value,
    description: {
      tipo: f.description().value,
      qtd: parseInt(f.qtd().value)
    },
    pg: parseInt(f.pg().value),
    dateIn: f.dateIn().value,
    hourIn: f.hourIn().value,
    nameOpIn: userName.value,
    status: f.receive().checked ? "Aguardando Retirada" : "Entregue"
  }
}

function fillError() {
  const name = f.name().value
  const ap = f.ap().value
  const pg = f.pg().value
  const desc = f.description().value
  const qdt = f.qtd().value
  f.msgFillError().style.display = !ap || !name || !pg || !desc || !qdt ? 'block' : 'none';
  
  f.btnAdd().disabled = !ap || !name || !pg || !desc || !qdt ? true : false;
}



function addField() {
  if (f.description().value == "Descrever ➔") {
    f.divNewField().style.display = 'block'
    description = newInputField
    
    
  }

  
  
}

function fillPg(){
  f.btnAdd().disabled = !f.pg().value ? true : false;
  f.msgFillError().style.display = !f.pg().value ? 'block' : 'none';
}