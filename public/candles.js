const galDisplay = document.querySelector(".gallery");
const productCards = document.querySelector(".card-container");
let picIndex = 1;

const url = "/api";

async function getApi() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const dataLength = Object.keys(data.data).length;

// Populates product areas with info from database
function createCard(cardTitle, cardDesc, cardImg, cardPrice, id) {
    let html = `<div class="card">
      <img class="cardImg" src="${cardImg}" />
      <div class="cardBot">
        <p class="cardTitle">${cardTitle}</p>
        <p class="cardDesc">${cardDesc}</p>
        <p class="cardPrice">${cardPrice}</p>
        <label class="cardQuantityLabel" for="quantity">Quantity:</label>
        <input class="cardQuantity" type="number" name="quantity" min="1" max="10" value="1">
        <button class="addCartBtn" value="${id}" onclick="addToCart(event)">Add to Cart</button>
      </div>
    </div>`;
    productCards.innerHTML += html;
  
  }
 
    for (let i = 0; i < dataLength; i++) {
        let cardTitle = data.data[i].name;
        let desc = data.data[i].description;
        let cardImg = data.data[i].image.url;
        let cardDesc = desc.replace(/(<([^>]+)>)/ig,"");
        let cardPrice = data.data[i].price.formatted_with_symbol;
        let id = data.data[i].id;
        createCard(cardTitle, cardDesc, cardImg, cardPrice, id);
    
    }
  } catch (err) {
    console.log(err);
  }
}

// get API 
getApi();

// Waits for API to be ready for display then shows page
