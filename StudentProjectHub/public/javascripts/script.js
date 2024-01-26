gsap.to(".nav",{
    backgroundColor:`rgb(203 213 225 /1)`,
    // // backgroundColor:`cyan`,

    backdropFilter: "blur(10px)",
    scrollTrigger: {
        trigger: ".nav",
        scroller: "body",
        // markers:true,
        start:"top -1%",
        end:"top -50%",
        scrub:1
    }     
})

gsap.from(".head",{
    y:100,
    duration:1,
    opacity:0,
    scrollTrigger:{
        trigger:".head",
        scroller:"body",
        // markers:true,
        start:"top 90%",
        end:"top 70%",
        scrub:2
    }
})

function marquee(){
    const anim=document.querySelectorAll(".anim")
    gsap.registerPlugin(ScrollTrigger);
    
    
    anim.forEach(function(e){
        gsap.set(e, { x: '0%' });
        gsap.to(e, {
              x:"-100%", 
              duration: 11, 
              ease: 'linear',
              repeat: -1, 
              scrollTrigger:{
            trigger:e,
            scroller:"body",
            // markers:true,
            start:"top 80%",
            end:"top 70%",
            // scrub:true
              }
            },
            
          );
    })
} 
marquee();




const span = document.querySelector(".change");

    function typeWriter(textElement, text, speed, callback) {
        let i = 0;
        function type() {
            if (i < text.length) {
                textElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(function(){
                    textElement.innerHTML = "";
                    if (callback) {
                        callback();
                    }
                }, 1000);
            }
        }
        type();
    }

    function changing() {
        typeWriter(span, 'Project', 300, function() {
            setTimeout(function(){
                typeWriter(span, 'Talent', 300,changing);
            }, 1000);
        });
    }

    changing();