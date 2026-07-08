const config = {
  whatsappNumber: "54XXXXXXXXXX",
  googleMapsLink: "https://maps.google.com/?q=Suipacha+730,+CABA",
  horarios: "Lun a Sáb 07:30 a 20:00 · Dom 08:00 a 14:00",
  phone: "(011) 4000-0000",
};

const categories = ["Sándwichitos", "Catering", "Viandas", "Facturas"];
const formatterArs = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const officialLogoSrc = "data:image/jpeg;base64,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";

function fallbackImageDataUrl(label = "La Rosetta") {
  const safe = String(label)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .slice(0, 42);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" role="img" aria-label="Imagen no disponible"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#7b1f3a"/><stop offset="100%" stop-color="#5a142a"/></linearGradient></defs><rect width="1200" height="900" fill="url(#g)"/><text x="50%" y="46%" text-anchor="middle" font-size="62" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-weight="700">La Rosetta</text><text x="50%" y="56%" text-anchor="middle" font-size="34" fill="#f5e9ee" font-family="Arial, Helvetica, sans-serif">${safe}</text></svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function officialLogoDataUrl() {
  return officialLogoSrc;
}

function applyOfficialLogos(root = document) {
  const logoSrc = officialLogoDataUrl();
  root.querySelectorAll('[data-official-logo="true"]').forEach((img) => {
    img.src = logoSrc;
  });
}

function applyImageFallbacks(root = document) {
  root.querySelectorAll("img").forEach((img) => {
    if (img.dataset.fallbackBound === "true") return;
    img.dataset.fallbackBound = "true";

    const fallback = fallbackImageDataUrl(img.alt || "Producto");
    img.addEventListener("error", () => {
      if (img.dataset.fallbackApplied === "true") return;
      img.dataset.fallbackApplied = "true";
      img.src = fallback;
    });
  });
}
const randomPrice = (min, max) => Math.round(Math.random() * (max - min) + min);

const createWhatsAppLink = (message) =>
  `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;

async function loadProducts() {
  const response = await fetch("data/products.json");
  if (!response.ok) throw new Error("No se pudo cargar el catálogo");
  return response.json();
}

function withPrices(products) {
  return products.map((product) => ({
    ...product,
    demoPrice: randomPrice(product.priceMin, product.priceMax),
  }));
}

function initSharedContact() {
  document.querySelectorAll("#waHeaderBtn, #waHeroBtn, #waStepsBtn, #waContactBtn").forEach((btn) => {
    if (!btn) return;
    btn.href = createWhatsAppLink("Hola La Rosetta, quiero hacer un pedido.");
    btn.target = "_blank";
    btn.rel = "noreferrer";
  });

  const mapsBtn = document.getElementById("mapsBtn");
  if (mapsBtn) mapsBtn.href = config.googleMapsLink;

  const horariosText = document.getElementById("horariosText");
  if (horariosText) horariosText.textContent = config.horarios;

  const phoneText = document.getElementById("phoneText");
  if (phoneText) phoneText.textContent = config.phone;

  const mapContainer = document.getElementById("mapContainer");
  if (mapContainer) {
    mapContainer.innerHTML = `<iframe title="Mapa de ubicación de La Rosetta" src="https://www.google.com/maps?q=Suipacha+730,+CABA&output=embed" width="100%" height="260" style="border:0;border-radius:10px;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  }
}

function productCardTemplate(product) {
  const tagHtml = product.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
  const waLink = createWhatsAppLink(`Hola La Rosetta, quiero pedir: ${product.name}`);

  return `
    <article class="card" aria-label="${product.name}">
      <img class="card-image" src="${product.imageUrl}" alt="${product.name} de La Rosetta" loading="lazy" />
      <div class="card-body">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="tags">${tagHtml}</div>
        <div class="price-row">
          <span class="price">${formatterArs.format(product.demoPrice)}</span>
          <a class="btn btn-secondary" href="${waLink}" target="_blank" rel="noreferrer">Pedir</a>
        </div>
      </div>
    </article>
  `;
}

