const cartUrl = "/cart";
const cartContentUrl = "/cart/contents";
const itemCount = document.querySelector(".itemCount");

document.onload = createCart();

document.onload = itemCount.innerHTML += "(0)";

async function createCart() {
  const res = await fetch(cartUrl);
  const result = await res.json();
  console.log("cart Initialized!");
}

async function addToCart(event) {
  console.log("cart event");
  try {
    const res = await fetch(cartUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productID: event.target.value,
      }),
    });
    const renderedItemCount = await cartItems();
    console.log("cart event done!");
    itemCount.innerHTML = "(" + renderedItemCount + ")";
  } catch (err) {
    console.log(err);
  }
}
// awaits fetching cart content then runs through quantity of items in cart
async function cartItems() {
  const res = await fetch(cartContentUrl);
  const result = await res.json();
  let totalItems = 0;
  //runs through array of items and adds the quantity
  result.forEach((item) => {
    let itemq = item.quantity;
    totalItems = totalItems + itemq;
  });
  document.cookie = "itemsInCart=" + totalItems + ";path=/";

  return totalItems;
}
// Displays current cart
const popupCartBtn = document.querySelector('#cartBtn');
const popup = document.querySelector('#cart');
const loadingPlaceholder = document.querySelector('.loadingPlaceholder');

// Show loading icon and hide popup
popup.style.display = 'none';
loadingPlaceholder.style.display = 'block';

popupCartBtn.addEventListener('click', async function() {
  // Wait for the API call
  while (document.readyState !== 'complete') {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Generate HTML for the cart items
  const cartItems = await getCartItems();
  const cartHTML = generateCartHTML(cartItems);

  const cartContent = document.querySelector('#cartContent');
  cartContent.innerHTML = cartHTML;

  // Hide loading icon and show popup
  popup.style.display = 'block';
  loadingPlaceholder.style.display = 'none';
});

// Close the popup when the X button is clicked
const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', function() {
  popup.style.display = 'none';
});
