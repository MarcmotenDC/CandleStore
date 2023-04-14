const cartPopupBtn = document.getElementById('cartBtn');
const apiCartItems = document.getElementById('cartItems');
const checkoutForm = document.getElementById('checkoutForm');
const loadingIcon = document.querySelector('#loadingIcon');
const closeBtn = document.querySelector('.close');
const cartContent = document.getElementById("cartContent");
const checkoutBtn = document.getElementById("checkoutBtn");

let cartEmpty = true;

cartPopupBtn.addEventListener('click', async function() {
  // Show the loading icon and hide the checkout form
  loadingIcon.style.display = 'block';
  popup.style.display = 'block';

  // Generate HTML for the cart items
  const cartItems = await getCartItems();
  const cartHTML = generateCartHTML(cartItems);

  // Hide the loading icon and show the cart items and checkout button
  loadingIcon.style.display = 'none';
  cartContent.style.display = 'block';
  checkoutForm.style.display = 'none';
  apiCartItems.style.display = 'block';
  apiCartItems.innerHTML = cartHTML;

  // Show the popup

  closeBtn.addEventListener('click', function() {
  console.log("closed!")
  popup.style.display = 'none';
  cartContent.style.display = 'none';
  checkoutForm.style.display = 'none';
  apiCartItems.style.display = 'none';
});
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
    cartEmpty = true;
    checkoutBtn.style.display = 'none';
    return "<p>Your cart is empty.</p>";
  }

  let cartHTML = "";

  // Iterate through each item in the cart
  for (const itemID in cartItems) {
    const item = cartItems[itemID];
    const itemHTML = `
      <div class="cartItem">
        <h3 class="itemName">${item.name}: ${item.quantity}</h3>
      </div>
    `;
    cartHTML += itemHTML;
  }
  cartEmpty = false;
  checkoutBtn.style.display = 'inline-block';
  return cartHTML;
}


// Checkout Function
checkoutBtn.addEventListener("click", async () => {
  loadingIcon.style.display = 'block';
  checkoutBtn.style.opacity = '0%'
  try {
    const res = await fetch('/checkout');
    const data = await res.json();
    loadingIcon.style.display = 'none';
    checkoutBtn.style.display = 'none';
    checkoutForm.style.display = 'block';
    apiCartItems.style.display = 'none';
  } catch(err) {
    console.log(err)
  }

});