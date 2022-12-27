window.addEventListener('load', focus)


function focus(){
    email.focus()
}

window.addEventListener('keypress', function(e){
    if(e.key == 'Enter'){
        f.btn().click();
    }
})


