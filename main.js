const menuAbrir  = document.getElementById('menuAbrir');
const menuCerrar = document.getElementById('menuCerrar');
const cntMenu    = document.querySelector('.cntMenu');

menuAbrir.addEventListener('click', function(){
    cntMenu.classList.toggle('active')
});
menuCerrar.addEventListener('click', function(){
    cntMenu.classList.remove('active')
})


