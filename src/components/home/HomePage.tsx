import { Link } from 'react-router';

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      {/* Sección de Bienvenida */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="z-10 relative pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 lg:w-full">
            <main className="mx-auto mt-10 sm:mt-12 lg:mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="lg:text-left text-center">
                <h1 className="font-extrabold text-gray-900 text-4xl sm:text-5xl md:text-6xl tracking-tight">
                  <span className="block">Bienvenidos a</span>
                  <span className="block text-green-600">La aplicación de Alejandro</span>
                </h1>
                <p className="sm:mx-auto lg:mx-0 mt-3 sm:mt-5 md:mt-5 sm:max-w-xl text-gray-500 text-base sm:text-lg md:text-xl">
                  Tu plataforma de referencia para gestionar datos de usuarios de forma eficiente y efectiva.
                  Empieza a explorar nuestras poderosas funcionalidades hoy.
                </p>
                <div className="sm:flex sm:justify-center lg:justify-start mt-5 sm:mt-8">
                  <div className="shadow rounded-md">
                    <Link to="/users" className="flex justify-center items-center bg-green-600 hover:bg-green-700 px-8 md:px-10 py-3 md:py-4 border border-transparent rounded-md w-full font-medium text-white text-base md:text-lg">
                      Ver Usuarios
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/users/create" className="flex justify-center items-center bg-green-100 hover:bg-green-200 px-8 md:px-10 py-3 md:py-4 border border-transparent rounded-md w-full font-medium text-green-700 text-base md:text-lg">
                      Crear Usuario
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Sección de Características */}
      <div className="bg-white py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="lg:text-center">
            <h2 className="font-semibold text-green-600 text-base uppercase tracking-wide">Características</h2>
            <p className="mt-2 font-extrabold text-gray-900 text-3xl sm:text-4xl leading-8 tracking-tight">
              Una mejor forma de gestionar usuarios
            </p>
            <p className="lg:mx-auto mt-4 max-w-2xl text-gray-500 text-xl">
              Todo lo que necesitas para gestionar eficazmente tu base de datos de usuarios
            </p>
          </div>

          <div className="mt-10">
            <div className="md:gap-x-8 md:gap-y-10 space-y-10 md:space-y-0 md:grid md:grid-cols-2">
              {/* Característica 1 */}
              <div className="relative">
                <div className="absolute flex justify-center items-center bg-green-500 rounded-md w-12 h-12 text-white">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="font-medium text-gray-900 text-lg leading-6">Gestión de Usuarios</h3>
                  <p className="mt-2 text-gray-500 text-base">
                    Crea, consulta, actualiza y elimina usuarios con una interfaz intuitiva.
                  </p>
                </div>
              </div>

              {/* Característica 2 */}
              <div className="relative">
                <div className="absolute flex justify-center items-center bg-green-500 rounded-md w-12 h-12 text-white">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="font-medium text-gray-900 text-lg leading-6">Acceso Seguro</h3>
                  <p className="mt-2 text-gray-500 text-base">
                    Protocolos de seguridad de estándar industrial para proteger tus datos.
                  </p>
                </div>
              </div>

              {/* Característica 3 */}
              <div className="relative">
                <div className="absolute flex justify-center items-center bg-green-500 rounded-md w-12 h-12 text-white">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="font-medium text-gray-900 text-lg leading-6">Integración de API</h3>
                  <p className="mt-2 text-gray-500 text-base">
                    Se integra sin problemas con APIs RESTful para operaciones de datos.
                  </p>
                </div>
              </div>

              {/* Característica 4 */}
              <div className="relative">
                <div className="absolute flex justify-center items-center bg-green-500 rounded-md w-12 h-12 text-white">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="font-medium text-gray-900 text-lg leading-6">Analítica Avanzada</h3>
                  <p className="mt-2 text-gray-500 text-base">
                    Obtén información sobre tu base de usuarios con una analítica poderosa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Llamado a la Acción */}
      <div className="bg-green-700">
        <div className="lg:flex lg:justify-between lg:items-center mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-7xl">
          <h2 className="font-extrabold text-white text-3xl sm:text-4xl tracking-tight">
            <span className="block">¿Listo para comenzar?</span>
            <span className="block text-green-200">Empieza tu viaje hoy.</span>
          </h2>
          <div className="flex lg:flex-shrink-0 mt-8 lg:mt-0">
            <div className="inline-flex shadow rounded-md">
              <Link to="/users" className="inline-flex justify-center items-center bg-white hover:bg-green-50 px-5 py-3 border border-transparent rounded-md font-medium text-green-700 text-base">
                Comenzar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
