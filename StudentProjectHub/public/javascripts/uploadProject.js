const emailInput = document.querySelector('.universityEmail');
const myForm = document.querySelector('.myForm');

myForm.addEventListener('submit', function(e) {
    const email = emailInput.value;
    const universityEmailPattern = /@[a-zA-Z_]+\.(edu|org|ac.*)$/;

    if (!universityEmailPattern.test(email)) {
        e.preventDefault();
        alert('Please enter a valid university email address ending with .edu');
    }
});