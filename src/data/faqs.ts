export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view (and the legacy long-scroll FAQ section).
 * Five questions, two or three sentences each: the accordion sits in a
 * fixed panel and more than that pushes the email row off the plate.
 */
export const FAQS: QA[] = [
  {
    q: 'What do you do?',
    a: 'I offer front-end development, full-stack development, graphic design, and video editing. I can help bring a new idea to life or improve an existing project.',
  },
  {
    q: 'How fast can you start?',
    a: 'It depends on the project scope and my current availability. Share your goals and preferred timeline, and I’ll let you know what I can take on.',
  },
  {
    q: 'How much do you charge?',
    a: 'Pricing depends on the work involved, timeline, and requirements. After discussing your project, I’ll provide a quote before any work begins.',
  },
  {
    q: 'Where are you based?',
    a: 'I’m based in Cavite, Philippines (UTC+8), and can collaborate remotely.',
  },
  {
    q: 'What happens after I write?',
    a: 'Your message opens in your email app so you can review and send it. I’ll reply within one business day to discuss your goals and possible next steps.',
  },
]
