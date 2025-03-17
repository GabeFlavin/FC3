import { gsap } from "gsap";
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    let isMenuOpen = false;

    // GSAP Timeline for menu animation
    const navTimeline = gsap.timeline({ paused: true });

    // Animation for sliding in the navigation
    navTimeline.to(mainNav, {
        x: "100%", // Slide in from the left
        duration: 0.5,
        ease: "power2.out",
    });

    // GSAP Timeline for button animation
    const buttonTimeline = gsap.timeline({ paused: true });

    // Animation for transforming the hamburger icon into a close icon
    buttonTimeline.to(
        "#menuToggle", // Top line
        {
            y: 6, // Move down
            rotate: 45, // Rotate 45 degrees
            duration: 0.3,
        },
        0
    );

    // Toggle menu and button on click
    menuToggle.addEventListener("click", function () {
        if (isMenuOpen) {
            // Reverse animations to close the menu and revert the button
            navTimeline.reverse();
            buttonTimeline.reverse();
        } else {
            // Play animations to open the menu and transform the button
            navTimeline.play();
            buttonTimeline.play();
        }
        isMenuOpen = !isMenuOpen; // Toggle state
    });

    // Close menu and revert button when clicking outside
    document.addEventListener("click", function (event) {
        if (isMenuOpen && !mainNav.contains(event.target) && event.target !== menuToggle) {
            navTimeline.reverse();
            buttonTimeline.reverse();
            isMenuOpen = false;
        }
    });
    // Prevent click event from propagating to document
    mainNav.addEventListener("click", function (event) {
        event.stopPropagation();
    }
    );
    // clicking on mainNav should close the menu
    mainNav.addEventListener("click", function (event) {
        if (isMenuOpen) {
            navTimeline.reverse();
            buttonTimeline.reverse();
            isMenuOpen = false;
        }
    }
    );

});