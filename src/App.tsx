import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin, Phone, Mail, Star, Wifi, Wind, Coffee, Waves, Menu, X, ExternalLink } from 'lucide-react'

// ─── helpers ─────────────────────────────────────────────────────────────────

function useScrollFade(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  return { ref, isInView }
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 1.1, ease: 'easeOut', delay },
  }),
}

// ─── asset map ───────────────────────────────────────────────────────────────

const A = (name: string) => `/assets/${name}`

// ─── data ────────────────────────────────────────────────────────────────────

const rooms = [
  {
    title: 'Chambre Standard',
    subtitle: 'Sérénité & confort',
    description: 'Niché dans la végétation tropicale, chaque chambre standard offre une escapade balnéaire avec vue partielle sur la mer et toutes les commodités modernes.',
    image: A('chambre-standard.jpg'),
    features: ['Vue jardin tropical', 'Climatisation', 'Terrasse privée', 'Salle de bain séparée'],
    badge: 'À partir de',
  },
  {
    title: 'Chambre Confort',
    subtitle: 'L\'art de vivre caribéen',
    description: 'Élevez votre séjour avec nos chambres confort dotées d\'une vue imprenable sur la mer des Caraïbes — un panorama qui s\'offre à vous dès le lever.',
    image: A('chambre-confort.jpg'),
    features: ['Vue mer Caraïbes', 'Climatisation', 'Grande terrasse', 'Literie premium'],
    badge: 'Notre choix',
  },
  {
    title: 'Chambre Familiale',
    subtitle: 'Espace & générosité',
    description: 'Conçue pour accueillir la famille dans un espace généreux, avec plusieurs couchages et une terrasse partagée sur fond d\'horizon caribéen.',
    image: A('chambre-familiale-Copie.jpg'),
    features: ['Capacité familiale', 'Double espace de vie', 'Vue panoramique', 'Terrasse spacieuse'],
    badge: 'Idéal famille',
  },
]

const gallery = [
  { src: A('DJI_0148-scaled.jpg'), alt: 'Vue aérienne de l\'hôtel', span: 'col-span-2 row-span-2' },
  { src: A('terrasse-hotel-rayon-vert-guadeloupe.jpg'), alt: 'Terrasse avec vue mer' },
  { src: A('flamboyants-scaled.jpg'), alt: 'Flamboyants en fleur' },
  { src: A('restaurant-hotel-rayon-vert-guadeloupe.jpg'), alt: 'Restaurant panoramique', span: 'col-span-2' },
  { src: A('fleurs-low.jpg'), alt: 'Fleurs tropicales' },
  { src: A('Le-Rayon-Vert-14.jpg'), alt: 'Détail hôtel' },
  { src: A('Le-Rayon-Vert-25.jpg'), alt: 'Ambiance hôtel' },
  { src: A('pdj-low.jpg'), alt: 'Petit déjeuner' },
]

const amenities = [
  { icon: Waves, label: 'Piscine à débordement', desc: 'Vue imprenable sur la mer des Caraïbes' },
  { icon: Coffee, label: 'Restaurant panoramique', desc: 'Cuisine créole locale, fruits de mer' },
  { icon: Wind, label: 'Climatisation', desc: 'Toutes les chambres climatisées' },
  { icon: Wifi, label: 'Wi-Fi inclus', desc: 'Connexion haut débit dans tout l\'hôtel' },
]

