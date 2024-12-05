import React from "react"; 
import "../styles/mypage1.css"; 
import Img1 from "../imgs/img2home.jpg";
import Img2 from "../imgs/img3.jpg";
import Img3 from "../imgs/img5.jpg";
import Img4 from "../imgs/medicHome.jpg";
import Img5 from "../imgs/img6.png";

const Home = () => {
  return (
    <div>
      <div className="conteiner-img">
        <img src={Img1} alt="Doctores"  className="full-width-img"/>
        <div className="text-img">Los mejores servicios con nosotros</div>
      </div>

      <div className="fist-block">

        <section id="about" style={{ padding: '50px', background: '#f0f0f0' }}>
            <h1>Sobre Nosotros</h1>
            <p className="letter">En Clinic, estamos comprometidos con brindar atención médica de calidad, accesible y personalizada para toda la familia. Nuestro consultorio está integrado por un equipo de profesionales altamente capacitados que trabajan con pasión y dedicación para mejorar la salud y el bienestar de nuestra comunidad.

            Con tecnología avanzada y un enfoque humano, ofrecemos diagnósticos precisos, tratamientos efectivos y un ambiente cálido donde cada paciente es tratado con respeto, empatía y confidencialidad.

            Nuestra misión es ayudarte a alcanzar una mejor calidad de vida, ofreciendo servicios médicos integrales que se adapten a tus necesidades. Ya sea un chequeo rutinario, manejo de enfermedades crónicas o atención médica especializada, estamos aquí para acompañarte en cada paso de tu camino hacia la salud.

            Porque para nosotros, tu bienestar es nuestra prioridad.</p>
        </section>

        <div className="about-img">    
          <img src={Img2} alt="medico" width={400} height={200} />
          <img src={Img3} alt="medico" width={400} height={300} />
        </div>
      

      </div>


    <div className="second-block">
    <section id="services" style={{ padding: '50px', background: '#ddd' }}>
        <h1>Servicios</h1>
        <p className="letter">En Clinic, estamos comprometidos con facilitar el acceso a servicios médicos de calidad desde la comodidad de tu hogar. Por ello, ofrecemos una amplia gama de servicios diseñados para satisfacer tus necesidades de salud de manera eficiente y accesible:

Agenda tu cita en línea: Olvídate de las largas esperas. Con nuestra plataforma, puedes reservar una consulta con el médico de tu elección en tan solo unos clics, seleccionando el horario que mejor se adapte a ti.
Especialidades médicas: Contamos con médicos especializados en diversas áreas como medicina general, pediatría, ginecología, dermatología y más.
Consultas personalizadas: Nuestros médicos están disponibles para ofrecerte atención personalizada y un diagnóstico adecuado según tus síntomas y necesidades.
Historial médico digital: Accede a tu historial médico desde nuestra plataforma para llevar un mejor control de tus consultas y tratamientos.</p>
      </section>

      <div className="about-img">    
          <img src={Img4} alt="medico" width={400} height={200} />
          <img src={Img5} alt="medico" width={400} height={300} />
        </div>
    </div>

    

     
    </div>
  );
};

export default Home;
