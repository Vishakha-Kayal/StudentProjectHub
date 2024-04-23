// Get the elements for New Password and Confirm Password
const newPasswordInput = document.querySelector('.newPassword');
const confirmPasswordInput = document.querySelector('.confirmPassword');
const passMatch = document.querySelector('.passMatch')
const form = document.querySelector('.myForm');

// Add an input event listener to the Confirm Password input field
confirmPasswordInput.addEventListener('input', function() {
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (newPassword === confirmPassword) {
        passMatch.textContent = "Passwords match"
    } else {
        passMatch.classList.remove('hidden')
        passMatch.textContent = "Passwords does not match"
    }
});

form.addEventListener('submit', function(event) {
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (newPassword !== confirmPassword) {
        event.preventDefault(); // Prevent form submission
        alert('Passwords do not match. Please make sure they match before submitting.');
    }
});

const open = document.querySelectorAll(".open")
console.log(open);

open[0].addEventListener("click",()=>{
    if(newPasswordInput.type == "password"){
        open[0].className = "ri-eye-off-fill open point-cursor"
        newPasswordInput.type="text";
    }
    else{
        newPasswordInput.type="password";
    }
})
open[1].addEventListener("click",()=>{
    if(confirmPasswordInput.type == "password"){
        open[1].className = "ri-eye-fill open point-cursor"
        confirmPasswordInput.type="text";
    }
    else{
        confirmPasswordInput.type="password";
    }
})