const navLinks = [
  { label: 'L\'Hôtel', href: '#hotel' },
  { label: 'Chambres', href: '#chambres' },
  { label: 'Restaurant', href: '#restaurant' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Contact', href: '#contact' },
]

// ─── components ──────────────────────────────────────────────────────────────

function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal/40 to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-teal/60" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal/40 to-transparent" />
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-jost text-[10px] tracking-widest-2xl uppercase text-teal mb-3">
      {children}
    </p>
  )
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', (y) => setScrolled(y > 60))
  }, [scrollY])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'bg-obsidian/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="group">
          <p className="font-jost text-[9px] tracking-widest-2xl uppercase text-teal/70">Hôtel</p>
          <p className="font-elsie text-2xl text-cream leading-none group-hover:text-teal transition-colors duration-300">
            Le Rayon Vert
          </p>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-jost text-[11px] tracking-wider uppercase text-cream/60 hover:text-teal transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-teal group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://www.hotels-deshaies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-jost text-[11px] tracking-wider uppercase px-6 py-2.5 rounded-full border border-teal text-teal hover:bg-teal hover:text-obsidian transition-all duration-300"
          >
            Réserver
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-cream/80 hover:text-teal transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden bg-obsidian/98 backdrop-blur-xl border-t border-white/5"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="font-jost text-sm tracking-wider uppercase text-cream/70 hover:text-teal transition-colors"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="https://www.hotels-deshaies.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-jost text-[11px] tracking-wider uppercase px-6 py-3 rounded-full border border-teal text-teal text-center hover:bg-teal hover:text-obsidian transition-all duration-300 mt-2"
              >
                Réserver maintenant
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 600], [0, 100])
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.55, 0.85])

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Parallax image */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <img
          src={A('DJI_0148-scaled.jpg')}
          alt="Vue aérienne de l'hôtel Le Rayon Vert à Deshaies"
          className="w-full h-full object-cover scale-110"
          loading="eager"
        />
      </motion.div>

      {/* Gradient overlays */}
      <motion.div
        className="absolute inset-0 bg-obsidian"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-transparent to-transparent" />

      {/* Stars/classification */}
      <div className="absolute top-28 left-0 right-0 flex justify-center">
        <motion.div
          className="flex gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {[...Array(3)].map((_, i) => (
            <Star key={i} size={10} className="fill-teal text-teal" />
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          className="font-jost text-[10px] tracking-widest-2xl uppercase text-teal mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Deshaies · Guadeloupe
        </motion.p>

        <motion.h1
          className="font-elsie text-6xl sm:text-7xl lg:text-9xl text-cream leading-none mb-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Le Rayon
        </motion.h1>
        <motion.h1
          className="font-elsie text-6xl sm:text-7xl lg:text-9xl leading-none mb-8"
          style={{ color: '#2DBFA6' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Vert
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="origin-center"
        >
          <Divider className="mb-8 max-w-xs mx-auto" />
        </motion.div>

        <motion.p
          className="font-cormorant italic text-xl sm:text-2xl text-cream/80 tracking-wide leading-relaxed mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.2 }}
        >
          Une promesse de bonheur entre ciel et mer
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="https://www.hotels-deshaies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-jost text-[11px] tracking-wider uppercase px-10 py-4 rounded-full bg-teal text-obsidian hover:bg-teal-light transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Réserver votre séjour
            <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#hotel"
            className="font-jost text-[11px] tracking-wider uppercase px-10 py-4 rounded-full border border-cream/30 text-cream/70 hover:border-cream hover:text-cream transition-all duration-300 flex items-center justify-center"
          >
            Découvrir
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
      >
        <span className="font-jost text-[9px] tracking-widest uppercase text-cream/40">Défiler</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-teal/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  const { ref, isInView } = useScrollFade()

  return (
    <section id="hotel" className="py-32 lg:py-40 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center" ref={ref}>
        {/* Text */}
        <div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
          >
            <SectionLabel>L'Hôtel</SectionLabel>
            <h2 className="font-elsie text-5xl lg:text-6xl text-cream leading-tight mb-6">
              Notre petit coin<br />
              <span className="text-teal">de paradis</span>
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.15}
          >
            <Divider className="mb-8" />
          </motion.div>

          <motion.p
            className="font-cormorant text-lg text-cream/70 leading-relaxed mb-6"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.25}
          >
            Niché dans la végétation luxuriante de Deshaies, le Rayon Vert est bien plus qu'un hôtel — c'est une invitation à vivre au rythme des alizés, bercé par le chant des oiseaux tropicaux et le murmure de la mer des Caraïbes.
          </motion.p>
          <motion.p
            className="font-cormorant text-lg text-cream/70 leading-relaxed mb-10"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.35}
          >
            Ses 22 chambres, lovées entre ciel et mer, offrent une vue imprenable sur l'immensité bleue. Un lieu d'exception qui conjugue authenticité créole et élégance contemporaine.
          </motion.p>

          <motion.div
            className="flex gap-8"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.45}
          >
            <div className="border-l border-teal/40 pl-4">
              <p className="font-elsie text-4xl text-teal">22</p>
              <p className="font-jost text-[10px] tracking-widest uppercase text-cream/50 mt-1">Chambres</p>
            </div>
            <div className="border-l border-teal/40 pl-4">
              <p className="font-elsie text-4xl text-teal">★★★</p>
              <p className="font-jost text-[10px] tracking-widest uppercase text-cream/50 mt-1">Classement</p>
            </div>
            <div className="border-l border-teal/40 pl-4">
              <p className="font-elsie text-4xl text-teal">∞</p>
              <p className="font-jost text-[10px] tracking-widest uppercase text-cream/50 mt-1">Vue Caraïbes</p>
            </div>
          </motion.div>
        </div>

        {/* Images */}
        <motion.div
          className="relative"
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.2}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <img
              src={A('Le-Rayon-Vert2-17.jpg')}
              alt="Vue de l'hôtel Le Rayon Vert"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent" />
          </div>
          {/* Floating accent image */}
          <motion.div
            className="absolute -bottom-8 -left-8 w-2/5 aspect-square overflow-hidden rounded-2xl shadow-2xl border-4 border-obsidian hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={A('fleurs-low.jpg')}
              alt="Fleurs tropicales"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Amenities bar ────────────────────────────────────────────────────────────

