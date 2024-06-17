const f = {

  ap: () => document.getElementById('ap'),
  name: () => document.getElementById('name'),
  description: () => document.getElementById('description'),
  /*pg: () => document.getElementById('pg'),*/
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

  lblDeliber: () => document.getElementById('lblDeliber'),
  lblReceive: () => document.getElementById('lblReceive'),
  
  ler: () => document.getElementById('ler'),
  
  barcode: () => document.getElementById('barcode'),
  
  recebedor: () => document.getElementById('recebedor'),
  
  lblRecebedor: () => document.getElementById('lblRecebedor'),
  
}

/*
var scanner = new Html5QrcodeScanner('reader', {
qrbox: {
width: 250,
height: 250,
},
fps: 20,
});


f.ler().addEventListener('click',(e)=>{
  scanner.render(success, error);
    function success(result) {
  f.barcode().value = result


  scanner.clear();
  document.getElementById('reader').remove();
}
})





function error(err) {
console.error(err);
}

*/

var scanner = null; // Variável global para manter a referência ao leitor

function startScanner() {
  scanner = new Html5QrcodeScanner('reader', {
    qrbox: {
      width: 250,
      height: 250,
    },
    fps: 20,
  });

  scanner.render(success, error);
}

function stopScanner() {
  if (scanner) {
    scanner.clear();
    scanner.stop();
    scanner = null;
    document.getElementById('reader').remove();
  }
}
let countBarcode =0
function success(result) {
  countBarcode++
  f.barcode().value += "(" + countBarcode + "°) "+ result + " ";
  stopScanner();
}

function error(err) {
  console.error(err);
}

document.getElementById('ler').addEventListener('click', startScanner);
document.getElementById('stopButton').addEventListener('click', stopScanner);


var newInputField = document.getElementById('newInputField')






var op_desc = document.getElementById('op_desc')



var currentUser;
var userName = f.nameOpIn();

const hour = f.hourIn()
const date = f.dateIn()

const d = new Date()

var getHours = d.getHours()

var getDate = d.getDate()

const hora = String(d.getHours()).padStart(2, '0')
const min = String(d.getMinutes()).padStart(2, '0')

const horaAtual = `${hora}:${min}`
hour.value = horaAtual

const dia = String(d.getDate()).padStart(2, '0')
const mes = String(d.getMonth() + 1).padStart(2, '0')
const ano = String(d.getFullYear())

const dataAtual = `${dia}/${mes}/${ano}`
date.value = dataAtual

