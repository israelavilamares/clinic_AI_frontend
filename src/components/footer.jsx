import React from "react";
import "../styles/footer.css"; // Archivo CSS para el diseño

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Información básica */}
        <div className="footer-info">
          <h4>Clinic</h4>
          <p>Proveemos servicios médicos de calidad para cuidar tu salud.</p>
        </div>

        {/* Enlaces útiles */}
        <div className="footer-links">
          <h4>Enlaces útiles</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Our Services</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="footer-social">
          <h4>Síguenos</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Clinic. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
