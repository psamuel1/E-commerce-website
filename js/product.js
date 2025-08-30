
const qs = new URLSearchParams(location.search);
const id = parseInt(qs.get('id') || '0', 10);
const mainImage = document.getElementById('mainImage');
const thumbs = document.getElementById('thumbs');
const prodTitle = document.getElementById('prodTitle');
const prodPrice = document.getElementById('prodPrice');
const prodCategory = document.getElementById('prodCategory');
const prodDesc = document.getElementById('prodDesc');
const addBtn = document.getElementById('addBtn');
const qtyInput = document.getElementById('qty');
const renderThumb = (src) => { const t = document.createElement('img'); t.src = src; t.addEventListener('click', () => { mainImage.src = src; }); thumbs.appendChild(t); };
const init = async () => {
  const p = await fetchProductById(id);
  if (!p || !p.id) { prodTitle.textContent = 'Product not found'; return; }
  prodTitle.textContent = p.title;
  prodPrice.textContent = `$${p.price.toFixed(2)}`;
  prodCategory.textContent = p.category;
  prodDesc.textContent = p.description;
  mainImage.src = p.image;
  renderThumb(p.image);
  const related = await fetchProductsByCategory(p.category, 4);
  related.forEach(r => renderThumb(r.image));
  addBtn.addEventListener('click', () => {
    const q = parseInt(qtyInput.value || '1', 10);
    addToCart(p, q);
    addBtn.textContent = 'Added!';
    setTimeout(()=> addBtn.textContent = 'Add to Cart', 1200);
  });
};
document.addEventListener('DOMContentLoaded', init);
