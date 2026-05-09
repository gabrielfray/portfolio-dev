import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

function App() {
  const eyebrowText = '// INICIALIZANDO_PORTFÓLIO'
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactSubject, setContactSubject] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [typedEyebrow, setTypedEyebrow] = useState('')
  const [isDeletingEyebrow, setIsDeletingEyebrow] = useState(false)
  const navRef = useRef<HTMLElement | null>(null)
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const cursorRingRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const timeoutMs = !isDeletingEyebrow && typedEyebrow.length < eyebrowText.length
      ? 150
      : !isDeletingEyebrow && typedEyebrow.length === eyebrowText.length
        ? 2200
        : isDeletingEyebrow && typedEyebrow.length > 0
          ? 75
          : 950

    const timer = window.setTimeout(() => {
      if (!isDeletingEyebrow && typedEyebrow.length < eyebrowText.length) {
        setTypedEyebrow(eyebrowText.slice(0, typedEyebrow.length + 1))
        return
      }

      if (!isDeletingEyebrow && typedEyebrow.length === eyebrowText.length) {
        setIsDeletingEyebrow(true)
        return
      }

      if (isDeletingEyebrow && typedEyebrow.length > 0) {
        setTypedEyebrow(typedEyebrow.slice(0, -1))
        return
      }

      setIsDeletingEyebrow(false)
    }, timeoutMs)

    return () => {
      window.clearTimeout(timer)
    }
  }, [eyebrowText, isDeletingEyebrow, typedEyebrow])

  const contactBody = [
    `Nome: ${contactName || '-'}`,
    `Email: ${contactEmail || '-'}`,
    '',
    'Mensagem:',
    contactMessage || '-',
  ].join('\n')

  const mailtoHref = `mailto:gabrielfraygarandy@gmail.com?${new URLSearchParams({
    subject: contactSubject || 'Contato pelo portfolio',
    body: contactBody,
  }).toString()}`

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorRing = cursorRingRef.current
    const nav = navRef.current
    const canvas = canvasRef.current
    if (!cursor || !cursorRing || !nav || !canvas) {
      return
    }

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let ringAnimationId = 0
    let sceneAnimationId = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
      cursor.style.left = `${mouseX}px`
      cursor.style.top = `${mouseY}px`
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.11
      ringY += (mouseY - ringY) * 0.11
      cursorRing.style.left = `${ringX}px`
      cursorRing.style.top = `${ringY}px`
      ringAnimationId = requestAnimationFrame(animateRing)
    }

    const handleScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60)
    }

    const interactiveElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        'a, button, .tag, .proj-card, .stack-card, .social-link, .tl-item, .btn',
      ),
    )

    const activateCursor = () => {
      cursor.classList.add('active')
      cursorRing.classList.add('active')
    }

    const deactivateCursor = () => {
      cursor.classList.remove('active')
      cursorRing.classList.remove('active')
    }

    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', activateCursor)
      element.addEventListener('mouseleave', deactivateCursor)
    })

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
          }
        })
      },
      { threshold: 0.08 },
    )

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${(index % 5) * 0.08}s`
      revealObserver.observe(element)
    })

    const width = () => window.innerWidth
    const height = () => window.innerHeight

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width(), height())

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0a0022, 0.028)

    const camera = new THREE.PerspectiveCamera(58, width() / height(), 0.1, 250)
    camera.position.set(0, 9, 28)
    camera.lookAt(0, 2, -80)

    const handleResize = () => {
      renderer.setSize(width(), height())
      camera.aspect = width() / height()
      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', handleResize)

    const gridSize = 120
    const gridDivisions = 28
    const grids: THREE.GridHelper[] = []
    for (let index = 0; index < 4; index += 1) {
      const grid = new THREE.GridHelper(gridSize, gridDivisions, 0xff2d78, 0xc400ff)
      grid.position.y = -3
      grid.position.z = index * gridSize - gridSize * 1.5
      const material = grid.material as THREE.Material & { opacity: number; transparent: boolean }
      material.opacity = 0.7
      material.transparent = true
      grids.push(grid)
      scene.add(grid)
    }

    const cyanGrids: THREE.GridHelper[] = []
    for (let index = 0; index < 4; index += 1) {
      const grid = new THREE.GridHelper(gridSize, 8, 0x00f0ff, 0x00f0ff)
      grid.position.y = -3.01
      grid.position.z = index * gridSize - gridSize * 1.5
      const material = grid.material as THREE.Material & { opacity: number; transparent: boolean }
      material.opacity = 0.18
      material.transparent = true
      cyanGrids.push(grid)
      scene.add(grid)
    }

    const mainKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(4.5, 1.1, 200, 22),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true }),
    )
    mainKnot.position.set(16, 6, -8)
    scene.add(mainKnot)

    const secondKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(2.8, 0.6, 120, 14),
      new THREE.MeshBasicMaterial({ color: 0xff2d78, wireframe: true }),
    )
    secondKnot.position.set(-18, 4, -14)
    scene.add(secondKnot)

    const backTorus = new THREE.Mesh(
      new THREE.TorusGeometry(6, 0.3, 12, 60),
      new THREE.MeshBasicMaterial({ color: 0xc400ff, wireframe: true }),
    )
    backTorus.position.set(0, 8, -40)
    backTorus.rotation.x = Math.PI / 4
    scene.add(backTorus)

    const floaterColors = [0x00f0ff, 0xff2d78, 0xc400ff, 0xffe600]
    const floaters: THREE.Mesh[] = []
    for (let index = 0; index < 10; index += 1) {
      const size = Math.random() * 1.4 + 0.25
      const floater = new THREE.Mesh(
        new THREE.IcosahedronGeometry(size, 0),
        new THREE.MeshBasicMaterial({
          color: floaterColors[Math.floor(Math.random() * floaterColors.length)],
          wireframe: true,
        }),
      )
      floater.position.set((Math.random() - 0.5) * 70, Math.random() * 18 + 2, (Math.random() - 0.5) * 50 - 10)
      floater.userData = {
        rotationX: (Math.random() - 0.5) * 0.022,
        rotationY: (Math.random() - 0.5) * 0.022,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: Math.random() * 0.012 + 0.006,
        baseY: floater.position.y,
      }
      floaters.push(floater)
      scene.add(floater)
    }

    const starGeometry = new THREE.BufferGeometry()
    const starPositions = new Float32Array(1000 * 3)
    for (let index = 0; index < 1000; index += 1) {
      starPositions[index * 3] = (Math.random() - 0.5) * 400
      starPositions[index * 3 + 1] = Math.random() * 80 + 15
      starPositions[index * 3 + 2] = (Math.random() - 0.5) * 250
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    scene.add(new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xffffff, size: 0.18, transparent: true, opacity: 0.55 })))

    let time = 0
    const animateScene = () => {
      sceneAnimationId = requestAnimationFrame(animateScene)
      time += 0.012

      grids.forEach((grid) => {
        grid.position.z += 0.28
        if (grid.position.z > gridSize * 1.5) {
          grid.position.z -= gridSize * 4
        }
      })
      cyanGrids.forEach((grid) => {
        grid.position.z += 0.28
        if (grid.position.z > gridSize * 1.5) {
          grid.position.z -= gridSize * 4
        }
      })

      mainKnot.rotation.x += 0.003
      mainKnot.rotation.y += 0.006
      mainKnot.rotation.z += 0.0015
      mainKnot.position.y = 6 + Math.sin(time * 0.55) * 1.8

      secondKnot.rotation.x -= 0.005
      secondKnot.rotation.y -= 0.007
      secondKnot.position.y = 4 + Math.cos(time * 0.45) * 1.4

      backTorus.rotation.z += 0.003
      backTorus.rotation.y += 0.001

      floaters.forEach((floater) => {
        const data = floater.userData as {
          rotationX: number
          rotationY: number
          floatOffset: number
          floatSpeed: number
          baseY: number
        }
        floater.rotation.x += data.rotationX
        floater.rotation.y += data.rotationY
        floater.position.y = data.baseY + Math.sin(time * data.floatSpeed * 80 + data.floatOffset) * 1.6
      })

      camera.position.x = Math.sin(time * 0.18) * 1.8
      camera.position.y = 9 + Math.sin(time * 0.12) * 0.4
      renderer.render(scene, camera)
    }

    document.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    animateRing()
    animateScene()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(ringAnimationId)
      cancelAnimationFrame(sceneAnimationId)
      revealObserver.disconnect()
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', activateCursor)
        element.removeEventListener('mouseleave', deactivateCursor)
      })
      renderer.dispose()
      scene.traverse((obj: THREE.Object3D) => {
        const mesh = obj as THREE.Mesh
        if (mesh.geometry) {
          mesh.geometry.dispose()
        }
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material: THREE.Material) => material.dispose())
        } else if (mesh.material) {
          mesh.material.dispose()
        }
      })
    }
  }, [])

  return (
    <div>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={cursorRingRef} />

      <nav id="mainNav" ref={navRef}>
        <a href="#hero" className="nav-logo">
          DEV<em>.</em>FRAY
        </a>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <a href="#about" data-num="01" onClick={() => setIsMenuOpen(false)}>
              SOBRE
            </a>
          </li>
          <li>
            <a href="#stack" data-num="02" onClick={() => setIsMenuOpen(false)}>
              STACK
            </a>
          </li>
          <li>
            <a href="#projects" data-num="03" onClick={() => setIsMenuOpen(false)}>
              PROJETOS
            </a>
          </li>
          <li>
            <a href="#experience" data-num="04" onClick={() => setIsMenuOpen(false)}>
              EXPERIÊNCIA
            </a>
          </li>
          <li>
            <a href="#contact" data-num="05" onClick={() => setIsMenuOpen(false)}>
              CONTATO
            </a>
          </li>
        </ul>
        <button className="nav-menu-btn" onClick={() => setIsMenuOpen((state) => !state)} aria-label="Abrir menu">
          <i className="fas fa-bars" />
        </button>
      </nav>

      <main>
        <section id="hero">
          <div className="hero-sky" />

          <div className="hero-sun-wrap">
            <div className="hero-sun-circle" />
            <div className="hero-sun-stripes" />
          </div>

          <div className="hero-mountains">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,120 L0,80 L80,40 L160,70 L260,20 L350,65 L430,10 L520,55 L620,0 L700,50 L780,15 L860,60 L950,5 L1040,55 L1140,18 L1220,62 L1310,25 L1380,70 L1440,45 L1440,120 Z" fill="#04000f" />
              <path d="M0,120 L0,95 L120,70 L200,90 L300,50 L380,80 L480,30 L560,75 L660,45 L740,85 L840,35 L920,78 L1020,42 L1100,80 L1200,55 L1290,88 L1380,60 L1440,80 L1440,120 Z" fill="#0a0022" opacity="0.9" />
            </svg>
          </div>

          <div className="hero-ground" />
          <div className="scanlines" />
          <canvas id="hero-canvas" ref={canvasRef} />

          <div className="hero-content">
            <div className="hero-eyebrow">{typedEyebrow}</div>
            <h1 className="hero-name">
              <span className="glitch" data-text="GABRIEL FRAY">
                GABRIEL FRAY
              </span>
            </h1>
            <div className="xp-window hero-title" role="presentation">
              <div className="xp-window-bar">
                <span>SYSTEM_ROLE.exe</span>
                <span className="xp-window-controls" aria-hidden="true">
                  _ □ ×
                </span>
              </div>
              <p>SOFTWARE ENGINEER</p>
            </div>
            <div className="xp-window hero-desc" role="presentation">
              <div className="xp-window-bar">
                <span>about_me.txt</span>
                <span className="xp-window-controls" aria-hidden="true">
                  _ □ ×
                </span>
              </div>
              <p>
                Engenheiro de software com foco em <strong>frontend</strong> e entusiasmo por backend, sempre estudando novas tecnologias para construir
                produtos performáticos e intuitivos.
              </p>
            </div>
            <div className="hero-btns">
              <a href="#projects" className="btn btn-neon-pink">
                <span>VER PROJETOS</span>
              </a>
              <a href="#contact" className="btn btn-neon-cyan">
                FALE COMIGO
              </a>
            </div>
          </div>

          <div className="scroll-hint">
            <span>SCROLL</span>
            <div className="scroll-line" />
          </div>
        </section>

        <div className="neon-divider" />

        <section id="about">
          <div className="reveal">
            <div className="sec-tag">// 01. SOBRE MIM</div>
            <h2 className="sec-title">
              Quem sou <span className="hl">eu</span>
            </h2>
            <div className="sec-rule" />
          </div>

          <div className="about-grid">
            <div className="photo-wrap reveal">
              <div className="photo-frame">
                <img src="/euai.jpg" alt="Foto de Gabriel Fray" className="photo-avatar" />
                <div className="photo-scan" />
              </div>
              <div className="corner tl" />
              <div className="corner tr" />
              <div className="corner bl" />
              <div className="corner br" />
            </div>

            <div className="about-text reveal">
              <h3>Olá, eu sou Gabriel Fray Garandy 👾</h3>
              <p>
                Apaixonado por dar vida às interfaces visuais e criar experiências incríveis para os usuários. Com conhecimento em desenvolvimento fullstack,
                eu adquiri habilidades tanto no desenvolvimento de front-end quanto no back-end, mas minha verdadeira paixão reside no universo do front end.
              </p>
              <p>
                Eu sou movido pela busca contínua de conhecimento e pela vontade de superar desafios. Acredito que a tecnologia tem o poder de transformar o
                mundo, e estou comprometido em desempenhar um papel significativo nessa transformação.
              </p>
              <p>
                Estou super animado com as possibilidades que a programação e a tecnologia oferecem e mal posso esperar para contribuir para a criação de
                soluções inovadoras e impactantes. Seja criando interfaces intuitivas ou colaborando em projetos complexos, minha paixão pela programação me
                impulsiona a buscar constantemente excelência em meu trabalho.
              </p>

              <div className="stats-row">
                <div className="stat">
                  <span className="stat-num">4+</span>
                  <span className="stat-lbl">ANOS DE EXP.</span>
                </div>
                <div className="stat">
                  <span className="stat-num">+30</span>
                  <span className="stat-lbl">PROJETOS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="neon-divider" />

        <section id="stack">
          <div className="reveal">
            <div className="sec-tag">// 02. TECNOLOGIAS</div>
            <h2 className="sec-title">
              Meu <span className="hl">arsenal</span>
            </h2>
            <div className="sec-rule" />
          </div>

          <div className="stack-grid">
            <div className="stack-card reveal">
              <div className="stack-card-title">FRONTEND</div>
              <div className="tag-group">
                <span className="tag">React</span>
                <span className="tag">Next.js</span>
                <span className="tag">TypeScript</span>
                <span className="tag">Vue.js</span>
                <span className="tag">Tailwind</span>
                <span className="tag">Three.js</span>
                <span className="tag">Framer Motion</span>
              </div>
            </div>

            <div className="stack-card reveal">
              <div className="stack-card-title">BACKEND</div>
              <div className="tag-group">
                <span className="tag p">Node.js</span>
                <span className="tag p">Python</span>
                <span className="tag p">FastAPI</span>
                <span className="tag p">Express</span>
                <span className="tag p">NestJS</span>
                <span className="tag p">GraphQL</span>
                <span className="tag p">REST</span>
              </div>
            </div>

            <div className="stack-card reveal">
              <div className="stack-card-title">BANCO DE DADOS</div>
              <div className="tag-group">
                <span className="tag v">PostgreSQL</span>
                <span className="tag v">MongoDB</span>
                <span className="tag v">Redis</span>
                <span className="tag v">Prisma</span>
                <span className="tag v">MySQL</span>
                <span className="tag v">Supabase</span>
              </div>
            </div>

            <div className="stack-card reveal">
              <div className="stack-card-title">DEVOPS E CLOUD</div>
              <div className="tag-group">
                <span className="tag">Docker</span>
                <span className="tag">AWS</span>
                <span className="tag p">Git / GitHub</span>
                <span className="tag p">CI/CD</span>
                <span className="tag v">Nginx</span>
                <span className="tag v">Linux</span>
                <span className="tag">Vercel</span>
              </div>
            </div>
          </div>
        </section>

        <div className="neon-divider" />

        <section id="projects">
          <div className="reveal">
            <div className="sec-tag">// 03. PROJETOS</div>
            <h2 className="sec-title">
              O que eu <span className="hl">construí</span>
            </h2>
            <div className="sec-rule" />
          </div>

          <div className="proj-grid">
            <div className="proj-card featured reveal">
              <div className="proj-head">
                <span className="proj-num">PROJETO / 001</span>
                <div className="flex items-center gap-4">
                  <span className="proj-badge">✦ DESTAQUE</span>
                  <div className="proj-actions">
                    <a href="#" title="GitHub" aria-label="GitHub do projeto destaque">
                      <i className="fab fa-github" />
                    </a>
                    <a href="#" title="Live Demo" aria-label="Demo do projeto destaque">
                      <i className="fas fa-external-link-alt" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="proj-body">
                <h3 className="proj-name">NOME DO PROJETO PRINCIPAL</h3>
                <p className="proj-desc">
                  Uma descrição impactante do seu projeto mais impressionante. Qual problema resolve, qual é a escala, quais desafios técnicos foram
                  superados e que impacto real gerou.
                </p>
                <div className="proj-techs">
                  <span className="proj-tech">React</span>
                  <span className="proj-tech">Node.js</span>
                  <span className="proj-tech">PostgreSQL</span>
                  <span className="proj-tech">Docker</span>
                  <span className="proj-tech">AWS</span>
                </div>
              </div>
            </div>

            <div className="proj-card reveal">
              <div className="proj-head">
                <span className="proj-num">PROJETO / 002</span>
                <div className="proj-actions">
                  <a href="#" title="GitHub" aria-label="GitHub do projeto 2">
                    <i className="fab fa-github" />
                  </a>
                  <a href="#" title="Live Demo" aria-label="Demo do projeto 2">
                    <i className="fas fa-external-link-alt" />
                  </a>
                </div>
              </div>
              <div className="proj-body">
                <h3 className="proj-name">SEGUNDO PROJETO</h3>
                <p className="proj-desc">Descrição focada em resultados reais. Métricas, impacto, desafios e o que você aprendeu.</p>
                <div className="proj-techs">
                  <span className="proj-tech">Next.js</span>
                  <span className="proj-tech">TypeScript</span>
                  <span className="proj-tech">Redis</span>
                </div>
              </div>
            </div>

            <div className="proj-card reveal">
              <div className="proj-head">
                <span className="proj-num">PROJETO / 003</span>
                <div className="proj-actions">
                  <a href="#" title="GitHub" aria-label="GitHub do projeto 3">
                    <i className="fab fa-github" />
                  </a>
                  <a href="#" title="Live Demo" aria-label="Demo do projeto 3">
                    <i className="fas fa-external-link-alt" />
                  </a>
                </div>
              </div>
              <div className="proj-body">
                <h3 className="proj-name">TERCEIRO PROJETO</h3>
                <p className="proj-desc">Destaque a solução técnica criativa, os padrões utilizados e por que você se orgulha dele.</p>
                <div className="proj-techs">
                  <span className="proj-tech">Python</span>
                  <span className="proj-tech">FastAPI</span>
                  <span className="proj-tech">MongoDB</span>
                </div>
              </div>
            </div>

            <div className="proj-card reveal">
              <div className="proj-head">
                <span className="proj-num">PROJETO / 004</span>
                <div className="proj-actions">
                  <a href="#" title="GitHub" aria-label="GitHub do projeto 4">
                    <i className="fab fa-github" />
                  </a>
                </div>
              </div>
              <div className="proj-body">
                <h3 className="proj-name">QUARTO PROJETO</h3>
                <p className="proj-desc">Side project, open source contribution, ou experimento técnico interessante.</p>
                <div className="proj-techs">
                  <span className="proj-tech">Vue.js</span>
                  <span className="proj-tech">GraphQL</span>
                  <span className="proj-tech">NestJS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="neon-divider" />

        <section id="experience">
          <div className="reveal">
            <div className="sec-tag">// 04. EXPERIÊNCIA</div>
            <h2 className="sec-title">
              Minha <span className="hl">jornada</span>
            </h2>
            <div className="sec-rule" />
          </div>

          <div className="timeline">
            <div className="tl-item reveal">
              <div className="tl-period">JAN DE 2024 - O MOMENTO · REMOTO</div>
              <div className="tl-role">DESENVOLVEDOR FULL STACK</div>
              <div className="tl-company">t-Risk - Plataforma de Avaliação de Riscos</div>
              <ul className="tl-list tl-desc">
                <li>Desenvolvimento e manutenção de aplicações web full stack utilizando React, NestJS e AWS.</li>
                <li>Implementação de integrações de ponta a ponta, do backend ao frontend.</li>
                <li>Identificação, análise e correção de bugs em ambientes de produção.</li>
                <li>Evolução e sustentação do site institucional da t-Risk em Symfony (PHP) com Twig.</li>
                <li>Colaboração com a equipe para aprimorar a experiência do usuário e garantir a qualidade do produto.</li>
              </ul>
              <div className="tl-tags">
                <span className="tl-tag">React.js</span>
                <span className="tl-tag">JavaScript</span>
                <span className="tl-tag">NestJS</span>
                <span className="tl-tag">AWS</span>
                <span className="tl-tag">TypeScript</span>
                <span className="tl-tag">Symfony</span>
              </div>
            </div>

            <div className="tl-item reveal">
              <div className="tl-period">ABR DE 2023 - OUT DE 2023 · CAMPINAS, SÃO PAULO, BRASIL</div>
              <div className="tl-role">DESENVOLVEDOR WEB FRONT END</div>
              <div className="tl-company">Performa</div>
              <ul className="tl-list tl-desc">
                <li>Participação no programa de aceleração de carreira.</li>
                <li>Desenvolvimento de aplicações web.</li>
                <li>Atuação com SCRUM e metodologia ágil.</li>
                <li>Resolução e correções de bugs.</li>
                <li>Integrações de lógica e designs responsivos.</li>
              </ul>
              <div className="tl-tags">
                <span className="tl-tag">Angular</span>
                <span className="tl-tag">Next.js</span>
                <span className="tl-tag">SCRUM</span>
                <span className="tl-tag">UI Responsiva</span>
              </div>
            </div>

            <div className="tl-item reveal">
              <div className="tl-period">COMUNIDADE</div>
              <div className="tl-role">OPEN SOURCE E APRENDIZADO CONTÍNUO</div>
              <div className="tl-company">GitHub e estudos constantes</div>
              <p className="tl-desc">
                Participação ativa no ecossistema dev com repositórios públicos, contribuições e estudo de stacks modernas de frontend e backend.
              </p>
              <div className="tl-tags">
                <span className="tl-tag">JavaScript</span>
                <span className="tl-tag">TypeScript</span>
                <span className="tl-tag">Prisma</span>
                <span className="tl-tag">Docker</span>
              </div>
            </div>
          </div>
        </section>

        <div className="neon-divider" />

        <section id="contact">
          <div className="reveal">
            <div className="sec-tag">// 05. CONTATO</div>
            <h2 className="sec-title">
              Vamos <span className="hl">conversar</span>
            </h2>
            <div className="sec-rule" />
          </div>

          <div className="contact-grid">
            <div className="contact-left reveal">
              <h3>Aberto a novas oportunidades</h3>
              <p>
                Seja para um projeto freelance, uma vaga ou só para trocar ideia sobre tecnologia. Minha caixa de entrada está sempre aberta.
              </p>
              <div className="social-list">
                <a href="https://github.com/gabrielfray" className="social-link" target="_blank" rel="noreferrer">
                  <i className="fab fa-github" /> github.com/gabrielfray
                </a>
                <a href="https://linkedin.com/in/gabrielfray" className="social-link" target="_blank" rel="noreferrer">
                  <i className="fab fa-linkedin" /> linkedin.com/in/gabrielfray
                </a>
                <a href="https://instagram.com/gabrielfray_dev" className="social-link" target="_blank" rel="noreferrer">
                  <i className="fab fa-instagram" /> instagram.com/gabrielfray_dev
                </a>
              </div>
            </div>

            <div className="reveal">
              <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="name">NOME</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={contactName}
                    onChange={(event) => setContactName(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">EMAIL</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="seu-melhor-email@domínio.com"
                    value={contactEmail}
                    onChange={(event) => setContactEmail(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">ASSUNTO</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Proposta, parceria, cafezinho virtual..."
                    value={contactSubject}
                    onChange={(event) => setContactSubject(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">MENSAGEM</label>
                  <textarea
                    id="message"
                    placeholder="Sua mensagem aqui..."
                    value={contactMessage}
                    onChange={(event) => setContactMessage(event.target.value)}
                  />
                </div>
                <a href={mailtoHref} className="btn btn-neon-pink text-center">
                  <span>ENVIAR MENSAGEM</span>
                </a>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span className="footer-logo">DEV.FRAY</span>
        <p className="footer-copy">
          FEITO COM <span>♥</span> E MUITO CAFÉ - 2026
        </p>
        <span className="footer-ver">v1.0.0</span>
      </footer>
    </div>
  )
}

export default App
