let imgAttribute = document.querySelectorAll(".image");
let imgdiv = document.querySelector(".project-im");
let arr = Array.from(imgAttribute);
leftBtn = document.querySelector(".left-icon");
rightBtn = document.querySelector(".right-icon");
// console.log(arr[0].getAttribute('src'));
// let current = 0;


let current = 0;
let i = 0;



rightBtn.addEventListener("click", () => {
    console.log(arr[0]);
    if (current == i) {
        imgdiv.src = arr[current + 1].getAttribute('src');
    }
    current++;
    i++;
})

leftBtn.addEventListener("click", () => {
    console.log(arr[0]);
    current--;
    i--;

    if (current == i) {
        imgdiv.src = arr[current].getAttribute('src');
        // console.log(current);
        // console.log(arr[current]);
    }
})
