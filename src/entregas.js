var c = 0;
var pen = 0;
var ent = 0;




/* Buscando */

var input = document.getElementById('buscar')
var dadosList = document.getElementById('dados')


buscar.addEventListener('keyup', ()=>{
    
    let exp = buscar.value.toLowerCase()
    
    
    if(exp.length === 1){
      
        return;
      
    }
  
  
    
    let pes = dadosList.getElementsByClassName('li-get')
    
    
    
    for(let pos in pes){
      
      if(true === isNaN(pos)){
        
        continue;
        
      }
      
      let conteudoPes = pes[pos].innerHTML.toLowerCase();
      
      if(true === conteudoPes.includes(exp)){
        
        pes[pos].style.display = "";
        
        
      } else{
        
        
        pes[pos].style.display = "none"
      }
      
      
    }
    
    
  })
  
  
  /* Fim Buscando */



var currentUser;




const f = {
  btn: () => document.getElementById('btnVoltar'),
  ps: () => document.getElementById('ps'),
  msgError: () => document.getElementById('msg-error'),
  op: () => document.getElementById('dados'),
  sair: () => document.getElementById('sair')
}


window.addEventListener("DOMContentLoaded", ()=>{
  
  
  firebase.auth().onAuthStateChanged((user)=>{
    
    currentUser = firebase.auth().currentUser;
    
    if(currentUser.displayName == "Telles"){
      
      f.ps().style.display = "block"
      
      
    }
    
    
  })
  
  
  
  
})







document.addEventListener('DOMContentLoaded', () => {
  firebase.firestore()
    .collection('ArquivoEntregas')
    .orderBy('ap')
    .onSnapshot(function (documentos) {

      documentos.docChanges().forEach(function (changes) {

        if (changes.type == 'added') {


          const doc = changes.doc

          const dados = {

            ...doc.data(), uid: doc.id

          }

          addDadosToScreen(dados)

        }





        if (changes.type == 'modified') {

          console.log('modified')
          window.location.href = 'entregas.html'
        }


        if (changes.type == 'removed') {

          console.log('removed')
          window.location.href = 'entregas.html'
        }
        
          


      })
    })
})





function voltar(){
  
  window.location.href = "home.html"
  
}

function sair() {
  firebase.auth().signOut()
    .then(() => {
      window.location.href = '../index.html'
    })
    .catch(() => {
      window.document.write = 'Erro ao fazer logout!!'
    })
}


function addEncomenda() {
  window.location.href = '../pg/addEntregas.html'
}

function superUser() {
  showLoading()
  firebase.auth().onAuthStateChanged((user) => {
    if (user.uid === 'oHXzLxE7rgfOYUU8Z8lejbR7zvz2') {
      hideLoading()
      window.location.href = 'master.html'
    } else {
      hideLoading();
      f.msgError().innerHTML = "ACESSO NEGADO!"
      setTimeout(() => {
        window.location.href = 'ArquivoEntregas.html'
      }, 1000);
    }
  })
}


/*
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    finddados(user);
  }
})
*/


/*

function Finddados() {
    showLoading();
    firebase.firestore()
        .collection('ArquivoEntregas')
        .orderBy('ap')
        .get() 
        .then(snapShot => {
            hideLoading();
            const dados = snapShot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }));
            addDadosToScreen(dados,key)
        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('erro ao recuperar operações')
        })

       

}
*/



function addDadosToScreen(dados) {

  /*

  var pen = 0;
  var ent = 0;


  dados.forEach((v) => {
    if (v.status === 'Entregue') {
      ent++;
    }

    if (v.status === "Aguardando Retirada") {
      pen++;
    }
  })



  const p = document.getElementById('cont')
  p.innerHTML = `Pendentes: ${pen} / Entregues: ${ent} / Total: ${pen + ent}`
  
  */


  if (dados.status === 'Entregue') {
    ent++;
  }

  if (dados.status === "Aguardando Retirada") {
    pen++;
  }


  const p = document.getElementById('cont')
  p.innerHTML = `Pendentes: ${pen} / Entregues: ${ent} / Total: ${pen + ent}`

  const orderList = document.getElementById('dados')



  const li = document.createElement('li');

  li.classList.add(dados.typeColor, "li-get");

  li.ad = dados.uid;

  li.addEventListener('touchmove', () => {
    c = 0
  })



  li.addEventListener('touchstart', () => {

    c++;
    if (c >= 3) {
      c = 0
      window.location.href = 'addEntregas.html?uid=' + dados.uid;
    }
  })





  li.addEventListener('dblclick', () => {


    window.location.href = 'addEntregas.html?uid=' + dados.uid;

  })

  

  if (dados.ap) {
    const ap = document.createElement('p')
    ap.innerHTML = `<strong>Ap: ${dados.ap}<strong>`
    li.appendChild(ap)

  }

  if (dados.name) {

    const name = document.createElement('p')
    name.innerHTML = "Nome: " + dados.name
    li.appendChild(name)
  }

  if (dados.description) {

    const description = document.createElement('p')
    description.innerHTML = formatDescription(dados.description)
    li.appendChild(description)
  }

  if(dados.barcode){
    
    const barcode = document.createElement('p')
    barcode.innerHTML = "BarCode: " + dados.barcode
    li.appendChild(barcode)
    
  }

  if (dados.pg) {

    const pg = document.createElement('p')
    pg.innerHTML = "Página: " + dados.pg
    li.appendChild(pg)

  }

  if (dados.dateIn) {
    const dateIn = document.createElement('p')
    dateIn.innerHTML = "Recebimento: " + dados.dateIn + " - " + dados.hourIn
    li.appendChild(dateIn)
  }
/*
  if (dados.hourIn) {
    const hourIn = document.createElement('p')
    hourIn.innerHTML = dados.hourIn
    li.appendChild(hourIn)
  }
*/
/*
  if (dados.nameOpIn) {
    const nameOpIn = document.createElement('p')
    nameOpIn.innerHTML = "Operador: " + dados.nameOpIn;
    li.appendChild(nameOpIn)
  }
*/
  if (dados.status) {
    const status = document.createElement('p')
    status.innerHTML = "Status: " + dados.status
    li.appendChild(status)
  }
  
  if(dados.recebedor){
    const recebedor = document.createElement('p')
    recebedor.innerHTML = "Recebedor: " + dados.recebedor
    li.appendChild(recebedor)
  }
  
  

  if (dados.dateOut) {
    const dateOut = document.createElement('p')
    dateOut.innerHTML = dados.dateOut + " - " + dados.hourOut
    li.appendChild(dateOut)
  }

  /*
  if (dados.hourOut) {
    const hourOut = document.createElement('p')
    hourOut.innerHTML = dados.hourOut
    li.appendChild(hourOut)
  }
  */

  /*
  if (dados.nameOpOut) {
    const nameOpOut = document.createElement('p')
    nameOpOut.innerHTML = "Operador: " + dados.nameOpOut
    li.appendChild(nameOpOut)
  }
*/


  orderList.appendChild(li);







}



function formatDescription(description) {
  return `Descrição: ${description.tipo} &#10132 Qdt: ${description.qtd}`
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-br');
}



function reload() {
  window.location.reload = true;
}








