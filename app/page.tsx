'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Heart, X } from 'lucide-react'

type ToastMessage = { text: string; id: number }

const birthdayNote = `Happy Birthday, Adii! 🎉

Distance can't stop me from making your November 30th special. From our late-night chats to geeking out over Goku and Max Verstappen, you make every day brighter. 

Whether you're sketching, spiking a volleyball, dreaming about supercars, or eating Dosa, you're unapologetically you. 

I asked Ronaldo to deliver this, but he was busy, so you're stuck with your favorite Kitty. 🙄

You are the most amazing bestie I could ask for. Can't wait to celebrate in person—and more than anything, I'm counting down the days until you finally slip that ring you bought for me onto my finger yourself. 💍 Have the absolute best birthday! 🎂

Forever your BFF, 
Sahil (Kitty) 😼`

const noteParagraphs = birthdayNote.split('\n\n')

const universeCards = [
  { emoji: '🏐', title: 'Court Queen', text: 'Dominating in Volleyball, Basketball, and Football' },
  { emoji: '🎨', title: 'The Artist', text: 'Lost in Manga, Anime, Novels, and B&W Sketching' },
  { emoji: '🏎️', title: 'Need for Speed', text: 'Supercars, Bikes, and F1 dreams' },
  { emoji: '🍽️', title: 'True Love', text: 'Dosa. Because nothing else matters' },
]

const loveSlides = [
  'Distance means nothing when a bestie means so much. 💕',
  'You match my crazy energy perfectly. 😼',
  "You're simply the best, Ashley! ✨",
]

function Toast({ message, onDismiss }: { message: ToastMessage | null; onDismiss: () => void }) {
  if (!message) return null
  return (
    <div className="toast" role="status" aria-live="polite" key={message.id}>
      <span>{message.text}</span>
      <button className="toast-close" onClick={onDismiss} aria-label="Dismiss notification"><X size={16} /></button>
    </div>
  )
}

const decorItems = [
  { kind: 'heart', left: 6, top: 4, size: 22, duration: 7, delay: 0 },
  { kind: 'bow', left: 88, top: 7, size: 30, duration: 8, delay: 1 },
  { kind: 'heart', left: 46, top: 12, size: 16, duration: 6, delay: 2 },
  { kind: 'bow', left: 12, top: 24, size: 26, duration: 9, delay: 0.5 },
  { kind: 'heart', left: 93, top: 30, size: 24, duration: 7.5, delay: 1.5 },
  { kind: 'heart', left: 4, top: 42, size: 18, duration: 6.5, delay: 3 },
  { kind: 'bow', left: 90, top: 48, size: 28, duration: 8.5, delay: 2.5 },
  { kind: 'heart', left: 20, top: 58, size: 26, duration: 7, delay: 1 },
  { kind: 'bow', left: 7, top: 70, size: 30, duration: 9, delay: 0 },
  { kind: 'heart', left: 85, top: 68, size: 20, duration: 6, delay: 2 },
  { kind: 'bow', left: 50, top: 80, size: 24, duration: 8, delay: 3.5 },
  { kind: 'heart', left: 94, top: 86, size: 26, duration: 7, delay: 0.8 },
  { kind: 'heart', left: 10, top: 92, size: 20, duration: 6.5, delay: 1.8 },
] as const

function FloatingDecor() {
  const reduceMotion = useReducedMotion()
  return (
    <div className="decor" aria-hidden="true">
      {decorItems.map((item, i) => (
        <motion.span
          key={i}
          className="decor-item"
          style={{ left: `${item.left}%`, top: `${item.top}%`, fontSize: item.size }}
          animate={reduceMotion ? undefined : { y: [0, -22, 0], rotate: [-8, 8, -8] }}
          transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {item.kind === 'heart' ? <Heart size={item.size} fill="currentColor" strokeWidth={0} /> : '🎀'}
        </motion.span>
      ))}
    </div>
  )
}

const TARGET_SCORE = 10
function randomCatPosition() {
  return { left: 8 + Math.random() * 74, top: 8 + Math.random() * 66 }
}

