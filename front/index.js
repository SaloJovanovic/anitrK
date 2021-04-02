console.log("cao")

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo-img');
    header.classList.toggle("sticky", window.scrollY > 0);
    if (header.classList.contains("sticky"))
        logo.src = 'images/logo-blank-gradient.png';
    else
        logo.src = 'images/logo-colorful.png';
});