
let burgerIcon=document.querySelector(".burger-icon");
let mobileLinks=document.querySelector(".mobile-links-container");
let closeBtn=document.querySelector(".x");

if(burgerIcon){
    burgerIcon.addEventListener("click",()=>{
        mobileLinks.style.display='block'
    })
}

if(closeBtn){
    closeBtn.addEventListener("click",()=>{
        mobileLinks.style.display='none'
    })
}

    
