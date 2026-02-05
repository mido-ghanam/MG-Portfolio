import { useEffect, useState } from 'react';

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setIsVisible(scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div
        className={`mx-6 my-4 px-6 py-3 rounded-2xl transition-all duration-300 ${
          isScrolled ? 'bg-[#070A12]/90 backdrop-blur-xl border border-white/5' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#2D6BFF]" />
            <span className="font-display font-bold text-lg text-[#F4F6FF]">Neux</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('system')}
              className="text-sm text-[#A7B1C8] hover:text-[#F4F6FF] transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection('stack')}
              className="text-sm text-[#A7B1C8] hover:text-[#F4F6FF] transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="text-sm text-[#A7B1C8] hover:text-[#F4F6FF] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm text-[#A7B1C8] hover:text-[#F4F6FF] transition-colors"
            >
              Contact
            </button>
          </div>

          {/* CTA */}
          <button
            onClick={() => scrollToSection('contact')}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-[#2D6BFF]/10 text-[#2D6BFF] border border-[#2D6BFF]/30 hover:bg-[#2D6BFF]/20 transition-all"
          >
            Start a project
          </button>
        </div>
      </div>
    </nav>
  );
}
