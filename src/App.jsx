import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);
const Icon = ({ children='✦', className='' }) => <span className={`inline-grid h-8 w-8 place-items-center rounded-full bg-cyan/10 text-cyan ${className}`}>{children}</span>;


const sections = ['about', 'skills', 'projects', 'services', 'github', 'blog', 'contact'];
const stats = [['120+', 'Projects Completed'], ['45+', 'Technologies'], ['5+', 'Years Experience'], ['38+', 'Happy Clients']];
const skills = ['Frontend', 'Backend', 'AI & Machine Learning', 'Python', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'Git & GitHub', 'Cloud', 'Deployment', 'Prompt Engineering', 'LLMs', 'RAG', 'Computer Vision', 'NLP', 'APIs', 'Docker'];
const projects = ['AI Resume Analyzer', 'AI Customer Support Chatbot', 'AI Image Generator', 'Enterprise SaaS Dashboard', 'AI Study Assistant', 'Task Management Platform', 'AI Automation Platform', 'Portfolio Website'];
const services = ['AI Application Development', 'AI Chatbot Development', 'Full Stack Development', 'Website Development', 'REST API Development', 'Automation Solutions', 'UI/UX Development', 'AI Consultation', 'Machine Learning Solutions'];
const posts = ['Building RAG Systems That Actually Ship', 'Designing SaaS Dashboards for Enterprise Teams', 'Prompt Engineering Patterns for Production AI'];

function Scene() {
  const mount = useRef(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, .1, 100);
    camera.position.z = 7;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const group = new THREE.Group();
    const colors = [0x7c3cff, 0x22d3ee, 0x42ffb5];
    colors.forEach((c, i) => { const geo = new THREE.IcosahedronGeometry(1, 2); const mat = new THREE.MeshStandardMaterial({ color: c, metalness: .65, roughness: .2, wireframe: i===1 }); const mesh = new THREE.Mesh(geo, mat); mesh.position.set((i-1)*2.5, i===0?1.2:i===1?-.8:.2, -i); group.add(mesh); });
    scene.add(group); scene.add(new THREE.AmbientLight(0xffffff, .8)); const light = new THREE.PointLight(0x22d3ee, 3); light.position.set(5,5,5); scene.add(light);
    const stars = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(Array.from({length:1800},()=> (Math.random()-.5)*80), 3)), new THREE.PointsMaterial({ color: 0xffffff, size: .035, transparent: true, opacity: .65 })); scene.add(stars);
    const resize = () => { const el = mount.current; if (!el) return; renderer.setSize(el.clientWidth, el.clientHeight); camera.aspect = el.clientWidth / el.clientHeight; camera.updateProjectionMatrix(); };
    mount.current.appendChild(renderer.domElement); resize(); window.addEventListener('resize', resize); let frame; const animate=()=>{ frame=requestAnimationFrame(animate); group.rotation.x+=.003; group.rotation.y+=.005; stars.rotation.y+=.0007; renderer.render(scene,camera); }; animate();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); renderer.dispose(); mount.current?.replaceChildren(); };
  }, []);
  return <div ref={mount} className="absolute inset-0" aria-hidden="true" />;
}

function useTyping(words) {
  const [text, setText] = useState('');
  useEffect(() => {
    let word = 0, i = 0, deleting = false;
    const id = setInterval(() => {
      const current = words[word % words.length];
      setText(current.slice(0, i));
      if (!deleting && i++ === current.length + 10) deleting = true;
      if (deleting && i-- === 0) { deleting = false; word++; }
    }, 65);
    return () => clearInterval(id);
  }, [words]);
  return text;
}

function MagneticButton({ children, href = '#contact', primary }) {
  return <motion.a whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }} href={href} className={`group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${primary ? 'bg-white text-ink shadow-glow dark:bg-white' : 'border border-white/15 bg-white/10 text-white backdrop-blur-xl hover:bg-white/15 dark:text-white'}`}>{children}<span className="transition group-hover:translate-x-1 group-hover:-translate-y-1">↗</span></motion.a>;
}

