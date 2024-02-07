let imgAttribute = document.querySelectorAll(".image");
let imgdiv = document.querySelector(".project-im");
console.log(typeof (imgdiv));
console.log(Object.keys(imgdiv));
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

})




// rightBtn.addEventListener("click", () => {
//     current = (current + 1) % arr.length; // Cycle through images

//     imgdiv.src = arr[current].getAttribute('src'); // Set the src attribute of imgdiv to the next image's src
// });