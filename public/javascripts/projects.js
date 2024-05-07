let imgAttribute = document.querySelectorAll(".image");
let imgdiv = document.querySelector(".actual");
let arr = Array.from(imgAttribute);

const leftBtn = document.querySelector(".left-icon");
const rightBtn = document.querySelector(".right-icon");

let i = 0;
let totalImages = arr.length;

rightBtn.addEventListener("click", () => {
  console.log(totalImages);
  i = (i + 1) % totalImages;
  imgdiv.src = arr[i].getAttribute("src");
  console.log("hello");
});

leftBtn.addEventListener("click", () => {
  console.log(totalImages);
  i = (i - 1 + totalImages) % totalImages;
  imgdiv.src = arr[i].getAttribute("src");
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

const icon = document.querySelectorAll(".ic");
const universityname = document.querySelector(".uname");
const selectedCollege = document.querySelectorAll(".dropdown div");

selectedCollege.forEach((collegeElement) => {
  collegeElement.addEventListener("click", (event) => {
    icon[0].className = "ri-check-fill text-xl pl-2 ic mt-[1rem]";
    universityname.textContent = event.currentTarget.textContent;
    // icon[0].remove();
    icon[1].className = "ri-close-circle-line pr-2 text-xl text-black closeIc ";
    filters[1].style.backgroundColor = "#e4ebe8";
    filters[1].style.color = "black";
    filters[1].style.border = "1px solid black";

    icon[1].addEventListener("click", (event) => {
      event.stopPropagation();
      icon[0].className = "ri-school-fill text-xl pl-3 ic";
      universityname.textContent = "University";
      icon[1].className = "ri-arrow-drop-down-fill text-3xl mt-1 pr-3 ic";
      filters[1].style.backgroundColor = "#43856F";
      filters[1].style.color = "white";
      filters[1].style.border = "none";
    });
  });
});

const iconSnc = document.querySelectorAll(".icons");
const category = document.querySelector(".category");
const selectedCategory = document.querySelectorAll(".dropdown-scnd div");

selectedCategory.forEach((categoryElement) => {
  categoryElement.addEventListener("click", (event) => {
    iconSnc[0].className = "ri-check-fill text-xl pl-2 ic mt-[1rem]";
    category.textContent = event.currentTarget.textContent;
    // icon[0].remove();
    iconSnc[1].className =
      "ri-close-circle-line pr-2 text-xl text-black closeIc ";
    filters[4].style.backgroundColor = "#e4ebe8";
    filters[4].style.color = "black";
    filters[4].style.border = "1px solid black";

    iconSnc[1].addEventListener("click", (event) => {
      event.stopPropagation();
      iconSnc[0].className = "ri-list-indefinite text-xl pl-3 ic";
      category.textContent = "Category";
      iconSnc[1].className = "ri-arrow-drop-down-fill text-3xl mt-1 pr-3 ic";
      filters[4].style.backgroundColor = "#43856F";
      filters[4].style.color = "white";
      filters[4].style.border = "none";
    });
  });
});
document.querySelector(".clearfilters").addEventListener("click", () => {
  window.location.reload();
});

var currentUrl = window.location.href;

var navLinks = document.querySelectorAll(".navlinks");
navLinks.forEach(function (link) {
  if (link.href === currentUrl) {
    link.classList.add("text-[#43856F]");
  }
});

displayProjectInfo = async () => {
  let sidebar = document.querySelectorAll(".sidebar");
  let projectTitleHeading = document.querySelector(".projectTitle");
  let universityLogoHeading = document.querySelector(".universityLogo");
  let universityNameHeading = document.querySelector(".universityName");
  let projectCategoryHeading = document.querySelector(".projectCategory");
  let projectImagesHeading = document.querySelector(".projectImages");
  let projectDescriptionHeading = document.querySelector(".projectDescription");
  let studentDetailsHeading = document.querySelector(".studentDetails");
  let projectDetails = document.querySelector(".projectDetails");
  let uploadProjectSteps = document.querySelector(".uploadProjectSteps");
  let commentBtn = document.querySelector(".commentbtn");
  let commentinp = document.querySelector(".commentinp");
  let rightDiv = document.querySelector(".right");
  let responseData;
  try {
    let response = await fetch("/projectData");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    await response.json().then((data) => {
      responseData = data;
      //   console.log(data[0].projectTitle);
    });
  } catch (error) {
    console.error(
      "There was a problem with the fetch operation:",
      error.message
    );
  }
  sidebar.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      projectDetails.classList.remove("hidden");
      uploadProjectSteps.classList.add("hidden");
      title = elem.getAttribute("data-index");
      responseData.forEach((project) => {
        if (project.projectTitle == title) {
          projectTitleHeading.textContent = project.projectTitle;
          universityNameHeading.textContent = project.universityName;
          universityLogoHeading.src = `/uploads/${project.universityLogo}`;
          projectCategoryHeading.textContent = project.projectCategory;
          projectDescriptionHeading.textContent = project.projectDescription;

          //    // Populate project images
          //    let img = "";
          //    let image = "";
          //    project['projectImages'].forEach(function (elem, i) {

          //        img = `<img src="temp/${elem[0]}"
          //                    alt="" class="actual m-auto h-full  rounded-md">`
          //        image += `<img src="temp/${elem[i]}"
          //                     alt="" class="imm image">`

          //        img += image
          //    })
          //    projectImagesHeading.innerHTML = img;
          //    imgAttribute = document.querySelectorAll(".image");
          //    imgdiv = document.querySelector(".actual");
          //    arr = Array.from(imgAttribute);
          //    i = 0
          //    totalImages = arr.length;

          //Populatestudent details.
          let studentDetails = "";
          project["student"].forEach((student) => {
            // console.log(student.studentName);
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
          commentBtn.addEventListener("submit", async function (e) {
            e.preventDefault();
            const form = new FormData(e.target);
            // console.log("bodydata",e.target);

            const formData = Object.fromEntries(form.entries());
            formData.projectId = project._id;
            // console.log("formObj",formData)
            try {
              const response = await fetch("/comments", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              });
              const data = await response.json();
              //   console.log(data);
            } catch (e) {}
            showReviews(project);
            commentinp.value = "";
          });
          showReviews(project);
        }
      });
    });
  });
};
displayProjectInfo();
async function showReviews(project) {
  let reviewData;
  let commentsContainer = document.querySelector(".commentsContainer");
  let commentTime = "";

  await fetch("/comments")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      reviewData = data;
      // console.log("data",data);
    });
  let allComments = "";
  reviewData.forEach((reviewOfEachUser) => {
    if (reviewOfEachUser.receiverDetail._id == project._id) {
      console.log("REVIEW", reviewOfEachUser.receiverDetail._id);
      //   console.log(reviewOfEachUser.timestamp);

      var currentDate = new Date();
      var compareDate = new Date(`${reviewOfEachUser.timestamp}`);
      var differenceInMilliseconds = currentDate - compareDate;
      var differenceInDays = Math.floor(
        differenceInMilliseconds / (1000 * 60 * 60 * 24)
      );
      var differenceInMonths =
        (currentDate.getFullYear() - compareDate.getFullYear()) * 12;
      differenceInMonths -= compareDate.getMonth();
      differenceInMonths += currentDate.getMonth();
      if (differenceInDays > 0) {
        if (differenceInDays == 1) {
          commentTime = `${differenceInDays} day ago`;
        } else {
          commentTime = `${differenceInDays} days ago`;
        }
      } else if (differenceInMonths > 0) {
        commentTime = `${Math.abs(differenceInMonths)} months ago`;
      } else {
        commentTime = "Today";
      }
      allComments += `<div class="w-full h-[8vh] mt-4">
        <div class="w-full flex gap-2">
        <div class="w-12 h-12 rounded-full bg-[#43856F]">
               <img src="${reviewOfEachUser.senderName.avatar}" class="w-full h-full" alt="">
           </div>
           <div class="w-full h-full flex flex-col ">
           <div class="flex gap-2"><h1 class="text-sm ">@${reviewOfEachUser.senderName.username}</h1>
           <h1 class="ml-2 opacity-50 text-sm">${commentTime}</h1></div>
           <div>
           <h1>${reviewOfEachUser.reviewContent}</h1>
                   </div>
                   </div>
       </div>
   </div>`;
      console.log(allComments);
    }
    commentsContainer.innerHTML = allComments;
  });
}

