const pathName = window.location.pathname
if(pathName === '/'){
    document.getElementById('home').classList.add('active_menu')
}else if(pathName === '/document/'){
    document.getElementById('document').classList.add('active_menu')
}

function myFunction(x) {
    x.classList.toggle("change");
}