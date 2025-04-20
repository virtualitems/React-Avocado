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

    if (email === null || email === '') {
      setFormError('El email es requerido');
      return;
    }

    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) === false) {
      setFormError('El email no es válido');
    }

    if (firstName === null || firstName === '') {
      setFormError('El nombre es requerido');
      return;
    }

    if (firstName.length < 3) {
      setFormError('El nombre debe tener al menos 3 caracteres');
    }

    if (lastName === null || lastName === '') {
      setFormError('El apellido es requerido');
      return;
    }

    if (lastName.length < 3) {
      setFormError('El apellido debe tener al menos 3 caracteres');
    }

    setLoading(true);

    addUser({
      id: users.length + 1,
      email: email,
      first_name: firstName,
      last_name: lastName,
      avatar: URL.createObjectURL(formData.get('avatar') as Blob),
    });

    navigate('/users');
  };

  if (loading === true) {
    return <Loader />;
  }

  return (
    <div className="mx-auto p-4 container">
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h1 className="mb-4 font-bold text-2xl">Crear Usuario</h1>

        {formError !== null && (
          <div className="bg-yellow-100 mb-4 p-4 border-yellow-500 border-l-4 rounded-tr-lg rounded-br-lg text-yellow-700">
            <p>{formError}</p>
          </div>
        )}

        <div className="flex md:flex-row flex-col">
          <div className="md:w-full">
            <form
              method="POST"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1 text-gray-600">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="first_name"
                  className="block mb-1 text-gray-600"
                >
                  Nombre:
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  required
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="last_name" className="block mb-1 text-gray-600">
                  Apellido:
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  required
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="avatar" className="block mb-1 text-gray-600">
                  Avatar:
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  required
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>

              <div className="flex gap-2 mt-6">
                <Link
                  to="/users"
                  className="bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded font-bold text-white"
                >
                  Cancelar
                </Link>

                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded font-bold text-white"
                >
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
