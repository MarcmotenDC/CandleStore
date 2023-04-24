const cartUrl = "/cart";
const cartContentUrl = "/cart/contents";
const itemCount = document.querySelector(".itemCount");
const loadingPlaceholder = document.querySelector('.loadingPlaceholder');
const pageContent = document.querySelector('.pageContent')
const popupCartBtn = document.querySelector('#cartBtn');
const popup = document.querySelector('#cart');
const emptyCartBtn = document.getElementById("clearCartBtn");
document.onload = createCart();

// initializes cart
async function createCart() {
  const res = await fetch(cartUrl);
  const result = await res.json(); 
  itemCount.innerHTML = "(" + result.total_items + ")";
  console.log("cart Initialized!");
  loadingPlaceholder.style.display = 'none';
  pageContent.style.display = 'block';
}

async function addToCart(event) {
  console.log("cart event");
  const quantity = event.target.parentElement.querySelector('.cardQuantity').value;
  event.target.innerHTML = 'Adding...';
  try {
    const res = await fetch(cartUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productID: event.target.value,
        quantity: quantity,
      }),
    });
    const renderedItemCount = await cartItems();
    console.log("cart event done!");
    event.target.innerHTML = 'Add to Cart';
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

emptyCartBtn.addEventListener("click", () => {
  itemCount.innerHTML = "(" + "0" + ")";
})