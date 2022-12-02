import { isBrowser } from '../utils';
import gsap from 'gsap';

if (isBrowser) {
    const { ScrollTrigger } = require("gsap/ScrollTrigger");
    const { Flip } = require("gsap/Flip");
    const { Draggable } = require("gsap/Draggable");
    const { TextPlugin } = require("gsap/TextPlugin");
    const { MotionPathPlugin } = require("gsap/MotionPathPlugin");
    gsap.registerPlugin(ScrollTrigger, Draggable, Flip, MotionPathPlugin, TextPlugin);
}
