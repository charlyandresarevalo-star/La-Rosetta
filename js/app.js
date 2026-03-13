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
  const arc = (cx, cy, r, a0, a1) => {
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const laf = Math.abs(a1 - a0) > Math.PI ? 1 : 0;
    const sweep = a1 > a0 ? 1 : 0;
    return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${laf} ${sweep} ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  };

  const ring = Array.from({ length: 12 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 12;
    const cx = 210 + 120 * Math.cos(angle);
    const cy = 145 + 88 * Math.sin(angle);
    return arc(cx, cy, 44, -2.45, 0.35);
  }).join(" ");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="520" viewBox="0 0 420 520" role="img" aria-label="Logo oficial de La Panadería Rosetta"><defs><linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f1a06a"/><stop offset="50%" stop-color="#b64022"/><stop offset="100%" stop-color="#7b1f15"/></linearGradient><linearGradient id="plate" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#7a2316"/><stop offset="100%" stop-color="#ba4a2c"/></linearGradient></defs><path d="${ring}" fill="none" stroke="url(#ring)" stroke-width="13" stroke-linecap="round"/><rect x="36" y="250" width="348" height="50" fill="url(#plate)" stroke="#dba06f" stroke-width="3"/><text x="210" y="283" text-anchor="middle" fill="#fff" font-family="Georgia, 'Times New Roman', serif" font-size="26" letter-spacing="2">LA PANADERIA</text><text x="210" y="382" text-anchor="middle" fill="#1f1a19" font-family="Georgia, 'Times New Roman', serif" font-size="88">rosetta</text><text x="210" y="438" text-anchor="middle" fill="#2a201f" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-style="italic">“Te acompaña todo el día”</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
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
