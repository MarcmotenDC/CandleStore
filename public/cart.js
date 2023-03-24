const cartUrl = "/cart";
const cartContentUrl = "/cart/contents";
const itemCount = document.querySelector(".itemCount");

document.onload = createCart();

document.onload = itemCount.innerHTML += "(0)";

async function createCart() {
  const res = await fetch(cartUrl);
  const result = await res.json();
  console.log("cart Initialized!");
  //Loads content on page AFTER the data is ready to display
  loadContent();

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
  document.cookie = "itemsInCart=" + totalItems + ";path=/";

  return totalItems;
}
// Displays current cart
const openPopupBtn = document.getElementById("cartBtn");
const popup = document.querySelector(".popup");
const closePopupBtn = document.querySelector(".close");

openPopupBtn.addEventListener("click", function () {
  console.log("clicked!");
  popup.style.display = "block";
});

closePopupBtn.addEventListener("click", function () {
  popup.style.display = "none";
});

popup.addEventListener("click", function (event) {
  if (event.target === popup) {
    popup.style.display = "none";
  }
});

function loadContent() {
  const pageContent = document.querySelector(".pageContent");
  const loadingPlaceholder = document.querySelector(".loadingPlaceholder");
  loadingPlaceholder.style.display = "none";
  pageContent.style.display = "block";
}
