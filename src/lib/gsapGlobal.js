import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* GSAP used to come from the CDN as window globals, and the motion code still
   reads it from window. Import this module before anything that animates. */
gsap.registerPlugin(ScrollTrigger);
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