function AmenitiesBar() {
  const { ref, isInView } = useScrollFade()

  return (
    <section className="border-y border-white/5 bg-obsidian-200/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
          {amenities.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              className="py-10 px-8 flex flex-col items-center text-center gap-3 group"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={i * 0.1}
            >
              <div className="w-12 h-12 rounded-2xl border border-teal/30 flex items-center justify-center group-hover:border-teal group-hover:bg-teal/10 transition-all duration-300">
                <Icon size={18} className="text-teal" />
              </div>
              <p className="font-jost text-[11px] tracking-wider uppercase text-cream/80">{label}</p>
              <p className="font-cormorant text-sm text-cream/40 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Rooms ────────────────────────────────────────────────────────────────────

function Rooms() {
  const { ref, isInView } = useScrollFade(0.1)

  return (
    <section id="chambres" className="py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20" ref={ref}>
          <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            <SectionLabel>Nos Hébergements</SectionLabel>
            <h2 className="font-elsie text-5xl lg:text-6xl text-cream mb-4">
              Chambres & Suites
            </h2>
            <Divider className="max-w-xs mx-auto mt-6" />
          </motion.div>
        </div>

        {/* Room cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <RoomCard key={room.title} room={room} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RoomCard({ room, index }: { room: typeof rooms[number]; index: number }) {
  const { ref, isInView } = useScrollFade(0.1)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col bg-obsidian-200 rounded-3xl overflow-hidden border border-white/5 hover:border-teal/20 transition-all duration-500"
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={index * 0.15}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Badge */}
      <div className="absolute top-4 right-4 z-10 bg-obsidian/90 backdrop-blur-sm px-3 py-1 rounded-full border border-teal/30">
        <p className="font-jost text-[9px] tracking-widest uppercase text-teal">{room.badge}</p>
      </div>

      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <motion.img
          src={room.image}
          alt={room.title}
          className="w-full h-full object-cover"
          loading="lazy"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-200 via-obsidian/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1">
        <p className="font-jost text-[10px] tracking-widest uppercase text-teal/70 mb-2">{room.subtitle}</p>
        <h3 className="font-elsie text-3xl text-cream mb-4 leading-tight">{room.title}</h3>
        <p className="font-cormorant text-base text-cream/60 leading-relaxed mb-6 flex-1">{room.description}</p>

        <Divider className="mb-6" />

        {/* Features */}
        <ul className="grid grid-cols-2 gap-2 mb-8">
          {room.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <div className="w-1 h-1 bg-teal rounded-full flex-shrink-0" />
              <span className="font-jost text-[11px] text-cream/50">{f}</span>
            </li>
          ))}
        </ul>

        <a
          href="https://www.hotels-deshaies.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-jost text-[11px] tracking-wider uppercase text-center py-3 rounded-full border border-cream/20 text-cream/60 hover:border-teal hover:text-teal hover:bg-teal/5 transition-all duration-300"
        >
          Réserver
        </a>
      </div>
    </motion.div>
  )
}

// ─── Restaurant ───────────────────────────────────────────────────────────────

function Restaurant() {
  const { ref, isInView } = useScrollFade()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [-60, 60])

  return (
    <section id="restaurant" className="py-32 lg:py-40 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            className="relative aspect-[3/4] overflow-hidden rounded-3xl order-2 lg:order-1"
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.img
              src={A('restaurant-hotel-rayon-vert-guadeloupe.jpg')}
              alt="Restaurant panoramique Le Rayon Vert"
              className="w-full h-full object-cover scale-110"
              style={{ y: imgY }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 to-transparent" />

            {/* Floating stat */}
            <div className="absolute bottom-8 left-8 bg-obsidian/90 backdrop-blur-sm rounded-2xl border border-white/10 p-5">
              <p className="font-elsie text-3xl text-teal">Vendredi–Dimanche</p>
              <p className="font-jost text-[10px] tracking-widest uppercase text-cream/50 mt-1">Midi 12h–14h · Soir 19h–21h</p>
            </div>
          </motion.div>

          {/* Text */}
          <div className="order-1 lg:order-2" ref={ref}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0}
            >
              <SectionLabel>Gastronomie</SectionLabel>
              <h2 className="font-elsie text-5xl lg:text-6xl text-cream leading-tight mb-6">
                Saveurs<br />
                <span className="text-teal">créoles</span> &<br />
                horizons bleus
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.15}
            >
              <Divider className="mb-8" />
            </motion.div>

            <motion.p
              className="font-cormorant text-lg text-cream/70 leading-relaxed mb-6"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.25}
            >
              Notre restaurant panoramique vous invite à découvrir les saveurs authentiques de la cuisine créole guadeloupéenne, sublimées par une vue imprenable sur la mer des Caraïbes.
            </motion.p>

            <motion.p
              className="font-cormorant text-lg text-cream/70 leading-relaxed mb-10"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.35}
            >
              Poissons grillés, accras dorés, langoustes fraîches — chaque assiette raconte l'histoire de notre île, portée par des producteurs locaux et une cuisine généreuse.
            </motion.p>

            <motion.div
              className="space-y-4"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.45}
            >
              {[
                { label: 'Petit déjeuner', hours: 'Tous les jours · 7h30–10h00' },
                { label: 'Déjeuner', hours: 'Ven–Dim · 12h00–14h00' },
                { label: 'Dîner', hours: 'Tous les jours · 19h00–21h00' },
              ].map(({ label, hours }) => (
                <div key={label} className="flex justify-between items-center border-b border-white/5 pb-4">
                  <p className="font-jost text-[11px] tracking-wider uppercase text-cream/70">{label}</p>
                  <p className="font-cormorant text-base text-teal/80 italic">{hours}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Pool / Full bleed feature ─────────────────────────────────────────────────

function PoolFeature() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1])
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden" ref={containerRef}>
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <img
          src={A('terrasse-hotel-rayon-vert-guadeloupe.jpg')}
          alt="Terrasse et vue sur la mer"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-obsidian/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />

      <motion.div
        className="relative z-10 text-center px-6"
        style={{ y: textY, opacity }}
      >
        <p className="font-jost text-[10px] tracking-widest-2xl uppercase text-teal mb-4">Piscine à débordement</p>
        <p className="font-elsie text-5xl sm:text-6xl lg:text-7xl text-cream leading-tight max-w-3xl mx-auto">
          Là où l'horizon<br />
          <span className="text-teal">se fond dans la mer</span>
        </p>
      </motion.div>
    </section>
  )
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function Gallery() {
  const { ref, isInView } = useScrollFade(0.05)
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <section id="galerie" className="py-32 lg:py-40 px-6 lg:px-12 max-w-7xl mx-auto" ref={ref}>
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <SectionLabel>Galerie</SectionLabel>
        <h2 className="font-elsie text-5xl lg:text-6xl text-cream mb-4">
          L'île en images
        </h2>
        <Divider className="max-w-xs mx-auto mt-6" />
      </motion.div>

      {/* Masonry-style grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[180px]">
        {gallery.map((img, i) => (
          <motion.div
            key={img.src}
            className={`relative overflow-hidden rounded-2xl cursor-pointer group ${img.span || ''}`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={i * 0.07}
            onClick={() => setSelected(img.src)}
          >
            <motion.img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="absolute inset-0 bg-obsidian/40 flex items-end p-4"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-cormorant italic text-cream text-sm">{img.alt}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/95 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.img
              src={selected}
              alt=""
              className="max-w-5xl max-h-[85vh] w-full object-contain rounded-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-6 right-6 text-cream/70 hover:text-teal transition-colors"
              onClick={() => setSelected(null)}
              aria-label="Fermer"
            >
              <X size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// ─── Booking CTA ─────────────────────────────────────────────────────────────

function BookingCTA() {
  const { ref, isInView } = useScrollFade()

  return (
    <section className="py-32 lg:py-40 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={A('vue-du-restaurant-low.jpg')}
          alt=""
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center" ref={ref}>
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0}>
          <SectionLabel>Réservation</SectionLabel>
          <h2 className="font-elsie text-5xl lg:text-7xl text-cream leading-tight mb-4">
            Votre séjour<br />
            <span className="text-teal">de rêve</span> vous attend
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.15}
        >
          <Divider className="max-w-xs mx-auto my-8" />
        </motion.div>

        <motion.p
          className="font-cormorant text-xl text-cream/70 leading-relaxed mb-12 max-w-2xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.25}
        >
          22 chambres nichées entre ciel et mer, une piscine à débordement, un restaurant avec vue panoramique sur la Caraïbe. Le Rayon Vert vous ouvre ses portes.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.35}
        >
          <a
            href="https://www.hotels-deshaies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-jost text-[11px] tracking-wider uppercase px-12 py-4 rounded-full bg-teal text-obsidian hover:bg-teal-light transition-all duration-300 inline-flex items-center justify-center gap-2 group"
          >
            Réserver en ligne
            <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="tel:+590590284244"
            className="font-jost text-[11px] tracking-wider uppercase px-12 py-4 rounded-full border border-cream/20 text-cream/60 hover:border-teal hover:text-teal transition-all duration-300 inline-flex items-center justify-center gap-2"
          >
            <Phone size={12} />
            Appeler
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  const { ref, isInView } = useScrollFade()

  return (
    <section id="contact" className="border-t border-white/5 py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
          >
            <p className="font-jost text-[9px] tracking-widest-2xl uppercase text-teal/70 mb-2">Hôtel ★★★</p>
            <p className="font-elsie text-3xl text-cream mb-4">Le Rayon Vert</p>
            <Divider className="mb-6" />
            <p className="font-cormorant italic text-cream/50 text-base leading-relaxed">
              Une promesse de bonheur<br />entre ciel et mer
            </p>
          </motion.div>

          {/* Coordinates */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.1}
          >
            <p className="font-jost text-[10px] tracking-widest uppercase text-teal mb-6">Nous trouver</p>
            <div className="space-y-4">
              <a
                href="https://maps.google.com/?q=Deshaies+Guadeloupe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-cream/60 hover:text-teal transition-colors group"
              >
                <MapPin size={14} className="mt-1 flex-shrink-0 group-hover:text-teal" />
                <p className="font-cormorant text-base leading-relaxed">
                  Deshaies<br />Guadeloupe, 97126<br />Antilles françaises
                </p>
              </a>
              <a
                href="tel:+590590284244"
                className="flex items-center gap-3 text-cream/60 hover:text-teal transition-colors"
              >
                <Phone size={14} className="flex-shrink-0" />
                <p className="font-cormorant text-base">+590 (0)590 28 42 44</p>
              </a>
              <a
                href="mailto:contact@hotels-deshaies.com"
                className="flex items-center gap-3 text-cream/60 hover:text-teal transition-colors"
              >
                <Mail size={14} className="flex-shrink-0" />
                <p className="font-cormorant text-base">contact@hotels-deshaies.com</p>
              </a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.2}
          >
            <p className="font-jost text-[10px] tracking-widest uppercase text-teal mb-6">Navigation</p>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block font-cormorant text-base text-cream/50 hover:text-teal transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4"
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.3}
        >
          <p className="font-jost text-[10px] text-cream/30 tracking-wider">
            © {new Date().getFullYear()} Hôtel Le Rayon Vert · Tous droits réservés
          </p>
          <div className="flex gap-6">
            {['Facebook', 'Instagram', 'TripAdvisor'].map((social) => (
              <a
                key={social}
                href="https://www.hotels-deshaies.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-jost text-[10px] tracking-wider uppercase text-cream/30 hover:text-teal transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="bg-obsidian min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <AmenitiesBar />
      <Rooms />
      <Restaurant />
      <PoolFeature />
      <Gallery />
      <BookingCTA />
      <Contact />
    </div>
  )
}
