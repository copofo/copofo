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

  btnAdd: () => document.getElementById('btnAdd')
  
  
}

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
  alert('deu bom')
}



