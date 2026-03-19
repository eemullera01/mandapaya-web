import { useEffect, useState } from "react"

export default function Comprar() {

  // 🔥 USER FIJO PARA PRUEBAS
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

  // 🔥 CARGAR BANCOS
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

  // 🔥 PRODUCTOS (NO TOCAR)
  useEffect(() => {
    setProductos([
      { id: "5000", nombre: "Gift Card Bs 5.000" },
      { id: "10000", nombre: "Gift Card Bs 10.000" },
      { id: "20000", nombre: "Gift Card Bs 20.000" },
      { id: "50000", nombre: "Gift Card Bs 50.000" }
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
      // 🔥 CREAR CONTACTO
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

      const beneficiaryId =
        contactoData.contactid || contactoData.id

      if (!beneficiaryId) {
        alert("Error creando contacto")
        return
      }

      // 🔥 TRANSACCIÓN
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md">

        {/* PASO 1 */}
        {step === 1 && (
          <>
            <h2 className="mb-4">Datos destino</h2>

            <input placeholder="Nombre" onChange={e => setNombreDestino(e.target.value)} className="w-full p-2 mb-2 bg-black border"/>
            <input placeholder="Teléfono" onChange={e => setTelefonoDestino(e.target.value)} className="w-full p-2 mb-2 bg-black border"/>
            <input placeholder="Cédula" onChange={e => setCedulaDestino(e.target.value)} className="w-full p-2 mb-2 bg-black border"/>

            <select onChange={e => setBanco(e.target.value)} className="w-full p-2 mb-4 bg-black border">
              <option>Banco</option>
              {bancos.map((b:any)=>(
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>

            <button onClick={handleNext} className="w-full bg-yellow-400 text-black py-2">
              Continuar
            </button>
          </>
        )}

        {/* PASO 2 */}
        {step === 2 && (
          <>
            <h2 className="mb-4">Selecciona monto</h2>

            <select onChange={e => setProductoSeleccionado(e.target.value)} className="w-full p-3 mb-6 bg-black border">
              <option>Seleccionar</option>
              {productos.map((p:any)=>(
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>

            <button onClick={handleSubmit} className="w-full bg-yellow-400 py-3 text-black">
              Enviar
            </button>
          </>
        )}

        {/* RESULTADO */}
        {step === 3 && (
          <>
            <h2 className="text-green-400 mb-4">Operación enviada</h2>

            <pre className="text-xs bg-black p-4 rounded">
              {JSON.stringify(resultado, null, 2)}
            </pre>

            <button onClick={() => window.location.reload()} className="w-full bg-blue-500 mt-4 py-3">
              Nueva operación
            </button>
          </>
        )}

      </div>
    </div>
  )
}