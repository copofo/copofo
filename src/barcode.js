const f = (tag) => document.querySelector(tag)


const ler = f('#ler')

const scanner = new Html5QrcodeScanner('reader', {
qrbox: {
width: 250,
height: 250,
},
fps: 20,
});

  
  
ler.addEventListener('click',(e)=>{
  scanner.render(success, error);
    function success(result) {
  document.getElementById('barcode').value = result


  scanner.clear();
  document.getElementById('reader').remove();
}
})





function error(err) {
console.error(err);
}