let select = document.querySelector('select');
select.addEventListener("change", function () {
    if (this.value === "") {
        this.classList.add("placeholder");
    } else {
        this.classList.remove("placeholder");
    }
});



// Listen for changes to the file input to handle file selection
const form = document.querySelector('form')
const inputDiv = document.querySelector('#projectImages')
const imagesdiv = document.querySelector('.images-form')

const uploadIcon = document.querySelector('.projectImage')
uploadIcon.addEventListener('click', function () {
inputDiv.click();
});

function uploadProjectImages(){
    inputDiv.addEventListener('change', function () {
        const images = inputDiv.files;
       // Now this should log the selected files
        Array.from(images).forEach(image => {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(image);
            img.classList.add('style-img')
            imagesdiv.classList.remove('hidden')
            // imagesdiv.classList.add('style-img')
            imagesdiv.appendChild(img);
            // Optionally, revoke the object URL after the image has loaded to free memory
            img.onload = () => URL.revokeObjectURL(img.src);
        });
    });
}

const univerisityInputDiv = document.querySelector('.universityLogo')

const uploadlogo = document.getElementsByClassName('ic')
uploadlogo[0].addEventListener('click', function () {
    univerisityInputDiv.click();
});

function uploaduniversityLogo() {
    univerisityInputDiv.addEventListener("change",()=>{
        const uniLogo = univerisityInputDiv.files;
        let thisDiv = '';
        Array.from(uniLogo).forEach(file => {
            thisDiv += `<img src=${URL.createObjectURL(file)} alt="" class="w-full h-full contain"></img>`;
        });
        let unilogoDiv = document.querySelector('.uni-logo');
        unilogoDiv.innerHTML = thisDiv;
        console.log(unilogoDiv);
    })

}

function showLimit(){
    const universityName = document.querySelector(".universityName")
const limit = document.querySelector(".limit")

universityName.addEventListener("click", () => {
    limit.classList.remove('hidden')
})
}

function uniInfo(){
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

function projectInfo(){
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

let studentCount=3;
function addField(){
const another=document.querySelector(".another")
another.addEventListener("click", () => {
        const studentInfo=document.querySelector(".studentInfo")
        let field=`<div class="w-full mt-2">
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
})};



function storeFormData(){
    const uniInfoUp = document.querySelector(".uniInfoUp")
    const uniInfoDown = document.querySelector(".uniInfoDown")
const uniDets = document.querySelector(".uniDets")
    const form1=document.querySelector(".form1")
    const form2=document.querySelector(".form2")
    form1.addEventListener("submit",async(e)=>{
        e.preventDefault();
        uniDets.classList.remove('hidden')
        uniInfoDown.classList.add("hidden")    
        uniInfoUp.classList.remove("hidden")

        if (!uniDets.classList.contains('hidden')) {
            window.scrollTo(0, document.body.scrollHeight);
        }    

          form2.addEventListener("submit",async(event)=>{
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
        window.location.href="/projectUploaded"
        // Redirect or handle response as needed
    } catch (error) {
        console.error("Error:", error);
    }


}
          )})}

function sizeLimitProjectImages(){
    let projectImages=document.querySelector(".projectImages")
projectImages.addEventListener("input",(e)=>{
    if (projectImages.files) {
        var maxSize = 150 * 1024; // 150 KB in bytes

        for (var i = 0; i < projectImages.files.length; i++) {
            var fileSize = projectImages.files[i].size; // in bytes
            console.log(fileSize);
            if (fileSize > maxSize) {
                alert("One or more files exceed the maximum limit of 150 KB. Please select smaller files.");
                projectImages.value = ''; 
            }
            
            
            
        }
        uploadProjectImages();
    }
})
}

function sizeLimitUniversityLogo(){
    let universityLogo=document.querySelector(".universityLogo")
    universityLogo.addEventListener("input",(e)=>{
    if (universityLogo.files) {
        var maxSize = 100 * 1024; // 150 KB in bytes

        for (var i = 0; i < universityLogo.files.length; i++) {
            var fileSize = universityLogo.files[i].size; // in bytes
            console.log(fileSize);
            if (fileSize > maxSize) {
                alert("One or more files exceed the maximum limit of 100 KB. Please select smaller files.");
                projectImages.value = ''; 
            }                                
        }
        uploaduniversityLogo();
    }
})
}


showLimit()
uniInfo()
projectInfo()
addField()
storeFormData();
sizeLimitProjectImages();
sizeLimitUniversityLogo()