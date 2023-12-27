import { MutableRefObject } from 'react';
import gsap from 'gsap';

type GSAPAnimationProps = {
  element: MutableRefObject<HTMLElement | null>;
  show?: boolean;
  duration?: number;
  delay?: number;
  ease?: string;
};

type SlideFromRightProps = {
  rightPosition?: number;
} & GSAPAnimationProps;

export const fadeIn = ({
  element,
  show = true,
  duration = 0.3,
  delay = 0,
  ease = 'power1.inOut',
}: GSAPAnimationProps) => {
  if (show && element.current) {
    gsap.killTweensOf(element.current);
    return gsap.fromTo(
      element.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: duration,
        delay: delay,
        ease: ease,
      }
    );
  }
  return null;
};

export const fadeInUp = ({
  element,
  show = true,
  duration = 0.3,
  delay = 0,
  ease = 'power1.inOut',
}: GSAPAnimationProps) => {
  if (show && element.current) {
    gsap.killTweensOf(element.current);
    return gsap.fromTo(
      element.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        delay: delay,
        ease: ease,
      }
    );
  }
  return null;
};

export const slideFromRight = ({
  element,
  rightPosition = 100,
  show = true,
  duration = 0.3,
  delay = 0,
  ease = 'ease',
}: SlideFromRightProps) => {
  if (show && element.current) {
    gsap.killTweensOf(element.current);
    return gsap.fromTo(
      element.current,
      {
        x: rightPosition,
      },
      {
        duration: duration,
        x: 0,
        ease: ease,
        delay: delay,
      }
    );
  }
  return null;
};
