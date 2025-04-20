import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import jQuery from 'jquery';
import './photogal.js';
import './nav-fc.js';
import './faq.js';
import './magnetButton.js';
const $ = jQuery;

gsap.registerPlugin(ScrollTrigger);




// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});



function initHero() {

  /*


  ScrollTrigger for hero section


  
  
  // Update ScrollTrigger when Lenis scrolls
  lenis.on('scroll', ScrollTrigger.update);

  // Add Lenis scroll to GSAP ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.to('.hero', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
      markers: false,
    },
    y: 300,
    opacity: 0,
    ease: "power2.inOut"
  });
*/

  const heroVideo = document.querySelector('.hero video');
  
  // Create timeline for opening animation
  const tl = gsap.timeline({ paused: true });
  tl.play();
  const splitText = new SplitType('.opening-copy');
  // animation for openingTargetNav
  gsap.set('.face', {scale: 0});
  gsap.set('.crusher', {scale: 0});
  gsap.set('.series', {opacity: 0});
  gsap.set('.hero video', {opacity: 0});
  gsap.set('.hero-nav', {opacity: 0});
  tl.from(splitText.words, {
    opacity: 0,
    delay: 3,
    rotation: -40,
    duration: .5,
    stagger: 0.25,
    ease: 'elastic.out(1,0.3)'
  })
  .to('.opening', {
    opacity: 0,
    duration: 0,
    delay: 2,
    ease: 'power2.inOut',
    onComplete: () => {
      document.querySelector('.opening').style.display = 'none';
    }
  })
  .call(() => heroVideo.play()) // Add video play call here
  .to('.face', {
    scale: 1,
    duration: .5,
    ease: 'bounce.out',
  })
  .to('.crusher', {
    scale: 1,
    duration: 0.5,
    ease: 'bounce.out',
  })
  .to('.series', {
    delay: .5,
    opacity: 1,
    duration: 1,
    ease: 'power4.out',
  })
  .to(heroVideo, {
    opacity: 1,
    duration: 2,
    ease: 'power2.out',
  })
  .to('.hero-nav', {
    opacity: 1,
    duration: 2,
    ease: 'power2.out',
  });
}

 


/* 



Pause video when out of viewport



*/

function isElementInViewport() {
  // Select ALL video elements on the page
  const videos = document.querySelectorAll('video');

  // Loop through each video and set up an IntersectionObserver
  videos.forEach((video) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is in viewport → play it
            video.play().catch((error) => {
              console.error('Auto-play failed:', error);
            });
            console.log(`Playing video: ${video.src}`);
          } else {
            // Video is out of viewport → pause it
            video.pause();
            console.log(`Paused video: ${video.src}`);
          }
        });
      },
      { threshold: 0.5 } // Adjust threshold (0.5 = 50% visibility)
    );

    // Start observing the current video
    observer.observe(video);
  });
}
if ($('video')[0]) {
  isElementInViewport();
}





document.addEventListener('DOMContentLoaded', () => {
  if ($('.hero')[0]) {
    initHero();
  }
});
