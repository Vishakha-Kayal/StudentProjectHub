var currentUrl = window.location.href;

var navLinks = document.querySelectorAll('.navlinks');
navLinks.forEach(function(link) {
  if (link.href === currentUrl) {
    link.classList.add("text-[#43856F]");
  }
});

document.querySelectorAll(".contactField").forEach((element)=>{
element.addEventListener("click",(e)=>{
let loggedIn=element.getAttribute("data-index")
if (loggedIn === "" || loggedIn === "false") {
  window.location.href = "/signup";
}
})
})

