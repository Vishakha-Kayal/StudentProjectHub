let decline=document.querySelectorAll(".decline")
let accept=document.querySelectorAll(".accept")
let collabDiv=document.querySelectorAll(".collabDiv")
let responseBtn=document.querySelectorAll(".responseBtn")

let response=""
let id=""
collabDiv.forEach((div,i)=>{
    decline[i].addEventListener("click",()=>{
        gsap.to(div,{
            x:"100%",
            duration:1,
            opacity:0,
            display:"none"
        })
        id=div.getAttribute("data-index")
        console.log(id);
        response="decline"
    
    })
    
    accept[i].addEventListener("click",()=>{
        gsap.to(div,{
            x:"100%",
            duration:1,
            opacity:0,
            display:"none"
        })
        id=div.getAttribute("data-index")
        console.log(id);
        response="accept"
    })
})

responseBtn.forEach((btn)=>{
    btn.addEventListener("click",async()=>{
        data={response,id}
        try {
            const response = await fetch("/dashboard/notification/collaborations", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(data => {
                   console.log(data)
    
                });
            // Assuming this function is defined elsewhere
        } catch (e) {
            console.error(e);
        }
    })
})
let setTimeDiv=document.querySelectorAll(".setTimeDiv")
let commentTime = "";
setTimeDiv.forEach((elem)=>{
        var currentDate = new Date();
        let time=elem.getAttribute("data-index")
        var compareDate = new Date(`${time}`);
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
        elem.innerHTML=commentTime
    }
)
