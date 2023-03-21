const cartUrl = '/cart'

async function createCart() {
    const res = await fetch(cartUrl);
    const result = await res.json();
    console.log(result);
};

  function addToCart(event) {
    console.log(event.target.value)
  }