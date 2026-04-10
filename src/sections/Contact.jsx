import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import emailjs from "@emailjs/browser";

import TitleHeader from "../components/TitleHeader";
import Toast from "../components/Toast";
import { trackFormSubmission } from "../utils/analytics";
import { emailAddress, linkedinProfile, phoneNumber } from "../../constants";

// Lightweight field with floating label — no per-focus particle explosions
const FloatingLabelInput = ({ id, name, label, type = "text", value, onChange, placeholder, required, isTextarea = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = value && value.length > 0;
  const isActive = isFocused || hasValue;

  return (
    <div className="premium-form-field">
      <div className={`premium-field-border ${isFocused ? 'focused' : ''}`} />
      {/* Single CSS glow replaces 8 animated divs */}
      <div className={`premium-field-glow ${isFocused ? 'active' : ''}`} />

      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused && !hasValue ? placeholder : ""}
          required={required}
          className="premium-input premium-textarea"
          rows="5"
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused && !hasValue ? placeholder : ""}
          required={required}
          className="premium-input"
        />
      )}

      <motion.label
        htmlFor={id}
        className="premium-label"
        animate={{
          y: isActive ? -35 : 0,
          scale: isActive ? 0.85 : 1,
          x: isActive ? -8 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {label}
      </motion.label>

      <motion.div
        className="premium-field-underline"
        animate={{ scaleX: isFocused ? 1 : 0, opacity: isFocused ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />
    </div>
  );
};

// Button with single shine sweep instead of 15 orbiting particles
const PremiumButton = ({ loading }) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.button
      ref={buttonRef}
      type="submit"
      className="premium-submit-button"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
      disabled={loading}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="premium-button-bg" />
      <div className="premium-button-glow" />

      {/* Single sweep shine — replaces 15 looping particles */}
      <motion.div
        className="premium-button-shine"
        animate={isHovered ? { x: ["-100%", "200%"] } : { x: "-100%" }}
        transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0, repeatDelay: 0.4, ease: "easeInOut" }}
      />

      <span className="premium-button-text">
        {loading ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{ display: "inline-block", marginRight: "10px" }}
            >
              ⚡
            </motion.span>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <motion.span
              animate={isHovered ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{ display: "inline-block", marginLeft: "10px" }}
            >
              →
            </motion.span>
          </>
        )}
      </span>
    </motion.button>
  );
};

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const showToast = (message, type = "success") => setToast({ isVisible: true, message, type });
  const hideToast = () => setToast((t) => ({ ...t, isVisible: false }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setForm({ name: "", email: "", message: "" });
      showToast("Message sent successfully! I'll get back to you soon.", "success");
      trackFormSubmission("contact_form");
    } catch (error) {
      console.error("EmailJS Error:", error);
      showToast("Failed to send message. Please try again or contact me directly.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="premium-contact-section">
      <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={hideToast} />

      <div className="premium-contact-bg">
        <div className="premium-contact-gradient-1" />
        <div className="premium-contact-gradient-2" />
        <div className="premium-contact-particles" />
        <div className="premium-contact-grid" />
      </div>

      <div className="premium-contact-container">
        <motion.div
          className="premium-contact-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <TitleHeader
            title="Get in Touch – Let's Connect"
            Sub="Have questions or ideas? Let's talk!"
          />
        </motion.div>

        <motion.div
          className="premium-form-container-centered"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="premium-form-card">
            <div className="premium-form-glow" />
            <div className="premium-form-border" />
            <motion.div
              className="premium-form-shine"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
            />

            <form ref={formRef} onSubmit={handleSubmit} className="premium-form">
              <FloatingLabelInput
                id="name" name="name" label="Your Name" type="text"
                value={form.name} onChange={handleChange}
                placeholder="What's your good name?" required
              />
              <FloatingLabelInput
                id="email" name="email" label="Your Email" type="email"
                value={form.email} onChange={handleChange}
                placeholder="What's your email address?" required
              />
              <FloatingLabelInput
                id="message" name="message" label="Your Message"
                value={form.message} onChange={handleChange}
                placeholder="How can I help you?" required isTextarea
              />
              <PremiumButton loading={loading} />
            </form>
          </div>

          {/* Direct contact strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 text-center"
          >
            <p className="text-white/40 text-sm mb-5 tracking-wide uppercase">Or reach me directly</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                {
                  label: `Email: ${emailAddress}`,
                  href: `mailto:${emailAddress}`,
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: linkedinProfile,
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  label: "GitHub",
                  href: "https://github.com/nihalbagul",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  ),
                },
                {
                  label: `WhatsApp: ${phoneNumber}`,
                  href: "https://wa.me/916355203029",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                  ),
                },
              ].map(({ label, href, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white/70 hover:text-white transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
                  whileHover={{ scale: 1.06, background: "rgba(139, 92, 246, 0.15)", borderColor: "rgba(139, 92, 246, 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  {icon}
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
