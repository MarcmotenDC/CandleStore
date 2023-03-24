const cartUrl = "/cart";
const cartContentUrl = "/cart/contents";
const itemCount = document.querySelector(".itemCount");

document.onload = createCart();

document.onload = itemCount.innerHTML += "(0)";

async function createCart() {
  const res = await fetch(cartUrl);
  const result = await res.json();
  console.log("cart Initialized!");
  //   document.querySelector(".addCartBtn").addEventListener("click", cartItems);
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
  console.log(totalItems);
  document.cookie = "itemsInCart=" + totalItems + ";path=/";

  console.log(result);
  return totalItems;
}
// Displays current cart 
async function openCart() {
    const openPopupBtn = document.getElementById('cartBtn');
    const popup = document.getElementsByClassName('popup');
    const closePopupBtn = document.querySelector('.close');
    
    openPopupBtn.addEventListener('click', function() {
        console.log("clicked!")
      popup.style.display = 'block';
    });
    
    closePopupBtn.addEventListener('click', function() {
      popup.style.display = 'none';
    });
    
    popup.addEventListener('click', function(event) {
      if (event.target === popup) {
        popup.style.display = 'none';
      }
    });
}

