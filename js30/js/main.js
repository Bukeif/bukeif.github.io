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

const nav_triggers = document.querySelectorAll('.dropdown__item');
const nav_a_triggers = document.querySelectorAll('.nav__list > li > a');

const nav_dropdown = document.querySelectorAll('.dropdown--menu');
const nav_highlight = document.createElement('span');
nav_highlight.classList.add('heighlight-nav-dropdown');
document.body.append(nav_highlight);

// nav 背景亮起
function nav_highlightLink() {
    const dropdown = this.querySelector('.dropdown--menu');
    const linkCoords = dropdown.getBoundingClientRect();
    // console.log(this.querySelector('.dropdown--menu'));
    const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top - 10,
        left: linkCoords.left + window.scrollX
    };
    nav_highlight.style.width = `${coords.width}px`;
    nav_highlight.style.height = `${coords.height}px`;
    nav_highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

// nav 背景收起
function nav_Outhighlight() {
    nav_highlight.style.width = `0px`;
    nav_highlight.style.height = `0px`;
    nav_highlight.style.transform = `translate(0px, 0px)`;
}

nav_triggers.forEach(a => {
    a.addEventListener('mouseenter', nav_highlightLink)
})
nav_a_triggers.forEach(a => {
    a.addEventListener('mouseenter',(a) =>{
        nav_Outhighlight();
    })
})
nav_dropdown.forEach(a => a.addEventListener('mouseleave', nav_Outhighlight))