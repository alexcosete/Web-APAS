const backToTop = document.getElementById('backToTop');
const formBuzon = document.getElementById('formBuzon');
const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section, header');

function toggleBackToTopButton() {
  if (!backToTop) return;
  backToTop.classList.toggle('show', window.scrollY > 500);
}

function updateActiveMenuLink() {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');

    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

function handleScroll() {
  toggleBackToTopButton();
  updateActiveMenuLink();
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function handleBuzonSubmit(event) {
  event.preventDefault();

  if (!mensajeConfirmacion || !formBuzon) return;

  mensajeConfirmacion.classList.remove('d-none');
  formBuzon.reset();

  setTimeout(() => {
    mensajeConfirmacion.classList.add('d-none');
  }, 5000);
}

window.addEventListener('scroll', handleScroll);

if (backToTop) {
  backToTop.addEventListener('click', scrollToTop);
}

if (formBuzon) {
  formBuzon.addEventListener('submit', handleBuzonSubmit);
}