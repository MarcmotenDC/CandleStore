const galDisplay = document.querySelector(".gallery");
const productCards = document.querySelector(".card-container");
let cardTitleArr = [];
let cardDescArr = [];
let cardImgArr = [];
let cardPriceArr = [];
let picIndex = 1;

const url = "/api";
async function getApi() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const dataLength = Object.keys(data.data).length;

        
function createCard(cardTitle, cardDesc, cardImg, cardPrice) {
    let html = `<div class="card">
      <img class="cardImg" src="${cardImg}" />
      <div class="cardBot">
        <p class="cardTitle">${cardTitle}</p>
        <p class="cardDesc">${cardDesc}</p>
        <p class="cardPrice">${cardPrice}</p>
        <button class="addCartBtn">Add to Cart</button>
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
        console.log(cardDesc)
        createCard(cardTitle, cardDesc, cardImg, cardPrice);
    //   cardTitleArr.push(data.data[i].name);
    //   cardDescArr.push(data.data[i].description);
    //   cardImgArr.push(data.data[i].image.url);
    //   cardPriceArr.push(data.data[i].price);
    
    }
function createGal(cardTitle, cardImg, cardPrice) {
    let galHtml = `<div class="galDisplay">
    <fpic class="fPic">
      <img class="fPicImg" src="${cardImg}" />
      <h2 class="fPicTitle">${cardTitle}</h2>
      <h2 class="fPicCost">${cardPrice}<h2>
      <button class="addCartBtn">Add to Cart</button>
    </fpic>
    <a class="prev" onclick="nextPic(-1)" style="left: 0">&#10094;</a>
    <a class="next" onclick="nextPic(1)">&#10095;</a>
  </div>`
    galDisplay.innerHTML += galHtml;
}


for (let i = 0; i < 3; i++) {
    let cardTitle = data.data[i].name;
    let cardImg = data.data[i].image.url;
    let cardPrice = data.data[i].price.formatted_with_symbol;

    createGal(cardTitle, cardImg, cardPrice)
}
showPic(picIndex);
  } catch (err) {
    console.log(err);
  }
}


getApi();
function nextPic(n) {
  showPic((picIndex += n));
}

function showPic(n) {
    let fPic = document.getElementsByClassName("galDisplay");
  if (n > fPic.length) {
    picIndex = 1;
  }
  if (n < 1) {
    picIndex = fPic.length;
  }
  for (let i = 0; i < fPic.length; i++) {
    fPic[i].style.display = "none";
  }
  fPic[picIndex - 1].style.display = "block";
}