function CatchKitty() {
  const [score, setScore] = useState(0)
  const [position, setPosition] = useState({ left: 45, top: 40 })
  const won = score >= TARGET_SCORE

  function catchKitty() {
    setScore((current) => current + 1)
    setPosition(randomCatPosition())
  }

  return (
    <section className="section" aria-labelledby="game-title">
      <p className="eyebrow">a tiny game</p>
      <div className="game">
        <h2 id="game-title" className="game-title">Catch Kitty! 🐾 Score: {score}</h2>
        <p className="game-promise">If you win, I&apos;ll do anything you ask for and send you all those pics, too...</p>
        <AnimatePresence mode="wait">
          {won ? (
            <motion.div key="win" className="game-win" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}>
              <p className="game-win-title">You win mommy im all yours 🧎🫦🛐😩💋💕</p>
              <p className="game-win-subtitle">You caught Kitty! Sending a massive virtual hug! 🫂💕</p>
              <button className="button button-blush" onClick={() => setScore(0)}>Play again</button>
            </motion.div>
          ) : (
            <motion.button
              key="cat"
              className="game-cat"
              onClick={catchKitty}
              aria-label="Catch Kitty"
              initial={false}
              animate={{ left: `${position.left}%`, top: `${position.top}%` }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
            >
              😼
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function Gateway({ onUnlock, onToast }: { onUnlock: () => void; onToast: (text: string) => void }) {
  const [hoverCount, setHoverCount] = useState(0)
  const [noPosition, setNoPosition] = useState({ left: 50, top: 50 })

  function dodgeNo() {
    setHoverCount((count) => count + 1)
    setNoPosition({ left: 12 + Math.random() * 76, top: 15 + Math.random() * 70 })
  }

  return (
    <div className="gateway" role="dialog" aria-modal="true" aria-labelledby="gateway-title">
      <div className="gateway-card">
        <span className="gateway-sparkle" aria-hidden="true">✦</span>
        <p className="eyebrow">A very important question</p>
        <h1 id="gateway-title">Do You love me? 🤨</h1>
        <p className="gateway-caption">Choose wisely. I&apos;m watching.</p>
        <div className="gateway-actions">
          <button className="button button-primary" onClick={() => onToast("Just 'Yes'? I deserve better! 🙄")}>Yes ❤️</button>
          {hoverCount >= 3 && <button className="button button-blush" onClick={() => { onToast('I knew it! 😼 - Kitty'); onUnlock() }}>More Than everything 💋💕</button>}
        </div>
        <button className="button button-no" style={{ left: `${noPosition.left}%`, top: `${noPosition.top}%` }} onMouseEnter={dodgeNo} onFocus={dodgeNo} onClick={dodgeNo}>No 😒</button>
      </div>
    </div>
  )
}

function Scrapbook() {
  return (
    <div className="scrapbook" aria-label="Birthday scrapbook photos">
      <div className="polaroid polaroid-one">
        <img src="./Adii1.jpeg" alt="Aditi" />
        <span>my favorite human</span>
      </div>
      <div className="polaroid polaroid-two">
        <img src="./Adii2.jpeg" alt="Aditi" />
        <span>queen of nov 30 ✨</span>
      </div>
      <span className="tape tape-one" aria-hidden="true" />
      <span className="tape tape-two" aria-hidden="true" />
    </div>
  )
}

function Universe() {
  return (
    <section className="section" aria-labelledby="universe-title">
      <p className="eyebrow">a peek inside</p>
      <h2 id="universe-title" className="section-title">Adii&apos;s Universe</h2>
      <div className="bento">
        {universeCards.map((card) => (
          <article className="bento-card" key={card.title}>
            <span className="bento-emoji" aria-hidden="true">{card.emoji}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function LoveCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % loveSlides.length), 4000)
    return () => window.clearInterval(timer)
  }, [paused])

  return (
    <section className="section" aria-labelledby="love-title" aria-roledescription="carousel">
      <p className="eyebrow">just saying</p>
      <h2 id="love-title" className="section-title">Why I Love You</h2>
      <div className="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
        <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }} aria-live={paused ? 'polite' : 'off'}>
          {loveSlides.map((slide, i) => (
            <div className="carousel-slide" key={slide} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${loveSlides.length}`} aria-hidden={i !== index}>
              <p>{slide}</p>
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {loveSlides.map((_, i) => (
            <button key={i} className={`dot${i === index ? ' dot-active' : ''}`} onClick={() => setIndex(i)} aria-label={`Show slide ${i + 1}`} aria-current={i === index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function VaultModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <motion.section className="vault-modal" role="dialog" aria-modal="true" aria-labelledby="vault-title" initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.95 }}>
        <button className="modal-close" onClick={onClose} aria-label="Close secret vault"><X size={19} /></button>
        <span className="vault-icon" aria-hidden="true">✉</span>
        <h2 id="vault-title">{noteParagraphs[0]}</h2>
        <div className="note-copy">{noteParagraphs.slice(1).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        <span className="note-heart" aria-hidden="true">♥</span>
      </motion.section>
    </motion.div>
  )
}

export default function Page() {
  const [unlocked, setUnlocked] = useState(false)
  const [vaultOpen, setVaultOpen] = useState(false)
  const [toast, setToast] = useState<ToastMessage | null>(null)

  function showToast(text: string) {
    setToast({ text, id: Date.now() })
    window.setTimeout(() => setToast(null), 3200)
  }

  return (
    <main className="birthday-page">
      <div className="paper-grain" aria-hidden="true" />
      <FloatingDecor />
      <div className="hero">
        <div className="sticker sticker-max"><img src="./Max.jpg" alt="Max Verstappen" /><span>max!</span></div>
        <div className="sticker sticker-ronaldo"><img src="./Ronaldo.jpg" alt="Cristiano Ronaldo" /><span>siuu!</span></div>
        <div className="sticker sticker-goku"><img src="./goku.jpg" alt="Goku" /><span>power up</span></div>
        <header className="page-header">
          <motion.span className="countdown-pill" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>Countdown to Nov 30! ⏳</motion.span>
          <p className="eyebrow">a little page made just for you</p>
          <h1>Happy Birthday <span>Adii!</span> <span className="cake">🎂</span></h1>
          <p className="subtitle">November 30 · your day, your way</p>
        </header>
        <Scrapbook />
      </div>
      <Universe />
      <CatchKitty />
      <LoveCarousel />
      <div className="page-footer">
        <span className="doodle-heart" aria-hidden="true">♡</span>
        <p>Made with a whole lot of love (and a tiny bit of drama)</p>
        <button className="vault-button" onClick={() => setVaultOpen(true)}><span aria-hidden="true">✉</span> Open Top Secret Vault</button>
      </div>
      <AnimatePresence>{vaultOpen && <VaultModal onClose={() => setVaultOpen(false)} />}</AnimatePresence>
      {!unlocked && <Gateway onUnlock={() => setUnlocked(true)} onToast={showToast} />}
      <Toast message={toast} onDismiss={() => setToast(null)} />
    </main>
  )
}