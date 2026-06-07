import { useState, type FormEvent } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Button, Input, Label, Textarea } from 'dpyui'

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 240, damping: 24 } },
}

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
    window.location.href = `mailto:chris@cd-developer.com?subject=${subject}&body=${body}`

    setSubmitted(true)
  }

  return (
    <section className="relative flex h-[80svh] flex-col text-center rounded-lg bg-muted/20">
      <div className="flex h-full flex-col overflow-y-auto p-6">
        <div className="my-auto flex w-full flex-col items-center">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Have a question or want to work together? Send me a message and I'll get back to you.
          </p>

          <motion.form
            onSubmit={handleSubmit}
            className="mt-8 w-full max-w-md space-y-4 text-left"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={item} className="space-y-2">
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                required
              />
            </motion.div>

            <motion.div variants={item} className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </motion.div>

            <motion.div variants={item} className="space-y-2">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="What would you like to talk about?"
                rows={5}
                required
              />
            </motion.div>

            <motion.div variants={item}>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </motion.div>

            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-muted-foreground"
              >
                Thanks, {name || 'friend'} — your email client should be opening now.
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
