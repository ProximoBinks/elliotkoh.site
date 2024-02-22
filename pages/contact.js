import React, { useState } from 'react';
import Head from 'next/head';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Function to update state for each input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the form submission, e.g., sending data to a server
    console.log(formData);

    // Reset form or show a success message
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Get in touch — Elliot Koh</title>
      </Head>
      <h1 className="text-3xl font-bold text-center mb-4">Contact Me</h1>
      <form onSubmit={handleSubmit} className="space-y-6 font-bold text-lg text-black">
        <div>
          <label htmlFor="name" className="block">Name<span className="text-3xl text-error text-[#9e2121] pl-1 asterisk">*</span></label>
          <input type="text" name="name" id="name" required onChange={handleChange} value={formData.name} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label htmlFor="email" className="block">Email<span className="text-3xl text-error text-[#9e2121] pl-1 asterisk">*</span></label>
          <input type="email" name="email" id="email" required onChange={handleChange} value={formData.email} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label htmlFor="message" className="block">Message<span className="text-3xl text-error text-[#9e2121] pl-1 asterisk">*</span></label>
          <textarea name="message" id="message" rows="4" required onChange={handleChange} value={formData.message} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>
        <div>
          <button type="submit" className="transition py-2 px-4 bg-[#8fb4dc] text-black font-semibold rounded-lg shadow-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
