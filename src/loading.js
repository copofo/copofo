function showLoading(){
    const lbl = document.getElementById('lbl')
    const div = document.createElement('div')
    div.classList.add("loading","centralize")

    const label = document.createElement('label')
    label.innerHTML = 'Carregando...'
    
    div.appendChild(label)


    lbl.appendChild(div)
}

function hideLoading(){
    const loadings = document.getElementsByClassName('loading')
    if(loadings.length){
        loadings[0].remove();
    }
}

/*

 <div class="loading centralize">
        <label>Carregando...</label>
    </div>



*/