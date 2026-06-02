const backToTop = document.getElementById("backToTop");
const formBuzon = document.getElementById("formBuzon");
const mensajeConfirmacion = document.getElementById("mensajeConfirmacion");

function toggleBackToTopButton() {
  if (!backToTop) return;
  backToTop.classList.toggle("show", window.scrollY > 500);
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function handleBuzonSubmit(event) {
  event.preventDefault();

  if (!mensajeConfirmacion || !formBuzon) return;

  mensajeConfirmacion.classList.remove("d-none");
  formBuzon.reset();

  setTimeout(() => {
    mensajeConfirmacion.classList.add("d-none");
  }, 5000);
}

window.addEventListener("scroll", toggleBackToTopButton);

if (backToTop) {
  backToTop.addEventListener("click", scrollToTop);
}

if (formBuzon) {
  formBuzon.addEventListener("submit", handleBuzonSubmit);
}

/* CONTACTO */

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

/* NOTICIAS AUTOMÁTICAS */

const linkPreviews = document.querySelectorAll(".link-preview");

function getDomainName(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch (error) {
    return "Medio digital";
  }
}

/* Evita que comillas, acentos o símbolos rompan el HTML */
function escapeHTML(text) {
  if (!text) return "";

  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createLoadingCard(container) {
  container.innerHTML = `
    <div class="link-preview-loading">
      Cargando noticia...
    </div>
  `;
}

function createFallbackCard(container, url) {
  const safeUrl = escapeHTML(url || "#");
  const domain = escapeHTML(getDomainName(url || "#"));

  container.innerHTML = `
    <div class="auto-news-fallback">
      <span class="auto-news-site">${domain}</span>

      <h2>Noticia externa</h2>

      <p>
        No se ha podido cargar la vista previa automáticamente,
        pero puedes abrir la noticia desde el enlace.
      </p>

      <a href="${safeUrl}" target="_blank" rel="noopener noreferrer">
        Leer noticia
        <i class="bi bi-box-arrow-up-right ms-1"></i>
      </a>
    </div>
  `;
}

function createNewsCard(container, url, data) {
  const title = escapeHTML(data.title || "Noticia externa");
  const description = escapeHTML(
    data.description || "Haz clic para leer la noticia completa en el medio original."
  );

  const image = data.image && data.image.url ? data.image.url : "";
  const safeImage = escapeHTML(image);
  const publisher = escapeHTML(data.publisher || getDomainName(url));
  const safeUrl = escapeHTML(url);

  let imageHTML = "";

  if (safeImage) {
    imageHTML = `
      <div class="auto-news-image-wrap">
        <img
          src="${safeImage}"
          alt="${title}"
          class="auto-news-image"
          loading="lazy"
        >
      </div>
    `;
  } else {
    imageHTML = `
      <div class="auto-news-image-wrap">
        <div class="d-flex h-100 align-items-center justify-content-center text-center p-4">
          <i class="bi bi-newspaper display-4 text-success"></i>
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <a
      href="${safeUrl}"
      target="_blank"
      rel="noopener noreferrer"
      class="auto-news-card"
    >
      ${imageHTML}

      <div class="auto-news-content">
        <span class="auto-news-site">${publisher}</span>

        <h2 class="auto-news-title">${title}</h2>

        <p class="auto-news-description">
          ${description}
        </p>

        <span class="auto-news-footer">
          Leer noticia
          <i class="bi bi-box-arrow-up-right"></i>
        </span>
      </div>
    </a>
  `;
}

async function loadLinkPreview(container) {
  const url = container.dataset.url;

  if (!url || url === "https://www.ejemplo.com") {
    createFallbackCard(container, url || "#");
    return;
  }

  createLoadingCard(container);

  try {
    const apiUrl = "https://api.microlink.io/?url=" + encodeURIComponent(url);

    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result || result.status !== "success" || !result.data) {
      createFallbackCard(container, url);
      return;
    }

    createNewsCard(container, url, result.data);
  } catch (error) {
    createFallbackCard(container, url);
  }
}

if (linkPreviews.length > 0) {
  linkPreviews.forEach(function (container) {
    loadLinkPreview(container);
  });
}