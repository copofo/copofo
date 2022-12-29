
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
  newLabelInputField: () => document.getElementById('newLabelInputField'),

  dataOut: () => document.getElementById('dateOut'),

  hourOut: () => document.getElementById('hourOut'),

  nameOpOut: () => document.getElementById('nameOpOut'),

  lblDeliber: () => document.getElementById('lblDeliber')
}

var newInputField = document.getElementById('newInputField')
var description = document.getElementById('description')
var op_desc = document.getElementById('op_desc')


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

  

  if(isNewOperation()){
    save(operation)
  } else {

    update(operation)

  }



}

function save(operation){

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


function update(operation){

    showLoading()

    firebase.firestore()
    .collection('home')
    .doc(getOperationUid())
    .update(operation)
    .then(()=> {

        hideLoading()
        window.location.href = 'home.html'

    })
    .catch(()=>{

        hideLoading()
        alert("Erro ao atualizar operação")

    })

}

function createOperation(){
  return {
    typeColor: f.receive().checked ? "receive" : "deliver",
    ap: parseInt(f.ap().value),
    name: f.name().value,
    description: {
      
      
      tipo: op_desc.selected ? newInputField.value : description.value,
      
      qtd: parseInt(f.qtd().value)
    },
    pg: parseInt(f.pg().value),
    dateIn: f.dateIn().value,
    hourIn: f.hourIn().value,
    nameOpIn: userName.value,
    status: f.receive().checked ? "Aguardando Retirada" : "Entregue",

    dateOut: f.deliver().checked ? dataAtual : null,
    hourOut: f.deliver().checked ? horaAtual : null,
    nameOpOut: f.deliver().checked ? currentUser.displayName : null

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


// Atualizar Operação

if(!isNewOperation()){

  const uid = getOperationUid()
  findOperationByUid(uid)

}

function getOperationUid(){
  const urlParams = new URLSearchParams(window.location.search)

  return urlParams.get('uid');
}

function isNewOperation(){

  return getOperationUid() ? false : true;

}



function findOperationByUid(uid){

  showLoading()

  firebase.firestore()
  .collection('home')
  .doc(uid)
  .get()
  .then(doc =>{

      hideLoading()

      if(doc.exists){

        fillOperationScreen(doc.data())

      } else {

        alert("Documento não encontrado!")
        window.location.href = 'home.html'

      }

  })
  .catch(erro =>{

      console.log('Erro ao recuperar documento!', erro)

  })

}

function fillOperationScreen(operation){

  if(operation.typeColor == 'receive'){

    f.receive().checked = true

  } else {

    f.deliver().checked = true

  }

  f.ap().value = operation.ap
  f.name().value = operation.name
  
  

  f.pg().value = operation.pg
  f.dateIn().value = operation.dateIn
  f.hourIn().value = operation.hourIn
  f.nameOpIn().value = operation.nameOpIn


  f.dataOut().value = dataAtual
  f.hourOut().value = horaAtual
  f.nameOpOut().value = currentUser.displayName

  f.ap().disabled = true
  f.name().disabled = true
  f.description().disabled = true
  f.btnMais().disabled = true
  f.qtd().disabled = true
  f.pg().disabled = true
  
  f.lblDeliber().style.display = 'block'
  f.deliver().style.display = 'block'
  f.deliver().disabled = false;
  f.btnAdd().disabled = false;
  
  
  
}






