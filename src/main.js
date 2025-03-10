import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import jQuery from 'jquery';
const $ = jQuery;


// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});



function initHero() {

  /*


  ScrollTrigger for hero section


  */
  gsap.registerPlugin(ScrollTrigger);
  gsap.to('.hero', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      markers: false,
    },
    y: 600,
    opacity: 0,
    duration: 1
  });


  const heroVideo = document.querySelector('.hero video');
  
  // Create timeline for opening animation
  const tl = gsap.timeline({ paused: true });
  heroVideo.play();
tl.play();
  const splitText = new SplitType('.opening-copy');

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
  });
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