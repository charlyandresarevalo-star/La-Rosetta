# La Rosetta · Sitio estático

Landing + catálogo editable + menú imprimible para panadería/confitería **La Rosetta**.

## 1) Ver localmente

```bash
python -m http.server 8000
```

Después abrir:
- `http://localhost:8000/index.html`
- `http://localhost:8000/menu.html`

## 2) Editar productos y rangos de precios

Archivo: `data/products.json`.

Cada producto tiene:
- `id`
- `name`
- `category` (`Sándwichitos`, `Catering`, `Viandas`, `Facturas`)
- `description`
- `imageUrl` (URL pública)
- `priceMin`
- `priceMax`
- `tags` (array)
- `featured` (opcional)

El catálogo usa precios demo aleatorios dentro del rango `[priceMin, priceMax]`.
Con el botón **“Actualizar precios (demo)”** se re-randomizan los precios en pantalla.

Configuraciones editables en `js/app.js`:
- `whatsappNumber`
- `googleMapsLink`
- `horarios`
- `phone`

## 3) Publicar en GitHub Pages

1. Subir este contenido a tu repo (rama principal o `gh-pages`).
2. En GitHub: **Settings → Pages**.
3. En **Build and deployment**, elegir **Deploy from a branch**.
4. Seleccionar rama (`main` o `gh-pages`) y carpeta (`/root`).
5. Guardar y esperar la URL pública.

## 4) Imprimir / Guardar PDF del menú

1. Abrir `menu.html`.
2. Click en **“Imprimir / Guardar PDF”**.
3. En el diálogo del navegador elegir:
   - Destino: **Guardar como PDF**
   - Papel: **A4**
   - Márgenes: predeterminado/recomendado
4. Guardar el archivo PDF.

> Nota: los precios del menú son de muestra (demo) y se generan al cargar la página.
