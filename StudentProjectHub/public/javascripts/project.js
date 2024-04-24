let imgAttribute = document.querySelectorAll(".image");
let imgdiv = document.querySelector(".actual");
let arr = Array.from(imgAttribute);



const leftBtn = document.querySelector(".left-icon");
const rightBtn = document.querySelector(".right-icon");

let i = 0;
let totalImages = arr.length;

rightBtn.addEventListener("click", () => {
    i = (i + 1) % totalImages;
    imgdiv.src = arr[i].getAttribute('src');
    console.log("hello");
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
document.querySelector('.clearfilters').addEventListener("click", () => {
    window.location.reload();
})

var currentUrl = window.location.href;

var navLinks = document.querySelectorAll('.navlinks');
navLinks.forEach(function (link) {
    if (link.href === currentUrl) {
        link.classList.add("text-[#43856F]");
    }
});




let project;
let sidebar = document.querySelectorAll(".sidebar")
let projectTitleHeading = document.querySelector(".projectTitle")
let universityLogoHeading = document.querySelector(".universityLogo")
let universityNameHeading = document.querySelector(".universityName")
let projectCategoryHeading = document.querySelector(".projectCategory")
let projectImagesHeading = document.querySelector(".projectImages")
let projectDescriptionHeading = document.querySelector(".projectDescription")
let studentDetailsHeading = document.querySelector(".studentDetails")
let rightDiv = document.querySelector(".right")
let title = ""

let currentElemId = "";
sidebar.forEach((e, i) => {
    e.addEventListener("click", async () => {
        title = e.getAttribute('data-index')
        await fetch('/projectData')
            .then(response => response.json())
            .then(data => {
                data.forEach((elem) => {
                    if (elem.projectTitle == title) {
                        currentElemId = elem._id;
                        projectTitleHeading.innerHTML = elem.projectTitle;
                        universityLogoHeading.src = `temp/${elem.universityLogo}`;
                        universityNameHeading.innerHTML = elem.universityName;
                        projectCategoryHeading.innerText = elem.projectCategory;
                        projectDescriptionHeading.innerHTML = elem.projectDescription;

                        // Populate project images
                        let img = "";
                        let image = "";
                        elem.projectImages.forEach(function (e, i) {

                            img = `<img src="temp/${elem.projectImages[0]}"
                                        alt="" class="actual m-auto h-full  rounded-md">`
                            image += `<img src="temp/${elem.projectImages[i]}"
                                         alt="" class="imm image">`

                            img += image
                        })
                        projectImagesHeading.innerHTML = img;
                        imgAttribute = document.querySelectorAll(".image");
                        imgdiv = document.querySelector(".actual");
                        arr = Array.from(imgAttribute);
                        i = 0
                        totalImages = arr.length;
                        // Populate student details
                        let studentDetails = "";
                        elem.student.forEach(student => {
                            studentDetails += `<div class="flex justify-between items-center w-full h-[25%]">
                            <div class="w-[45%] h-full text-center text-xl border-2 capitalize border-black flex justify-center items-center">
                                <h1>${student.studentName}</h1>
                            </div>
                            <div class="w-[27.5%] h-full text-center text-xl border-2 capitalize border-black flex justify-center items-center">
                                <h1>${student.studentStream}</h1>
                            </div>
                            <div class="w-[27.5%] h-full text-center text-xl border-2 capitalize border-black flex justify-center items-center">
                                <h1>${student.yearOfQualification}</h1>
                            </div>
                        </div>`;
                        });
                        studentDetailsHeading.innerHTML = studentDetails;


                    }
                })


            })
            .catch(error => {
                console.error('Error fetching project data:', error);
            });
    });
});



 function comments(data) {
    let commentsDiv = document.querySelector(".comments")
    console.log(data);
    let comments = "";
    console.log(title);
    data.forEach(function (elem, i) {
        if (title == elem.receiverDetail.projectTitle) {
            comments += `  <div class="w-full h-[8vh]  mt-4 ">
            <div class="w-full   flex">
            <div class="w-12 h-12 rounded-full bg-[#43856F]">
                   <img src="${elem.senderName.avatar}" class="w-full h-full" alt="">
               </div>
               <div class="w-full h-full flex flex-col ml-2">
               <div class="flex"><h1 class="text-sm ">@${elem.senderName.username}</h1>
               <h1 class="ml-2 opacity-50 text-sm">2 months ago</h1></div>
               <div>
               <h1>${elem.reviewContent}</h1>
                       </div>
                       </div>
           </div>
       </div>`
        }
        commentsDiv.innerHTML = comments
    })

}
const commentBtn = document.querySelector(".commentbtn");
const comment = document.querySelector(".comment");

console.log(currentElemId);
commentBtn.addEventListener("submit", async (e) => {
    console.log(currentElemId);
    e.preventDefault();
    // Disable the submit button to prevent multiple submissions
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    formData.projectId = currentElemId;

    try {
        const response = await fetch("/comments", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
            .then(data => {
                comments(data)

            });
        comment.value = "";
        // Assuming this function is defined elsewhere
    } catch (e) {
        console.error(e);
    } finally {
        commentBtn.disabled = false; // Re-enable the submit button after submission
    }
});




sidebar.forEach((e, i) => {
    e.addEventListener("click", async () => {
        await fetch('/reviewData')
            .then(response => response.json())
            .then(data => {
                // Use the project data in your JavaScript code
                comments(data)
                console.log(data);

            })
            .catch(error => {
                console.error('Error fetching review data:', error);
            });
    }
    )
})

let commentsDiv = document.querySelector(".comment")
commentsDiv.addEventListener("click", async () => {
   let loggedIn=commentsDiv.getAttribute("data-index");
   console.log(loggedIn);
   if (loggedIn === "" || loggedIn === "false") {
    window.location.href = "/signup";
}
})





