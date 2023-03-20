const gallery = document.querySelector(".gallery");
const cardTitle = document.querySelector(".cardTitle");
const cardDesc = document.querySelector(".cardDesc");
const cardImg = document.querySelector(".cardImg");
let cardTitleArr = [];
let cardDescArr = [];
let cardImgArr = [];
let picIndex = 1;
showPic(picIndex);

fetch("http://localhost:25565/api")
  .then((response) => response.json())
  .then((data) => {
    for (i = 0; i < data.length; i++) {
      cardTitleArr.push(data);
    }
    console.log(cardTitleArr);
  });

function nextPic(n) {
  showPic((picIndex += n));
};

function showPic(n) {
  let i;
  let fPic = document.getElementsByClassName("galDisplay");
  if (n > fPic.length) {
    picIndex = 1;
  }
  if (n < 1) {
    picIndex = fPic.length;
  }
  for (i = 0; i < fPic.length; i++) {
    fPic[i].style.display = "none";
  }
  fPic[picIndex - 1].style.display = "block";
}
