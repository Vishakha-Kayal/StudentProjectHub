const newPasswordInput = document.querySelector('.newPassword');
const confirmPasswordInput = document.querySelector('.confirmPassword');
const passMatch = document.querySelector('.passMatch');
const open=document.querySelector(".open")
const open1=document.querySelector(".open1")



function checkPasswords(){
    confirmPasswordInput.addEventListener('input', function() {
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
    
        if (newPassword === confirmPassword) {
            passMatch.classList.remove("hidden")
            passMatch.textContent="Password Matched"
    
        } else {
            passMatch.classList.remove("hidden")
            passMatch.textContent="Passwords does not match"
            
        }
    });
}
checkPasswords()

function newshowPassword(){  
open.addEventListener("click",()=>{
    if(newPasswordInput.type =="password"){
        open.className="ri-eye-off-fill open point-cursor"
        newPasswordInput.type="text"
        
    }
    else{
        open.className="ri-eye-fill open point-cursor"
        newPasswordInput.type="password"
        
    }
})
}

function confirmshowPassword(){  
open1.addEventListener("click",()=>{
    if(confirmPasswordInput.type =="password"){
        open1.className="ri-eye-off-fill open point-cursor"
        confirmPasswordInput.type="text"
        console.log("hello");
    }
    else{
        open1.className="ri-eye-fill open point-cursor"
        confirmPasswordInput.type="password"
        console.log("hello1");
        
    }
})
}

newshowPassword();
confirmshowPassword();