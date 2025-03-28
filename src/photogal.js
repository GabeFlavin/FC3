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



/*







DRAGGABLE





*/
function scatterPhotos() {
  const container = document.querySelector('.drag-container');
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const thumbnails = document.querySelectorAll('.dragthumb');
  
  thumbnails.forEach((thumb, i) => {
    const maxX = containerWidth - thumb.offsetWidth;
    const maxY = containerHeight - thumb.offsetHeight;
    
    // Random position within container bounds
    const xPos = Math.random() * maxX;
    const yPos = Math.random() * maxY;
    
    // Random rotation between -15 and 15 degrees
    const rotation = Math.random() * 30 - 15;
    
    // Set initial position and rotation
    gsap.set(thumb, {
      x: xPos,
      y: yPos,
      rotation: rotation,
      zIndex: 0
    });
    
    // Register these positions with Draggable
    Draggable.get(thumb).update(true); // true = suppress events
  });
}

function initDraggable() {
  // Create Draggable instances first
  Draggable.create(".dragthumb", {
    type: "x,y",
    bounds: ".drag-container",
    edgeResistance: 0.8,
    minimumMovement: 0,
    allowNativeTouchScrolling: false,
    liveSnap: true,
    inertia: false,
    
    onDrag: function() {
      this.target.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation || 0}deg)`;
    },
    
    onPress: function() {
      bringToFront(this.target);
      this.target.classList.add('dragging');
    },
    
    onRelease: function() {
      gsap.to(this.target, {
        duration: 0.2,
        onUpdate: () => {
          this.target.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation || 0}deg)`;
        }
      });
      this.target.classList.remove('dragging');
    }
  });

  // Scatter photos after Draggable is initialized
  scatterPhotos();

  // Track z-index counter
  let zIndexCounter = 10;
  
  // Click handler
  document.querySelectorAll('.dragthumb').forEach(thumb => {
    thumb.addEventListener('click', function(e) {
      if (!Draggable.isDragging) {
        bringToFront(this);
        gsap.to(this, {
          scale: 1.05,
          duration: 0.1,
          yoyo: true,
          repeat: 1
        });
      }
    });
  });

  function bringToFront(element) {
    zIndexCounter += 1;
    element.style.zIndex = zIndexCounter;
  }
}

if (typeof gsap !== "undefined" && typeof Draggable !== "undefined") {
  initDraggable();
} else {
  console.error("GSAP or Draggable plugin not loaded!");
}













/* 







end of load 






*/
});




