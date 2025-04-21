import { useContext } from 'react';
import { Link, useParams } from 'react-router';
import { usersContext } from '@/stores/users';
import Loader from '../Loader';

export default function UsersDetailPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const { users } = useContext(usersContext);

  const user = users.find((user) => user.id === Number(id));

  if (user === undefined) {
    return <Loader />;
  }

  return (
    <div className="mx-auto mt-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="mb-6 font-extrabold text-gray-900 text-2xl sm:text-3xl">Detalles del Usuario</h2>
          
          <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="bg-green-50 shadow-md border-4 border-green-100 rounded-full w-36 h-36 overflow-hidden">
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="right-0 bottom-0 absolute flex justify-center items-center bg-green-600 border-2 border-white rounded-full w-8 h-8 text-white">
                  <span className="font-bold text-sm">{user.id}</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-800 text-xl">{user.first_name} {user.last_name}</h3>
              <p className="text-gray-500">{user.email}</p>
            </div>

            <div className="flex flex-col md:col-span-2">
              <div className="bg-green-50 mb-6 p-6 rounded-lg">
                <h3 className="mb-4 font-semibold text-green-700 text-lg">Información Personal</h3>
                
                <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-gray-500 text-sm">ID</p>
                    <p className="font-medium text-gray-900">{user.id}</p>
                  </div>
                  
                  <div>
                    <p className="mb-1 text-gray-500 text-sm">Correo Electrónico</p>
                    <p className="font-medium text-gray-900">{user.email}</p>
                  </div>
                  
                  <div>
                    <p className="mb-1 text-gray-500 text-sm">Nombre</p>
                    <p className="font-medium text-gray-900">{user.first_name}</p>
                  </div>
                  
                  <div>
                    <p className="mb-1 text-gray-500 text-sm">Apellido</p>
                    <p className="font-medium text-gray-900">{user.last_name}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/users"
                  className="inline-flex items-center bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md font-medium text-white transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Volver a la Lista
                </Link>

                <Link
                  to={`/users/${user.id}/edit`}
                  className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md font-medium text-white transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                  </svg>
                  Editar Usuario
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
