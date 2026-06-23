import { ChangeEvent, MouseEvent, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight, Check, ChevronDown, Clock3, Fingerprint, Lightbulb,
  Menu, Quote, ShieldCheck, Sparkles, Star, Upload, Users, X,
} from 'lucide-react'

type Skill = 'All' | 'Collaboration' | 'Leadership' | 'Creativity'

type Experience = {
  title: string
  kicker: string
  description: string
  duration: string
  group: string
  skills: Exclude<Skill, 'All'>[]
  className: string
}

const experiences: Experience[] = [
  {
    title: 'The Quarterly Alibi',
    kicker: 'Murder mystery',
    description: 'The boardroom has a body, a missing forecast, and twelve very ambitious suspects.',
    duration: '90 mins', group: '10–80 people', skills: ['Collaboration', 'Leadership'], className: 'quarterly',
  },
  {
    title: 'Mission: Moonshot',
    kicker: 'Escape room',
    description: 'Recover the launch codes through rapid puzzles, shared clues, and one very tight deadline.',
    duration: '75 mins', group: '12–100 people', skills: ['Creativity', 'Collaboration'], className: 'moonshot',
  },
  {
    title: 'The Founder Vanishes',
    kicker: 'Murder mystery',
    description: 'A product launch goes off-script. Your team must question motives and make the final call.',
    duration: '90 mins', group: '10–60 people', skills: ['Leadership', 'Creativity'], className: 'founder',
  },
]

