import { useState } from "react";

interface Errors {
  nombre: string[],
  empresa: string[],
  direccion: string[],
  redes_sociales: string[],
  telefono: string[],
  observaciones: string[],
  vendedor: string[]
}

function App() {
  const [errores, setErrores] = useState<Errors>({
    nombre: [],
    empresa: [],
    direccion: [],
    redes_sociales: [],
    telefono: [],
    observaciones: [],
    vendedor: []
  })

  const vendedores = [
    "",
    "Lucas Paulon",
    "Ivan Anic",
    "Federico Fontana",
    "Tomas Alanis",
    "Tomas Cian",
    "Tomas Carrasco",
    "Amaro Cattarozzi",
    "Celina Muchiut",
    "Macarena Bonavena",
    "Patricio Cian",
    "Cande",
  ]

  const onSubmit = ({ e }: { e: React.FormEvent<HTMLFormElement> }) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form)

    const nombre = formData.get("nombre") as string
    const empresa = formData.get("empresa") as string
    const direccion = formData.get("direccion") as string
    const redes_sociales = formData.get("redes_sociales") as string
    const telefono = formData.get("telefono")?.toString() as string
    const observaciones = formData.get("observaciones") as string
    const vendedor = formData.get("vendedor") as string

    const valores = {
      nombre,
      empresa,
      direccion,
      redes_sociales,
      telefono,
      observaciones,
      vendedor
    }

    const errores = validate(valores)
    setErrores(errores)

    let errores_cap = Object.values(errores).flat()

    if (errores_cap.length > 0) {
      return;
    }

    //subir a la base de datos;

    form.reset();
  }

  const validate = ({
    nombre,
    empresa,
    direccion,
    redes_sociales,
    telefono,
    observaciones,
    vendedor
  }: {
    nombre: string,
    empresa: string,
    direccion: string,
    redes_sociales: string,
    telefono: string,
    observaciones: string,
    vendedor: string
  }) => {
    let aux: Errors = {
      nombre: [],
      empresa: [],
      direccion: [],
      redes_sociales: [],
      telefono: [],
      observaciones: [],
      vendedor: []
    }

    if (!vendedor) {
      aux.vendedor.push("El vendedor no es valido.")
    } else if (typeof vendedor !== "string") {
      aux.vendedor.push("El vendedor tiene que ser una cadena de caracteres.")
    }

    if (typeof observaciones !== "string") {
      aux.observaciones.push("Las observaciones tienen que ser una cadena de caracteres.")
    }

    if (typeof telefono !== "string") {
      aux.telefono.push("El telefono tiene que ser una cadena de caracteres.")
    } else if (telefono.length < 6 && telefono.length !== 0) {
      aux.telefono.push("El telefono tiene que tener como minimo 3 caracteres.")
    }

    if (typeof redes_sociales !== "string") {
      aux.redes_sociales.push("Las redes sociales tiene que ser una cadena de caracteres.")
    }

    if (typeof direccion !== "string") {
      aux.direccion.push("La direccion tiene que ser una cadena de caracteres.")
    }

    if (!nombre) {
      aux.nombre.push("El nombre no es valido.")
    } else if (typeof nombre !== "string") {
      aux.nombre.push("El nombre tiene que ser una cadena de caracteres.")
    } else if (nombre.length <= 3) {
      aux.nombre.push("El nombre tiene que tener como minimo 3 caracteres.")
    }

    if (!empresa) {
      aux.empresa.push("La empresa no es valido.")
    } else if (typeof empresa !== "string") {
      aux.empresa.push("La empresa tiene que ser una cadena de caracteres.")
    } else if (empresa.length <= 3) {
      aux.empresa.push("La empresa tiene que tener como minimo 3 caracteres.")
    }

    return aux
  }

  return (
    <div className="w-screen flex justify-center items-center py-10 px-5">
      <form className="w-full p-1 grid grid-cols-1 gap-2" onSubmit={(e) => onSubmit({ e })}>
        <div className="w-full flex flex-col justify-start items-center">
          <label className="w-full" htmlFor="nombre">
            Nombre
          </label>
          <input type="text" name="nombre" id="nombre" className="px-3 py-2 border border-black w-full rounded-md" placeholder="nombre" />
          {errores.nombre.length > 0 && <p className="w-full text-start text-red-500">
            {errores.nombre[0]}
          </p>}
        </div>

        <div className="w-full flex flex-col justify-start items-center">
          <label className="w-full" htmlFor="empresa">
            Empresa
          </label>
          <input type="text" name="empresa" id="empresa" className="px-3 py-2 border border-black w-full rounded-md" placeholder="empresa" />
          {errores.empresa.length > 0 && <p className="w-full text-start text-red-500">
            {errores.empresa[0]}
          </p>}
        </div>

        <div className="w-full flex flex-col justify-start items-center">
          <label className="w-full" htmlFor="direccion">
            Direccion <span className="text-gray-500">(opcional)</span>
          </label>
          <input type="text" name="direccion" id="direccion" className="px-3 py-2 border border-black w-full rounded-md" placeholder="direccion" />
          {errores.direccion.length > 0 && <p className="w-full text-start text-red-500">
            {errores.direccion[0]}
          </p>}
        </div>

        <div className="w-full flex flex-col justify-start items-center">
          <label className="w-full" htmlFor="redes_sociales">
            Redes Sociales <span className="text-gray-500">(opcional)</span>
          </label>
          <input type="text" name="redes_sociales" id="redes_sociales" className="px-3 py-2 border border-black w-full rounded-md" placeholder="redes_sociales" />
          {errores.redes_sociales.length > 0 && <p className="w-full text-start text-red-500">
            {errores.redes_sociales[0]}
          </p>}
        </div>

        <div className="w-full flex flex-col justify-start items-center">
          <label className="w-full" htmlFor="telefono">
            Telefono <span className="text-gray-500">(opcional)</span>
          </label>
          <input type="text" name="telefono" id="telefono" className="px-3 py-2 border border-black w-full rounded-md" placeholder="telefono" />
          {errores.telefono.length > 0 && <p className="w-full text-start text-red-500">
            {errores.telefono[0]}
          </p>}
        </div>

        <div className="w-full flex flex-col justify-start items-center">
          <label className="w-full" htmlFor="observaciones">
            Observaciones <span className="text-gray-500">(opcional)</span>
          </label>
          <textarea name="observaciones" id="observaciones" className="px-3 py-2 border border-black w-full rounded-md min-h-[100px] max-h-[100px]" placeholder="observaciones" />
          {errores.observaciones.length > 0 && <p className="w-full text-start text-red-500">
            {errores.observaciones[0]}
          </p>}
        </div>

        <div className="w-full flex flex-col justify-start items-center">
          <label className="w-full" htmlFor="vendedor">
            Vendedor
          </label>
          <select id="vendedor" name="vendedor" className="px-3 py-2 border border-black w-full rounded-md">

            {vendedores.map((n, i) => {
              return (
                <option value={n} key={i}>
                  {n}
                </option>
              )
            })}

          </select>
          {errores.vendedor.length > 0 && <p className="w-full text-start text-red-500">
            {errores.vendedor[0]}
          </p>}
        </div>

        <div className="w-full flex flex-col justify-start items-center mt-5">
          <button type="submit" className="px-3 py-2 border border-black text-white w-full rounded-md bg-blue-500">
            ENVIAR
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