// let project;
// let sidebar = document.querySelectorAll(".sidebar")
// let projectTitleHeading = document.querySelector(".projectTitle")
// let universityLogoHeading = document.querySelector(".universityLogo")
// let universityNameHeading = document.querySelector(".universityName")
// let projectCategoryHeading = document.querySelector(".projectCategory")
// let projectImagesHeading = document.querySelector(".projectImages")
// let projectDescriptionHeading = document.querySelector(".projectDescription")
// let studentDetailsHeading = document.querySelector(".studentDetails")
// let rightDiv = document.querySelector(".right")
// sidebar.forEach((e, i) => {
//     e.addEventListener("click", async () => {
//         let data = await JSON.parse(e.getAttribute('data-index'));
//         console.log(data);
//         projectTitleHeading.innerHTML = data.projectTitle;
//         universityLogoHeading.src = `uploads/${data.universityLogo}`
//         universityNameHeading.innerHTML = data.universityName;
//         projectCategoryHeading.innerHTML = data.projectCategory;
//         projectDescriptionHeading.innerHTML = data.projectDescription
//         let img = "";
//         let image = "";
//         data.projectImages.forEach(function (e, i) {
//             console.log(data.projectImages[i]);
//             img = `<img src="uploads/${data.projectImages[0]}"
//                             alt="" class="actual m-auto h-full  rounded-md">`
//             image += `<img src="uploads/${data.projectImages[i]}"
//                              alt="" class="imm image">`
//             img += image
//         })
//         console.log(img);
//         projectImagesHeading.innerHTML = img;
//         imgAttribute = document.querySelectorAll(".image");
//         imgdiv = document.querySelector(".actual");
//         arr = Array.from(imgAttribute);
//         i = 0
//         totalImages = arr.length;

