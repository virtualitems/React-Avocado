import { usersContext } from '@/stores/users';
import { useContext } from 'react';
import { Link } from 'react-router';

export default function UsersListPage(): React.ReactElement {
  const { users, setUsers } = useContext(usersContext);

  const onDelete = (_event: React.MouseEvent, index: number) => {
    const usersList = users.slice();
    usersList.splice(index, 1);
    setUsers(usersList);
  };

  return (
    <div className="mx-auto mt-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-extrabold text-gray-900 text-2xl sm:text-3xl">Lista de Usuarios</h2>
            <Link
              to="/users/create"
              className="flex items-center bg-green-600 hover:bg-green-700 px-4 md:px-6 py-2 md:py-3 border border-transparent rounded-md font-medium text-white text-sm md:text-base transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Crear Usuario
            </Link>
          </div>

          {users.length === 0 ? (
            <div className="py-8 text-center">
              <p className="mb-4 text-gray-500 text-lg">No hay usuarios para mostrar</p>
              <Link
                to="/users/create"
                className="inline-flex items-center bg-green-100 hover:bg-green-200 px-4 py-2 border border-transparent rounded-md font-medium text-green-700 text-base transition-colors duration-200"
              >
                Añadir un usuario
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-green-50 border-green-100 border-b">
                    <th className="px-4 py-3 font-semibold text-green-700 text-sm uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 font-semibold text-green-700 text-sm uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 font-semibold text-green-700 text-sm uppercase tracking-wider">Nombre</th>
                    <th className="px-4 py-3 font-semibold text-green-700 text-sm uppercase tracking-wider">Apellido</th>
                    <th className="px-4 py-3 font-semibold text-green-700 text-sm text-center uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <ListUsersRow
                      key={user.id}
                      index={index}
                      user={user}
                      onDelete={onDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ListUsersRow(props: {
  index: number;
  user: User;
  onDelete?: (event: React.MouseEvent, index: number) => void;
}) {
  const { user, index, onDelete } = props;

  return (
    <tr className="hover:bg-green-50 transition-colors duration-150">
      <td className="px-4 py-3">{user.id}</td>
      <td className="px-4 py-3">{user.email}</td>
      <td className="px-4 py-3">{user.first_name}</td>
      <td className="px-4 py-3">{user.last_name}</td>
      <td className="flex justify-center space-x-2 px-4 py-3">
        <Link
          className="inline-flex items-center bg-blue-500 hover:bg-blue-700 active:bg-blue-800 px-3 py-1 rounded text-white text-sm transition-colors duration-200"
          to={`/users/${user.id}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          Ver
        </Link>
        <Link
          className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 px-3 py-1 rounded text-white text-sm transition-colors duration-200"
          to={`/users/${user.id}/edit`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
          </svg>
          Editar
        </Link>
        <button
          className="inline-flex items-center bg-red-500 hover:bg-red-600 active:bg-red-700 px-3 py-1 rounded text-white text-sm transition-colors duration-200"
          onClick={(event) => onDelete?.(event, index)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Eliminar
        </button>
      </td>
    </tr>
  );
}
