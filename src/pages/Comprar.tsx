import { useEffect, useState } from "react"

export default function Comprar() {

  const userid = "1"

  const [nombreDestino, setNombreDestino] = useState("")
  const [telefonoDestino, setTelefonoDestino] = useState("")
  const [cedulaDestino, setCedulaDestino] = useState("")
  const [banco, setBanco] = useState("")

  const [bancos, setBancos] = useState<any[]>([])

  const [productos, setProductos] = useState<any[]>([])
  const [productoSeleccionado, setProductoSeleccionado] = useState("")

  const [step, setStep] = useState(1)
  const [resultado, setResultado] = useState<any>(null)

  useEffect(() => {
    fetch("https://mandapaya.app/sumerce/api/bank.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ t: "1" })
    })
      .then(res => res.json())
      .then(data => {
        if (data.banks) setBancos(data.banks)
      })
  }, [])

  useEffect(() => {
    setProductos([
      { id: "5000", nombre: "Bs 5.000" },
      { id: "10000", nombre: "Bs 10.000" },
      { id: "20000", nombre: "Bs 20.000" },
      { id: "50000", nombre: "Bs 50.000" }
    ])
  }, [])

  const handleNext = () => {
    if (!nombreDestino || !telefonoDestino || !cedulaDestino || !banco) {
      alert("Completa los datos")
      return
    }
    setStep(2)
  }

  const handleSubmit = async () => {
    try {
      const contactoRes = await fetch(
        "https://mandapaya.app/sumerce/api/contact.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            t: 1,
            alias: nombreDestino,
            name: nombreDestino,
            phone: telefonoDestino,
            idnumber: cedulaDestino,
            bankid: banco,
            userid
          })
        }
      )

      const contactoData = await contactoRes.json()
      const beneficiaryId = contactoData.contactid || contactoData.id

      if (!beneficiaryId) {
        alert("Error creando contacto")
        return
      }

      const trxRes = await fetch(
        "https://mandapaya.app/sumerce/api/trx.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            t: 10,
            userid,
            amount: productoSeleccionado,
            beneficiaryId,
            type: "A",
            source: "web"
          })
        }
      )

      const trxData = await trxRes.json()

      setResultado(trxData)
      setStep(3)

    } catch (error) {
      console.error(error)
      alert("Error en la operación")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">

        {/* PASO 1 */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Enviar ayuda
            </h1>

            <input
              placeholder="Nombre"
              value={nombreDestino}
              onChange={(e) => setNombreDestino(e.target.value)}
              className="w-full mb-3 p-3 border rounded-xl"
            />

            <input
              placeholder="Teléfono"
              value={telefonoDestino}
              onChange={(e) => setTelefonoDestino(e.target.value)}
              className="w-full mb-3 p-3 border rounded-xl"
            />

            <input
              placeholder="Cédula"
              value={cedulaDestino}
              onChange={(e) => setCedulaDestino(e.target.value)}
              className="w-full mb-3 p-3 border rounded-xl"
            />

            <select
              value={banco}
              onChange={(e) => setBanco(e.target.value)}
              className="w-full mb-3 p-3 border rounded-xl"
            >
              <option value="">Selecciona banco</option>
              {bancos.map((b:any) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleNext}
              className="w-full bg-blue-600 text-white py-3 rounded-xl"
            >
              Continuar
            </button>
          </div>
        )}

        {/* PASO 2 */}
        {step === 2 && (
          <div>
            <h1 className="text-xl font-bold mb-4">
              Selecciona monto
            </h1>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {productos.map((p:any) => (
                <button
                  key={p.id}
                  onClick={() => setProductoSeleccionado(p.id)}
                  className={`p-4 rounded-xl border text-sm font-semibold 
                    ${productoSeleccionado === p.id 
                      ? "bg-blue-600 text-white" 
                      : "bg-white"
                    }`}
                >
                  {p.nombre}
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-xl"
            >
              Enviar
            </button>
          </div>
        )}

        {/* PASO 3 */}
        {step === 3 && (
          <div>
            <h1 className="text-green-500 text-xl font-bold mb-4">
              Operación enviada
            </h1>

            <pre className="text-xs bg-gray-100 p-4 rounded mb-4">
              {JSON.stringify(resultado, null, 2)}
            </pre>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white py-3 rounded-xl"
            >
              Nueva operación
            </button>
          </div>
        )}

      </div>
    </div>
  )
}