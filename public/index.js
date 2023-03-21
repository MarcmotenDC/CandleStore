const gallery = document.querySelector(".gallery");
const productCards = document.querySelector(".card-container");
let cardTitleArr = [];
let cardDescArr = [];
let cardImgArr = [];
let cardPriceArr = [];
let picIndex = 1;
showPic(picIndex);

const url = "/api";
async function getApi() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const dataLength = Object.keys(data.data).length;
        
function createCard(cardTitle, cardDesc, cardImg) {
    let html = `<div class="card">
      <img class="cardImg" src="${cardImg}" />
      <div class="cardBot">
        <p class="cardTitle">${cardTitle}</p>
        <p class="cardDesc">
          Something about this candle is cool you should buy it
        </p>
        <p class="cardDesc">$10</p>
        <button class="addCartBtn">Add to Cart</button>
      </div>
    </div>`;
    productCards.innerHTML += html;
  }
 
    for (let i = 0; i < dataLength; i++) {
        let cardTitle = data.data[i].name;
        let cardDesc = data.data[i].description;
        let cardImg = data.data[i].image.url;
        // let cardPrice = data.data[i].price;
        console.log(cardTitle, cardDesc, cardImg)
        createCard(cardTitle, cardDesc, cardImg);
    //   cardTitleArr.push(data.data[i].name);
    //   cardDescArr.push(data.data[i].description);
    //   cardImgArr.push(data.data[i].image.url);
    //   cardPriceArr.push(data.data[i].price);
    
    }

  } catch (err) {
    console.log(err);
  }
}


getApi();
function nextPic(n) {
  showPic((picIndex += n));
}

function showPic(n) {
  let i;
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
