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

let signupForm=document.querySelector(".signupForm");
signupForm.addEventListener("submit", async()=>{
   
    let random = Math.floor(Math.random() * 16);
    let avatar = await fetch(`https://api.dicebear.com/7.x/adventurer/svg?seed=${random}`)
        .then(res => res.text()) // Use .text() to read the response body as text
        .then(data => {
            console.log(data); // Log the SVG content
            return data; // Return the SVG content for further use if needed
        })
        .catch((error) => {
            console.log(error);
        });
    
        console.log(avatar.url);


})
