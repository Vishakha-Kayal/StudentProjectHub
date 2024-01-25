gsap.to(".nav",{
    backgroundColor:`rgb(203 213 225 /1)`,
    // // backgroundColor:cyan,

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