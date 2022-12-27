
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

  btnAdd: () => document.getElementById('btnAdd'),
  msgFillError: ()=> document.getElementById('msg-fill-error'),
  divOutros: ()=> document.getElementById('divOutros')
}

var currentUser;
var userName = f.nameOpIn();

const hour = f.hourIn()
const date = f.dateIn()
const d = new Date()
const hora = String(d.getHours()).padStart(2, '0')
const min = String(d.getMinutes()).padStart(2,'0')
      
const horaAtual = `${hora}:${min}`
      hour.value = horaAtual
      
const dia = String(d.getDate()).padStart(2, '0')
const mes = String(d.getMonth() + 1).padStart(2, '0')
const ano = String(d.getFullYear())
      
const dataAtual = `${dia}/${mes}/${ano}`
      date.value = dataAtual

window.addEventListener('DOMContentLoaded', ()=>{
        
        firebase.auth().onAuthStateChanged((user) =>{
          if(user){
            
            currentUser = firebase.auth().currentUser;
    
    userName.value = currentUser.displayName;
          } else{
            alert('erro')
          }
          
        })
        
        
        
      })

function voltar(){
    window.location.href = 'home.html'
}

var currentUser;

window.addEventListener('DOMContentLoaded', () => {
  firebase.auth().onAuthStateChanged((currentUser) => {
    currentUser = firebase.auth().currentUser;

    if (currentUser == null) {
      window.location.href = '../index.html'
    } else{
        window.document.body.style.display = 'block'
    }






  })



})

window.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
      f.btnAdd().click();
  }
})


function concluir(){
  fillError();
  const desc = f.description()
  if(desc.value === 'outros'){
    const input = document.createElement('input')
    input.innerHTML = "deu bom"
    //input.value = divOutros.value
    f.divOutros().appendChild(input)
}

function fillError(){
  const name = f.name().value
  const ap = f.ap().value
  const pg = f.pg().value
  const desc = f.description().value
  
  f.msgFillError().style.display = !ap || !name || !pg || !desc ? 'block' : 'none';
}

function onChangeDesc(){
  
  
    
  }
}