function Card({ children, className = '' }) { return <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.65 }} className={`rounded-[2rem] border border-white/10 bg-white/[.07] p-6 shadow-premium backdrop-blur-2xl dark:bg-white/[.06] ${className}`}>{children}</motion.div>; }
function SectionTitle({ eyebrow, title, children }) { return <div className="mx-auto mb-12 max-w-3xl text-center"><p className="mb-3 text-sm font-bold uppercase tracking-[.32em] text-cyan">{eyebrow}</p><h2 className="font-display text-4xl font-black tracking-tight md:text-6xl">{title}</h2>{children && <p className="mt-5 text-lg text-slate-300">{children}</p>}</div>; }

export default function App() {
  const [dark, setDark] = useState(true), [menu, setMenu] = useState(false), [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const typed = useTyping(['enterprise AI products', 'full-stack SaaS platforms', 'LLM apps, RAG systems, APIs']);
  const { scrollYProgress } = useScroll(); const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); }, [dark]);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1100); return () => clearTimeout(t); }, []);
  useEffect(() => { gsap.utils.toArray('section').forEach((el) => gsap.fromTo(el, { opacity: 0.88, y: 35 }, { opacity: 1, y: 0, duration: 0.9, scrollTrigger: { trigger: el, start: 'top 84%' } })); }, []);
  useEffect(() => { const move = (event) => setCursor({ x: event.clientX, y: event.clientY }); window.addEventListener('pointermove', move); return () => window.removeEventListener('pointermove', move); }, []);


  return <div className="min-h-screen overflow-x-hidden bg-pearl text-slate-950 selection:bg-cyan selection:text-ink dark:bg-ink dark:text-white">
    <AnimatePresence>{loading && <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] grid place-items-center bg-ink"><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }} className="h-24 w-24 rounded-full border border-cyan/20 border-t-cyan shadow-glow" /><p className="absolute mt-36 text-sm uppercase tracking-[.45em] text-cyan">Loading brilliance</p></motion.div>}</AnimatePresence>
    <motion.div style={{ scaleX }} className="fixed left-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-electric via-cyan to-aurora" />
    <div className="pointer-events-none fixed z-50 hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/70 mix-blend-difference md:block" style={{ left: cursor.x, top: cursor.y }} />
    <div className="pointer-events-none fixed z-40 hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/15 blur-2xl md:block" style={{ left: cursor.x, top: cursor.y }} />
    <div className="pointer-events-none fixed inset-0 z-0"><div className="absolute left-[-10%] top-[-10%] h-[42rem] w-[42rem] animate-aurora rounded-full bg-electric/30 blur-3xl" /><div className="absolute right-[-8%] top-[18%] h-[36rem] w-[36rem] animate-aurora rounded-full bg-cyan/20 blur-3xl" /><div className="absolute bottom-0 left-[30%] h-[30rem] w-[30rem] rounded-full bg-rose/20 blur-3xl" /></div>
    <nav className="fixed inset-x-0 top-4 z-40 mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-ink/55 px-5 py-3 text-white shadow-premium backdrop-blur-2xl"><a href="#home" className="font-display text-xl font-black">AI<span className="text-cyan">.</span>Dev</a><div className="hidden gap-5 md:flex">{sections.map(s => <a key={s} href={`#${s}`} className="text-sm capitalize text-slate-300 hover:text-white">{s}</a>)}</div><div className="flex items-center gap-2"><button aria-label="Toggle theme" onClick={() => setDark(!dark)} className="rounded-full border border-white/10 p-2">{dark ? '☀' : '☾'}</button><button onClick={() => setMenu(!menu)} className="md:hidden">{menu ? '✕' : '☰'}</button></div></nav>
    {menu && <div className="fixed inset-x-4 top-20 z-40 rounded-3xl border border-white/10 bg-ink/90 p-6 text-white backdrop-blur-2xl md:hidden">{sections.map(s => <a onClick={()=>setMenu(false)} className="block py-3 capitalize" href={`#${s}`} key={s}>{s}</a>)}</div>}
    <main className="relative z-10">
      <section id="home" className="relative min-h-screen px-6 pt-32"><Scene /><div className="mx-auto grid max-w-6xl items-center gap-12 py-16 md:grid-cols-[1.1fr_.9fr]"><div><div className="mb-6 inline-flex rounded-full border border-cyan/25 bg-cyan/10 px-4 py-2 text-sm text-cyan"><span className="mr-2">✦</span>Available for AI SaaS, automation & product engineering</div><h1 className="font-display text-5xl font-black tracking-tight md:text-7xl">AI Engineer & Full Stack Developer</h1><p className="mt-6 max-w-2xl text-xl text-slate-300">I design and build {typed}<span className="text-cyan">|</span> with premium interfaces, scalable backends, and production-ready intelligence.</p><div className="mt-9 flex flex-wrap gap-3"><MagneticButton primary href="#projects">View Projects</MagneticButton><MagneticButton href="#contact">Hire Me</MagneticButton><MagneticButton href="/resume.pdf">Download Resume</MagneticButton><MagneticButton href="#contact">Contact Me</MagneticButton></div></div><div className="relative mx-auto h-[27rem] w-[27rem] max-w-full animate-float rounded-full border border-white/15 bg-white/10 p-4 shadow-glow backdrop-blur-2xl"><div className="absolute inset-0 rounded-full bg-gradient-to-tr from-electric via-cyan to-aurora opacity-50 blur-2xl"/><img alt="Professional profile placeholder" className="relative h-full w-full rounded-full object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80"/></div></div></section>
      <section id="about" className="px-6 py-24"><SectionTitle eyebrow="Profile" title="Engineering premium AI products end-to-end">Career objective: partner with ambitious teams to transform complex ideas into secure, beautiful and useful AI-powered software.</SectionTitle><div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-4">{stats.map(([n,l])=><Card key={l} className="text-center"><div className="text-4xl font-black text-cyan">{n}</div><p className="mt-2 text-slate-300">{l}</p></Card>)}<Card className="md:col-span-2"><h3 className="text-2xl font-bold">Biography</h3><p className="mt-4 text-slate-300">Software engineer focused on LLM systems, RAG workflows, modern React applications, API platforms, cloud deployments, and delightful digital experiences.</p></Card><Card className="md:col-span-2"><h3 className="text-2xl font-bold">Timeline</h3>{['Computer Science Education', 'Full Stack Engineering', 'AI Product Specialization'].map((x,i)=><p className="mt-4 border-l border-cyan/40 pl-4 text-slate-300" key={x}>0{i+1}. {x}</p>)}</Card></div></section>
      <section id="skills" className="px-6 py-24"><SectionTitle eyebrow="Capabilities" title="A production-ready technology stack" /> <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">{skills.map((s,i)=>{return <Card key={s}><Icon className="mb-5">✦</Icon><h3 className="font-bold">{s}</h3><p className="mt-2 text-sm text-slate-400">Architecture, implementation, optimization, testing and deployment.</p></Card>})}</div></section>
      <section id="projects" className="px-6 py-24"><SectionTitle eyebrow="Selected Work" title="Featured AI & SaaS case studies" /> <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">{projects.map((p,i)=><Card key={p} className="overflow-hidden p-0"><div className="h-56 bg-gradient-to-br from-electric/60 via-cyan/30 to-aurora/30 p-6"><div className="h-full rounded-3xl border border-white/20 bg-ink/25 backdrop-blur" /></div><div className="p-6"><h3 className="text-2xl font-bold">{p}</h3><p className="mt-3 text-slate-300">Premium placeholder case study for a scalable product with AI workflows, analytics, authentication and deployment.</p><div className="mt-4 flex flex-wrap gap-2">{['React','Node','AI','Cloud'].map(t=><span className="rounded-full bg-white/10 px-3 py-1 text-xs" key={t}>{t}</span>)}</div><div className="mt-5 flex flex-wrap gap-3"><MagneticButton href="#">GitHub</MagneticButton><MagneticButton href="#">Live Demo</MagneticButton><MagneticButton href="#">Case Study</MagneticButton></div></div></Card>)}</div></section>
      <section id="services" className="px-6 py-24"><SectionTitle eyebrow="Services" title="From prototype to enterprise launch"/><div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">{services.map(s=><Card key={s}><Icon className="mb-5">🚀</Icon><h3 className="text-xl font-bold">{s}</h3><p className="mt-3 text-slate-300">Strategy, design, engineering and iteration for premium product outcomes.</p></Card>)}</div></section>
      <section className="px-6 py-24"><SectionTitle eyebrow="Proof" title="Achievements, testimonials and experience"/><div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">{['Awards & Hackathons','Certificates & Publications','Open Source Contributions','“A rare mix of product taste and engineering depth.”','“Shipped our AI MVP faster than expected.”','“Premium UI, clean architecture, excellent communication.”'].map(x=><Card key={x}><p className="text-lg font-semibold">{x}</p></Card>)}</div></section>
      <section id="github" className="px-6 py-24"><SectionTitle eyebrow="Open Source" title="GitHub activity and repositories"/><Card className="mx-auto max-w-6xl"><div className="grid gap-3 md:grid-cols-12">{Array.from({length:120}).map((_,i)=><div key={i} className={`h-4 rounded ${i%7===0?'bg-cyan':i%5===0?'bg-aurora/70':'bg-white/10'}`}/>)}</div><div className="mt-8 grid gap-4 md:grid-cols-3">{['Pinned Repository','Latest Repository','GitHub Statistics'].map(x=><div className="rounded-2xl border border-white/10 bg-white/5 p-5" key={x}><Icon className="mb-3">⌘</Icon><h3 className="font-bold">{x}</h3><p className="text-sm text-slate-400">Placeholder API-ready GitHub module.</p></div>)}</div></Card></section>
      <section id="blog" className="px-6 py-24"><SectionTitle eyebrow="Writing" title="Ideas about AI engineering and product craft"/><div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">{posts.map(p=><Card key={p}><p className="text-sm text-cyan">Article</p><h3 className="mt-3 text-xl font-bold">{p}</h3><p className="mt-3 text-slate-300">Placeholder thought leadership article with SEO-ready metadata.</p></Card>)}</div></section>
      <section id="contact" className="px-6 py-24"><SectionTitle eyebrow="Contact" title="Let's build something intelligent"/><div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2"><Card><form onSubmit={(e)=>e.preventDefault()}><input placeholder="Name"/><input placeholder="Email"/><textarea rows="5" placeholder="Project details"/><MagneticButton primary href="#">✉Send Message</MagneticButton></form><p className="mt-4 text-sm text-slate-400">EmailJS-ready form placeholders: add service, template and public keys.</p></Card><Card><h3 className="text-2xl font-bold">Contact Details</h3>{[['Email','hello@example.com'],['GitHub','github.com/username'],['LinkedIn','linkedin.com/in/username'],['Phone','+1 (000) 000-0000'],['Location','Your City, Country']].map(([a,b])=><p className="mt-4 flex gap-3 text-slate-300" key={a}><Icon>✉</Icon> <span><b>{a}:</b> {b}</span></p>)}</Card></div></section>
    </main><footer className="relative z-10 border-t border-white/10 px-6 py-10"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 md:flex-row"><p className="font-display text-2xl font-black">AI.Dev</p><p className="text-slate-400">© 2026 Premium AI Engineer Portfolio. All rights reserved.</p><div className="flex gap-3"><span>GitHub</span><span>LinkedIn</span><a href="#home"><span>↑</span></a></div></div></footer>
  </div>;
}
