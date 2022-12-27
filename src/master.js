const f = {
    email: () => document.getElementById('email'),
    pw: () => document.getElementById('pw'),
    btn: () => document.getElementById('btn'),
    body: () => document.getElementById('body')
}
var currentUser;
window.addEventListener('DOMContentLoaded', ()=>{
    firebase.auth().onAuthStateChanged((user) =>{
        currentUser = firebase.auth().currentUser;

        if(currentUser == null){
            
            window.location.href = '../index.html'
        }

        if(user.uid != "oHXzLxE7rgfOYUU8Z8lejbR7zvz2"){
            window.location.href = "../index.html"
        } else{
            f.body().style.display = 'block'
            
        }

        

    })

    

})


function voltar() {
    window.location.href = 'home.html'
}

function createUser() {
    const email = f.email().value
    const pw = f.pw().value

    firebase.auth().createUserWithEmailAndPassword(email, pw)
        .then(user => {
            console.log('usuario', user)
        })
        .catch(erro => {
            console.log('erro', erro)
        })
}

// function login() {
//     firebase.auth().signInWithEmailAndPassword('tabs.estudos@gmail.com', '9569887')
//         .then(user => {
//             console.log("usuario", user)
//         })
//         .catch(erro => {
//             console.log('erro', erro)
//         })

// }

function start() {
    login()
}


