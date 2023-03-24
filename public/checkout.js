const cartPopupBtn = document.getElementById('cartBtn');

cartPopupBtn.addEventListener('click', function() {
    // Generate HTML for the cart items and quantity
    const cartItems = getCartItems();
    const cartHTML = generateCartHTML(cartItems);
  
    // Set the innerHTML of the popup to the cart HTML
    const popupContent = document.querySelector('.popup-content');
    popupContent.innerHTML = cartHTML;
  
    // Show the popup
    popup.style.display = 'block';
  });

async function getCartItems() {
    const res = await fetch("/cart");
    const result = await res.json();
    console.log(result.line_items)
    const cartItems = result.line_items;
    return cartItems;
  }
function generateCartHTML(cartItems) {
    let cartHTML = '';
  
    // Iterate through each item in the cart
    for (const item of cartItems) {
      // Generate HTML for each item in the cart
      const itemHTML = `
        <div class="cart-item">
          <span class="item-name">${item.name}</span>
          <span class="item-quantity">${item.quantity}</span>
        </div>
      `;
      cartHTML += itemHTML; // Append the HTML for each item to the cartHTML string
    }
  
    return cartHTML; // Return the complete cart HTML string
  }