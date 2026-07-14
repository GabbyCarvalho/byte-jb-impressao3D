import { useState, useEffect, useRef } from 'react'
import './styles.css'
import logoText from"./assets/hero.png"
import logoArt from "./assets/navbar.png"
// ── Ícone WhatsApp reutilizável ──────────────────────────────
const IconWhatsApp = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const IconEmail = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const IconInstagram = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

// ── Dados ────────────────────────────────────────────────────
const DIFERENCIAIS = [
  { icon: '🎯', title: 'Personalização Total', desc: 'Cada projeto é único. Da arte ao produto final, tudo sob medida para você.' },
  { icon: '⚡', title: 'Entrega Rápida', desc: 'Processo otimizado para entregar no prazo combinado, sem surpresas.' },
  { icon: '💎', title: 'Acabamento Premium', desc: 'Gravação a laser permanente e impressão 3D de alta resolução, sem etiquetas.' },
  { icon: '📐', title: 'Projetos Sob Medida', desc: 'Desde peças únicas até pequenas séries. Atendemos empresas e clientes finais.' },
  { icon: '🎨', title: 'Produtos Exclusivos', desc: 'Luminárias, suportes, brindes corporativos — criações que ninguém mais tem.' },
  { icon: '🤝', title: 'Atendimento Direto', desc: 'Fale direto com quem fabrica. Sem intermediários, mais agilidade e qualidade.' },
]

const PRODUTOS = [
  { emoji: '🖨️', title: 'Impressão 3D', desc: 'Peças funcionais, protótipos, decorações e objetos personalizados com alta precisão dimensional.', tags: ['PLA / ABS / PETG', 'Multicor', 'Alta Resolução'] },
  { emoji: '✂️', title: 'Corte a Laser', desc: 'Corte com precisão milimétrica em MDF, acrílico, papel, EVA, couro e mais.', tags: ['MDF', 'Acrílico', 'Couro', 'Papel'] },
  { emoji: '⚡', title: 'Gravação a Laser', desc: 'Gravação permanente em metais, vidro, madeira, superfícies pintadas e acrílico. Não descola, não apaga.', tags: ['Aço Inox', 'Alumínio', 'Vidro', 'Carbono'] },
  { emoji: '💡', title: 'Luminárias Personalizadas', desc: 'Luminárias em acrílico, MDF e PLA com design exclusivo. Para decoração, presente ou ambiente corporativo.', tags: ['Sob Encomenda', 'Decorativo', 'Corporativo'] },
  { emoji: '📱', title: 'Suportes & Organização', desc: 'Suportes de mesa para celular, tablet, notebook e muito mais — personalizados com sua marca ou estilo.', tags: ['Celular', 'Tablet', 'Notebook'] },
  { emoji: '🎁', title: 'Brindes & Presentes', desc: 'Mouse gravado, notebooks personalizados, placas, chaveiros, troféus — brindes únicos que impressionam.', tags: ['Corporativo', 'Eventos', 'Exclusivo'] },
]

const MATERIAIS = [
  { icon: '🪵', name: 'MDF / Madeira' },
  { icon: '🔷', name: 'Acrílico' },
  { icon: '🥃', name: 'Vidro' },
  { icon: '🪨', name: 'Aço Inox' },
  { icon: '⚙️', name: 'Alumínio' },
  { icon: '🖤', name: 'Carbono' },
  { icon: '👜', name: 'Couro' },
  { icon: '🧩', name: 'PLA / ABS / PETG' },
  { icon: '📄', name: 'Papel / EVA' },
  { icon: '🎨', name: 'Sup. Pintadas' },
  { icon: '🖥️', name: 'Mouse / Notebook' },
  { icon: '✨', name: 'Acabamento Brilhante' },
]

const CORES = [
  { bg: '#1a1a1a', label: 'Preto Fosco' },
  { bg: '#ffffff', label: 'Branco', border: '#ccc' },
  { bg: '#d9d9d9', label: 'Prata / Cinza' },
  { bg: '#022f79', label: 'Azul Marinho' },
  { bg: '#e8a820', label: 'Dourado' },
  { bg: '#c0392b', label: 'Vermelho' },
  { bg: '#27ae60', label: 'Verde' },
  { bg: '#efebe0', label: 'Bege / Creme' },
  { bg: 'linear-gradient(135deg,#f0c,#0cf)', label: '+ Outras cores' },
]

