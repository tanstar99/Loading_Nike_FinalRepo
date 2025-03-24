
import { gsap } from 'gsap';

/**
 * Fades in an element
 */
export const fadeIn = (element: HTMLElement, duration: number = 0.7, delay: number = 0) => {
  gsap.fromTo(
    element,
    { opacity: 0 },
    { opacity: 1, duration, delay }
  );
};

/**
 * Fades out an element
 */
export const fadeOut = (element: HTMLElement, duration: number = 0.7, delay: number = 0) => {
  gsap.fromTo(
    element,
    { opacity: 1 },
    { opacity: 0, duration, delay }
  );
};

/**
 * Slides in an element from the left
 */
export const slideInLeft = (element: HTMLElement, duration: number = 0.7, delay: number = 0, distance: number = 100) => {
  gsap.fromTo(
    element,
    { x: -distance, opacity: 0 },
    { x: 0, opacity: 1, duration, delay }
  );
};

/**
 * Slides in an element from the right
 */
export const slideInRight = (element: HTMLElement, duration: number = 0.7, delay: number = 0, distance: number = 100) => {
  gsap.fromTo(
    element,
    { x: distance, opacity: 0 },
    { x: 0, opacity: 1, duration, delay }
  );
};

/**
 * Slides in an element from the bottom
 */
export const slideInBottom = (element: HTMLElement, duration: number = 0.7, delay: number = 0, distance: number = 100) => {
  gsap.fromTo(
    element,
    { y: distance, opacity: 0 },
    { y: 0, opacity: 1, duration, delay }
  );
};

/**
 * Scales an element in
 */
export const scaleIn = (element: HTMLElement, duration: number = 0.7, delay: number = 0, scale: number = 0.9) => {
  gsap.fromTo(
    element,
    { scale, opacity: 0 },
    { scale: 1, opacity: 1, duration, delay }
  );
};

/**
 * Animates elements in sequence with a stagger
 */
export const staggerElements = (elements: HTMLElement[], animation: (el: HTMLElement, index: number) => void, staggerDelay: number = 0.1) => {
  elements.forEach((el, index) => {
    animation(el, index * staggerDelay);
  });
};

/**
 * Animates page transition - fade out current page and fade in new page
 */
export const pageTransition = {
  out: (element: HTMLElement) => {
    return gsap.to(element, {
      opacity: 0,
      y: -20,
      duration: 0.3,
    });
  },
  in: (element: HTMLElement) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.3, delay: 0.1 }
    );
  }
};