//         let studentDetails = "";

//         data.student.forEach(function (elem) {
//             studentDetails += `<div class="flex justify-between items-center w-full h-[25%]">
//                             <div
//                                 class="w-[45%] h-full text-center text-xl border-2 capitalize border-black flex justify-center items-center">
//                                 <h1>${elem.studentName}</h1>
//                             </div>
//                             <div
//                                 class="w-[27.5%] h-full text-center text-xl border-2 capitalize border-black flex justify-center items-center">
//                                 <h1>${elem.studentStream}</h1>
//                             </div>
//                             <div
//                                 class="w-[27.5%] h-full text-center text-xl border-2 capitalize border-black flex justify-center items-center">
//                                 <h1>${elem.yearOfQualification}</h1>
//                             </div>
//                         </div>`
//         })
//         studentDetailsHeading.innerHTML = studentDetails;

//         let commentBtn = document.querySelector(".commentbtn")

//         commentBtn.addEventListener("submit", async (e) => {
//             e.preventDefault();
//             const form = new FormData(e.target);
//             const formData = Object.fromEntries(form.entries());

//             formData.projectId = data._id;
//             console.log(formData)
//             try {
//                 const response = await fetch("/comments", {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(formData)
//                 });
//                 const data = await response.json();
//                 console.log(data);
//             }
//             catch (e) {

//             }
//         })
//     }
//     )
// }
// )
