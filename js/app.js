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
