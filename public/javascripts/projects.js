// let imgAttribute = document.querySelectorAll(".image");
// // let imgdiv = document.querySelector(".project-im");
// let arr = Array.from(imgAttribute);
// let arr2 = arr.slice();
// leftBtn = document.querySelector(".left-icon");
// rightBtn = document.querySelector(".right-icon");

// let i = 0;
// rightBtn.addEventListener("click", () => {
//     i++;
//     if (i > 3) {
//         i = 0;
//     }
//     arr[0].src = arr2[i].getAttribute('src');
// })

// leftBtn.addEventListener("click", () => {
//     i--;
//     if (i < 0) {
//         i = 3;
//     }

//     arr[0].src = arr2[i].getAttribute('src');
//     console.log(arr[0].src);
//     console.log(arr2[0].src);

// })

let imgAttribute = document.querySelectorAll(".image");
let arr = Array.from(imgAttribute);
let arrLength = arr.length;
// console.log(1%4);
let currentIndex = 0;
let leftBtn = document.querySelector(".left-icon");
let rightBtn = document.querySelector(".right-icon");

rightBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % arrLength;
    console.log(typeof((currentIndex + 1) % arrLength));
    console.log(currentIndex);
    updateImages();
});

leftBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + arrLength) % arrLength;

    updateImages();
});

function updateImages() {
    for (let i = 0; i < arrLength; i++) {
        if (i === currentIndex) {
            arr[i].style.display = "block";
        } else {
            arr[i].style.display = "none";
        }
    }
}



// rightBtn.addEventListener("click", () => {
//     current = (current + 1) % arr.length; // Cycle through images

//     imgdiv.src = arr[current].getAttribute('src'); // Set the src attribute of imgdiv to the next image's src
// });
// console.log(Object.keys(imgdiv));