import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, BarChart3, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeatureSectionProps {
  id: string;
  label: string;
  headline: string;
  body: string;
  caption: string;
  imageSrc: string;
  layout: 'left' | 'right';
  zIndex: number;
  chartType?: 'bars' | 'line' | 'mixed';
}

export function FeatureSection({
  id,
  label,
  headline,
  body,
  caption,
  imageSrc,
  layout,
  zIndex,
  chartType = 'mixed',
}: FeatureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isLeft = layout === 'left';
      const panelStartX = isLeft ? '-60vw' : '60vw';
      const panelEndX = isLeft ? '-18vw' : '18vw';
      const imageStartX = isLeft ? '60vw' : '-60vw';
      const imageEndX = isLeft ? '18vw' : '-18vw';
      const rotateStart = isLeft ? 22 : -18;
      const rotateEnd = isLeft ? -10 : 10;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Panel animation (ENTRANCE 0-30%, SETTLE 30-70%, EXIT 70-100%)
      scrollTl.fromTo(
        panelRef.current,
        { x: panelStartX, rotateY: rotateStart, opacity: 0 },
        { x: 0, rotateY: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.to(
        panelRef.current,
        { x: panelEndX, rotateY: rotateEnd, opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Image animation
      scrollTl.fromTo(
        imageRef.current,
        { x: imageStartX, scale: 0.92, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.to(
        imageRef.current,
        { x: imageEndX, scale: 1.04, opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Text animation
      scrollTl.fromTo(
        textRef.current?.children || [],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
        0.05
      );
      scrollTl.to(
        textRef.current?.children || [],
        { y: -12, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [layout]);

  const isLeft = layout === 'left';

  return (
    <section
      ref={sectionRef}
      id={id}
      className="pinned-section"
      style={{ zIndex, background: '#070A12' }}
    >
      {/* Label */}
      <span
        className="absolute section-label"
        style={{
          left: isLeft ? '6vw' : '54vw',
          top: '10vh',
        }}
      >
        {label}
      </span>

      {/* Dashboard Panel */}
      <div
        ref={panelRef}
        className="absolute glass-card p-8 perspective-container"
        style={{
          left: isLeft ? '6vw' : '54vw',
          top: '16vh',
          width: isLeft ? '44vw' : '40vw',
          height: '68vh',
          willChange: 'transform, opacity',
        }}
      >
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(244,246,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(244,246,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content */}
        <div ref={textRef} className="relative z-10 h-full flex flex-col">
          <h2 className="headline-lg mb-6">{headline}</h2>
          <p className="body-text mb-8 flex-1">{body}</p>

          {/* Chart Widget */}
          <div className="mt-auto">
            <div className="flex items-end gap-2 h-24 mb-4">
              {chartType === 'bars' && (
                <>
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-[#2D6BFF]/60 to-[#2D6BFF]/20 rounded-t chart-pulse"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </>
              )}
              {chartType === 'line' && (
                <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                  <path
                    d="M0,60 Q25,50 50,45 T100,35 T150,40 T200,20"
                    fill="none"
                    stroke="#2D6BFF"
                    strokeWidth="2"
                    className="chart-pulse"
                  />
                  <path
                    d="M0,60 Q25,50 50,45 T100,35 T150,40 T200,20 L200,80 L0,80 Z"
                    fill="url(#gradient)"
                    opacity="0.2"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2D6BFF" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
              {chartType === 'mixed' && (
                <div className="flex items-center gap-6 w-full">
                  <div className="flex-1 flex items-end gap-1 h-full">
                    {[35, 55, 40, 70, 50, 85, 65].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-[#2D6BFF]/30 rounded-t chart-pulse"
                        style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                  <div className="w-px h-full bg-white/10" />
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <TrendingUp className="w-6 h-6 text-[#2D6BFF] mx-auto mb-1" />
                      <span className="text-xs text-[#A7B1C8]">+127%</span>
                    </div>
                    <div className="text-center">
                      <BarChart3 className="w-6 h-6 text-[#2D6BFF] mx-auto mb-1" />
                      <span className="text-xs text-[#A7B1C8]">99.9%</span>
                    </div>
                    <div className="text-center">
                      <Activity className="w-6 h-6 text-[#2D6BFF] mx-auto mb-1" />
                      <span className="text-xs text-[#A7B1C8]">&lt;50ms</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-[#A7B1C8]/70 font-mono">{caption}</p>
          </div>
        </div>
      </div>

      {/* Image Card */}
      <div
        ref={imageRef}
        className="absolute rounded-[18px] overflow-hidden border border-white/[0.08] shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
        style={{
          left: isLeft ? '54vw' : '6vw',
          top: '16vh',
          width: isLeft ? '40vw' : '40vw',
          height: '68vh',
          willChange: 'transform, opacity',
        }}
      >
        <img src={imageSrc} alt={label} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A12]/60 via-transparent to-transparent" />
      </div>
    </section>
  );
}
