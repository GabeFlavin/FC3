import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    let isMenuOpen = false;

    // GSAP Timeline for menu animation
    const navTimeline = gsap.timeline({ paused: true });
    const navTimelineOut = gsap.timeline({ paused: true });

    // Animation for sliding in the navigation
    navTimeline.to(mainNav, {
        x: "-150%", 
        duration: 1.9,
        ease: "bounce.out",
    });

    navTimelineOut.to(mainNav, {
        x: "150%", 
        duration: 1.4,
        ease: "power1.in",
    });

    // GSAP Timeline for button animation
    const buttonTimeline = gsap.timeline({ paused: true });
    const buttonTimelineOut = gsap.timeline({ paused: true });


    // Animation for transforming the hamburger icon into a close icon
    buttonTimeline.to(
        "#menuToggle", // Top line
        {
            //y: 0, // Move down
            rotate: 180, // Rotate 45 degrees
            duration: .6,
            ease: "bounce.out",
        },
        0
    );

    buttonTimelineOut.to(
        "#menuToggle", // Top line
        {
            //y: 0, // Move down
            rotate: 0, // Rotate 45 degrees
            duration: 1.5,
            ease: "power1.in",
        },
        0
    );

    // Toggle menu and button on click
    menuToggle.addEventListener("click", function () {
        if (navTimeline.isActive() || navTimelineOut.isActive() || 
            buttonTimeline.isActive() || buttonTimelineOut.isActive()) {
            return; // Don't do anything if animations are running
        }

        if (isMenuOpen) {
            // Reverse animations to close the menu and revert the button
            navTimelineOut.restart();
            buttonTimelineOut.restart();
        } else {
            // Play animations to open the menu and transform the button
            navTimeline.restart();
            buttonTimeline.restart();
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
            navTimelineOut.restart();
            buttonTimelineOut.restart();
            isMenuOpen = false;
        }
    }
    );

    const startButton = document.querySelector('.start');
    if(startButton){
    
        startButton.addEventListener('click', function (event) {
            event.preventDefault();
            const overviewSection = document.getElementById('overview');
            gsap.to(window, {
                duration: 1.2,
                scrollTo: {
                y: "#overview",
                offsetY: 0
                },
                ease: "bounce.out"
            });
        });
    }
    // when mainNav a are clicked use gsap to scroll to the section
    const navLinks = document.querySelectorAll('a.navLink');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            gsap.to(window, {
                duration: 1.5,
                delay: .5,
                scrollTo: {
                    y: targetSection,
                    offsetY: 0
                },
                ease: "bounce.out"
            });
            // Close the menu after clicking a link
            if (isMenuOpen) {
                navTimelineOut.restart();
                buttonTimelineOut.restart();
                isMenuOpen = false;
            }
        });
    });



});