const CUSTOM_ITENS = [
  'Gravação de logo corporativa em mouse, notebooks e equipamentos de escritório',
  'Suportes de mesa para celular com design e nome personalizados',
  'Luminárias decorativas em acrílico e MDF com arte exclusiva',
  'Peças decorativas, troféus e placas comemorativas sob medida',
  'Brindes corporativos únicos para eventos, feiras e presentes especiais',
  'Protótipos e peças funcionais em 3D para projetos e desenvolvimento',
]

const STEPS = [
  { n: '1', title: 'Entre em Contato', desc: 'Envie sua ideia pelo WhatsApp ou preencha o formulário com os detalhes do seu projeto.' },
  { n: '2', title: 'Orçamento Rápido', desc: 'Analisamos o projeto e enviamos um orçamento detalhado com prazo e valores em até 24h.' },
  { n: '3', title: 'Produção', desc: 'Com sua aprovação, iniciamos a produção com toda a atenção e precisão que seu projeto merece.' },
  { n: '4', title: 'Entrega!', desc: 'Entregamos pessoalmente na região ou enviamos via transportadora para todo o Brasil.' },
]

const FAQS = [
  { q: 'Qual o prazo mínimo para produção?', a: 'O prazo varia conforme a complexidade e quantidade do pedido. Peças simples podem sair em 1–3 dias úteis. Projetos maiores ou mais complexos têm prazo combinado antes do início da produção.' },
  { q: 'Posso enviar minha arte ou logo?', a: 'Sim! Aceitamos arquivos em SVG, AI, PDF vetorizado, CDR ou PNG de alta resolução. Caso não tenha o arquivo ideal, nossa equipe pode auxiliar na adaptação da arte.' },
  { q: 'A gravação a laser realmente não sai?', a: 'Sim! A gravação a laser é permanente — ela remove material da superfície ou altera a cor permanentemente. Diferente de adesivos ou etiquetas, não descola, não desbota e resiste à água e ao uso diário.' },
  { q: 'Fazem pedidos em pequenas quantidades?', a: 'Sim! Atendemos desde pedidos de 1 unidade (peças únicas e presenteáveis) até pequenas e médias séries. Entre em contato para obter o melhor custo-benefício para a sua quantidade.' },
  { q: 'Enviam para outras cidades e estados?', a: 'Sim! Enviamos para todo o Brasil via Correios ou transportadora, com embalagem reforçada e rastreamento. Atendemos pessoalmente na região de Campo Largo/PR.' },
  { q: 'Como é feito o pagamento?', a: 'Aceitamos Pix, transferência bancária e outros métodos combinados. Para pedidos maiores, pode ser solicitado sinal no início e o restante na entrega.' },
]

// ── Número e e-mail — altere aqui ───────────────────────────
const WPP_NUMBER = '554896058800'  // 
const EMAIL_CONTATO = 'bytejba@gmail.com' // 
// ════════════════════════════════════════════════════════════

// ── imports das imagens dos produtos ──
import produto1 from './assets/calendar.png'
import produto2 from './assets/monster-lamp.png'
import produto3 from './assets/bottle.png'
import produto4 from './assets/bottles.png'
import produto5 from './assets/suporte.png'
import produto6 from './assets/lembranca-natal.png'

const PRODUTOS_CAROUSEL = [produto1, produto2, produto3, produto4, produto5, produto6]

function Carousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % PRODUTOS_CAROUSEL.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent(c => (c - 1 + PRODUTOS_CAROUSEL.length) % PRODUTOS_CAROUSEL.length)
  const next = () => setCurrent(c => (c + 1) % PRODUTOS_CAROUSEL.length)

  return (
    <div className="carousel">
      <div className="carousel-track">
        {PRODUTOS_CAROUSEL.map((img, i) => (
          <div
            key={i}
            className={`carousel-slide ${i === current ? 'active' : i === (current - 1 + PRODUTOS_CAROUSEL.length) % PRODUTOS_CAROUSEL.length ? 'prev' : ''}`}
          >
            <img src={img} alt={`Produto ${i + 1}`} />
          </div>
        ))}
      </div>

      <button className="carousel-btn carousel-btn-prev" onClick={prev}>‹</button>
      <button className="carousel-btn carousel-btn-next" onClick={next}>›</button>

      <div className="carousel-dots">
        {PRODUTOS_CAROUSEL.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  )
}
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState(null)
  const [toast, setToast] = useState({ show: false, msg: '', icon: '✅' })
  const [form, setForm] = useState({ nome: '', telefone: '', email: '', produto: '', quantidade: '', data: '', descricao: '' })

  // ── Scroll animations ──────────────────────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // ── Navbar shadow on scroll ────────────────────────────────
  useEffect(() => {
    const handler = () => {
      const nb = document.getElementById('navbar')
      if (nb) nb.style.boxShadow = window.scrollY > 60 ? '0 4px 30px rgba(0,0,0,0.25)' : 'none'
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // ── Toast helper ───────────────────────────────────────────
  const showToast = (msg, icon = '✅') => {
    setToast({ show: true, msg, icon })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3500)
  }

  // ── Form field change ──────────────────────────────────────
  const handleField = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  // ── WhatsApp ───────────────────────────────────────────────
  const enviarWhatsApp = () => {
    const { nome, telefone, produto, quantidade, data, descricao } = form
    if (!nome || !telefone || !produto || !descricao) {
      showToast('Preencha os campos obrigatórios (*)', '⚠️')
      return
    }
    let msg = `Olá! Sou o(a) *${nome}* e gostaria de um orçamento:`
    msg += `\n\n📦 *Produto/Serviço:* ${produto}`
    if (quantidade) msg += `\n🔢 *Quantidade:* ${quantidade} unidade(s)`
    if (data) msg += `\n📅 *Data desejada:* ${data}`
    msg += `\n\n📝 *Descrição:*\n${descricao}`
    if (telefone) msg += `\n\n📞 *Meu contato:* ${telefone}`
    window.open(`https://wa.me/${WPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
    showToast('Redirecionando para o WhatsApp...', '💬')
  }

  // ── E-mail ─────────────────────────────────────────────────
  const enviarEmail = () => {
    const { nome, email, produto, quantidade, data, descricao } = form
    if (!nome || !produto || !descricao) {
      showToast('Preencha nome, produto e descrição', '⚠️')
      return
    }
    const assunto = `Orçamento BYTEJB — ${produto}`
    let corpo = `Olá! Gostaria de um orçamento:\n\nNome: ${nome}\n`
    if (email) corpo += `E-mail: ${email}\n`
    corpo += `Produto/Serviço: ${produto}\n`
    if (quantidade) corpo += `Quantidade: ${quantidade}\n`
    if (data) corpo += `Data desejada: ${data}\n\n`
    corpo += `Descrição:\n${descricao}`
    window.location.href = `mailto:${EMAIL_CONTATO}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`
    showToast('Abrindo cliente de e-mail...', '📧')
  }

  // ── FAQ toggle ─────────────────────────────────────────────
  const toggleFaq = (i) => setFaqOpen(faqOpen === i ? null : i)

  // ════════════════════════════════════════════════════════════
  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="navbar" id="navbar">
        <div className="logo-area">
          <img src={logoArt} alt="BYTEJB Logo" />
        </div>

        <ul className="nav-links">
          {[['#produtos','Produtos'],['#como-funciona','Como Funciona'],['#materiais','Materiais'],['#personalizacao','Personalização'],['#orcamento','Contato']].map(([href, label]) => (
            <li key={href}><a href={href}>{label}</a></li>
          ))}
          <li><a href="#orcamento" className="nav-cta">Pedir Orçamento</a></li>
        </ul>

        <div
          className="hamburger"
          role="button"
          aria-label="Abrir menu"
          tabIndex={0}
          onClick={() => setMenuOpen(o => !o)}
          onKeyDown={e => e.key === 'Enter' && setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {[['#produtos','Produtos'],['#como-funciona','Como Funciona'],['#materiais','Materiais'],['#personalizacao','Personalização'],['#orcamento','Pedir Orçamento']].map(([href, label]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </div>

      {/* ── HERO ── */}
      <section className="hero" id="inicio">
        <div className="hero-bg-grid" />
        <div className="hero-content">
          <h1>
            Sua ideia <span className="accent-word">impressa</span><br />
            em 3D e laser
          </h1>
          <p className="hero-desc">
            Impressão 3D, corte e gravação a laser com acabamento premium. Personalizamos mouse, notebooks, luminárias, suportes de mesa, acrílicos e muito mais — do protótipo à entrega.
          </p>
          <div className="hero-actions">
            <a href="#orcamento" className="btn-primary">💬 Pedir Orçamento no WhatsApp</a>
            <a href="#produtos" className="btn-secondary">Ver Produtos ↓</a>
          </div>
        </div>
        <div className="hero-image">
          <img src={logoText} alt="BYTEJB Arte" />
        </div>
      </section>

      {/* ── DIFERENCIAIS / SOBRE ── */}
      <section className="diferenciais" id="sobre">
        <div className="diferenciais-grid">
          <div className="diferencial-cards">
            {DIFERENCIAIS.map(({ icon, title, desc }) => (
              <div className="diferencial-card fade-up" key={title}>
                <div className="card-icon">{icon}</div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <div className="diferenciais-info fade-up">
            <div className="section-tag">Quem somos</div>
            <h2 className="section-title">BYTEJB — <span className="highlight">Joubert Bittencourt</span></h2>
            <p className="sobre-text">
              Somos uma empresa especializada em impressão 3D e gravação a laser localizada em Campo Largo, PR. Nascemos da paixão por tecnologia e criatividade, combinando precisão técnica com atenção aos detalhes para transformar suas ideias em produtos reais e duráveis.
            </p>
            <p className="sobre-text">
              Atendemos pessoas físicas, pequenas empresas e grandes corporações que buscam personalização diferenciada — brindes, placas, suportes, peças decorativas, protótipos e muito mais.
            </p>
            <div className="sobre-badges">
              <p className="badge">Envio para todo o Brasil</p>
          </div>
        </div>
        </div>
      </section>

      {/* ── PRODUTOS ── */}
      <section className="produtos" id="produtos">
        <div className="produtos-header">
          <div className="section-tag">O que fazemos</div>
          <h2 className="section-title">Produtos &amp; Serviços</h2>
          <p className="section-desc">Do protótipo ao brinde corporativo — temos a solução certa para cada necessidade.</p>
        </div>
        <div className="produtos-grid">
          {PRODUTOS.map(({ emoji, title, desc, tags }) => (
            <div className="produto-card fade-up" key={title}>
              <span className="produto-emoji">{emoji}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="produto-tags">
                {tags.map(t => <span className="produto-tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="como-funciona" id="como-funciona">
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <div className="section-tag" style={{ display: 'inline-flex' }}>Como Funciona</div>
        </div>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Do pedido à entrega</h2>
        <p className="section-desc" style={{ textAlign: 'center', margin: '0 auto' }}>Processo simples e transparente para você receber exatamente o que imaginou.</p>
        <div className="steps-container">
          {STEPS.map(({ n, title, desc }) => (
            <div className="step fade-up" key={n}>
              <div className="step-number">{n}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MATERIAIS & CORES ── */}
      <section className="materiais" id="materiais">
        <div className="section-tag">Materiais &amp; Acabamentos</div>
        <h2 className="section-title">Trabalhamos com os melhores materiais</h2>
        <p className="section-desc">Variedade de materiais para cada tipo de projeto, com acabamento que impressiona.</p>
        <div className="materiais-grid">
          {MATERIAIS.map(({ icon, name }) => (
            <div className="material-chip fade-up" key={name}>
              <span className="material-icon">{icon}</span>
              <span className="material-name">{name}</span>
            </div>
          ))}
        </div>
        <div className="cores-section">
          <h3>Cores disponíveis para impressão 3D</h3>
          <div className="cores-grid">
            {CORES.map(({ bg, label, border }) => (
              <div className="cor-chip" key={label}>
                <div className="cor-dot" style={{ background: bg, borderColor: border || 'rgba(0,0,0,0.1)' }} />
                <span className="cor-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* ── PERSONALIZAÇÃO ── */}
<section className="personalizacao" id="personalizacao">
  <div className="personalizacao-inner">
    <div className="custom-visual">
      <Carousel />
    </div>
    <div className="fade-up">
      <div className="section-tag">Personalização &amp; Encomendas</div>
      <h2 className="section-title">Feito para você,<br /><span className="highlight">do seu jeito</span></h2>
      <p className="section-desc">
        Personalizamos praticamente qualquer objeto ou superfície. Grave a logo da sua empresa em mouse e notebooks — melhor que etiqueta, a gravação a laser não sai. Nunca.
      </p>
      <ul className="custom-list">
        {CUSTOM_ITENS.map(item => (
          <li key={item}>
            <div className="check">✓</div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '2rem' }}>
        <a href="#orcamento" className="btn-primary" style={{ background: 'var(--navy)', color: 'var(--white)' }}>
          Solicitar Personalização →
        </a>
      </div>
    </div>
  </div>
</section>

      {/* ── ENTREGA ── */}
      <section className="entrega" id="entrega">
        <div className="section-tag">Entrega &amp; Região</div>
        <h2 className="section-title">Chegamos até você</h2>
        <p className="section-desc">Atendemos presencialmente na região e enviamos para todo o Brasil com segurança.</p>
        <div className="entrega-grid">
          {[
            { icon: '📍', title: 'Atendimento Presencial', desc: 'Campo Largo, Curitiba, Região Metropolitana e cidades do Paraná. Retirada local disponível.' },
            { icon: '🚚', title: 'Envio para Todo o Brasil', desc: 'Enviamos via Correios e transportadoras parceiras com embalagem reforçada e rastreamento completo do pedido.' },
            { icon: '⏱️', title: 'Prazo Combinado', desc: 'O prazo é definido conforme a complexidade do projeto. Informamos antes de iniciar e cumprimos o combinado.' },
          ].map(({ icon, title, desc }) => (
            <div className="entrega-card fade-up" key={title}>
              <div className="entrega-icon">{icon}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ORÇAMENTO / FORMULÁRIO ── */}
      <section className="orcamento" id="orcamento">
        <div className="section-tag">Contato &amp; Orçamento</div>
        <h2 className="section-title">Vamos começar seu projeto?</h2>
        <p className="section-desc">Preencha o formulário e seu pedido vai direto para o nosso WhatsApp — rápido e simples.</p>

        <div className="orcamento-inner">
          {/* Formulário */}
          <div className="form-card">
            <div className="form-grid">
              <div className="form-group">
                <label>Nome completo *</label>
                <input type="text" name="nome" placeholder="Seu nome" value={form.nome} onChange={handleField} />
              </div>
              <div className="form-group">
                <label>WhatsApp / Telefone *</label>
                <input type="tel" name="telefone" placeholder="(99) 99999-9999" value={form.telefone} onChange={handleField} />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input type="email" name="email" placeholder="seu@email.com" value={form.email} onChange={handleField} />
              </div>
              <div className="form-group">
                <label>Produto / Serviço *</label>
                <select name="produto" value={form.produto} onChange={handleField}>
                  <option value="">Selecione...</option>
                  {['Impressão 3D','Corte a Laser','Gravação a Laser em Metal','Gravação em Vidro / Acrílico','Luminária Personalizada','Suporte de Mesa','Gravação em Mouse / Notebook','Brinde Corporativo','Outro / Personalizado'].map(o => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Quantidade desejada *</label>
                <input type="number" name="quantidade" placeholder="Ex: 10" min="1" value={form.quantidade} onChange={handleField} />
              </div>
              <div className="form-group">
                <label>Data desejada para entrega</label>
                <input type="date" name="data" value={form.data} onChange={handleField} />
              </div>
              <div className="form-group full">
                <label>Descrição do projeto *</label>
                <textarea name="descricao" placeholder="Descreva seu projeto: material, tamanho, arte, referência ou qualquer detalhe importante..." value={form.descricao} onChange={handleField} />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-whatsapp" onClick={enviarWhatsApp}>
                <IconWhatsApp size={20} />
                Enviar para WhatsApp
              </button>
              <button className="btn-email" onClick={enviarEmail}>
                📧 Enviar por E-mail
              </button>
            </div>
          </div>

          {/* Contatos */}
          <div className="contact-panel fade-up">
            <h3>Fale diretamente conosco</h3>
            <p>Prefere uma conversa mais direta? Entre em contato pelos nossos canais — respondemos rapidamente!</p>
            <div className="contact-links">
              <a href={`https://wa.me/${WPP_NUMBER}?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento.`} className="contact-link" target="_blank" rel="noopener noreferrer">
                <div className="contact-icon ci-wpp"><IconWhatsApp size={22} color="#25d366" /></div>
                <div className="contact-info">
                  <span className="contact-label">WhatsApp</span>
                  <span className="contact-value">(48) 9605-8800 </span>
                </div>
              </a>
              <a href={`mailto:${EMAIL_CONTATO}`} className="contact-link">
                <div className="contact-icon ci-email"><IconEmail size={20} /></div>
                <div className="contact-info">
                  <span className="contact-label">E-mail</span>
                  <span className="contact-value">{EMAIL_CONTATO}</span>
                </div>
              </a>
              <a href="https://www.instagram.com/bytejb?igsh=YXY2bWprM25obGQ=" className="contact-link" target="_blank" rel="noopener noreferrer">
                <div className="contact-icon ci-ig"><IconInstagram size={20} /></div>
                <div className="contact-info">
                  <span className="contact-label">Instagram</span>
                  <span className="contact-value">@bytejb</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq" id="faq">
        <div style={{ textAlign: 'center' }}>
          <div className="section-tag" style={{ display: 'inline-flex' }}>Dúvidas Frequentes</div>
          <h2 className="section-title">Perguntas frequentes</h2>
        </div>
        <div className="faq-grid" style={{ marginTop: '3rem' }}>
          {FAQS.map(({ q, a }, i) => (
            <div className={`faq-item${faqOpen === i ? ' open' : ''}`} key={q}>
              <div className="faq-question" onClick={() => toggleFaq(i)}>
                {q}
                <div className="faq-toggle">+</div>
              </div>
              <div className="faq-answer">{a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="cta-final">
        <h2>Sua próxima peça começa<br />com uma mensagem</h2>
        <p>Produtos únicos, acabamento premium, entrega garantida.</p>
        <a href={`https://wa.me/${WPP_NUMBER}?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20pelo%20site.`} className="btn-primary" target="_blank" rel="noopener noreferrer">
          💬 Falar no WhatsApp Agora
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div className="logo-area">
            <div className="logo-text">
              <span className="logo-name">BYTEJB</span>
              <span className="logo-sub">Impressões 3D &amp; Laser</span>
            </div>
          </div>
          <div className="footer-social">
            <a href={`https://wa.me/${WPP_NUMBER}`} className="social-btn" target="_blank" rel="noopener noreferrer" title="WhatsApp">
              <IconWhatsApp size={18} />
            </a>
            <a href="https://instagram.com/bytejb" className="social-btn" target="_blank" rel="noopener noreferrer" title="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href="https://www.facebook.com/share/1DRtwrfACi/?mibextid=wwXIfr" className="social-btn" target="_blank" rel="noopener noreferrer" title="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99h-2.54V12h2.54V9.79c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 16.99 22 12z" />
              </svg>
            </a>
          </div>
        </div>
        <p className="footer-copy">© 2026 BYTEJB — Joubert Bittencourt. Todos os direitos reservados. | Campo Largo/PR</p>
      </footer>

      {/* ── TOAST ── */}
      <div className={`toast${toast.show ? ' show' : ''}`}>
        <span>{toast.icon}</span>
        <span>{toast.msg}</span>
      </div>
    </>
  )
}
