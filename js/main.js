
const featuredGrid = document.getElementById('featured-grid');
const categoryGrid = document.getElementById('category-grid');
const searchInput = document.getElementById('search-input');
let featuredData = [];
const renderProductCard = (p) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="img-wrap"><img src="${p.image}" alt=""></div>
    <div class="info">
      <div class="title">${p.title}</div>
      <div class="actions">
        <div class="price">$${p.price.toFixed(2)}</div>
        <a class="btn secondary" href="product.html?id=${p.id}">View</a>
      </div>
    </div>`;
  return card;
};
const loadFeatured = async () => { featuredData = await fetchProducts(12); featuredGrid.innerHTML = ''; featuredData.forEach(p => featuredGrid.appendChild(renderProductCard(p))); };
const loadCategories = async () => {
  const cats = await fetchCategories();
  categoryGrid.innerHTML = '';
  for (const c of cats) {
    const count = (await fetchProductsByCategory(c, 1000)).length || '';
    const el = document.createElement('div');
    el.className = 'category';
    el.innerHTML = `<a href="#featured"><div class="name">${c}</div><div class="chip">${count || ''} items</div></a>`;
    el.addEventListener('click', async () => {
      const list = await fetchProductsByCategory(c, 12);
      featuredGrid.innerHTML = '';
      list.forEach(p => featuredGrid.appendChild(renderProductCard(p)));
    });
    categoryGrid.appendChild(el);
  }
};
const handleSearch = () => {
  const q = (searchInput?.value || '').toLowerCase();
  const filtered = featuredData.filter(p => p.title.toLowerCase().includes(q));
  featuredGrid.innerHTML = '';
  filtered.forEach(p => featuredGrid.appendChild(renderProductCard(p)));
};
document.addEventListener('DOMContentLoaded', async () => {
  await loadFeatured();
  await loadCategories();
  searchInput?.addEventListener('input', handleSearch);
});
