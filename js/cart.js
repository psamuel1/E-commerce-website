
const cartList = document.getElementById('cartList');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');
const renderItem = (item) => {
  const row = document.createElement('div');
  row.className = 'cart-item';
  row.innerHTML = `
     <img src="${item.image}" alt="">
     <div class="title">${item.title}</div>
     <div class="price">$${item.price.toFixed(2)}</div>
     <input type="number" min="1" value="${item.qty}">
     <button class="btn secondary">Remove</button>`;
  const qtyInput = row.querySelector('input');
  const removeBtn = row.querySelector('button');
  qtyInput.addEventListener('change', () => { updateQuantity(item.id, parseInt(qtyInput.value||'1',10)); render(); });
  removeBtn.addEventListener('click', () => { removeFromCart(item.id); render(); });
  return row;
};
const render = () => {
  const cart = getCart();
  cartList.innerHTML = '';
  cart.forEach(i => cartList.appendChild(renderItem(i)));
  const subtotal = cart.reduce((s,i)=> s + i.price*i.qty, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
};
document.addEventListener('DOMContentLoaded', render);
