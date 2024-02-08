let imgAttribute = document.querySelectorAll(".image");
let imgdiv = document.querySelector(".actual");
let arr = Array.from(imgAttribute);

leftBtn = document.querySelector(".left-icon");
rightBtn = document.querySelector(".right-icon");

let i = 0;
rightBtn.addEventListener("click", () => {
    i++;
    if (i > 3) {
        i = 0;
    }
    imgdiv.src = arr[i].getAttribute('src');
})

leftBtn.addEventListener("click", () => {
    i--;
    if (i < 0) {
        i = 3;
    }

    imgdiv.src = arr[i].getAttribute('src');
    console.log(arr[0].src);
    console.log(arr[0].src);

})
