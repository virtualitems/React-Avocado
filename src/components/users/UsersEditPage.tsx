import { useContext, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import Loader from '@/components/Loader';
import { usersContext } from '@/stores/users';

export default function UsersEditPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const { users, updateUser } = useContext(usersContext);
  const navigate = useNavigate();

  const [formError, setFormError] = useState<string | null>(null);

  const index = users.findIndex((user) => user.id === Number(id));

  if (index === -1) {
    return <Loader />;
  }

  const user = users[index];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get('email') as string | null;
    const firstName = formData.get('first_name') as string | null;
    const lastName = formData.get('last_name') as string | null;

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

    user.email = email;
    user.first_name = firstName;
    user.last_name = lastName;

    updateUser(index, user);
    navigate(`/users/${user.id}`);
  };

  return (
    <div className="mx-auto mt-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="mb-6 font-extrabold text-gray-900 text-2xl sm:text-3xl">Editar Usuario</h2>

          {formError && (
            <div className="bg-yellow-50 mb-6 p-4 border-yellow-400 border-l-4 rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-yellow-700 text-sm">{formError}</p>
                </div>
              </div>
            </div>
          )}

          <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="bg-green-50 shadow-lg mb-4 border-4 border-green-100 rounded-full w-36 h-36 overflow-hidden">
                <img
                  src={user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-500 text-sm">ID de Usuario: {user.id}</p>
            </div>

            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium text-gray-700 text-sm">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={user.email}
                    className="block bg-white shadow-sm px-3 py-2 border border-gray-300 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="first_name" className="block mb-1 font-medium text-gray-700 text-sm">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    defaultValue={user.first_name}
                    className="block bg-white shadow-sm px-3 py-2 border border-gray-300 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="last_name" className="block mb-1 font-medium text-gray-700 text-sm">
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    defaultValue={user.last_name}
                    className="block bg-white shadow-sm px-3 py-2 border border-gray-300 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                    required
                  />
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <Link
                    to={`/users/${user.id}`}
                    className="inline-flex justify-center items-center bg-gray-500 hover:bg-gray-600 shadow-sm px-4 py-2 border border-transparent rounded-md font-medium text-white transition-colors duration-200"
                  >
                    Cancelar
                  </Link>

                  <button
                    type="submit"
                    className="inline-flex justify-center items-center bg-green-600 hover:bg-green-700 shadow-sm px-4 py-2 border border-transparent rounded-md font-medium text-white transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
