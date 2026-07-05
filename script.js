/**
 * MAHRUKH GUL - LUXURY PREMIUM SCRIPTS
 * Handles GSAP Animations, Swiper, and Header Interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initGSAP();
    initMobileDrawer();
    initSwipers();
});

function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // Initial Entrance Animation
    const tl = gsap.timeline();

    // Header slides down
    tl.from("#header-wrapper", {
        y: -150,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });

    // Logo gentle reveal
    tl.from(".logo-text", {
        opacity: 0,
        scale: 0.95,
        duration: 1.5,
        ease: "power2.out"
    }, "-=0.8");

    // Nav links fade in staggered
    tl.from(".nav-item", {
        y: 10,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "transform,opacity"
    }, "-=1.2");

    // Sticky Header Scroll Shadow
    const headerWrapper = document.getElementById('header-wrapper');

    ScrollTrigger.create({
        start: "top -50",
        end: 99999,
        onEnter: () => {
            headerWrapper.classList.add('shadow-md');
        },
        onLeaveBack: () => {
            headerWrapper.classList.remove('shadow-md');
        }
    });
}

function initMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const content = document.getElementById('drawer-content');
    const trigger = document.getElementById('mobile-menu-trigger');
    const closeBtn = document.getElementById('drawer-close');

    if (!drawer || !trigger) return;

    // GSAP Timeline for Drawer
    const tl = gsap.timeline({ paused: true });

    tl.to(drawer, { visibility: "visible", duration: 0 })
        .to(overlay, { opacity: 1, duration: 0.3, ease: "power2.out" })
        .to(content, { x: 0, duration: 0.4, ease: "power3.out" }, "-=0.2");

    // Open Drawer
    trigger.addEventListener('click', () => {
        tl.play();
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close Drawer
    const closeDrawer = () => {
        tl.reverse();
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
}

function initSwipers() {
    // Hero Slider
    if (document.querySelector('.hero-swiper')) {
        new Swiper('.hero-swiper', {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
            },
            speed: 1500, // Slow, elegant transition
        });
    }

    // Trending Products Slider
    const trendingSwiperEl = document.querySelector('.trending-swiper');
    if (trendingSwiperEl) {
        const trendingSwiper = new Swiper('.trending-swiper', {
            slidesPerView: 'auto',
            slidesPerGroup: 1,
            centeredSlides: true,
            spaceBetween: 16,
            speed: 1000,
            grabCursor: true,
            mousewheel: {
                forceToAxis: true,
            },
            navigation: {
                nextEl: '.trending-next',
                prevEl: '.trending-prev',
            },
            pagination: {
                el: '.trending-pagination',
                type: 'progressbar',
            },
            breakpoints: {
                768: {
                    centeredSlides: false,
                    spaceBetween: 24,
                }
            }
        });

        // Store all original slides for filtering
        const allTrendingSlides = Array.from(trendingSwiperEl.querySelectorAll('.swiper-slide'));
        const tabs = document.querySelectorAll('.trending-tab');

        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active tab styling
                tabs.forEach(t => {
                    t.classList.remove('border-b-[1.5px]', 'border-black', 'text-black', 'pb-1');
                    t.classList.add('hover:text-black', 'transition-colors');
                });
                tab.classList.remove('hover:text-black', 'transition-colors');
                tab.classList.add('border-b-[1.5px]', 'border-black', 'text-black', 'pb-1');

                const filter = tab.getAttribute('data-filter');
                
                // Filter slides
                const filteredSlides = allTrendingSlides.filter(slide => {
                    return slide.getAttribute('data-category') === filter;
                });

                // Update Swiper
                trendingSwiper.removeAllSlides();
                trendingSwiper.appendSlide(filteredSlides);
                trendingSwiper.slideTo(0);
                trendingSwiper.update();
            });
        });

        // Initialize with default tab (New Arrivals)
        const activeTab = document.querySelector('.trending-tab[data-filter="new-arrivals"]');
        if (activeTab) {
            activeTab.click();
        }
    }

    // Couture Slider
    if (document.querySelector('.couture-swiper')) {
        new Swiper('.couture-swiper', {
            slidesPerView: 'auto',
            slidesPerGroup: 1,
            centeredSlides: true,
            spaceBetween: 16,
            speed: 1000,
            grabCursor: true,
            mousewheel: {
                forceToAxis: true,
            },
            navigation: {
                nextEl: '.couture-next',
                prevEl: '.couture-prev',
            },
            pagination: {
                el: '.couture-pagination',
                type: 'progressbar',
            },
            breakpoints: {
                768: {
                    centeredSlides: false,
                    spaceBetween: 24,
                }
            }
        });
    }

    // Worn & Loved Slider
    if (document.querySelector('.worn-loved-swiper')) {
        new Swiper('.worn-loved-swiper', {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 16,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            grabCursor: true,
            navigation: {
                nextEl: '.worn-loved-next',
                prevEl: '.worn-loved-prev',
            },
            breakpoints: {
                768: {
                    spaceBetween: 24,
                }
            }
        });
    }

    // Summer Sale Auto Slider (Infinite Marquee)
    const summerSwiperEl = document.querySelector('.summer-sale-swiper');
    if (summerSwiperEl) {
        const summerSwiper = new Swiper('.summer-sale-swiper', {
            slidesPerView: 'auto',
            spaceBetween: 16,
            loop: true,
            speed: 3000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            freeMode: true
        });

        // Instant pause on hover
        summerSwiperEl.addEventListener('mouseenter', () => {
            summerSwiper.autoplay.stop();
            summerSwiper.setTransition(0);
            summerSwiper.setTranslate(summerSwiper.getTranslate());
        });

        // Resume perfectly smooth on mouse leave
        summerSwiperEl.addEventListener('mouseleave', () => {
            summerSwiper.animating = false;
            
            const currentTranslate = summerSwiper.getTranslate();
            const snapGrid = summerSwiper.snapGrid;
            let targetSnap = null;
            let prevSnap = 0;
            
            for (let i = 0; i < snapGrid.length; i++) {
                if (snapGrid[i] > -currentTranslate) {
                    targetSnap = snapGrid[i];
                    prevSnap = i > 0 ? snapGrid[i-1] : 0;
                    break;
                }
            }
            
            if (targetSnap !== null && targetSnap > prevSnap) {
                const remainingDistance = targetSnap - (-currentTranslate);
                const totalDistance = targetSnap - prevSnap;
                const proportionalSpeed = (remainingDistance / totalDistance) * summerSwiper.params.speed;
                
                summerSwiper.setTransition(proportionalSpeed);
                summerSwiper.translateTo(-targetSnap, proportionalSpeed, false, true);
            } else {
                summerSwiper.setTransition(summerSwiper.params.speed);
                summerSwiper.slideNext();
            }
            
            summerSwiper.autoplay.start();
        });
    }
}
