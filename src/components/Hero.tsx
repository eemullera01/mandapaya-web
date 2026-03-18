import heroImg from "../assets/hero.jpg"

export default function Hero() {
  return (
    <section className="bg-black text-white min-h-screen flex items-center px-6">
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* TEXTO */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold">
            Envía tranquilidad a Venezuela
          </h1>

          <p className="mt-4 text-gray-400">
            Recargas instantáneas desde Colombia
          </p>
        </div>

        {/* IMAGEN */}
        <div>
          <img 
            src={heroImg}
            alt="familia"
            className="w-full rounded-xl"
          />
        </div>

      </div>

    </section>
  )
}