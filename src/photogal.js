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
function scatterPhotos(animate = true) {
  const container = document.querySelector('.drag-container');
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const thumbnails = document.querySelectorAll('.dragthumb');
  
  thumbnails.forEach((thumb) => {
    const maxX = containerWidth - thumb.offsetWidth;
    const maxY = containerHeight - thumb.offsetHeight;
    
    const xPos = Math.random() * maxX;
    const yPos = Math.random() * maxY;
    
    if (animate) {
      gsap.to(thumb, {
        x: xPos,
        y: yPos,
        scale: 1,
        duration: 0.3 + Math.random() * 0.5,
        ease: "power2.out",
        onComplete: () => {
          Draggable.get(thumb).update();
        }
      });
    } else {
      gsap.set(thumb, {
        x: xPos,
        y: yPos,
        scale: 1
      });
      Draggable.get(thumb).update();
    }
  });
}

function initDraggable() {
  // Create Draggable instances
  Draggable.create(".dragthumb", {
    type: "x,y",
    bounds: ".drag-container",
    edgeResistance: 0.8,
    minimumMovement: 0,
    allowNativeTouchScrolling: false,
    liveSnap: true,
    inertia: false,
    
    onDragStart: function() {
      // Scale up when drag starts
      gsap.to(this.target, {
        scale: 1.1,
        duration: 0.15,
        ease: "power2.out"
      });
      bringToFront(this.target);
      this.target.classList.add('dragging');
    },
    
    onDrag: function() {
      this.target.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale || 1.1})`;
    },
    
    onDragEnd: function() {
      // Smooth scale down when released
      gsap.to(this.target, {
        scale: 1,
        duration: 0.2,
        ease: "back.out(1.7)",
        onUpdate: () => {
          this.target.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale || 1})`;
        }
      });
      this.target.classList.remove('dragging');
    }
  });

  // Initial scatter without animation
  scatterPhotos(false);

  // Set up reshuffle button
  document.getElementById('reshuffle-btn').addEventListener('click', () => {
    scatterPhotos(true);
    
    // Button feedback animation
    gsap.to("#reshuffle-btn", {
      scale: 0.8,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
  });

  let zIndexCounter = 10;
  
  function bringToFront(element) {
    zIndexCounter += 1;
    element.style.zIndex = zIndexCounter;
  }

  // Click to bring to front
  document.querySelectorAll('.dragthumb').forEach(thumb => {
    thumb.addEventListener('click', function(e) {
      if (!Draggable.isDragging) {
        bringToFront(this);
        gsap.to(this, {
          scale: 1.1,
          duration: 0.1,
          yoyo: true,
          repeat: 1
        });
      }
    });
  });
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




