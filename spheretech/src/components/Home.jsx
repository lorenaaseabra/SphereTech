import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../App.css"; // Certifique-se de que o estilo seja aplicado corretamente
import logo from "../assets/logo.png"; // Ajuste o caminho conforme necessário
import video from "../assets/spheretech.mp4"; // Ajuste o caminho conforme necessário
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

const Home = () => (
  <>
    <Navbar loggedIn={false} />
    <header className="text-center my-5">
      <img src={logo} alt="Logo da Empresa" className="mb-3" />
      <h1>Bem-vindo à SphereTech</h1>
      <p>Soluções de TI inovadoras para o seu negócio</p>
    </header>

    <main className="container">
      {/* Seção Sobre Nós */}
      <section className="layout-video">
        <div>
          <h2>Sobre Nós</h2>
          <p>
            Somos uma empresa <strong>líder no mercado de tecnologia,</strong>{" "}
            dedicada a fornecer soluções de TI inovadoras e personalizadas que
            impulsionam o crescimento e o sucesso dos nossos clientes. Nossa
            equipe é composta por especialistas altamente qualificados,
            comprometidos em entender as necessidades específicas de cada
            cliente e desenvolver estratégias que maximizem a eficiência,
            segurança e competitividade no ambiente digital.
          </p>
          <p>
            Oferecemos uma ampla gama de serviços, desde{" "}
            <strong>
              desenvolvimento de software sob medida, consultoria estratégica em
              TI, suporte técnico avançado até soluções de segurança da
              informação.
            </strong>{" "}
            Nosso compromisso com a qualidade e a inovação nos permite atender
            empresas de todos os portes, ajudando-as a enfrentar desafios
            tecnológicos complexos e a transformar suas operações para um
            futuro digital.
          </p>
          <p>
            <strong>
              Com foco na experiência do cliente e resultados de alto impacto,
            </strong>{" "}
            trabalhamos lado a lado com nossos parceiros para criar valor
            sustentável e manter uma vantagem competitiva em um mercado em
            constante evolução.
          </p>
        </div>
        <div className="video-container">
          <video autoplay loop muted playsInline>
            <source src={video} type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>
        </div>
      </section>

      {/* Carrossel de Fotos */}
      <section className="my-5">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={img1} className="d-block w-100" alt="Foto 1" />
              <div className="carousel-caption d-none d-md-block">
                <h4>Soluções acessíveis</h4>
                <p>
                  Soluções de TI para todas as pessoas, em qualquer contexto de
                  uso.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={img2} className="d-block w-100" alt="Foto 2" />
              <div className="carousel-caption d-none d-md-block">
                <h4>Múltiplos dispositivos</h4>
                <p>
                  Trabalhamos com a maior gama de dispositivos possível para o
                  seu negócio.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={img3} className="d-block w-100" alt="Foto 3" />
              <div className="carousel-caption d-none d-md-block">
                <h4>Tecnologia de ponta</h4>
                <p>
                  Uso das tecnologias mais avançadas disponíveis no mercado.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={img4} className="d-block w-100" alt="Foto 4" />
              <div className="carousel-caption d-none d-md-block">
                <h4>Versatilidade em mãos</h4>
                <p>Soluções adaptadas à realidade da sua empresa.</p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* Fundadores */}
      <section className="my-5">
        <h2>Fundadores</h2>
        <section className="founder-cards">
          <div className="founder-card">
            <img src="./assets/founder1.png" alt="Fundador 1" />
            <h4>João Santos</h4>
            <h5>CTO</h5>
            <p>
              Especialista em arquitetura de sistemas com mais de 15 anos de
              experiência na implementação de soluções complexas.
            </p>
          </div>
          <div className="founder-card">
            <img src="/assets/founder1.png" alt="Fundador 2" />
            <h4>Mário Silva</h4>
            <h5>CEO</h5>
            <p>
              20 anos de experiência na área de TI, especialista em
              desenvolvimento estratégico e liderança de equipes de inovação.
            </p>
          </div>
          <div className="founder-card">
            <img src="/assets/founder3.png" alt="Fundador 3" />
            <h4>Fernanda Oliveira</h4>
            <h5>COO</h5>
            <p>
              Foco em gestão de operações e processos, com ampla experiência em
              eficiência operacional e transformação digital.
            </p>
          </div>
        </section>
      </section>
    </main>

    <Footer />
  </>
);

export default Home;
