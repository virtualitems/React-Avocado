import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export default function UsersDetailPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading === true) {
    return <div className="mx-auto p-4 container">Cargando...</div>;
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
        <h1 className="mb-4 font-bold text-2xl">Detalles del Usuario</h1>

        <div className="flex md:flex-row flex-col">
          <div className="mb-4 md:mb-0 md:w-1/3">
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="mx-auto rounded-full w-32 h-32"
            />
          </div>

          <div className="md:w-2/3">
            <div className="mb-4">
              <p className="text-gray-600">ID del usuario:</p>
              <p className="font-bold">{user.id}</p>
            </div>

            <div className="mb-4">
              <p className="text-gray-600">Nombre:</p>
              <p className="font-bold">
                {user.first_name} {user.last_name}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-gray-600">Email:</p>
              <p className="font-bold">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Link
            to="/users"
            className="bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded font-bold text-white"
          >
            Volver
          </Link>

          <Link
            to={`/users/${user.id}/edit`}
            className="bg-yellow-500 hover:bg-yellow-700 px-4 py-2 rounded font-bold text-white"
          >
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
}
