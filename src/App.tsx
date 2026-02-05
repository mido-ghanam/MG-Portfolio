import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/Navigation';
import { HeroSection } from './sections/HeroSection';
import { FeatureSection } from './sections/FeatureSection';
import { ContactSection } from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

// Feature sections data
const featureSections = [
  {
    id: 'system',
    label: 'System Design',
    headline: 'Design for clarity',
    body: 'I map domains, define boundaries, and build APIs that stay predictable under load—so teams ship faster with fewer surprises.',
    caption: 'Architecture notes → data models → implementation.',
    imageSrc: '/images/system_server.jpg',
    layout: 'left' as const,
    zIndex: 20,
    chartType: 'mixed' as const,
  },
  {
    id: 'stack',
    label: 'Stack & Tooling',
    headline: 'Tools that stay out of the way',
    body: 'TypeScript, Node, PostgreSQL, Redis, Kafka. Clean contracts, strong types, and observability by default.',
    caption: 'From local DX to production telemetry.',
    imageSrc: '/images/stack_keyboard.jpg',
    layout: 'right' as const,
    zIndex: 30,
    chartType: 'bars' as const,
  },
  {
    id: 'cloud',
    label: 'Infrastructure',
    headline: 'Observable. Resilient. Cost-aware.',
    body: 'Terraform-managed resources, structured logging, tracing, and alerting—so when things break, we know exactly where to look.',
    caption: 'Multi-cloud ready, but not multi-cloud for the sake of it.',
    imageSrc: '/images/cloud_monitoring.jpg',
    layout: 'left' as const,
    zIndex: 40,
    chartType: 'line' as const,
  },
  {
    id: 'process',
    label: 'Process',
    headline: 'Small iterations. Big outcomes.',
    body: 'I break complex work into shippable milestones—clear specs, reviewable PRs, and feedback loops that keep the product moving.',
    caption: 'Docs first. Tests second. Code third.',
    imageSrc: '/images/process_whiteboard.jpg',
    layout: 'right' as const,
    zIndex: 50,
    chartType: 'mixed' as const,
  },
  {
    id: 'security',
    label: 'Security',
    headline: 'Safe by default',
    body: 'Auth flows, secrets management, input validation, and least-privilege access—built in from day one, not bolted on later.',
    caption: 'Compliance-friendly patterns without the productivity tax.',
    imageSrc: '/images/security_lock.jpg',
    layout: 'left' as const,
    zIndex: 60,
    chartType: 'bars' as const,
  },
  {
    id: 'results',
    label: 'Results',
    headline: 'Impact you can measure',
    body: 'Lower latency. Higher throughput. Fewer incidents. I ship systems that make teams faster and customers happier.',
    caption: "Let's build the next version.",
    imageSrc: '/images/results_code.jpg',
    layout: 'right' as const,
    zIndex: 70,
    chartType: 'line' as const,
  },
];

function App() {
  const mainRef = useRef<HTMLElement>(null);
  const snapTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      snapTriggerRef.current = ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (snapTriggerRef.current) {
        snapTriggerRef.current.kill();
      }
    };
  }, []);

  // Cleanup all ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      {/* Overlays */}
      <div className="grain-overlay" />
      <div className="vignette-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main ref={mainRef} className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Feature Sections */}
        {featureSections.map((section) => (
          <FeatureSection key={section.id} {...section} />
        ))}

        {/* Contact Section */}
        <ContactSection />
      </main>
    </>
  );
}

export default App;
