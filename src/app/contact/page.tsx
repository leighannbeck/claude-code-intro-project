"use client"

import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual form submission
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 min-h-screen py-12">
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,currentColor_10px,currentColor_20px)]"></div>

      <div className="container mx-auto px-4 max-w-4xl relative">
        <h1 className="text-5xl font-bold text-white mb-8 text-center drop-shadow-lg">
          ♣ Contact Us ♦
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Get in Touch */}
          <div className="bg-white rounded-xl shadow-2xl p-8 border-8 border-blue-700 relative">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-red-600 rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-blue-600 rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-blue-600 rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-red-600 rounded-br-xl"></div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center border-b-4 border-blue-600 pb-3">
              ♠ Get in Touch ♥
            </h2>
            <p className="text-gray-900 mb-6 font-medium">
              Have questions, feedback, or suggestions? We&apos;d love to hear from you! Fill out the form and we&apos;ll get back to you as soon as possible.
            </p>

            <div className="space-y-4">
              <div className="flex items-start bg-blue-50 p-4 rounded-lg border-2 border-blue-600">
                <div className="bg-blue-600 rounded-full p-2 mr-4 shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-blue-900">Email</h3>
                  <p className="text-gray-900 font-medium">support@pinochle-online.com</p>
                </div>
              </div>

              <div className="flex items-start bg-green-50 p-4 rounded-lg border-2 border-green-600">
                <div className="bg-green-600 rounded-full p-2 mr-4 shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-green-900">Response Time</h3>
                  <p className="text-gray-900 font-medium">Within 24-48 hours</p>
                </div>
              </div>

              <div className="flex items-start bg-red-50 p-4 rounded-lg border-2 border-red-600">
                <div className="bg-red-600 rounded-full p-2 mr-4 shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-red-900">Support</h3>
                  <p className="text-gray-900 font-medium">Available 7 days a week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Common Questions */}
          <div className="bg-white rounded-xl shadow-2xl p-8 border-8 border-red-700 relative">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-blue-600 rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-red-600 rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-red-600 rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-blue-600 rounded-br-xl"></div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center border-b-4 border-red-600 pb-3">
              ♦ Common Questions ♣
            </h2>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-600">
                <h3 className="font-bold text-blue-900 mb-1">How do I create an account?</h3>
                <p className="text-gray-900 font-medium text-sm">Click the &quot;Sign Up&quot; button in the navigation bar and follow the registration process.</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-600">
                <h3 className="font-bold text-green-900 mb-1">Is Pinochle Online free?</h3>
                <p className="text-gray-900 font-medium text-sm">Yes! Creating an account and playing games is completely free.</p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-600">
                <h3 className="font-bold text-red-900 mb-1">Can I play with friends?</h3>
                <p className="text-gray-900 font-medium text-sm">Absolutely! You can create private game rooms and invite your friends to join.</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-600">
                <h3 className="font-bold text-yellow-900 mb-1">I&apos;m new to Pinochle. Where do I start?</h3>
                <p className="text-gray-900 font-medium text-sm">Check out our &quot;How to Play&quot; guide for beginners, and visit the Rules page for detailed information.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-2xl p-10 border-8 border-green-700 relative">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-blue-600 rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-red-600 rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-red-600 rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-blue-600 rounded-br-xl"></div>

          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center border-b-4 border-green-600 pb-4">
            ♥ Send us a Message ♠
          </h2>

          {submitted ? (
            <div className="bg-green-100 border-4 border-green-600 rounded-xl p-8 text-center shadow-lg">
              <svg className="w-20 h-20 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-900 font-medium text-lg">Your message has been sent successfully. We&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 font-medium shadow"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 font-medium shadow"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-gray-900 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 font-medium shadow"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="account">Account Issues</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 resize-none font-medium shadow"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-4 rounded-lg transition border-4 border-green-900 shadow-2xl text-lg"
              >
                ♦ Send Message ♣
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
