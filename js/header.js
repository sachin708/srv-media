const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 100){
        header.classList.add("scrolled");
    }else{
        header.classList.remove("scrolled");
    }

});