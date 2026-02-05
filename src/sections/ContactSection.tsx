import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Calendar, Globe, Send, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const contactCards = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@neux.dev',
      href: 'mailto:hello@neux.dev',
    },
    {
      icon: Calendar,
      label: 'Availability',
      value: 'Booking new work for Q2',
      href: '#',
    },
    {
      icon: Globe,
      label: 'Location',
      value: 'Remote / UTC-5 to UTC+2',
      href: '#',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-24"
      style={{ background: '#070A12', zIndex: 90 }}
    >
      <div className="px-[6vw]">
        {/* Headline Block */}
        <div ref={headlineRef} className="max-w-2xl mb-16">
          <h2 className="headline-lg mb-6">Let's build something reliable.</h2>
          <p className="body-text">
            Tell me what you're shipping. I'll respond within 2 business days.
          </p>
        </div>

        {/* Contact Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactCards.map((card, index) => (
            <a
              key={index}
              href={card.href}
              className="glass-card p-6 group hover:border-[#2D6BFF]/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#2D6BFF]/10 flex items-center justify-center">
                  <card.icon className="w-5 h-5 text-[#2D6BFF]" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#A7B1C8] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-[#A7B1C8] font-mono uppercase tracking-wider mb-2">
                {card.label}
              </p>
              <p className="text-[#F4F6FF] font-medium">{card.value}</p>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="glass-card p-8 max-w-2xl"
        >
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#2D6BFF]/20 flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-[#2D6BFF]" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#F4F6FF] mb-2">
                Message sent!
              </h3>
              <p className="text-[#A7B1C8]">
                Thanks for reaching out. I'll get back to you soon.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs text-[#A7B1C8] font-mono uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F4F6FF] placeholder:text-[#A7B1C8]/50 focus:outline-none focus:border-[#2D6BFF]/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A7B1C8] font-mono uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F4F6FF] placeholder:text-[#A7B1C8]/50 focus:outline-none focus:border-[#2D6BFF]/50 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-xs text-[#A7B1C8] font-mono uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F4F6FF] placeholder:text-[#A7B1C8]/50 focus:outline-none focus:border-[#2D6BFF]/50 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send message
                  </>
                )}
              </button>
            </>
          )}
        </form>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#2D6BFF]" />
              <span className="font-display font-bold text-lg text-[#F4F6FF]">Neux</span>
            </div>
            <p className="text-sm text-[#A7B1C8]">
              © 2026 Neux. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-[#A7B1C8] hover:text-[#F4F6FF] transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-sm text-[#A7B1C8] hover:text-[#F4F6FF] transition-colors">
                GitHub
              </a>
              <a href="#" className="text-sm text-[#A7B1C8] hover:text-[#F4F6FF] transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
