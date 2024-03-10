// Show Menu

const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)
    
    toggle.addEventListener('click', () =>{
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')
        // Add show-icon to show and hide menu icon
        toggle.classList.toggle('show-icon');
    })
}

showMenu('nav--toggle','nav__menu');

function redropdownMenu(){
    const dropMenu = 
    document.querySelectorAll(".dropdown--menu");
    const dropSubMenu = 
        document.querySelectorAll(".dropdown--submenu");
        
    dropMenu.forEach((menu) => {
        const menuRect = menu.getBoundingClientRect();
        if (menuRect.right > window.innerWidth)
        menu.style.right = 0;
    });
    dropSubMenu.forEach((subMenu) => {
        const subMenuRect = subMenu.getBoundingClientRect();
        if (subMenuRect.right > window.innerWidth)
        subMenu.style.left = `${-subMenuRect.width}px`;
    });
}
redropdownMenu();
window.addEventListener('resize', () =>{
    redropdownMenu();
})