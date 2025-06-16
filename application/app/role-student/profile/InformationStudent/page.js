"use client";
import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Calendar, Globe, Linkedin, Twitter, Edit3, Save } from "lucide-react";
import { getUserById } from "@/lib/users/users-service"; 
import { getCurrentUser } from "@/lib/auth/auth-service"; 

export default function PersonalInfoPage({ userId: propUserId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const mockedInfo = {
    phone: "+34 612 345 678",
    address: "Calle Principal 123, Madrid",
    birthdate: "15/05/1980",
    bio: "Docente con más de 15 años de experiencia en educación superior. Especializada en metodologías de enseñanza innovadoras y tecnología educativa. Mi pasión por la educación me ha llevado a desarrollar múltiples proyectos de investigación en el ámbito de la pedagogía digital.",
    website: "www.mariagarcia-educacion.com",
    socialMedia: {
      linkedin: "linkedin.com/in/mariagarcia",
      twitter: "twitter.com/mariagarcia_edu",
    },
  };


  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      console.log("Current user:", user); 
      setCurrentUser(user);
    };
    fetchCurrentUser();
  }, []);


  const userId = currentUser?.id || propUserId;

 
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError("User ID is missing. Please ensure you're logged in or accessing a valid profile URL.");
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching user data for ID: ${userId}`);
        const userData = await getUserById(userId);
        console.log("User data:", userData);

  
        setUserInfo({
          name: userData.full_name || "Unknown User",
          email: userData.email || "",
          ...mockedInfo,
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

  if (loading || !currentUser) {
    return <div className="text-center p-6 text-gray-100">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="sticky top-0 py-4 px-6 -mx-6 mb-6 z-10 border-b border-slate-700/50 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-white">Información Personal</h1>
            </div>
            <button
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isEditing ? "bg-green-600 hover:bg-green-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <>
                  <Save size={16} />
                  <span>Guardar cambios</span>
                </>
              ) : (
                <>
                  <Edit3 size={16} />
                  <span>Editar información</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-8 pb-12">
  
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
            <h2 className="flex items-center text-lg font-semibold text-white mb-6">
              <div className="p-1.5 bg-blue-500/20 rounded-md mr-3">
                <User className="w-4 h-4 text-blue-400" />
              </div>
              Información básica
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField
                icon={<User size={16} />}
                label="Nombre completo"
                value={userInfo.name}
                isEditing={false} 
              />
              <InfoField
                icon={<Mail size={16} />}
                label="Correo electrónico"
                value={userInfo.email}
                isEditing={false} 
              />
              <InfoField
                icon={<Phone size={16} />}
                label="Teléfono"
                value={userInfo.phone}
                isEditing={isEditing}
              />
              <InfoField
                icon={<Calendar size={16} />}
                label="Fecha de nacimiento"
                value={userInfo.birthdate}
                isEditing={isEditing}
              />
              <InfoField
                icon={<MapPin size={16} />}
                label="Dirección"
                value={userInfo.address}
                isEditing={isEditing}
                className="md:col-span-2"
              />
            </div>
          </div>

          {/* Card de biografía */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
            <h2 className="flex items-center text-lg font-semibold text-white mb-6">
              <div className="p-1.5 bg-purple-500/20 rounded-md mr-3">
                <Edit3 className="w-4 h-4 text-purple-400" />
              </div>
              Biografía profesional
            </h2>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-slate-300">
                <span className="text-slate-400 mr-2">
                  <Edit3 size={16} />
                </span>
                Acerca de mí
              </label>

              {isEditing ? (
                <textarea
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows={4}
                  defaultValue={userInfo.bio}
                  placeholder="Escribe una breve descripción profesional..."
                />
              ) : (
                <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/50">
                  <p className="text-white leading-relaxed">{userInfo.bio}</p>
                </div>
              )}
            </div>
          </div>

          {/* Card de enlaces y redes sociales */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
            <h2 className="flex items-center text-lg font-semibold text-white mb-6">
              <div className="p-1.5 bg-green-500/20 rounded-md mr-3">
                <Globe className="w-4 h-4 text-green-400" />
              </div>
              Enlaces y redes sociales
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField
                icon={<Globe size={16} />}
                label="Sitio web"
                value={userInfo.website}
                isEditing={isEditing}
                isLink={true}
              />
              <InfoField
                icon={<Linkedin size={16} />}
                label="LinkedIn"
                value={userInfo.socialMedia.linkedin}
                isEditing={isEditing}
                isLink={true}
              />
              <InfoField
                icon={<Twitter size={16} />}
                label="Twitter"
                value={userInfo.socialMedia.twitter}
                isEditing={isEditing}
                className="md:col-span-2"
                isLink={true}
              />
            </div>
          </div>

          <div className="h-8"></div>
        </div>
      </div>
    </div>
  );
}

function InfoField({ icon, label, value, isEditing, className = "", isLink = false }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="flex items-center text-sm font-medium text-slate-300">
        <span className="text-slate-400 mr-2">{icon}</span>
        {label}
      </label>

      {isEditing ? (
        <input
          type="text"
          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          defaultValue={value}
          placeholder={`Ingresa tu ${label.toLowerCase()}`}
        />
      ) : (
        <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/50">
          {isLink && value ? (
            <a
              href={value.startsWith("http") ? value : `https://${value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center"
            >
              {value}
              <Globe size={14} className="ml-2 opacity-70" />
            </a>
          ) : (
            <p className="text-white">{value}</p>
          )}
        </div>
      )}
    </div>
  );
}