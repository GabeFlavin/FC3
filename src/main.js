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
  rotation: -40,
  duration: .5,
  stagger: 0.25,
  ease: 'elastic.out(1,0.3)'
})
.from(splitText.words, {
  opacity: 0,
  scale: .8,
  delay: 1,
  duration: 2,
  stagger: 0.25,
  ease: 'power1.in'
})
.to('.opening', {
  opacity: 0,
  duration: 0,
  delay: 1,
  ease: 'power2.inOut',
  onComplete: () => {
    document.querySelector('.opening').style.display = 'none';
  }
})
.to('.title', {
  duration: 23,
  scale: .85,
  ease: 'power2.Out',
  delay: -2
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

