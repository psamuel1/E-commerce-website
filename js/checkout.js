
const sameAsBilling = document.getElementById('sameAsBilling');
const shippingFields = document.getElementById('shippingFields');
const summaryItems = document.getElementById('summaryItems');
const summaryTotal = document.getElementById('summaryTotal');
const orderMsg = document.getElementById('orderMsg');
const billingForm = document.getElementById('billingForm');
sameAsBilling.addEventListener('change', () => { shippingFields.classList.toggle('hidden', sameAsBilling.checked); });
const renderSummary = () => {
  const cart = getCart();
  summaryItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const row = document.createElement('div');
    row.className = 'order-item';
    row.innerHTML = `<span>${item.title} × ${item.qty}</span><span>$${(item.price*item.qty).toFixed(2)}</span>`;
    summaryItems.appendChild(row);
  });
  summaryTotal.textContent = `$${total.toFixed(2)}`;
};
billingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const cart = getCart();
  if (cart.length === 0) {
    orderMsg.style.color = 'crimson';
    orderMsg.textContent = 'Your cart is empty.';
    return;
  }
  localStorage.removeItem('psalmie_luxe_cart');
  updateCartCount();
  renderSummary();
  orderMsg.style.color = 'green';
  orderMsg.textContent = 'Order placed successfully! A confirmation has been sent to your email.';
});
document.addEventListener('DOMContentLoaded', renderSummary);
