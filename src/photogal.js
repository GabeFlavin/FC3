import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

document.addEventListener("DOMContentLoaded", function() {
    const thumbnails = document.querySelectorAll('.thumbnail img');
    const largeImage = document.getElementById('largeImage');
    const largeImageContainer = document.getElementById('largeImageContainer');

    thumbnails.forEach(thumbnail => {
        // find .zoom inside .thumbnail
        const zoom = thumbnail.closest('.thumbnail').querySelector('.zoom');
        
        zoom.addEventListener('click', function() {
            largeImageContainer.style.display = 'flex';
            const largeImagePath = thumbnail.getAttribute('src') || thumbnail.getAttribute('data-src');
            largeImage.setAttribute('src', largeImagePath);
            largeImage.style.opacity = 0;
            largeImage.style.transform = 'scale(0.2)';
            largeImage.style.display = 'flex'; 
            const tl = gsap.timeline();
            tl.to(largeImageContainer, {
                opacity: 1,
                ease: "power3.out",
                duration: 0.3
            })
            .to(largeImage, {
                opacity: 1,
                scale: 1,
                ease: "power2.out",
                duration: .2,
                delay: -0.2,
                rotation: Math.random() * 10 - 5
            })
        });
    });
    largeImageContainer.addEventListener('click', function() {
        const tl = gsap.timeline();
        tl.to(largeImage, {
            opacity: 0,
            scale: .3,
            duration: 0.2
        })
        .to(largeImageContainer, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                largeImageContainer.style.display = 'none';
            }
        },"-=0.2");
    });



// DRAGGABLE

// Initialize for each drag container
document.querySelectorAll('.drag-container').forEach((container) => {
    const dragthumbs = container.querySelectorAll('.dragthumb');
    console.log(`Initializing container with ${dragthumbs.length} thumbnails`);
  
    // Function to generate random positions within a clustered area
    function getRandomPosition(index, total) {
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;
  
      const clusterWidth = containerWidth * (0.4 + (total / 20));
      const clusterHeight = containerHeight * 0.3;
  
      const clusterX = (containerWidth - clusterWidth) / 2;
      const clusterY = 10;
  
      const x = Math.floor(Math.random() * clusterWidth) + clusterX;
      const y = Math.floor(Math.random() * clusterHeight) + clusterY;
  
      const xPercent = (x / containerWidth) * 100;
      const yPercent = (y / containerHeight) * 100;
  
      return { x: xPercent, y: yPercent };
    }
  
    // Position all thumbnails in this container
    dragthumbs.forEach((dragtar, index) => {
      const { x, y } = getRandomPosition(index, dragthumbs.length);
      dragtar.style.left = `${x}%`;
      dragtar.style.top = `${y}%`;
  
      let _zIndex = 1;
      gsap.set(dragtar, { zIndex: _zIndex++ });
  
      // Set random rotation
      const rotation = Math.floor(Math.random() * 30) - 15;
      dragtar.style.transform = `rotate(${rotation}deg)`;
  
      // Click to bring to front
      dragtar.addEventListener('click', () => {
        gsap.set(dragtar, { zIndex: ++_zIndex });
      });
  
      // Make draggable with inertia
      Draggable.create(dragtar, {
        type: 'x,y',
        bounds: container, // Bound to this specific container
        inertia: true,
        edgeResistance: 0.65,
        throwResistance: 2000
      });
    });
  });




// end of load
});




