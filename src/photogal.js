import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", function() {
    const thumbnails = document.querySelectorAll('.thumbnail img');
    const largeImage = document.getElementById('largeImage');
    const largeImageContainer = document.getElementById('largeImageContainer');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            largeImageContainer.style.display = 'flex';
            const largeImagePath = thumbnail.getAttribute('src') || thumbnail.getAttribute('data-src');
            largeImage.setAttribute('src', largeImagePath);
            largeImage.style.opacity = 0;
            largeImage.style.display = 'block'; 
            const tl = gsap.timeline();
            tl.to(largeImageContainer, {
                opacity: 1,
                duration: 0.3
            })
            .to(largeImage, {
                opacity: 1,
                duration: 0.5
            });
        });
    });
    largeImageContainer.addEventListener('click', function() {
        const tl = gsap.timeline();
        tl.to(largeImage, {
            opacity: 0,
            duration: 0.1
        })
        .to(largeImageContainer, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                largeImageContainer.style.display = 'none';
            }
        });
    });
});