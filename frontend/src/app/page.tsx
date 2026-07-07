"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ============================
   DATA
   ============================ */

const products = [
  {
    name: "Pizza Artesanal",
    description: "Masa madre, mozzarella fresca y albahaca",
    price: "$12.99",
    rating: 4.9,
    reviews: 234,
    time: "25-30 min",
    badge: "Popular",
    image: "/food-pizza.png",
  },
  {
    name: "Sushi Premium",
    description: "Salmón fresco, atún y wasabi artesanal",
    price: "$18.50",
    rating: 4.8,
    reviews: 189,
    time: "30-40 min",
    badge: "Nuevo",
    image: "/food-sushi.png",
  },
  {
    name: "Burger Gourmet",
    description: "Doble carne Angus, cheddar y salsa secreta",
    price: "$14.99",
    rating: 4.9,
    reviews: 412,
    time: "20-25 min",
    badge: "⭐ Top",
    image: "/food-burger.png",
  },
  {
    name: "Tacos Mexicanos",
    description: "Carne al pastor, cilantro y cebolla fresca",
    price: "$9.99",
    rating: 4.7,
    reviews: 156,
    time: "15-20 min",
    badge: null,
    image: "/food-tacos.png",
  },
  {
    name: "Ensalada Mediterránea",
    description: "Feta, aguacate, tomate cherry y balsámico",
    price: "$11.50",
    rating: 4.6,
    reviews: 98,
    time: "10-15 min",
    badge: "Saludable",
    image: "/food-salad.png",
  },
  {
    name: "Pasta Alfredo",
    description: "Fettuccine cremoso con parmesano y hierbas",
    price: "$13.99",
    rating: 4.8,
    reviews: 267,
    time: "25-30 min",
    badge: null,
    image: "/food-pasta.png",
  },
];

const testimonials = [
  {
    text: "FlashBite cambió mi forma de cenar. La comida llega caliente y siempre antes de lo esperado. ¡Increíble servicio!",
    name: "María García",
    role: "Cliente frecuente",
    initials: "MG",
    stars: 5,
  },
  {
    text: "Las promociones son geniales y la app es súper intuitiva. Pedimos todas las semanas para la oficina.",
    name: "Carlos Rodríguez",
    role: "Empresario",
    initials: "CR",
    stars: 5,
  },
  {
    text: "Como repartidor, la plataforma es justa y me permite ganar bien. Las propinas digitales son un gran plus.",
    name: "Andrés López",
    role: "Repartidor verificado",
    initials: "AL",
    stars: 5,
  },
];

/* ============================
   COMPONENT
   ============================ */

