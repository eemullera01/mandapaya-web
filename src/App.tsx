export default function App() {

  const goComprar = () => {
    window.location.pathname = "/comprar"
  }

  return (
    <div>

      {/* HEADER */}
      <header>
        <div className="container">
          <div className="logo">
            <img src="/images/logomandapaya.jpg" alt="Mandapaya Logo" className="logo-img" />
          </div>

          <nav>
            <ul>
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Tarjetas de Regalo</a></li>
              <li><a href="#comercios">Para Comercios</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Iniciar Sesión</a></li>
            </ul>

            <button onClick={goComprar} className="btn-primary">
              Comprar Ahora
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container">

          <div className="hero-content">
            <h1>¡Manda Payá!</h1>

            <p className="subtitle">
              Estés donde estés… tu ayuda puede llegar.
            </p>

            <p className="emotional">
              Tu tarjeta no es solo un código… es presencia.
              <br />
              Es “aquí estoy contigo”. Un apoyo que se siente en casa.
            </p>

            <button onClick={goComprar} className="btn-primary">
              Enviar ahora
            </button>

            <div className="flags-heart">
              <img
                src="https://via.placeholder.com/120x120/FF6B35/FFFFFF?text=CO+♥+VE"
                alt="Colombia y Venezuela"
              />
            </div>
          </div>

          <div className="hero-image">
            <img
              src="/images/mamaespera.png"
              alt="Mamá esperando con amor"
            />
          </div>

        </div>
      </section>

      {/* FORMULARIO */}
      <section className="form-section">
        <div className="container">
          <div className="form-box">

            <h2>Elige tu tarjeta en segundos</h2>

            <div className="categories">
              <button type="button">Comida Rápida</button>
              <button type="button">Aseo</button>
              <button type="button">Regalos Especiales</button>
              <button type="button">Otros</button>
            </div>

            <input type="text" placeholder="Monto (ej. 50.000 COP)" />
            <input type="tel" placeholder="Número en Venezuela" />

            <button onClick={goComprar} className="btn-primary">
              Continuar y Pagar
            </button>

            <p className="note">
              Disponible 24/7 – ¡cualquier hora del día!
            </p>

          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="how-it-works">
        <div className="container">

          <h2>Cómo funciona</h2>

          <div className="steps">
            <div className="step">
              <div className="number">1</div>
              <p>Eliges la tarjeta que deseas enviar</p>
            </div>

            <div className="step">
              <div className="number">2</div>
              <p>Pagas con Nequi, DaviPlata o PSE</p>
            </div>

            <div className="step">
              <div className="number">3</div>
              <p>Agregas el pago móvil en Venezuela</p>
            </div>

            <div className="step">
              <div className="number">4</div>
              <p>Mami recibe en segundos</p>
            </div>
          </div>

          <div className="highlight-box">
            <h3>¡Disponible a cualquier hora del día!</h3>
            <p>Redención instantánea 24/7 en Venezuela.</p>
          </div>

        </div>
      </section>

      {/* COMERCIOS */}
      <section className="comercios" id="comercios">
        <div className="container">
          <h2>Para Comercios en Venezuela</h2>
          <p>
            ¿Tienes un negocio? Únete y recibe pagos reales a través de tarjetas de regalo.
          </p>

          <button className="btn-primary">
            Acceso al Backend
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <p>+40.000 familias conectadas ❤️</p>
          <p>Mandapaya – Apoyo real, con amor</p>
        </div>
      </footer>

    </div>
  )
}