const pathName = window.location.pathname
if(pathName === '/'){
    document.getElementById('home').classList.add('active_menu')
}else if(pathName === '/document/'){
    document.getElementById('document').classList.add('active_menu')
}

function myFunction(x) {
    x.classList.toggle("change");
    const menu = document.getElementById('menu')
    if(menu.style.display === 'flex'){
        menu.style.display = 'none'
    }else{
        menu.style.display = 'flex'
    }
}