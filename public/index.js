document.addEventListener("DOMContentLoaded", function () {
  const errores = {
    nombre: [],
    empresa: [],
    direccion: [],
    redes_sociales: [],
    telefono: [],
    observaciones: [],
    vendedor: [],
  };

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
  ];

  function onSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const nombre = formData.get("nombre");
    const empresa = formData.get("empresa");
    const direccion = formData.get("direccion");
    const redes_sociales = formData.get("redes_sociales");
    const telefono = formData.get("telefono");
    const observaciones = formData.get("observaciones");
    const vendedor = formData.get("vendedor");

    const errores = validate({
      nombre,
      empresa,
      direccion,
      redes_sociales,
      telefono,
      observaciones,
      vendedor,
    });

    for (const key in errores) {
      if (errores.hasOwnProperty(key)) {
        const errorMessage = errores[key];
        const errorElement = document.getElementById(`error-${key}`);
        errorElement.textContent =
          errorMessage.length > 0 ? errorMessage[0] : "";
      }
    }

    const errores_cap = Object.values(errores).flat();

    if (errores_cap.length > 0) {
      return false;
    }

    // Subir a la base de datos;

    form.reset();
    return true;
  }

  function validate({
    nombre,
    empresa,
    direccion,
    redes_sociales,
    telefono,
    observaciones,
    vendedor,
  }) {
    const errores = {
      nombre: [],
      empresa: [],
      direccion: [],
      redes_sociales: [],
      telefono: [],
      observaciones: [],
      vendedor: [],
    };

    if (!vendedor) {
      errores.vendedor.push("El vendedor no es válido.");
    } else if (typeof vendedor !== "string") {
      errores.vendedor.push(
        "El vendedor tiene que ser una cadena de caracteres."
      );
    }

    if (typeof observaciones !== "string") {
      errores.observaciones.push(
        "Las observaciones tienen que ser una cadena de caracteres."
      );
    }

    if (typeof telefono !== "string") {
      errores.telefono.push(
        "El teléfono tiene que ser una cadena de caracteres."
      );
    } else if (telefono.length < 6 && telefono.length !== 0) {
      errores.telefono.push(
        "El teléfono tiene que tener como mínimo 3 caracteres."
      );
    }

    if (typeof redes_sociales !== "string") {
      errores.redes_sociales.push(
        "Las redes sociales tienen que ser una cadena de caracteres."
      );
    }

    if (typeof direccion !== "string") {
      errores.direccion.push(
        "La dirección tiene que ser una cadena de caracteres."
      );
    }

    if (!nombre) {
      errores.nombre.push("El nombre no es válido.");
    } else if (typeof nombre !== "string") {
      errores.nombre.push("El nombre tiene que ser una cadena de caracteres.");
    } else if (nombre.length <= 3) {
      errores.nombre.push(
        "El nombre tiene que tener como mínimo 3 caracteres."
      );
    }

    if (!empresa) {
      errores.empresa.push("La empresa no es válida.");
    } else if (typeof empresa !== "string") {
      errores.empresa.push(
        "La empresa tiene que ser una cadena de caracteres."
      );
    } else if (empresa.length <= 3) {
      errores.empresa.push(
        "La empresa tiene que tener como mínimo 3 caracteres."
      );
    }

    return errores;
  }

  // Asignar el evento onSubmit al formulario
  const form = document.querySelector(".form");
  form.addEventListener("submit", onSubmit);
});
