//Mantendo usuário Logado!
window.addEventListener('DOMContentLoaded', () => {
  firebase.auth().onAuthStateChanged((user) => {
    

    if (user == null) {
      window.location.href = '../index.html'
    } else {
      window.document.body.style.display = 'block'
    }
  })



})
