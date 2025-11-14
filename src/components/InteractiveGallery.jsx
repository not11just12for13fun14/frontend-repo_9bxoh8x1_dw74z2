import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

// Perbesar jumlah foto agar galeri lebih hidup dan menarik
const rawImages = [
  { src: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1600&auto=format&fit=crop', name: 'Rina', role: 'SEO Specialist' },
  { src: 'https://images.unsplash.com/photo-1548946526-f69e2424cf45?q=80&w=1600&auto=format&fit=crop', name: 'Dika', role: 'Brand Designer' },
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop', name: 'Tim Kolaborasi', role: 'Creative Team' },
  { src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1600&auto=format&fit=crop', name: 'Andi', role: 'Content Strategist' },
  { src: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1600&auto=format&fit=crop', name: 'Sari', role: 'Copywriter' },
  { src: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1600&auto=format&fit=crop', name: 'Rafi', role: 'Performance Ads' },
  { src: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1600&auto=format&fit=crop', name: 'Nadia', role: 'Account Manager' },
  { src: 'https://images.unsplash.com/photo-1552960562-daf630e9278b?q=80&w=1600&auto=format&fit=crop', name: 'Bima', role: 'UI/UX Designer' },
  { src: 'https://images.unsplash.com/photo-1518644730709-0835105d9daa?q=80&w=1600&auto=format&fit=crop', name: 'Laras', role: 'Data & Analytics' },
  { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop', name: 'Yoga', role: 'Project Manager' },
  { src: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1600&auto=format&fit=crop', name: 'Maya', role: 'Social Media' },
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&auto=format&fit=crop', name: 'Fahri', role: 'Videographer' },
  { src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1600&auto=format&fit=crop', name: 'Ayu', role: 'Brand Strategist' },
  { src: 'https://images.unsplash.com/photo-1524504542391-127872011665?q=80&w=1600&auto=format&fit=crop', name: 'Iqbal', role: 'SEO Tech' },
  { src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxZb2dhfGVufDB8MHx8fDE3NjMxMDU0MjJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', name: 'Dewi', role: 'Community Lead' },
  { src: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?q=80&w=1600&auto=format&fit=crop', name: 'Putra', role: 'Frontend Dev' },
]

// Buat versi thumbnail (lebih ringan) untuk grid, dan versi full untuk modal
const images = rawImages.map((img) => ({
  ...img,
  thumb: img.src.replace('w=1600', 'w=600'),
}))

export default function InteractiveGallery() {
  const [activeIndex, setActiveIndex] = useState(null)

  const openAt = (idx) => setActiveIndex(idx)
  const close = () => setActiveIndex(null)
  const hasActive = activeIndex !== null

  const active = useMemo(() => (hasActive ? images[activeIndex] : null), [hasActive, activeIndex])

  const prev = (e) => {
    e?.stopPropagation()
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  }
  const next = (e) => {
    e?.stopPropagation()
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length))
  }

  // Keyboard accessibility (ESC, ←, →)
  useEffect(() => {
    const onKey = (ev) => {
      if (!hasActive) return
      if (ev.key === 'Escape') close()
      if (ev.key === 'ArrowLeft') prev()
      if (ev.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hasActive])

  return (
    <div>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {images.map((img, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openAt(i)}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <motion.img
                src={img.thumb}
                alt={`${img.name} - ${img.role}`}
                className="h-full w-full object-cover"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
              <div className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-800 shadow-sm">
                {img.role}
              </div>
              <div className="mt-2 text-white font-semibold drop-shadow-sm">{img.name}</div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {hasActive && active && (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white"
                onClick={close}
                aria-label="Tutup pratinjau"
              >
                <X className="h-5 w-5" />
              </button>

              <button
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white"
                onClick={prev}
                aria-label="Sebelumnya"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white"
                onClick={next}
                aria-label="Berikutnya"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="aspect-video bg-gray-50">
                <img
                  src={active.src}
                  alt={`${active.name} - ${active.role}`}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-600">{active.role}</div>
                <div className="text-lg font-semibold">{active.name}</div>
                <p className="mt-2 text-sm text-gray-600">Tim yang kompak dan profesional siap berkolaborasi untuk tujuan bisnis Anda.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
