
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a parallax effect for an element on scroll
 */
export const createParallax = (element: HTMLElement, speed: number = 0.5) => {
  gsap.to(element, {
    y: () => -speed * ScrollTrigger.maxScroll(window),
    ease: 'none',
    scrollTrigger: {
      start: 'top top',
      end: 'max',
      invalidateOnRefresh: true,
      scrub: true
    }
  });
};

/**
 * Animates an element when it enters the viewport
 */
export const animateOnScroll = (
  element: HTMLElement,
  animation: (el: HTMLElement) => void,
  options = {
    trigger: undefined as HTMLElement | undefined,
    start: 'top 75%',
    end: 'bottom 25%',
    scrub: false,
    markers: false,
    once: true
  }
) => {
  const trigger = options.trigger || element;
  
  ScrollTrigger.create({
    trigger,
    start: options.start,
    end: options.end,
    scrub: options.scrub,
    markers: options.markers,
    onEnter: () => animation(element),
    onEnterBack: () => !options.once && animation(element)
  });
};

/**
 * Creates a horizontal scroll section
 */
export const createHorizontalScroll = (container: HTMLElement, sections: HTMLElement[]) => {
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      end: () => `+=${container.offsetWidth}`
    }
  });
};

/**
 * Creates a smooth scroll animation to target element
 */
export const smoothScrollTo = (targetElement: HTMLElement, duration: number = 1, offset: number = 0) => {
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
  
  gsap.to(window, {
    duration,
    scrollTo: {
      y: targetPosition,
      autoKill: false
    },
    ease: 'power2.inOut'
  });
};
