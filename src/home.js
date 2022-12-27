const f = {
  btn: () => document.getElementById('btnVoltar'),
  ps: () => document.getElementById('ps'),
  msgError: () => document.getElementById('msg-error'),
  op: () => document.getElementById('operation')
}

document.addEventListener('DOMContentLoaded', () => {
  firebase.firestore()
    .collection('home')
    .orderBy('ap')
    .onSnapshot(snapShot => {

      
        const operations = snapShot.docs.map(doc => doc.data())
        addOperationToScreen(operations)



    
      snapShot.docChanges().forEach(home => {

        
        if (home.type == 'removed') {

          console.log('removed')
          window.location.href = 'home.html'
        }

        if (home.type == 'modified') {

          console.log('modified')
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

/*

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    findOperation(user);
  }
})

*/

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


function addOperationToScreen(operation) {

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

  const orderList = document.getElementById('operation')

  operation.forEach(operation => {

    const li = document.createElement('li');

    li.classList.add(operation.typeColor, "li-get");

    if (operation.ap) {
      const ap = document.createElement('p')
      ap.innerHTML = `<strong>Ap: ${operation.ap}<strong>`
      li.appendChild(ap)

    }

    if (operation.name) {

      const name = document.createElement('p')
      name.innerHTML = "Nome: " + operation.name
      li.appendChild(name)
    }

    if (operation.description) {

      const description = document.createElement('p')
      description.innerHTML = formatDescription(operation.description)
      li.appendChild(description)
    }

    if (operation.pg) {

      const pg = document.createElement('p')
      pg.innerHTML = "Página: " + operation.pg
      li.appendChild(pg)

    }

    if (operation.dateIn) {
      const dateIn = document.createElement('p')
      dateIn.innerHTML = "Recebimento: " + operation.dateIn
      li.appendChild(dateIn)
    }

    if (operation.hourIn) {
      const hourIn = document.createElement('p')
      hourIn.innerHTML = operation.hourIn
      li.appendChild(hourIn)
    }

    if (operation.nameOpIn) {
      const nameOpIn = document.createElement('p')
      nameOpIn.innerHTML = "Operador: " + operation.nameOpIn;
      li.appendChild(nameOpIn)
    }

    if (operation.status) {
      const status = document.createElement('p')
      status.innerHTML = "Status: " + operation.status
      li.appendChild(status)
    }

    if (operation.dateOut) {
      const dateOut = document.createElement('p')
      dateOut.innerHTML = operation.dateOut
      li.appendChild(dateOut)
    }

    if (operation.hourOut) {
      const hourOut = document.createElement('p')
      hourOut.innerHTML = operation.hourOut
      li.appendChild(hourOut)
    }

    if (operation.nameOpOut) {
      const nameOpOut = document.createElement('p')
      nameOpOut.innerHTML = "Operador: " + operation.nameOpOut
      li.appendChild(nameOpOut)
    }

    orderList.appendChild(li);

  })

}

function formatDescription(description) {
  return `Descrição: ${description.tipo} Qdt: ${description.qtd}`
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-br');
}



function reload() {
  window.location.reload = true;
}










