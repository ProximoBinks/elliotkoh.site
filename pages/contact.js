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

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Get in touch — Elliot Koh</title>
      </Head>
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-800">Contact Me</h1>
      <form name="contact" method="POST" data-netlify="true" className="space-y-8">
        <input type="hidden" name="form-name" value="contact" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Name<span className="text-red-500">*</span></label>
            <input type="text" name="name" id="name" required onChange={handleChange} value={formData.name} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email<span className="text-red-500">*</span></label>
            <input type="email" name="email" id="email" required onChange={handleChange} value={formData.email} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:border-blue-500 focus:ring-blue-500" />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-lg font-semibold text-gray-700">Message<span className="text-red-500">*</span></label>
          <textarea name="message" id="message" rows="4" required onChange={handleChange} value={formData.message} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:border-blue-500 focus:ring-blue-500"></textarea>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="w-full sm:w-auto transition-all py-3 px-6 bg-[#8fb4dc] hover:bg-[#7999ba] focus:ring-blue-500 focus:ring-offset-2 text-white font-semibold rounded-3xl hover:px-8 shadow-lg shadow-[#8fb4dc]/50 hover:shadow-[#7999ba]/50 focus:outline-none focus:ring-2">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
