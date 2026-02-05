import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Portrait card entrance
      tl.fromTo(
        portraitRef.current,
        { opacity: 0, x: '-12vw', scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 1 },
        0
      );

      // Label entrance
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.3
      );

      // Headline words stagger
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
          0.4
        );
      }

      // Subheadline
      tl.fromTo(
        subheadRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.7
      );

      // CTAs
      tl.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        0.85
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back
            gsap.set(portraitRef.current, { opacity: 1, x: 0, scale: 1 });
            gsap.set(contentRef.current, { opacity: 1, x: 0 });
            if (headlineRef.current) {
              gsap.set(headlineRef.current.querySelectorAll('.word'), { opacity: 1, y: 0 });
            }
            gsap.set(subheadRef.current, { opacity: 1, y: 0 });
            gsap.set(ctaRef.current?.children || [], { opacity: 1, y: 0 });
          },
        },
      });

      // Portrait exit (70% - 100%)
      scrollTl.fromTo(
        portraitRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Content exit
      scrollTl.fromTo(
        contentRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = () => {
    const element = document.getElementById('system');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="pinned-section z-10 flex items-center justify-center"
      style={{ background: '#070A12' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_developer.jpg"
          alt="Developer workspace"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070A12] via-[#070A12]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-[#070A12]/50" />
      </div>

      {/* Portrait Card */}
      <div
        ref={portraitRef}
        className="absolute left-[6vw] top-[14vh] w-[34vw] h-[72vh] rounded-[18px] overflow-hidden border border-white/[0.08] shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src="/images/hero_developer.jpg"
          alt="Developer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent" />
      </div>

      {/* Content Block */}
      <div
        ref={contentRef}
        className="absolute left-[54vw] top-[22vh] w-[40vw]"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Label */}
        <span ref={labelRef} className="section-label block mb-6">
          Software Engineer & Founder
        </span>

        {/* Headline */}
        <h1 ref={headlineRef} className="headline-xl mb-6">
          <span className="word inline-block">Backend-first</span>{' '}
          <span className="word inline-block">systems.</span>{' '}
          <span className="word inline-block text-[#2D6BFF]">Built</span>{' '}
          <span className="word inline-block text-[#2D6BFF]">to</span>{' '}
          <span className="word inline-block text-[#2D6BFF]">scale.</span>
        </h1>

        {/* Subheadline */}
        <p ref={subheadRef} className="body-text max-w-md mb-10">
          I design reliable APIs, data pipelines, and infrastructure that keep products fast as they grow.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex items-center gap-4">
          <button onClick={scrollToWork} className="btn-primary flex items-center gap-2 group">
            View case studies
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button onClick={scrollToContact} className="btn-secondary flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Start a project
          </button>
        </div>
      </div>
    </section>
  );
}
