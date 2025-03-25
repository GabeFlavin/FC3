import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import jQuery from 'jquery';
import './photogal.js';
import './nav-fc.js';
const $ = jQuery;



// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});



function initHero() {

  /*


  ScrollTrigger for hero section


  
  gsap.registerPlugin(ScrollTrigger);

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
  heroVideo.play();
tl.play();
  const splitText = new SplitType('.opening-copy');
  // animation for openingTargetNav
  gsap.set('.start', {scale: 0});
  gsap.set('.face', {scale: 0});
  gsap.set('.crusher', {scale: 0});
  gsap.set('.series', {opacity: 0});
  gsap.set('.hero video', {opacity: 0});
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
  .to('.hero video', {
    opacity: 1,
    duration: 2,
    ease: 'power2.out',
  })
  .to('.start', {
    scale: 1,
    duration: .9,
    ease: 'power2.out',
  },"+=2");
}
if ($('.hero')[0]) {
  initHero();
}

 


/* 



Pause video when out of viewport



*/

function isElementInViewport() {
  const video = document.querySelector('video');
 
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Video is in the viewport, play it
          video.play();

          console.log('playing');
        } else {
          // Video is out of the viewport, pause it
          video.pause();
          console.log('paused');
        }
      });
    }, { threshold: 0.5 }); // Adjust the threshold as needed
  
    observer.observe(video);
}
if ($('video')[0]) {
  isElementInViewport();
}





document.addEventListener('DOMContentLoaded', () => {
  initHero();
});