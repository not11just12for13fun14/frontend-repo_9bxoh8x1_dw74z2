import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const images = [
  {
    src: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1200&auto=format&fit=crop',
    name: 'Rina',
    role: 'SEO Specialist',
  },
  {
    src: 'https://images.unsplash.com/photo-1548946526-f69e2424cf45?q=80&w=1200&auto=format&fit=crop',
    name: 'Dika',
    role: 'Brand Designer',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    name: 'Tim Kolaborasi',
    role: 'Creative Team',
  },
  {
    src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop',
    name: 'Andi',
    role: 'Content Strategist',
  },
]

export default function InteractiveGallery() {
  const [active, setActive] = useState(null)

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActive(img)}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <motion.img
                src={img.src}
                alt={`${img.name} - ${img.role}`}
                className="h-full w-full object-cover"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
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
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white"
                onClick={() => setActive(null)}
                aria-label="Tutup pratinjau"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="aspect-video bg-gray-50">
                <img src={active.src} alt={`${active.name} - ${active.role}`} className="h-full w-full object-cover" />
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
