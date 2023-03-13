const Commerce = require("@chec/commerce.js");
const itemCard = document.getElementsByClassName("card")

const commerce = new Commerce(
  "pk_test_508420f944b7aa39c411978846b67e228dfdfcc4a2d26", true
);

function getAllProducts() {
  commerce.products.list().then((result) => {
    for (let i = 0; i < result.data.length; i++) {
      console.log(result.data[i].name)
    } ;
 });
}

getAllProducts();


// const APIKey = "pk_test_508420f944b7aa39c411978846b67e228dfdfcc4a2d26";

// async function getAllProducts() {
//   let res =  await fetch('https://api.chec.io/v1/products')
//   let data = await res.json();
// } 

// getAllProducts();