window.addEventListener('DOMContentLoaded', (e) => {
  


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



function saveDados() {
  


  showLoading();
    const dados = createDados();

    if(isNewDados()){
        save(dados);
        
    } else {
        update(dados);
        
        if(dados.status == 'Entregue'){
            saveEntrega(dados);
        }
    }




}

function save(dados) {

  firebase.firestore()
    .collection('home')
    .add(dados)
    .then(() => {
      hideLoading();
      window.location.href = 'home.html'
    })
    .catch(() => {
      f.msgError().style.display = 'block'
    })

}



function saveEntrega(dados){

    firebase.firestore()
    .collection('ArquivoEntregas')
    .add(dados)
    .then(()=>{
        hideLoading();
        window.location.href = 'home.html'
    })
    .catch(()=>{
        hideLoading();
        alert('Erro ao adicionar encomenda')
    })
}






function update(dados) {

  showLoading()

  firebase.firestore()
    .collection('home')
    .doc(getDadosUid())
    .update(dados)
    .then(() => {

      hideLoading()
      window.location.href = 'home.html'

    })
    .catch(() => {

      hideLoading()
      alert("Erro ao atualizar operação")

    })

}

function createDados() {
  return {
    typeColor: f.receive().checked ? "receive" : "deliver",
    ap: parseInt(f.ap().value),
    name: f.name().value,
    description: {


      tipo: op_desc.selected ? newInputField.value : description.value,

      qtd: parseInt(f.qtd().value)
    },
    
    /*pg: parseInt(f.pg().value),*/
    dateIn: f.dateIn().value,
    hourIn: f.hourIn().value,
    nameOpIn: userName.value,
    status: f.receive().checked ? "Aguardando Retirada" : "Entregue",

    dateOut: f.deliver().checked ? dataAtual : null,
    hourOut: f.deliver().checked ? horaAtual : null,
    nameOpOut: f.deliver().checked ? currentUser.displayName : null,
    
    countHours: getHours,
    
    countDate: getDate,
    
    barcode: f.barcode().value,
    
    recebedor: f.deliver().checked ? f.recebedor().value : ""
    
    
    
    

  }
}

function fillError() {
  const name = f.name().value
  const ap = f.ap().value
  /*const pg = f.pg().value*/
  const desc = f.description().value
  const qdt = f.qtd().value
  const barcode = f.barcode().value
  const recebedor = f.recebedor().value
  f.msgFillError().style.display = !ap || !name /*|| !pg*/ || !desc || !qdt ? 'block' : 'none';

  f.btnAdd().disabled = !ap || !name /*|| !pg*/ || !desc || !qdt ? true : false;
}



function addField() {
  if (f.description().value == "Descrever ➔") {
    f.divNewField().style.display = 'block'

    description = newInputField
  }



}

/*

function fillPg() {
  f.btnAdd().disabled = !f.pg().value ? true : false;
  f.msgFillError().style.display = !f.pg().value ? 'block' : 'none';
}
*/

// Atualizar Operação

if (!isNewDados()) {

  const uid = getDadosUid()
  findDadosByUid(uid)

}

function getDadosUid() {
  const urlParams = new URLSearchParams(window.location.search)

  return urlParams.get('uid');
}

function isNewDados() {

  return getDadosUid() ? false : true;

}



function findDadosByUid(uid) {

  showLoading()

  firebase.firestore()
    .collection('home')
    .doc(uid)
    .get()
    .then(doc => {

      hideLoading()

      if (doc.exists) {
        

        fillDadosScreen(doc.data())

      } else {

        alert("Documento não encontrado!")
        window.location.href = 'home.html'

      }

    })
    .catch(erro => {
      hideLoading()
      console.log('Erro ao recuperar documento!', erro)

    })

}

function fillDadosScreen(dados) {

  if (dados.typeColor == 'receive') {

    f.receive().checked = true

  } else {

    f.deliver().checked = true

  }
  
  f.recebedor().style.display = "block"
  
  
  f.lblRecebedor().style.display = "block"
  
  f.recebedor().value = dados.recebedor

  f.ap().value = dados.ap
  f.name().value = dados.name
  
  
  f.qtd().value = dados.description.qtd
  
  f.barcode().value = dados.barcode
  
  f.barcode().disabled = true
  
  
  f.description().value = dados.description.tipo
  
  if(dados.description.tipo != "Envelope" && dados.description.tipo != "Caixa" && dados.description.tipo != "Pacote"){
    
    f.newInputField().value = dados.description.tipo
    
    f.divNewField().style.display = "block"
    
    f.newInputField().disabled = true
    
  }
  
  
  
  
  
  
  
  if(f.newInputField().value){
    
    
  
    
    op_desc.selected = true
    
    
    
  } 
  
  
    
    
    
  

  
  
  
  /*f.pg().value = dados.pg*/
  f.dateIn().value = dados.dateIn
  f.hourIn().value = dados.hourIn
  f.nameOpIn().value = dados.nameOpIn


  f.dataOut().value = dataAtual
  f.hourOut().value = horaAtual
  f.nameOpOut().value = currentUser.displayName
  
  

  f.ap().disabled = true
  f.name().disabled = true
  f.description().disabled = true
  f.btnMais().disabled = true
  f.qtd().disabled = true
  /*f.pg().disabled = true*/
  
  
  
  

  f.lblDeliber().style.display = 'block'
  f.deliver().style.display = 'block'
  f.deliver().disabled = false;
  f.btnAdd().disabled = false;
  
  if(currentUser.displayName == "Telles"){
    
    //f.dateIn().style.display = "block"
    //f.hourIn().style.display = "block"
    //f.nameOpIn().style.display = "block"
    
    f.dateIn().disabled = false
    f.hourIn().disabled = false
    f.nameOpIn().disabled = false
    
    
    
    f.ap().disabled = false
    f.name().disabled = false
    f.description().disabled = false
    f.btnMais().disabled = false
    f.qtd().disabled = false
    /*f.pg().disabled = false*/
    
    
    //f.dataOut().style.display = 'block'
    //f.hourOut().style.display = 'block'
    //f.nameOpOut().style.display = "block"
    
    
    f.dataOut().disabled = false
    f.hourOut().disabled = false
    f.nameOpOut().disabled = false
    
    
    
    f.newInputField().disabled = false
    f.barcode().disabled = false
    
    f.lblReceive().style.display = "block"
    
    f.receive().style.display = "block"
    
  }
  
  
    
      
      

}





function removeDados() {

  

    

    showLoading()

    firebase.firestore()
      .collection('home')
      .doc(getDadosUid())
      .delete()
      .then(() => {

        hideLoading()
        window.location.href = 'home.html'

      })
      .catch(() => {

        hideLoading()
        alert("Erro ao atualizar operação")

      })


  







}


firebase.auth().onAuthStateChanged((user)=>{


  if(user.displayName == 'Telles'){

    document.getElementById('btnRemove').style.display = 'block'

  }



})

/*

function saveDados(){
    showLoading();
    const dados = createDados();

    if(isNewDados()){
        save(dados);
        
    } else {
        update(dados);
        
        if(dados.status == 'Entregue'){
            saveEntrega(dados);
        }
    }
    
}




function saveEntrega(dados){

    firebase.firestore()
    .collection('ArquivoEntregas')
    .add(dados)
    .then(()=>{
        hideLoading();
        window.location.href = 'home.html'
    })
    .catch(()=>{
        hideLoading();
        alert('Erro ao adicionar encomenda')
    })
}


*/


