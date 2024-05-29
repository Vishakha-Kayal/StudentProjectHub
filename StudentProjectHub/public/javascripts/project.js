const sidebarContainer = document.querySelector('.sidebarContainer')
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
const dropdownSearch = document.querySelector(".dropdown-search");
const searchFilterinput = document.querySelector(".searchFilterinput");
const filters = document.querySelectorAll(".filters");


function toggleDropdown(dropdownToShow, filter) {
    // Check if the dropdown to show is already visible
    const isAlreadyVisible = !dropdownToShow.classList.contains("hidden");

    // Hide all dropdowns first
    [dropdown, dropdownScnd, dropdownSearch].forEach(d => {
        d.classList.add("hidden");
    });

    // Toggle the specific dropdown based on its previous state
    if (!isAlreadyVisible) {
        dropdownToShow.classList.remove("hidden");
        updateFilterStyle(filter, false); // Since we are showing the dropdown, isHidden should be false
    } else {
        updateFilterStyle(filter, true); // Since we are hiding the dropdown, isHidden should be true
    }
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

// function updateFilterVisibility() {
//     if (!dropdownSearch.classList.contains("hidden")){
//         searchFilterinput.classList.add("text-black","bg-[#e4ebe8]");
//         searchFilterinput.classList.add("placeholder-gray");
//         searchFilterinput.classList.remove("placeholder-white");
        
//     } else {
//         searchFilterinput.classList.remove("text-black", "bg-[#e4ebe8]");
//         searchFilterinput.classList.remove("placeholder-gray");
//         searchFilterinput.classList.add("placeholder-white");
//     }
// }

filters[1].addEventListener("click", () => {
    toggleDropdown(dropdown,  filters[1]);
});

searchFilterinput.addEventListener("click", () => {
    if (dropdownSearch.classList.contains("hidden")) {
        searchFilterinput.focus();
    } else {
        searchFilterinput.blur(); 
    }
});

const searchIcon=document.querySelector(".search-icon")
filters[2].addEventListener("click", () => {
    searchIcon.className=""
    toggleDropdown(dropdownSearch, filters[2]);
});


filters[4].addEventListener("click", () => {
    toggleDropdown(dropdownScnd,  filters[4]);
});

let sidebarValues = [];

function populateSidebarValues() {
    sidebarValues = [];
    Array.from(sidebarContainer.children).forEach((element) => {
        let value = element.getAttribute("data-index");
        if (value && !sidebarValues.includes(value)) {
            sidebarValues.push(value);
        }
    });
}

let searchValues="";
searchFilterinput.addEventListener("input",()=>{
    populateSidebarValues();
    dropdownSearch.innerHTML=""
    searchValues=""
    sidebarValues.forEach((elem)=>{
        let projectTitle=elem.toLowerCase()
        let filteredProject=projectTitle.startsWith(`${searchFilterinput.value}`)
       
        if(filteredProject==true){
            searchValues+=`
            <div class="w-full py-2 border-b-2 text-white px-2">
                <h5 class="text-sm ">${elem}</h5>
            </div>`
            dropdownSearch.innerHTML=searchValues
        }
        if(searchFilterinput.value==""){
            dropdownSearch.innerHTML=""
        }
    }
)
filteredTitle()
})

let filterProjectCategory = ""
let filterUniversityName = "";
let filterTitleName = "";

function filteredUniversity(){
    const icon = document.querySelectorAll('.ic')
const universityname = document.querySelector('.uname')

const selectedCollege = document.querySelectorAll('.dropdown div')

selectedCollege.forEach((collegeElement) => {
    collegeElement.addEventListener('click', (event) => {
        icon[0].className = 'ri-check-fill text-xl pl-2 ic mt-[1rem]'
        universityname.textContent = event.currentTarget.textContent;
        filterUniversityName = event.currentTarget.textContent.trim();
        changeSidebar(filterUniversityName, filterProjectCategory,filterTitleName)

        // icon[0].remove();
        icon[1].className = 'ri-close-circle-line pr-2 text-xl text-black closeIc ';
        filters[1].style.backgroundColor = "#e4ebe8";
        filters[1].style.color = 'black';
        filters[1].style.border = '1px solid black';

        icon[1].addEventListener("click", (event) => {
            filterUniversityName = ""
            changeSidebar(filterUniversityName, filterProjectCategory,filterTitleName)
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
}
filteredUniversity();

function filteredTitle(){
    // const icon = document.querySelector('.search-icon')
    const closeIc = document.querySelector('.close-search-icon ')
    
    const selectedTitle = document.querySelectorAll('.dropdown-search div')
    
    selectedTitle.forEach((titleElement) => {
        titleElement.addEventListener('click', (event) => {
            // icon.className = 'ri-check-fill text-xl pl-2 ic mt-[1rem]'
            searchFilterinput.value = event.currentTarget.textContent.trim();
            filterTitleName = event.currentTarget.textContent.trim();
            changeSidebar(filterUniversityName, filterProjectCategory,filterTitleName)
    
            // icon[0].remove();
            closeIc.classList.remove("hidden")
            filters[2].style.backgroundColor = "#e4ebe8";
            filters[3].style.backgroundColor = "#e4ebe8";
            filters[3].style.color = 'black';
            filters[2].style.color = 'black';
            filters[2].style.border = '1px solid black';
    
            closeIc.addEventListener("click", (event) => {
                dropdownSearch.innerHTML=""
                filterTitleName = ""
                changeSidebar(filterUniversityName, filterProjectCategory,filterTitleName)
                event.stopPropagation();
                // icon.className = "ri-search-eye-line text-xl search-icon";
                searchFilterinput.value = "";
               closeIc.classList.add("hidden")
                filters[2].style.backgroundColor = "#43856F";
                filters[2].style.color = 'white';
                filters[3].style.backgroundColor = "#43856F";
                filters[3].style.color = 'white';
                filters[2].style.border = 'none';
    
    
            });
        });
    });
}


function filteredCategory(){

    const iconSnc = document.querySelectorAll('.icons')
    const category = document.querySelector('.category')
    const selectedCategory = document.querySelectorAll('.dropdown-scnd div')
    
    selectedCategory.forEach((categoryElement) => {
        categoryElement.addEventListener('click', (event) => {
            iconSnc[0].className = 'ri-check-fill text-xl pl-2 ic mt-[1rem]'
            category.textContent = event.currentTarget.textContent;
            filterProjectCategory = event.currentTarget.textContent.trim();
            changeSidebar(filterUniversityName, filterProjectCategory,filterTitleName)
            // icon[0].remove();
            iconSnc[1].className = 'ri-close-circle-line pr-2 text-xl text-black closeIc ';
            filters[4].style.backgroundColor = "#e4ebe8";
            filters[4].style.color = 'black';
            filters[4].style.border = '1px solid black';
    
            iconSnc[1].addEventListener("click", (event) => {
                filterProjectCategory = ""
                changeSidebar(filterUniversityName, filterProjectCategory,filterTitleName);
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
}

filteredCategory()


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





let sidebar = document.querySelectorAll(".sidebar")
let projectTitleHeading = document.querySelector(".projectTitle")
let universityLogoHeading = document.querySelector(".universityLogo")
let universityNameHeading = document.querySelector(".universityName")
let projectCategoryHeading = document.querySelector(".projectCategory")
let projectImagesHeading = document.querySelector(".projectImages")
let projectDescriptionHeading = document.querySelector(".projectDescription")
let studentDetailsHeading = document.querySelector(".studentDetails")
let uploadProjectSteps = document.querySelector(".uploadProjectSteps")
let projectDetails = document.querySelector(".projectDetails")
let right = document.querySelector(".right")
let collabButton = document.querySelector(".collab-btn")
let title = ""

let currentElemId = "";
function showProjectDetails() {
    showComments()
    document.querySelectorAll(".sidebar").forEach((e, i) => {
        e.addEventListener("click", async () => {
            projectDetails.classList.remove('hidden')
            uploadProjectSteps.classList.add('hidden')
            right.scrollTop = 0
            document.querySelectorAll(".sidebar").forEach((el) => {
                el.classList.remove("bg-[#bedcce]");
            });
            e.classList.add("bg-[#bedcce]")
            title = e.getAttribute('data-index')
            await fetch('/projectData')
                .then(response => response.json())
                .then(data => {
                    data.project.forEach((elem) => {
                        if (elem.projectTitle == title) {
                            currentElemId = elem._id;
                            projectTitleHeading.innerHTML = elem.projectTitle;
                            universityLogoHeading.src = `temp/${elem.universityLogo}`;
                            universityNameHeading.innerHTML = elem.universityName;
                            projectCategoryHeading.innerText = elem.projectCategory;
                            projectDescriptionHeading.innerHTML = elem.projectDescription;

                            collabButton.innerHTML=`<i class="ri-shake-hands-line"></i>
                            Collaborate`
                           elem.collaborations.forEach((element)=>{
                            if(data.user!=null){
                                if(element.collabReqSend == data.user._id){
                                   collabButton.innerHTML=`Request Send`
                                }
                                else{
                                    collabButton.innerHTML=`<i class="ri-shake-hands-line"></i>
                                    Collaborate`
                                }
                            }
                            else{
                                collabButton.innerHTML=`<i class="ri-shake-hands-line"></i>
                                Collaborate`
                            }
                           
                           })
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
}

showProjectDetails()

function comments(data) {
    let commentsDiv = document.querySelector(".comments")
    let totalCommentsDiv = document.querySelector(".totalComments")
    let comments = "";
    let commentTime = "";
    let totalComments = 0;
    data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    data.forEach(function (elem, i) {
        if (title == elem.receiverDetail.projectTitle) {
            var currentDate = new Date();
            var compareDate = new Date(`${elem.timestamp}`);
            var differenceInMilliseconds = currentDate - compareDate;
            var differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
            var differenceInMonths = (currentDate.getFullYear() - compareDate.getFullYear()) * 12;
            differenceInMonths -= compareDate.getMonth();
            differenceInMonths += currentDate.getMonth();
            if (differenceInDays > 0) {
                if (differenceInDays == 1) {
                    commentTime = `${differenceInDays} day ago`
                }
                else {
                    commentTime = `${differenceInDays} days ago`
                }
            } else if (differenceInMonths > 0) {
                commentTime = `${Math.abs(differenceInMonths)} months ago`;
            } else {
                commentTime = "Today"
            }
            totalComments++

            comments += `<div class="w-full h-[8vh] mt-4">
            <div class="w-full flex gap-2">
            <div class="w-12 h-12 rounded-full bg-[#43856F]">
                   <img src="${elem.senderName.avatar}" class="w-full h-full" alt="">
               </div>
               <div class="w-full h-full flex flex-col ">
               <div class="flex gap-2"><h1 class="text-sm ">@${elem.senderName.username}</h1>
               <h1 class="ml-2 opacity-50 text-sm">${commentTime}</h1></div>
               <div>
               <h1>${elem.reviewContent}</h1>
                       </div>
                       </div>
           </div>
       </div>`
        }
        commentsDiv.innerHTML = comments

        totalCommentsDiv.innerHTML = totalComments
    })

}
const commentBtn = document.querySelector(".commentbtn");
const comment = document.querySelector(".comment");

commentBtn.addEventListener("submit", async (e) => {
    e.preventDefault();

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
        right.scrollTop = right.scrollHeight;
        // Assuming this function is defined elsewhere
    } catch (e) {
        console.error(e);
    } finally {
        commentBtn.disabled = false; // Re-enable the submit button after submission
    }
});



function showComments() {
    document.querySelectorAll(".sidebar").forEach((e, i) => {
        e.addEventListener("click", async () => {
            await fetch('/reviewData')
                .then(response => response.json())
                .then(data => {
                    comments(data)

                })
                .catch(error => {
                    console.error('Error fetching review data:', error);
                });
        }
        )
    })
}

function checkLoggedIn() {
    let commentsDiv = document.querySelector(".comment")
    commentsDiv.addEventListener("click", async () => {
        let loggedIn = commentsDiv.getAttribute("data-index");
        if (loggedIn === "" || loggedIn === "false") {
            window.location.href = "/signup";
        }
    })
}
checkLoggedIn()


async function changeSidebar(universityName,category,title) {
    let universityNameByFilters = "";
    try {
        const response = await fetch('/projectData');
        const data = await response.json();

        const normalizeString = (str) => str.trim().replace(/\s+/g, ' ').toLowerCase();
        const formattedUniversityName = normalizeString(universityName);
        const formattedCategory = normalizeString(category);
        const formattedTitle = normalizeString(title);

        data.project.forEach((elem) => {
            const elemUniversityName = normalizeString(elem.universityName);
            const elemCategory = normalizeString(elem.projectCategory);
            const elemTitle = normalizeString(elem.projectTitle);

            const matchesUniversity = formattedUniversityName === elemUniversityName || formattedUniversityName === "";
            const matchesCategory = formattedCategory === elemCategory || formattedCategory === "";
            const matchesTitle = formattedTitle === elemTitle || formattedTitle === "";

            if (matchesUniversity && matchesCategory && matchesTitle) {
                universityNameByFilters += `<div class="w-full max-h-32 rounded-l-lg hover:bg-[#b7d6c97c]  p-2 sidebar" data-index="${elem.projectTitle}">
                    <div class="fir flex w-full h-full gap-7 cursor-pointer point-cursor">
                        <div class="lef w-[3.6vw] h-[3.6vw] rounded-full overflow-hidden mt-2">
                            <img class="w-32 h-10 object-cover" src="/temp/${elem.universityLogo}" alt="">
                        </div>
                        <div class="rig w-[90%] h-full">
                            <h1 class="text-xl font-semibold max-h-[4.5rem] uppercase">${elem.projectTitle}</h1>
                            <h3 class="text-lg text-zinc-500">${elem.universityName}</h3>
                            <h3 class="text-md text-zinc-500 capitalize">${elem.projectCategory}</h3>
                        </div>
                    </div>
                </div>`;
            }
        });

        sidebarContainer.innerHTML = universityNameByFilters;
        showProjectDetails();
    } catch (error) {
        console.error('Error fetching project data:', error);
    }
}



let collabBtn= document.querySelector(".collab-btn")
let collabProjectId={};
collabBtn.addEventListener("click",async()=>{
    let loggedIn = collabBtn.getAttribute("data-index");
    let textInsideCollab=collabBtn.innerText.trim()
    if (loggedIn === "" || loggedIn === "false") {
        window.location.href = "/signup";
    }
    else{
        collabProjectId.id=currentElemId;
        if(textInsideCollab =="Collaborate"){
        try {
            const response = await fetch("/collaborate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(collabProjectId)
            }).then(response => response.json())
                .then(data => {
                   if(data.success== true){
                    collabBtn.innerText="Request Send"
                   }
    
                });
            // Assuming this function is defined elsewhere
        } catch (e) {
            console.error(e);
        }}
    }
})
document.querySelector(".main").addEventListener("contextmenu",(e)=>{
e.preventDefault();
})