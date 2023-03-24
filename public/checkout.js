const cartUrl = "/cart";
const cartContentUrl = "/cart/contents"

// Pulls cart for cart.html
async function showCart() {
    const res = await fetch(cartUrl);
    const result = await res.json();
    console.log(result)
    const renderedItemCount = await cartItems();
    console.log("cart event done!");
    itemCount.innerHTML = "(" + renderedItemCount + ")";
    let cartHtml = `<div class="card">
    <img class="cardImg" src="" />
    <div class="cardBot">
      <p class="cardTitle"></p>
      <p class="cardDesc"></p>
      <p class="cardPrice"></p>
      <button class="addCartBtn" value="" onclick="addToCart(event)">Add to Cart</button>
    </div>
  </div>`;
}
showCart();


