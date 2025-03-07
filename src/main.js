import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});



// Create timeline for opening animation
const tl = gsap.timeline();
const splitText = new SplitType('.opening-copy');

tl.from('.title', {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
})
.from('.opening', {
  opacity: 1,
  duration: 1
})
.from(splitText.words, {
  opacity: 0,
  y: 150,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power2.out'
})
.to(splitText.words, {
  opacity: 0,
  y: -50,
  duration: 0.8,
  stagger: 0.05,
  delay: 2,
  ease: 'power2.inOut'
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


// create a scrolltrigger animation for the hero section that will trigger when the user scrolls past the hero section
gsap.registerPlugin(ScrollTrigger); // register the ScrollTrigger plugin    
gsap.to('.hero', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    markers: true,
  },
  y: 600,
  opacity: 0,
  duration: 1
});

