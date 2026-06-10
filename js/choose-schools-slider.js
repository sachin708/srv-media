let sliderInitialized = false;

function initMobileSlider() {

    const isMobile = window.innerWidth <= 480;

    if (!isMobile) {

        sliderInitialized = false;

        const slider = document.querySelector(".cards-wrapper");

        if (slider) {
            slider.style.transform = "translateX(0)";
        }

        const dots = document.querySelector(".mobile-dots");
        if (dots) {
            dots.innerHTML = "";
        }

        return;
    }

    if (sliderInitialized) return;

    sliderInitialized = true;

    const slider = document.querySelector(".cards-wrapper");
    const cards = document.querySelectorAll(".school-card");
    const dotsContainer = document.querySelector(".mobile-dots");

    if (!slider || !cards.length || !dotsContainer) return;

    let current = 0;
    let direction = 1;

    cards.forEach((_, index) => {

        const dot = document.createElement("button");

        dot.classList.add("mobile-dot");

        if(index === 0){
            dot.classList.add("active");
        }

        dotsContainer.appendChild(dot);

        dot.addEventListener("click", () => {
            current = index;
            updateSlider();
        });
    });

    const dots = dotsContainer.querySelectorAll(".mobile-dot");

    function updateDots(){
        dots.forEach((dot,index)=>{
            dot.classList.toggle("active", index === current);
        });
    }

    function updateSlider(){

        slider.style.transform =
            `translateX(-${current * 100}%)`;

        updateDots();
    }

    function nextSlide(){

        if(current >= cards.length - 1){
            direction = -1;
        }
        else if(current <= 0){
            direction = 1;
        }

        current += direction;

        updateSlider();
    }

    setInterval(nextSlide, 4000);

    updateSlider();
}

window.addEventListener("load", initMobileSlider);
window.addEventListener("resize", initMobileSlider);