const cases = [
  { company: 'NORTHSTAR', sector: 'Technology · 46 guests', quote: 'It got our quietest and loudest thinkers solving the same problem together. We were talking about it for weeks.', person: 'Maya Chen', role: 'VP, People & Culture', result: '94% team recommendation' },
  { company: 'VERDANT', sector: 'Consulting · 72 guests', quote: 'The customization made it feel like our event—not something pulled off the shelf. Sharp, funny and flawlessly run.', person: 'Jon Bell', role: 'Managing Partner', result: '4.9/5 attendee rating' },
  { company: 'KITE & CO.', sector: 'Financial services · 28 guests', quote: 'A genuinely useful team exercise disguised as a very good night out. The debrief was unexpectedly insightful.', person: 'Amelia Ross', role: 'Operations Director', result: '31% engagement lift' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSkill, setActiveSkill] = useState<Skill>('All')
  const [teamSize, setTeamSize] = useState(36)
  const [displayPrice, setDisplayPrice] = useState(2340)
  const [openCase, setOpenCase] = useState<number | null>(0)
  const [companyName, setCompanyName] = useState('Your company')
  const [logo, setLogo] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  const price = useMemo(() => {
    const perPerson = teamSize >= 80 ? 52 : teamSize >= 50 ? 58 : 65
    return teamSize * perPerson
  }, [teamSize])

  useEffect(() => {
    const start = displayPrice
    const delta = price - start
    let frame = 0
    const frames = 18
    const timer = window.setInterval(() => {
      frame += 1
      const eased = 1 - Math.pow(1 - frame / frames, 3)
      setDisplayPrice(Math.round(start + delta * eased))
      if (frame === frames) window.clearInterval(timer)
    }, 18)
    return () => window.clearInterval(timer)
    // displayPrice is intentionally captured at interaction start
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price])

  const sortedExperiences = useMemo(() => {
    if (activeSkill === 'All') return experiences
    return [...experiences].sort((a, b) => Number(b.skills.includes(activeSkill)) - Number(a.skills.includes(activeSkill)))
  }, [activeSkill])

  const moveHero = (event: MouseEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - box.left) / box.width - .5) * 2
    const y = ((event.clientY - box.top) / box.height - .5) * 2
    heroRef.current?.style.setProperty('--rx', `${-y * 1.2}deg`)
    heroRef.current?.style.setProperty('--ry', `${x * 1.8}deg`)
    heroRef.current?.style.setProperty('--mx', `${50 + x * 2}%`)
    heroRef.current?.style.setProperty('--my', `${50 + y * 2}%`)
  }

  const resetHero = () => {
    heroRef.current?.style.setProperty('--rx', '0deg')
    heroRef.current?.style.setProperty('--ry', '0deg')
    heroRef.current?.style.setProperty('--mx', '50%')
    heroRef.current?.style.setProperty('--my', '50%')
  }

  const loadLogo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setLogo(String(reader.result))
    reader.readAsDataURL(file)
  }

  const submitQuote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setConfirmed(true)
    window.setTimeout(() => { setConfirmed(false); setQuoteOpen(false) }, 2600)
  }

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="Casework home">
          <span className="brand-mark"><Fingerprint size={19} strokeWidth={2.5} /></span>
          <span>CASEWORK</span>
        </a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#experiences" onClick={() => setMenuOpen(false)}>Experiences</a>
          <a href="#companies" onClick={() => setMenuOpen(false)}>For companies</a>
          <a href="#custom" onClick={() => setMenuOpen(false)}>Customization</a>
          <a href="#stories" onClick={() => setMenuOpen(false)}>Case studies</a>
        </nav>
        <button className="button button-dark nav-cta" onClick={() => setQuoteOpen(true)}>Request a quote <ArrowRight size={16} /></button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> TEAM-BUILDING WITH A PLOT</div>
            <h1>Good teams work.<br /><em>Great teams investigate.</em></h1>
            <p className="hero-lede">Hosted murder mysteries and escape-room experiences that turn your next company gathering into something worth talking about.</p>
            <div className="hero-actions">
              <button className="button button-red" onClick={() => document.querySelector('#experiences')?.scrollIntoView({ behavior: 'smooth' })}>Explore experiences <ArrowRight size={17} /></button>
              <button className="text-link" onClick={() => document.querySelector('#companies')?.scrollIntoView({ behavior: 'smooth' })}>How it works <span>↘</span></button>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack"><span>AM</span><span>JT</span><span>SK</span><span>+8k</span></div>
              <div><div className="stars"><Star /><Star /><Star /><Star /><Star /></div><small>Loved by teams at 320+ companies</small></div>
            </div>
          </div>
          <div className="hero-visual-wrap" onMouseMove={moveHero} onMouseLeave={resetHero}>
            <div className="hero-visual" ref={heroRef}>
              <div className="image-shift" />
              <div className="floating-note note-one"><span>THE CLUE</span><b>Everyone has a motive.</b></div>
              <div className="floating-note note-two"><Check size={16} /> Fully hosted</div>
            </div>
          </div>
        </section>

        <div className="trust-strip">
          <span>Trusted to bring teams together at</span>
          <b>Northstar</b><b>VERTEX</b><b>Helio+</b><b>KITE & CO.</b><b>Verdant</b>
        </div>

        <section className="experiences section-pad" id="experiences">
          <div className="section-heading split-heading">
            <div><div className="eyebrow">CHOOSE YOUR CASE</div><h2>One room. One mission.<br /><em>A better team.</em></h2></div>
            <p>Each experience is designed around the team skills you want to strengthen—without ever feeling like a training day.</p>
          </div>
          <div className="filter-row" aria-label="Filter by team skill">
            <span>Sort by team skill</span>
            {(['All', 'Collaboration', 'Leadership', 'Creativity'] as Skill[]).map(skill => (
              <button key={skill} className={activeSkill === skill ? 'skill active' : 'skill'} onMouseEnter={() => setActiveSkill(skill)} onClick={() => setActiveSkill(skill)}>{skill}{skill !== 'All' && <span className="skill-glow" />}</button>
            ))}
          </div>
          <div className="experience-grid">
            {sortedExperiences.map((item, index) => (
              <article className={`experience-card ${item.className}`} key={item.title} style={{ order: index }}>
                <div className="card-art">
                  <div className="art-number">0{experiences.indexOf(item) + 1}</div>
                  <div className="art-file"><Fingerprint /><span>CONFIDENTIAL</span></div>
                  <span className="duration"><Clock3 size={14} /> {item.duration}</span>
                </div>
                <div className="card-body">
                  <small>{item.kicker}</small><h3>{item.title}</h3><p>{item.description}</p>
                  <div className="tag-list">{item.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
                  <div className="card-foot"><span><Users size={15} /> {item.group}</span><button aria-label={`View ${item.title}`}><ArrowRight /></button></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="companies" id="companies">
          <div className="companies-inner section-pad">
            <div className="price-copy">
              <div className="eyebrow light">BUILT FOR COMPANIES</div>
              <h2>Big impact.<br /><em>Zero logistics drama.</em></h2>
              <p>We plan, host and run the room. You bring the people. Available in-person, remote or hybrid worldwide.</p>
              <ul><li><Check /> Dedicated experience producer</li><li><Check /> Professional game host</li><li><Check /> Post-event team insights</li></ul>
            </div>
            <div className="price-card">
              <div className="price-top"><span>YOUR TEAM SIZE</span><strong>{teamSize} <small>people</small></strong></div>
              <input type="range" min="10" max="100" value={teamSize} onChange={e => setTeamSize(Number(e.target.value))} style={{ '--range': `${(teamSize - 10) / .9}%` } as React.CSSProperties} aria-label="Team size" />
              <div className="ticks"><span>10</span><i /><i /><i /><span>50</span><i /><i /><i /><span>100+</span></div>
              <div className="price-total"><div><span>ESTIMATED TOTAL</span><strong>${displayPrice.toLocaleString()}</strong></div><span className="per-person">${Math.round(price / teamSize)}<small>/person</small></span></div>
              <p>Includes your host, pre-event planning and all game materials.</p>
              <button className="button button-red full" onClick={() => setQuoteOpen(true)}>Get a tailored quote <ArrowRight size={17} /></button>
              <small className="no-card"><ShieldCheck /> No card or commitment required</small>
            </div>
          </div>
        </section>

        <section className="custom section-pad" id="custom">
          <div className="dossier-stage">
            <div className="dossier-back back-one" /><div className="dossier-back back-two" />
            <div className="dossier-paper">
              <div className="dossier-head"><span>CASEWORK / CLIENT FILE</span><b>CLASSIFIED</b></div>
              <div className="logo-drop">
                {logo ? <img src={logo} alt="Uploaded company logo" /> : <div className="logo-placeholder"><Sparkles /><strong>{companyName || 'Your company'}</strong></div>}
              </div>
              <div className="case-lines"><b>CASE NAME</b><span>The {companyName || 'Company'} Incident</span><b>PRIMARY OBJECTIVE</b><span>Build a story your team can own</span></div>
              <div className="approval-stamp">APPROVED<br /><small>FOR PLAY</small></div>
              <div className="paperclip" />
            </div>
          </div>
          <div className="custom-copy">
            <div className="eyebrow">MAKE IT YOURS</div>
            <h2>Your company.<br /><em>Inside the story.</em></h2>
            <p>Turn internal lore, brand details and company milestones into a bespoke case your team won’t see coming.</p>
            <div className="custom-controls">
              <label>Company name<input value={companyName} onChange={e => setCompanyName(e.target.value)} maxLength={24} /></label>
              <label className="upload-button"><Upload size={17} /> Upload your logo<input type="file" accept="image/*" onChange={loadLogo} /></label>
            </div>
            <div className="mini-features"><span><Lightbulb /> Brand clues</span><span><Users /> Custom roles</span><span><Fingerprint /> Your inside story</span></div>
          </div>
        </section>

        <section className="stories section-pad" id="stories">
          <div className="section-heading center"><div className="eyebrow">FIELD REPORTS</div><h2>Teams came. Teams solved.<br /><em>Teams had a lot to say.</em></h2></div>
          <div className="case-grid">
            {cases.map((item, index) => {
              const open = openCase === index
              return <article key={item.company} className={open ? 'case-card open' : 'case-card'} onClick={() => setOpenCase(open ? null : index)}>
                <div className="case-card-top"><div className="client-mark">{item.company}</div><button aria-label={open ? 'Collapse testimonial' : 'Expand testimonial'}><ChevronDown /></button></div>
                <span className="sector">{item.sector}</span>
                <div className="case-result"><b>{item.result.split(' ')[0]}</b><span>{item.result.substring(item.result.indexOf(' ') + 1)}</span></div>
                <div className="quote-reveal"><Quote className="speech-mark" /><blockquote>“{item.quote}”</blockquote><footer><b>{item.person}</b><span>{item.role}</span></footer></div>
                {!open && <span className="read-quote">Read their story <ArrowRight size={14} /></span>}
              </article>
            })}
          </div>
        </section>

        <section className="closing section-pad">
          <div className="closing-badge"><Fingerprint /></div>
          <div><div className="eyebrow light">YOUR NEXT TEAM STORY STARTS HERE</div><h2>Ready to give them<br /><em>something to solve?</em></h2></div>
          <button className="button button-cream" onClick={() => setQuoteOpen(true)}>Request a quote <ArrowRight /></button>
        </section>
      </main>

      <footer className="footer section-pad">
        <a className="brand" href="#top"><span className="brand-mark"><Fingerprint size={19} /></span><span>CASEWORK</span></a>
        <p>Extraordinary team experiences,<br />expertly plotted.</p>
        <div><b>Explore</b><a href="#experiences">Experiences</a><a href="#companies">For companies</a><a href="#stories">Case studies</a></div>
        <div><b>Say hello</b><a href="mailto:hello@casework.events">hello@casework.events</a><span>New York · London · Anywhere</span></div>
        <small>© 2026 Casework Experiences</small>
      </footer>

      {quoteOpen && <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && setQuoteOpen(false)}>
        <div className={confirmed ? 'quote-modal confirmed' : 'quote-modal'}>
          {confirmed ? <div className="confirmation"><span><Check /></span><div><small>CASE ACCEPTED</small><h3>Your request is in.</h3><p>We’ll be in touch within one working day with the next clue.</p></div></div> : <>
            <button className="modal-close" onClick={() => setQuoteOpen(false)} aria-label="Close"><X /></button>
            <div className="eyebrow">START A CASE</div><h2>Tell us about<br /><em>your team.</em></h2>
            <form onSubmit={submitQuote}>
              <label>Your name<input required placeholder="Alex Morgan" /></label>
              <label>Work email<input required type="email" placeholder="alex@company.com" /></label>
              <div className="form-row"><label>Company<input required placeholder="Company name" /></label><label>Team size<input required type="number" min="10" placeholder="36" defaultValue={teamSize} /></label></div>
              <button className="button button-red full" type="submit">Send my request <ArrowRight /></button>
            </form>
          </>}
        </div>
      </div>}
    </div>
  )
}

export default App
