import '../scss/style.scss'
import $ from "jquery";
import gsap from "gsap";
import barba from '@barba/core';
import ScrollTrigger from "gsap/ScrollTrigger";
//import SplitText from 'gsap/SplitText';
import LocomotiveScroll from 'locomotive-scroll';

gsap.registerPlugin(ScrollTrigger);

let scrollmain;
const offsetMainWrap = document.querySelector('#main-wrap').offsetTop;

function initSmoothScroll() {
    scrollmain = new LocomotiveScroll({
        el: document.querySelector('.scrollmain'),
        smooth: true,
        getDirection: true
    });
    scrollmain.on('scroll', ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(".scrollmain", {
        scrollTop(value) {
          return arguments.length ? scrollmain.scrollTo(value, 0, 0) : scrollmain.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector(".scrollmain").style.transform ? "transform" : "fixed"
    });
    scrollmain.on('scroll', (instance) => {
        if (instance.scroll.y > offsetMainWrap) {
            $('.mini-header').addClass('scrolled');
        } else {
            $('.mini-header').removeClass('scrolled');
        }         
    });
    ScrollTrigger.addEventListener('refresh', () => scrollmain.update());
    ScrollTrigger.refresh();
    setTimeout(() => {
        scrollmain.update();
    }, 1000);
    scrollmain.stop();    
};
initSmoothScroll();

function initLoading() {
    $('.btn-explore').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        setTimeout(() => {
            hideLoading();
        }, 2900);
        setTimeout(() => {
            $('.schero-home').removeClass('loading-wrap');
            $('#main-wrap').removeClass('loading-wrap');
            $('.mini-header').removeClass('loading-wrap');
            revealHero();
        }, 3000);
        setTimeout(() => {
            scrollmain.update();
            scrollmain.start();
        }, 500);            
        document.querySelector('audio').play();
    });
    $('.music-trigger').on('click', (e) => {
        e.preventDefault();
        if($('.music-ic-wrap').hasClass('off')) {
            $('.music-ic-wrap').removeClass('off');
            document.querySelector('audio').play();
        } else {
            $('.music-ic-wrap').addClass('off');
            document.querySelector('audio').pause();
        }        
    });

    function hideLoading() {
        gsap.to('.schero-home .btn-explore', {
            y: -50,
            autoAlpha: 0,
            duration: 0.3,           
        });
        gsap.to('.schero-home .text-loading', {
            y: -50,
            autoAlpha: 0,
            duration: 0.3,      
        });
    };    

    gsap.set('.logo-wrap', {
        scale: 0.5,
    })
    function revealHero() {

        gsap.from('.header', {
            yPercent: 100,
            autoAlpha: 0,
        })
        gsap.from('.logo-wrap', {
            y: 200,
            duration: .8,
        })
        gsap.to('.logo-wrap', {
            scale: 1,
            duration: .8,
        })
        gsap.from('.char-mario', {
            x: 300,
            y: 300,
            autoAlpha: 0,
            duration: 0.8,
        })
        gsap.from('.char-lug', {
            x: -300,
            y: 300,
            autoAlpha: 0,
            duration: 0.8,
        })
        gsap.from('.char-kart', {
            x: 200,
            y: 200,
            autoAlpha: 0,
            duration: .8,
        })
        gsap.from('.char-sonic', {
            x: -200,
            y: 200,
            autoAlpha: 0,
            duration: .8,
        })
        gsap.from('.schero-home .--h1', {
            y: 200,
            autoAlpha: 0,
            duration: .8,
            delay: 0.08,
        })
        gsap.from('.schero-home .text-hero', {
            y: 200,
            duration: .8,
            delay: 0.16,
        })
        gsap.from('.schero-home .btn-pitch', {
            y: 200,
            autoAlpha: 0,
            duration: .8,
            delay: 0.24,
        })
        gsap.from('.schero-home .contract-wrap', {
            y: 200,
            autoAlpha: 0,
            duration: .8,            
            delay: 0.32,
        })
        
    };

};
initLoading();

function scGame() {    
    $('.game-item-qn').on('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        let gameTarget = $(e.target).data('game');
        console.log(gameTarget);
        $('.game-item').removeClass('active');
        $(e.target).parent('.game-item').addClass('active');        
        $('.game-item-an').stop().slideUp(200);
        $(e.target).closest('.game-item').find('.game-item-an').stop().slideDown(200);
        $('.game-vid').removeClass('active');
        $('.game-img').removeClass('active');
        $('[data-game=' + gameTarget +']').addClass('active');
        setTimeout(() => {            
            ScrollTrigger.getById("triggerNft").kill(true);
            scNft();
            scrollmain.update();
        },200);
        setTimeout(() => {            
            scrollmain.update();
        },400);
    })
};
scGame();

function scNft() {    
    let large = document.querySelector('.fg-ground').offsetWidth;
    let small = window.innerWidth;
    let offsetw = small - large;
    console.log(offsetw);
    let tlNft = gsap.timeline({
        scrollTrigger: {
            id: 'triggerNft',
            trigger: '.scnft-home',
            scroller: '.scrollmain',
            start: 'top top',
            end: '+=2000',
            pin: true,
            scrub: true,
            pinSpacing: true,
        }
    });
    tlNft.to('.nft-fg-wrap', {
        x: offsetw,
        ease: "none"
    })
    .to ('.bg-land', {
        x: offsetw/ -2,
        ease: "none",
    }, "0")

    scrollmain.update();
};
setTimeout(() => {
    scNft();
},800);

