const ramosPorSemestre = {
  "1° semestre": [
    "Biología Celular",
    "Laboratorio y Seminario de Biología Celular",
    "Álgebra y Cálculo Elemental",
    "Química General",
    "Introducción a la Bioquímica"
  ],
  "2° semestre": [
    "Habilidades Comunicativas",
    "Genética",
    "Cálculo Avanzado",
    "Química Orgánica",
    "Ingles I"
  ],
  "3° semestre": [
    "Fisiología General",
    "Laboratorio de Fisiología General",
    "Física para Ciencias Biológicas",
    "Química Analítica",
    "Ingles II"
  ],
  "4° semestre": [
    "Razonamiento Científico y TICS",
    "Fisicoquímica",
    "Análisis Orgánico",
    "Química Analítica Instrumental",
    "Ingles III"
  ],
  "5° semestre": [
    "Pensamiento Crítico",
    "Fisiopatología",
    "Bioquímica",
    "Farmacodinamia y Farmacogenómica",
    "Ingles IV"
  ],
  "6° semestre": [
    "Responsabilidad Social",
    "Microbiología General",
    "Bioquímica y Herramientas Bioinformáticas",
    "Biología Molecular",
    "Bioseguridad y Bioética",
    "Integrador I: Taller de Investigación Científica"
  ],
  "7° semestre": [
    "Inmunología",
    "Fisiopatología Molecular",
    "Fisiología y Bioquímica Vegetal",
    "Ingeniería Genética y Biotecnología",
    "Bioestadística"
  ],
  "8° semestre": [
    "Bioquímica Clínica",
    "EFA I Ciencia Básica",
    "EFA II Ciencia Aplicada",
    "Bioinformática y Genómica",
    "Integrador II: Unidad de Investigación en Bioquímica"
  ],
  "9° semestre": [
    "Práctica de Laboratorio Clínico",
    "Práctica en Investigación",
    "Práctica en Sector Productivo",
    "Biotecnología y Propiedad Intelectual"
  ]
};

const prerrequisitos = {
  "Genética": ["Biología Celular"],
  "Cálculo Avanzado": ["Álgebra y Cálculo Elemental"],
  "Química Orgánica": ["Química General"],
  "Fisiología General": ["Biología Celular"],
  "Laboratorio de Fisiología General": ["Laboratorio y Seminario de Biología Celular"],
  "Física para Ciencias Biológicas": ["Álgebra y Cálculo Elemental"],
  "Química Analítica": ["Química General"],
  "Ingles II": ["Ingles I"],
  "Razonamiento Científico y TICS": ["Habilidades Comunicativas"],
  "Fisicoquímica": ["Cálculo Avanzado", "Física para Ciencias Biológicas"],
  "Análisis Orgánico": ["Química Orgánica"],
  "Química Analítica Instrumental": ["Química Analítica"],
  "Ingles III": ["Ingles II"],
  "Pensamiento Crítico": ["Razonamiento Científico y TICS"],
  "Fisiopatología": ["Fisiología General", "Laboratorio de Fisiología General"],
  "Bioquímica": ["Fisiología General", "Fisicoquímica", "Análisis Orgánico"],
  "Farmacodinamia y Farmacogenómica": ["Análisis Orgánico", "Genética"],
  "Ingles IV": ["Ingles III"],
  "Responsabilidad social": ["Pensamiento Crítico"],
  "Microbiología General": ["Bioquímica"],
  "Bioquímica y Herramientas Bioinformáticas": ["Bioquímica", "Farmacodinamia y Farmacogenómica"],
  "Biología Molecular": ["Bioquímica", "Ingles IV"],
  "Bioseguridad y Bioética": ["Farmacodinamia y Farmacogenómica", "Química Analítica Instrumental"],
  "Integrador I: Taller de Investigación Científica": ["Farmacodinamia y Farmacogenómica", "Fisicoquímica", "Ingles III", "Introducción a la Bioquímica"],
  "Inmunología": ["Fisiopatología"],
  "Fisiopatología Molecular": ["Fisiopatología", "Bioquímica y Herramientas Bioinformáticas"],
  "Fisiología y Bioquímica Vegetal": ["Biología Molecular"],
  "Ingeniería Genética y Biotecnología": ["Biología Molecular", "Microbiología General"],
  "Bioestadística": ["Integrador I: Taller de Investigación Científica"],
  "Bioquímica Clínica": ["Inmunología", "Fisiopatología Molecular", "Responsabilidad Social"],
  "EFA I Ciencia Básica": ["Fisiopatología Molecular", "Ingeniería Genética y Biotecnología"],
  "EFA II Ciencia Aplicada": ["Ingeniería Genética y Biotecnología", "Fisiología y Bioquímica Vegetal"],
  "Bioinformática y Genómica": ["Bioquímica y Herramientas Bioinformáticas"],
  "Integrador II: Unidad de Investigación en Bioquímica": ["Biología Molecular", "Bioseguridad y Bioética", "Bioestadística"],
  "Práctica de Laboratorio Clínico": ["Bioquímica Clínica"],
  "Práctica en Investigación": ["EFA I Ciencia Básica", "Integrador II: Unidad de Investigación en Bioquímica"],
  "Práctica en Sector Productivo": ["EFA II Ciencia Aplicada"],
  "Biotecnología y Propiedad Intelectual": ["EFA II Ciencia Aplicada", "Bioinformática y Genómica"]
};

const aprobados = new Set();

function crearMalla() {
  const contenedor = document.getElementById("malla");

  Object.entries(ramosPorSemestre).forEach(([semestre, ramos]) => {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = semestre;
    divSemestre.appendChild(titulo);

    const contenedorRamos = document.createElement("div");
    contenedorRamos.className = "ramos";

    ramos.forEach(nombre => {
      const boton = document.createElement("div");
      boton.className = "ramo";
      boton.textContent = nombre;
      boton.dataset.nombre = nombre;
      contenedorRamos.appendChild(boton);
    });

    divSemestre.appendChild(contenedorRamos);
    contenedor.appendChild(divSemestre);
  });

  actualizarEstado();
}

function actualizarEstado() {
  document.querySelectorAll(".ramo").forEach(boton => {
    const nombre = boton.dataset.nombre;
    const requisitos = prerrequisitos[nombre] || [];

    const bloqueado = requisitos.some(r => !aprobados.has(r));

    boton.classList.remove("aprobado", "bloqueado");

    if (aprobados.has(nombre)) {
      boton.classList.add("aprobado");
    } else if (bloqueado) {
      boton.classList.add("bloqueado");
    }

    boton.onclick = () => {
      if (!bloqueado) {
        if (aprobados.has(nombre)) {
          aprobados.delete(nombre);
        } else {
          aprobados.add(nombre);
        }
        actualizarEstado();
      }
    };
  });
}

crearMalla();

