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


const dropdown = document.querySelector(".dropdown");
const dropdownScnd = document.querySelector(".dropdown-scnd");
const filters = document.querySelectorAll(".filters");

filters[1].addEventListener("click",()=>{
    if(!dropdownScnd.classList.contains("hidden")){
        dropdownScnd.classList.toggle("hidden");
        dropdown.classList.toggle("hidden");
    }
   else{
    dropdown.classList.toggle("hidden");
   }
    
})
filters[4].addEventListener("click",()=>{
    if(!dropdown.classList.contains("hidden")){
        dropdown.classList.toggle("hidden");
        dropdownScnd.classList.toggle("hidden");
    }
   else{
    dropdownScnd.classList.toggle("hidden");
}})


