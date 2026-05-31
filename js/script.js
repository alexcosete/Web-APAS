const backToTop = document.getElementById('backToTop');
const formBuzon = document.getElementById('formBuzon');
const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');

function toggleBackToTopButton() {
  if (!backToTop) return;
  backToTop.classList.toggle('show', window.scrollY > 500);
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

window.addEventListener('scroll', toggleBackToTopButton);

if (backToTop) {
  backToTop.addEventListener('click', scrollToTop);
}

if (formBuzon) {
  formBuzon.addEventListener('submit', handleBuzonSubmit);
}

// Contacto //

const formContacto = document.getElementById("formContacto");
const mensajeContacto = document.getElementById("mensajeContacto");

function handleContactoSubmit(event) {
  event.preventDefault();

  if (!formContacto || !mensajeContacto) return;

  mensajeContacto.classList.remove("d-none");
  formContacto.reset();

  setTimeout(() => {
    mensajeContacto.classList.add("d-none");
  }, 5000);
}

if (formContacto) {
  formContacto.addEventListener("submit", handleContactoSubmit);
}