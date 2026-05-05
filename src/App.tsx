import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import * as THREE from 'three';
import '@google/model-viewer';
import { 
  Wrench, 
  Paintbrush, 
  Settings, 
  ShieldCheck, 
  Car, 
  ArrowUpRight, 
  MapPin, 
  Phone, 
  MessageSquare,
  Zap,
  Gauge,
  History,
  Award,
  BadgeCheck,
  Smartphone,
  ChevronRight,
  Instagram,
  Facebook,
  Mail,
  Clock,
  ExternalLink
} from 'lucide-react';
import { cn } from './lib/utils';

gsap.registerPlugin(ScrollTrigger);

// --- Awards Ticker Component ---
const AwardsTicker = () => {
  return (
    <div className="w-full bg-brand-cyan/5 border-y border-brand-cyan/10 py-4 overflow-hidden relative group">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-20 whitespace-nowrap items-center"
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 text-xs font-black tracking-[0.4em] text-brand-cyan">
            <Award className="w-4 h-4" />
            <span>BEST OF COLUMBUS 2024</span>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan/30" />
            <span>TOP RATED PRECISION WORKSHOP</span>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan/30" />
            <span>10+ YEARS OF EXCELLENCE</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- Mechanical Breakdown (The "Wow" Component) ---
const MechanicalBreakdown = () => {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: "-100px" });

  const modules = [
    { id: '01', title: 'CHASSIS', icon: Car, x: -100, y: -100 },
    { id: '02', title: 'DRIVETRAIN', icon: Zap, x: 100, y: -100 },
    { id: '03', title: 'DIAGNOSTICS', icon: Settings, x: -100, y: 100 },
    { id: '04', title: 'COATING', icon: Paintbrush, x: 100, y: 100 },
  ];

  return (
    <div ref={container} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-24">
        <span className="text-brand-cyan text-[10px] font-black tracking-[1em] uppercase mb-4 block">SYSTEM ARCHITECTURE</span>
        <h2 className="text-4xl md:text-6xl font-display font-black italic tracking-tighter uppercase">MECHANICAL<br />SYNERGY.</h2>
      </div>

      <div className="relative w-full max-w-5xl mx-auto h-[600px] flex items-center justify-center">
        {/* Central Core */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-48 h-48 glass rounded-full flex items-center justify-center border-brand-cyan/40 relative z-20"
        >
          <div className="absolute inset-0 bg-brand-cyan/5 rounded-full animate-pulse" />
          <div className="text-center">
            <span className="text-[10px] font-black tracking-widest text-brand-cyan">PRECISION</span>
            <div className="text-2xl font-display font-black">CORE</div>
          </div>
        </motion.div>

        {/* Satellite Modules */}
        {modules.map((module, i) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, x: module.x, y: module.y }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 1.5, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute flex flex-col items-center gap-4 z-10"
            style={{ 
              top: `calc(50% + ${module.y * 1.5}px)`, 
              left: `calc(50% + ${module.x * 2.5}px)` 
            }}
          >
            <div className="w-16 h-16 glass rounded-sm flex items-center justify-center border-white/10 hover:border-brand-cyan transition-colors">
              <module.icon className="w-6 h-6 text-brand-cyan" />
            </div>
            <div className="text-center">
               <span className="text-[9px] text-white/30 font-black">{module.id}</span>
               <h4 className="text-xs font-black tracking-widest">{module.title}</h4>
            </div>
            {/* Connecting Line */}
            <div className="absolute w-[2px] h-[100px] bg-gradient-to-t from-brand-cyan/20 to-transparent -z-10 origin-bottom" 
                 style={{ transform: `rotate(${Math.atan2(-module.y, -module.x) * 180 / Math.PI - 90}deg)` }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
const HeroVideoBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-black/50 z-10 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-brand-dark/80 to-brand-black z-10" />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-[120%] object-cover opacity-30 grayscale contrast-125 saturate-50"
      >
        <source src="https://cdn.coverr.co/videos/coverr-mechanic-working-on-a-car-engine-4458/1080p.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color(0x00F3FF); // Cyan
    const color2 = new THREE.Color(0x1A1A1A); // Dark

    for (let i = 0; i < count * 3; i += 3) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 30;
      positions[i] = x;
      positions[i + 1] = y;
      positions[i + 2] = z;

      const mixedColor = color1.clone().lerp(color2, Math.random() * 0.8);
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.012,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 6;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: globalThis.MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.0002;
      particlesMesh.rotation.z += 0.0001;
      
      gsap.to(camera.position, {
        x: mouseX * 0.8,
        y: -mouseY * 0.8,
        duration: 4,
        ease: 'power2.out'
      });

      gsap.to(particlesMesh.rotation, {
        x: mouseY * 0.2,
        y: mouseX * 0.2,
        duration: 5,
        ease: 'power1.out'
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      scene.remove(particlesMesh);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />;
};

// --- Model Viewer Component ---
const Car3DViewer = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full h-full relative group pointer-events-auto", className)}>
      {/* @ts-ignore */}
      <model-viewer
        src="https://modelviewer.dev/shared-assets/models/glTF-Sample-Assets/Models/ToyCar/glTF-Binary/ToyCar.glb"
        ios-src=""
        poster="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000"
        alt="Damiz Premium Vehicle Model"
        shadow-intensity="2"
        camera-controls
        auto-rotate
        rotation-per-second="15deg"
        interaction-prompt="none"
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
        exposure="1.8"
        environment-image="neutral"
      >
      </model-viewer>
      <div className="absolute bottom-6 left-6 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-2">
           <Zap className="w-3 h-3 text-brand-cyan animate-pulse" />
           <span className="text-[9px] text-white/40 uppercase tracking-[0.4em] font-black">Live Technical Render</span>
        </div>
      </div>
    </div>
  );
};

// --- Service Card Component with 3D Tilt ---
const ServiceCard = ({ icon: Icon, title, desc, img, index, colSpan = "col-span-12 md:col-span-4" }: { icon: any, title: string, desc: string, img: string, index: number, colSpan?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (!cardRef.current || window.innerWidth < 768) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(cardRef.current, {
      rotationY: x * 15,
      rotationX: -y * 15,
      scale: 1.05,
      transformPerspective: 1500,
      ease: 'power3.out',
      duration: 0.4
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      ease: 'power3.out',
      duration: 0.6
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, scale: 0.9, filter: "blur(20px)", rotateY: index % 2 === 0 ? -15 : 15, z: -100 }}
      whileInView={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)", rotateY: 0, z: 0 }}
      transition={{ delay: index * 0.15, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "glass group relative overflow-hidden laser-line flex flex-col min-h-[450px] md:min-h-[500px] cursor-pointer block-tilt",
        colSpan
      )}
      style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
    >
      <div className="h-1/2 md:h-2/3 relative overflow-hidden" style={{ transform: 'translateZ(30px)' }}>
        <img 
          src={img} 
          alt={title} 
          className="parallax-image absolute -top-[20%] left-0 w-full h-[140%] object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
        <motion.div 
          animate={isHovered ? { rotate: [0, -10, 10, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute top-6 left-6 w-12 h-12 glass rounded-sm flex items-center justify-center border-brand-cyan/20 group-hover:border-brand-cyan transition-all"
        >
          <Icon className="w-6 h-6 text-brand-cyan" />
        </motion.div>
      </div>
      <div className="p-6 md:p-10 relative z-10 bg-brand-dark/95 flex-1 flex flex-col justify-center">
        <h3 className="text-xl md:text-2xl font-display font-black mb-3 tracking-tighter group-hover:text-brand-cyan transition-colors uppercase">
          {title}
        </h3>
        <p className="text-text-s leading-relaxed text-xs md:text-sm font-sans opacity-70 group-hover:opacity-100 transition-opacity">
          {desc}
        </p>
        <div className="mt-6 md:mt-8 flex items-center gap-3 text-[10px] font-black tracking-[0.4em] text-brand-cyan opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-white group-hover:text-brand-cyan">
           INITIATE PROTOCOL <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
};

// --- Brands Ticker Component ---
const BrandsTicker = () => {
  const brands = ["TOYOTA", "LEXUS", "HONDA", "NISSAN", "ACURA", "INFINITI", "SUBARU", "MAZDA"];
  return (
    <div className="w-full bg-black border-y border-white/5 py-10 overflow-hidden relative group z-10">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <motion.div 
        animate={{ x: [0, -2000] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex gap-24 whitespace-nowrap items-center px-12"
      >
        {[...Array(3)].map((_, i) => (
           <div key={i} className="flex items-center gap-24">
             {brands.map((brand, j) => (
                <div key={j} className="text-3xl md:text-5xl font-display font-black text-white/5 hover:text-white/80 transition-colors cursor-default tracking-widest">
                  {brand}
                </div>
             ))}
           </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- Testimonials Component ---
const BrandTestimonials = () => {
  return (
    <section className="py-32 px-6 bg-brand-dark relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
         <div className="flex flex-col items-center text-center mb-20">
            <span className="text-brand-cyan text-[10px] font-black tracking-[1em] uppercase block mb-4">REPUTATION</span>
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter italic uppercase text-white">THE VERDICT.</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              { n: "ALEX T.", c: "Lexus LFA", r: "The only shop in Ohio I trust with my LFA. Their surgical precision is unmatched. Absolute perfection." },
              { n: "MARCUS J.", c: "Toyota Supra", r: "They don't just tune; they engineer. The power delivery is flawless after their tuning session." },
              { n: "SARAH W.", c: "Honda NSX", r: "Mirror finish painting and perfect panel alignment. It looks vastly better than it did at the factory." }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: i * 0.2, duration: 1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass p-10 relative laser-line hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="absolute top-0 right-10 text-brand-cyan/10 text-9xl font-display italic leading-none rotate-12 pointer-events-none">"</div>
                <div className="flex gap-1 mb-6">
                   {[...Array(5)].map((_, j) => <div key={j} className="w-2 h-2 rotate-45 bg-brand-cyan shadow-[0_0_10px_rgba(0,243,255,0.5)]" />)}
                </div>
                <p className="text-white/70 font-medium text-sm leading-relaxed mb-8 relative z-10 italic">
                  "{review.r}"
                </p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                   <div className="w-10 h-10 bg-white/5 rounded-sm flex items-center justify-center font-display font-black text-brand-cyan">
                     {review.n[0]}
                   </div>
                   <div>
                      <h5 className="text-xs font-black tracking-widest uppercase text-white mb-1">{review.n}</h5>
                      <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest">{review.c}</span>
                   </div>
                </div>
              </motion.div>
            ))}
         </div>
      </div>
    </section>
  );
};

// --- Counter Component ---
const Counter = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 3,
        ease: "expo.out",
        onUpdate: () => setCount(Math.floor(obj.val))
      });
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="text-4xl md:text-6xl font-display font-black text-white mb-2">{count}{suffix}</div>
      <div className="text-[10px] uppercase tracking-[0.4em] text-brand-cyan font-bold">{label}</div>
    </div>
  );
};

const SplitText = ({ children, className }: { children: string, className?: string }) => {
  return (
    <span className={cn("inline-block overflow-hidden", className)}>
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
};

// --- Floating WhatsApp Concierge ---
const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[200]">
      {/* Popover */}
      <AnimatePresence>
        {isOpen && (
           <motion.div 
             initial={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
             animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
             exit={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
             transition={{ type: 'spring', damping: 25, stiffness: 200 }}
             className="absolute bottom-20 right-0 w-[300px] md:w-[320px] bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col origin-bottom-right"
           >
              <div className="bg-[#128C7E] p-4 flex items-center gap-4 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#075E54] to-[#128C7E] opacity-50 z-0 pointer-events-none" />
                 <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 relative z-10 shrink-0">
                    <img src="https://images.unsplash.com/photo-1562145980-879be271d4ff?q=80&w=1000" alt="Avatar" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-white" />
                 </div>
                 <div className="relative z-10 flex-col">
                    <h4 className="text-white font-bold text-sm tracking-wide leading-tight">Damiz Team</h4>
                    <p className="text-white/70 text-[9px] uppercase font-bold tracking-widest mt-1">Replies in 5m</p>
                 </div>
              </div>
              <div className="p-4 bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-[#111] h-32 relative flex items-end">
                 {/* Chat bubble */}
                 <motion.div 
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.2 }}
                   className="bg-[#2A2A2A] p-3 rounded-t-xl rounded-br-xl max-w-[90%] border border-white/5 relative z-10 shadow-lg"
                 >
                    <p className="text-white text-xs leading-relaxed font-medium">Hello! Welcome to Damiz Auto Care. How can our master technicians assist today?</p>
                    <span className="text-[8px] text-white/40 block mt-1 text-right">Just now</span>
                 </motion.div>
              </div>
              <div className="p-4 bg-[#1a1a1a]">
                 <a 
                   href="https://wa.me/13802237472" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-full py-3 bg-[#25D366] text-white rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors"
                 >
                   <MessageSquare className="w-4 h-4 fill-white" /> Start Chat
                 </a>
              </div>
           </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.1, y: -5 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white cursor-pointer group shadow-[0_10px_40px_rgba(37,211,102,0.4)] relative"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#25D366] to-[#128C7E] group-hover:scale-110 transition-transform duration-500 rounded-full" />
        <MessageSquare className="w-6 h-6 md:w-8 md:h-8 fill-white relative z-10" />
        {!isOpen && <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full border-2 border-brand-black flex items-center justify-center text-[7px] md:text-[8px] font-black animate-pulse z-20">1</div>}
        <div className="absolute right-full mr-6 py-3 px-6 glass border-brand-cyan/20 hidden md:block opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-500 backdrop-blur-3xl pointer-events-none">
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white whitespace-nowrap">Concierge On-Call</span>
        </div>
      </motion.button>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center">
           
           <div className="col-span-12 lg:col-span-7 z-10 text-center lg:text-left">
              <div className="flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-4 mb-10 px-4 py-2 border border-brand-cyan/20 bg-brand-cyan/5 w-fit mx-auto lg:mx-0"
                >
                   <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                   <span className="text-[10px] uppercase tracking-[0.6em] text-brand-cyan font-black">ESTABLISHED 2014 • COLUMBUS, OH</span>
                </motion.div>
                
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[140px] font-display font-black leading-[1] tracking-tighter mb-8 md:mb-12 text-gradient italic uppercase">
                  <SplitText>RESTORE</SplitText><br />
                  <motion.span
                    initial={{ opacity: 0, filter: "blur(10px)", x: -20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-brand-cyan"
                  >
                    PERFECTION.
                  </motion.span>
                </h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 2, delay: 1 }}
                  className="max-w-xl mx-auto lg:mx-0 text-text-s text-xs md:text-base leading-relaxed mb-12 md:mb-16 font-sans uppercase tracking-widest"
                >
                   Columbus' elite standard for Toyota, Lexus, Honda, and Nissan. 
                   Where 10+ years of mastery meets surgical precision. We don't just fix cars; we restore their soul.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6"
                >
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-6 bg-brand-cyan text-brand-black font-black text-xs tracking-[0.3em] uppercase hover:bg-white transition-all shadow-[0_0_30px_rgba(0,243,255,0.2)]"
                  >
                    Book Master Inspection
                  </motion.button>
                  <motion.button 
                    whileHover={{ x: 10 }}
                    className="px-12 py-6 border border-brand-border text-white font-black text-xs tracking-[0.3em] uppercase hover:bg-white/5 transition-all flex items-center justify-center gap-4 group"
                  >
                    Our Engineering <ChevronRight className="w-4 h-4 text-brand-cyan group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                </motion.div>
              </div>
           </div>

           <div className="col-span-12 lg:col-span-1 border-none hidden lg:block" />

           <div className="col-span-12 lg:col-span-4 relative h-[300px] sm:h-[400px] md:h-[700px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)", rotate: -10 }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)", rotate: 0 }}
                transition={{ duration: 2.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full"
              >
                <Car3DViewer className="drop-shadow-[0_0_100px_rgba(0,243,255,0.15)]" />
              </motion.div>
           </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-6"
        >
           <span className="text-[9px] uppercase tracking-[0.5em] font-black text-brand-cyan">Explore Legacy</span>
           <div className="w-[1px] h-24 bg-gradient-to-b from-brand-cyan to-transparent animate-bounce" />
        </motion.div>
    </section>
  );
};

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Parallax Effect
    const parallaxImages = gsap.utils.toArray('.parallax-image');
    parallaxImages.forEach((img: any) => {
      gsap.to(img, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <main className="bg-brand-black min-h-screen text-text-p selection:bg-brand-cyan selection:text-brand-black">
      <HeroVideoBackground />
      <ParticleBackground />

      {/* --- Navbar --- */}
      <header className="fixed top-0 left-0 w-full z-[100] glass border-b px-6 md:px-12 py-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-sm bg-brand-cyan flex items-center justify-center font-black text-brand-black text-xl shadow-[0_0_20px_rgba(0,243,255,0.3)]">D</div>
           <div className="flex flex-col">
              <span className="text-xl font-display font-black tracking-[0.2em] leading-none uppercase">Damiz Auto Care</span>
              <span className="text-[9px] tracking-[0.4em] text-brand-cyan font-black mt-1">PRECISION AUTO CARE THAT RESTORES PERFECTION</span>
           </div>
        </div>
        <nav className="hidden lg:flex gap-16 text-[11px] uppercase tracking-[0.4em] font-black text-white/40">
          <a href="#services" className="hover:text-brand-cyan transition-all hover:tracking-[0.6em]">Services</a>
          <a href="#about" className="hover:text-brand-cyan transition-all hover:tracking-[0.6em]">Engineering</a>
          <a href="#contact" className="hover:text-brand-cyan transition-all hover:tracking-[0.6em]">Contact</a>
        </nav>
        <button className="hidden md:flex flex-col items-end group overflow-hidden">
          <span className="text-brand-cyan text-[10px] font-black tracking-widest group-hover:text-white transition-colors uppercase">Secure Your Slot</span>
          <div className="w-12 h-[1px] bg-brand-cyan group-hover:w-full transition-all duration-500" />
        </button>
      </header>

      {/* --- Hero Section --- */}
      <Hero />
      <AwardsTicker />

      {/* --- Brands Strip --- */}
      <BrandsTicker />

      {/* --- Stat Strip --- */}
      <section className="bg-brand-dark/80 backdrop-blur-xl border-y border-white/5 py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4 md:divide-x divide-white/5">
           <Counter value={10} label="Years Mastery" suffix="+" />
           <Counter value={5400} label="Vehicles Restored" suffix="+" />
           <Counter value={98} label="Expert Rate" suffix="%" />
           <Counter value={1} label="Columbus Rated" suffix="#" />
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-24 md:py-48 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="mb-16 md:mb-32 flex flex-col md:flex-row justify-between items-center md:items-end gap-10 text-center md:text-left">
           <div className="max-w-2xl">
              <span className="text-brand-cyan text-[10px] font-black tracking-[1em] uppercase block mb-6 px-1">SERVICES / PROTOCOLS</span>
              <h2 className="text-4xl md:text-8xl font-display font-black tracking-tighter leading-[0.85] italic">THE SUITE OF<br />DOMINANCE.</h2>
           </div>
           <p className="max-w-xs text-text-s text-xs md:text-sm leading-relaxed font-sans mb-4 opacity-50">
             We operate at the intersection of surgical precision and artistic obsession. Your asset deserves nothing less.
           </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
           <ServiceCard 
             index={0}
             icon={Wrench}
             title="Body Repair"
             img="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200"
             desc="Structural rejuvenation and expert bodywork for Toyota, Lexus, and luxury imports. Extreme precision alignment."
             colSpan="col-span-12 md:col-span-8"
           />
           <ServiceCard 
             index={1}
             icon={Paintbrush}
             title="Master Painting"
             img="https://images.unsplash.com/photo-1599256621730-535171e28e50?q=80&w=1000"
             desc="Surgical-grade spray booth technology. Mirror finishes and factory color matching for elite aesthetics."
             colSpan="col-span-12 md:col-span-4" 
           />
           <ServiceCard 
             index={2}
             icon={Settings}
             title="Advanced Diagnostics"
             img="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1000"
             desc="Technical computer analysis and ECU optimization. We solve complex electrical puzzles with surgical certainty."
             colSpan="col-span-12 md:col-span-4"
           />
           <ServiceCard 
             index={3}
             icon={Zap}
             title="Concierge Detailing"
             img="https://images.unsplash.com/photo-1607860108855-6bace5dabd43?q=80&w=1200"
             desc="Ceramic nanotechnology, scratch removal, and leather restoration. Treating your asset like a masterwork."
             colSpan="col-span-12 md:col-span-8"
           />
        </div>

        <div className="mt-6 grid grid-cols-12 gap-6">
           <ServiceCard 
             index={4}
             icon={ArrowUpRight}
             title="Export & Sales"
             img="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000"
             desc="Global vehicle procurement and export management for high-performance machinery."
             colSpan="col-span-12 md:col-span-6"
           />
           <ServiceCard 
             index={5}
             icon={History}
             title="Maintenance"
             img="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000"
             desc="Oil changes, filter protocols, and preventative care to ensure lifelong performance."
             colSpan="col-span-12 md:col-span-6"
           />
        </div>
      </section>

      <MechanicalBreakdown />

      {/* --- About / DNA --- */}
      <section id="about" className="py-24 md:py-48 px-6 md:px-12 relative z-10 overflow-hidden bg-brand-black">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/20 to-brand-black" />
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="flex flex-col items-center text-center mb-20 md:mb-32">
             <span className="text-brand-cyan text-[10px] font-black tracking-[1em] uppercase block mb-4">OUR DNA</span>
             <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter italic uppercase text-white mb-8">
               A DECADE OF<br />DOMINANCE.
             </h2>
             <p className="max-w-2xl text-text-s leading-relaxed font-sans text-sm md:text-lg opacity-60">
               For over 10 years, Damiz Auto Care has been Columbus' high-tech laboratory for automotive preservation. 
               We don't just fix cars; we engineer perfection. Our philosophy is rooted in surgical precision, 
               uncompromising quality, and an obsessive attention to detail that standard shops simply cannot comprehend.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
             <div className="relative group w-full">
                <div className="absolute -inset-10 border-l border-t border-brand-cyan/20 translate-x-5 translate-y-5 -z-10 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2" />
                <div className="relative overflow-hidden w-full h-[400px] md:h-[600px]">
                  <img 
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200" 
                    alt="Precision Engine" 
                    className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 laser-line shadow-2xl scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                </div>
                <div className="absolute bottom-10 left-10 z-20 glass p-8 laser-line backdrop-blur-3xl">
                   <div className="text-brand-cyan text-5xl font-display font-black mb-2 animate-pulse">10+</div>
                   <div className="text-[9px] uppercase tracking-[0.5em] text-white/60 font-bold">Years of Mastery</div>
                </div>
             </div>
             <div>
                <span className="text-brand-cyan text-[11px] font-black tracking-[1em] uppercase block mb-8">THE PHILOSOPHY</span>
                <h3 className="text-3xl md:text-5xl font-display font-black tracking-tight mb-10 italic leading-tight uppercase text-white">
                  WE REJECT<br />THE ORDINARY.
                </h3>
                <div className="space-y-8">
                   <p className="text-text-s leading-relaxed font-sans text-sm md:text-base opacity-70">
                     We operate at a different wavelength. Our facility is designed for the rigorous demands of Toyota, Lexus, Honda, Nissan, and elite global brands. We consider every vehicle a canvas and every repair a mission-critical operation.
                   </p>
                   <p className="text-text-s leading-relaxed font-sans text-sm md:text-base opacity-70">
                     Our master technicians don't guess—they diagnose using aerospace-grade technology and execute with micron-level variance limits. This is what it means to experience true automotive excellence.
                   </p>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { icon: Award, title: "Certified Masters", desc: "ASE L1 specialized technicians with intensive factory training and decades of combined empirical knowledge." },
               { icon: ShieldCheck, title: "Ironclad Integrity", desc: "We provide uncompromising guarantees on every structural weld, complex diagnostic, and mirror-finish spray." },
               { icon: Zap, title: "Advanced Tooling", desc: "Equipped with next-generation diagnostic computers, laser-alignment racks, and surgical-grade spray booths." }
             ].map((feature, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.2, duration: 0.8 }}
                 viewport={{ once: true }}
                 className="glass p-10 laser-line hover:border-brand-cyan/50 transition-colors group cursor-default"
               >
                 <div className="w-14 h-14 bg-brand-cyan/10 rounded-sm flex items-center justify-center mb-8 group-hover:bg-brand-cyan transition-colors">
                    <feature.icon className="w-7 h-7 text-brand-cyan group-hover:text-black transition-colors" />
                 </div>
                 <h4 className="font-black text-sm uppercase tracking-[0.2em] mb-4 font-display text-white">{feature.title}</h4>
                 <p className="text-xs text-text-s leading-relaxed font-sans opacity-60">
                   {feature.desc}
                 </p>
               </motion.div>
             ))}
          </div>

          {/* Call To Action */}
          <motion.div 
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-24 md:mt-32 w-full glass p-12 lg:p-20 laser-line text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-brand-cyan/5 group-hover:bg-brand-cyan/10 transition-colors duration-700" />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-50" />
            
            <h3 className="text-3xl md:text-5xl font-display font-black tracking-tight uppercase mb-6 relative z-10 text-white italic">
              Ready for <span className="text-brand-cyan">Absolute Precision?</span>
            </h3>
            <p className="text-white/60 mb-10 max-w-2xl mx-auto relative z-10 font-sans text-sm md:text-base">
              Stop compromising with ordinary shops. Secure your slot with Columbus' elite automotive laboratory and experience true engineering dominance.
            </p>
            <a 
              href="https://wa.me/13802237472" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative z-10 inline-flex items-center gap-4 px-12 py-6 bg-brand-cyan text-brand-black font-black text-xs tracking-[0.3em] uppercase hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,243,255,0.2)]"
            >
              Secure Your Slot <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>

        </div>
      </section>

      {/* --- Reviews --- */}
      <BrandTestimonials />

      {/* --- Footer --- */}
      <footer id="contact" className="pt-32 md:pt-60 pb-16 px-6 md:px-12 bg-black relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 mb-24 md:mb-40 text-center md:text-left">
             <div className="md:col-span-5">
                <div className="flex flex-col mb-8 md:mb-12 items-center md:items-start">
                   <span className="text-3xl md:text-4xl font-display font-black tracking-[0.3em]">DAMIZ<span className="text-brand-cyan">.</span></span>
                   <span className="text-[9px] md:text-[10px] tracking-[0.6em] text-brand-cyan font-black uppercase mt-1">Auto Care Flagship</span>
                </div>
                <p className="text-text-s text-xs leading-relaxed max-w-sm mx-auto md:mx-0 font-sans tracking-wide opacity-50 mb-10 md:mb-12">
                  Columbus' premier automotive destination. Dedicated to the surgical restoration and precision maintenance of the world's finest vehicles.
                </p>
                <div className="flex gap-6 md:gap-8 justify-center md:justify-start">
                   <a href="https://www.instagram.com/damiz68" target="_blank" className="w-12 h-12 glass flex items-center justify-center hover:border-brand-cyan transition-all duration-500">
                      <Instagram className="w-5 h-5 text-white/40 hover:text-brand-cyan transition-colors" />
                   </a>
                   <a href="#" className="w-12 h-12 glass flex items-center justify-center hover:border-brand-cyan transition-all duration-500">
                      <Facebook className="w-5 h-5 text-white/40 hover:text-brand-cyan transition-colors" />
                   </a>
                   <a href="mailto:dammyawe123@gmail.com" className="w-12 h-12 glass flex items-center justify-center hover:border-brand-cyan transition-all duration-500">
                      <Mail className="w-5 h-5 text-white/40 hover:text-brand-cyan transition-colors" />
                   </a>
                </div>
             </div>

             <div className="md:col-span-3">
                <h5 className="text-white text-[11px] font-black tracking-[0.6em] uppercase mb-8 md:mb-12">NAVIGATION</h5>
                <ul className="space-y-4 md:space-y-6 text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                   <li><a href="#services" className="hover:text-brand-cyan transition-all hover:pl-2">The Suite</a></li>
                   <li><a href="#about" className="hover:text-brand-cyan transition-all hover:pl-2">Engineering</a></li>
                   <li><a href="#" className="hover:text-brand-cyan transition-all hover:pl-2">Export Sales</a></li>
                   <li><a href="#" className="hover:text-brand-cyan transition-all hover:pl-2">Contact HQ</a></li>
                </ul>
             </div>

             <div className="md:col-span-4">
                <h5 className="text-brand-cyan text-[11px] font-black tracking-[0.6em] uppercase mb-8 md:mb-12">HEADQUARTERS</h5>
                <div className="space-y-6 md:space-y-8 text-[11px] font-black uppercase tracking-[0.3em] text-white/40">
                   <div className="flex items-center justify-center md:justify-start gap-5">
                      <MapPin className="w-4 h-4 text-brand-cyan" />
                      <span>Columbus, Ohio • US</span>
                   </div>
                   <div className="flex items-center justify-center md:justify-start gap-5">
                      <Phone className="w-4 h-4 text-brand-cyan" />
                      <span>+1 (380) 223-7472</span>
                   </div>
                   <div className="flex items-center justify-center md:justify-start gap-5">
                      <Mail className="w-4 h-4 text-brand-cyan" />
                      <span>DAMMYAWE123@GMAIL.COM</span>
                   </div>
                   <div className="flex items-center justify-center md:justify-start gap-5">
                      <Clock className="w-4 h-4 text-brand-cyan" />
                      <span className="text-[10px]">MON—FRI: 08:30 • 18:30</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
             <div className="text-[9px] uppercase tracking-[0.8em] text-white/20 font-black">
                LEAVE THE COMPETITION IN THE SHADOWS.
             </div>
             <div className="flex gap-16 text-[9px] uppercase tracking-[0.4em] text-white/20 font-black">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Export Policy</a>
             </div>
          </div>
        </div>
      </footer>

      {/* --- Floating WhatsApp Concierge Widget --- */}
      <WhatsAppWidget />
    </main>
  );
}
