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
