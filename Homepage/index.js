const gallery = document.getElementsByClassName("gallery");
let picIndex = 1;
showPic(picIndex);

function nextPic(n) {
    showPic(picIndex += n)
}

function showPic(n) {
    let i;
    let fPic = document.getElementsByClassName("galDisplay");
    if (n > fPic.length) {
        picIndex = 1
    }
    if (n < 1) {
        picIndex = fPic.length
    }  
    for (i = 0; i < fPic.length; i++) {
        fPic[i].style.display = "none";
    }
    fPic[picIndex-1].style.display = "block";
}