export default function Home() {
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* --- Navbar scroll effect --- */
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 50) {
          navRef.current.classList.add(styles.navbarScrolled);
        } else {
          navRef.current.classList.remove(styles.navbarScrolled);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    /* --- GSAP Hero entrance --- */
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
      .from(`.${styles.heroBadge}`, { opacity: 0, y: 30, duration: 0.6 })
      .from(`.${styles.heroTitle}`, { opacity: 0, y: 50, duration: 0.8 }, "-=0.3")
      .from(`.${styles.heroDescription}`, { opacity: 0, y: 30, duration: 0.6 }, "-=0.4")
      .from(`.${styles.heroButtons}`, { opacity: 0, y: 30, duration: 0.6 }, "-=0.3")
      .from(`.${styles.heroStats}`, { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
      .from(`.${styles.heroPhone}`, { opacity: 0, x: 80, rotateY: -30, duration: 1 }, "-=0.8");

    /* --- 3D Tilt on product cards --- */
    const cards = document.querySelectorAll(`.${styles.productCard}`);
    cards.forEach((card) => {
      const el = card as HTMLElement;
      el.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
      });
    });

    /* --- ScrollTrigger Animations --- */

    // How it works steps
    gsap.utils.toArray<HTMLElement>(`.${styles.stepCard}`).forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        opacity: 0,
        y: 60,
        duration: 0.7,
        delay: i * 0.15,
      });
    });

    // Section headers
    gsap.utils.toArray<HTMLElement>(`.${styles.sectionHeader}`).forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        opacity: 0,
        y: 50,
        duration: 0.8,
      });
    });

    // Product cards
    gsap.utils.toArray<HTMLElement>(`.${styles.productCardWrapper}`).forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        opacity: 0,
        y: 50,
        scale: 0.92,
        duration: 0.6,
        delay: i * 0.1,
      });
    });

    // Promo banner
    gsap.from(`.${styles.promoBanner}`, {
      scrollTrigger: { trigger: `.${styles.promoBanner}`, start: "top 80%", toggleActions: "play none none none" },
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
    });

    // Promo cards
    gsap.utils.toArray<HTMLElement>(`.${styles.promoCard}`).forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        opacity: 0,
        x: i % 2 === 0 ? -40 : 40,
        duration: 0.6,
        delay: i * 0.12,
      });
    });

    // About grid
    gsap.from(`.${styles.aboutContent}`, {
      scrollTrigger: { trigger: `.${styles.aboutGrid}`, start: "top 80%", toggleActions: "play none none none" },
      opacity: 0,
      x: -60,
      duration: 0.8,
    });
    gsap.from(`.${styles.aboutValues}`, {
      scrollTrigger: { trigger: `.${styles.aboutGrid}`, start: "top 80%", toggleActions: "play none none none" },
      opacity: 0,
      x: 60,
      duration: 0.8,
      delay: 0.2,
    });

    // Stat cards — counter animation
    gsap.utils.toArray<HTMLElement>(`.${styles.statCard}`).forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: i * 0.1,
      });
    });

    // Animated counters
    const counterEls = document.querySelectorAll("[data-counter]");
    counterEls.forEach((el) => {
      const target = parseInt(el.getAttribute("data-counter") || "0", 10);
      const suffix = el.getAttribute("data-suffix") || "";
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => {
          gsap.to(
            { val: 0 },
            {
              val: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: function () {
                (el as HTMLElement).textContent =
                  Math.round(this.targets()[0].val).toLocaleString() + suffix;
              },
            }
          );
        },
        once: true,
      });
    });

    // Testimonials
    gsap.utils.toArray<HTMLElement>(`.${styles.testimonialCard}`).forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: i * 0.15,
      });
    });

    // CTA section
    gsap.from(`.${styles.ctaTitle}`, {
      scrollTrigger: { trigger: `.${styles.ctaSection}`, start: "top 80%", toggleActions: "play none none none" },
      opacity: 0,
      y: 50,
      duration: 0.8,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav ref={navRef} className={styles.navbar} id="navbar">
        <a href="#" className={styles.logo}>
          <span className={styles.logoIcon}>🚀</span>
          <span>Flash</span>
          <span className={styles.logoAccent}>Bite</span>
        </a>
        <div className={styles.navLinks}>
          <a href="#como-funciona" className={styles.navLink}>Cómo Funciona</a>
          <a href="#productos" className={styles.navLink}>Menú</a>
          <a href="#promociones" className={styles.navLink}>Promociones</a>
          <a href="#nosotros" className={styles.navLink}>Nosotros</a>
          <a href="#descargar" className={styles.navCta}>Descargar App</a>
        </div>
        <button className={styles.mobileMenuBtn} aria-label="Menú">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* ===== HERO ===== */}
      <section ref={heroRef} className={styles.hero} id="hero">
        <div className={styles.heroGrid}>
          <div>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot}></span>
              Delivery en menos de 30 min
            </div>
            <h1 className={styles.heroTitle}>
              Tu comida favorita,{" "}
              <span className={styles.heroTitleAccent}>al instante.</span>
            </h1>
            <p className={styles.heroDescription}>
              Descubre los mejores restaurantes de tu ciudad y recibe tus platillos
              favoritos directamente en tu puerta. Rápido, fresco y con la mejor
              experiencia de delivery.
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.btnPrimary} id="hero-cta-primary">
                🍔 Pedir Ahora
              </button>
              <button className={styles.btnSecondary} id="hero-cta-secondary">
                ▶ Ver cómo funciona
              </button>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <div className={styles.heroStatNumber}>10K+</div>
                <div className={styles.heroStatLabel}>Usuarios Activos</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatNumber}>500+</div>
                <div className={styles.heroStatLabel}>Restaurantes</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatNumber}>4.9</div>
                <div className={styles.heroStatLabel}>Calificación</div>
              </div>
            </div>
          </div>

          <div className={styles.heroPhoneWrapper}>
            <div ref={phoneRef} className={styles.heroPhone}>
              <div className={styles.heroPhoneGlow}></div>
              <Image
                src="/hero-phone.png"
                alt="FlashBite App"
                width={380}
                height={480}
                className={styles.heroPhoneImage}
                priority
              />
              <span className={styles.floatingEmoji}>🍕</span>
              <span className={styles.floatingEmoji}>🍣</span>
              <span className={styles.floatingEmoji}>🌮</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className={`${styles.section} ${styles.howItWorks}`} id="como-funciona">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Simple y Rápido</span>
          <h2 className={styles.sectionTitle}>¿Cómo Funciona?</h2>
          <p className={styles.sectionSubtitle}>
            En solo 3 pasos tendrás tu comida favorita en la puerta de tu casa.
          </p>
        </div>
        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepIcon}>📱</div>
            <h3 className={styles.stepTitle}>Elige tu Restaurante</h3>
            <p className={styles.stepDescription}>
              Explora cientos de restaurantes cerca de ti, filtra por tipo de
              cocina, precio o calificación.
            </p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepIcon}>🛒</div>
            <h3 className={styles.stepTitle}>Arma tu Pedido</h3>
            <p className={styles.stepDescription}>
              Selecciona tus platillos favoritos, personaliza ingredientes y
              agrega al carrito con un tap.
            </p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepIcon}>🚀</div>
            <h3 className={styles.stepTitle}>Recibe en Minutos</h3>
            <p className={styles.stepDescription}>
              Sigue en tiempo real a tu repartidor y recibe tu comida caliente en
              la puerta de tu casa.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className={styles.productsSection} id="productos">
        <div className={styles.productsInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Lo Más Pedido</span>
            <h2 className={styles.sectionTitle}>Menú Destacado</h2>
            <p className={styles.sectionSubtitle}>
              Los platillos más populares de nuestros restaurantes asociados.
            </p>
          </div>
          <div className={styles.productsGrid}>
            {products.map((product, i) => (
              <div key={i} className={styles.productCardWrapper}>
                <div className={styles.productCard}>
                  <div className={styles.productImageWrapper}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={220}
                      className={styles.productImage}
                    />
                    {product.badge && (
                      <span className={styles.productBadge}>{product.badge}</span>
                    )}
                  </div>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productDescription}>
                      {product.description}
                    </p>
                    <div className={styles.productFooter}>
                      <span className={styles.productPrice}>{product.price}</span>
                      <span className={styles.productRating}>
                        <span className={styles.productRatingStar}>★</span>
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className={styles.productMeta}>
                      <span>🕐 {product.time}</span>
                      <span>🚗 Envío gratis</span>
                    </div>
                  </div>
                  <button className={styles.productAddBtn} aria-label="Agregar al carrito">
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROMOTIONS ===== */}
      <section className={`${styles.section} ${styles.promotions}`} id="promociones">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Ofertas Exclusivas</span>
          <h2 className={styles.sectionTitle}>Promociones del Momento</h2>
          <p className={styles.sectionSubtitle}>
            Aprovecha descuentos especiales disponibles por tiempo limitado.
          </p>
        </div>

        <div className={styles.promoBanner}>
          <div className={styles.promoBannerContent}>
            <span className={styles.promoBannerTag}>🔥 Oferta Limitada</span>
            <h3 className={styles.promoBannerTitle}>
              50% OFF en tu primer pedido
            </h3>
            <p className={styles.promoBannerText}>
              Usa el código FLASH50 y disfruta de la mejor comida a mitad de
              precio.
            </p>
            <button className={styles.promoBannerBtn}>
              Usar Código → FLASH50
            </button>
          </div>
          <div className={styles.promoBannerEmoji}>🎉</div>
        </div>

        <div className={styles.promoCards}>
          <div className={styles.promoCard}>
            <div className={styles.promoCardIcon}>🆓</div>
            <h4 className={styles.promoCardTitle}>Envío Gratis</h4>
            <p className={styles.promoCardText}>
              En pedidos mayores a $15. Válido para todos los restaurantes de la
              plataforma.
            </p>
            <span className={styles.promoCardCode}>ENVIOGRATIS</span>
          </div>
          <div className={styles.promoCard}>
            <div className={styles.promoCardIcon}>👥</div>
            <h4 className={styles.promoCardTitle}>Refiere y Gana</h4>
            <p className={styles.promoCardText}>
              Invita a un amigo y ambos reciben $5 de descuento en su próximo
              pedido.
            </p>
            <span className={styles.promoCardCode}>AMIGOS5</span>
          </div>
          <div className={styles.promoCard}>
            <div className={styles.promoCardIcon}>🌙</div>
            <h4 className={styles.promoCardTitle}>Happy Hour Nocturno</h4>
            <p className={styles.promoCardText}>
              De 10PM a 12AM disfruta 30% de descuento en restaurantes
              seleccionados.
            </p>
            <span className={styles.promoCardCode}>NOCHE30</span>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className={`${styles.section} ${styles.about}`} id="nosotros">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Nuestra Historia</span>
          <h2 className={styles.sectionTitle}>Sobre FlashBite</h2>
          <p className={styles.sectionSubtitle}>
            Conectamos personas con la mejor gastronomía de su ciudad.
          </p>
        </div>

        <div className={styles.aboutGrid}>
          <div className={styles.aboutContent}>
            <h3>
              Más que delivery,
              <br />
              una experiencia gastronómica.
            </h3>
            <p>
              Fundada en 2023, FlashBite nació con la misión de revolucionar la
              forma en que las personas disfrutan la comida desde la comodidad de
              su hogar. Trabajamos con los mejores restaurantes locales para
              garantizar frescura, calidad y rapidez en cada entrega.
            </p>
            <p>
              Nuestro equipo de repartidores verificados utiliza tecnología de
              optimización de rutas para asegurar que tu comida llegue siempre
              caliente y en el menor tiempo posible.
            </p>
          </div>
          <div className={styles.aboutValues}>
            <div className={styles.aboutValue}>
              <span className={styles.aboutValueIcon}>⚡</span> Velocidad
            </div>
            <div className={styles.aboutValue}>
              <span className={styles.aboutValueIcon}>✅</span> Calidad
            </div>
            <div className={styles.aboutValue}>
              <span className={styles.aboutValueIcon}>🔒</span> Seguridad
            </div>
            <div className={styles.aboutValue}>
              <span className={styles.aboutValueIcon}>💚</span> Sostenibilidad
            </div>
            <div className={styles.aboutValue}>
              <span className={styles.aboutValueIcon}>🤝</span> Comunidad
            </div>
            <div className={styles.aboutValue}>
              <span className={styles.aboutValueIcon}>🎯</span> Innovación
            </div>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber} data-counter="10000" data-suffix="+">
              0
            </div>
            <div className={styles.statLabel}>Usuarios Activos</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber} data-counter="500" data-suffix="+">
              0
            </div>
            <div className={styles.statLabel}>Restaurantes Aliados</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber} data-counter="50000" data-suffix="+">
              0
            </div>
            <div className={styles.statLabel}>Pedidos Entregados</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber} data-counter="15" data-suffix=" min">
              0
            </div>
            <div className={styles.statLabel}>Tiempo Promedio</div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className={styles.testimonials} id="testimonios">
        <div className={styles.testimonialsInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Opiniones Reales</span>
            <h2 className={styles.sectionTitle}>Lo que dicen nuestros usuarios</h2>
            <p className={styles.sectionSubtitle}>
              Miles de personas confían en FlashBite para sus comidas diarias.
            </p>
          </div>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <div key={i} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>
                  {"★".repeat(t.stars)}
                </div>
                <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>{t.initials}</div>
                  <div>
                    <div className={styles.testimonialName}>{t.name}</div>
                    <div className={styles.testimonialRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.ctaSection} id="descargar">
        <h2 className={styles.ctaTitle}>
          ¿Listo para pedir?
        </h2>
        <p className={styles.ctaText}>
          Descarga FlashBite y recibe tu primera entrega con 50% de descuento.
        </p>
        <div className={styles.ctaButtons}>
          <button className={styles.btnPrimary}>📱 Descargar para iOS</button>
          <button className={styles.btnPrimary}>🤖 Descargar para Android</button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <a href="#" className={styles.logo}>
                <span className={styles.logoIcon}>🚀</span>
                <span>Flash</span>
                <span className={styles.logoAccent}>Bite</span>
              </a>
              <p>
                La plataforma de delivery más rápida y confiable. Conectamos a los
                mejores restaurantes con personas hambrientas de buena comida.
              </p>
              <div className={styles.footerSocial}>
                <a href="#" className={styles.footerSocialLink} aria-label="Facebook">
                  📘
                </a>
                <a href="#" className={styles.footerSocialLink} aria-label="Instagram">
                  📷
                </a>
                <a href="#" className={styles.footerSocialLink} aria-label="Twitter">
                  🐦
                </a>
                <a href="#" className={styles.footerSocialLink} aria-label="TikTok">
                  🎵
                </a>
              </div>
            </div>

            <div className={styles.footerColumn}>
              <h4>Empresa</h4>
              <a href="#">Sobre Nosotros</a>
              <a href="#">Carreras</a>
              <a href="#">Blog</a>
              <a href="#">Prensa</a>
            </div>

            <div className={styles.footerColumn}>
              <h4>Soporte</h4>
              <a href="#">Centro de Ayuda</a>
              <a href="#">Contacto</a>
              <a href="#">FAQ</a>
              <a href="#">Estado del Servicio</a>
            </div>

            <div className={styles.footerColumn}>
              <h4>Legal</h4>
              <a href="#">Términos de Servicio</a>
              <a href="#">Política de Privacidad</a>
              <a href="#">Cookies</a>
              <a href="#">Licencias</a>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <span className={styles.footerCopyright}>
              © 2026 FlashBite. Todos los derechos reservados.
            </span>
            <div className={styles.footerLegal}>
              <a href="#">Privacidad</a>
              <a href="#">Términos</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
