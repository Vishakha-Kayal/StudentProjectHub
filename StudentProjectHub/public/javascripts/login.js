const open=document.querySelector(".open")
const password=document.querySelector(".pass")
open.addEventListener("click",()=>{
    if(password.type =="password"){
        open.className="ri-eye-off-fill open point-cursor"
        password.type="text"
        
    }
    else{
        open.className="ri-eye-fill open point-cursor"
        password.type="password"
        
    }
})