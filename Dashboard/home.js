function toggleMenu() {
 const navLinks = document.getElementById('navLinks');
 navLinks.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
 const menuToggle = document.querySelector('.menu-toggle');
 const navLinks = document.querySelector('.nav-links.active');

 menuToggle.addEventListener('click', function() {
  navLinks.classList.toggle('show');
 });
});