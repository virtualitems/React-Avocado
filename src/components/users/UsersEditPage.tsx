import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import Loader from '@/components/Loader';

export default function UsersEditPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://reqres.in/api/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo obtener la información del usuario');
        }
        return response.json();
      })
      .then((json) => {
        setUser(json.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

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

    const fetchTarget = `https://reqres.in/api/users/${id}`;
    const fetchOptions: RequestInit = {
      method: 'PATCH',
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    setLoading(true);

    const response = await fetch(fetchTarget, fetchOptions);

    setLoading(false);

    if (response.ok === false) {
      setFormError(response.statusText);
      return;
    }

    navigate(`/users/${id}`);
  };

  if (loading === true) {
    return <Loader />;
  }

  if (error !== null) {
    return <div className="mx-auto p-4 text-red-500 container">{error}</div>;
  }

  if (user === null) {
    return <div className="mx-auto p-4 container">Usuario no encontrado</div>;
  }

  return (
    <div className="mx-auto p-4 container">
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h1 className="mb-4 font-bold text-2xl">Editar Usuario</h1>

        {formError !== null && (
          <div className="bg-yellow-100 mb-4 p-4 border-yellow-500 border-l-4 rounded-tr-lg rounded-br-lg text-yellow-700">
            <p>{formError}</p>
          </div>
        )}

        <div className="flex md:flex-row flex-col">
          <div className="mb-4 md:mb-0 md:w-1/3">
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="mx-auto rounded-full w-32 h-32"
            />
          </div>

          <div className="md:w-2/3">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1 text-gray-600">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={user.email}
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
                  defaultValue={user.first_name}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  required
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
                  defaultValue={user.last_name}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  required
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
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
