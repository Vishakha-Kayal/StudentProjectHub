window.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  // console.log(currentPath);

  let activeItem;
  switch (currentPath) {
    case "/dashboard":
      activeItem = document.getElementById("dashboard");
      break;
    case "/dashboard/notifications/comments":
      activeItem = document.getElementById("notification");
      break;
    case "/dashboard/queries":
      activeItem = document.getElementById("queries");
      break;
    case "/logout":
      activeItem = document.getElementById("logout");
      break;
    default:
      activeItem = null;
  }
  // console.log(activeItem);
  if (activeItem) {
    activeItem.style.backgroundColor = "#E4EBE8";
    activeItem.style.color = "black";
  }
  let comment = document.querySelector('.comment');
  let colaborate = document.querySelector('.colaborate');
  if(window.location.pathname == '/dashboard/notifications/collaboration'){
    colaborate.classList.add('border-b-[2.5px]','border-slate-600');
    comment.classList.remove('border-b-[2.5px]','border-slate-600');
  }
  else if(window.location.pathname == '/dashboard/notifications/comments'){
    comment.classList.add('border-b-[2.5px]','border-slate-600');
    colaborate.classList.remove('border-b-[2.5px]','border-slate-600');
  }
});

let acceptBtn = document.querySelector(".accept-btn")
let declineBtn = document.querySelector(".decline-btn")
let acknowledgeForm = document.querySelector(".acknowledge")
let acceptanceInput = document.querySelector("#acceptanceInput")
let acknowledgeDiv = document.querySelector(".acknowledge-div ")

acceptBtn.addEventListener("click",()=>{
  acceptanceInput.value=true;
  acknowledgeForm.submit();
  acknowledgeDiv.innerHTML = `
  <div class="w-24 text-[#316a58] py-2 border-[#316a58] border-[1px] rounded-lg flex justify-center items-center font-semibold">Accepted</div>
  `
})
declineBtn.addEventListener("click",()=>{
  acceptanceInput.value=false;
  acknowledgeForm.submit();
  acknowledgeDiv.innerHTML = `
  <div class="w-24 text-[#316a58] py-2 border-[#316a58] border-[1px] rounded-lg flex justify-center items-center font-semibold">Declined</div>
  `
})

acknowledgeForm.addEventListener("submit",async (e)=>{
  e.preventDefault();
  const form = new FormData(e.target)
  form.response = acceptanceInput.value
 try{
  const data = await fetch("/colabResponse",{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form)
  })
}
catch(e){console.log("error",e);}
})