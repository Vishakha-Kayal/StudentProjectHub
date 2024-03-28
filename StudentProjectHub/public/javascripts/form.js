let select = document.querySelector('select');
select.addEventListener("change", function () {
    if (this.value === "") {
        this.classList.add("placeholder");
    } else {
        this.classList.remove("placeholder");
    }
});

const form = document.querySelector('form')
const inputDiv = document.querySelector('#projectImages')
const imagesdiv = document.querySelector('.images')

const uploadIcon = document.getElementsByClassName('ic')
uploadIcon[0].addEventListener('click', function () {
    inputDiv.click();
});

// Listen for changes to the file input to handle file selection
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

function addField(){
    const another=document.querySelector(".another")
    const studentInfo=document.querySelector(".studentInfo")
    let field=`<div class="w-full mt-2">
    <div class="flex mt-1 gap-4">
        <div class="w-[35%]  ">
            <input type="text"
                class="rounded-md px-3 py-2 mt-3 w-full  border-2  border-[#000000b9]"
                placeholder="Student Name">

        </div>
        <div class="w-[35%]  ">
            <input type="text"
                class="rounded-md px-3 py-2 mt-3 w-full  border-2  border-[#000000b9]"
                placeholder="Student Stream">

        </div>

        <div class="w-[35%]  ">
            <input type="number"
                class="rounded-md px-3 py-2 mt-3 w-full  border-2  border-[#000000b9]"
                placeholder="Year Of Qualification">

        </div>

    </div>
</div>`

another.addEventListener("click", () => {
    studentInfo.insertAdjacentHTML('beforeend', field);
});

}

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


        const formData = new FormData(e.target);
        
        const combinedFormData = {};

        for (let entry of formData.entries()) {

            combinedFormData[entry[0]] = entry[1];
          }
        
          form2.addEventListener("submit",async(event)=>{
            // event.preventDefault();
            const formData2 = new FormData(form2);

            for (let entry of formData2.entries()) {
                if (combinedFormData.hasOwnProperty(entry[0])) {
                    if (!Array.isArray(combinedFormData[entry[0]])) {
                        combinedFormData[entry[0]] = [combinedFormData[entry[0]]];
                    }
                    combinedFormData[entry[0]].push(entry[1]);
                } else {
                    combinedFormData[entry[0]] = entry[1];
                }
            }
           
            try {
              const response = await fetch('/submitForm', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(combinedFormData)
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
          } catch (error) {
              console.error("Error:", error);
          }
          })

    })


}


showLimit()
uniInfo()
projectInfo()
addField()
storeFormData();