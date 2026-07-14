import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SEO from '../components/SEO';

const TOPICS = ['project', 'collab', 'question', 'just saying hi'];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '', // honeypot — humans never see or fill this
  });
  const [topic, setTopic] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [adlTime, setAdlTime] = useState('');

  // live Adelaide clock in the info rail
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-AU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Australia/Adelaide',
    });
    const tick = () => setAdlTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: topic ? `[${topic}] ${formData.message}` : formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '', website: '' });
      setTopic(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  const inputClass =
    'block w-full px-0 py-3 bg-transparent border-0 border-b border-[#c9c9c1]/20 focus:border-[#8fb4dc] focus:ring-0 transition duration-300 ease-in-out text-[#ebecf0] text-base placeholder:text-[#787673]/50 font-normal outline-none disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className="font-semibold">
      <SEO
        title="Get in Touch"
        description="Have a project idea or just want to say hello? Get in touch with Elliot Koh — I'd love to hear from you."
      />

      <div className="mt-[5rem] xl:mt-[10rem] bg-[#080807] rounded-tl-[1.6rem] rounded-tr-[1.6rem] min-h-screen relative overflow-hidden">
        {/* quiet atmosphere, same palette as the rest of the site */}
        <div
          aria-hidden="true"
          className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(143,180,220,0.08) 0%, rgba(143,180,220,0) 70%)' }}
        />

        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 py-16 md:py-20 relative">
          <div className="text-[#96928e] text-sm tracking-wider opacity-70 font-bold mb-6">(CONTACT)</div>
          <h1 className="uppercase text-[clamp(2.5rem,7vw,5rem)] lg:text-[clamp(4rem,5vw,7rem)] font-bold leading-[0.9] tracking-tight text-[#c9c9c1] mb-6">
            GET IN<br />TOUCH<span className="text-[#8fb4dc]">.</span>
          </h1>

          <div className="flex items-center gap-3 mb-14">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4ade80]"></span>
            </span>
            <span className="font-mono text-[11px] md:text-xs tracking-[0.2em] text-[#787673] uppercase">
              usually replies within 12 hours
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-14 lg:gap-20">
            {/* ── info rail ─────────────────────────────── */}
            <div className="space-y-10 lg:border-r lg:border-[#c9c9c1]/10 lg:pr-14 h-fit">
              <div>
                <div className="text-[#96928e] text-sm tracking-wider opacity-70 font-bold mb-3">(EMAIL)</div>
                <a
                  href="mailto:elliotkoh.dev@gmail.com"
                  className="text-[#bdbdb4] hover:text-[#8fb4dc] transition-colors duration-300 text-base md:text-lg break-all"
                >
                  elliotkoh.dev@gmail.com
                </a>
              </div>

              <div>
                <div className="text-[#96928e] text-sm tracking-wider opacity-70 font-bold mb-3">(ELSEWHERE)</div>
                <div className="flex flex-col gap-2 text-base md:text-lg">
                  <Link
                    href="https://instagram.com/elliotkohdev"
                    target="_blank"
                    className="text-[#bdbdb4] hover:text-[#8fb4dc] transition-colors duration-300 w-fit"
                  >
                    instagram — @elliotkohdev
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/elliotkoh1/"
                    target="_blank"
                    className="text-[#bdbdb4] hover:text-[#8fb4dc] transition-colors duration-300 w-fit"
                  >
                    linkedin — elliotkoh1
                  </Link>
                  <Link
                    href="https://github.com/proximobinks"
                    target="_blank"
                    className="text-[#bdbdb4] hover:text-[#8fb4dc] transition-colors duration-300 w-fit"
                  >
                    github — proximobinks
                  </Link>
                </div>
              </div>

              <div>
                <div className="text-[#96928e] text-sm tracking-wider opacity-70 font-bold mb-3">(BASE)</div>
                <p className="text-[#bdbdb4] text-base md:text-lg">Adelaide, Australia</p>
                <div className="font-mono text-[11px] md:text-xs tracking-[0.2em] text-[#787673] mt-2">
                  34.93°S 138.60°E
                  {adlTime && (
                    <>
                      {' — '}
                      <span className="text-[#8fb4dc] tabular-nums">{adlTime}</span> local
                    </>
                  )}
                </div>
              </div>

              <div className="hidden lg:block pt-2 border-t border-[#c9c9c1]/10">
                <div className="font-mono text-[11px] tracking-[0.2em] text-[#5f5d59] pt-6">
                  ROUTE: ADL ✈ TYO — EN ROUTE
                </div>
              </div>
            </div>

            {/* ── form ──────────────────────────────────── */}
            <div>
              {status === 'success' ? (
                <div className="py-6">
                  <div className="relative flex h-4 w-4 mb-8">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8fb4dc] opacity-50"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#8fb4dc]"></span>
                  </div>
                  <h2 className="uppercase text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight text-[#c9c9c1] mb-4">
                    MESSAGE<br />SENT<span className="text-[#8fb4dc]">.</span>
                  </h2>
                  <p className="font-mono text-[11px] md:text-xs tracking-[0.2em] text-[#787673] mb-3 uppercase">
                    delivered — expect a reply within 12 hours
                  </p>
                  <p className="text-[#787673] text-base md:text-lg font-semibold mb-10 max-w-[420px]">
                    Thanks for reaching out. A confirmation is on its way to your inbox.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="uppercase text-sm px-6 py-3 border border-[#c9c9c1]/30 text-[#c9c9c1] rounded-full font-bold transition-all duration-300 ease-in-out hover:bg-[#8fb4dc] hover:border-[#8fb4dc] hover:text-white"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form name="contact" onSubmit={handleSubmit} className="space-y-8">
                  {/* Honeypot field — hidden from humans, bots fill it in */}
                  <div aria-hidden="true" className="absolute w-px h-px overflow-hidden -left-[9999px]">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      tabIndex={-1}
                      autoComplete="off"
                      onChange={handleChange}
                      value={formData.website}
                    />
                  </div>

                  <div>
                    <div className="text-[#96928e] text-sm tracking-wider uppercase font-bold mb-3">
                      What&rsquo;s this about?
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {TOPICS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTopic(topic === t ? null : t)}
                          disabled={status === 'sending'}
                          className={`px-4 py-2 rounded-full border text-sm font-bold transition-all duration-300 ${
                            topic === t
                              ? 'border-[#8fb4dc] bg-[#8fb4dc]/10 text-[#8fb4dc]'
                              : 'border-[#c9c9c1]/20 text-[#787673] hover:border-[#c9c9c1]/50 hover:text-[#bdbdb4]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-[#96928e] text-sm tracking-wider uppercase font-bold mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        maxLength={100}
                        onChange={handleChange}
                        value={formData.name}
                        disabled={status === 'sending'}
                        className={inputClass}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[#96928e] text-sm tracking-wider uppercase font-bold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        maxLength={254}
                        onChange={handleChange}
                        value={formData.email}
                        disabled={status === 'sending'}
                        className={inputClass}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <label htmlFor="message" className="block text-[#96928e] text-sm tracking-wider uppercase font-bold">
                        Message
                      </label>
                      <span className="font-mono text-[10px] tracking-[0.15em] text-[#5f5d59] tabular-nums">
                        {formData.message.length} / 5000
                      </span>
                    </div>
                    <textarea
                      name="message"
                      id="message"
                      rows="6"
                      required
                      maxLength={5000}
                      onChange={handleChange}
                      value={formData.message}
                      disabled={status === 'sending'}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell me about it..."
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm font-normal">
                      {errorMsg}
                    </div>
                  )}

                  <div className="pt-2 flex items-center gap-6">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="uppercase text-base sm:text-lg px-8 py-4 border border-[#c9c9c1]/30 text-[#c9c9c1] rounded-full font-bold transition-all duration-300 ease-in-out hover:bg-[#8fb4dc] hover:border-[#8fb4dc] hover:text-white hover:px-10 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-[#c9c9c1]/30 disabled:hover:text-[#c9c9c1] disabled:hover:px-8"
                    >
                      {status === 'sending' ? 'Sending...' : 'Send message'}
                    </button>
                    {status === 'sending' && (
                      <span className="font-mono text-[11px] tracking-[0.2em] text-[#787673] uppercase animate-pulse">
                        transmitting…
                      </span>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
