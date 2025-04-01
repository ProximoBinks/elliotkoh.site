import React, { useState } from 'react';
import Head from 'next/head';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });
      window.location.href = '/success';
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="font-semibold">
      <Head>
        <title>Get in touch — Elliot Koh</title>
      </Head>

      <div className="max-w-4xl mx-auto pt-[5rem] xl:pt-[10rem] px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 shadow-xl ring-1 ring-gray-100">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-gray-600 text-center mb-8">
              I'd love to hear from you. Send me a message and I'll respond as soon as possible.
            </p>

            <form name="contact" onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="form-name" value="contact" />

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
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#8fb4dc] focus:border-transparent transition duration-200 ease-in-out text-gray-900 text-base placeholder:text-gray-400 font-normal"
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
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#8fb4dc] focus:border-transparent transition duration-200 ease-in-out text-gray-900 text-base placeholder:text-gray-400 font-normal"
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
                  className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#8fb4dc] focus:border-transparent transition duration-200 ease-in-out text-gray-900 text-base placeholder:text-gray-400 resize-none font-normal"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="relative inline-flex items-center justify-center px-8 py-3 bg-[#8fb4dc] hover:bg-[#7999ba] text-white font-semibold rounded-xl transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8fb4dc] shadow-md hover:shadow-lg group"
                >
                  <span className="relative">Send Message</span>
                  <svg 
                    className="ml-2 h-5 w-5 transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
