let imgAttribute = document.querySelectorAll(".image");
let imgdiv = document.querySelector(".actual");
let arr = Array.from(imgAttribute);

const leftBtn = document.querySelector(".left-icon");
const rightBtn = document.querySelector(".right-icon");

let i = 0;
const totalImages = arr.length; 

rightBtn.addEventListener("click", () => {
    i = (i + 1) % totalImages; 
    imgdiv.src = arr[i].getAttribute('src');
});

leftBtn.addEventListener("click", () => {
    i = (i - 1 + totalImages) % totalImages; 
    imgdiv.src = arr[i].getAttribute('src');
});


const dropdown = document.querySelector(".dropdown");
const dropdownScnd = document.querySelector(".dropdown-scnd");
const filters = document.querySelectorAll(".filters");


function toggleDropdown(dropdownToHide, dropdownToShow, filter) {
    if (!dropdownToShow.classList.contains("hidden")) {
        dropdownToShow.classList.add("hidden");
    }
    dropdownToHide.classList.toggle("hidden");
    updateFilterStyle(filter, dropdownToHide.classList.contains("hidden"));
}


function updateFilterStyle(filter, isHidden) {
    if (isHidden) {
        filter.classList.add("text-white", "bg-[#43856F]");
        filter.classList.remove("border-black");
    } else {
        filter.classList.remove("text-white", "bg-[#43856F]");
        filter.classList.add("border-black");
    }
}

filters[1].addEventListener("click", () => {
    toggleDropdown(dropdown, dropdownScnd, filters[1]);
});

filters[4].addEventListener("click", () => {
    toggleDropdown(dropdownScnd, dropdown, filters[4]);
});




