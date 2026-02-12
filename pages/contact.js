import React, { useState } from 'react';
import Head from 'next/head';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
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
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  return (
    <div className="font-semibold">
      <Head>
        <title>Get in touch — Elliot Koh</title>
      </Head>

      <div className="max-w-4xl mx-auto pt-[5rem] xl:pt-[10rem] px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 shadow-xl ring-1 ring-gray-100 mb-5">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-gray-600 text-center mb-8">
              I'd love to hear from you. Send me a message and I'll respond as soon as possible.
            </p>

            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                <p className="text-gray-600 mb-6">Thank you for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-[#8fb4dc] hover:text-[#7999ba] font-semibold transition-colors duration-200"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form name="contact" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                      Name<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      onChange={handleChange}
                      value={formData.name}
                      disabled={status === 'sending'}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#8fb4dc] focus:border-transparent transition duration-200 ease-in-out text-gray-900 text-base placeholder:text-gray-400 font-normal disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                      Email<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      onChange={handleChange}
                      value={formData.email}
                      disabled={status === 'sending'}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#8fb4dc] focus:border-transparent transition duration-200 ease-in-out text-gray-900 text-base placeholder:text-gray-400 font-normal disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                    Message<span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    required
                    onChange={handleChange}
                    value={formData.message}
                    disabled={status === 'sending'}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#8fb4dc] focus:border-transparent transition duration-200 ease-in-out text-gray-900 text-base placeholder:text-gray-400 resize-none font-normal disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm font-normal">
                    {errorMsg}
                  </div>
                )}

                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="relative inline-flex items-center justify-center px-8 py-3 bg-[#8fb4dc] hover:bg-[#7999ba] text-white font-semibold rounded-xl transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8fb4dc] shadow-md hover:shadow-lg group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <span className="relative">Send Message</span>
                        <svg 
                          className="ml-2 h-5 w-5 transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
