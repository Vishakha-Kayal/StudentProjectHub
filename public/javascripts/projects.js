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

filters[1].addEventListener("click", () => {
    if (!dropdownScnd.classList.contains("hidden")) {
        dropdownScnd.classList.toggle("hidden");
        dropdown.classList.toggle("hidden");
    }
    else {
        dropdown.classList.toggle("hidden");
    }

})
filters[4].addEventListener("click", () => {
    if (!dropdown.classList.contains("hidden")) {
        dropdown.classList.toggle("hidden");
        dropdownScnd.classList.toggle("hidden");
    }
    else {
        dropdownScnd.classList.toggle("hidden");
    }
})

const icon = document.querySelectorAll('.ic')
const universityname = document.querySelector('.uname')
const selectedCollege = document.querySelectorAll('.checkbox div')
const updatedUniversityNmae = document.querySelector('.updated-uni-name')
const closeicon = document.createElement('i')

selectedCollege.forEach((collegeElement) => {
    collegeElement.addEventListener('click', (event) => {
        universityname.remove();
        icon[0].remove();
        icon[1].remove();
        updatedUniversityNmae.textContent = event.currentTarget.textContent;
        updatedUniversityNmae.classList.add('uni-style')
        closeicon.innerHTML = `<i class="ri-close-circle-line"></i>`
        filters[1].append(closeicon)
        filters[1].style.backgroundColor = "#e4ebe8";
        filters[1].style.color = 'black';
        filters[1].style.border = '1px solid black';

    });
});