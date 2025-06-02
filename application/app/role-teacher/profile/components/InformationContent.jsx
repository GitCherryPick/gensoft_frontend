"use client"

export default function InformationContent() {
  // Datos de ejemplo para información del docente
  const teacherInfo = {
    personal: {
      email: "carlos.mendoza@universidad.edu.bo",
      phone: "+591 70123456",
      location: "La Paz, Bolivia",
      languages: ["Español (Nativo)", "Inglés (Avanzado)", "Aymara (Intermedio)"],
    },
    education: [
      {
        degree: "Doctorado en Matemáticas Aplicadas",
        institution: "Universidad Mayor de San Andrés",
        year: "2015",
      },
      {
        degree: "Maestría en Estadística",
        institution: "Universidad Católica Boliviana",
        year: "2010",
      },
      {
        degree: "Licenciatura en Matemáticas",
        institution: "Universidad Mayor de San Andrés",
        year: "2008",
      },
    ],
    experience: [
      {
        position: "Docente Principal de Matemáticas",
        institution: "Universidad Mayor de San Andrés",
        period: "2018 - Presente",
      },
      {
        position: "Docente Asociado",
        institution: "Universidad Católica Boliviana",
        period: "2015 - 2018",
      },
      {
        position: "Investigador",
        institution: "Instituto de Estadística Aplicada",
        period: "2010 - 2015",
      },
    ],
  }

  return (
    <div className="bg-[#0e101e] rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">Información Personal</h2>

      <div className="space-y-8">
        {/* Información de contacto */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Contacto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white">{teacherInfo.personal.email}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Teléfono</p>
              <p className="text-white">{teacherInfo.personal.phone}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Ubicación</p>
              <p className="text-white">{teacherInfo.personal.location}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Idiomas</p>
              <p className="text-white">{teacherInfo.personal.languages.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Formación académica */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Formación Académica</h3>
          <div className="space-y-4">
            {teacherInfo.education.map((edu, index) => (
              <div key={index} className="bg-[#1e2132] p-4 rounded-lg">
                <h4 className="text-white font-medium">{edu.degree}</h4>
                <p className="text-gray-300">{edu.institution}</p>
                <p className="text-gray-400 text-sm">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experiencia profesional */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Experiencia Profesional</h3>
          <div className="space-y-4">
            {teacherInfo.experience.map((exp, index) => (
              <div key={index} className="bg-[#1e2132] p-4 rounded-lg">
                <h4 className="text-white font-medium">{exp.position}</h4>
                <p className="text-gray-300">{exp.institution}</p>
                <p className="text-gray-400 text-sm">{exp.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}