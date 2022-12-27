const j = {
  btn: ()=> document.getElementById('btn-menu'),
  nav: ()=> document.getElementById('nav'),
  menu: ()=> document.getElementById('menu')
}
j.btn().addEventListener('touchstart', toggleMenu)
j.btn().addEventListener('click', toggleMenu)

function toggleMenu(event) {
  if(event.type === "touchstart") event.preventDefault()
  j.nav().classList.toggle('active')
  const active = f.nav().classList.contains('active')
  event.currentTarget.setAttribute('aria-expanded', active)
  if(active) {
    event.currentTarget.setAttribute('aria-label', 'Fechar Menu')
  } else{
    event.currentTarget.setAttribute('aria-label', 'Abrir Menu')
  }

}