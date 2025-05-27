import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import Layout from "@/components/Layout";

const ContactUs = () => {
  return (
    <Layout>
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl font-bold text-homentor-blue relative inline-block">
              Get in Touch
              <span className="absolute -z-10 bottom-1 left-0 w-full h-3 bg-homentor-lightGold opacity-40"></span>
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              We’d love to hear from you! Whether you’re a student, parent, or
              mentor – drop us a message.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 mt-16">
            {/* Contact Form */}
            <ScrollReveal>
              <form className="bg-gray-50 p-8 rounded-xl shadow-md border border-gray-100 space-y-6">
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-homentor-blue outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-homentor-blue outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">
                    Message
                  </label>
                  <textarea
                    placeholder="Write your message here..."
                    
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-homentor-blue outline-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-homentor-blue text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal delay={0.2}>
              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="text-xl font-semibold text-homentor-blue">
                    Our Office
                  </h3>
                  <p>
                    Webbolster HQ
                    <br />
                    123 Mentor Lane
                    <br />
                    Mumbai, India
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-homentor-blue">
                    Email
                  </h3>
                  <p>
                    <a
                      href="mailto:info@webbolster.com"
                      className="text-homentor-blue underline"
                    >
                      info@webbolster.com
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-homentor-blue">
                    Phone
                  </h3>
                  <p>
                    <a
                      href="tel:+919999999999"
                      className="text-homentor-blue underline"
                    >
                      +91 99999 99999
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-homentor-blue">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    <a href="#" className="hover:text-homentor-blue transition">
                      Facebook
                    </a>
                    <a href="#" className="hover:text-homentor-blue transition">
                      Twitter
                    </a>
                    <a href="#" className="hover:text-homentor-blue transition">
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactUs;
