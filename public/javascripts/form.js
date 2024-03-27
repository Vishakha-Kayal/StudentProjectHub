let select = document.querySelector('select');
select.addEventListener("change", function () {
    if (this.value === "") {
        this.classList.add("placeholder");
    } else {
        this.classList.remove("placeholder");
    }
});
const form = document.querySelector('form')
const inputDiv = document.querySelector('#projectImages')
const imagesdiv = document.querySelector('.images')

const uploadIcon = document.getElementsByClassName('ic')
uploadIcon[0].addEventListener('click', function () {
    inputDiv.click();
});

// Listen for changes to the file input to handle file selection
inputDiv.addEventListener('change', function () {
    const images = inputDiv.files;
    console.log(images); // Now this should log the selected files
    Array.from(images).forEach(image => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(image);
        img.classList.add('style-img')
        imagesdiv.classList.remove('hidden')
        // imagesdiv.classList.add('style-img')
        imagesdiv.appendChild(img);
        // Optionally, revoke the object URL after the image has loaded to free memory
        img.onload = () => URL.revokeObjectURL(img.src);
    });
});

// form.addEventListener('submit', function (e) {
//     e.preventDefault();
//     // console.log(e.target[3].value);
//     const images = inputDiv.files;
//     console.log(ima);
//     Array.from(images).forEach(image => {
//         const img = document.createElement('img');
//         img.src = URL.createObjectURL(image);
//         imagesdiv.appendChild(img);
//         img.onload = () => URL.revokeObjectURL(img.src);
//     });

// })

