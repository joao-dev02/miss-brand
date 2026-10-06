"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Plus, Minus, MapPin } from "lucide-react";

import { ChevronTripleDownIcon } from "@/components/ui/chevron-triple-down-icon";
import { FlowButton } from "@/components/ui/flow-button";
import { DiaText } from "@/components/ui/text-dia";
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";

const styleWords = ["estilo", "conforto", "versatilidade"];
const edits = [
  {
    name: "Leveza que acompanha",
    type: "O DIA A DIA",
    color: "#e9ddd6",
    image: "/look-casual-fast-720.webp",
    imageSmall: "/look-casual-fast-400.webp",
    alt: "Modelo com blusa vinho e jeans",
    text: "Texturas leves, combinações descomplicadas e espaço para ser você.",
  },
  {
    name: "Sol, cor e liberdade",
    type: "MODA PRAIA",
    color: "#e5cfce",
    image: "/look-praia-fast-720.webp",
    imageSmall: "/look-praia-fast-400.webp",
    alt: "Conjuntos de biquíni com estampas coloridas",
    text: "Cores e estampas para acompanhar seus momentos ao sol.",
  },
  {
    name: "Movimento com estilo",
    type: "MODA FITNESS",
    color: "#ddd8c9",
    image: "/look-fitness-fast-720.webp",
    imageSmall: "/look-fitness-fast-400.webp",
    alt: "Modelo com conjunto fitness preto",
    text: "Inspiração para se movimentar com conforto e personalidade.",
  },
];
export default function Home() {
  const [faq, setFaq] = useState<number | null>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => {
      element.classList.add("reveal-pending");
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("reveal-pending"));
    };
  }, []);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => {
      const video = videoRef.current;
      if (!video) return;
      if (preference.matches) video.pause();
      else
        void video.play().catch(() => {
          /* Keep the poster when autoplay is unavailable. */
        });
    };
    updatePlayback();
    preference.addEventListener("change", updatePlayback);
    return () => preference.removeEventListener("change", updatePlayback);
  }, []);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <main id="conteudo" tabIndex={-1}>
        <AnimatedNavFramer />
        <div data-section-anchor="inicio" aria-hidden="true" />
        <section id="inicio" className="hero hero-with-video">
          <video
            ref={videoRef}
            className="hero-video"
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-poster-v3.jpg"
            aria-hidden="true"
          >
            <source src="/hero-miss-brand-v3.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" aria-hidden="true" />
          <div className="hero-copy">
            <h1>
              Seu estilo.
              <br />
              Sua melhor
              <br />
              <em>versão.</em>
            </h1>
            <p>
              Looks que unem estilo, conforto e versatilidade.
              <br />
              Encontre na Miss Brand o que combina com você.
            </p>
            <FlowButton
              className="hero-flow"
              tone="hero"
              href="#unidades"
              text="Fale conosco"
            />
            <div className="hero-bottom">
              <a href="#inspiracoes" aria-label="Explorar a página">
                <ChevronTripleDownIcon size={24} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-shade" />
          </div>
        </section>
        <div data-section-anchor="unidades" aria-hidden="true" />
        <section
          id="unidades"
          className="branches section"
          aria-labelledby="branches-title"
        >
          <div className="section-heading reveal">
            <div>
              <span className="eyebrow">01 / NOSSAS LOJAS</span>
              <h2 id="branches-title">
                Três endereços.
                <br />
                <em>A mesma essência.</em>
              </h2>
            </div>
            <p>Escolha sua unidade e fale com a equipe pelo WhatsApp.</p>
          </div>
          <div className="branch-grid">
            {[
              {
                label: "MATRIZ",
                name: "São Joaquim",
                phone: "5586998402822",
                address: "Rua Rui Barbosa, 4260, São Joaquim, Teresina, PI",
              },
              {
                label: "FILIAL 1",
                name: "Parque Piauí",
                phone: "5586999692621",
                address:
                  "Avenida Marechal Juarez Távora, Quadra 64, Casa 06, Parque Piauí, Teresina, PI",
              },
              {
                label: "FILIAL 2",
                name: "Dirceu",
                phone: "5586998019293",
                address:
                  "Avenida Principal do Dirceu, Quadra 37, Casa 13, Teresina, PI",
              },
            ].map((branch, i) => (
              <article key={branch.name} className="branch-card reveal">
                {branch.name === "Dirceu" && (
                  <Image
                    className="branch-photo"
                    src="/loja-dirceu.webp"
                    alt="Fachada da Miss Brand Dirceu"
                    width={288}
                    height={357}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                {branch.name === "São Joaquim" && (
                  <Image
                    className="branch-photo branch-photo-wide"
                    src="/loja-sao-joaquim.webp"
                    alt="Fachada da Miss Brand São Joaquim"
                    width={900}
                    height={633}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                {branch.name === "Parque Piauí" && (
                  <Image
                    className="branch-photo"
                    src="/loja-parque-piaui.webp"
                    alt="Fachada da Miss Brand Parque Piauí"
                    width={720}
                    height={1113}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="branch-top">
                  <span className="eyebrow">{branch.label}</span>
                  <a
                    className="branch-location"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir localização da Miss Brand ${branch.name} no Google Maps`}
                    title={`Ver localização: ${branch.address}`}
                  >
                    <MapPin size={22} aria-hidden="true" />
                  </a>
                </div>
                <span className="branch-index" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3>{branch.name}</h3>
                <p>
                  Converse com a equipe desta unidade e consulte peças,
                  disponibilidade e informações para sua visita.
                </p>
                <FlowButton
                  className="branch-flow"
                  href={`https://api.whatsapp.com/send/?phone=${branch.phone}&text&type=phone_number&app_absent=0`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Falar pelo WhatsApp com a unidade ${branch.name}`}
                  text="Falar com esta loja"
                />
              </article>
            ))}
          </div>
        </section>
        <div data-section-anchor="essencia" aria-hidden="true" />
        <section id="essencia" className="essence">
          <div className="essence-copy reveal">
            <span className="eyebrow">02 / MISS BRAND</span>
            <h2 className="essence-dia-heading">
              Onde você encontra
              <br />
              <DiaText words={styleWords} duration={2000} />
              <br />
              em cada detalhe.
            </h2>
            <p>
              O melhor look é aquele em que você se reconhece. A Miss Brand é um
              convite para explorar a moda com liberdade, escolher com leveza e
              deixar a sua personalidade aparecer.
            </p>
            <p>
              Do detalhe que transforma ao look que acompanha: a inspiração
              começa em você.
            </p>
            <a className="text-link" href="#visite">
              Conheça a Miss Brand de perto <ArrowUpRight size={20} />
            </a>
          </div>
        </section>
        <div data-section-anchor="inspiracoes" aria-hidden="true" />
        <section id="inspiracoes" className="inspirations section">
          <div className="section-heading reveal">
            <div>
              <span className="eyebrow">03 / INSPIRAÇÕES</span>
              <h2>
                Para cada momento,
                <br />
                <em>um pouco de você.</em>
              </h2>
            </div>
            <p>
              Explore possibilidades para o seu estilo.
              <br />
              Inspire-se aqui. Descubra na loja.
            </p>
          </div>
          <div className="edit-grid">
            {edits.map((edit, i) => (
              <article className="edit" key={edit.name}>
                <a
                  href="#visite"
                  className="edit-image"
                  style={{ background: edit.color }}
                >
                  <span className="edit-number">0{i + 1}</span>
                  <Image
                    className="edit-photo"
                    src={edit.image}

                    sizes="(max-width: 640px) 86vw, (max-width: 900px) 28vw, 30vw"
                    alt={edit.alt}
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={860}
                  />
                  <span className="edit-arrow">
                    <ArrowUpRight size={22} />
                  </span>
                </a>
                <span className="eyebrow">{edit.type}</span>
                <h3>{edit.name}</h3>
                <p>{edit.text}</p>
              </article>
            ))}
          </div>
          <p className="illustration-note">
            Consulte as peças e a disponibilidade diretamente com a unidade de
            sua preferência.
          </p>
        </section>
        <div data-section-anchor="visite" aria-hidden="true" />
        <section id="visite" className="visit section">
          <div className="visit-copy reveal">
            <span className="eyebrow">04 / VEM CONHECER</span>
            <h2>
              Da inspiração
              <br />
              <em>para o seu look.</em>
            </h2>
            <p>
              Entre, explore e encontre novas possibilidades.
              <br />
              Esperamos você na Miss Brand.
            </p>
            <FlowButton
              className="map-flow"
              href="https://api.whatsapp.com/send/?phone=5586998402822&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              text="Solicitar entrega pelo WhatsApp"
            />
          </div>
          <div className="faq reveal">
            {[
              [
                "Como funcionam as trocas?",
                "O prazo máximo para trocas é de 7 dias. Não fazemos estornos de pagamento. Não trocamos peças promocionais, moda praia, bodys, peças brancas ou com brilho. Agradecemos a compreensão.",
              ],
              [
                "Como consultar a disponibilidade dos looks?",
                "As fotos apresentam inspirações de looks. Fale com a unidade de sua preferência pelo WhatsApp para consultar peças, tamanhos e disponibilidade atual.",
              ],
              [
                "Onde encontro a Miss Brand?",
                "Estamos em São Joaquim, Parque Piauí e Dirceu. Fale com a unidade escolhida pelo WhatsApp para confirmar o endereço e planejar sua visita.",
              ],
            ].map(([q, a], i) => (
              <div className="faq-item" key={q}>
                <button
                  onClick={() => setFaq(faq === i ? null : i)}
                  id={`faq-question-${i}`}
                  aria-expanded={faq === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  {q}
                  {faq === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  hidden={faq !== i}
                >
                  <p>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <footer>
          <a href="#inicio" className="brand">
            <Image
              src="/miss-brand-logo-fast.webp"
              alt="Miss Brand"
              width={134}
              height={71}
            />
          </a>
          <span>Seu estilo tem lugar aqui.</span>
          <a
            className="footer-instagram"
            href="https://www.instagram.com/missbrand_the/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Miss Brand: @missbrand_the"
          >
            <span>Instagram · @missbrand_the</span>
          </a>
          <a href="#inicio">Voltar ao topo ↑</a>
          <small>© {new Date().getFullYear()} Miss Brand</small>
        </footer>
      </main>
    </>
  );
}
