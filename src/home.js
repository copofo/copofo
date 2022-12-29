const f = {
  btn: () => document.getElementById('btnVoltar'),
  ps: () => document.getElementById('ps'),
  msgError: () => document.getElementById('msg-error'),
  op: () => document.getElementById('dados')
}







document.addEventListener('DOMContentLoaded', () => {
  firebase.firestore()
    .collection('home')
    .onSnapshot(function (documentos){
      
      
      documentos.docChanges().forEach(function (changes) {
        
        if (changes.type == 'added') {
            
            
            const doc = changes.doc
            
            const dados = doc.data()
            
            const key = doc.id
            
            
            addOperationToScreen(dados)
            
            
        }
      

        if (changes.type == 'modified') {
          
          console.log('modified')
          window.location.href = 'home.html'
        }
        
        
        if (changes.type == 'removed') {
          
          console.log('removed')
          window.location.href = 'home.html'
        }

        
      })
    })
})




f.ps().addEventListener('touchstart', superUser)

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
  window.location.href = '../pg/add.html'
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
        window.location.href = 'home.html'
      }, 1000);
    }
  })
}



firebase.auth().onAuthStateChanged(user => {
  if (user) {
    findOperation(user);
  }
})




/*
function findOperation(user) {

  showLoading()
  firebase.firestore()
    .collection('home')
    // .where('user.uid', '==', user.uid)
    .orderBy('ap')
    .get()
    .then(snapShot => {
      hideLoading();
      const operations = snapShot.docs.map(doc => doc.data())
      addOperationToScreen(operations)
    })
    .catch(erro => {
      hideLoading();
      console.log("Erro ao recuperar as operaçãoes!", erro)
    })

}
*/



function addOperationToScreen(dados) {
  
  /*

  var pen = 0;
  var ent = 0;


  operation.forEach((v) => {
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

  const orderList = document.getElementById('dados')

  

    const li = document.createElement('li');

    li.classList.add(dados.typeColor, "li-get");

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

    if (dados.pg) {

      const pg = document.createElement('p')
      pg.innerHTML = "Página: " + dados.pg
      li.appendChild(pg)

    }

    if (dados.dateIn) {
      const dateIn = document.createElement('p')
      dateIn.innerHTML = "Recebimento: " + dados.dateIn
      li.appendChild(dateIn)
    }

    if (dados.hourIn) {
      const hourIn = document.createElement('p')
      hourIn.innerHTML = dados.hourIn
      li.appendChild(hourIn)
    }

    if (dados.nameOpIn) {
      const nameOpIn = document.createElement('p')
      nameOpIn.innerHTML = "Operador: " + dados.nameOpIn;
      li.appendChild(nameOpIn)
    }

    if (dados.status) {
      const status = document.createElement('p')
      status.innerHTML = "Status: " + dados.status
      li.appendChild(status)
    }

    if (dados.dateOut) {
      const dateOut = document.createElement('p')
      dateOut.innerHTML = dados.dateOut
      li.appendChild(dateOut)
    }

    if (dados.hourOut) {
      const hourOut = document.createElement('p')
      hourOut.innerHTML = dados.hourOut
      li.appendChild(hourOut)
    }

    if (dados.nameOpOut) {
      const nameOpOut = document.createElement('p')
      nameOpOut.innerHTML = "Operador: " + dados.nameOpOut
      li.appendChild(nameOpOut)
    }

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










