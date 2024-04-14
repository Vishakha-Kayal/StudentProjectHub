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

// document.querySelector('.signupForm').addEventListener('submit', async function(e) {
//     e.preventDefault();
//     const formData = new FormData(this);
//     const formValues = {};

//         for (let entry of formData.entries()) {
//             formValues[entry[0]] = entry[1];
//         }
    
//     await fetch('/api/user/signup', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formValues)
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Assuming the server returns the user ID upon successful creation
        
//         window.location.href="/"; 
//         uploadAvatar(data.userId);
//          // Call the function to upload the avatar
//     })
//     .catch(error => console.error('Error:', error));
// });

// This function could be called after the form submission is successful
// async function uploadAvatar(userId) {
//     let random = Math.floor(Math.random() * 16);
//     let avatarUrl = await fetch(`https://api.dicebear.com/7.x/lorelei/svg?seed=${random}`)
//     .then(res => {
//         if (!res.ok) {
//                 throw new Error(`Error fetching avatar: ${res.statusText}`);
//             }
//             console.log(res.url);
//             return res.url;
//         })
//         .catch((error) => {
//             console.error(error);
//         });
        
//         if (avatarUrl) {         
//             console.log(userId);
//         await fetch(`/api/user/${userId}/avatar`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ avatar: avatarUrl }),
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Error updating avatar: ${response.statusText}`);
//             }
//             const contentType = response.headers.get("content-type");
//             if (!contentType || !contentType.includes("application/json")) {
//                 throw new TypeError("Oops, we haven't got JSON!");
//             }
//             return response.json();
//         })
//         .then(data => console.log('Avatar updated successfully:', data))
//         .catch((error) => {
//             console.error(error);
//         });
//     }
// }