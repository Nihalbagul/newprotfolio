import { useState } from 'react';
import { motion } from 'framer-motion';

import { trackEvent } from '../utils/analytics';

const NewsletterSignup = ({ className = "" }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // Validate email
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      // Here you would integrate with your email service (Mailchimp, ConvertKit, etc.)
      // For now, we'll simulate an API call
      
      // Example: Using EmailJS or your backend API
      // await emailjs.send('newsletter_service', 'newsletter_template', { email });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Track newsletter signup
      trackEvent('newsletter_signup', { email });
      
      setStatus('success');
      setMessage('Thank you for subscribing! Check your email for confirmation.');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
      console.error('Newsletter signup error:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`newsletter-signup ${className}`}
    >
      <div className="relative p-6 rounded-xl bg-gradient-to-br from-black-50 to-black-100 border border-white/10 backdrop-blur-sm max-w-2xl mx-auto">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-white mb-1">Stay Updated</h3>
          <p className="text-gray-400 text-xs">
            Get the latest updates on my projects, articles, and tech insights
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all"
              required
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-5 py-2 text-sm rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm text-center ${
                status === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message}
            </motion.p>
          )}
        </form>

        <p className="text-xs text-gray-500 text-center mt-2">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </motion.div>
  );
};

export default NewsletterSignup;

