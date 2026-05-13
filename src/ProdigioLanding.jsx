import { useState, useEffect, useRef } from 'react';
import { ArrowRight, X, Menu, ChevronLeft, ChevronRight, Star, BarChart3 } from 'lucide-react';

const LOGO_MAIN = '/logo.png';

/* ─── Intersection Observer hook ─── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.12, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, isVisible];
}

function FadeIn({ children, className = '', delay = 0 }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Global Styles ─── */
const globalStyles = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

    :root {
      --azul: #004AAC;
      --azul-profundo: #001A4D;
      --azul-claro: #6A9BE8;
      --cobre: #C9885E;
      --cobre-suave: #EFD8C2;
      --tinta: #0E1116;
      --pizarra: #5C6470;
      --pizarra-clara: #9AA0A8;
      --hueso: #F4F1EA;
      --piedra: #E5E1D6;
      --crema: #FAF7F0;
      --blanco: #FFFFFF;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      color: var(--tinta); background: var(--hueso);
      line-height: 1.55; -webkit-font-smoothing: antialiased; overflow-x: hidden;
    }
    h1, h2, h3, h4 {
      font-family: 'Space Grotesk', 'Helvetica Neue', system-ui, sans-serif;
      font-weight: 600; letter-spacing: -0.01em; line-height: 1.08;
    }

    .eyebrow {
      display: inline-flex; align-items: center; gap: 10px;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
      color: var(--azul); margin-bottom: 18px;
    }
    .eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--cobre); flex-shrink: 0; }
    .eyebrow-light { color: var(--azul-claro) !important; }
    .eyebrow-cream { color: var(--crema) !important; }
    .eyebrow-cobre { color: var(--cobre) !important; }

    .sec-num {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
      color: var(--pizarra-clara); margin-bottom: 10px;
    }
    .sec-num-dim { color: rgba(255,255,255,0.25) !important; }

    .btn-azul {
      background: var(--azul); color: white;
      padding: 14px 32px; font-family: 'Space Grotesk', sans-serif;
      font-weight: 600; font-size: 15px; letter-spacing: -0.01em;
      display: inline-flex; align-items: center; gap: 8px;
      border: none; cursor: pointer; text-decoration: none;
      transition: background 0.2s ease;
    }
    .btn-azul:hover { background: var(--azul-profundo); }

    .btn-outline {
      background: transparent; color: var(--tinta);
      padding: 14px 32px; font-family: 'Space Grotesk', sans-serif;
      font-weight: 600; font-size: 15px; letter-spacing: -0.01em;
      display: inline-flex; align-items: center; gap: 8px;
      border: 1px solid rgba(14,17,22,0.22); cursor: pointer; text-decoration: none;
      transition: all 0.2s ease;
    }
    .btn-outline:hover { border-color: var(--azul); color: var(--azul); }
    .btn-outline-light {
      color: rgba(250,247,240,0.8) !important;
      border-color: rgba(250,247,240,0.25) !important;
    }
    .btn-outline-light:hover { border-color: var(--crema) !important; color: var(--crema) !important; }

    .nav-link {
      font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 500;
      color: var(--pizarra); text-decoration: none; letter-spacing: 0.01em;
      transition: color 0.15s;
    }
    .nav-link:hover { color: var(--tinta); }
    .nav-link-light { color: rgba(250,247,240,0.65) !important; }
    .nav-link-light:hover { color: var(--crema) !important; }

    .copper-rule { width: 100%; height: 2px; background: var(--cobre); margin-bottom: 20px; }

    :focus-visible { outline: 2px solid var(--azul); outline-offset: 3px; }
    input:focus-visible, textarea:focus-visible, select:focus-visible {
      outline: 2px solid var(--azul); outline-offset: 0;
      border-color: var(--azul) !important;
    }

    @media (max-width: 960px) {
      .grid-3 { grid-template-columns: 1fr 1fr !important; }
      .grid-5 { grid-template-columns: 1fr 1fr !important; }
    }
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .show-mobile { display: flex !important; }
      .grid-2, .grid-3, .grid-4, .grid-5 { grid-template-columns: 1fr !important; }
      .hero-right { display: none !important; }
      section { padding-left: 20px !important; padding-right: 20px !important; }
      .pad-section { padding: 64px 20px !important; }
      .stat-bar { padding: 32px 24px !important; grid-template-columns: 1fr 1fr !important; }
    }
    @media (max-width: 480px) {
      .grid-2 { grid-template-columns: 1fr !important; }
      .stat-bar { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

/* ─── NAV ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Navegación principal"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(244,241,234,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(14,17,22,0.08)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#" aria-label="Prodigio IA — Inicio" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src={LOGO_MAIN} alt="Prodigio IA" style={{ height: 32, width: 'auto' }} />
        </a>
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <a href="#que-hacemos" className="nav-link">Qué hacemos</a>
          <a href="#sistemas" className="nav-link">Sistemas</a>
          <a href="#proceso" className="nav-link">Proceso</a>
          <a href="#servicios" className="nav-link">Servicios</a>
          <a href="#contacto" className="btn-azul" style={{ padding: '10px 24px', fontSize: 13 }}>
            Agendar diagnóstico <ArrowRight size={14} />
          </a>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--tinta)' }}
          className="show-mobile"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileOpen && (
        <div style={{ background: 'var(--hueso)', padding: '16px 24px 28px', display: 'flex', flexDirection: 'column', gap: 20, borderBottom: '1px solid rgba(14,17,22,0.08)' }}>
          <a href="#que-hacemos" className="nav-link" onClick={() => setMobileOpen(false)}>Qué hacemos</a>
          <a href="#sistemas" className="nav-link" onClick={() => setMobileOpen(false)}>Sistemas</a>
          <a href="#proceso" className="nav-link" onClick={() => setMobileOpen(false)}>Proceso</a>
          <a href="#servicios" className="nav-link" onClick={() => setMobileOpen(false)}>Servicios</a>
          <a href="#contacto" className="btn-azul" onClick={() => setMobileOpen(false)} style={{ justifyContent: 'center' }}>
            Agendar diagnóstico <ArrowRight size={14} />
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─── HERO VISUAL (columna derecha) ─── */
function HeroVisual() {
  const steps = [
    { num: '01', name: 'Diagnóstico', detail: '1 SEM · MAPEO DE OPERACIÓN', highlight: false },
    { num: '02', name: 'Diseño', detail: '1 SEM · PLAN Y MÉTRICAS', highlight: false },
    { num: '03', name: 'Implementación', detail: '3–5 SEM · SISTEMA VIVO', highlight: true },
    { num: '04', name: 'Capacitación', detail: '1 SEM · ADOPCIÓN DEL EQUIPO', highlight: false },
    { num: '05', name: 'Soporte', detail: '3 MESES · MONITOREO INCLUIDO', highlight: false },
  ];
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: -16, right: -16, background: 'var(--azul)', color: 'white', padding: '9px 14px', fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', zIndex: 2 }}>
        MONTERREY · MX
      </div>
      <div style={{ background: 'var(--blanco)', border: '1px solid rgba(14,17,22,0.08)', padding: '32px 28px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--pizarra-clara)', marginBottom: 24 }}>
          PROCESO DE IMPLEMENTACIÓN
        </div>
        {steps.map((s, i) => (
          <div
            key={i}
            style={{
              display: 'flex', gap: 16, alignItems: 'flex-start',
              padding: '14px 0',
              borderBottom: i < steps.length - 1 ? '1px solid rgba(14,17,22,0.06)' : 'none',
              background: s.highlight ? 'rgba(0,74,172,0.04)' : 'transparent',
            }}
          >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--cobre)', minWidth: 20, paddingTop: 1 }}>{s.num}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: s.highlight ? 600 : 400, fontSize: 15, color: s.highlight ? 'var(--azul)' : 'var(--tinta)', marginBottom: 3 }}>{s.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pizarra-clara)' }}>{s.detail}</div>
            </div>
            {s.highlight && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--azul)', marginTop: 6, flexShrink: 0 }} />}
          </div>
        ))}
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '2px solid var(--cobre)', fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cobre)' }}>
          PRODIGIO IA · IMPLEMENTACIÓN A LA MEDIDA
        </div>
      </div>
    </div>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section style={{ background: 'var(--hueso)', paddingTop: 120, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
      {/* Dot pattern */}
      <div style={{
        position: 'absolute', right: -60, top: '50%', transform: 'translateY(-55%)',
        width: 560, height: 560,
        backgroundImage: 'radial-gradient(circle at 50% 50%, #004AAC 0 2px, transparent 2px)',
        backgroundSize: '14px 14px',
        opacity: 0.07,
        maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 80, alignItems: 'center' }}>
          {/* Left */}
          <FadeIn>
            <div>
              <div className="eyebrow">
                <span className="dot" />
                Implementación de IA · Monterrey, México
              </div>
              <h1 style={{
                fontSize: 'clamp(52px, 6.5vw, 96px)', fontWeight: 700,
                letterSpacing: '-0.03em', lineHeight: 0.94, color: 'var(--tinta)',
                marginBottom: 28,
              }}>
                Procesos que<br />
                <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--azul)' }}>funcionan solos.</span>
              </h1>
              <p style={{ fontSize: 19, color: 'var(--pizarra)', lineHeight: 1.65, maxWidth: '58ch', marginBottom: 40 }}>
                Construimos sistemas de inteligencia artificial a la medida de tu operación. No vendemos cursos ni licencias. Diagnosticamos, diseñamos e implementamos.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 48 }}>
                <a href="#contacto" className="btn-azul" style={{ fontSize: 16, padding: '16px 40px' }}>
                  Agendar diagnóstico <ArrowRight size={18} />
                </a>
                <a href="#sistemas" className="btn-outline" style={{ fontSize: 16, padding: '16px 40px' }}>
                  Ver sistemas
                </a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  '01 · DIAGNOSTICAMOS tu operación en profundidad',
                  '02 · DISEÑAMOS qué se automatiza y con qué retorno',
                  '03 · IMPLEMENTAMOS hasta que funcione sin supervisión',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--azul)', flexShrink: 0 }}>+</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pizarra)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right */}
          <div className="hero-right">
            <FadeIn delay={0.15}>
              <HeroVisual />
            </FadeIn>
          </div>
        </div>

        {/* Stats bar */}
        <FadeIn delay={0.25}>
          <div
            className="stat-bar"
            style={{
              marginTop: 72, background: 'var(--azul-profundo)',
              padding: '40px 56px', borderTop: '2px solid var(--cobre)',
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40,
            }}
          >
            {[
              { num: '15–25 hrs', label: 'RECUPERADAS POR SEMANA · POR ÁREA' },
              { num: '−60%', label: 'EN ERRORES OPERATIVOS REPETITIVOS' },
              { num: '2–3×', label: 'CAPACIDAD OPERATIVA SIN CONTRATAR' },
              { num: '6–8 sem', label: 'DEL KICKOFF AL PROCESO VIVO' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 30, color: 'var(--crema)', letterSpacing: '-0.02em', marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(250,247,240,0.38)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── PROBLEM ─── */
function Problem() {
  const signals = [
    'Excel como base de datos principal',
    'WhatsApp como CRM de ventas',
    'Correos como bitácora de operación',
    'Reportes armados a mano cada semana',
    'El seguimiento vive en la cabeza de alguien',
  ];
  return (
    <section style={{ background: 'var(--azul-profundo)', padding: '96px 48px' }} className="pad-section">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <FadeIn>
            <div>
              <div className="sec-num sec-num-dim">DIAGNÓSTICO · 01</div>
              <div className="eyebrow eyebrow-light"><span className="dot" />El problema</div>
              <h2 style={{
                fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em',
                lineHeight: 0.98, color: 'var(--crema)', marginBottom: 24,
              }}>
                El equipo está<br />haciendo el trabajo<br />
                <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--cobre)' }}>del sistema.</span>
              </h2>
              <p style={{ fontSize: 17, color: 'rgba(250,247,240,0.6)', lineHeight: 1.65, maxWidth: '52ch' }}>
                En la mayoría de las PYMEs, las personas son el pegamento entre herramientas. Esa es la cuenta que el dueño paga todos los meses, sin verla.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--azul-claro)', marginBottom: 20 }}>
                LAS CINCO SEÑALES DE UNA OPERACIÓN MANUAL
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {signals.map((signal, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '16px 0',
                      borderBottom: i < signals.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    }}
                  >
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700, color: 'var(--azul-claro)', flexShrink: 0 }}>+</span>
                    <span style={{ fontSize: 15, color: 'rgba(250,247,240,0.8)', lineHeight: 1.45 }}>{signal}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── QUÉ HACEMOS ─── */
function WhatWeDo() {
  const verbs = [
    {
      num: '01', verb: 'DIAGNOSTICAMOS', name: 'Mapeamos tu operación',
      desc: 'Entramos, escuchamos y mapeamos. Sesiones con las áreas clave. Salimos con un listado priorizado de qué se puede automatizar y con qué retorno esperado.',
      dark: false,
    },
    {
      num: '02', verb: 'DISEÑAMOS', name: 'Definimos el sistema',
      desc: 'Elegimos las herramientas correctas, definimos la arquitectura y acordamos la métrica de éxito antes de escribir una línea de código.',
      dark: false,
    },
    {
      num: '03', verb: 'IMPLEMENTAMOS', name: 'Construimos y entregamos',
      desc: 'Desarrollamos el sistema, lo conectamos a tu operación real, lo probamos en piloto y lo dejamos funcionando sin supervisión constante.',
      dark: true,
    },
  ];
  return (
    <section id="que-hacemos" style={{ background: 'var(--crema)', padding: '96px 48px' }} className="pad-section">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <div className="sec-num">QUÉ HACEMOS · 02</div>
            <div className="eyebrow"><span className="dot" />Nuestra firma</div>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.02, color: 'var(--tinta)', marginBottom: 20 }}>
              Convertimos operación manual en{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--azul)' }}>sistemas que corren solos.</span>
            </h2>
            <p style={{ fontSize: 17, color: 'var(--pizarra)', lineHeight: 1.65, maxWidth: '60ch' }}>
              No vendemos cursos de IA ni licencias de software. Construimos sistemas a la medida de tu empresa. Tres verbos.
            </p>
          </div>
        </FadeIn>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {verbs.map((v, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                background: v.dark ? 'var(--azul-profundo)' : 'var(--blanco)',
                border: v.dark ? 'none' : '1px solid rgba(14,17,22,0.07)',
                padding: '36px 32px',
                height: '100%',
              }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', color: 'var(--cobre)', marginBottom: 16 }}>{v.num}</div>
                <div className="copper-rule" />
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: v.dark ? 'rgba(250,247,240,0.38)' : 'var(--pizarra-clara)', marginBottom: 14 }}>{v.verb}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, color: v.dark ? 'var(--crema)' : 'var(--tinta)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 16 }}>{v.name}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: v.dark ? 'rgba(250,247,240,0.6)' : 'var(--pizarra)' }}>{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAMILIAS DE PROCESO ─── */
function ProcessFamilies() {
  const families = [
    { num: '01', name: 'Ventas y cotización', desc: 'Cotizadores automáticos, seguimiento de prospectos, propuestas generadas en segundos.' },
    { num: '02', name: 'Atención a cliente', desc: 'Agentes 24/7 que responden lo repetitivo y escalan lo que importa a una persona.' },
    { num: '03', name: 'Reportes y dashboards', desc: 'El reporte del lunes llega solo, con datos validados y sin intervención del equipo.' },
    { num: '04', name: 'Operación interna', desc: 'Flujos de aprobación, alertas automáticas, seguimiento de órdenes y tareas.' },
    { num: '05', name: 'Administración y finanzas', desc: 'Conciliaciones, facturas y reportes financieros sin copiar y pegar.' },
    { num: '06', name: 'Conocimiento interno', desc: 'Tu equipo le pregunta a sus propios manuales, contratos y políticas en lenguaje normal.' },
  ];
  return (
    <section style={{ background: 'var(--blanco)', padding: '96px 48px' }} className="pad-section">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ marginBottom: 56 }}>
            <div className="sec-num">ALCANCE · 03</div>
            <div className="eyebrow"><span className="dot" />Dónde intervenimos</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05, color: 'var(--tinta)', maxWidth: 580, marginBottom: 16 }}>
              Seis familias de proceso donde casi siempre hay algo que automatizar.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--pizarra)', lineHeight: 1.6, maxWidth: '58ch' }}>
              No automatizamos todo. Nos enfocamos donde el retorno es claro y se puede medir.
            </p>
          </div>
        </FadeIn>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {families.map((f, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div style={{
                padding: '28px 28px',
                borderTop: '2px solid var(--azul)',
                background: i % 2 === 0 ? 'var(--hueso)' : 'var(--blanco)',
                borderLeft: '1px solid rgba(14,17,22,0.06)',
                borderRight: '1px solid rgba(14,17,22,0.06)',
                borderBottom: '1px solid rgba(14,17,22,0.06)',
              }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', color: 'var(--cobre)', marginBottom: 12 }}>{f.num}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, color: 'var(--tinta)', letterSpacing: '-0.01em', marginBottom: 10 }}>{f.name}</div>
                <p style={{ fontSize: 14, color: 'var(--pizarra)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SISTEMAS CONCRETOS ─── */
function Solutions() {
  const systems = [
    {
      num: '01',
      name: 'Cotizador por WhatsApp',
      desc: 'El cliente manda lo que necesita y recibe cotización formal en 90 segundos. Mismo equipo, sin intervención manual en el proceso.',
      metric: '−96% EN TIEMPO POR COTIZACIÓN',
    },
    {
      num: '02',
      name: 'Agente de atención 24/7',
      desc: 'Responde las preguntas que se repiten 50 veces al día. Escala a una persona cuando hace falta. Integrable con WhatsApp, web o correo.',
      metric: '−70% EN CARGA DE ATENCIÓN',
    },
    {
      num: '03',
      name: 'Reportes automáticos',
      desc: 'El reporte de ventas, producción o finanzas llega solo el lunes — con datos validados, sin que nadie lo arme a mano.',
      metric: '15–25 HRS RECUPERADAS / SEMANA',
    },
    {
      num: '04',
      name: 'Buscador interno de documentos',
      desc: 'Tu equipo le pregunta en lenguaje natural a manuales, contratos y políticas. La respuesta llega en segundos con la fuente exacta.',
      metric: '−80% EN TIEMPO DE BÚSQUEDA',
    },
  ];
  return (
    <section id="sistemas" style={{ background: 'var(--hueso)', padding: '96px 48px' }} className="pad-section">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ marginBottom: 56 }}>
            <div className="sec-num">SISTEMAS · 04</div>
            <div className="eyebrow"><span className="dot" />Qué construimos</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05, color: 'var(--tinta)', maxWidth: 560, marginBottom: 16 }}>
              Cuatro sistemas que ya construimos antes.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--pizarra)', lineHeight: 1.6, maxWidth: '56ch' }}>
              Para no quedarnos en abstracto — estos son sistemas reales que hemos entregado a PYMEs en México.
            </p>
          </div>
        </FadeIn>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {systems.map((s, i) => (
            <FadeIn key={i} delay={i * 0.09}>
              <div style={{ background: 'var(--blanco)', border: '1px solid rgba(14,17,22,0.08)', padding: '36px 32px' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', color: 'var(--cobre)', marginBottom: 12 }}>{s.num}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 24, color: 'var(--tinta)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16 }}>{s.name}</h3>
                <p style={{ fontSize: 15, color: 'var(--pizarra)', lineHeight: 1.65, marginBottom: 28 }}>{s.desc}</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0, background: 'var(--hueso)', border: '1px solid var(--piedra)', padding: '9px 14px' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--azul)' }}>{s.metric}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── METODOLOGÍA ─── */
function Methodology() {
  const steps = [
    { num: '01', name: 'Diagnóstico', duration: '1 SEMANA', desc: 'Mapeamos tu operación con sesiones en las áreas clave. Entregable: prioridades ordenadas por retorno.', dark: false },
    { num: '02', name: 'Diseño', duration: '1 SEMANA', desc: 'Definimos qué se automatiza, con qué herramientas y con qué métrica de éxito.', dark: false },
    { num: '03', name: 'Implementación', duration: '3–5 SEMANAS', desc: 'Construimos, conectamos e integramos. Prueba piloto antes de encender en producción.', dark: true },
    { num: '04', name: 'Capacitación', duration: '1 SEMANA', desc: 'Tu equipo aprende a operar el sistema — no a programarlo.', dark: false },
    { num: '05', name: 'Soporte', duration: '3 MESES', desc: 'Acompañamiento incluido: ajustes, monitoreo y mejoras por bloques.', dark: false },
  ];
  return (
    <section id="proceso" style={{ background: 'var(--crema)', padding: '96px 48px' }} className="pad-section">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ marginBottom: 56 }}>
            <div className="sec-num">METODOLOGÍA · 05</div>
            <div className="eyebrow"><span className="dot" />Cómo trabajamos</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05, color: 'var(--tinta)', marginBottom: 12 }}>
              Cinco pasos. Seis a ocho semanas.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--pizarra)', lineHeight: 1.6, maxWidth: '56ch' }}>
              No improvisamos. Tenemos un proceso probado con varios clientes que convierte operación manual en sistemas que funcionan solos.
            </p>
          </div>
        </FadeIn>
        <div className="grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2 }}>
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                background: s.dark ? 'var(--azul-profundo)' : 'var(--blanco)',
                border: s.dark ? 'none' : '1px solid rgba(14,17,22,0.07)',
                padding: '28px 22px',
                height: '100%',
              }}>
                <div className="copper-rule" />
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', color: 'var(--cobre)', marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: s.dark ? 'var(--crema)' : 'var(--tinta)', marginBottom: 6, letterSpacing: '-0.01em' }}>{s.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: s.dark ? 'rgba(250,247,240,0.38)' : 'var(--pizarra-clara)', marginBottom: 14 }}>{s.duration}</div>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: s.dark ? 'rgba(250,247,240,0.6)' : 'var(--pizarra)' }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── RESULTADOS ─── */
function Results() {
  const metrics = [
    { num: '15–25', unit: 'HORAS', label: 'recuperadas por semana · por área intervenida' },
    { num: '−60%', unit: 'ERRORES', label: 'en errores operativos repetitivos del equipo' },
    { num: '2–3×', unit: 'CAPACIDAD', label: 'operativa sin contratar a nadie nuevo' },
    { num: '6–8', unit: 'SEMANAS', label: 'del kickoff al proceso vivo en producción' },
  ];
  return (
    <section style={{ background: 'var(--azul-profundo)', padding: '96px 48px' }} className="pad-section">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ marginBottom: 64 }}>
            <div className="sec-num sec-num-dim">RESULTADOS · 06</div>
            <div className="eyebrow eyebrow-light"><span className="dot" />Lo que devuelve un proyecto</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05, color: 'var(--crema)', maxWidth: 560 }}>
              Números honestos del rango en que terminan nuestros clientes.
            </h2>
          </div>
        </FadeIn>
        <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
          {metrics.map((m, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ padding: '32px 28px', borderTop: '2px solid var(--cobre)' }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(36px, 3.5vw, 54px)', color: 'var(--crema)', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: 10 }}>{m.num}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cobre)', marginBottom: 10 }}>{m.unit}</div>
                <div style={{ fontSize: 13, color: 'rgba(250,247,240,0.45)', lineHeight: 1.55 }}>{m.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICIOS ─── */
function Services() {
  const models = [
    {
      letter: 'A', name: 'Diagnóstico', duration: '2 SEMANAS',
      desc: 'Mapeamos tu operación, identificamos oportunidades y entregamos un plan ejecutivo con prioridades y retorno estimado.',
      includes: ['Sesiones con 3 áreas de tu empresa', 'Mapa de procesos con potencial', 'Plan priorizado por impacto', 'Estimación de retorno por área'],
      footer: 'ENTREGABLE: DOCUMENTO EJECUTIVO LISTO PARA DECIDIR.',
      dark: false,
    },
    {
      letter: 'B', name: 'Implementación', duration: '6–8 SEMANAS',
      desc: 'El proyecto completo: diagnóstico, diseño, construcción, capacitación y soporte. Entregamos un sistema que funciona.',
      includes: ['Todo el proceso de diagnóstico', 'Desarrollo e integración del sistema', 'Prueba piloto antes de producción', 'Capacitación de tu equipo', 'Soporte 3 meses incluido'],
      footer: 'ENTREGABLE: SISTEMA VIVO EN TU OPERACIÓN.',
      dark: true,
    },
    {
      letter: 'C', name: 'Mantenimiento', duration: 'MENSUAL',
      desc: 'Para clientes que ya tienen sistemas con nosotros. Monitoreo, ajustes y nuevas automatizaciones por bloques.',
      includes: ['Monitoreo continuo del sistema', 'Ajustes y correcciones', 'Nuevas automatizaciones por bloques', 'Reporte mensual de desempeño'],
      footer: 'SIN CONTRATO DE LARGO PLAZO.',
      dark: false,
    },
  ];
  return (
    <section id="servicios" style={{ background: 'var(--blanco)', padding: '96px 48px' }} className="pad-section">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ marginBottom: 56 }}>
            <div className="sec-num">SERVICIOS · 07</div>
            <div className="eyebrow"><span className="dot" />Cómo se contrata</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05, color: 'var(--tinta)', maxWidth: 580, marginBottom: 16 }}>
              Tres formas de trabajar con nosotros.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--pizarra)', lineHeight: 1.6, maxWidth: '56ch' }}>
              La A es la entrada natural. La B cierra proyectos. La C es para quienes ya trabajan con nosotros.
            </p>
          </div>
        </FadeIn>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {models.map((m, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                background: m.dark ? 'var(--azul-profundo)' : 'var(--hueso)',
                border: m.dark ? 'none' : '1px solid rgba(14,17,22,0.08)',
                padding: '36px 32px',
                display: 'flex', flexDirection: 'column', height: '100%',
              }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: 'var(--cobre)', marginBottom: 8 }}>{m.letter}</div>
                <div className="copper-rule" />
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.1, color: m.dark ? 'var(--crema)' : 'var(--tinta)', marginBottom: 6 }}>{m.name}</h3>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: m.dark ? 'rgba(250,247,240,0.38)' : 'var(--pizarra-clara)', marginBottom: 20 }}>{m.duration}</div>
                <p style={{ fontSize: 14, lineHeight: 1.65, marginBottom: 24, color: m.dark ? 'rgba(250,247,240,0.65)' : 'var(--pizarra)', flex: 1 }}>{m.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                  {m.includes.map((item, j) => (
                    <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: m.dark ? 'var(--azul-claro)' : 'var(--azul)', flexShrink: 0, lineHeight: 1.5 }}>+</span>
                      <span style={{ fontSize: 13, lineHeight: 1.5, color: m.dark ? 'rgba(250,247,240,0.6)' : 'var(--pizarra)' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: m.dark ? 'rgba(250,247,240,0.28)' : 'var(--pizarra-clara)', paddingTop: 16, borderTop: '1px solid rgba(14,17,22,0.08)', marginBottom: 24 }}>{m.footer}</div>
                <a href="#contacto" className={m.dark ? 'btn-azul' : 'btn-outline'} style={{ justifyContent: 'center', textAlign: 'center' }}>
                  Agendar diagnóstico <ArrowRight size={15} />
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <p style={{ textAlign: 'center', marginTop: 28, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--pizarra-clara)' }}>
            INVERSIÓN A LA MEDIDA DEL ALCANCE · COTIZACIÓN SIN COMPROMISO
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
const TESTIMONIALS = [
  {
    name: 'Andrea Catalina Cantú Barbosa',
    role: 'Abogada',
    company: 'DECSA',
    quote: 'Lo que antes me tomaba horas de lectura y síntesis ahora lo resuelvo en minutos. La implementación fue directa al grano, sin teoría innecesaria.',
    stars: 10,
    score: 10,
    metric: '−85% de tiempo en síntesis de documentos',
    accent: '#C9885E',
  },
  {
    name: 'Eduardo Alejandro González Nieves',
    role: 'Arquitecto',
    company: 'DECSA',
    quote: 'Mis presentaciones ahora tienen otro nivel y las preparo en una fracción del tiempo. Nunca pensé que la IA podía aplicarse tan bien a mi trabajo.',
    stars: 9,
    score: 9,
    metric: '−66% en tiempo de presentaciones',
    accent: '#004AAC',
  },
  {
    name: 'Claudio Picazo Landeros',
    role: 'Supervisor',
    company: 'DECSA',
    quote: 'Llegué escéptico y salí usando IA ese mismo día. El enfoque práctico hace toda la diferencia — aprendes haciendo, no escuchando.',
    stars: 10,
    score: 10,
    metric: 'Adoptó IA en operación en 24 horas',
    accent: '#6A9BE8',
  },
  {
    name: 'Bernardo Molina',
    role: 'Administrador',
    company: 'Grupo Imagen',
    quote: 'Mis análisis ahora van mucho más a fondo en el mismo tiempo. Prodigio IA no solo implementa herramientas — cambia la forma en que piensas tu trabajo.',
    stars: 9,
    score: 9,
    metric: '+25% en profundidad de análisis',
    accent: '#C9885E',
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setActive(idx); setAnimating(false); }, 220);
  };
  const prev = () => goTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goTo((active + 1) % TESTIMONIALS.length);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => { setActive(a => (a + 1) % TESTIMONIALS.length); setAnimating(false); }, 220);
    }, 7000);
    return () => clearInterval(timerRef.current);
  }, []);

  const t = TESTIMONIALS[active];
  const initials = t.name.split(' ').slice(0, 2).map(w => w[0]).join('');

  return (
    <section style={{ background: 'var(--hueso)', padding: '96px 48px' }} className="pad-section">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ marginBottom: 56 }}>
            <div className="sec-num">CLIENTES · 08</div>
            <div className="eyebrow"><span className="dot" />Testimonios</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05, color: 'var(--tinta)', maxWidth: 560 }}>
              Lo que dicen quienes ya trabajan con sistemas de IA.
            </h2>
          </div>
        </FadeIn>

        <div style={{ maxWidth: 760, margin: '0 auto 40px' }}>
          <div style={{
            background: 'var(--blanco)', border: '1px solid rgba(14,17,22,0.08)',
            overflow: 'hidden',
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity 0.22s ease, transform 0.22s ease',
          }}>
            <div style={{ height: 3, background: t.accent }} />
            <div style={{ padding: '36px 40px 40px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
                <div style={{
                  width: 50, height: 50, flexShrink: 0,
                  background: 'var(--hueso)', border: `1px solid ${t.accent}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: t.accent }}>{initials}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16, color: 'var(--tinta)', marginBottom: 2 }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--pizarra)', marginBottom: 8 }}>
                    {t.role} · <span style={{ fontWeight: 600 }}>{t.company}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {Array.from({ length: t.stars }).map((_, i) => <Star key={i} size={13} fill="#C9885E" color="#C9885E" />)}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 28, color: 'var(--tinta)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {t.score}<span style={{ fontSize: 14, fontWeight: 400, color: 'var(--pizarra-clara)' }}>/10</span>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pizarra-clara)', marginTop: 4 }}>RECOMENDACIÓN</div>
                </div>
              </div>

              <p style={{
                fontSize: 17, color: 'var(--pizarra)', lineHeight: 1.7,
                fontStyle: 'italic', marginBottom: 24,
                borderLeft: `2px solid ${t.accent}`, paddingLeft: 18,
              }}>
                "{t.quote}"
              </p>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--hueso)', border: '1px solid var(--piedra)', padding: '9px 14px' }}>
                <BarChart3 size={14} color="var(--azul)" />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--azul)' }}>{t.metric}</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 24 }}>
            <button
              onClick={prev}
              aria-label="Testimonio anterior"
              style={{ width: 38, height: 38, border: '1px solid var(--piedra)', background: 'var(--blanco)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', color: 'var(--pizarra)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--azul)'; e.currentTarget.style.color = 'var(--azul)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--piedra)'; e.currentTarget.style.color = 'var(--pizarra)'; }}
            >
              <ChevronLeft size={16} />
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Ver testimonio ${i + 1} de ${TESTIMONIALS.length}`}
                  onClick={() => goTo(i)}
                  style={{
                    width: i === active ? 22 : 7, height: 7,
                    border: 'none', cursor: 'pointer', padding: 0,
                    background: i === active ? 'var(--azul)' : 'var(--piedra)',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Testimonio siguiente"
              style={{ width: 38, height: 38, border: '1px solid var(--piedra)', background: 'var(--blanco)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', color: 'var(--pizarra)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--azul)'; e.currentTarget.style.color = 'var(--azul)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--piedra)'; e.currentTarget.style.color = 'var(--pizarra)'; }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <FadeIn delay={0.1}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            background: 'var(--azul-profundo)', padding: '32px 48px',
            maxWidth: 760, margin: '0 auto', gap: 24,
            borderTop: '2px solid var(--cobre)',
          }}>
            {[
              { number: '9.5/10', label: 'SATISFACCIÓN PROMEDIO' },
              { number: '100%', label: 'ADOPTÓ IA EN 24 HORAS' },
              { number: '6+', label: 'EMPRESAS CAPACITADAS' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 28, color: 'var(--crema)', letterSpacing: '-0.02em' }}>{s.number}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(250,247,240,0.38)', marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── CTA / CONTACTO ─── */
function Contact() {
  const [form, setForm] = useState({ nombre: '', empresa: '', email: '', telefono: '', servicio: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    try {
      const res = await fetch('https://formspree.io/f/mreogkvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { setEnviado(true); }
      else { setError('Hubo un problema al enviar. Intenta de nuevo o escríbenos a jrgutierrez@prodigioia.com'); }
    } catch {
      setError('No se pudo conectar. Verifica tu conexión e intenta de nuevo.');
    } finally { setEnviando(false); }
  };

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    border: '1px solid rgba(14,17,22,0.15)', background: 'var(--blanco)',
    fontSize: 15, fontFamily: "'Inter', sans-serif",
    outline: 'none', color: 'var(--tinta)', transition: 'border-color 0.2s',
  };
  const labelStyle = {
    fontSize: 11, fontWeight: 500, fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '0.14em', textTransform: 'uppercase',
    color: 'var(--pizarra)', marginBottom: 8, display: 'block',
  };

  return (
    <section id="contacto" style={{ background: 'var(--azul)', padding: '96px 48px' }} className="pad-section">
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
              <img src={LOGO_MAIN} alt="Prodigio IA" style={{ height: 36, width: 'auto', filter: 'brightness(0) invert(1)' }} />
            </div>
            <div className="eyebrow eyebrow-cream" style={{ justifyContent: 'center' }}>
              <span className="dot" />Una sesión de diagnóstico, en tu oficina
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--crema)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 16 }}>
              ¿Listo para que tus procesos<br />funcionen solos?
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(250,247,240,0.65)', lineHeight: 1.65, maxWidth: 520, margin: '0 auto' }}>
              Dos horas. Tres áreas de tu empresa. Salimos con un mapa de qué procesos vale la pena automatizar primero — y con qué retorno estimado. Sin compromiso.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          {!enviado ? (
            <form
              onSubmit={handleSubmit}
              style={{ background: 'rgba(0,0,0,0.15)', padding: '40px 36px', maxWidth: 640, margin: '0 auto', border: '1px solid rgba(250,247,240,0.12)' }}
            >
              <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label htmlFor="f-nombre" style={labelStyle}>Nombre completo</label>
                  <input name="nombre" id="f-nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" style={inputStyle} required />
                </div>
                <div>
                  <label htmlFor="f-empresa" style={labelStyle}>Empresa</label>
                  <input name="empresa" id="f-empresa" value={form.empresa} onChange={handleChange} placeholder="Nombre de tu empresa" style={inputStyle} required />
                </div>
                <div>
                  <label htmlFor="f-email" style={labelStyle}>Correo electrónico</label>
                  <input name="email" id="f-email" type="email" value={form.email} onChange={handleChange} placeholder="correo@empresa.com" style={inputStyle} required />
                </div>
                <div>
                  <label htmlFor="f-telefono" style={labelStyle}>Teléfono</label>
                  <input name="telefono" id="f-telefono" type="tel" value={form.telefono} onChange={handleChange} placeholder="+52 81 1234 5678" style={inputStyle} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="f-servicio" style={labelStyle}>¿Por dónde quieres empezar?</label>
                  <select name="servicio" id="f-servicio" value={form.servicio} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}>
                    <option value="">Selecciona una opción</option>
                    <option value="A — Diagnóstico (2 semanas)">A — Diagnóstico (2 semanas)</option>
                    <option value="B — Proyecto de implementación (6–8 semanas)">B — Proyecto de implementación (6–8 semanas)</option>
                    <option value="C — Mantenimiento de sistema existente">C — Mantenimiento de sistema existente</option>
                    <option value="No estoy seguro / quiero platicar primero">No estoy seguro / quiero platicar primero</option>
                  </select>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="f-mensaje" style={labelStyle}>Mensaje (opcional)</label>
                  <textarea name="mensaje" id="f-mensaje" value={form.mensaje} onChange={handleChange} placeholder="Cuéntanos brevemente sobre tu empresa y qué proceso te gustaría automatizar..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <button
                    type="submit"
                    disabled={enviando}
                    className="btn-azul"
                    style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '18px 40px', background: 'var(--azul-profundo)', opacity: enviando ? 0.7 : 1 }}
                  >
                    {enviando ? 'Enviando...' : <>Solicitar diagnóstico <ArrowRight size={18} /></>}
                  </button>
                  {error && <p style={{ fontSize: 13, color: '#fca5a5', textAlign: 'center', marginTop: 10 }}>{error}</p>}
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', marginTop: 24 }}>
                {['Sin costo', 'Respuesta en menos de 24 hrs', 'Sin compromiso'].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--azul-claro)' }}>+</span>
                    <span style={{ fontSize: 13, color: 'rgba(250,247,240,0.5)', fontFamily: "'Inter', sans-serif" }}>{text}</span>
                  </div>
                ))}
              </div>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '64px 24px' }}>
              <div style={{ width: 56, height: 56, background: 'rgba(250,247,240,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, color: 'var(--crema)' }}>+</span>
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 28, color: 'var(--crema)', marginBottom: 12 }}>Mensaje recibido.</h3>
              <p style={{ fontSize: 17, color: 'rgba(250,247,240,0.6)', maxWidth: 480, margin: '0 auto', lineHeight: 1.65 }}>
                Te contactamos en menos de 24 horas para agendar tu sesión de diagnóstico. Si tienes urgencia, escríbenos directo a <strong style={{ color: 'var(--crema)' }}>jrgutierrez@prodigioia.com</strong>
              </p>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ background: 'var(--tinta)', padding: '36px 48px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
        <img src={LOGO_MAIN} alt="Prodigio IA" style={{ height: 26, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Monterrey, México</span>
          <a href="mailto:jrgutierrez@prodigioia.com" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
          >jrgutierrez@prodigioia.com</a>
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
          Procesos que funcionan solos.
        </span>
      </div>
      <div style={{ maxWidth: 1200, margin: '20px auto 0', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', textAlign: 'center' }}>
          © {new Date().getFullYear()} Prodigio IA · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}

/* ─── WHATSAPP BUTTON ─── */
function WhatsAppButton() {
  const [hover, setHover] = useState(false);
  const waLink = 'https://wa.me/528119776346?text=' + encodeURIComponent('Hola, me interesa conocer más sobre implementación de IA con Prodigio IA.');
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Escríbenos por WhatsApp"
      style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 999,
        width: hover ? 'auto' : 56, height: 56,
        background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: hover ? 10 : 0, paddingLeft: hover ? 20 : 0, paddingRight: hover ? 20 : 0,
        boxShadow: hover ? '0 8px 28px rgba(37,211,102,0.45)' : '0 4px 16px rgba(37,211,102,0.35)',
        cursor: 'pointer', textDecoration: 'none',
        transition: 'all 0.3s ease', transform: hover ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      <svg viewBox="0 0 32 32" width="26" height="26" fill="white" style={{ flexShrink: 0 }}>
        <path d="M16.002 3.2A12.798 12.798 0 0 0 3.6 19.536L2 30l10.736-1.568A12.8 12.8 0 1 0 16.002 3.2Zm0 23.36a10.544 10.544 0 0 1-5.376-1.472l-.384-.224-4 1.056 1.072-3.904-.256-.4A10.56 10.56 0 1 1 16.002 26.56Zm5.792-7.904c-.32-.16-1.872-.928-2.16-1.024-.288-.112-.496-.16-.704.16s-.816 1.024-.992 1.232c-.192.208-.368.224-.688.08a8.632 8.632 0 0 1-2.56-1.584 9.62 9.62 0 0 1-1.776-2.208c-.192-.32 0-.48.144-.64.128-.128.288-.336.432-.496.144-.176.192-.288.288-.496.096-.192.048-.368-.032-.512-.08-.16-.704-1.696-.96-2.32-.256-.608-.512-.528-.704-.528h-.592a1.152 1.152 0 0 0-.832.384 3.488 3.488 0 0 0-1.088 2.592 6.064 6.064 0 0 0 1.264 3.216 13.856 13.856 0 0 0 5.312 4.688c.736.32 1.312.512 1.76.656a4.24 4.24 0 0 0 1.952.128c.592-.096 1.872-.768 2.144-1.504.256-.752.256-1.392.176-1.52-.064-.144-.272-.224-.576-.384Z" />
      </svg>
      {hover && (
        <span style={{ color: 'white', fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>
          Escríbenos
        </span>
      )}
    </a>
  );
}

/* ─── MAIN ─── */
export default function ProdigioLanding() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hueso)', overflow: 'hidden' }}>
      {globalStyles}
      <Nav />
      <Hero />
      <Problem />
      <WhatWeDo />
      <ProcessFamilies />
      <Solutions />
      <Methodology />
      <Results />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
