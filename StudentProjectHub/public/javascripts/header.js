let avatar=document.querySelector(".avatar")
let random=Math.floor(Math.random()*16)
let isAvatarGenerated

async function generateAvatar(){
    let avatarUrl = await fetch(`https://api.dicebear.com/7.x/personas/svg?seed=${random}`)
    console.log(avatarUrl)
    avatar.src=avatarUrl.url
    console.log(avatar.src)
}
generateAvatar()