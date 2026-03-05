/*======================= Active Hamburger Menu ============================ */
const menuIcon = document.querySelector(".menu-icon");
const navlist = document.querySelector(".navlist");

if (menuIcon && navlist) {
    menuIcon.addEventListener("click", () => {
        menuIcon.classList.toggle("active");
        navlist.classList.toggle("active");
        document.body.classList.toggle("open");
    });

    // Remove navlist when a link is clicked
    navlist.addEventListener("click", () => {
        navlist.classList.remove("active");
        menuIcon.classList.remove("active");
        document.body.classList.remove("open");
    });
}

/*======================= Theme Toggle ============================ */
const themeToggleBtn = document.getElementById('theme-toggle');

function applyTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-theme');
        if (themeToggleBtn) themeToggleBtn.innerHTML = "<i class='bx bx-sun'></i>";
    } else {
        document.body.classList.remove('dark-theme');
        if (themeToggleBtn) themeToggleBtn.innerHTML = "<i class='bx bx-moon'></i>";
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-theme');
        applyTheme(isDark);
        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch (e) {
            console.error("Failed to save theme preference:", e);
        }
    });
}

// Initialize theme on load
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

try {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
        applyTheme(true);
    } else if (stored === 'light') {
        applyTheme(false);
    } else {
        applyTheme(prefersDark);
    }
} catch (e) {
    console.error("Failed to load theme preference:", e);
    applyTheme(prefersDark);
}

/*======================= Rotate Text ============================ */
const textElement = document.querySelector(".text p");
if (textElement) {
    textElement.innerHTML = textElement.innerText.split("").map((char, i) =>
        `<b style="transform:rotate(${i * 6.3}deg)">${char}</b>`
    ).join("");
}

/*======================= Switch Between About Buttons ============================ */
const aboutButtons = document.querySelectorAll('.about-btn button');
const aboutContents = document.querySelectorAll('.content');

if (aboutButtons.length > 0 && aboutContents.length > 0) {
    aboutButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            aboutContents.forEach(content => content.style.display = 'none');
            aboutContents[index].style.display = 'block';
            aboutButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

/*======================= Portfolio Filter ============================ */
if (typeof mixitup !== 'undefined') {
    var mixer = mixitup('.portfolio-gallery', {
        selectors: {
            target: '.portfolio-box'
        },
        animation: {
            duration: 1000
        }
    });
}

/*======================= Swiper JS ============================ */
if (typeof Swiper !== 'undefined') {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 8000,
            disableOnInteraction: false,
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        }
    });
}

/*======================= Skill Progress Bar ============================ */
const skillCounters = document.querySelectorAll(".counter span");
const progressBars = document.querySelectorAll(".skills svg circle");

function hasReached(el) {
    if (!el) return false;
    const topPosition = el.getBoundingClientRect().top;
    return window.innerHeight >= topPosition + el.offsetHeight;
}

function updateCount(num, maxNum) {
    const currentNum = +num.innerText;
    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12);
    }
}

let skillsPlayed = false;

function skillsCounter() {
    if (!hasReached(document.querySelector(".skill:first-child"))) return;
    skillsPlayed = true;
    skillCounters.forEach((counter, i) => {
        const target = +counter.dataset.target;
        const strokeValue = 465 - 465 * (target / 100);
        progressBars[i].style.setProperty("--target", strokeValue);
        setTimeout(() => {
            updateCount(counter, target);
        }, 400);
    });
    progressBars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
}

/*======================= Side Progress Bar ============================ */
const scrollProgress = document.getElementById("progress");

function calcScrollValue() {
    const pos = document.documentElement.scrollTop;
    const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollValue = Math.round((pos * 100) / calcHeight);

    if (scrollProgress) {
        if (pos > 100) {
            scrollProgress.style.display = "grid";
        } else {
            scrollProgress.style.display = "none";
        }
        scrollProgress.style.background = `conic-gradient(#fff ${scrollValue}%,#e6006d ${scrollValue}%)`;
    }
}

if (scrollProgress) {
    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });
}

/*======================= Active Menu ============================ */
const menuLi = document.querySelectorAll("header ul li a");
const sections = document.querySelectorAll('section');

function activeMenu() {
    let len = sections.length;
    while (--len && window.scrollY + 97 < sections[len].offsetTop) { }
    menuLi.forEach(sec => sec.classList.remove("active"));
    if (menuLi[len]) {
        menuLi[len].classList.add("active");
    }
}

/*======================= Scroll Reveal ============================ */
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal({
        distance: "90px",
        duration: 2000,
        delay: 200,
    });

    ScrollReveal().reveal('.hero-info,.main-text,.proposal,.heading', { origin: "top" });
    ScrollReveal().reveal('.about-img,.fillter-buttons,.contact-info', { origin: "left" });
    ScrollReveal().reveal('.about-content,.skills', { origin: "right" });
    ScrollReveal().reveal('.allServices,.portfolio-gallery,.blog-box,footer,.img-hero', { origin: "bottom" });
}

/*======================= Event Listeners ============================ */
window.addEventListener("scroll", () => {
    if (!skillsPlayed) {
        skillsCounter();
    }
    activeMenu();
    calcScrollValue();
});

window.addEventListener("load", () => {
    calcScrollValue();
    activeMenu();
});

/*======================= EmailJS Integration ============================ */
(function () {
    emailjs.init("rjSBdMG3FBTzhzbmf");
})();

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = "Sending... <i class='bx bx-loader-alt bx-spin'></i>";
        submitBtn.disabled = true;

        emailjs.sendForm('service_hh8z96c', 'template_6ketpau', this)
            .then(() => {
                alert('Message sent successfully!');
                contactForm.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, (err) => {
                alert('Failed to send message: ' + JSON.stringify(err));
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}