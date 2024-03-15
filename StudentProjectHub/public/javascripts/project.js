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

const icon = document.querySelectorAll('.ic')
const universityname = document.querySelector('.uname')
const selectedCollege = document.querySelectorAll('.dropdown div')


selectedCollege.forEach((collegeElement) => {
    collegeElement.addEventListener('click', (event) => {
        icon[0].className = 'ri-check-fill text-xl pl-2 ic mt-[1rem]'
        universityname.textContent = event.currentTarget.textContent;
        // icon[0].remove();
        icon[1].className = 'ri-close-circle-line pr-2 text-xl text-black closeIc ';
        filters[1].style.backgroundColor = "#e4ebe8";
        filters[1].style.color = 'black';
        filters[1].style.border = '1px solid black';

        icon[1].addEventListener("click", (event) => {
            event.stopPropagation();
            icon[0].className = "ri-school-fill text-xl pl-3 ic";
            universityname.textContent = "University";
            icon[1].className = "ri-arrow-drop-down-fill text-3xl mt-1 pr-3 ic";
            filters[1].style.backgroundColor = "#43856F";
            filters[1].style.color = 'white';
            filters[1].style.border = 'none';


        });
    });
});

const iconSnc = document.querySelectorAll('.icons')
const category = document.querySelector('.category')
const selectedCategory = document.querySelectorAll('.dropdown-scnd div')

selectedCategory.forEach((categoryElement) => {
    categoryElement.addEventListener('click', (event) => {
        iconSnc[0].className = 'ri-check-fill text-xl pl-2 ic mt-[1rem]'
        category.textContent = event.currentTarget.textContent;
        // icon[0].remove();
        iconSnc[1].className = 'ri-close-circle-line pr-2 text-xl text-black closeIc ';
        filters[4].style.backgroundColor = "#e4ebe8";
        filters[4].style.color = 'black';
        filters[4].style.border = '1px solid black';

        iconSnc[1].addEventListener("click", (event) => {
            event.stopPropagation();
            iconSnc[0].className = "ri-list-indefinite text-xl pl-3 ic";
            category.textContent = "Category";
            iconSnc[1].className = "ri-arrow-drop-down-fill text-3xl mt-1 pr-3 ic";
            filters[4].style.backgroundColor = "#43856F";
            filters[4].style.color = 'white';
            filters[4].style.border = 'none';


        });
    });
});

