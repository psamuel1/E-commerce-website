const CART_KEY = "psalmie_luxe_cart";
const getCart = () => {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
};
const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
};
const updateCartCount = () => {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  const el = document.getElementById("cart-count");
  if (el) el.textContent = count;
};
const addToCart = (product, qty = 1) => {
  const cart = getCart();
  const existing = cart.find((i) => i.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      qty,
    });
  }
  saveCart(cart);
};
const removeFromCart = (id) => {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
};
const updateQuantity = (id, qty) => {
  const cart = getCart().map((i) =>
    i.id === id ? { ...i, qty: Math.max(1, qty) } : i
  );
  saveCart(cart);
};

function toggleMenu() {
  const nav = document.querySelector(".nav");
  nav.classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", updateCartCount);
