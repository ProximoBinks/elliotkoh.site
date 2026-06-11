import React, { useState } from 'react';
import SEO from '../components/SEO';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '', // honeypot — humans never see or fill this
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

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
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '', website: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  return (
    <div className="font-semibold">
      <SEO
        title="Get in Touch"
        description="Have a project idea or just want to say hello? Get in touch with Elliot Koh — I'd love to hear from you."
      />

      <div className="mt-[5rem] xl:mt-[10rem] bg-[#080807] rounded-tl-[1.6rem] rounded-tr-[1.6rem] min-h-screen">
        <div className="max-w-[900px] mx-auto px-6 sm:px-8 py-16 md:py-20">
          <div className="text-[#96928e] text-sm tracking-wider opacity-70 font-bold mb-6">(CONTACT)</div>
          <h1 className="uppercase text-[clamp(2.5rem,7vw,5rem)] lg:text-[clamp(4rem,5vw,7rem)] font-bold leading-[0.9] tracking-tight text-[#c9c9c1] mb-6">
            GET IN<br />TOUCH<span className="text-[#8fb4dc]">.</span>
          </h1>
          <p className="text-[#787673] text-base md:text-lg font-semibold mb-12 max-w-[500px]">
            I'd love to hear from you. Send me a message and I'll usually get back to you within 12 hours.
          </p>

          {status === 'success' ? (
            <div className="py-12">
              <h2 className="uppercase text-2xl md:text-3xl font-bold text-[#c9c9c1] mb-3">Message sent<span className="text-[#8fb4dc]">.</span></h2>
              <p className="text-[#787673] text-base md:text-lg font-semibold mb-8">Thank you for reaching out. I'll get back to you soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="text-[#8fb4dc] hover:text-white font-bold uppercase text-sm tracking-wider transition-colors duration-300"
              >
                Send another message
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
                    className="block w-full px-0 py-3 bg-transparent border-0 border-b border-[#c9c9c1]/20 focus:border-[#8fb4dc] focus:ring-0 transition duration-300 ease-in-out text-[#ebecf0] text-base placeholder:text-[#787673]/50 font-normal outline-none disabled:opacity-40 disabled:cursor-not-allowed"
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
                    className="block w-full px-0 py-3 bg-transparent border-0 border-b border-[#c9c9c1]/20 focus:border-[#8fb4dc] focus:ring-0 transition duration-300 ease-in-out text-[#ebecf0] text-base placeholder:text-[#787673]/50 font-normal outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-[#96928e] text-sm tracking-wider uppercase font-bold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  required
                  maxLength={5000}
                  onChange={handleChange}
                  value={formData.message}
                  disabled={status === 'sending'}
                  className="block w-full px-0 py-3 bg-transparent border-0 border-b border-[#c9c9c1]/20 focus:border-[#8fb4dc] focus:ring-0 transition duration-300 ease-in-out text-[#ebecf0] text-base placeholder:text-[#787673]/50 resize-none font-normal outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              {status === 'error' && (
                <div className="border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm font-normal">
                  {errorMsg}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="uppercase text-base sm:text-lg px-8 py-4 border border-[#c9c9c1]/30 text-[#c9c9c1] rounded-full font-bold transition-all duration-300 ease-in-out hover:bg-[#8fb4dc] hover:border-[#8fb4dc] hover:text-white hover:px-10 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-[#c9c9c1]/30 disabled:hover:text-[#c9c9c1] disabled:hover:px-8"
                >
                  {status === 'sending' ? 'Sending...' : 'Send message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
