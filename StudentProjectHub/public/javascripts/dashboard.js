document.querySelector("#uploadicon").addEventListener("click",function(){
    document.querySelector("#uploadform input").click();
})
document.querySelector("#uploadform input").addEventListener("change",function(){
    document.querySelector("#uploadform").submit();
})