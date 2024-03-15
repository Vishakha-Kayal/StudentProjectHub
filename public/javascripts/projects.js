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

filters[1].addEventListener("click", (e) => {
    console.log(e);
    toggleDropdown(dropdown, dropdownScnd, filters[1]);
});

filters[4].addEventListener("click", () => {
    toggleDropdown(dropdownScnd, dropdown, filters[4]);
});

// const icon = document.querySelectorAll('.ic')
// const selectedCollege = document.querySelectorAll('.checkbox div')
// const updatedUniversityNmae = document.querySelector('.updated-uni-name')
// const closeicon = document.createElement('i')

// selectedCollege.forEach((collegeElement) => {
//     collegeElement.addEventListener('click', (event) => {
//         icon[0].remove();
//         icon[1].remove();
//         icon[2].remove();
//         updatedUniversityNmae.textContent = event.currentTarget.textContent;
//         updatedUniversityNmae.classList.add('uni-style')
//         closeicon.innerHTML = `<i class="ri-close-circle-line text-xl px-2"></i>`
//         filters[1].append(closeicon)
//         filters[1].style.backgroundColor = "#e4ebe8";
//         filters[1].style.color = 'black';
//         filters[1].style.border = '1px solid black';
//         dropdown.addEventListener("click", () => {
//             dropdown.style.visibility = 'hidden';
//         })
//     });
// });
// const closeIcon = document.createElement('i')
// const iconCategory = document.querySelectorAll('.icc')
// const contentUpdated = document.querySelector('.updated-category')
// const dropdownListsCheckboxes = document.querySelectorAll('.checkbox-category div')

// dropdownListsCheckboxes.forEach((elem) => {
//     elem.addEventListener("click", function (event) {
//         iconCategory[0].remove();
//         iconCategory[1].remove();
//         iconCategory[2].remove();
//         contentUpdated.textContent = event.currentTarget.textContent;
//         console.log(event.currentTarget.textContent);
//         contentUpdated.classList.add('uni-style')
//         closeIcon.innerHTML = `<i class="ri-close-circle-line text-xl px-2"></i>`
//         filters[4].append(closeIcon)
//         filters[4].style.backgroundColor = "#e4ebe8";
//         filters[4].style.color = 'black';
//         filters[4].style.border = '1px solid black';
//         dropdownScnd.addEventListener("click", () => {
//             dropdownScnd.style.visibility = 'hidden';
//         })
//     })
// })


// closeIcon.addEventListener("click", () => {
//     filters[4].innerHTML = originalFiltersHTML;

// })
// document.querySelector('.clear-filters').addEventListener("click",()=>{
//     window.location.reload();
// })

const originalUniversityLists = document.querySelector('.original')
const closeicon = document.createElement('i')
const dropdownLists = document.querySelectorAll(".dropdown div");
const selectedOptiondiv = document.createElement('div')

dropdownLists.forEach((university) => {
    university.addEventListener("click", (e) => {
        selectedOptiondiv.textContent = e.currentTarget.textContent
        closeicon.innerHTML = `<i class="ri-close-circle-line text-xl px-2"></i>`
        closeicon.classList.add('closeicn')
        selectedOptiondiv.classList.add('selectedOption')
        originalUniversityLists.remove();
        filters[1].style.backgroundColor = "#e4ebe8"
        selectedOptiondiv.append(closeicon)
        filters[1].append(selectedOptiondiv)
    })
})
closeicon.addEventListener("click", () => {
    selectedOptiondiv.remove();
    filters[1].append(originalUniversityLists)
    // dropdown.style.visibility = 'hidden'
})

// const closeIcon = document.createElement('i')
// const scndDropdownLists = document.querySelectorAll(".dropdown-scnd div");
// const scndSelectedOptiondiv = document.createElement('div')

// scndDropdownLists.forEach((category)=>{
//     category.addEventListener("click",(e)=>{
//         scndSelectedOptiondiv.textContent = e.currentTarget.textContent;
//         closeIcon.innerHTML = `<i class="ri-close-circle-line text-xl px-2"></i>`
//         closeIcon.classList.add('closeicn')
//         scndSelectedOptiondiv.classList.add('selectedOption')
//         scndSelectedOptiondiv.append(closeIcon)
//    console.log(scndSelectedOptiondiv);
//    filters[4].innerHTML = scndSelectedOptiondiv
//     })
// })