import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Loader from '../Loader';
import { usersContext } from '@/stores/users';

export default function UsersCreatePage(): React.ReactElement {
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { users, addUser } = useContext(usersContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get('email') as string | null;
    const firstName = formData.get('first_name') as string | null;
    const lastName = formData.get('last_name') as string | null;
    const avatar = formData.get('avatar') as File | null;

    if (email === null || email === '') {
      setFormError('El email es requerido');
      return;
    }

    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) === false) {
      setFormError('El email no es válido');
      return;
    }

    if (firstName === null || firstName === '') {
      setFormError('El nombre es requerido');
      return;
    }

    if (firstName.length < 3) {
      setFormError('El nombre debe tener al menos 3 caracteres');
      return;
    }

    if (lastName === null || lastName === '') {
      setFormError('El apellido es requerido');
      return;
    }

    if (lastName.length < 3) {
      setFormError('El apellido debe tener al menos 3 caracteres');
      return;
    }

    if (!avatar) {
      setFormError('La imagen de perfil es requerida');
      return;
    }

    setLoading(true);

    try {
      addUser({
        id: users.length + 1,
        email: email,
        first_name: firstName,
        last_name: lastName,
        avatar: URL.createObjectURL(avatar!),
      });

      navigate('/users');
    } catch {
      setFormError('Error al crear el usuario');
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto mt-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="mb-6 font-extrabold text-gray-900 text-2xl sm:text-3xl">
            Crear Nuevo Usuario
          </h2>

          {formError && (
            <div className="bg-yellow-50 mb-6 p-4 border-yellow-400 border-l-4 rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-yellow-700 text-sm">{formError}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mx-auto max-w-2xl">
            <form
              onSubmit={handleSubmit}
              method="POST"
              encType="multipart/form-data"
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 font-medium text-gray-700 text-sm"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="ejemplo@correo.com"
                  className="block bg-white shadow-sm px-3 py-2 border border-gray-300 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-1 font-medium text-gray-700 text-sm"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="Juan"
                  required
                  className="block bg-white shadow-sm px-3 py-2 border border-gray-300 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block mb-1 font-medium text-gray-700 text-sm"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Pérez"
                  required
                  className="block bg-white shadow-sm px-3 py-2 border border-gray-300 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="avatar"
                  className="block mb-1 font-medium text-gray-700 text-sm"
                >
                  Imagen de Perfil
                </label>
                <div className="flex justify-center mt-1 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto w-12 h-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-gray-600 text-sm">
                      <label
                        htmlFor="avatar"
                        className="relative bg-white rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 font-medium text-green-600 hover:text-green-500 cursor-pointer"
                      >
                        <span>Subir un archivo</span>
                        <input
                          id="avatar"
                          name="avatar"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          required
                        />
                      </label>
                      <p className="pl-1">o arrastrar y soltar</p>
                    </div>
                    <p className="text-gray-500 text-xs">
                      PNG, JPG, GIF hasta 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-5">
                <Link
                  to="/users"
                  className="inline-flex justify-center items-center bg-gray-500 hover:bg-gray-600 shadow-sm px-4 py-2 border border-transparent rounded-md font-medium text-white transition-colors duration-200"
                >
                  Cancelar
                </Link>

                <button
                  type="submit"
                  className="inline-flex justify-center items-center bg-green-600 hover:bg-green-700 shadow-sm px-4 py-2 border border-transparent rounded-md font-medium text-white transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
