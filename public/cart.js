const cartUrl = "/cart";
const cartContentUrl = "/cart/contents"
const itemCount = document.querySelector(".itemCount");

document.onload = createCart();

document.onload = itemCount.innerHTML += "(0)";

async function createCart() {
  const res = await fetch(cartUrl);
  const result = await res.json();
  console.log("cart Initialized!")
//   document.querySelector(".addCartBtn").addEventListener("click", cartItems);
}


async function addToCart(event) {
    console.log("cart event")
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
    })
    const renderedItemCount = await cartItems()
    console.log("cart event done!")
    itemCount.innerHTML = "(" + renderedItemCount + ")";
  } catch (err) {
    console.log(err);
  }
}
// awaits fetching cart content then runs through quantity of items in cart
//! Figure out bug with items not being accounted for
async function cartItems() {
    const res = await fetch(cartContentUrl);
    const result = await res.json();
    let totalItems = 0;
    let i = 0;
   result.forEach(item => {
    return totalItems + item
   });
    console.log(totalItems)
 
    console.log("accounting for items")
  return totalItems
}

