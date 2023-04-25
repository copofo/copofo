const f = {
    email: () => document.getElementById('email'),
    pw: () => document.getElementById('password'),
    btn: () => document.getElementById('btn'),
    msgEmailError: () => document.getElementById('msg-email-error'),
    msgPasswordError: () => document.getElementById('msg-password-error'),
    msgErrorLogin: () => document.getElementById('msgErrorLogin')
}


window.addEventListener('DOMContentLoaded', checkLogin)
    
    





function checkLogin(){
  
  firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.location.href = "pg/home.html"
            
        }
    })
}



window.addEventListener('load', focus)
function focus() {
    email.focus()
}

window.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        f.btn().click();
    }
})

function login() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(f.email().value, f.pw().value).then(res => {
        hideLoading();
        window.location.href = "pg/home.html"
    })
        .catch(erro => {
            hideLoading();
            const msg = f.msgErrorLogin()
            msg.style.display = 'block'
            msg.innerHTML = getErrorMessage(erro)


            if (getErrorMessage(erro) == 'O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas.') {

                setTimeout(() => {

                    window.location.href = 'index.html'
                }, 8000);
            } else {

                msg.innerHTML = getErrorMessage(erro)

            }

        })


}



function getErrorMessage(erro) {
    if (erro.code == "auth/user-not-found") {
        return "Usuário não encontrado!"
    }

    if (erro.code == "auth/wrong-password") {
        return "Senha inválida!"
    }

    if (erro.code == "auth/too-many-requests") {

        return "O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas."

    }

    if (erro.code == "auth/invalid-email") {
        return "Email inválido"
    }
    return erro.message;
}



