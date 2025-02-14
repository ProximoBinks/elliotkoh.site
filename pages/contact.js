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
      // Handle success
      window.location.href = '/success';
    } catch (error) {
      // Handle error
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Get in touch — Elliot Koh</title>
      </Head>

      {/* Added mx-auto to keep it centered with proper spacing */}
      <div className="bg-black bg-opacity-50 rounded-lg p-8 mx-auto px-4 sm:px-6 w-full max-w-4xl shadow-lg mt-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-white">Contact Me</h1>

        <form name="contact" onSubmit={handleSubmit} className="space-y-8">
          <input type="hidden" name="form-name" value="contact" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold text-white">
                Name<span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                onChange={handleChange}
                value={formData.name}
                className="mt-1 block w-full border-gray-400 bg-gray-700 bg-opacity-50 text-white rounded-md shadow-sm p-3 focus:bg-gray-800 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-white">
                Email<span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                onChange={handleChange}
                value={formData.email}
                className="mt-1 block w-full border-gray-400 bg-gray-700 bg-opacity-50 text-white rounded-md shadow-sm p-3 focus:bg-gray-800 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-semibold text-white">
              Message<span className="text-red-400">*</span>
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              required
              onChange={handleChange}
              value={formData.message}
              className="mt-1 block w-full border-gray-400 bg-gray-700 bg-opacity-50 text-white rounded-md shadow-sm p-3 focus:bg-gray-800 focus:border-blue-400 focus:ring-blue-400"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto transition-all py-3 px-6 bg-[#8fb4dc] hover:bg-[#7999ba] focus:ring-blue-500 text-white font-semibold rounded-3xl hover:px-8 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
