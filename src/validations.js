f.email().addEventListener('change', onChangeEmail)
f.pw().addEventListener('change', onChangePassword)
f.email().addEventListener('blur', onChangeEmail)
f.pw().addEventListener('blur', onChangePassword)

f.pw().addEventListener('keyup', function (e) {

    const email = f.email().value
    const pw = f.pw()

    if(e && email){
        onChangePassword();
    }

})

function onChangeEmail() {
    toogleButtonDisable();
    toogleEmailErrors();
}

function onChangePassword() {
    toogleButtonDisable();
    tooglePasswordErrors();
}

function isPasswordValid() {
    const pw = f.pw().value
    if (!pw) { return false }
    return true;
}

function isEmailValid() {
    const email = f.email().value
    if (!email) { return false }

    return validateEmail(email)
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function toogleEmailErrors() {
    const email = f.email().value;
    const emailValid = isEmailValid();
    f.msgEmailError().style.display = email && emailValid ? 'none' : 'block';
}

function toogleButtonDisable() {

    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();
    f.btn().disabled = !emailValid || !passwordValid;

}

function tooglePasswordErrors() {
    const pw = f.pw().value
    f.msgPasswordError().style.display = pw ? 'none' : 'block'
}

