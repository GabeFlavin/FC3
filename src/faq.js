import { gsap } from "gsap";
import jQuery from 'jquery';
const $ = jQuery;
// Select all FAQ items
const faqItems = document.querySelectorAll('.faq-item');

// Only proceed if FAQ items exist
if (faqItems.length > 0) {
    // Loop through each FAQ item
        $(".faq-item").each(function (index) {
      
          let targetQuestion = $(this).find('.faq-question');
          let targetArrow = $(this).find('.toggle-icon');
          let targetArrow2 = $(this).find('.toggle-icon-2');
          let targetDescription = $(this).find('.faq-answer');
      
          let opened = false;
      
          gsap.set(targetDescription, {
            //display: "none",
            height: 0,
            opacity: 1,
          }, 0);
      
          let tl = gsap.timeline({
            paused: true,
          });
      
          tl.set(targetDescription, {
            //display: "block"
          }, 0);
      
          tl.to(
            targetDescription,
            {
              duration: 0.4,
              ease: "Power3.out",
              height: "auto",
              opacity: 1
            },
            0,
          );
          tl.to(
            targetArrow,
            {
              duration: 0,
              display: 'none'
            },
            0,
          );
          tl.to(
            targetArrow2,
            {
              duration: 0,
              display: 'block'
            },
            0,
          );
      
          targetQuestion.on('mouseup', function (event) {
            if (!opened) {
              opened = true;
              tl.play();
            } else {
              opened = false;
              tl.reverse();
            }
      
          });
      
        });
    

        // add listern to 'invisible-ink' class that turns the background to 'none'
        const invisibleInk = document.querySelectorAll('.invisible-ink span');
        invisibleInk.forEach((ink) => {
          ink.addEventListener('click', function() {
            gsap.to(ink, {
              background: 'none',
              color: 'black',
              duration: 0.5,
            });
          });
        });



}