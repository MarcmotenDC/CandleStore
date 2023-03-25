const cartPopupBtn = document.getElementById('cartBtn');
const cartContent = document.querySelector('#cartContent');
const checkoutForm = document.getElementById('checkoutForm');
const loadingIcon = document.querySelector('#loadingIcon');

cartPopupBtn.addEventListener('click', async function() {
  // Show the loading icon and hide the checkout form
  loadingIcon.style.display = 'block';
  checkoutForm.style.display = 'none';

  // Generate HTML for the cart items
  const cartItems = await getCartItems();
  const cartHTML = generateCartHTML(cartItems);

  // Hide the loading icon and show the cart items and checkout form
  loadingIcon.style.display = 'none';
  cartContent.innerHTML = cartHTML;
  checkoutForm.style.display = 'block';

  // Show the popup
  popup.style.display = 'block';
});

async function getCartItems() {
  const res = await fetch("/cart");
  const result = await res.json();
  console.log(typeof result.line_items);
  const cartItems = result.line_items;
  return cartItems;
}

function generateCartHTML(cartItems) {
  if (cartItems.length === 0) {
    return "<p>Your cart is empty.</p>";
  }

  let cartHTML = "";

  // Iterate through each item in the cart
  for (const itemID in cartItems) {
    const item = cartItems[itemID];
    const itemHTML = `
      <div class="cartItem">
        <span class="itemName">${item.name}</span>
        <span class="itemQuantity">${item.quantity}</span>
      </div>
    `;
    cartHTML += itemHTML;
  }

  return cartHTML;
}