function initCatalogPage(products) {
  const featuredGrid = document.getElementById("featuredGrid");
  const catalogGrid = document.getElementById("catalogGrid");
  const filtersContainer = document.getElementById("categoryFilters");
  const searchInput = document.getElementById("searchInput");
  const refreshPricesBtn = document.getElementById("refreshPricesBtn");

  if (!catalogGrid) return;

  let pricedProducts = withPrices(products);
  let activeCategory = "Todas";

  const featuredProducts = pricedProducts.filter((product) => product.featured).slice(0, 3);
  if (featuredGrid) {
    featuredGrid.innerHTML = featuredProducts.map(productCardTemplate).join("");
    applyImageFallbacks(featuredGrid);
  }

  const renderFilters = () => {
    const allFilters = ["Todas", ...categories];
    filtersContainer.innerHTML = allFilters
      .map(
        (category) => `
      <button type="button" class="filter-chip ${activeCategory === category ? "active" : ""}" data-category="${category}">
        ${category}
      </button>
    `,
      )
      .join("");
  };

  const renderCatalog = () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = pricedProducts.filter((product) => {
      const byCategory = activeCategory === "Todas" || product.category === activeCategory;
      const bySearch = product.name.toLowerCase().includes(query);
      return byCategory && bySearch;
    });

    catalogGrid.innerHTML = filtered.length
      ? filtered.map(productCardTemplate).join("")
      : `<p class="notice">No encontramos productos con ese filtro.</p>`;
    applyImageFallbacks(catalogGrid);
  };

  filtersContainer.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    renderFilters();
    renderCatalog();
  });

  searchInput.addEventListener("input", renderCatalog);

  refreshPricesBtn.addEventListener("click", () => {
    pricedProducts = withPrices(products);
    renderCatalog();
    if (featuredGrid) {
      const updatedFeatured = pricedProducts.filter((product) => product.featured).slice(0, 3);
      featuredGrid.innerHTML = updatedFeatured.map(productCardTemplate).join("");
      applyImageFallbacks(featuredGrid);
    }
  });

  renderFilters();
  renderCatalog();
}

function menuCategoryTemplate(categoryName, products) {
  const rows = products
    .map(
      (product) => `
      <li>
        <span>${product.name}</span>
        <strong>${formatterArs.format(product.demoPrice)}</strong>
      </li>
    `,
    )
    .join("");

  return `
    <section class="menu-category">
      <h2>${categoryName}</h2>
      <ul class="menu-list">${rows}</ul>
    </section>
  `;
}

function initMenuPage(products) {
  const menuContent = document.getElementById("menuContent");
  if (!menuContent) return;

  const pricedProducts = withPrices(products);

  const grouped = categories
    .map((category) => ({
      category,
      items: pricedProducts.filter((product) => product.category === category),
    }))
    .filter((group) => group.items.length);

  menuContent.innerHTML = grouped
    .map((group) => menuCategoryTemplate(group.category, group.items))
    .join("");

  const generatedAt = document.getElementById("menuGeneratedAt");
  if (generatedAt) {
    generatedAt.textContent = new Date().toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  const waText = document.getElementById("waText");
  if (waText) waText.textContent = config.whatsappNumber;

  const printBtn = document.getElementById("printBtn");
  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }
}

async function initApp() {
  initSharedContact();
  applyOfficialLogos(document);
  applyImageFallbacks(document);

  try {
    const products = await loadProducts();
    initCatalogPage(products);
    initMenuPage(products);
  } catch (error) {
    console.error(error);
    const fallbackMessage = "No pudimos cargar el catálogo. Revisá el archivo data/products.json.";
    const catalogGrid = document.getElementById("catalogGrid");
    const menuContent = document.getElementById("menuContent");
    if (catalogGrid) catalogGrid.innerHTML = `<p class="notice">${fallbackMessage}</p>`;
    if (menuContent) menuContent.innerHTML = `<p class="notice">${fallbackMessage}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", initApp);
