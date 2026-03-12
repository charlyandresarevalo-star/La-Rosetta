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
  if (featuredGrid) featuredGrid.innerHTML = featuredProducts.map(productCardTemplate).join("");

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
