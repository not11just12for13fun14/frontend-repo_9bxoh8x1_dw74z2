import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Search, Palette, Megaphone, Zap, CheckCircle2, Mail, Phone, MapPin, ArrowRight, Stars } from 'lucide-react'

function App() {
  const [navSolid, setNavSolid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: 'SEO',
    message: '',
    budget: '',
    source: 'Website'
  })

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setError(null)
    try {
      const res = await fetch(`${baseUrl}/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.detail || 'Gagal mengirim pesan')
      setSuccess('Terima kasih! Pesan Anda sudah kami terima. Kami akan menghubungi Anda dalam 1x24 jam.')
      setForm({ name: '', email: '', company: '', service: 'SEO', message: '', budget: '', source: 'Website' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const services = [
    {
      icon: <Search className="w-6 h-6" />, title: 'SEO Specialist',
      desc: 'Audit, riset keyword, on-page & off-page optimization untuk meningkatkan peringkat dan trafik organik.'
    },
    {
      icon: <Palette className="w-6 h-6" />, title: 'Desain Kreatif',
      desc: 'Identitas visual, UI/UX, dan materi kampanye yang konsisten dan menarik perhatian.'
    },
    {
      icon: <Megaphone className="w-6 h-6" />, title: 'Promosi & Growth',
      desc: 'Strategi konten, distribusi, dan kampanye multiplatform untuk brand awareness dan konversi.'
    },
  ]

  const benefits = [
    'Strategi berbasis data & riset kompetitor',
    'Growth framework: attract → engage → convert',
    'Report yang jelas dan bisa ditindaklanjuti',
    'Pendekatan kolaboratif, bukan sekadar vendor',
  ]

  const statItems = [
    { label: 'Rata-rata Peningkatan Trafik', value: '187%' },
    { label: 'Keyword di Halaman 1', value: '320+' },
    { label: 'Konversi Naik', value: '2.4x' },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <div className={`fixed top-0 left-0 right-0 z-40 transition-colors ${navSolid ? 'bg-white/80 backdrop-blur border-b border-gray-100' : 'bg-transparent'}`}>
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 grid place-items-center text-white">
              <Rocket className="w-5 h-5" />
            </div>
            <span className="font-semibold">SEO & Creative Consultant</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-blue-600">Layanan</a>
            <a href="#works" className="hover:text-blue-600">Studi Kasus</a>
            <a href="#contact" className="hover:text-blue-600">Konsultasi</a>
            <a href="/test" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">Cek Backend <ArrowRight className="w-4 h-4"/></a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}
              className="text-4xl md:text-6xl font-extrabold leading-tight">
              Tingkatkan Trafik & Konversi dengan Strategi SEO + Desain yang Selaras
            </motion.h1>
            <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1, duration:0.6}}
              className="mt-4 text-lg text-gray-600">
              Saya membantu brand dan bisnis menonjol di mesin pencari dan di benak pelanggan—dari fondasi teknis hingga eksekusi kreatif.
            </motion.p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition">
                Konsultasi Gratis <ArrowRight className="w-4 h-4"/>
              </a>
              <a href="#services" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-200 hover:border-gray-300">
                Lihat Layanan
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6">
              {statItems.map((s, i) => (
                <motion.div key={i} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.1*i}}
                  className="rounded-xl border border-gray-200 p-4 bg-white">
                  <div className="text-2xl font-bold text-blue-600">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-200/40 to-purple-200/40 rounded-3xl blur-2xl" />
            <div className="relative bg-white rounded-3xl border border-gray-100 p-6 shadow-xl">
              <div className="flex items-center gap-2 text-blue-600 font-semibold"><Stars className="w-5 h-5"/> Hasil yang Terukur</div>
              <ul className="mt-4 space-y-3 text-sm">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5"/>
                    <span className="text-gray-700">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl p-4 bg-gradient-to-br from-blue-50 to-white">
                  <Search className="w-5 h-5 text-blue-600"/>
                  <p className="text-xs mt-2 text-gray-600">Audit Teknis</p>
                </div>
                <div className="rounded-xl p-4 bg-gradient-to-br from-purple-50 to-white">
                  <Palette className="w-5 h-5 text-purple-600"/>
                  <p className="text-xs mt-2 text-gray-600">Branding</p>
                </div>
                <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-50 to-white">
                  <Megaphone className="w-5 h-5 text-emerald-600"/>
                  <p className="text-xs mt-2 text-gray-600">Distribusi</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold">Layanan Utama</h2>
          <p className="text-gray-600 mt-2">Paket fleksibel yang disesuaikan dengan tujuan bisnis Anda.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.05*i}}
                className="rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition bg-white">
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-700 grid place-items-center">{s.icon}</div>
                <h3 className="mt-4 font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{s.desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-blue-600 font-medium">Pelajari lebih <ArrowRight className="w-4 h-4"/></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Works / Case Studies */}
      <section id="works" className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold">Studi Kasus Singkat</h2>
          <p className="text-gray-600 mt-2">Contoh dampak nyata dari kolaborasi.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <motion.div key={i} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}}
                className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
                <div className="h-40 bg-gradient-to-tr from-blue-200 to-indigo-200"/>
                <div className="p-5">
                  <div className="text-xs text-blue-600 font-semibold">E-Commerce</div>
                  <h3 className="font-semibold mt-1">Naik 220% Trafik Organik dalam 4 Bulan</h3>
                  <ul className="mt-3 text-sm text-gray-600 list-disc pl-5 space-y-1">
                    <li>Perbaikan struktur situs & internal linking</li>
                    <li>Konten berbasis intent & long-tail keywords</li>
                    <li>Dashboard KPI mingguan</li>
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Yuk Diskusi Target Anda</h2>
            <p className="text-gray-600 mt-2">Ceritakan kondisi saat ini dan tujuan yang ingin dicapai, saya akan rekomendasikan strategi terbaik.</p>
            <div className="mt-6 space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-blue-600"/> hello@yourbrand.id</div>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-blue-600"/> +62 812-3456-7890</div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-blue-600"/> Jakarta, Indonesia</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              {success && (
                <div className="p-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm border border-emerald-200">{success}</div>
              )}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">{error}</div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Nama Lengkap</label>
                  <input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder="Nama Anda" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input required type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} placeholder="email@contoh.com" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Perusahaan / Brand</label>
                  <input value={form.company} onChange={e=>setForm({...form, company: e.target.value})} placeholder="Opsional" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-sm font-medium">Layanan</label>
                  <select value={form.service} onChange={e=>setForm({...form, service: e.target.value})} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>SEO</option>
                    <option>Desain</option>
                    <option>Promosi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Pesan</label>
                <textarea required rows={5} value={form.message} onChange={e=>setForm({...form, message: e.target.value})} placeholder="Ceritakan tantangan & target Anda..." className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Perkiraan Budget</label>
                  <select value={form.budget} onChange={e=>setForm({...form, budget: e.target.value})} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Pilih</option>
                    <option>Rp5-15jt</option>
                    <option>Rp15-30jt</option>
                    <option>Rp30-60jt</option>
                    <option>> Rp60jt</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Darimana Anda tahu?</label>
                  <select value={form.source} onChange={e=>setForm({...form, source: e.target.value})} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Website</option>
                    <option>Google</option>
                    <option>Instagram</option>
                    <option>LinkedIn</option>
                    <option>Referensi Teman</option>
                  </select>
                </div>
              </div>

              <button disabled={loading} type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold py-3 rounded-lg transition">
                {loading ? (<>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
                  Mengirim...
                </>) : (<>
                  <Zap className="w-5 h-5"/> Kirim Permintaan
                </>)}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} SEO Specialist & Creative Consultant</div>
          <div className="flex items-center gap-6">
            <a href="#services" className="hover:text-blue-600">Layanan</a>
            <a href="#works" className="hover:text-blue-600">Studi Kasus</a>
            <a href="#contact" className="hover:text-blue-600">Konsultasi</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
