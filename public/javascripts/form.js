let select = document.querySelector('select');
select.addEventListener("change", function () {
    if (this.value === "") {
        this.classList.add("placeholder");
    } else {
        this.classList.remove("placeholder");
    }
});

const uploadIcon = document.getElementsByClassName('ic')
function uploadProjectImages() {
    const inputDiv = document.querySelector('#projectImages')
    const imagesdiv = document.querySelector('.images-form')

    uploadIcon[0].addEventListener('click', function () {
        inputDiv.click();
    });

    inputDiv.addEventListener('change', function () {
        const images = inputDiv.files;
        Array.from(images).forEach(image => {
            const maxSize = 150 * 1024;

            if (image.size > maxSize) {
                alert("Error: Image size exceeds 150kb. Please choose a smaller image.");
            }
            else {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(image);
                img.classList.add('style-img')
                imagesdiv.classList.remove('hidden')
                // imagesdiv.classList.add('style-img')
                imagesdiv.appendChild(img);
                // Optionally, revoke the object URL after the image has loaded to free memory
                img.onload = () => URL.revokeObjectURL(img.src);
            }
        });
    });
}

function uploaduniversityLogo() {
    const inputDiv = document.querySelector('#universityLogo')
    uploadIcon[1].addEventListener('click', function () {
        inputDiv.click();
    });
    inputDiv.addEventListener("change", () => {
        const uniLogo = inputDiv.files;
        // console.log("uniLogo", uniLogo);
        // Iterate over each file in the array
        Array.from(uniLogo).forEach(file => {
            console.log("file", file);
            const maxSize = 100 * 1024; // 1kb in bytes
            if (file.size > maxSize) {
                alert("Error: Image size exceeds 150kb. Please choose a smaller image.");
            } else {
                let thisDiv = '';
                thisDiv += `<img src=${URL.createObjectURL(file)} alt="" class="w-full h-full contain"></img>`;

                let unilogoDiv = document.querySelector('.uni-logo');
                unilogoDiv.innerHTML = thisDiv;
            }
        });
    });
}

function showLimit() {
    const universityName = document.querySelector(".universityName")
    const limit = document.querySelector(".limit")

    universityName.addEventListener("click", () => {
        limit.classList.remove('hidden')
    })
}

function uniInfo() {
    const uniInfoUp = document.querySelector(".uniInfoUp")
    const uniInfoDown = document.querySelector(".uniInfoDown")
    const uniDets = document.querySelector(".uniDets")

    uniInfoUp.addEventListener("click", () => {
        uniDets.classList.toggle('hidden')
        uniInfoUp.classList.add("hidden")
        uniInfoDown.classList.remove("hidden")

    })

    uniInfoDown.addEventListener("click", () => {
        uniDets.classList.toggle('hidden')
        uniInfoUp.classList.remove("hidden")
        uniInfoDown.classList.add("hidden")

        if (!uniDets.classList.contains('hidden')) {
            window.scrollTo(0, document.body.scrollHeight);
        }

    })
}

function projectInfo() {
    const projectInfoUp = document.querySelector(".projectInfoUp")
    const projectInfoDown = document.querySelector(".projectInfoDown")
    const projectDets = document.querySelector(".projectDets")

    projectInfoUp.addEventListener("click", () => {
        projectDets.classList.toggle('hidden')
        projectInfoUp.classList.add("hidden")
        projectInfoDown.classList.remove("hidden")

    })

    projectInfoDown.addEventListener("click", () => {
        projectDets.classList.toggle('hidden')
        projectInfoUp.classList.remove("hidden")
        projectInfoDown.classList.add("hidden")

    })
}

let studentCount = 3;
function addField() {

    const another = document.querySelector(".another")
    another.addEventListener("click", () => {
        const studentInfo = document.querySelector(".studentInfo")
        let field = `<div class="w-full mt-2">
            <div class="flex mt-1 gap-4">
                <div class="w-[35%]  ">
                    <input type="text" name="studentName_${studentCount}"
                        class="rounded-md px-3 py-2 mt-3 w-full  border-2  border-[#000000b9]"
                        placeholder="Student Name">
        
                </div>
                <div class="w-[35%]  ">
                    <input type="text" name="studentStream_${studentCount}" 
                        class="rounded-md px-3 py-2 mt-3 w-full  border-2  border-[#000000b9]"
                        placeholder="Student Stream">
        
                </div>
        
                <div class="w-[35%]  ">
                    <input type="number" name="yearOfQualification_${studentCount}" 
                        class="rounded-md px-3 py-2 mt-3 w-full  border-2  border-[#000000b9]"
                        placeholder="Year Of Qualification">
        
                </div>
        
            </div>
        </div>`
        studentCount++
        studentInfo.insertAdjacentHTML('beforeend', field);
    })
};

function storeFormData() {
    const uniInfoUp = document.querySelector(".uniInfoUp")
    const uniInfoDown = document.querySelector(".uniInfoDown")
    const uniDets = document.querySelector(".uniDets")
    const form1 = document.querySelector(".form1")
    const form2 = document.querySelector(".form2")
    form1.addEventListener("submit", async (e) => {
        e.preventDefault();
        uniDets.classList.remove('hidden')
        uniInfoDown.classList.add("hidden")
        uniInfoUp.classList.remove("hidden")

        if (!uniDets.classList.contains('hidden')) {
            window.scrollTo(0, document.body.scrollHeight);
        }

        form2.addEventListener("submit", async (event) => {
            event.preventDefault();
            //        
            const formData = new FormData(e.target);
            const formData2 = new FormData(form2);
            for (let entry of formData2.entries()) {
                formData.append(entry[0], entry[1]);
            }

            try {
                const response = await fetch('/submitForm', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`Server responded with a status of ${response.status}`);
                }

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Received non-JSON response from server");
                }

                const data = await response.json();
                console.log(data);
                window.location.href = "/projectUploaded"
                // Redirect or handle response as needed
            } catch (error) {
                console.error("Error:", error);
            }
        }
        )
    }
    )
}




uploadProjectImages()
uploaduniversityLogo()
showLimit()
uniInfo()
projectInfo()
addField()
storeFormData();