'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, CheckCircle2 } from 'lucide-react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    
    const formData = new FormData(e.currentTarget)
    // Add Web3Forms access key
    // Fallback to direct key if env var is missing (fixes "Form configuration error")
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "31877434-de4c-4137-9c99-7b3bce6116d9";
    
    if (accessKey) {
        formData.append("access_key", accessKey);
        // Essential: Prevent redirect to ensure we get JSON response for the UI
        formData.append("redirect", "false"); 
        // Optional: Spam protection (honeypot)
        formData.append("botcheck", "");
    } else {
        setStatus('error')
        setErrorMessage('Form configuration error. Please contact me via LinkedIn.')
        return
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success')
        // Reset form
        e.currentTarget.reset()
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Failed to send message. Please try again later.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="sr-only">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            placeholder="Your Name"
            className="w-full bg-glass-highlight border border-glass-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-faint focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent-glass-strong transition-all"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Your Email"
            className="w-full bg-glass-highlight border border-glass-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-faint focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent-glass-strong transition-all"
          />
        </div>

        <div>
          <label htmlFor="message" className="sr-only">Message</label>
          <textarea
            name="message"
            id="message"
            required
            rows={4}
            placeholder="Your Message..."
            className="w-full bg-glass-highlight border border-glass-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-faint focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent-glass-strong transition-all resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="w-full flex items-center justify-center gap-2 bg-accent/10 hover:bg-accent/20 border border-accent/20 text-accent font-medium px-6 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            <span>Sending...</span>
          </>
        ) : status === 'success' ? (
          <>
            <CheckCircle2 size={18} />
            <span>Message Sent!</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-400 text-sm text-center"
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}
