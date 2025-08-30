
const API = 'https://fakestoreapi.com';
const fetchProducts = async (limit=12) => { const res = await fetch(`${API}/products?limit=${limit}`); return res.json(); };
const fetchProductById = async (id) => { const res = await fetch(`${API}/products/${id}`); return res.json(); };
const fetchCategories = async () => { const res = await fetch(`${API}/products/categories`); return res.json(); };
const fetchProductsByCategory = async (cat, limit=4) => { const res = await fetch(`${API}/products/category/${encodeURIComponent(cat)}`); const data = await res.json(); return data.slice(0, limit); };
