import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router';

import { usersContext } from '@/stores/users';
import { listUsers } from '@/providers/users.service';
import Loader from '../Loader';

export default function UsersLayout(): React.ReactElement {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const value = {
    users,
    setUsers,
    addUser: (user: User) => {
      setUsers((prev) => [...prev, user]);
    },
    updateUser: (index: number, user: User) => {
      setUsers((prev) => {
        const newUsers = [...prev];
        newUsers[index] = user;
        return newUsers;
      });
    },
    deleteUser: (index: number) => {
      setUsers((prev) => {
        const newUsers = [...prev];
        newUsers.splice(index, 1);
        return newUsers;
      });
    },
  };

  useEffect(() => {
    setLoading(true);
    listUsers(1, 12)
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch(console.warn)
      .finally(() => setLoading(false));
  }, [setUsers]);

  if (loading === true) {
    return <Loader />;
  }

  return (
    <div className="relative bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <header className="bg-green-700 shadow-md">
        <div className="flex justify-between items-center mx-auto px-4 py-4 container">
          <Link to="/" className="font-bold text-white text-2xl">Gestión de Usuarios</Link>
          <nav>
            <Link to="/" className="px-3 py-2 text-green-100 hover:text-white">Inicio</Link>
            <Link to="/users" className="px-3 py-2 text-green-100 hover:text-white">Usuarios</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto px-4 py-8 pb-24 container">
        <usersContext.Provider value={value}>
          <Outlet />
        </usersContext.Provider>
      </main>
      <footer className="bottom-0 absolute bg-green-700 w-full text-white">
        <div className="flex sm:flex-row flex-col justify-between items-center mx-auto px-4 py-6 container">
          <div className="mb-4 sm:mb-0">
            <p>&copy; 2025 Gestión de Usuarios. Todos los derechos reservados.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-green-100 hover:text-white">Términos</a>
            <a href="#" className="text-green-100 hover:text-white">Privacidad</a>
            <a href="#" className="text-green-100 hover:text-white">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
