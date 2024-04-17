// Get the elements for New Password and Confirm Password
const newPasswordInput = document.querySelector('.newPassword');
const confirmPasswordInput = document.querySelector('.confirmPassword');
const passMatch = document.querySelector('.passMatch')

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